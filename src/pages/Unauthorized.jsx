import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function Unauthorized({ title = 'Please sign in to continue.', message = 'Please sign in to continue.', loginTo = '/login' }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--c-page-bg)', color: 'var(--c-text)' }}>
      <div className="premium-card max-w-lg w-full p-7 md:p-9">
        <div className="mb-6 h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)' }}>
          <ShieldAlert size={22} />
        </div>
        <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>Sign in required</p>
        <h1 className="text-3xl font-black mb-3" style={{ color: 'var(--c-text)' }}>{title}</h1>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--c-muted)' }}>{message}</p>
        <Link to={loginTo} className="inline-flex rounded-xl px-5 py-3 text-sm font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
          Sign in
        </Link>
      </div>
    </div>
  );
}
