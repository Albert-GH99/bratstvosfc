import { BarChart2, Compass, Globe, MessageCircle, ShoppingBag, Zap } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

const icons = [Globe, MessageCircle, BarChart2, ShoppingBag, Zap, Compass];

export default function ServicesSection() {
  const { t } = useLang();
  const s = t.services;

  return (
    <section id="services" className="py-24 px-6" style={{ background: 'var(--c-surface)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--c-primary)' }}>{s.label}</p>
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--c-text)' }}>{s.title}</h2>
          <p className="text-base max-w-md mx-auto" style={{ color: 'var(--c-muted)' }}>{s.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {s.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5" style={{ background: 'var(--c-primary-soft)' }}>
                  <Icon size={20} style={{ color: 'var(--c-primary)' }} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--c-text)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
