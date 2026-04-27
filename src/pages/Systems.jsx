import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, CircleDollarSign, ClipboardList, LayoutDashboard, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDemoItems, getSystemName, getSystemPriceLabel, getText, systemsData } from '../data/systemsData';
import { useLanguage } from '../context/LanguageContext';

const copy = {
  en: {
    badge: 'All systems',
    title: 'Choose a system based on your business problem.',
    subtitle: 'No hidden category filtering. These are the systems available for client setup, with the right demo type and practical use case.',
    search: 'Search system, example: booking, stock, invoice',
    customer: 'Customer page',
    customerText: 'Customers submit from their phone',
    admin: 'Admin dashboard',
    adminText: 'Owner manages products, orders and status',
    payment: 'Payment ready',
    paymentText: 'Manual QR first, gateway when needed',
    suitable: 'Best for',
    detail: 'System detail',
    problem: 'Problem solved',
    outcome: 'Client outcome',
    starts: 'Starts from',
    custom: 'Custom quotation',
    workflow: 'Workflow',
    note: 'Final package depends on modules, dashboard, automation, payment gateway and support level.',
    demo: 'Try demo',
    proceed: 'Proceed',
    preview: 'Live preview',
    stock: 'slots/stock left',
  },
  my: {
    badge: 'Semua sistem',
    title: 'Pilih sistem ikut masalah bisnes.',
    subtitle: 'Tiada kategori yang sorok sistem. Ini senarai sistem untuk setup client, lengkap dengan jenis demo yang betul dan use case.',
    search: 'Cari sistem, contoh: booking, stok, invoice',
    customer: 'Customer page',
    customerText: 'Pelanggan submit dari telefon',
    admin: 'Admin dashboard',
    adminText: 'Owner urus produk, order dan status',
    payment: 'Payment ready',
    paymentText: 'QR manual dulu, gateway bila perlu',
    suitable: 'Sesuai untuk',
    detail: 'Detail sistem',
    problem: 'Masalah yang diselesaikan',
    outcome: 'Hasil yang client dapat',
    starts: 'Harga mula',
    custom: 'Custom quotation',
    workflow: 'Workflow',
    note: 'Pakej akhir bergantung pada modul, dashboard, automation, payment gateway dan tahap support.',
    demo: 'Cuba demo',
    proceed: 'Proceed',
    preview: 'Live preview',
    stock: 'slot/stok tinggal',
  },
};

function MiniPreview({ system, lang, labels }) {
  const items = getDemoItems(system.id);
  const isWorkflow = system.type === 'workflow';
  const isService = system.type === 'service';

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(2,16,10,0.74)', border: '1px solid var(--c-border)' }}>
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div>
          <p className="text-sm font-black text-white">{system.icon} {getText(system.shortName, lang)} Demo</p>
          <p className="text-xs" style={{ color: '#A9B9AD' }}>{isWorkflow ? 'Status workflow' : isService ? 'Service booking page' : 'Customer order page'}</p>
        </div>
        <span className="text-xs font-bold" style={{ color: '#20C875' }}>{labels.preview}</span>
      </div>
      <div className="p-4 space-y-3">
        {isWorkflow ? (system.workflow || system.features).map(step => (
          <div key={step} className="rounded-lg p-3 flex items-center justify-between gap-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <p className="text-sm font-bold text-white">{step}</p>
            <span className="text-xs font-black" style={{ color: '#20C875' }}>Status</span>
          </div>
        )) : items.map(item => (
          <div key={item.name} className="rounded-lg p-3 flex items-center justify-between gap-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div>
              <p className="text-sm font-bold text-white">{item.name}</p>
              <p className="text-xs" style={{ color: '#A9B9AD' }}>{item.stock || item.slots} {isService ? 'slots left' : labels.stock}</p>
            </div>
            <p className="text-sm font-black" style={{ color: '#20C875' }}>RM{item.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Systems() {
  const { lang } = useLanguage();
  const t = copy[lang] || copy.en;
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(systemsData[0]);

  const filteredSystems = useMemo(() => {
    const q = query.toLowerCase();
    return systemsData.filter(system => {
      const text = `${getText(system.name, lang)} ${getText(system.shortName, lang)} ${getText(system.bestFor, lang)} ${getText(system.description, lang)} ${getText(system.problem, lang)}`.toLowerCase();
      return text.includes(q);
    });
  }, [lang, query]);

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{t.badge}</p>
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5" style={{ color: 'var(--c-text)' }}>{t.title}</h1>
              <p className="text-base leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.subtitle}</p>
            </div>
            <div className="bd-glass rounded-2xl p-5">
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  [t.customer, t.customerText],
                  [t.admin, t.adminText],
                  [t.payment, t.paymentText],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-xl p-4" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                    <CheckCircle2 size={18} className="mb-3" style={{ color: 'var(--c-accent)' }} />
                    <p className="text-sm font-black mb-1" style={{ color: 'var(--c-text)' }}>{title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <label className="relative block max-w-xl mb-8">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--c-muted)' }} />
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder={t.search} className="w-full rounded-xl py-3 pl-10 pr-4 text-sm outline-none" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }} />
          </label>

          <div className="grid lg:grid-cols-[1fr_420px] gap-6 items-start">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredSystems.map((system, index) => (
                <motion.button key={system.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.35, delay: index * 0.02 }} onClick={() => setSelected(system)} className="text-left rounded-xl p-5 transition-all hover:-translate-y-1" style={{ background: selected.id === system.id ? 'rgba(32,200,117,0.12)' : 'var(--c-surface)', border: selected.id === system.id ? '1px solid rgba(32,200,117,0.45)' : '1px solid var(--c-border)' }}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: 'var(--c-accent)' }}>{getText(system.category, lang)}</p>
                      <h2 className="font-black" style={{ color: 'var(--c-text)' }}>{getSystemName(system, lang)}</h2>
                    </div>
                    <span className="rounded-full px-3 py-1 text-xs font-black" style={{ background: 'rgba(32,200,117,0.12)', color: 'var(--c-accent)' }}>{getSystemPriceLabel(system, lang) || t.workflow}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--c-muted)' }}>{getText(system.description, lang)}</p>
                  <p className="text-xs font-bold mb-2" style={{ color: 'var(--c-text)' }}>{t.suitable}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{getText(system.bestFor, lang)}</p>
                </motion.button>
              ))}
            </div>

            <aside className="lg:sticky lg:top-24 rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--c-accent)' }}>{t.detail}</p>
              <h2 className="text-2xl font-black mb-5" style={{ color: 'var(--c-text)' }}>{getSystemName(selected, lang)}</h2>
              <MiniPreview system={selected} lang={lang} labels={t} />

              <div className="mt-5 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardList size={16} style={{ color: 'var(--c-gold)' }} />
                    <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{t.problem}</p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{getText(selected.problem, lang)}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <LayoutDashboard size={16} style={{ color: 'var(--c-accent)' }} />
                    <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{t.outcome}</p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{getText(selected.outcome, lang)}</p>
                </div>

                <div className="rounded-xl p-4" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <CircleDollarSign size={16} style={{ color: 'var(--c-gold)' }} />
                    <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{selected.fromPrice == null ? t.custom : `${t.starts} RM${selected.fromPrice}`}</p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.note}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Link to="/demo" className="rounded-xl py-3 text-center text-sm font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>{t.demo}</Link>
                  <Link to="/setup" className="rounded-xl py-3 text-center text-sm font-black inline-flex items-center justify-center gap-2" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>{t.proceed} <ArrowRight size={15} /></Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
