import { useState } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function DemoSection() {
  const { t } = useLanguage();
  const d = t.demo;
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('');

  const canStep2 = selected !== null;
  const canStep3 = name.trim() && phone.trim() && industry;
  const serviceName = selected !== null ? d.services[selected] : '';

  return (
    <section id="demo" className="py-24 px-6" style={{ background: '#05090D' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{d.label}</p>
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#E6EDF3' }}>{d.title}</h2>
          <p className="text-base max-w-md mx-auto" style={{ color: '#9BA6B2' }}>{d.subtitle}</p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map(n => (
            <div key={n} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  background: step >= n ? 'var(--c-accent)' : 'rgba(255,255,255,0.05)',
                  color: step >= n ? 'var(--c-accent-contrast)' : '#9BA6B2',
                  border: step >= n ? 'none' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {n}
              </div>
              {n < 3 && <div className="w-12 h-px" style={{ background: step > n ? 'var(--c-accent)' : 'rgba(255,255,255,0.1)' }} />}
            </div>
          ))}
        </div>

        <div
          className="max-w-2xl mx-auto rounded-2xl p-8 md:p-10"
          style={{ background: '#0B1118', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#E6EDF3' }}>{d.step1Title}</h3>
              <div className="grid gap-3">
                {d.services.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className="flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: selected === i ? 'rgba(194,168,107,0.1)' : 'rgba(255,255,255,0.03)',
                      border: selected === i ? '1px solid rgba(194,168,107,0.42)' : '1px solid rgba(255,255,255,0.07)',
                      color: selected === i ? 'var(--c-accent)' : '#E6EDF3',
                    }}
                  >
                    <span className="font-medium text-sm">{s}</span>
                    {selected === i && <CheckCircle size={16} style={{ color: 'var(--c-accent)' }} />}
                  </button>
                ))}
              </div>
              <button
                onClick={() => canStep2 && setStep(2)}
                disabled={!canStep2}
                className="mt-8 w-full py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-40"
                style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
              >
                {d.next} <ChevronRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#E6EDF3' }}>{d.step2Title}</h3>
              <div className="space-y-4">
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={d.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#E6EDF3' }}
                />
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={d.phonePlaceholder}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#E6EDF3' }}
                />
                <select
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: '#0B1118', border: '1px solid rgba(255,255,255,0.08)', color: industry ? '#E6EDF3' : '#9BA6B2' }}
                >
                  <option value="">{d.industryLabel}</option>
                  {d.industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 px-5 py-3 rounded-lg text-sm font-medium transition-all hover:bg-white/10"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#9BA6B2' }}
                >
                  <ChevronLeft size={16} /> {d.back}
                </button>
                <button
                  onClick={() => canStep3 && setStep(3)}
                  disabled={!canStep3}
                  className="flex-1 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-40"
                  style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
                >
                  {d.next} <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(194,168,107,0.15)' }}>
                  <CheckCircle size={20} style={{ color: 'var(--c-accent)' }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: '#E6EDF3' }}>{d.step3Title}</h3>
                  <p className="text-xs" style={{ color: '#9BA6B2' }}>{d.step3Subtitle}</p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden mb-6" style={{ background: '#075E54' }}>
                <div className="px-4 py-3 flex items-center gap-3" style={{ background: '#128C7E' }}>
                  <div className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center text-xs font-bold text-green-900">BD</div>
                  <div>
                    <div className="text-sm font-semibold text-white">{name || 'Your Business'}</div>
                    <div className="text-xs text-green-200">Online</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="rounded-xl p-4 max-w-xs text-xs leading-relaxed whitespace-pre-line" style={{ background: '#dcf8c6', color: '#1a1a1a' }}>
                    {d.whatsappMsg(name || 'Customer', serviceName)}
                  </div>
                </div>
              </div>

              <Link
                to="/setup"
                className="w-full py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110"
                style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)', display: 'flex' }}
              >
                {d.buildCta}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
