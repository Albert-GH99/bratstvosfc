import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supportedExtensions = [".com", ".my", ".com.my", ".net", ".co"] as const;
const manualConfirmationExtensions = new Set([".my", ".com.my"]);

type DomainStatus = "available" | "unavailable" | "premium" | "manual_confirmation_required" | "error";

type DomainResult = {
  domain: string;
  tld: string;
  available: boolean;
  premium: boolean | null;
  price: number | null;
  currency: string | null;
  status: DomainStatus;
  message?: string;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function sanitizeName(value: unknown) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .replace(/\.(com\.my|com|my|net|co)$/i, "")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function buildDomains(name: string) {
  return supportedExtensions.map((tld) => ({
    domain: `${name}${tld}`,
    tld,
  }));
}

function errorResults(domains: Array<{ domain: string; tld: string }>, message: string): DomainResult[] {
  return domains.map(({ domain, tld }) => ({
    domain,
    tld,
    available: false,
    premium: null,
    price: null,
    currency: null,
    status: "error",
    message,
  }));
}

function manualConfirmationResult(domain: string, tld: string, message = "Perlu confirmation admin."): DomainResult {
  return {
    domain,
    tld,
    available: false,
    premium: null,
    price: null,
    currency: null,
    status: "manual_confirmation_required",
    message,
  };
}

function isUnsupportedResult(item: Record<string, unknown>) {
  const values = [
    item.result,
    item.status,
    item.message,
    item.reason,
    item.error,
    item.code,
  ].map((value) => String(value || "").toLowerCase());

  return values.some((value) => (
    value.includes("unsupported") ||
    value.includes("not supported") ||
    value.includes("invalid tld") ||
    value.includes("tld")
  ));
}

function normalizeSpaceshipResult(item: Record<string, unknown>, tld: string): DomainResult {
  if (manualConfirmationExtensions.has(tld) && isUnsupportedResult(item)) {
    return manualConfirmationResult(String(item.domain || ""), tld, "Perlu confirmation admin.");
  }

  const result = String(item.result || "").toLowerCase();
  const premiumPricing = Array.isArray(item.premiumPricing) ? item.premiumPricing : [];
  const registerPricing = premiumPricing.find((entry) => {
    if (!entry || typeof entry !== "object") return false;
    return String((entry as Record<string, unknown>).operation || "").toLowerCase() === "register";
  }) as Record<string, unknown> | undefined;
  const premium = premiumPricing.length > 0 || result === "premium";
  const available = result === "available" || premium;

  return {
    domain: String(item.domain || ""),
    tld,
    available,
    premium,
    price: typeof registerPricing?.price === "number" ? registerPricing.price : null,
    currency: typeof registerPricing?.currency === "string" ? registerPricing.currency : null,
    status: result === "error"
      ? (manualConfirmationExtensions.has(tld) ? "manual_confirmation_required" : "error")
      : premium
        ? "premium"
        : available
          ? "available"
          : "unavailable",
    message: result === "error" && manualConfirmationExtensions.has(tld) ? "Perlu confirmation admin." : undefined,
  };
}

async function checkSpaceshipDomain(
  domain: string,
  tld: string,
  apiKey: string,
  apiSecret: string,
): Promise<DomainResult> {
  try {
    const response = await fetch("https://spaceship.dev/api/v1/domains/available", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
        "X-API-Secret": apiSecret,
      },
      body: JSON.stringify({ domains: [domain] }),
    });

    if (!response.ok) {
      const detail = await response.text();
      if (manualConfirmationExtensions.has(tld) && /unsupported|not supported|invalid tld|tld/i.test(detail)) {
        return manualConfirmationResult(domain, tld, "Perlu confirmation admin.");
      }
      return errorResults([{ domain, tld }], detail || `Spaceship API returned ${response.status}.`)[0];
    }

    const data = await response.json();
    const rows = Array.isArray(data.domains) ? data.domains : [];
    const spaceshipItem = rows.find((item: Record<string, unknown>) => String(item.domain || "").toLowerCase() === domain.toLowerCase());

    if (!spaceshipItem) {
      if (manualConfirmationExtensions.has(tld)) {
        return manualConfirmationResult(domain, tld, "Perlu confirmation admin.");
      }
      return errorResults([{ domain, tld }], "No result returned by Spaceship API.")[0];
    }

    const normalized = normalizeSpaceshipResult(spaceshipItem, tld);
    return {
      ...normalized,
      domain,
    };
  } catch (error) {
    return errorResults([{ domain, tld }], error instanceof Error ? error.message : "Domain check failed.")[0];
  }
}

serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  const query = sanitizeName(body.name);
  if (!query || query.length < 2) {
    return jsonResponse({ error: "name is required." }, 400);
  }

  const domains = buildDomains(query);
  const apiKey = Deno.env.get("SPACESHIP_API_KEY");
  const apiSecret = Deno.env.get("SPACESHIP_API_SECRET");

  if (!apiKey || !apiSecret) {
    return jsonResponse({
      query,
      results: errorResults(domains, "Spaceship API secrets are not configured."),
    });
  }

  const results = await Promise.all(
    domains.map(({ domain, tld }) => checkSpaceshipDomain(domain, tld, apiKey, apiSecret)),
  );

  return jsonResponse({ query, results });
});
