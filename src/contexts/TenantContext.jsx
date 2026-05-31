import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { cleanTenantSlug } from '@/lib/tenant';

const TenantContext = createContext(null);

const BASE_TENANT_COLUMNS = 'id,business_name,subdomain,custom_domain,status,plan,system_type,branding,settings,created_at';
const TENANT_COLUMNS = 'id,business_name,subdomain,custom_domain,status,plan,system_type,branding,settings,logo_url,logo_path,banner_url,banner_path,created_at';

export const RESERVED_CLIENT_SLUGS = new Set([
  'systems',
  'demo',
  'pricing',
  'about',
  'setup',
  'payment',
  'login',
  'signup',
  'reset-password',
  'update-password',
  'change-password',
  'master',
  'core',
  'admin',
]);

export function normalizeClient(row) {
  if (!row) return null;

  const branding = {
    ...(row.branding || {}),
    logo_url: row.branding?.logo_url || row.logo_url || '',
    logo_path: row.branding?.logo_path || row.logo_path || '',
    banner_url: row.branding?.banner_url || row.banner_url || '',
    banner_path: row.branding?.banner_path || row.banner_path || '',
  };

  const settings = {
    ...(row.settings || {}),
    logo_url: row.settings?.logo_url || row.logo_url || '',
    logo_path: row.settings?.logo_path || row.logo_path || '',
    banner_url: row.settings?.banner_url || row.banner_url || '',
    banner_path: row.settings?.banner_path || row.banner_path || '',
  };

  return {
    id: row.id,
    businessName: row.business_name,
    subdomain: row.subdomain,
    customDomain: row.custom_domain,
    status: row.status,
    plan: row.plan,
    systemType: row.system_type,
    branding,
    settings,
    createdAt: row.created_at,
  };
}

export const normalizeTenant = normalizeClient;

function detectClientRoute(pathname = '', routeSlug = '') {
  const segments = String(pathname || '')
    .split('/')
    .map(segment => segment.trim())
    .filter(Boolean);
  const firstSegment = cleanTenantSlug(segments[0] || '');
  const secondSegment = cleanTenantSlug(segments[1] || '');
  const slugFromParams = cleanTenantSlug(routeSlug || '');

  if (!segments.length) {
    return {
      hostname: '',
      subdomain: null,
      mode: 'main',
      routeMode: 'main',
      isMainDomain: true,
      isAdminDomain: false,
      isTenantDomain: false,
      isLocalhost: false,
      lookupType: null,
      lookupValue: null,
    };
  }

  if (firstSegment === 'master') {
    return {
      hostname: '',
      subdomain: null,
      mode: 'admin',
      routeMode: 'admin',
      isMainDomain: false,
      isAdminDomain: true,
      isTenantDomain: false,
      isLocalhost: false,
      lookupType: null,
      lookupValue: null,
    };
  }

  if (firstSegment === 'core' && (slugFromParams || secondSegment)) {
    const slug = slugFromParams || secondSegment;
    return {
      hostname: '',
      subdomain: slug,
      mode: 'client_core',
      routeMode: 'client_core',
      isMainDomain: false,
      isAdminDomain: false,
      isTenantDomain: true,
      isLocalhost: false,
      lookupType: 'subdomain',
      lookupValue: slug,
    };
  }

  if (segments.length === 1 && firstSegment && !RESERVED_CLIENT_SLUGS.has(firstSegment)) {
    return {
      hostname: '',
      subdomain: firstSegment,
      mode: 'client_public',
      routeMode: 'client_public',
      isMainDomain: false,
      isAdminDomain: false,
      isTenantDomain: true,
      isLocalhost: false,
      lookupType: 'subdomain',
      lookupValue: firstSegment,
    };
  }

  return {
    hostname: '',
    subdomain: null,
    mode: 'main',
    routeMode: 'main',
    isMainDomain: true,
    isAdminDomain: false,
    isTenantDomain: false,
    isLocalhost: false,
    lookupType: null,
    lookupValue: null,
  };
}

export function TenantProvider({ children }) {
  const location = useLocation();
  const params = useParams();
  const host = useMemo(() => detectClientRoute(location.pathname, params.slug), [location.pathname, params.slug]);
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(host.isTenantDomain);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadTenant() {
      if (!host.isTenantDomain || !host.lookupType || !host.lookupValue) {
        setTenant(null);
        setLoading(false);
        setError('');
        return;
      }

      if (!isSupabaseConfigured || !supabase) {
        setTenant(null);
        setLoading(false);
        setError('Unable to prepare this page.');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const query = supabase
          .from('tenants')
          .select(TENANT_COLUMNS)
          .eq('status', 'active')
          .limit(1);

        let { data, error: queryError } = await (host.lookupType === 'custom_domain'
          ? query.eq('custom_domain', host.lookupValue).maybeSingle()
          : query.eq('subdomain', host.lookupValue).maybeSingle());

        if (queryError && /logo_url|logo_path|banner_url|banner_path|schema cache|column/i.test(queryError.message || '')) {
          const fallbackQuery = supabase
            .from('tenants')
            .select(BASE_TENANT_COLUMNS)
            .eq('status', 'active')
            .limit(1);

          const retry = await (host.lookupType === 'custom_domain'
            ? fallbackQuery.eq('custom_domain', host.lookupValue).maybeSingle()
            : fallbackQuery.eq('subdomain', host.lookupValue).maybeSingle());

          data = retry.data;
          queryError = retry.error;
        }

        if (queryError) throw queryError;
        if (!active) return;

        const normalizedTenant = normalizeClient(data);
        setTenant(normalizedTenant);
      } catch (err) {
        if (!active) return;
        setTenant(null);
        setError(err.message || 'Unable to prepare this page.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadTenant();

    return () => {
      active = false;
    };
  }, [host]);

  const value = useMemo(() => ({
    ...host,
    tenant,
    tenantId: tenant?.id || null,
    tenantType: tenant?.systemType || null,
    client: tenant,
    clientId: tenant?.id || null,
    clientSlug: host.subdomain,
    businessSlug: host.subdomain,
    loading,
    error,
    tenantNotFound: host.isTenantDomain && !loading && !tenant,
  }), [error, host, loading, tenant]);

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used inside TenantProvider.');
  }
  return context;
}
