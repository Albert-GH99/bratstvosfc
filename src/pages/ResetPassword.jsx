import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
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

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/change-password`,
      });

      if (resetError) throw resetError;
      setMessage('Password reset link sent. Please check your email.');
    } catch (err) {
      setError(err.message || 'Unable to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <section className="px-6 py-20">
        <div className="max-w-md mx-auto rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5" style={{ color: 'var(--c-accent)', border: '1px solid var(--c-border)' }}>
            <Mail size={14} /> Account access
          </div>
          <h1 className="text-3xl font-black mb-3" style={{ color: 'var(--c-text)' }}>Reset password</h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--c-muted)' }}>
            Enter your email and we will send a secure link to set a new password.
          </p>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="text-xs font-bold mb-2 block" style={{ color: 'var(--c-muted)' }}>Email</span>
              <input
                value={email}
                onChange={event => setEmail(event.target.value)}
                type="email"
                required
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
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>

          <Link to="/login" className="mt-4 inline-block text-sm font-bold" style={{ color: 'var(--c-accent)' }}>
            Back to login
          </Link>
        </div>
      </section>
    </div>
  );
}
