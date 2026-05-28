import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import { signInClient } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { hasAdminAccess } from '../lib/authProfiles';
import { supabase } from '../lib/supabase';
import { useTenant } from '@/contexts/TenantContext';

async function userMustChangePassword(user, fallbackEmail) {
  if (user?.user_metadata?.must_change_password || user?.app_metadata?.must_change_password) return true;
  if (!supabase || !user?.id) return false;

  const email = String(user.email || fallbackEmail || '').trim().toLowerCase();
  const filters = [
    `auth_user_id.eq.${user.id}`,
    `user_id.eq.${user.id}`,
    email ? `email.eq.${email}` : '',
  ].filter(Boolean).join(',');

  const { data: clientUser, error: clientUserError } = await supabase
    .from('client_users')
    .select('must_change_password')
    .or(filters)
    .limit(1)
    .maybeSingle();

  if (clientUserError) throw clientUserError;
  if (clientUser?.must_change_password) return true;

  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('must_change_password')
      .eq('email', email)
      .maybeSingle();

    return Boolean(profile?.must_change_password);
  } catch {
    return false;
  }
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkUserAuth } = useAuth();
  const { routeMode } = useTenant();
  const params = new URLSearchParams(location.search);
  const isTenantMode = routeMode === 'tenant' || routeMode === 'custom_domain';
  const isAdminSignInPath = routeMode === 'admin' || location.pathname.toLowerCase().startsWith('/admin');
  const defaultNextPath = isTenantMode ? '/dashboard' : isAdminSignInPath ? '/admin' : '/';
  const nextPath = params.get('next') || defaultNextPath;
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = form.email && form.password;
  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const submit = async event => {
    event.preventDefault();
    if (!canSubmit || loading) return;

    setLoading(true);
    setError('');

    try {
      const result = await signInClient(form.email, form.password);
      await checkUserAuth();
      const user = result?.user || { email: form.email };
      const requiresPasswordChange = await userMustChangePassword(user, form.email);

      if (requiresPasswordChange) {
        navigate(`/change-password?next=${encodeURIComponent(nextPath)}`, { replace: true });
        return;
      }

      const canOpenAdmin = !isTenantMode && isAdminSignInPath && await hasAdminAccess(user);
      navigate(canOpenAdmin ? '/admin' : nextPath, { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <section className="px-6 py-20">
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl p-7 md:p-8" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(32,200,117,0.14)', color: 'var(--c-accent)' }}>
              <LockKeyhole size={22} />
            </div>
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>Secure access</p>
            <h1 className="text-3xl font-black mb-3" style={{ color: 'var(--c-text)' }}>Sign in</h1>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--c-muted)' }}>Sign in to manage your business website, system or owner dashboard.</p>

            <form onSubmit={submit} className="space-y-4">
              <input
                value={form.email}
                onChange={event => set('email', event.target.value)}
                type="email"
                placeholder="Email"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}
              />
              <input
                value={form.password}
                onChange={event => set('password', event.target.value)}
                type="password"
                placeholder="Password"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}
              />
              {error && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>{error}</p>}
              <div className="flex justify-end">
                <Link to="/reset-password" className="text-sm font-bold" style={{ color: 'var(--c-accent)' }}>
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="w-full rounded-xl py-3 text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-50"
                style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
              >
                {loading ? 'Signing in...' : 'Sign in'} <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
