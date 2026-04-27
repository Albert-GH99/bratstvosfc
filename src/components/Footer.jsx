import { Link } from 'react-router-dom';
import brandMark from '../assets/brand/bd-mark-military.png';
import { useLang } from './LanguageContext';

export default function Footer() {
  const { lang, t } = useLang();

  const links = [
    { en: 'Home', my: 'Utama', href: '/home' },
    { en: 'Systems', my: 'Sistem', href: '/systems' },
    { en: 'Try Demo', my: 'Cuba Demo', href: '/demo' },
    { en: 'Pricing', my: 'Harga', href: '/pricing' },
    { en: 'Client Portal', my: 'Portal Client', href: '/dashboard' },
  ];

  return (
    <footer className="py-16 px-6" style={{ background: '#05090D', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-9 h-9 rounded-lg overflow-hidden shrink-0"
                style={{ border: '1px solid rgba(194,168,107,0.38)', background: 'var(--c-brand-olive)' }}
              >
                <img src={brandMark} alt="Bratstvo Digital" className="w-full h-full object-cover" />
              </span>
              <span className="font-bold text-sm" style={{ color: '#E6EDF3' }}>
                Bratstvo <span style={{ color: 'var(--c-accent)' }}>Digital</span>
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: '#9BA6B2' }}>
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--c-accent)' }}>
              {t.footer.quickLinks}
            </p>
            <div className="space-y-2">
              {links.map(l => (
                <Link key={l.href} to={l.href} className="block text-sm transition-colors" style={{ color: '#9BA6B2' }}>
                  {lang === 'en' ? l.en : l.my}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--c-accent)' }}>
              {lang === 'en' ? 'Next Step' : 'Langkah Seterusnya'}
            </p>
            <p className="text-sm mb-4" style={{ color: '#9BA6B2' }}>
              {lang === 'en'
                ? 'Start with setup. WhatsApp opens only after the business details are complete.'
                : 'Mula dengan setup. WhatsApp hanya dibuka selepas detail bisnes lengkap supaya perbualan terus ada konteks.'}
            </p>
            <Link
              to="/setup"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:brightness-110"
              style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
            >
              {lang === 'en' ? 'Start Setup' : 'Mula Setup'}
            </Link>
          </div>
        </div>

        <div className="pt-8 text-center text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: '#9BA6B2' }}>
          {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
