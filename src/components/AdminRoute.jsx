import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { supabase } from '@/lib/supabase';
import { isApprovedAdminProfile } from '@/lib/authProfiles';

const ADMIN_EMAIL = 'admin@bratstvosfc.com';

const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center" style={{ background: 'var(--c-page-bg)' }}>
    <div className="w-8 h-8 border-4 rounded-full animate-spin" style={{ borderColor: 'var(--c-border)', borderTopColor: 'var(--c-accent)' }}></div>
  </div>
);

export default function AdminRoute({ fallback = <DefaultFallback />, unauthenticatedElement }) {
  const { user, isAuthenticated, isLoadingAuth, authChecked, authError, checkUserAuth } = useAuth();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);
  const [adminCheckError, setAdminCheckError] = useState('');

  useEffect(() => {
    if (!authChecked && !isLoadingAuth && checkUserAuth) {
      checkUserAuth();
    }
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  useEffect(() => {
    let active = true;

    const checkAdminAccess = async () => {
      if (!authChecked || isLoadingAuth || !isAuthenticated || !user?.id) {
        setHasAdminAccess(false);
        setIsCheckingAdmin(false);
        setAdminCheckError('');
        return;
      }

      const email = String(user.email || '').trim().toLowerCase();
      if (email === ADMIN_EMAIL) {
        setHasAdminAccess(true);
        setIsCheckingAdmin(false);
        setAdminCheckError('');
        return;
      }

      setIsCheckingAdmin(true);
      setAdminCheckError('');

      try {
        if (!supabase) throw new Error('Supabase is not configured.');

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', email)
          .maybeSingle();

        if (error) throw error;

        const allowed = isApprovedAdminProfile(data);

        if (active) setHasAdminAccess(allowed);
      } catch (error) {
        console.error('Admin profile check failed:', error);
        if (active) {
          setHasAdminAccess(false);
          setAdminCheckError(error.message || 'Unable to check admin access.');
        }
      } finally {
        if (active) setIsCheckingAdmin(false);
      }
    };

    checkAdminAccess();

    return () => {
      active = false;
    };
  }, [authChecked, isAuthenticated, isLoadingAuth, user?.id, user?.email]);

  if (isLoadingAuth || !authChecked || isCheckingAdmin) {
    return fallback;
  }

  if (authError) {
    if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
    return unauthenticatedElement;
  }

  if (!isAuthenticated) {
    if (unauthenticatedElement) return unauthenticatedElement;

    return (
      <div className="page-shell">
        <section className="px-6 py-20">
          <div className="max-w-3xl mx-auto rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>Admin access</p>
            <h1 className="text-3xl font-black mb-3" style={{ color: 'var(--c-text)' }}>Admin Access Required</h1>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--c-muted)' }}>
              Please sign in with an approved HQ account to open the admin dashboard.
            </p>
            <Link to={`/login?next=${encodeURIComponent('/master')}`} className="inline-flex rounded-xl px-5 py-3 text-sm font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
              Login to HQ
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (!hasAdminAccess) {
    return (
      <div className="page-shell">
        <section className="px-6 py-20">
          <div className="max-w-3xl mx-auto rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>Admin access</p>
            <h1 className="text-3xl font-black mb-3" style={{ color: 'var(--c-text)' }}>Admin account required</h1>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--c-muted)' }}>
              You are logged in, but this account is not an admin.
            </p>
            {adminCheckError && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>{adminCheckError}</p>}
          </div>
        </section>
      </div>
    );
  }

  return <Outlet />;
}
