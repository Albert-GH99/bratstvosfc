import { useEffect, useRef, useState } from 'react';
import { Bot, Loader2, MessageCircle, Send, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickReplies = [
  { label: 'Saya nak sistem order', text: 'Saya nak sistem order untuk bisnes saya.' },
  { label: 'Tanya harga', text: 'Boleh explain harga dan plan yang sesuai?' },
  { label: 'Saya serious', text: 'Saya serious dan nak tahu next step.' },
];

const systemSuggestions = [
  ['makan', 'preorder', 'food', 'kuih', 'bakery', 'catering', 'restaurant'],
  ['booking', 'salon', 'clinic', 'appointment', 'temujanji'],
  ['produk', 'product', 'shop', 'catalog', 'dropship'],
  ['crm', 'lead', 'sales', 'follow up', 'prospek'],
  ['invoice', 'quotation', 'sebut harga', 'invois'],
  ['member', 'membership', 'gym', 'kelas', 'subscription'],
];

function isMalay(text) {
  return /\b(saya|nak|boleh|harga|sistem|bisnes|perniagaan|setup|demo|serious|temujanji|invois|kedai)\b/i.test(text);
}

function detectIntent(text) {
  const lower = text.toLowerCase();
  if (lower.includes('harga') || lower.includes('price') || lower.includes('pricing') || lower.includes('plan') || lower.includes('pakej')) return 'pricing';
  if (lower.includes('demo') || lower.includes('test') || lower.includes('cuba')) return 'demo';
  if (lower.includes('serious') || lower.includes('ready') || lower.includes('setup') || lower.includes('mula')) return 'setup';
  if (systemSuggestions.some(group => group.some(word => lower.includes(word)))) return 'system';
  return 'qualify';
}

function getSystemHint(text, my) {
  const lower = text.toLowerCase();
  if (['makan', 'preorder', 'food', 'kuih', 'bakery', 'catering', 'restaurant'].some(w => lower.includes(w))) {
    return my ? 'Untuk bisnes makanan, biasanya Pra-Pesanan Makanan atau QR Ordering paling sesuai.' : 'For food businesses, Food Preorder or QR Ordering usually fits best.';
  }
  if (['booking', 'salon', 'clinic', 'appointment', 'temujanji'].some(w => lower.includes(w))) {
    return my ? 'Untuk servis berjadual, Booking System lebih sesuai sebab boleh kawal slot, masa dan reminder.' : 'For scheduled services, a Booking System fits best because it controls slots, time and reminders.';
  }
  if (['produk', 'product', 'shop', 'catalog', 'dropship'].some(w => lower.includes(w))) {
    return my ? 'Untuk jual produk, Product Order System sesuai untuk catalog, variasi, kuantiti dan ringkasan order.' : 'For product selling, Product Order System fits catalogs, variations, quantities and structured order summaries.';
  }
  if (['crm', 'lead', 'sales', 'follow up', 'prospek'].some(w => lower.includes(w))) {
    return my ? 'Untuk sales team, CRM sesuai untuk track lead, follow-up dan nilai deal.' : 'For sales teams, CRM fits lead tracking, follow-ups and deal value.';
  }
  if (['invoice', 'quotation', 'sebut harga', 'invois'].some(w => lower.includes(w))) {
    return my ? 'Untuk servis/freelancer, Invoice & Quotation System akan jimat masa billing dan follow-up bayaran.' : 'For service providers, Invoice & Quotation System saves billing and payment follow-up time.';
  }
  if (['member', 'membership', 'gym', 'kelas', 'subscription'].some(w => lower.includes(w))) {
    return my ? 'Untuk bayaran berulang atau ahli, Membership System lebih sesuai.' : 'For recurring payments or members, Membership System fits better.';
  }
  return null;
}

function buildReply(text) {
  const my = isMalay(text);
  const intent = detectIntent(text);
  const hint = getSystemHint(text, my);

  if (intent === 'pricing') {
    return my
      ? 'Boleh. Structure sekarang ikut production pricing: build sekali bayar Starter RM149, Growth RM499, Business RM1,499, Pro RM4,999, Elite RM19,999. Yearly pula Basic RM1,099, Growth RM3,299, Business RM6,599, Pro RM9,889, Elite RM15,599. Untuk bisnes serius, Business ialah anchor utama.'
      : 'Sure. Current structure follows production pricing: one-time builds are Starter RM149, Growth RM499, Business RM1,499, Pro RM4,999, Elite RM19,999. Yearly plans are Basic RM1,099, Growth RM3,299, Business RM6,599, Pro RM9,889, Elite RM15,599. Business is the main anchor for serious operations.';
  }

  if (intent === 'demo') {
    return my
      ? 'Cuba Demo dulu. Pilih sistem yang paling dekat dengan bisnes anda dan tekan flow dia sampai habis. Kalau rasa flow tu ngam, baru sambung Setup supaya detail yang masuk WhatsApp sudah lengkap.'
      : 'Try the Demo first. Pick the system closest to your business and click through the flow. If it feels right, continue to Setup so the WhatsApp message is already complete.';
  }

  if (intent === 'setup') {
    return my
      ? 'Nice. Next step: isi Setup dengan nama bisnes, jenis sistem, pakej dan nombor. WhatsApp button hanya keluar di hujung supaya conversation terus ada konteks dan tak buang masa.'
      : 'Nice. Next step: fill Setup with business name, system type, package and phone number. WhatsApp only opens at the end so the conversation has context.';
  }

  if (intent === 'system' && hint) {
    return `${hint} ${my ? 'Kalau nak, saya boleh guide: berapa produk/slot sehari, siapa urus admin, dan nak plan tahunan atau build sekali bayar?' : 'I can guide the fit: how many products/slots per day, who manages admin, and whether yearly plan or one-time build makes more sense?'}`;
  }

  return my
    ? 'Boleh aku fahamkan dulu. Bisnes anda jenis apa, masalah utama sekarang order/booking/lead/invoice, dan anggaran berapa transaksi sebulan? Dari situ baru aku suggest sistem dan pakej.'
    : 'Let me understand first. What business are you running, is the main issue order/booking/lead/invoice, and roughly how many transactions per month? From there I can suggest the system and plan.';
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      role: 'assistant',
      text: 'Hi, saya Bratstvo AI. Saya akan tanya sikit dulu macam sales consultant, bukan terus paksa WhatsApp. Cerita bisnes anda buat apa?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [qualified, setQualified] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open, loading]);

  const sendMessage = async (value = input) => {
    if (!value.trim() || loading) return;
    const userMsg = value.trim();
    setInput('');
    setMsgs(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    window.setTimeout(() => {
      const intent = detectIntent(userMsg);
      if (intent === 'setup' || userMsg.length > 70) setQualified(true);
      setMsgs(prev => [...prev, { role: 'assistant', text: buildReply(userMsg) }]);
      setLoading(false);
    }, 520);
  };

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
        style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
        aria-label="Open chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div
          className="fixed bottom-44 right-5 md:bottom-28 md:right-8 z-50 w-80 rounded-xl overflow-hidden shadow-2xl flex flex-col"
          style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', height: '460px' }}
        >
          <div className="px-4 py-3 flex items-center gap-3" style={{ background: 'var(--c-accent)' }}>
            <Bot size={18} style={{ color: 'var(--c-accent-contrast)' }} />
            <div>
              <div className="text-sm font-bold" style={{ color: 'var(--c-accent-contrast)' }}>Bratstvo AI</div>
              <div className="text-xs" style={{ color: 'rgba(5,9,13,0.65)' }}>Consultative lead guide</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[86%] px-3 py-2 rounded-xl text-xs leading-relaxed"
                  style={{
                    background: m.role === 'user' ? 'var(--c-accent)' : 'var(--c-bg)',
                    color: m.role === 'user' ? 'var(--c-accent-contrast)' : 'var(--c-text)',
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {quickReplies.map(item => (
                  <button
                    key={item.label}
                    onClick={() => sendMessage(item.text)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {qualified && (
              <div className="rounded-lg p-3" style={{ background: 'rgba(194,168,107,0.10)', border: '1px solid rgba(194,168,107,0.28)' }}>
                <p className="text-xs mb-2" style={{ color: 'var(--c-muted)' }}>Nampak macam anda sudah ada konteks. Isi setup supaya WhatsApp nanti terus lengkap.</p>
                <Link to="/setup" className="block text-center py-2 rounded-md text-xs font-bold" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                  Buka Setup
                </Link>
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-xl" style={{ background: 'var(--c-bg)' }}>
                  <Loader2 size={14} className="animate-spin" style={{ color: 'var(--c-accent)' }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 flex gap-2" style={{ borderTop: '1px solid var(--c-border)' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Contoh: Saya jual kuih 80 order sehari..."
              className="flex-1 px-3 py-2 rounded-lg text-xs outline-none"
              style={{ background: 'var(--c-bg)', color: 'var(--c-text)', border: '1px solid var(--c-border)' }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:brightness-110 disabled:opacity-40"
              style={{ background: 'var(--c-accent)' }}
              aria-label="Send message"
            >
              <Send size={13} style={{ color: 'var(--c-accent-contrast)' }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
