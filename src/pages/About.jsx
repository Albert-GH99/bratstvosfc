import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import BusinessProcessTimeline from '@/components/premium/BusinessProcessTimeline';
import GradientBackground from '@/components/premium/GradientBackground';
import PremiumButton from '@/components/premium/PremiumButton';
import PremiumCard from '@/components/premium/PremiumCard';
import RealDashboardPreview from '@/components/premium/RealDashboardPreview';
import SectionShell from '@/components/premium/SectionShell';
import SystemShowcaseVisual from '@/components/premium/SystemShowcaseVisual';

const copy = {
  en: {
    label: 'About Bratstvo Digital',
    title: 'We build premium websites and systems that make SME businesses easier to trust.',
    subtitle: 'Bratstvo Digital helps Malaysian SMEs move from scattered manual selling into a cleaner website, smoother customer flow and a dashboard owners can actually use.',
    cta: 'Start Setup',
    valuesLabel: 'What we care about',
    valuesTitle: 'The goal is not just a nicer website. The goal is a business that feels more organised.',
    values: [
      ['Customer clarity', 'Customers can see products, slots, prices, payment notes and next steps without asking repeatedly.'],
      ['Owner control', 'Orders, bookings, customers and payment status become easier to review from one practical workspace.'],
      ['Premium trust', 'Your online presence should feel confident enough for customers to buy, book or enquire.'],
      ['Local SME fit', 'We design for Malaysian retail, food, service, appointment and delivery businesses.'],
    ],
    systemsLabel: 'Built around real sales flows',
    systemsTitle: 'From product selling to booking and delivery, the system follows how your business earns.',
    processLabel: 'How we work',
    processTitle: 'Clear steps, practical suggestions and no overcomplicated tech talk.',
  },
  my: {
    label: 'Tentang Bratstvo Digital',
    title: 'Kami bina website dan sistem premium yang buat SME lebih mudah dipercayai.',
    subtitle: 'Bratstvo Digital bantu SME Malaysia bergerak daripada jualan manual yang berselerak kepada website yang kemas, customer flow yang smooth dan dashboard yang owner boleh guna setiap hari.',
    cta: 'Mula Setup',
    valuesLabel: 'Apa yang kami utamakan',
    valuesTitle: 'Matlamatnya bukan sekadar website cantik. Matlamatnya ialah bisnes yang nampak lebih teratur.',
    values: [
      ['Customer lebih jelas', 'Customer boleh nampak produk, slot, harga, nota payment dan langkah seterusnya tanpa tanya benda sama berulang kali.'],
      ['Owner lebih terkawal', 'Order, booking, customer dan status payment lebih mudah disemak dari satu workspace praktikal.'],
      ['Nampak lebih premium', 'Online presence anda perlu cukup meyakinkan untuk customer beli, booking atau hantar enquiry.'],
      ['Sesuai untuk SME lokal', 'Kami reka untuk bisnes retail, makanan, servis, appointment dan delivery di Malaysia.'],
    ],
    systemsLabel: 'Dibina ikut flow jualan sebenar',
    systemsTitle: 'Daripada jual produk kepada booking dan delivery, sistem ikut cara bisnes anda menjana jualan.',
    processLabel: 'Cara kami bekerja',
    processTitle: 'Langkah jelas, cadangan praktikal dan tidak penuh dengan jargon teknikal.',
  },
};

export default function About() {
  const { lang } = useLang();
  const t = copy[lang] || copy.en;

  return (
    <GradientBackground className="page-shell">
      <section className="px-4 pb-14 pt-10 sm:px-6 md:pt-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="premium-eyebrow mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ background: 'var(--c-primary-soft)', border: '1px solid rgba(24,217,138,.24)' }}>
              <Sparkles size={14} /> {t.label}
            </p>
            <h1 className="hero-title mb-6 max-w-[760px]">{t.title}</h1>
            <p className="mb-8 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: 'var(--c-muted)' }}>{t.subtitle}</p>
            <PremiumButton to="/setup" className="px-6 py-3.5 text-sm">
              {t.cta} <ArrowRight size={16} />
            </PremiumButton>
          </div>
          <RealDashboardPreview />
        </div>
      </section>

      <SectionShell eyebrow={t.valuesLabel} title={t.valuesTitle}>
        <div className="grid gap-5 md:grid-cols-2">
          {t.values.map(([title, body]) => (
            <PremiumCard key={title} className="p-6" hover>
              <CheckCircle2 size={20} style={{ color: 'var(--c-accent)' }} />
              <h2 className="mt-5 text-xl font-black" style={{ color: 'var(--c-text)' }}>{title}</h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{body}</p>
            </PremiumCard>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow={t.systemsLabel} title={t.systemsTitle}>
        <div className="grid gap-5 md:grid-cols-3">
          <SystemShowcaseVisual type="ecommerce" label="Checkout" compact />
          <SystemShowcaseVisual type="booking" label="Booking" compact />
          <SystemShowcaseVisual type="dispatch" label="Delivery" compact />
        </div>
      </SectionShell>

      <SectionShell eyebrow={t.processLabel} title={t.processTitle}>
        <BusinessProcessTimeline />
      </SectionShell>
    </GradientBackground>
  );
}
