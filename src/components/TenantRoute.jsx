import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import TenantLoading from '@/pages/TenantLoading';
import TenantNotFound from '@/pages/TenantNotFound';
import Unauthorized from '@/pages/Unauthorized';

export default function TenantRoute() {
  const location = useLocation();
  const { tenant, tenantId, loading: tenantLoading, tenantNotFound, hostname, error: tenantError } = useTenant();
  const { user, isAuthenticated, isLoadingAuth, authChecked, mustChangePassword } = useAuth();
  const [checkingMembership, setCheckingMembership] = useState(true);
  const [hasTenantAccess, setHasTenantAccess] = useState(false);
  const [membershipError, setMembershipError] = useState('');

  useEffect(() => {
    let active = true;

    async function checkMembership() {
      if (tenantLoading || !tenantId || !isAuthenticated || !user?.id) {
        setCheckingMembership(false);
        setHasTenantAccess(false);
        setMembershipError('');
        return;
      }

      setCheckingMembership(true);
      setMembershipError('');

      try {
        if (!supabase) throw new Error('Supabase is not configured.');

        const email = String(user.email || '').trim().toLowerCase();
        const filters = [
          `auth_user_id.eq.${user.id}`,
          `user_id.eq.${user.id}`,
          email ? `email.eq.${email}` : '',
        ].filter(Boolean).join(',');

        const { data, error } = await supabase
          .from('client_users')
          .select('id,tenant_id,status,role')
          .eq('tenant_id', tenantId)
          .or(filters)
          .limit(1)
          .maybeSingle();

        if (error) throw error;

        if (active) {
          setHasTenantAccess(Boolean(data && ['approved', 'active'].includes(String(data.status || '').toLowerCase())));
        }
      } catch (err) {
        if (active) {
          setHasTenantAccess(false);
          setMembershipError(err.message || 'Unable to verify tenant access.');
        }
      } finally {
        if (active) setCheckingMembership(false);
      }
    }

    checkMembership();

    return () => {
      active = false;
    };
  }, [isAuthenticated, tenantId, tenantLoading, user?.email, user?.id]);

  if (tenantLoading || isLoadingAuth || !authChecked || checkingMembership) return <TenantLoading />;
  if (tenantNotFound || !tenant) return <TenantNotFound hostname={hostname} error={tenantError} />;

  if (!isAuthenticated) {
    const next = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  if (mustChangePassword && location.pathname !== '/change-password') {
    return <Navigate to={`/change-password?next=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!hasTenantAccess) {
    return (
      <Unauthorized
        title="Tenant access required"
        message={membershipError || `This account is not assigned to ${tenant.business_name}.`}
        loginTo="/login"
      />
    );
  }

  return <Outlet />;
}
