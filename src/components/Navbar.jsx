import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
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

  return (
    <nav className="sticky left-0 right-0 top-0 z-50 px-4 py-3 sm:px-6 lg:px-8">
      <div
        className="mx-auto max-w-7xl rounded-2xl px-3 sm:px-4"
        style={{
          background: 'var(--c-nav)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--c-nav-border)',
          boxShadow: 'var(--c-card-shadow)',
        }}
      >
        <div className="grid h-14 grid-cols-[44px_1fr_auto] items-center gap-2 md:flex md:h-16 md:justify-between">
          <button
            className="md:hidden h-10 w-10 rounded-xl flex items-center justify-center"
            style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)', background: 'var(--c-input-bg)' }}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>

          <Link to="/" className="flex items-center gap-2.5 justify-self-center md:justify-self-auto" onClick={() => setOpen(false)}>
            <span className="h-10 w-10 rounded-xl overflow-hidden shrink-0" style={{ border: '1px solid var(--c-border)', background: 'var(--c-brand-olive)' }}>
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
              className="rounded-xl px-3 py-2 text-[11px] font-black"
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
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden md:hidden"
            >
              <div className="grid gap-2 pb-4 pt-2">
                {links.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-bold"
                    style={{ color: isActive(link.href) ? 'var(--c-text)' : 'var(--c-muted)', background: isActive(link.href) ? 'var(--c-input-bg)' : 'transparent' }}
                  >
                    {lang === 'en' ? link.label : link.labelMy}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    toggleTheme();
                    setOpen(false);
                  }}
                  className="rounded-xl px-4 py-3 text-sm font-black inline-flex items-center justify-center gap-2"
                  style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)', background: 'var(--c-input-bg)' }}
                >
                  <ThemeIcon size={16} />
                  {isLight ? 'Dark' : 'Light'}
                </button>
                <PremiumButton to="/setup" className="w-full px-4 py-3 text-sm" onClick={() => setOpen(false)}>
                  {setupLabel}
                </PremiumButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
