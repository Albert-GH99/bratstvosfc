import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronDown, CircleDollarSign, Globe2, ShieldCheck, Sparkles } from 'lucide-react';
import { getText, oneTimePackages, subscriptionPlans } from '../data/systems';
import { useLang } from '@/context/LanguageContext';
import GradientBackground from '@/components/premium/GradientBackground';
import PremiumButton from '@/components/premium/PremiumButton';
import PremiumCard from '@/components/premium/PremiumCard';
import SectionShell from '@/components/premium/SectionShell';
import {
  BundlePricingVisual,
  CarePlanVisual,
  CompareMatrixVisual,
  CtaLaunchVisual,
  FaqSignalVisual,
  PricingHeroVisual,
} from '@/components/premium/ConversionVisuals';

const copy = {
  en: {
    badge: 'Simple starting prices',
    title: 'Choose a package that matches how serious your business wants to look online.',
    subtitle: 'Start with one professional website or system. Add more systems when your customers need easier ordering, booking or payment.',
    oneTimeLabel: 'Setup packages',
    careLabel: 'Care plans after launch',
    careSub: 'Hosting, maintenance, support and small updates after the system goes live.',
    popular: 'Recommended',
    choose: 'Choose this plan',
    monthly: 'Monthly',
    yearly: 'Yearly',
    monthSuffix: '/month',
    yearSuffix: '/year',
    domainTitle: 'Domain add-on',
    domainText: 'Custom domain support from RM125/year. .com, .net and .com.my are RM125/year, .my is RM179/year, and .co is RM229/year. Bratstvo subdomain is available when you want to launch faster.',
    compareTitle: 'Compare what your business gets',
    featureLabels: ['Customer page', 'Owner dashboard', 'Customer records', 'Status updates', 'Growth support'],
    faqTitle: 'Questions business owners usually ask',
    faq: [
      ['How fast can my system be ready?', 'Starter and Growth can usually move quickly once your content and business details are ready. Larger builds take longer because the pages and system need more planning.'],
      ['Can I combine systems?', 'Yes. You can combine up to 3 systems. Two systems get 25% off the combined setup estimate, three systems get 50% off.'],
      ['What happens after I submit?', 'We look at your business, confirm what you need and guide the next step before the build starts.'],
      ['Can I use my own domain?', 'Yes. You can request a custom domain. Pricing depends on extension: .com/.net/.com.my RM125/year, .my RM179/year, .co RM229/year.'],
      ['Do I need technical knowledge?', 'No. You only need to explain how your business sells, takes bookings or handles customers.'],
    ],
    ctaTitle: 'Not sure which package fits?',
    ctaText: 'Start with a setup request. Tell us your business, what you sell and what feels messy now. We will suggest the right package.',
    cta: 'Start setup request',
  },
  my: {
    badge: 'Harga permulaan yang jelas',
    title: 'Pilih pakej yang sesuai dengan tahap professional yang bisnes anda perlukan.',
    subtitle: 'Mula dengan satu website atau sistem professional. Tambah sistem bila customer perlukan order, booking atau payment yang lebih mudah.',
    oneTimeLabel: 'Pakej setup',
    careLabel: 'Care plan selepas launch',
    careSub: 'Hosting, maintenance, support dan update kecil selepas sistem live.',
    popular: 'Disyorkan',
    choose: 'Pilih pakej ini',
    monthly: 'Bulanan',
    yearly: 'Tahunan',
    monthSuffix: '/bulan',
    yearSuffix: '/tahun',
    domainTitle: 'Add-on domain',
    domainText: 'Custom domain bermula RM125/tahun. .com, .net dan .com.my RM125/tahun, .my RM179/tahun, dan .co RM229/tahun. Subdomain Bratstvo boleh digunakan jika anda mahu launch lebih cepat.',
    compareTitle: 'Bandingkan apa yang bisnes anda dapat',
    featureLabels: ['Halaman customer', 'Dashboard owner', 'Rekod customer', 'Status update', 'Growth support'],
    faqTitle: 'Soalan biasa pemilik bisnes',
    faq: [
      ['Berapa cepat sistem boleh siap?', 'Starter dan Growth biasanya boleh bergerak cepat selepas content dan detail bisnes lengkap. Build yang lebih besar ambil masa lebih lama kerana page dan sistem perlu dirancang dengan kemas.'],
      ['Boleh gabung beberapa sistem?', 'Boleh. Anda boleh gabungkan sehingga 3 sistem. Dua sistem dapat 25% diskaun anggaran setup, tiga sistem dapat 50% diskaun.'],
      ['Apa berlaku selepas hantar request?', 'Kami semak bisnes anda, sahkan apa yang diperlukan dan guide langkah seterusnya sebelum kerja bermula.'],
      ['Boleh guna domain sendiri?', 'Boleh. Harga ikut extension: .com/.net/.com.my RM125/tahun, .my RM179/tahun, .co RM229/tahun.'],
      ['Perlu tahu teknikal?', 'Tidak. Anda hanya perlu ceritakan cara bisnes menjual, ambil booking atau urus customer.'],
    ],
    ctaTitle: 'Tak pasti pakej mana sesuai?',
    ctaText: 'Mula dengan setup request. Ceritakan bisnes anda, apa yang dijual dan bahagian mana yang paling berselerak sekarang. Kami akan cadangkan pakej yang sesuai.',
    cta: 'Mula setup request',
  },
};

