import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { cleanTenantSlug as cleanClientSlug } from '@/lib/tenant';

const ClientContext = createContext(null);

const BASE_CLIENT_COLUMNS = 'id,business_name,subdomain,custom_domain,status,plan,system_type,branding,settings,created_at';
const CLIENT_COLUMNS = 'id,business_name,subdomain,custom_domain,status,plan,system_type,branding,settings,logo_url,logo_path,banner_url,banner_path,created_at';

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

function detectClientRoute(pathname = '', routeSlug = '') {
  const segments = String(pathname || '')
    .split('/')
    .map(segment => segment.trim())
    .filter(Boolean);
  const firstSegment = cleanClientSlug(segments[0] || '');
  const secondSegment = cleanClientSlug(segments[1] || '');
  const slugFromParams = cleanClientSlug(routeSlug || '');

  if (!segments.length) {
    return {
      hostname: '',
      subdomain: null,
      mode: 'main',
      routeMode: 'main',
      isMainDomain: true,
      isAdminDomain: false,
      isClientRoute: false,
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
      isClientRoute: false,
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
      isClientRoute: true,
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
      isClientRoute: true,
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
    isClientRoute: false,
    isTenantDomain: false,
    isLocalhost: false,
    lookupType: null,
    lookupValue: null,
  };
}

export function ClientProvider({ children }) {
  const location = useLocation();
  const params = useParams();
  const host = useMemo(() => detectClientRoute(location.pathname, params.slug), [location.pathname, params.slug]);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(host.isClientRoute);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadClient() {
      if (!host.isClientRoute || !host.lookupType || !host.lookupValue) {
        setClient(null);
        setLoading(false);
        setError('');
        return;
      }

      if (!isSupabaseConfigured || !supabase) {
        setClient(null);
        setLoading(false);
        setError('Unable to prepare this page.');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const query = supabase
          .from('tenants')
          .select(CLIENT_COLUMNS)
          .eq('status', 'active')
          .limit(1);

        let { data, error: queryError } = await (host.lookupType === 'custom_domain'
          ? query.eq('custom_domain', host.lookupValue).maybeSingle()
          : query.eq('subdomain', host.lookupValue).maybeSingle());

        if (queryError && /logo_url|logo_path|banner_url|banner_path|schema cache|column/i.test(queryError.message || '')) {
          const fallbackQuery = supabase
            .from('tenants')
            .select(BASE_CLIENT_COLUMNS)
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

        const normalizedClient = normalizeClient(data);
        setClient(normalizedClient);
      } catch (err) {
        if (!active) return;
        setClient(null);
        setError(err.message || 'Unable to prepare this page.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadClient();

    return () => {
      active = false;
    };
  }, [host]);

  const value = useMemo(() => ({
    ...host,
    tenant: client,
    tenantId: client?.id || null,
    tenantType: client?.systemType || null,
    client,
    clientId: client?.id || null,
    clientSlug: host.subdomain,
    businessSlug: host.subdomain,
    loading,
    error,
    clientNotFound: host.isClientRoute && !loading && !client,
    tenantNotFound: host.isClientRoute && !loading && !client,
  }), [client, error, host, loading]);

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used inside ClientProvider.');
  }
  return context;
}

export const TenantProvider = ClientProvider;
export const useTenant = useClient;
