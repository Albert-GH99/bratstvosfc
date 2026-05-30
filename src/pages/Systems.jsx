import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Eye, Search, Sparkles, X } from 'lucide-react';
import { getFeatureList, getSystemName, getText, packageOptions, systemsData } from '../data/systemsData';
import { useLang } from '@/context/LanguageContext';
import GradientBackground from '@/components/premium/GradientBackground';
import PremiumButton from '@/components/premium/PremiumButton';
import PremiumCard from '@/components/premium/PremiumCard';
import SectionShell from '@/components/premium/SectionShell';
import SystemShowcaseVisual from '@/components/premium/SystemShowcaseVisual';

const copy = {
  en: {
    badge: 'System catalogue',
    title: 'Choose the system that makes your business look sharper and easier to buy from.',
    subtitle: 'Every system helps customers order, book, pay or send requests more clearly while owners keep the important records in one place.',
    search: 'Search systems, industries or business needs',
    packageFilter: 'Package level',
    suitableFor: 'Suitable for',
    benefit: 'Selected package benefits',
    available: 'Package availability',
    view: 'View Details',
    demo: 'Try Demo',
    setup: 'Start Setup',
    details: 'System details',
    close: 'Close',
    noMatch: 'No systems match your search.',
    customQuote: 'Custom quote',
    featuredTitle: 'Premium product-style systems for real SME sales flows.',
    featuredSub: 'Preview the customer experience, filter by package level, then move into demo or setup when it feels right.',
  },
  my: {
    badge: 'Katalog sistem',
    title: 'Pilih sistem yang buat bisnes anda nampak lebih sharp dan mudah dibeli.',
    subtitle: 'Setiap sistem bantu customer order, booking, bayar atau hantar request dengan lebih jelas sementara owner simpan rekod penting di satu tempat.',
    search: 'Cari sistem, industri atau keperluan bisnes',
    packageFilter: 'Tahap pakej',
    suitableFor: 'Sesuai untuk',
    benefit: 'Apa yang termasuk',
    available: 'Pakej available',
    view: 'Lihat Detail',
    demo: 'Cuba Demo',
    setup: 'Mula Setup',
    details: 'Detail sistem',
    close: 'Tutup',
    noMatch: 'Tiada sistem yang sesuai dengan carian anda.',
    customQuote: 'Custom quote',
    featuredTitle: 'Sistem premium untuk flow jualan SME sebenar.',
    featuredSub: 'Preview pengalaman customer, pilih ikut pakej, kemudian cuba demo atau terus mula setup.',
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
};

function pathFor(base, system, selectedPackage) {
  return `${base}?system=${encodeURIComponent(system.id)}&package=${encodeURIComponent(selectedPackage)}`;
}

function SystemDetails({ system, selectedPackage, labels, lang, onClose }) {
  if (!system) return null;
  const benefits = getFeatureList(system.featuresByPackage[selectedPackage], lang);
  const isCustom = system.priceMode === 'custom';

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto px-4 py-6" style={{ background: 'rgba(3,7,5,0.82)', backdropFilter: 'blur(20px)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28 }}
        className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] lg:grid-cols-[0.92fr_1.08fr]"
        style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)', boxShadow: 'var(--c-shadow)' }}
      >
        <div className="p-5 md:p-7" style={{ background: 'linear-gradient(145deg, var(--c-bg-soft), var(--c-surface-strong))' }}>
          <SystemShowcaseVisual type={system.demoType} label={isCustom ? labels.customQuote : selectedPackage} />
        </div>
        <div className="p-5 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="premium-eyebrow mb-3">{labels.details}</p>
              <h2 className="text-3xl font-black leading-tight md:text-5xl" style={{ color: 'var(--c-text)' }}>{getSystemName(system, lang)}</h2>
            </div>
            <button type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }} aria-label={labels.close}>
              <X size={18} />
            </button>
          </div>

          <p className="mb-6 text-sm leading-relaxed md:text-base" style={{ color: 'var(--c-muted)' }}>{getText(system.longDesc, lang)}</p>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
              <p className="premium-eyebrow mb-2">{labels.suitableFor}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text)' }}>{getText(system.suitableFor, lang)}</p>
            </div>
            <div className="rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
              <p className="premium-eyebrow mb-2">{labels.available}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text)' }}>{isCustom ? labels.customQuote : system.packages.join(' / ')}</p>
            </div>
          </div>

          <div className="mb-7">
              <p className="mb-3 text-sm font-black" style={{ color: 'var(--c-text)' }}>{selectedPackage} - {labels.benefit}</p>
            <div className="grid gap-2">
              {benefits.map(item => (
                <div key={item} className="flex gap-2 rounded-xl p-3 text-sm leading-relaxed" style={{ color: 'var(--c-muted)', background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--c-accent)' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <PremiumButton to={pathFor('/demo', system, selectedPackage)} className="px-5 py-3 text-sm">{labels.demo}</PremiumButton>
            <PremiumButton to={pathFor('/setup', system, selectedPackage)} variant="secondary" className="px-5 py-3 text-sm">{labels.setup} <ArrowRight size={15} /></PremiumButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Systems() {
  const { lang } = useLang();
  const labels = copy[lang] || copy.en;
  const [selectedPackage, setSelectedPackage] = useState('Business');
  const [query, setQuery] = useState('');
  const [activeSystem, setActiveSystem] = useState(null);
  const [selectedSetupId, setSelectedSetupId] = useState('');

  const filteredSystems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return systemsData.filter(system => {
      if (!system.packages.includes(selectedPackage)) return false;
      if (!q) return true;
      return [
        getSystemName(system, 'en'),
        getSystemName(system, 'my'),
        getText(system.shortDesc, 'en'),
        getText(system.shortDesc, 'my'),
        getText(system.longDesc, 'en'),
        getText(system.longDesc, 'my'),
        getText(system.suitableFor, 'en'),
        getText(system.suitableFor, 'my'),
        system.demoType,
      ].join(' ').toLowerCase().includes(q);
    });
  }, [query, selectedPackage]);

  const featured = filteredSystems[0] || systemsData[0];

  return (
    <GradientBackground className="page-shell">
      <SectionShell className="pt-8 md:pt-12" eyebrow={labels.badge} title={labels.title} subtitle={labels.subtitle}>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <PremiumCard className="flex flex-col justify-between p-5 md:p-8" glow>
            <div>
              <p className="premium-eyebrow mb-4">Featured preview</p>
              <h2 className="text-[28px] font-black leading-tight md:text-5xl" style={{ color: 'var(--c-text)' }}>{labels.featuredTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed md:mt-5 md:text-base" style={{ color: 'var(--c-muted)' }}>{labels.featuredSub}</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PremiumButton to="/setup" className="px-5 py-3 text-sm">{labels.setup}</PremiumButton>
              <PremiumButton to="/demo" variant="secondary" className="px-5 py-3 text-sm">{labels.demo}</PremiumButton>
            </div>
          </PremiumCard>
          <SystemShowcaseVisual type={featured.demoType} label={selectedPackage} className="mobile-visual-preview" />
        </div>
      </SectionShell>

      <section className="relative px-5 pb-8 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <label className="relative block">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--c-muted)' }} />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder={labels.search}
              className="w-full rounded-2xl py-4 pl-11 pr-4 text-sm outline-none"
              style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)', boxShadow: 'var(--c-card-shadow)' }}
            />
          </label>
          <div>
            <p className="premium-eyebrow mb-2">{labels.packageFilter}</p>
            <div className="flex gap-2 overflow-x-auto rounded-2xl p-1.5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              {packageOptions.map(item => (
                <motion.button
                  key={item.id}
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedPackage(item.id)}
                  className="shrink-0 rounded-xl px-4 py-2.5 text-xs font-black"
                  style={{
                    background: selectedPackage === item.id ? 'linear-gradient(135deg, var(--c-primary), var(--c-primary-2))' : 'transparent',
                    color: selectedPackage === item.id ? 'var(--c-accent-contrast)' : 'var(--c-muted)',
                    boxShadow: selectedPackage === item.id ? '0 12px 26px rgba(18,185,120,0.22)' : 'none',
                  }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionShell className="pt-6">
        {filteredSystems.length === 0 && (
          <p className="rounded-2xl p-4 text-sm" style={{ color: 'var(--c-muted)', background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>{labels.noMatch}</p>
        )}

        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.055 }} className="grid gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {filteredSystems.map(system => {
            const benefits = getFeatureList(system.featuresByPackage[selectedPackage], lang);
            const isCustom = system.priceMode === 'custom';
            const active = selectedSetupId === system.id;

            return (
              <motion.article
                key={system.id}
                variants={cardVariants}
                transition={{ duration: 0.36 }}
                whileHover={{ y: -9, rotateX: 1.2, rotateY: -1.2 }}
                className="group flex min-h-full flex-col overflow-hidden rounded-3xl md:rounded-[28px]"
                style={{
                  background: active ? 'linear-gradient(145deg, var(--c-primary-soft), var(--c-surface))' : 'var(--c-surface)',
                  border: active ? '1px solid rgba(24,217,138,.5)' : '1px solid var(--c-border)',
                  boxShadow: active ? '0 28px 90px rgba(18,185,120,.15)' : 'var(--c-card-shadow)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="p-2.5 md:p-3">
                  <SystemShowcaseVisual type={system.demoType} label={isCustom ? labels.customQuote : selectedPackage} compact />
                </div>
                <div className="flex flex-1 flex-col p-4 pt-2 md:p-5 md:pt-2">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <h2 className="text-[22px] font-black leading-tight md:text-2xl" style={{ color: 'var(--c-text)' }}>{getSystemName(system, lang)}</h2>
                    {active && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-8 w-8 rounded-full flex items-center justify-center" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                        <CheckCircle2 size={16} />
                      </motion.span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{getText(system.shortDesc, lang)}</p>

                  <div className="mt-5 space-y-4">
                    <div>
                      <p className="premium-eyebrow mb-2">{labels.suitableFor}</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text)' }}>{getText(system.suitableFor, lang)}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {benefits.slice(0, 3).map(item => (
                        <span key={item} className="rounded-full px-3 py-1 text-[11px] font-bold" style={{ color: 'var(--c-muted)', background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: 'var(--c-muted)' }}>
                      {labels.available}: {isCustom ? labels.customQuote : system.packages.join(' / ')}
                    </p>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-2 pt-6 md:grid-cols-3">
                    <PremiumButton variant="ghost" className="w-full px-3 py-3 text-xs" onClick={() => setActiveSystem(system)}><Eye size={14} /> {labels.view}</PremiumButton>
                    <div className="hidden md:block">
                      <PremiumButton to={pathFor('/demo', system, selectedPackage)} className="px-3 py-3 text-xs">{labels.demo}</PremiumButton>
                    </div>
                    <PremiumButton to={pathFor('/setup', system, selectedPackage)} variant="secondary" className="px-3 py-3 text-xs" onMouseDown={() => setSelectedSetupId(system.id)}>
                      {labels.setup}
                    </PremiumButton>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </SectionShell>

      <SystemDetails system={activeSystem} selectedPackage={selectedPackage} labels={labels} lang={lang} onClose={() => setActiveSystem(null)} />
    </GradientBackground>
  );
}
