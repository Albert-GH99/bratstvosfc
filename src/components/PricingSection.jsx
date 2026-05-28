import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';

export default function PricingSection() {
  const { t } = useLang();
  const s = t.shop;

  return (
    <section id="pricing" className="py-24 px-6" style={{ background: 'var(--c-surface)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{s.label}</p>
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--c-text)' }}>{s.title}</h2>
          <p className="text-base max-w-md mx-auto" style={{ color: 'var(--c-muted)' }}>{s.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {s.packages.map((pkg, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                background: pkg.popular ? 'var(--c-accent-muted)' : 'var(--c-bg)',
                border: pkg.popular ? '1px solid var(--c-accent)' : '1px solid var(--c-border)',
              }}
            >
              {pkg.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
                >
                  {s.popular}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--c-text)' }}>{pkg.name}</h3>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-3xl font-black" style={{ color: pkg.popular ? 'var(--c-accent)' : 'var(--c-text)' }}>{pkg.price}</span>
                  {pkg.period && <span className="text-sm mb-1" style={{ color: 'var(--c-muted)' }}>/ {pkg.period}</span>}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{pkg.desc}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'var(--c-muted)' }}>
                    <Check size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--c-accent)' }} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/setup"
                className="text-center py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:brightness-110"
                style={{
                  background: pkg.popular ? 'var(--c-accent)' : 'transparent',
                  color: pkg.popular ? 'var(--c-accent-contrast)' : 'var(--c-text)',
                  border: pkg.popular ? 'none' : '1px solid var(--c-border)',
                }}
              >
                {pkg.price === 'Custom quote' ? s.ctaCustom : s.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
