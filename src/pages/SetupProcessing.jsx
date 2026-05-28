import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, CreditCard, Home, MailCheck, MessageSquareText, ReceiptText } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

const copy = {
  en: {
    label: 'Request submitted',
    title: 'Your setup request is in',
    text: 'We will review your request and send the official payment instruction by email. If needed, we may also follow up through WhatsApp Business.',
    status: 'Pending confirmation',
    paymentTitle: 'Payment instruction',
    paymentText: 'Official payment link or bank transfer instruction will be sent after your request is reviewed.',
    paymentStatus: 'Payment status',
    estimatedAmount: 'Estimated amount',
    followUp: 'Secondary WhatsApp follow-up',
    home: 'OK, back to home',
    noData: 'No setup data found. Please submit the setup form again.',
  },
  my: {
    label: 'Request dihantar',
    title: 'Request setup anda sudah diterima',
    text: 'Kami akan review request anda dan hantar payment instruction rasmi melalui email. Jika perlu, kami juga akan follow up melalui WhatsApp Business.',
    status: 'Pending confirmation',
    paymentTitle: 'Payment instruction',
    paymentText: 'Payment link rasmi akan dihantar selepas request disemak.',
    paymentStatus: 'Status payment',
    estimatedAmount: 'Anggaran jumlah',
    followUp: 'Follow-up WhatsApp sekunder',
    home: 'OK, kembali ke Home',
    noData: 'Data setup tidak dijumpai. Sila hantar form setup semula.',
  },
};

export default function SetupProcessing() {
  const { lang } = useLang();
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
    <div className="page-shell">
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
                  ['Request ID', payload.request_id || payload.id],
                  [t.paymentStatus, t.status],
                  [t.estimatedAmount, payload.pricing || payload.summary?.pricing || '-'],
                  ['Business', payload.businessName],
                  ['Owner', payload.ownerName],
                  ['System', payload.system],
                  ['Package', payload.package],
                  ['Domain', payload.requestedDomain || 'Bratstvo subdomain'],
                ].map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 py-2" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
                    <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{key}</span>
                    <span className="text-xs font-black text-right" style={{ color: 'var(--c-text)' }}>{value}</span>
                  </div>
                ))}
              </div>
            )}

            {payload && (
              <div className="mb-7 grid gap-3 md:grid-cols-3">
                {[
                  [MailCheck, t.paymentTitle, t.paymentText],
                  [CreditCard, lang === 'my' ? 'Manual dahulu' : 'Manual first', lang === 'my' ? 'Bank transfer, DuitNow QR atau payment link rasmi boleh dihantar selepas review.' : 'Bank transfer, DuitNow QR or official payment link can be issued after review.'],
                  [ReceiptText, 'Receipt', lang === 'my' ? 'Upload receipt hanya perlu jika verification manual diperlukan.' : 'Receipt upload is optional when manual verification is required.'],
                ].map(([Icon, title, text]) => (
                  <div key={title} className="rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                    <Icon size={18} className="mb-3" style={{ color: 'var(--c-accent)' }} />
                    <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{title}</p>
                    <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{text}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/home" className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>
                <Home size={16} /> {t.home}
              </Link>
              {payload && whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black" style={{ color: 'var(--c-muted)', border: '1px solid var(--c-border)' }}>
                  <MessageSquareText size={16} /> {t.followUp}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
