import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { signOutClient } from '@/services/authService';

const copy = {
  en: {
    label: 'Business access required',
    title: 'Access not available',
    message: 'This account is not connected to this business yet. Please contact support.',
    signOut: 'Sign out',
  },
  my: {
    label: 'Akses bisnes diperlukan',
    title: 'Akses belum tersedia',
    message: 'Akaun ini belum disambungkan dengan bisnes ini. Sila hubungi support.',
    signOut: 'Log keluar',
  },
};

export default function AccessNotAvailable({ loginTo = '/login' }) {
  const { lang } = useLang();
  const navigate = useNavigate();
  const { setUser, setMustChangePassword } = useAuth();
  const [signingOut, setSigningOut] = useState(false);
  const t = copy[lang] || copy.en;

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await signOutClient();
    } catch (err) {
      console.warn('Sign out failed:', err?.message || err);
    } finally {
      setUser(null);
      setMustChangePassword(false);
      navigate(loginTo, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--c-page-bg)', color: 'var(--c-text)' }}>
      <div className="premium-card max-w-lg w-full p-7 md:p-9">
        <div className="mb-6 h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)' }}>
          <ShieldAlert size={22} />
        </div>
        <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{t.label}</p>
        <h1 className="text-3xl font-black mb-3" style={{ color: 'var(--c-text)' }}>{t.title}</h1>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--c-muted)' }}>{t.message}</p>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="inline-flex rounded-xl px-5 py-3 text-sm font-black disabled:opacity-60"
          style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
        >
          {signingOut ? `${t.signOut}...` : t.signOut}
        </button>
      </div>
    </div>
  );
}
