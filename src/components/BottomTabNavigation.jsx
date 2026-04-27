import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, LayoutDashboard, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const tabs = [
  { href: '/home', icon: Home, label: 'Home', labelMy: 'Utama' },
  { href: '/systems', icon: Layers, label: 'Systems', labelMy: 'Sistem' },
  { href: '/demo', icon: Play, label: 'Demo', labelMy: 'Demo' },
  { href: '/pricing', icon: Layers, label: 'Pricing', labelMy: 'Harga' },
  { href: '/dashboard', icon: LayoutDashboard, label: 'Portal', labelMy: 'Portal' },
];

export default function BottomTabNavigation() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const currentPath = pathname.toLowerCase();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 md:hidden z-50 flex"
      style={{
        backgroundColor: 'var(--c-surface)',
        borderTop: '1px solid var(--c-nav-border)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {tabs.map(({ href, icon: Icon, label, labelMy }) => {
        const active = currentPath === href;
        return (
          <Link key={href} to={href} className="flex-1 flex flex-col items-center py-3 gap-1 select-none">
            <Icon size={20} style={{ color: active ? 'var(--c-accent)' : 'var(--c-muted)' }} />
            <span className="text-xs" style={{ color: active ? 'var(--c-accent)' : 'var(--c-muted)' }}>
              {lang === 'en' ? label : labelMy}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
