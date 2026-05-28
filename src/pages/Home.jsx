import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  ShoppingBag,
  Sparkles,
  Store,
} from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import BusinessProcessTimeline from '@/components/premium/BusinessProcessTimeline';
import GradientBackground from '@/components/premium/GradientBackground';
import PhoneOrderPreview from '@/components/premium/PhoneOrderPreview';
import PremiumButton from '@/components/premium/PremiumButton';
import PremiumCard from '@/components/premium/PremiumCard';
import RealDashboardPreview from '@/components/premium/RealDashboardPreview';
import SectionShell from '@/components/premium/SectionShell';
import SystemShowcaseVisual from '@/components/premium/SystemShowcaseVisual';
import WhatsAppToSystemVisual from '@/components/premium/WhatsAppToSystemVisual';

const copy = {
  en: {
    badge: 'Premium websites and systems for Malaysian SMEs',
    title: 'Premium websites and systems for businesses that want to look more professional.',
    highlight: 'Orders, bookings, payments and customers - all more organised.',
    subtitle: 'We build websites, order systems, booking systems, appointment systems, food order flows and dispatch tools for SMEs that want to stop managing everything manually on WhatsApp.',
    explore: 'Explore Systems',
    setup: 'Start Setup',
    demo: 'Try Demo',
    scroll: 'See how it works',
    stats: [
      ['Cleaner orders', 'No more scattered chat records'],
      ['Easier booking', 'Slots and deposits in one flow'],
      ['Payment status', 'Know what is paid and pending'],
      ['Premium look', 'Customers trust the business faster'],
    ],
    problemLabel: 'Before / After',
    problemTitle: 'Your business feels messy now. We turn it into a cleaner buying experience.',
    problemSub: 'Customers can order, book and pay with less friction. Owners can see products, bookings, customers and payment status from one place.',
    beforeTitle: 'Before',
    afterTitle: 'After',
    before: ['Orders hidden inside long WhatsApp chats', 'Customers keep asking the same questions', 'Payment status is checked manually', 'Business looks smaller than it actually is'],
    after: ['Customers order or book from a polished website', 'Products, slots and details are clearly displayed', 'Payment and customer records are easier to track', 'Business looks trusted, sharp and ready to grow'],
    showcaseLabel: 'What customers see',
    showcaseTitle: 'A modern website in front, a clear dashboard behind it.',
    showcaseSub: 'Your customer gets a smooth mobile experience. You get a practical place to review orders, bookings, customers and payments.',
    systemsLabel: 'Popular systems',
    systemsTitle: 'Pick the system that matches how your business sells.',
    systemsSub: 'Start with one system or combine up to three on the setup page for bundle savings.',
    processLabel: 'Simple way to start',
    processTitle: 'From idea to a professional system without making it complicated.',
    processSub: 'Choose the system, choose a package, send your business details and we confirm the best way to build it.',
  },
  my: {
    badge: 'Website dan sistem premium untuk SME Malaysia',
    title: 'Website & sistem premium untuk bisnes yang nak nampak lebih professional.',
    highlight: 'Order, booking, payment dan customer - semua lebih tersusun.',
    subtitle: 'Kami bina website, sistem order, booking, appointment, food order dan dispatch untuk SME yang nak berhenti urus semuanya secara manual di WhatsApp.',
    explore: 'Lihat Sistem',
    setup: 'Mula Setup',
    demo: 'Cuba Demo',
    scroll: 'Lihat cara sistem berfungsi',
    stats: [
      ['Order lebih kemas', 'Tidak lagi tenggelam dalam chat'],
      ['Booking lebih mudah', 'Slot dan deposit dalam satu flow'],
      ['Status payment jelas', 'Nampak paid dan pending'],
      ['Bisnes nampak premium', 'Customer lebih cepat percaya'],
    ],
    problemLabel: 'Sebelum / Selepas',
    problemTitle: 'Bisnes nampak berselerak sekarang. Kami jadikan pengalaman membeli lebih kemas.',
    problemSub: 'Customer boleh order, booking dan bayar dengan lebih mudah. Owner pula boleh pantau produk, booking, customer dan status payment dari satu tempat.',
    beforeTitle: 'Sebelum',
    afterTitle: 'Selepas',
    before: ['Order terselit dalam chat WhatsApp panjang', 'Customer ulang soalan yang sama', 'Status payment kena semak manual', 'Bisnes nampak lebih kecil daripada realiti'],
    after: ['Customer order atau booking dari website yang kemas', 'Produk, slot dan detail dipaparkan dengan jelas', 'Payment dan rekod customer lebih mudah dijejak', 'Bisnes nampak trusted, sharp dan sedia berkembang'],
    showcaseLabel: 'Apa customer nampak',
    showcaseTitle: 'Website moden di depan, dashboard jelas di belakang.',
    showcaseSub: 'Customer dapat pengalaman mobile yang smooth. Owner pula ada tempat praktikal untuk semak order, booking, customer dan payment.',
    systemsLabel: 'Sistem popular',
    systemsTitle: 'Pilih sistem yang sesuai dengan cara bisnes anda menjual.',
    systemsSub: 'Mula dengan satu sistem atau gabungkan sehingga tiga sistem di setup page untuk bundle saving.',
    processLabel: 'Cara mudah untuk mula',
    processTitle: 'Daripada idea kepada sistem professional tanpa proses yang memeningkan.',
    processSub: 'Pilih sistem, pilih pakej, hantar detail bisnes dan kami confirm cara build yang paling sesuai.',
  },
};

const statIcons = [ShoppingBag, CalendarDays, CreditCard, Store];

