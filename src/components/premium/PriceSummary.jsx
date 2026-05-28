import { motion, useReducedMotion } from 'framer-motion';
import { BadgePercent, CircleDollarSign, Globe2, Sparkles } from 'lucide-react';

function formatMoney(value) {
  return `RM${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function PriceSummary({
  labels,
  selectedSystems = [],
  selectedPackage,
  selectedCare,
  billingPlan,
  pricing,
  domainAddon = false,
  customQuote = false,
  requestedDomain = '',
  selectedDomainPricing = null,
  domainYearlyPrice = 0,
  domainCheckStatus = '',
}) {
  const reduceMotion = useReducedMotion();
  const badge = selectedSystems.length >= 3 ? 'Best value' : selectedSystems.length === 2 ? 'Bundle Saver' : 'Max 3 systems';
  const domainPriceLabel = domainAddon && requestedDomain
    ? `RM${Number(domainYearlyPrice || selectedDomainPricing?.sellPrice || 0).toLocaleString()}/year`
    : 'Bratstvo subdomain';
  const domainNameLabel = domainAddon && requestedDomain ? requestedDomain : 'Bratstvo subdomain';

  return (
    <motion.aside
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36 }}
      className="premium-card price-summary-card p-5 lg:sticky lg:top-24"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-11 w-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)' }}>
            <CircleDollarSign size={19} />
          </span>
          <div>
            <p className="premium-eyebrow">{labels.pricingTitle}</p>
            <p className="mt-1 text-xs" style={{ color: 'var(--c-muted)' }}>{labels.quoteNote}</p>
          </div>
        </div>
        <motion.span
          animate={reduceMotion ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-full px-3 py-1 text-[10px] font-black"
          style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
        >
          {badge}
        </motion.span>
      </div>

      <div className="mb-5 space-y-2">
        {selectedSystems.length === 0 && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>-</p>}
        {selectedSystems.map(system => (
          <div key={system.id} className="flex justify-between gap-3 rounded-xl px-3 py-2" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
            <span className="text-xs font-bold" style={{ color: 'var(--c-text)' }}>{system.name || system.shortName}</span>
            <span className="text-xs font-black" style={{ color: system.priceMode === 'custom' ? 'var(--c-muted)' : 'var(--c-accent)' }}>
              {system.priceMode === 'custom' || customQuote ? labels.customQuote : formatMoney(selectedPackage?.price)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {[
          [labels.subtotal, pricing.subtotalLabel],
          [`${labels.discount} (${Math.round((pricing.discountPercent || 0) * 100)}%)`, `-${formatMoney(pricing.discountAmount)}`],
          [domainAddon ? 'Custom domain' : 'Domain', domainPriceLabel],
          [labels.estimatedTotal, pricing.totalLabel],
        ].map(([key, value], index) => (
          <div key={key} className="flex justify-between gap-4 py-3" style={{ borderTop: '1px solid var(--c-border-subtle)' }}>
            <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{key}</span>
            <span className={`text-xs ${index === 3 ? 'font-black' : 'font-bold'} text-right`} style={{ color: index === 3 ? 'var(--c-accent)' : 'var(--c-text)' }}>{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl p-3" style={{ background: 'var(--c-primary-soft)', border: '1px solid rgba(24,217,138,.25)' }}>
          <BadgePercent size={15} style={{ color: 'var(--c-accent)' }} />
          <p className="mt-2 text-xs font-black" style={{ color: 'var(--c-text)' }}>{selectedPackage?.name || '-'}</p>
          <p className="text-[10px]" style={{ color: 'var(--c-muted)' }}>package</p>
        </div>
        <div className="rounded-xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
          <Globe2 size={15} style={{ color: 'var(--c-accent)' }} />
          <p className="mt-2 text-xs font-black" style={{ color: 'var(--c-text)' }}>{domainAddon ? 'Custom domain' : 'Subdomain'}</p>
          <p className="text-[10px]" style={{ color: 'var(--c-muted)' }}>{domainAddon && selectedDomainPricing ? selectedDomainPricing.label : 'domain'}</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
        <div className="flex gap-2">
          <Sparkles size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--c-accent)' }} />
          <p className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>
            {selectedCare
              ? `${billingPlan}: ${selectedCare.name}. ${labels.quoteNote}`
              : `${labels.noCareSelected || labels.noCare}. ${labels.noCareNote || labels.quoteNote}`}
          </p>
        </div>
      </div>
      {domainAddon && requestedDomain && (
        <div className="mt-3 rounded-xl p-3 text-xs leading-relaxed" style={{ background: 'var(--c-primary-soft)', border: '1px solid rgba(24,217,138,.24)', color: 'var(--c-text)' }}>
          {domainNameLabel} - {domainPriceLabel}. {domainCheckStatus === 'manual_confirmation_required' ? (labels.domainManual || 'Admin confirmation needed') : labels.domainCheckNote}
        </div>
      )}
    </motion.aside>
  );
}
