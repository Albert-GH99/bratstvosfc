import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import brandMark from '../assets/brand/bd-mark-military.png';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, setLang, theme, setTheme } = useLanguage();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const currentPath = pathname.toLowerCase();

  const links = [
    { label: 'Home', labelMy: 'Utama', href: '/home' },
    { label: 'Systems', labelMy: 'Sistem', href: '/systems' },
    { label: 'Try Demo', labelMy: 'Cuba Demo', href: '/demo' },
    { label: 'Pricing', labelMy: 'Harga', href: '/pricing' },
    { label: 'Client Portal', labelMy: 'Portal Client', href: '/dashboard' },
  ];

  const isLight = theme === 'light';

  return (
    <nav
      style={{
        backgroundColor: 'var(--c-nav)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--c-nav-border)',
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/home" className="flex items-center gap-2.5">
          <span
            className="w-10 h-10 rounded-lg overflow-hidden shrink-0"
            style={{ border: '1px solid rgba(194,168,107,0.38)', background: 'var(--c-brand-olive)' }}
          >
            <img src={brandMark} alt="Bratstvo Digital" className="w-full h-full object-cover" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-black text-sm tracking-tight" style={{ color: 'var(--c-text)' }}>BRATSTVO</span>
            <span className="font-light text-xs tracking-widest" style={{ color: 'var(--c-accent)', letterSpacing: '0.15em' }}>DIGITAL</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <Link
              key={l.href}
              to={l.href}
              className="text-sm transition-colors duration-200"
              style={{ color: currentPath === l.href ? 'var(--c-accent)' : 'var(--c-muted)' }}
              onMouseEnter={e => { if (currentPath !== l.href) e.target.style.color = 'var(--c-text)'; }}
              onMouseLeave={e => { if (currentPath !== l.href) e.target.style.color = 'var(--c-muted)'; }}
            >
              {lang === 'en' ? l.label : l.labelMy}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
            style={{ color: 'var(--c-muted)', border: '1px solid var(--c-border)' }}
            aria-label="Toggle theme"
          >
            {isLight ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <button
            onClick={() => setLang(lang === 'en' ? 'my' : 'en')}
            className="text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
            style={{ color: 'var(--c-muted)', border: '1px solid var(--c-border)' }}
          >
            {lang === 'en' ? 'MY' : 'EN'}
          </button>
          <Link
            to="/setup"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:brightness-110"
            style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
          >
            {lang === 'en' ? 'Start Setup' : 'Mula Setup'}
          </Link>
        </div>

        <button className="md:hidden" style={{ color: 'var(--c-muted)' }} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div style={{ backgroundColor: 'var(--c-surface)', borderBottom: '1px solid var(--c-border)' }} className="md:hidden px-6 pb-4">
          {links.map(l => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm border-b"
              style={{ color: currentPath === l.href ? 'var(--c-accent)' : 'var(--c-muted)', borderColor: 'var(--c-border)' }}
            >
              {lang === 'en' ? l.label : l.labelMy}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-4">
            <button
              onClick={() => setTheme(isLight ? 'dark' : 'light')}
              className="w-8 h-8 flex items-center justify-center rounded-md"
              style={{ color: 'var(--c-muted)', border: '1px solid var(--c-border)' }}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={14} /> : <Sun size={14} />}
            </button>
            <button
              onClick={() => setLang(lang === 'en' ? 'my' : 'en')}
              className="text-xs px-3 py-1.5 rounded-md"
              style={{ color: 'var(--c-muted)', border: '1px solid var(--c-border)' }}
            >
              {lang === 'en' ? 'BM' : 'EN'}
            </button>
            <Link
              to="/setup"
              onClick={() => setOpen(false)}
              className="flex-1 text-sm font-semibold px-4 py-2 rounded-lg text-center"
              style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
            >
              {lang === 'en' ? 'Start Setup' : 'Mula Setup'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
