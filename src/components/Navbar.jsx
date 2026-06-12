import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Languages, Menu, Moon, ShieldCheck, Sun, X } from 'lucide-react';
import brandMark from '../assets/brand/bd-mark-military.png';
import { useLang } from '@/context/LanguageContext';
import PremiumButton from '@/components/premium/PremiumButton';

export default function Navbar() {
  const { lang, setLang, theme, setTheme } = useLang();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const currentPath = pathname.toLowerCase();

  const links = [
    { label: 'Home', labelMy: 'Utama', href: '/' },
    { label: 'Systems', labelMy: 'Sistem', href: '/systems' },
    { label: 'Demo', labelMy: 'Demo', href: '/demo' },
    { label: 'Pricing', labelMy: 'Harga', href: '/pricing' },
    { label: 'About', labelMy: 'Tentang', href: '/about' },
  ];

  const toggleLang = () => setLang(lang === 'en' ? 'my' : 'en');
  const isLight = theme === 'light';
  const ThemeIcon = isLight ? Moon : Sun;
  const toggleTheme = () => setTheme(isLight ? 'dark' : 'light');
  const setupLabel = lang === 'en' ? 'Start Setup' : 'Mula Setup';

  const isActive = href => href === '/' ? currentPath === '/' : currentPath.startsWith(href);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = event => {
      if (event.matches) setOpen(false);
    };

    if (desktopQuery.matches) setOpen(false);
    desktopQuery.addEventListener('change', closeOnDesktop);

    return () => {
      desktopQuery.removeEventListener('change', closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (open) {
      root.dataset.scrollLock = 'true';
    } else {
      delete root.dataset.scrollLock;
    }

    return () => {
      delete root.dataset.scrollLock;
    };
  }, [open]);

  return (
    <nav className="sticky left-0 right-0 top-0 z-50 px-4 py-2.5 sm:px-6 md:py-3 lg:px-8">
      <div
        className="mx-auto max-w-7xl rounded-2xl px-2.5 md:px-4"
        style={{
          background: 'var(--c-nav)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--c-nav-border)',
          boxShadow: '0 12px 34px rgba(0,0,0,0.16)',
        }}
      >
        <div className="grid h-[58px] grid-cols-[1fr_auto] items-center gap-3 md:flex md:h-16 md:justify-between">
          <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="h-9 w-9 shrink-0 overflow-hidden rounded-xl md:h-10 md:w-10" style={{ border: '1px solid var(--c-border)', background: 'var(--c-brand-olive)' }}>
              <img src={brandMark} alt="Bratstvo Digital" className="h-full w-full object-cover" />
            </span>
            <span className="hidden leading-none sm:flex sm:flex-col">
              <span className="text-sm font-black tracking-tight" style={{ color: 'var(--c-text)' }}>BRATSTVO</span>
              <span className="text-xs font-light tracking-[0.22em]" style={{ color: 'var(--c-accent)' }}>DIGITAL</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 rounded-2xl p-1 md:flex" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
            {links.map(link => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="relative rounded-xl px-4 py-2 text-sm font-bold transition-colors"
                  style={{ color: active ? 'var(--c-text)' : 'var(--c-muted)' }}
                >
                  {active && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-xl" style={{ background: 'var(--c-surface-strong)', border: '1px solid var(--c-border)' }} />}
                  <span className="relative z-10">{lang === 'en' ? link.label : link.labelMy}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center justify-self-end gap-2">
            <button
              onClick={toggleLang}
              className="hidden rounded-xl px-3 py-2 text-[11px] font-black md:inline-flex"
              style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)', background: 'var(--c-input-bg)' }}
              aria-label="Switch language"
            >
              <span style={{ color: lang === 'en' ? 'var(--c-accent)' : 'var(--c-muted)' }}>EN</span>
              <span style={{ color: 'var(--c-muted)' }}> / </span>
              <span style={{ color: lang === 'my' ? 'var(--c-accent)' : 'var(--c-muted)' }}>MY</span>
            </button>
            <button
              onClick={toggleTheme}
              className="hidden h-10 w-10 items-center justify-center rounded-xl md:flex"
              style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)', background: 'var(--c-input-bg)' }}
              aria-label="Switch theme"
            >
              <ThemeIcon size={16} />
            </button>
            <PremiumButton to="/setup" className="hidden px-4 py-2.5 text-sm md:inline-flex">
              {setupLabel}
            </PremiumButton>
            <button
              onClick={toggleLang}
              className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-2 text-[11px] font-black md:hidden"
              style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)', background: 'var(--c-input-bg)' }}
              aria-label="Switch language"
            >
              {lang.toUpperCase()}
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
              style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)', background: 'var(--c-input-bg)' }}
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[74px] z-40 min-h-[calc(100vh-74px)] px-4 pb-6 pt-4 md:hidden"
            style={{ background: 'rgba(3,7,5,0.92)', backdropFilter: 'blur(24px)' }}
          >
            <div className="mx-auto max-w-md">
              <div className="grid gap-1">
                {links.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-4 text-[17px] font-black"
                    style={{ color: isActive(link.href) ? 'var(--c-text)' : 'var(--c-muted)', background: isActive(link.href) ? 'var(--c-input-bg)' : 'transparent' }}
                  >
                    {lang === 'en' ? link.label : link.labelMy}
                  </Link>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                <PremiumButton to="/setup" className="w-full px-5 py-4 text-sm" onClick={() => setOpen(false)}>
                  {setupLabel}
                </PremiumButton>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={toggleLang}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black"
                    style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)', background: 'var(--c-input-bg)' }}
                  >
                    <Languages size={16} />
                    {lang === 'en' ? 'MY' : 'EN'}
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black"
                    style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)', background: 'var(--c-input-bg)' }}
                  >
                    <ThemeIcon size={16} />
                    {isLight ? 'Dark' : 'Light'}
                  </button>
                </div>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-center text-sm font-black"
                  style={{ color: 'var(--c-muted)', border: '1px solid var(--c-border)' }}
                >
                  Login
                </Link>
                <Link
                  to="/master/signin"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-black"
                  style={{ color: 'var(--c-muted)' }}
                >
                  <ShieldCheck size={14} />
                  Admin
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
