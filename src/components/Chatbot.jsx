import { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, Loader2, MessageCircle, Send, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickReplies = [
  { label: 'Cadang sistem', text: 'Saya nak tahu sistem apa yang sesuai untuk bisnes saya.' },
  { label: 'Tanya harga', text: 'Macam mana harga pakej dan bundle discount?' },
  { label: 'Mula setup', text: 'Saya nak tahu cara mula setup.' },
];

const systemsKnowledge = {
  ecommerce: {
    name: 'eCommerce System',
    aliases: ['produk', 'product', 'shop', 'kedai', 'retail', 'butik', 'catalog', 'katalog', 'checkout', 'dropship', 'cookies', 'frozen'],
    suitable: 'retail, butik, reseller, produk fizikal, launch produk dan online store kecil',
    recommendation:
      'eCommerce System sesuai kalau anda jual produk. Customer boleh browse katalog, pilih item, checkout, hantar order dan rekod customer/payment jadi lebih kemas.',
  },
  booking: {
    name: 'Booking System',
    aliases: ['booking', 'trip', 'hiking', 'travel', 'event', 'kelas', 'workshop', 'tour', 'aktiviti', 'session', 'sesi', 'slot peserta'],
    suitable: 'hiking group, travel group, event organizer, kelas/workshop, tours/activities dan sports session',
    recommendation:
      'Booking System sesuai untuk trip, event, kelas atau aktiviti. Customer boleh lihat lokasi, tarikh, harga, itinerary, slot peserta dan pilihan deposit/full payment.',
  },
  appointment: {
    name: 'Appointment System',
    aliases: ['appointment', 'clinic', 'klinik', 'salon', 'beauty', 'repair', 'service', 'servis', 'consultation', 'consultant', 'staff schedule'],
    suitable: 'klinik, beauty/salon, repair/service, consultation, personal service dan workshop/service center',
    recommendation:
      'Appointment System sesuai untuk servis berjadual. Customer pilih servis, staff/branch jika ada, tarikh, masa, isi detail dan terima reminder.',
  },
  food: {
    name: 'Food Order System',
    aliases: ['makan', 'food', 'kuih', 'bakery', 'home baker', 'catering', 'katering', 'restaurant', 'restoran', 'cafe', 'qr', 'dine', 'pickup', 'delivery', 'preorder', 'menu'],
    suitable: 'restoran, cafe, home baker, catering, kuih seller, small food business dan preorder food seller',
    recommendation:
      'Untuk bisnes kuih, home baker, cafe atau makanan, Food Order System biasanya paling sesuai. Ia boleh jadi QR dine-in untuk meja atau online order untuk pickup, delivery dan preorder.',
  },
  dispatch: {
    name: 'Delivery Dispatch System',
    aliases: ['runner', 'rider', 'dispatch', 'delivery team', 'pickup', 'laundry', 'pharmacy', 'farmasi', 'hardware', 'internal runner', 'penghantaran', 'driver'],
    suitable: 'HR, admin, operations manager dan company dengan runner/staff sendiri yang buat job harian',
    recommendation:
      'Delivery Dispatch System sesuai kalau syarikat anda ada runner atau staff sendiri. HR/admin boleh create job, assign runner, monitor lokasi semasa, status kerja, proof/note dan rekod pergerakan harian. Sistem ini untuk internal team, bukan courier besar.',
  },
  custom: {
    name: 'Custom Website/System',
    aliases: ['custom', 'website', 'sistem khas', 'khas', 'workflow sendiri', 'combine 4', 'gabung 4', 'lebih 3', 'tak pasti', 'not sure'],
    suitable: 'bisnes yang perlukan website atau sistem khas ikut cara kerja sendiri',
    recommendation:
      'Custom Website/System sesuai kalau flow bisnes anda unik atau mahu gabung lebih daripada 3 sistem. Kami akan review keperluan anda dan set appointment sebelum harga akhir diberi.',
  },
};

const pricingText =
  'Ada 5 pakej setup: Starter RM149, Growth RM499, Business RM1,499, Pro RM2,999 dan Elite Custom secara custom quote. Bundle discount: 2 sistem dapat 25% off, 3 sistem dapat 50% off. Kalau lebih 3 sistem, kami cadangkan Custom System supaya flow lebih kemas. Custom domain bermula RM125/tahun: .com, .net dan .com.my RM125/tahun, .my RM179/tahun, .co RM229/tahun. Care plan bulanan boleh dipilih selepas setup. Harga akhir disahkan selepas review.';

const setupText =
  'Cara mula mudah: pilih industri, pilih sistem yang dicadangkan, pilih pakej, isi detail bisnes, kemudian hantar setup request. Team Bratstvo akan review, confirm harga dan hantar next step secara rasmi.';

function normalize(text) {
  return text.toLowerCase();
}

function detectSystems(text) {
  const lower = normalize(text);
  return Object.entries(systemsKnowledge)
    .filter(([, system]) => system.aliases.some(alias => lower.includes(alias)))
    .map(([key]) => key);
}

function mentionsMoreThanThree(text) {
  const lower = normalize(text);
  return (
    lower.includes('combine 4') ||
    lower.includes('gabung 4') ||
    lower.includes('lebih 3') ||
    lower.includes('lebih daripada 3') ||
    lower.includes('4 system') ||
    lower.includes('4 sistem')
  );
}

function detectIntent(text) {
  const lower = normalize(text);
  if (mentionsMoreThanThree(lower)) return 'overLimit';
  if (lower.includes('harga') || lower.includes('price') || lower.includes('pricing') || lower.includes('pakej') || lower.includes('package') || lower.includes('discount') || lower.includes('diskaun') || lower.includes('bundle')) return 'pricing';
  if (lower.includes('demo') || lower.includes('cuba') || lower.includes('preview') || lower.includes('contoh')) return 'demo';
  if (lower.includes('setup') || lower.includes('mula') || lower.includes('start') || lower.includes('request')) return 'setup';
  if (lower.includes('apa yang sesuai') || lower.includes('cadang') || lower.includes('recommend') || lower.includes('tak pasti') || lower.includes('not sure')) return 'recommend';
  if (detectSystems(lower).length) return 'system';
  return 'qualify';
}

function systemReply(keys) {
  if (!keys.length) return null;
  const unique = [...new Set(keys)];

  if (unique.includes('food') && (unique.includes('ecommerce') || unique.length === 1)) {
    return 'Untuk bisnes makanan, Food Order System paling sesuai untuk menu, cart, pickup/delivery, QR dine-in atau preorder. Kalau anda juga jual produk tetap seperti cookies, frozen food atau merchandise, tambah eCommerce System. Gabung 2 sistem boleh dapat 25% bundle discount.';
  }

  if (unique.includes('dispatch')) {
    return systemsKnowledge.dispatch.recommendation;
  }

  if (unique.includes('custom')) {
    return systemsKnowledge.custom.recommendation;
  }

  return unique
    .slice(0, 2)
    .map(key => systemsKnowledge[key].recommendation)
    .join(' ');
}

function buildReply(text) {
  const intent = detectIntent(text);
  const systems = detectSystems(text);

  if (intent === 'overLimit') {
    return 'Untuk lebih 3 sistem, kami cadangkan Custom System supaya flow tak serabut dan harga boleh disusun ikut keperluan sebenar. Anda boleh pilih Custom Website/System di Setup dan tulis ringkas apa yang bisnes anda perlukan.';
  }

  if (intent === 'pricing') {
    return pricingText;
  }

  if (intent === 'demo') {
    return 'Demo di website dipisahkan kepada 2 view: Owner Dashboard dan Customer View. Anda boleh nampak cara customer order, booking atau bayar, dan cara owner urus order, booking, customer, status payment dan report.';
  }

  if (intent === 'setup') {
    return setupText;
  }

  if (intent === 'recommend' || intent === 'system') {
    const reply = systemReply(systems);
    if (reply) return `${reply} Kalau nak lebih tepat, beritahu jenis bisnes, cara customer order/booking sekarang, dan anggaran order atau booking sebulan.`;

    return 'Boleh. Bratstvo Digital bina website, sistem order, booking, appointment, food ordering, delivery dispatch, dashboard dan automation untuk SME. Bisnes anda dalam bidang apa, dan sekarang paling pening bahagian order, booking, payment, customer record atau runner?';
  }

  return 'Boleh saya bantu cadangkan sistem yang sesuai. Ceritakan jenis bisnes anda, customer biasanya order atau booking melalui apa sekarang, dan anggaran transaksi sebulan. Dari situ saya boleh cadangkan sistem, pakej dan sama ada bundle discount sesuai.';
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      role: 'assistant',
      text: 'Hi, saya Bratstvo Assistant. Ceritakan bisnes anda, nanti saya bantu cadangkan sistem, pakej dan langkah setup yang sesuai.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [qualified, setQualified] = useState(false);
  const bottomRef = useRef(null);

  const assistantSubcopy = useMemo(() => 'Website, system & automation guidance', []);

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
      if (['setup', 'pricing', 'system', 'recommend', 'overLimit'].includes(intent) || userMsg.length > 70) setQualified(true);
      setMsgs(prev => [...prev, { role: 'assistant', text: buildReply(userMsg) }]);
      setLoading(false);
    }, 480);
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
          className="fixed bottom-44 right-5 md:bottom-28 md:right-8 z-50 flex h-[460px] w-[calc(100vw-2.5rem)] max-w-[22rem] flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}
        >
          <div className="px-4 py-3 flex items-center gap-3" style={{ background: 'var(--c-accent)' }}>
            <Bot size={18} style={{ color: 'var(--c-accent-contrast)' }} />
            <div>
              <div className="text-sm font-bold" style={{ color: 'var(--c-accent-contrast)' }}>Bratstvo Assistant</div>
              <div className="text-xs" style={{ color: 'rgba(5,9,13,0.66)' }}>{assistantSubcopy}</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={`${m.role}-${i}`} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[88%] px-3 py-2 rounded-xl text-xs leading-relaxed"
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
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:-translate-y-0.5"
                    style={{ border: '1px solid var(--c-border)', color: 'var(--c-muted)', background: 'var(--c-input-bg)' }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {qualified && (
              <div className="rounded-xl p-3" style={{ background: 'var(--c-primary-soft)', border: '1px solid rgba(22,196,127,0.24)' }}>
                <p className="text-xs mb-2" style={{ color: 'var(--c-muted)' }}>
                  Ready untuk langkah seterusnya? Isi configurator supaya kami boleh cadangkan flow dan pakej dengan lebih tepat.
                </p>
                <Link to="/setup" className="block text-center py-2 rounded-lg text-xs font-bold" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                  Mula Setup
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