function formatPrice(value) {
  return `RM${Number(value || 0).toLocaleString()}`;
}

function PlanCard({ plan, lang, labels, suffix = '', compact = false }) {
  const includes = getText(plan.includes, lang);
  const popular = plan.popular || plan.id === 'business';

  return (
    <PremiumCard glow={popular} className={`relative flex flex-col p-5 ${popular ? 'xl:-translate-y-3' : ''}`} hover>
      {popular && (
        <span className="absolute -top-3 left-5 rounded-full px-3 py-1 text-xs font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
          {labels.popular}
        </span>
      )}
      <div className="mb-5">
        <h3 className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>{plan.name}</h3>
        {plan.bestFor && <p className="mt-3 min-h-[48px] text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{getText(plan.bestFor, lang)}</p>}
      </div>
      <div className="mb-5 flex items-end gap-2">
        <span className={compact ? 'text-3xl font-black' : 'text-4xl md:text-5xl font-black'} style={{ color: popular ? 'var(--c-accent)' : 'var(--c-text)' }}>{plan.priceLabel || formatPrice(plan.price)}</span>
        {suffix && !plan.priceLabel && <span className="mb-1 text-sm" style={{ color: 'var(--c-muted)' }}>{suffix}</span>}
      </div>
      <ul className="mb-6 flex-1 space-y-3">
        {includes.map(item => (
          <li key={item} className="flex gap-2 text-sm" style={{ color: 'var(--c-muted)' }}>
            <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--c-accent)' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <PremiumButton to="/setup" variant={popular ? 'primary' : 'secondary'} className="w-full px-5 py-3 text-sm">
        {labels.choose}
      </PremiumButton>
    </PremiumCard>
  );
}

function CompareTable({ labels }) {
  const rows = [
    ['Starter', ['Basic', '-', '-', 'Manual', '-']],
    ['Growth', ['Clean', 'Basic', 'Saved', 'Manual', '-']],
    ['Business', ['Premium', 'Included', 'Included', 'Included', 'Basic']],
    ['Pro', ['Premium', 'Advanced', 'Included', 'Included', 'Advanced']],
    ['Elite Custom', ['Custom', 'Custom', 'Custom', 'Custom', 'Custom']],
  ];

  return (
    <PremiumCard className="overflow-hidden" hover={false}>
      <div className="grid min-w-[720px] grid-cols-[150px_repeat(5,1fr)]">
        <div className="p-4 text-xs font-black" style={{ color: 'var(--c-muted)', borderBottom: '1px solid var(--c-border)' }}>Package</div>
        {labels.featureLabels.map(label => (
          <div key={label} className="p-4 text-xs font-black" style={{ color: 'var(--c-muted)', borderBottom: '1px solid var(--c-border)' }}>{label}</div>
        ))}
        {rows.map(([plan, values]) => (
          <div key={plan} className="contents">
            <div className="p-4 text-sm font-black" style={{ color: plan === 'Business' ? 'var(--c-accent)' : 'var(--c-text)', borderBottom: '1px solid var(--c-border-subtle)' }}>{plan}</div>
            {values.map((value, index) => (
              <div key={`${plan}-${index}`} className="p-4 text-sm" style={{ color: value === '-' ? 'var(--c-muted)' : 'var(--c-text)', borderBottom: '1px solid var(--c-border-subtle)' }}>{value}</div>
            ))}
          </div>
        ))}
      </div>
    </PremiumCard>
  );
}

function FaqItem({ item, open, onClick }) {
  return (
    <PremiumCard className="p-0" hover={false}>
      <button type="button" onClick={onClick} className="flex w-full items-center justify-between gap-4 p-5 text-left">
        <span className="font-black" style={{ color: 'var(--c-text)' }}>{item[0]}</span>
        <ChevronDown size={17} style={{ color: 'var(--c-muted)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 180ms ease' }} />
      </button>
      {open && <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{item[1]}</p>}
    </PremiumCard>
  );
}

export default function Pricing() {
  const { lang } = useLang();
  const t = copy[lang] || copy.en;
  const [billing, setBilling] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(0);
  const recurringPlans = subscriptionPlans[billing];

  return (
    <GradientBackground className="page-shell">
      <SectionShell className="pt-10 md:pt-12" eyebrow={t.badge} title={t.title} subtitle={t.subtitle}>
        <div className="mb-6">
          <PricingHeroVisual />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [CircleDollarSign, lang === 'my' ? 'Bundle pricing' : 'Bundle pricing', lang === 'my' ? '2 sistem 25% off, 3 sistem 50% off' : '2 systems 25% off, 3 systems 50% off'],
            [ShieldCheck, lang === 'my' ? 'Cadangan jelas' : 'Clear suggestion', lang === 'my' ? 'Harga akhir confirm sebelum kerja bermula' : 'Final price confirmed before work starts'],
            [Globe2, lang === 'my' ? 'Domain ready' : 'Domain ready', lang === 'my' ? 'Custom domain dari RM125/tahun' : 'Custom domain from RM125/year'],
          ].map(([Icon, title, text]) => (
            <PremiumCard key={title} className="p-5">
              <Icon size={22} style={{ color: 'var(--c-accent)' }} />
              <h3 className="mt-5 text-xl font-black" style={{ color: 'var(--c-text)' }}>{title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{text}</p>
            </PremiumCard>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow={t.oneTimeLabel}>
        <div className="mb-6">
          <BundlePricingVisual />
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {oneTimePackages.map(plan => <PlanCard key={plan.id} plan={plan} lang={lang} labels={t} compact />)}
        </div>
      </SectionShell>

      <SectionShell eyebrow={t.careLabel} title={t.careLabel} subtitle={t.careSub}>
        <div className="mb-6">
          <CarePlanVisual />
        </div>
        <div className="mb-8 inline-flex rounded-2xl p-1.5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          {[
            ['monthly', t.monthly],
            ['yearly', t.yearly],
          ].map(([id, label]) => (
            <motion.button
              key={id}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => setBilling(id)}
              className="rounded-xl px-5 py-2.5 text-sm font-black"
              style={{ background: billing === id ? 'var(--c-accent)' : 'transparent', color: billing === id ? 'var(--c-accent-contrast)' : 'var(--c-muted)' }}
            >
              {label}
            </motion.button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {recurringPlans.map(plan => <PlanCard key={plan.id} plan={plan} lang={lang} labels={t} suffix={billing === 'monthly' ? t.monthSuffix : t.yearSuffix} compact />)}
        </div>

        <PremiumCard className="mt-6 grid gap-4 p-6 md:grid-cols-[auto_1fr_auto]" hover={false}>
          <span className="h-12 w-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)' }}>
            <Globe2 size={22} />
          </span>
          <div>
            <h3 className="text-xl font-black" style={{ color: 'var(--c-text)' }}>{t.domainTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.domainText}</p>
          </div>
          <p className="text-2xl font-black md:text-right" style={{ color: 'var(--c-accent)' }}>{lang === 'my' ? 'Dari RM125/tahun' : 'From RM125/year'}</p>
        </PremiumCard>
      </SectionShell>

      <SectionShell eyebrow={t.compareTitle} title={t.compareTitle}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <CompareMatrixVisual />
          <div className="overflow-x-auto pb-2">
            <CompareTable labels={t} />
          </div>
        </div>
      </SectionShell>

      <SectionShell eyebrow={t.faqTitle} title={t.faqTitle}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <FaqSignalVisual />
          <div className="grid gap-3">
            {t.faq.map((item, index) => (
              <FaqItem key={item[0]} item={item} open={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} />
            ))}
          </div>
        </div>
      </SectionShell>

      <section className="px-5 pb-20 md:px-6">
        <PremiumCard glow className="mx-auto max-w-7xl p-6 md:p-9" hover={false}>
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <p className="premium-eyebrow mb-3"><Sparkles size={14} className="mr-2 inline" /> {t.ctaTitle}</p>
              <h2 className="text-3xl font-black leading-tight md:text-5xl" style={{ color: 'var(--c-text)' }}>{t.ctaTitle}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed md:text-base" style={{ color: 'var(--c-muted)' }}>{t.ctaText}</p>
            </div>
            <div className="grid gap-4">
              <CtaLaunchVisual />
              <PremiumButton to="/setup" className="px-7 py-4 text-sm">{t.cta} <ArrowRight size={16} /></PremiumButton>
            </div>
          </div>
        </PremiumCard>
      </section>
    </GradientBackground>
  );
}
