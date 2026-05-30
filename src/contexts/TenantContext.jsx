import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { cleanTenantSlug, getTenantFromHostname } from '@/lib/tenant';

const TenantContext = createContext(null);

const BASE_TENANT_COLUMNS = 'id,business_name,subdomain,custom_domain,status,plan,system_type,branding,settings,created_at';
const TENANT_COLUMNS = 'id,business_name,subdomain,custom_domain,status,plan,system_type,branding,settings,logo_url,logo_path,banner_url,banner_path,created_at';

export function normalizeTenant(row) {
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

function detectTenantHost() {
  if (typeof window === 'undefined') {
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

  const parsed = getTenantFromHostname(window.location.hostname);
  const hostname = parsed.hostname;
  const params = new URLSearchParams(window.location.search);
  const devTenant = cleanTenantSlug(params.get('tenant') || import.meta.env.VITE_DEV_TENANT_SUBDOMAIN || '');
  const isLocalhost = parsed.isLocalhost;

  if (isLocalhost) {
    const routeMode = window.location.pathname.toLowerCase().startsWith('/admin')
      ? 'admin'
      : devTenant
        ? 'tenant'
        : 'main';

    return {
      hostname,
      subdomain: devTenant || null,
      mode: routeMode,
      routeMode,
      isMainDomain: routeMode === 'main',
      isAdminDomain: routeMode === 'admin',
      isTenantDomain: routeMode === 'tenant',
      isLocalhost: true,
      lookupType: devTenant ? 'subdomain' : null,
      lookupValue: devTenant || null,
    };
  }

  const isTenantDomain = parsed.mode === 'tenant' || parsed.mode === 'custom_domain';

  return {
    hostname,
    subdomain: parsed.subdomain,
    mode: parsed.mode,
    routeMode: parsed.mode,
    isMainDomain: parsed.mode === 'main',
    isAdminDomain: parsed.mode === 'admin',
    isTenantDomain,
    isLocalhost: parsed.isLocalhost,
    lookupType: parsed.mode === 'custom_domain' ? 'custom_domain' : parsed.mode === 'tenant' ? 'subdomain' : null,
    lookupValue: parsed.mode === 'custom_domain' ? parsed.domain : parsed.mode === 'tenant' ? parsed.subdomain : null,
  };
}

export function TenantProvider({ children }) {
  const host = useMemo(() => detectTenantHost(), []);
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

        setTenant(normalizeTenant(data));
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
