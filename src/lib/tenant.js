import { BRATSTVO_DOMAIN } from '@/lib/appConfig';

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0']);

export function cleanTenantHostname(hostname = '') {
  return String(hostname)
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, '');
}

export function cleanTenantSlug(value = '') {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');
}

export function getTenantFromHostname(hostname = '') {
  const cleanHostname = cleanTenantHostname(hostname);

  if (!cleanHostname || LOCAL_HOSTS.has(cleanHostname)) {
    return {
      hostname: cleanHostname,
      mode: 'main',
      subdomain: null,
      domain: null,
      isLocalhost: Boolean(cleanHostname && LOCAL_HOSTS.has(cleanHostname)),
    };
  }

  if (cleanHostname === BRATSTVO_DOMAIN || cleanHostname === `www.${BRATSTVO_DOMAIN}`) {
    return {
      hostname: cleanHostname,
      mode: 'main',
      subdomain: null,
      domain: null,
      isLocalhost: false,
    };
  }

  if (cleanHostname === `admin.${BRATSTVO_DOMAIN}`) {
    return {
      hostname: cleanHostname,
      mode: 'admin',
      subdomain: 'admin',
      domain: null,
      isLocalhost: false,
    };
  }

  if (cleanHostname.endsWith(`.${BRATSTVO_DOMAIN}`)) {
    const labelsBeforeRoot = cleanHostname
      .slice(0, -(`.${BRATSTVO_DOMAIN}`).length)
      .split('.')
      .filter(Boolean);
    const subdomain = labelsBeforeRoot[0] || null;

    if (!subdomain || subdomain === 'www') {
      return {
        hostname: cleanHostname,
        mode: 'main',
        subdomain: null,
        domain: null,
        isLocalhost: false,
      };
    }

    if (subdomain === 'admin') {
      return {
        hostname: cleanHostname,
        mode: 'admin',
        subdomain: 'admin',
        domain: null,
        isLocalhost: false,
      };
    }

    return {
      hostname: cleanHostname,
      mode: 'tenant',
      subdomain,
      domain: null,
      isLocalhost: false,
    };
  }

  return {
    hostname: cleanHostname,
    mode: 'custom_domain',
    subdomain: null,
    domain: cleanHostname,
    isLocalhost: false,
  };
}
