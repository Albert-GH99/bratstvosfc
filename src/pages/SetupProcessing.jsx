import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, CreditCard, Home, MailCheck, MessageSquareText, ReceiptText } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

const copy = {
  en: {
    label: 'Request submitted',
    title: 'Your setup request is in',
    text: 'Your request is safely received. Bratstvo will review the scope, then send payment instruction for manual confirmation.',
    status: 'Pending review',
    paymentTitle: 'Payment instruction',
    paymentText: 'Manual bank transfer, DuitNow QR or official payment link can be sent after review. No payment gateway is active yet.',
    paymentStatus: 'Payment status',
    estimatedAmount: 'Estimated amount',
    publicLink: 'Future public link',
    flowTitle: 'Activation flow',
    flow: ['Request received', 'Payment instruction pending review', 'Bratstvo review', 'Payment confirmed', 'Workspace generated', 'Login/onboarding later'],
    followUp: 'Secondary WhatsApp follow-up',
    home: 'OK, back to home',
    noData: 'No setup data found. Please submit the setup form again.',
  },
  my: {
    label: 'Request dihantar',
    title: 'Request setup anda sudah diterima',
    text: 'Request anda sudah diterima. Bratstvo akan review scope, kemudian hantar payment instruction untuk confirmation manual.',
    status: 'Pending review',
    paymentTitle: 'Payment instruction',
    paymentText: 'Bank transfer manual, DuitNow QR atau payment link rasmi boleh dihantar selepas review. Payment gateway belum aktif.',
    paymentStatus: 'Status payment',
    estimatedAmount: 'Anggaran jumlah',
    publicLink: 'Link public akan datang',
    flowTitle: 'Flow activation',
    flow: ['Request diterima', 'Payment instruction pending review', 'Bratstvo review', 'Payment confirmed', 'Workspace dijana', 'Login/onboarding kemudian'],
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
                  [t.publicLink, payload.publicLink || 'bratstvosfc.com/client'],
                  ['Custom domain', payload.requestedDomain || 'Future option'],
                ].map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 py-2" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
                    <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{key}</span>
                    <span className="text-xs font-black text-right" style={{ color: 'var(--c-text)' }}>{value}</span>
                  </div>
                ))}
              </div>
            )}

            {payload && (
              <div className="mb-7 rounded-2xl p-5" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                <p className="mb-4 text-sm font-black" style={{ color: 'var(--c-text)' }}>{t.flowTitle}</p>
                <div className="grid gap-2 md:grid-cols-3">
                  {t.flow.map((item, index) => (
                    <div key={item} className="rounded-xl p-3" style={{ background: index === 0 ? 'var(--c-primary-soft)' : 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                      <p className="text-[11px] font-black" style={{ color: 'var(--c-accent)' }}>Step {index + 1}</p>
                      <p className="mt-1 text-xs font-bold leading-relaxed" style={{ color: 'var(--c-text)' }}>{item}</p>
                    </div>
                  ))}
                </div>
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
