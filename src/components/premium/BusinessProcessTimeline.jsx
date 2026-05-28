import { motion } from 'framer-motion';
import { ClipboardList, Hammer, PackageCheck, SearchCheck, Send } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

const steps = [
  {
    title: { en: 'Choose a system', my: 'Pilih sistem' },
    text: {
      en: 'Choose the system that best fits how your business sells, takes bookings or receives requests.',
      my: 'Pilih sistem yang paling sesuai dengan cara bisnes anda menjual, menerima booking atau menerima request.',
    },
    icon: PackageCheck,
  },
  {
    title: { en: 'Choose a package', my: 'Pilih pakej' },
    text: {
      en: 'Choose the setup level that matches your budget and current business needs.',
      my: 'Pilih tahap setup yang sesuai dengan bajet dan keperluan bisnes sekarang.',
    },
    icon: ClipboardList,
  },
  {
    title: { en: 'Submit setup request', my: 'Hantar request setup' },
    text: {
      en: 'Share your business details, WhatsApp number and the main problem you want to solve.',
      my: 'Masukkan detail bisnes, nombor WhatsApp dan masalah utama yang anda mahu selesaikan.',
    },
    icon: Send,
  },
  {
    title: { en: 'We review and confirm pricing', my: 'Kami semak & confirm harga' },
    text: {
      en: 'We review your needs, suggest the cleanest structure and confirm pricing before work starts.',
      my: 'Kami semak keperluan bisnes anda, cadangkan susunan terbaik dan confirm harga sebelum kerja bermula.',
    },
    icon: SearchCheck,
  },
  {
    title: { en: 'Your system starts moving', my: 'Sistem anda mula dibina' },
    text: {
      en: 'Your website or system is prepared so customers see a professional experience and owners can manage work more easily.',
      my: 'Website atau system disiapkan supaya customer nampak professional dan owner lebih mudah urus kerja.',
    },
    icon: Hammer,
  },
];

export default function BusinessProcessTimeline({ className = '' }) {
  const { lang } = useLang();

  return (
    <div className={`relative ${className}`.trim()}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.08 }}
        className="grid gap-4 lg:grid-cols-5"
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          const finalStep = index === steps.length - 1;

          return (
            <motion.article
              key={step.title.en}
              variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.36 }}
              className="relative rounded-[24px] p-5"
              style={{
                background: finalStep ? 'linear-gradient(145deg, var(--c-primary-soft), var(--c-surface))' : 'var(--c-surface)',
                border: finalStep ? '1px solid rgba(24,217,138,.42)' : '1px solid var(--c-border)',
                boxShadow: finalStep ? '0 28px 80px rgba(18,185,120,.14)' : 'var(--c-card-shadow)',
              }}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: finalStep ? 'linear-gradient(135deg, var(--c-primary), var(--c-primary-2))' : 'var(--c-input-bg)', color: finalStep ? 'var(--c-accent-contrast)' : 'var(--c-accent)', border: '1px solid var(--c-border)' }}>
                  <Icon size={20} />
                </span>
                <span className="text-xs font-black" style={{ color: finalStep ? 'var(--c-accent)' : 'var(--c-muted)' }}>
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-lg font-black leading-tight" style={{ color: 'var(--c-text)' }}>{step.title[lang] || step.title.en}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{step.text[lang] || step.text.en}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}
