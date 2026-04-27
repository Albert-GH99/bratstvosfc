import { useLanguage } from '../context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-6"
      style={{ background: '#05090D' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #16C47F 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-3xl">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8"
          style={{ background: 'rgba(22,196,127,0.1)', border: '1px solid rgba(22,196,127,0.3)', color: '#16C47F' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {t.hero.badge}
        </div>

        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6" style={{ color: '#E6EDF3' }}>
          {t.hero.title.split('\n').map((line, i) => (
            <span key={i}>
              {i === 1 ? <span style={{ color: '#16C47F' }}>{line}</span> : line}
              {i === 0 && <br />}
            </span>
          ))}
        </h1>

        <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: '#9BA6B2' }}>
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#demo"
            className="px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{ background: '#16C47F', color: '#05090D' }}
          >
            {t.hero.cta1}
          </a>
          <a
            href="#pricing"
            className="px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-white/10 active:scale-95"
            style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#E6EDF3' }}
          >
            {t.hero.cta2}
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-2">
        <div className="w-px h-10 animate-pulse" style={{ background: 'linear-gradient(to bottom, transparent, #16C47F)' }} />
      </div>
    </section>
  );
}
