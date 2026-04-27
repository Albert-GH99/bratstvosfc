import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Home, MessageSquareText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const copy = {
  en: {
    label: 'Request submitted',
    title: 'Your request has been received',
    text: 'Our team will review and contact you shortly',
    status: 'Pending review',
    whatsapp: 'Open WhatsApp confirmation',
    home: 'OK, back to home',
    noData: 'No setup data found. Please submit the setup form again.',
  },
  my: {
    label: 'Request dihantar',
    title: 'Your request has been received',
    text: 'Our team will review and contact you shortly',
    status: 'Pending review',
    whatsapp: 'Buka confirmation WhatsApp',
    home: 'OK, kembali ke home',
    noData: 'Tiada data setup dijumpai. Sila hantar borang setup semula.',
  },
};

export default function SetupProcessing() {
  const { lang } = useLanguage();
  const location = useLocation();
  const t = copy[lang] || copy.en;
  const payload = useMemo(() => {
    if (location.state) return location.state;
    try {
      return JSON.parse(window.localStorage.getItem('bd_pending_setup') || 'null');
    } catch {
      return null;
    }
  }, [location.state]);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '';
  const whatsappUrl = payload && whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(payload.whatsappMessage)}` : '';

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-7 md:p-9" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(32,200,117,0.14)', color: 'var(--c-accent)' }}>
              <CheckCircle2 size={28} />
            </div>
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{t.label}</p>
            <h1 className="text-3xl md:text-5xl font-black mb-4" style={{ color: 'var(--c-text)' }}>{t.title}</h1>
            <p className="text-sm md:text-base leading-relaxed mb-7" style={{ color: 'var(--c-muted)' }}>{payload ? t.text : t.noData}</p>

            {payload && (
              <div className="rounded-2xl p-5 mb-7" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                {[
                  ['Request ID', payload.id],
                  ['Status', t.status],
                  ['Business', payload.businessName],
                  ['Owner', payload.ownerName],
                  ['System', payload.system],
                  ['Package', payload.package],
                ].map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 py-2" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
                    <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{key}</span>
                    <span className="text-xs font-black text-right" style={{ color: 'var(--c-text)' }}>{value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {payload && whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                  <MessageSquareText size={16} /> {t.whatsapp}
                </a>
              )}
              <Link to="/home" className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>
                <Home size={16} /> {t.home}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
