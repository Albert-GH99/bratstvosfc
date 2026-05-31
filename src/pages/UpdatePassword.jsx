import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '@/context/AuthContext';

function safeNextPath(value = '') {
  if (!value || typeof value !== 'string') return '';
  if (!value.startsWith('/') || value.startsWith('//')) return '';
  if (value.startsWith('/admin')) return value.replace(/^\/admin/, '/master') || '/master';
  return value;
}

export default function UpdatePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkUserAuth, setMustChangePassword } = useAuth();
  const params = new URLSearchParams(location.search);
  const nextPath = safeNextPath(params.get('next')) || '/';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = async event => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      if (!supabase) throw new Error('Supabase is not configured.');
      if (password.length < 8) throw new Error('Password must be at least 8 characters.');
      if (password !== confirmPassword) throw new Error('Passwords do not match.');

      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const user = userData?.user;
      if (user?.id) {
        const { error: metadataError } = await supabase.auth.updateUser({
          data: {
            ...(user.user_metadata || {}),
            must_change_password: false,
          },
        });

        if (metadataError) throw metadataError;

        const email = String(user.email || '').trim().toLowerCase();

        const { error: clientUserError } = await supabase
          .from('client_users')
          .update({ must_change_password: false })
          .eq('user_id', user.id)
          .eq('status', 'active');

        if (clientUserError) {
          console.warn('Password-change flag update failed:', clientUserError.message);
        }

        try {
          await supabase
            .from('profiles')
            .update({ must_change_password: false })
            .eq('email', email);
        } catch {
          // Optional column for projects that keep the flag in profiles too.
        }

        const { error: requestUpdateError } = await supabase
          .from('setup_requests')
          .update({ temp_password: null, must_change_password: false })
          .eq('client_user_id', user.id);

        if (requestUpdateError) console.warn('Temporary setup password cleanup failed:', requestUpdateError.message);
      }

      setMustChangePassword(false);
      await checkUserAuth();
      setPassword('');
      setConfirmPassword('');
      setMessage('Password updated. You can now access your dashboard.');
      navigate(nextPath, { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <section className="px-6 py-20">
        <div className="max-w-md mx-auto rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5" style={{ color: 'var(--c-accent)', border: '1px solid var(--c-border)' }}>
            <LockKeyhole size={14} /> Secure password
          </div>
          <h1 className="text-3xl font-black mb-3" style={{ color: 'var(--c-text)' }}>Change password</h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--c-muted)' }}>
            Set a new password for your dashboard.
          </p>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="text-xs font-bold mb-2 block" style={{ color: 'var(--c-muted)' }}>New password</span>
              <input
                value={password}
                onChange={event => setPassword(event.target.value)}
                type="password"
                required
                minLength={8}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold mb-2 block" style={{ color: 'var(--c-muted)' }}>Confirm password</span>
              <input
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
                type="password"
                required
                minLength={8}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}
              />
            </label>

            {message && <p className="text-sm" style={{ color: 'var(--c-accent)' }}>{message}</p>}
            {error && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl px-4 py-3 text-sm font-black disabled:opacity-50"
              style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
            >
              {loading ? 'Updating...' : 'Change password'}
            </button>
          </form>

          <Link to="/login" className="mt-4 inline-block text-sm font-bold" style={{ color: 'var(--c-accent)' }}>
            Go to login
          </Link>
        </div>
      </section>
    </div>
  );
}
