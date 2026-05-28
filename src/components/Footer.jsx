import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import brandMark from '../assets/brand/bd-mark-military.png';
import { useLang } from '@/context/LanguageContext';
import PremiumButton from '@/components/premium/PremiumButton';

export default function Footer() {
  const { lang, t } = useLang();

  const systems = [
    { en: 'eCommerce System', my: 'Sistem eCommerce', href: '/systems' },
    { en: 'Booking System', my: 'Sistem Booking', href: '/systems' },
    { en: 'Food Order System', my: 'Sistem Food Order', href: '/systems' },
    { en: 'Delivery Dispatch', my: 'Delivery Dispatch', href: '/systems' },
    { en: 'Custom Website', my: 'Custom Website', href: '/setup?system=custom-website' },
  ];

  const links = [
    { en: 'Home', my: 'Utama', href: '/' },
    { en: 'Systems', my: 'Sistem', href: '/systems' },
    { en: 'Demo', my: 'Demo', href: '/demo' },
    { en: 'Pricing', my: 'Harga', href: '/pricing' },
    { en: 'About', my: 'Tentang Kami', href: '/about' },
  ];

  return (
    <footer className="relative px-5 pb-10 pt-20 md:px-6" style={{ background: 'var(--c-bg)' }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--c-accent), transparent)' }} />
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="premium-card p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-12 w-12 rounded-xl overflow-hidden shrink-0" style={{ border: '1px solid var(--c-border)', background: 'var(--c-brand-olive)' }}>
                <img src={brandMark} alt="Bratstvo Digital" className="h-full w-full object-cover" />
              </span>
              <span>
                <span className="block text-lg font-black" style={{ color: 'var(--c-text)' }}>Bratstvo Digital</span>
                <span className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: 'var(--c-accent)' }}>Premium SME Systems</span>
              </span>
            </div>
            <h2 className="max-w-3xl text-3xl font-black leading-tight md:text-5xl" style={{ color: 'var(--c-text)' }}>
              {lang === 'en' ? 'Build a system your customers can trust and your team can actually run.' : 'Bina sistem yang customer percaya dan team anda boleh guna setiap hari.'}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed md:text-base" style={{ color: 'var(--c-muted)' }}>
              {t.footer.tagline}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <PremiumButton to="/setup" className="px-5 py-3 text-sm">
                {lang === 'en' ? 'Start Setup' : 'Mula Setup'} <ArrowRight size={15} />
              </PremiumButton>
              <PremiumButton to="/demo" variant="secondary" className="px-5 py-3 text-sm">
                {lang === 'en' ? 'View Demo' : 'Lihat Demo'}
              </PremiumButton>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              [ShieldCheck, lang === 'en' ? 'Professional first impression' : 'Nampak lebih professional', lang === 'en' ? 'A cleaner website and system helps customers trust your business faster.' : 'Website dan sistem yang kemas bantu customer lebih cepat percaya.'],
              [Mail, 'support@bratstvosfc.com', lang === 'en' ? 'Send your business details and we will guide the right setup.' : 'Hantar detail bisnes anda dan kami bantu cadangkan setup yang sesuai.'],
              [MessageCircle, lang === 'en' ? 'WhatsApp order-ready' : 'Sedia untuk order WhatsApp', lang === 'en' ? 'Turn repeated chat questions into clearer order, booking and payment steps.' : 'Tukar soalan chat berulang kepada langkah order, booking dan payment yang lebih jelas.'],
            ].map(([Icon, title, text]) => (
              <div key={title} className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <Icon size={20} style={{ color: 'var(--c-accent)' }} />
                <p className="mt-4 font-black" style={{ color: 'var(--c-text)' }}>{title}</p>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 border-t pt-8 md:grid-cols-3" style={{ borderColor: 'var(--c-border)' }}>
          <div>
            <p className="premium-eyebrow mb-4">Systems</p>
            <div className="space-y-2">
              {systems.map(item => (
                <Link key={item.en} to={item.href} className="block text-sm" style={{ color: 'var(--c-muted)' }}>{lang === 'en' ? item.en : item.my}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="premium-eyebrow mb-4">{t.footer.quickLinks}</p>
            <div className="space-y-2">
              {links.map(item => (
                <Link key={item.en} to={item.href} className="block text-sm" style={{ color: 'var(--c-muted)' }}>{lang === 'en' ? item.en : item.my}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="premium-eyebrow mb-4">Contact</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
              {lang === 'en'
                ? 'For business owners who want a professional website, order system, booking system or custom digital setup.'
                : 'Untuk pemilik bisnes yang mahukan website professional, sistem order, sistem booking atau setup digital khas.'}
            </p>
            <Link to="/admin/signin" className="mt-4 inline-block text-xs font-bold" style={{ color: 'var(--c-muted)' }}>
              Admin
            </Link>
          </div>
        </div>

        <div className="mt-10 text-center text-xs" style={{ color: 'var(--c-muted)' }}>
          {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
