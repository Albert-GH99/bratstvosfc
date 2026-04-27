import { BarChart2, Compass, Globe, MessageCircle, ShoppingBag, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const icons = [Globe, MessageCircle, BarChart2, ShoppingBag, Zap, Compass];

export default function ServicesSection() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <section id="services" className="py-24 px-6" style={{ background: '#0B1118' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#16C47F' }}>{s.label}</p>
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#E6EDF3' }}>{s.title}</h2>
          <p className="text-base max-w-md mx-auto" style={{ color: '#9BA6B2' }}>{s.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {s.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/20 cursor-default"
                style={{ background: '#05090D', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5" style={{ background: 'rgba(22,196,127,0.12)' }}>
                  <Icon size={20} style={{ color: '#16C47F' }} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: '#E6EDF3' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9BA6B2' }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
