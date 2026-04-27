import { useLang } from './LanguageContext';

export default function AboutSection() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="about" className="py-24 px-6" style={{ background: '#05090D' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#16C47F' }}>{a.label}</p>
            <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight" style={{ color: '#E6EDF3' }}>{a.title}</h2>
            <p className="text-base leading-relaxed" style={{ color: '#9BA6B2' }}>{a.body}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {a.stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-1"
                style={{ background: '#0B1118', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="text-3xl font-black mb-1" style={{ color: '#16C47F' }}>{s.value}</div>
                <div className="text-xs" style={{ color: '#9BA6B2' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
