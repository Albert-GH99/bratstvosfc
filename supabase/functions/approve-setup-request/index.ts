import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function slugify(value: string) {
  return String(value || "client").toLowerCase().replace(/[^a-z0-9]+/g, "").replace(/^$/, "client");
}

function cleanDomain(value: string) {
  return String(value || "").trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "").toLowerCase();
}

function randomPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return `BRD-${Array.from(bytes, (byte) => chars[byte % chars.length]).join("")}`;
}

async function findAuthUserByEmail(supabase: ReturnType<typeof createClient>, email: string) {
  const target = email.toLowerCase();
  for (let page = 1; page <= 10; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    const found = data.users.find((user) => String(user.email || "").toLowerCase() === target);
    if (found) return found;
    if (data.users.length < 1000) return null;
  }
  return null;
}

async function sendLoginEmail(payload: {
  to: string;
  ownerName: string;
  businessName: string;
  selectedSystem: string;
  selectedPackage: string;
  billingPlan: string;
  clientWebsite: string;
  loginLink: string;
  tempPassword: string;
}) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const fromEmail = "Bratstvo Digital Team <support@bratstvosfc.com>";

  if (!resendApiKey) throw new Error("RESEND_API_KEY is not configured.");

  const text = `Hi ${payload.ownerName},

Your setup request for ${payload.businessName} has been approved.

System:
${payload.selectedSystem}

Package:
${payload.selectedPackage}

Billing plan:
${payload.billingPlan}

Your website:
https://${payload.clientWebsite}

Login details:

Email:
${payload.to}

Temporary password:
${payload.tempPassword}

IMPORTANT:
You will be required to change your password after first login.

Login here:
${payload.loginLink}

Friendly note:
Kami sudah sediakan akses sistem anda. Sila gunakan temporary password ini untuk login kali pertama, kemudian tukar password selepas masuk ke dashboard.

Thank you,
Bratstvo Digital`;

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#102019">
      <h2>Your Bratstvo Digital system access is ready</h2>
      <p>Hi ${payload.ownerName},</p>
      <p>Your setup request for <strong>${payload.businessName}</strong> has been approved.</p>
      <p><strong>System:</strong> ${payload.selectedSystem}<br/>
      <strong>Package:</strong> ${payload.selectedPackage}<br/>
      <strong>Billing plan:</strong> ${payload.billingPlan}</p>
      <p><strong>Proposed website link:</strong><br/>https://${payload.clientWebsite}</p>
      <div style="padding:16px;border:1px solid #dcefe5;border-radius:12px;background:#f5fff9">
        <p><strong>Login email:</strong><br/>${payload.to}</p>
        <p><strong>Temporary password:</strong><br/>${payload.tempPassword}</p>
        <p><strong>Login link:</strong><br/><a href="${payload.loginLink}">${payload.loginLink}</a></p>
      </div>
      <p><strong>Important:</strong> You will be required to change your password after first login.</p>
      <p>Kami sudah sediakan akses sistem anda. Sila login kali pertama dan tukar password selepas masuk ke dashboard.</p>
      <p>Thank you,<br/>Bratstvo Digital</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: payload.to,
      subject: "Your Bratstvo Digital system access is ready",
      text,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Email failed with status ${response.status}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ success: false, error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return json({ success: false, error: "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required." }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    const { request_id } = await req.json();
    if (!request_id || typeof request_id !== "string") {
      return json({ success: false, error: "request_id is required." }, 400);
    }

    const { data: request, error: fetchError } = await supabase
      .from("setup_requests")
      .select("*")
      .eq("request_id", request_id)
      .maybeSingle();

    if (fetchError) return json({ success: false, approved: false, error: fetchError.message }, 500);
    if (!request) return json({ success: false, approved: false, error: "Setup request not found." }, 404);

    const email = String(request.email || "").trim().toLowerCase();
    if (!email) return json({ success: false, approved: false, error: "Client email is missing." }, 400);

    const customDomain = cleanDomain(request.custom_domain || "");
    const subdomain = slugify(request.subdomain || request.business_name);
    const clientWebsite = customDomain
      ? customDomain
      : `${subdomain}.bratstvosfc.com`;
    const loginLink = customDomain
      ? `https://${customDomain}/login`
      : `https://${subdomain}.bratstvosfc.com/login`;
    const tempPassword = randomPassword();
    const approvedAt = new Date().toISOString();

    const { data: tenant, error: tenantError } = await supabase
      .from("tenants")
      .upsert({
        business_name: request.business_name,
        subdomain,
        custom_domain: customDomain || null,
        status: "active",
        plan: request.billing_plan || request.plan_name || "starter",
        system_type: request.selected_system || request.system_name || "client_system",
        branding: {
          logo_text: String(request.business_name || "BD").slice(0, 2).toUpperCase(),
          primary_color: "#16C47F",
        },
        settings: {
          hero_title: request.business_name,
          hero_subtitle: "Website ini sedang disediakan. Maklumat produk, servis atau booking akan dikemaskini tidak lama lagi.",
          public_site_ready: false,
          onboarding_request_id: request.request_id,
        },
      }, { onConflict: "subdomain" })
      .select("id,business_name,subdomain,custom_domain,status,plan,system_type,branding,settings,created_at")
      .single();

    if (tenantError || !tenant) {
      return json({ success: false, approved: false, error: tenantError?.message || "Tenant could not be created." }, 500);
    }

    const { data: client, error: clientError } = await supabase
      .from("clients")
      .upsert({
        id: tenant.id,
        business_name: request.business_name,
        status: "active",
      }, { onConflict: "id" })
      .select("id,business_name,status")
      .single();

    if (clientError || !client) {
      console.error("Client row upsert failed:", clientError?.message);
      return json({ success: false, approved: false, error: "Client record could not be created." }, 500);
    }

    let authUser = await findAuthUserByEmail(supabase, email);
    if (authUser) {
      const { data, error } = await supabase.auth.admin.updateUserById(authUser.id, {
        password: tempPassword,
        email_confirm: true,
        user_metadata: {
          ...(authUser.user_metadata || {}),
          role: "client",
          tenant_id: tenant.id,
          tenant_subdomain: subdomain,
          business_name: request.business_name,
          client_website: clientWebsite,
          must_change_password: true,
        },
      });
      if (error) return json({ success: false, approved: false, error: error.message }, 500);
      authUser = data.user;
    } else {
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: {
          role: "client",
          tenant_id: tenant.id,
          tenant_subdomain: subdomain,
          business_name: request.business_name,
          client_website: clientWebsite,
          must_change_password: true,
        },
      });
      if (error) return json({ success: false, approved: false, error: error.message }, 500);
      authUser = data.user;
    }

    const clientUserPayload = {
      user_id: authUser.id,
      client_id: client.id,
      role: "owner",
      status: "active",
      must_change_password: true,
    };

    const { error: clientUserError } = await supabase
      .from("client_users")
      .upsert(clientUserPayload, { onConflict: "user_id" });

    if (clientUserError) {
      console.error("Client membership upsert failed:", clientUserError.message);
      return json({ success: false, approved: false, error: "Client membership could not be created." }, 500);
    }

    const approvedUpdate = {
      status: "approved",
      approved_at: approvedAt,
      tenant_id: tenant.id,
      client_id: client.id,
      client_user_id: authUser.id,
      temp_password: tempPassword,
      client_website: clientWebsite,
      client_website_status: "pending_setup",
      client_email_sent: false,
      must_change_password: true,
      domain_type: request.domain_type || "bratstvo_domain",
      custom_domain: customDomain,
    };

    const { error: approveError } = await supabase
      .from("setup_requests")
      .update(approvedUpdate)
      .eq("request_id", request_id);

    if (approveError) return json({ success: false, approved: false, error: approveError.message }, 500);

    try {
      await sendLoginEmail({
        to: email,
        ownerName: request.owner_name || "",
        businessName: request.business_name || "",
        selectedSystem: request.selected_system || request.system_name || "",
        selectedPackage: request.selected_package || request.package_name || "",
        billingPlan: request.billing_plan || request.plan_name || "",
        clientWebsite,
        loginLink,
        tempPassword,
      });
    } catch (emailError) {
      return json({
        success: false,
        approved: true,
        client_user_id: authUser.id,
        client_website: clientWebsite,
        email_sent: false,
        temp_password: tempPassword,
        error: emailError instanceof Error ? emailError.message : "Email failed.",
      });
    }

    const { error: emailFlagError } = await supabase
      .from("setup_requests")
      .update({ client_email_sent: true })
      .eq("request_id", request_id);

    if (emailFlagError) {
      return json({
        success: false,
        approved: true,
        client_user_id: authUser.id,
        client_website: clientWebsite,
        email_sent: true,
        temp_password: tempPassword,
        error: emailFlagError.message,
      });
    }

    return json({
      success: true,
      approved: true,
      client_user_id: authUser.id,
      client_website: clientWebsite,
      email_sent: true,
      temp_password: tempPassword,
    });
  } catch (error) {
    return json({ success: false, error: error instanceof Error ? error.message : "Unknown error" }, 500);
  }
});
