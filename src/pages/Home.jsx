import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CheckCircle2, CreditCard, LayoutDashboard, MessageSquareText, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { businessSystems, getText } from '../data/systems';
import { useLanguage } from '../context/LanguageContext';

const fadeUp = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } };

const copy = {
  en: {
    badge: 'Digital systems for Malaysian businesses',
    titleA: 'Not an empty demo.',
    titleB: 'A system you can sell.',
    subtitle: 'Bratstvo Digital builds order, booking, product, CRM, invoice and membership systems with real client flow, owner dashboard and scalable SaaS structure.',
    demo: 'Try live demo',
    pricing: 'View pricing',
    dashboard: 'Owner Dashboard',
    dashSub: 'Today orders and payment',
    stats: [['24h', 'early setup target for simple flow'], ['20', 'available business systems'], ['RM149+', 'one-time build starts'], ['Admin PRO', 'products, orders, customers and reports']],
    valueLabel: 'What clients get',
    valueTitle: 'A system for operations, not just a pretty page.',
    valueText: 'Each module answers daily work: incoming orders, clear payment status, organised admin and owner visibility.',
    promises: [
      ['Not just a landing page', 'Every package focuses on real flow: customer submits, owner receives data, status is managed and reports can be read.'],
      ['WhatsApp still stays central', 'We make WhatsApp cleaner: orders, bookings or leads arrive with complete context.'],
      ['Payment can start simple', 'Start with QR or bank transfer. Upgrade to Billplz, ToyyibPay or Stripe when volume justifies it.'],
      ['Built to grow', 'Database, dashboard and modules are structured for products, orders, clients, invoices and staff later.'],
    ],
    systemsLabel: 'Popular systems',
    systemsTitle: 'Choose based on business problem.',
    allSystems: 'View all systems',
    howLabel: 'How it works',
    howTitle: 'From idea to usable system.',
    howText: 'We do not pretend payment is automatic from day one. Start with the right stage, then upgrade when the business needs it.',
    setup: 'Start setup',
    ctaTitle: 'Try the demo first. If it fits, proceed.',
    ctaText: 'The demo now has customer flow, owner dashboard, order summary, payment status and more realistic example data.',
    checkSystems: 'Check systems',
  },
  my: {
    badge: 'Sistem digital untuk bisnes Malaysia',
    titleA: 'Bukan demo kosong.',
    titleB: 'Ini sistem yang boleh dijual.',
    subtitle: 'Bratstvo Digital bina sistem order, booking, produk, CRM, invoice dan membership dengan flow client sebenar, owner dashboard dan struktur SaaS yang boleh scale.',
    demo: 'Cuba demo hidup',
    pricing: 'Tengok harga',
    dashboard: 'Dashboard Owner',
    dashSub: 'Order dan bayaran hari ini',
    stats: [['24 jam', 'target setup awal untuk flow ringkas'], ['20', 'sistem bisnes tersedia'], ['RM149+', 'mula build sekali bayar'], ['Admin PRO', 'produk, order, customer dan report']],
    valueLabel: 'Apa yang client dapat',
    valueTitle: 'Sistem yang bantu operasi, bukan sekadar nampak cantik.',
    valueText: 'Setiap modul jawab masalah kerja harian: order masuk, payment jelas, admin tersusun dan owner tahu apa yang berlaku.',
    promises: [
      ['Bukan landing page kosong', 'Setiap pakej fokus pada flow sebenar: pelanggan submit, owner terima data, status boleh diurus dan laporan boleh dibaca.'],
      ['WhatsApp masih pusat jualan', 'Kami susun WhatsApp supaya order, booking atau lead masuk dengan format lengkap.'],
      ['Payment boleh mula simple', 'Mula dengan QR atau bank transfer. Upgrade ke Billplz, ToyyibPay atau Stripe bila volume sudah justify.'],
      ['Struktur boleh grow', 'Database, dashboard dan modul dibuat supaya produk, order, client, invoice dan staff boleh berkembang kemudian.'],
    ],
    systemsLabel: 'Sistem popular',
    systemsTitle: 'Pilih ikut masalah bisnes.',
    allSystems: 'Lihat semua sistem',
    howLabel: 'Macam mana ia berfungsi',
    howTitle: 'Dari idea sampai sistem boleh digunakan.',
    howText: 'Untuk payment, kami tidak pura-pura semua automatik hari pertama. Kita mula ikut stage bisnes, kemudian upgrade bila perlu.',
    setup: 'Mula setup',
    ctaTitle: 'Cuba demo dulu. Kalau ngam, terus proceed.',
    ctaText: 'Demo ada flow pelanggan, owner dashboard, order summary, status bayaran dan contoh data yang lebih realistik.',
    checkSystems: 'Semak sistem',
  },
};

const promiseIcons = [LayoutDashboard, MessageSquareText, CreditCard, ShieldCheck];

const steps = {
  en: [
    ['Brief and scope', 'We collect business type, workflow, products, slots, staff, payment and the main problem.'],
    ['Build system', 'Customer frontend, owner dashboard, Supabase database and product/order/client structure are prepared by package.'],
    ['Payment flow', 'Start with manual bank transfer or QR. Connect a gateway when automatic verification is needed.'],
    ['Launch and training', 'Client receives system link, dashboard access, short guide and operations checklist.'],
  ],
  my: [
    ['Brief dan scope', 'Kami kumpul jenis bisnes, workflow, produk, slot, staff, bayaran dan masalah utama.'],
    ['Build sistem', 'Frontend pelanggan, dashboard owner, database Supabase dan struktur order/product/client disiapkan ikut pakej.'],
    ['Payment flow', 'Mula dengan bank transfer atau QR manual. Sambung gateway bila perlu auto verify.'],
    ['Launch dan training', 'Client dapat link sistem, akses dashboard, panduan ringkas dan checklist operasi.'],
  ],
};

