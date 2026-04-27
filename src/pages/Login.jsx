import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import { signInClient } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkUserAuth } = useAuth();
  const params = new URLSearchParams(location.search);
  const nextPath = params.get('next') || '/dashboard';
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
      await signInClient(form.email, form.password);
      await checkUserAuth();
      navigate(nextPath, { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="px-6 py-20">
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl p-7 md:p-8" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(32,200,117,0.14)', color: 'var(--c-accent)' }}>
              <LockKeyhole size={22} />
            </div>
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>Secure access</p>
            <h1 className="text-3xl font-black mb-3" style={{ color: 'var(--c-text)' }}>Sign in</h1>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--c-muted)' }}>Use your admin or client account credentials.</p>

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
              {error && <p className="text-sm" style={{ color: '#DC2626' }}>{error}</p>}
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
