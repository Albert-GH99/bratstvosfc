import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import TenantLoading from '@/pages/TenantLoading';

export default function TenantRoute() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      setLoading(true);

      try {
        if (!supabase) {
          setSession(null);
          return;
        }

        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (active) {
          setSession(data?.session || null);
        }
      } catch (err) {
        console.warn('Dashboard session check failed:', err?.message || err);
        if (active) {
          setSession(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    checkSession();

    if (!supabase) {
      return () => {
        active = false;
      };
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) {
        setSession(nextSession || null);
        setLoading(false);
      }
    });

    return () => {
      active = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return <TenantLoading title="Preparing your dashboard..." />;
  }

  if (!session) {
    const next = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  return <Outlet />;
}