export default function Home() {
  const { lang } = useLanguage();
  const t = copy[lang] || copy.en;
  const featured = businessSystems.slice(0, 6);

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="relative overflow-hidden px-6 py-24 md:py-28">
        <div className="bd-animated-grid absolute inset-0 opacity-70" />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.55 }}>
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold mb-7" style={{ color: 'var(--c-accent)', background: 'rgba(32,200,117,0.10)', border: '1px solid rgba(32,200,117,0.24)' }}>
              <Sparkles size={14} /> {t.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.02] mb-6" style={{ color: 'var(--c-text)' }}>
              {t.titleA}
              <span className="block" style={{ color: 'var(--c-accent)' }}>{t.titleB}</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-9" style={{ color: 'var(--c-muted)' }}>{t.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/demo" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-black transition-all hover:brightness-110" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>{t.demo} <ArrowRight size={17} /></Link>
              <Link to="/pricing" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-black transition-all hover:bg-white/5" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>{t.pricing}</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.12 }} className="bd-glass rounded-2xl p-4 md:p-5 bd-float">
            <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(2,16,10,0.72)', border: '1px solid var(--c-border)' }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--c-border)' }}>
                <div>
                  <p className="text-sm font-black text-white">{t.dashboard}</p>
                  <p className="text-xs" style={{ color: '#A9B9AD' }}>{t.dashSub}</p>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: 'rgba(32,200,117,0.14)', color: '#20C875' }}>Live</span>
              </div>
              <div className="relative p-4 grid gap-3">
                <div className="bd-scan-line absolute left-0 right-0 top-0 h-16 bg-gradient-to-b from-transparent via-[rgba(32,200,117,0.18)] to-transparent pointer-events-none" />
                {[
                  ['Nasi Lemak Ayam x2', 'RM25.80', lang === 'en' ? 'Payment confirmed' : 'Bayaran disahkan'],
                  ['Premium Shawl x1', 'RM55.00', lang === 'en' ? 'Waiting for packing' : 'Menunggu packing'],
                  ['Haircut + Wash', '5:30 PM', 'Booking confirmed'],
                ].map(([title, value, status]) => (
                  <div key={title} className="rounded-xl p-4 flex items-center justify-between gap-4" style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.09)' }}>
                    <div>
                      <p className="text-sm font-bold text-white">{title}</p>
                      <p className="text-xs" style={{ color: '#A9B9AD' }}>{status}</p>
                    </div>
                    <p className="text-sm font-black" style={{ color: '#20C875' }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-10" style={{ background: 'var(--c-surface)', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.stats.map(([value, label]) => (
            <div key={value} className="text-center">
              <p className="text-2xl md:text-3xl font-black" style={{ color: 'var(--c-accent)' }}>{value}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--c-muted)' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{t.valueLabel}</p>
            <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ color: 'var(--c-text)' }}>{t.valueTitle}</h2>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.valueText}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.promises.map(([title, text], index) => {
              const Icon = promiseIcons[index];
              return (
                <motion.div key={title} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.45, delay: index * 0.05 }} className="rounded-xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                  <Icon size={22} className="mb-4" style={{ color: index === 2 ? 'var(--c-gold)' : 'var(--c-accent)' }} />
                  <h3 className="font-black mb-2" style={{ color: 'var(--c-text)' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20" style={{ background: 'var(--c-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{t.systemsLabel}</p>
              <h2 className="text-3xl md:text-4xl font-black" style={{ color: 'var(--c-text)' }}>{t.systemsTitle}</h2>
            </div>
            <Link to="/systems" className="inline-flex items-center gap-2 text-sm font-black" style={{ color: 'var(--c-accent)' }}>{t.allSystems} <ArrowRight size={16} /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map(system => (
              <Link key={system.id} to="/systems" className="rounded-xl p-5 transition-all hover:-translate-y-1 block" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs font-bold mb-1" style={{ color: 'var(--c-accent)' }}>{getText(system.category, lang)}</p>
                    <h3 className="font-black" style={{ color: 'var(--c-text)' }}>{system.emoji} {getText(system.name, lang)}</h3>
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-black" style={{ background: 'rgba(32,200,117,0.12)', color: 'var(--c-accent)' }}>RM{system.priceFrom}+</span>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--c-muted)' }}>{getText(system.tagline, lang)}</p>
                <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--c-text)' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--c-accent)' }} />
                  {getText(system.bestFor, lang)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{t.howLabel}</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--c-text)' }}>{t.howTitle}</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--c-muted)' }}>{t.howText}</p>
            <Link to="/setup" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>{t.setup} <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-3">
            {steps[lang].map(([title, text], index) => (
              <div key={title} className="rounded-xl p-5 flex gap-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-black shrink-0" style={{ background: index === 2 ? 'var(--c-gold)' : 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>{index + 1}</div>
                <div>
                  <h3 className="font-black mb-1" style={{ color: 'var(--c-text)' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20" style={{ background: 'var(--c-surface)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <Zap size={28} className="mx-auto mb-5" style={{ color: 'var(--c-accent)' }} />
          <h2 className="text-3xl md:text-5xl font-black mb-5" style={{ color: 'var(--c-text)' }}>{t.ctaTitle}</h2>
          <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: 'var(--c-muted)' }}>{t.ctaText}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/demo" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>{t.demo} <BarChart3 size={17} /></Link>
            <Link to="/systems" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-black" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>{t.checkSystems}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