function HeroTrustRow({ stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.28 }}
      className="grid grid-cols-2 gap-3 md:grid-cols-4"
    >
      {stats.map(([label, value], index) => {
        const Icon = statIcons[index] || CheckCircle2;
        return (
          <div key={label} className="rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <Icon size={18} className="mb-4" style={{ color: 'var(--c-accent)' }} />
            <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{label}</p>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{value}</p>
          </div>
        );
      })}
    </motion.div>
  );
}

function BeforeAfterPanel({ title, items, type }) {
  const positive = type === 'after';

  return (
    <PremiumCard glow={positive} className="relative overflow-hidden p-5 md:p-7" hover>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 className="text-2xl font-black leading-tight" style={{ color: 'var(--c-text)' }}>{title}</h3>
        <span className="rounded-full px-3 py-1 text-xs font-black" style={{ background: positive ? 'var(--c-accent)' : 'var(--c-input-bg)', color: positive ? 'var(--c-accent-contrast)' : 'var(--c-muted)', border: '1px solid var(--c-border)' }}>
          {positive ? 'READY' : 'MANUAL'}
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.28, delay: index * 0.045 }}
            className="flex gap-3 rounded-2xl p-3"
            style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}
          >
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: positive ? 'var(--c-accent)' : 'var(--c-muted)' }} />
            <span className="text-sm leading-relaxed" style={{ color: positive ? 'var(--c-text)' : 'var(--c-muted)' }}>{item}</span>
          </motion.div>
        ))}
      </div>
    </PremiumCard>
  );
}

function SystemTeaserCards({ labels, lang }) {
  const systems = [
    ['ecommerce', 'eCommerce System', lang === 'my' ? 'Untuk jual produk, checkout dan payment record.' : 'Sell products with checkout and payment records.'],
    ['booking', 'Booking System', lang === 'my' ? 'Untuk slot booking, deposit dan calendar.' : 'Manage booking slots, deposits and calendars.'],
    ['food', 'Food Order System', lang === 'my' ? 'Untuk menu, pickup, delivery dan kitchen order.' : 'Run menus, pickup, delivery and kitchen orders.'],
  ];

  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ staggerChildren: 0.08 }} className="grid gap-5 md:grid-cols-3">
      {systems.map(([type, title, text]) => (
        <motion.article key={title} variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }} className="overflow-hidden rounded-[28px]" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', boxShadow: 'var(--c-card-shadow)' }}>
          <div className="p-3">
            <SystemShowcaseVisual type={type} label="Business" compact />
          </div>
          <div className="p-5 pt-2">
            <h3 className="text-xl font-black" style={{ color: 'var(--c-text)' }}>{title}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{text}</p>
            <PremiumButton to={`/setup?system=${type}&package=business`} variant="ghost" className="mt-5 w-full px-4 py-3 text-xs">
              {labels.setup} <ArrowRight size={14} />
            </PremiumButton>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

export default function Home() {
  const { lang } = useLang();
  const t = copy[lang] || copy.en;

  return (
    <GradientBackground className="page-shell">
      <section className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-8 py-10 md:py-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42 }}
              className="premium-eyebrow mb-4 inline-flex rounded-full px-4 py-2"
              style={{ background: 'var(--c-primary-soft)', border: '1px solid rgba(24,217,138,.24)' }}
            >
              <Sparkles size={14} className="mr-2" /> {t.badge}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.06 }}
              className="hero-title mb-5 max-w-[760px]"
            >
              {t.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, delay: 0.13 }}
              className="mb-4 max-w-2xl text-lg font-black leading-relaxed md:text-xl"
              style={{ color: 'var(--c-text)' }}
            >
              <span className="gradient-text">{t.highlight}</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, delay: 0.18 }}
              className="mb-7 max-w-2xl text-base leading-relaxed md:text-lg"
              style={{ color: 'var(--c-muted)' }}
            >
              {t.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.44, delay: 0.24 }}
              className="mb-7 flex flex-col gap-3 sm:flex-row"
            >
              <PremiumButton to="/systems" className="px-6 py-3.5 text-sm">{t.explore} <ArrowRight size={17} /></PremiumButton>
              <PremiumButton to="/setup" variant="secondary" className="px-6 py-3.5 text-sm">{t.setup}</PremiumButton>
              <PremiumButton to="/demo" variant="ghost" className="px-6 py-3.5 text-sm">{t.demo}</PremiumButton>
            </motion.div>

            <HeroTrustRow stats={t.stats} />
          </div>

          <div className="relative mx-auto w-full max-w-[680px] lg:max-w-none">
            <RealDashboardPreview />
          </div>
        </div>

        <motion.a
          href="#story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-xs font-black md:inline-flex"
          style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}
        >
          {t.scroll} <ArrowDown size={14} />
        </motion.a>
      </section>

      <div className="section-divider-glow" />

      <SectionShell id="story" eyebrow={t.problemLabel} title={t.problemTitle} subtitle={t.problemSub}>
        <div className="mb-6">
          <WhatsAppToSystemVisual />
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <BeforeAfterPanel title={t.beforeTitle} items={t.before} type="before" />
          <BeforeAfterPanel title={t.afterTitle} items={t.after} type="after" />
        </div>
      </SectionShell>

      <SectionShell eyebrow={t.showcaseLabel} title={t.showcaseTitle} subtitle={t.showcaseSub}>
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_0.58fr]">
          <RealDashboardPreview compact />
          <PhoneOrderPreview />
        </div>
      </SectionShell>

      <SectionShell eyebrow={t.systemsLabel} title={t.systemsTitle} subtitle={t.systemsSub}>
        <SystemTeaserCards labels={t} lang={lang} />
      </SectionShell>

      <SectionShell eyebrow={t.processLabel} title={t.processTitle} subtitle={t.processSub}>
        <BusinessProcessTimeline />
      </SectionShell>
    </GradientBackground>
  );
}
