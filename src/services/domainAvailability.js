import { requireSupabase } from '../lib/supabase';
import { getDomainPricing, SUPPORTED_DOMAIN_EXTENSIONS } from '@/config/domainPricing';

export function normalizeDomainName(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .replace(/\.(com\.my|com|my|net|co)$/i, '')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

export function buildDomainSuggestions(value = '') {
  const name = normalizeDomainName(value);
  if (!name) return [];

  return SUPPORTED_DOMAIN_EXTENSIONS.map(extension => ({
    name,
    extension,
    domain: `${name}${extension}`,
    pricing: getDomainPricing(extension),
  }));
}

export async function checkDomainAvailability(name) {
  const db = requireSupabase();
  const query = normalizeDomainName(name);

  if (!query) {
    return {
      query: '',
      results: [],
    };
  }

  const { data, error } = await db.functions.invoke('check-domain-availability', {
    body: { name: query },
  });

  if (error) {
    const suggestions = buildDomainSuggestions(query);
    return {
      query,
      results: suggestions.map(item => ({
        domain: item.domain,
        tld: item.extension,
        available: false,
        premium: null,
        price: null,
        currency: null,
        status: 'error',
        message: 'Domain tak dapat disemak sekarang. Cuba lagi atau pilih link path Bratstvo dahulu.',
      })),
    };
  }

  return data;
}
