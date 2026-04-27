import { CalendarClock, CheckCircle, FileText, LayoutDashboard, MessageSquare, Package, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const copy = {
  en: {
    badge: 'Client portal',
    title: 'Your system command centre',
    subtitle: 'This dashboard is for clients to monitor their live system, requests, invoices and support status. Internal Bratstvo admin tools stay separate.',
    locked: 'Client access only',
    lockedDesc: 'When your project is active, this page will show your own system data, orders, tickets and progress.',
    setup: 'Start setup',
    cards: [
      ['Project status', 'Setup briefing pending', 'We unlock your workspace after the setup form is complete.', CheckCircle],
      ['System modules', '0 active modules', 'Modules appear here after your system is confirmed.', Package],
      ['Support queue', 'No open tickets', 'Future care-plan requests will be tracked here.', MessageSquare],
      ['Invoices', 'No invoices yet', 'Plan, payment and renewal records will sit here.', FileText],
    ],
    timelineTitle: 'What clients will see',
    timeline: ['Submitted setup details', 'Selected package and system type', 'Build progress and launch checklist', 'Support and maintenance history'],
  },
  my: {
    badge: 'Portal client',
    title: 'Pusat kawalan sistem anda',
    subtitle: 'Dashboard ini untuk client pantau sistem live, permintaan, invois dan status sokongan. Tool admin dalaman Bratstvo kekal berasingan.',
    locked: 'Akses client sahaja',
    lockedDesc: 'Bila projek anda aktif, halaman ini akan tunjuk data sistem, order, tiket dan perkembangan milik bisnes anda.',
    setup: 'Mula setup',
    cards: [
      ['Status projek', 'Briefing setup belum lengkap', 'Workspace dibuka selepas borang setup lengkap.', CheckCircle],
      ['Modul sistem', '0 modul aktif', 'Modul muncul di sini selepas sistem disahkan.', Package],
      ['Giliran sokongan', 'Tiada tiket terbuka', 'Permintaan pelan penjagaan akan dijejak di sini nanti.', MessageSquare],
      ['Invois', 'Belum ada invois', 'Rekod plan, bayaran dan renewal akan duduk di sini.', FileText],
    ],
    timelineTitle: 'Apa client akan nampak',
    timeline: ['Detail setup yang dihantar', 'Pakej dan jenis sistem pilihan', 'Perkembangan build dan checklist launch', 'Sejarah sokongan dan penjagaan'],
  },
};

export default function Dashboard() {
  const { lang } = useLanguage();
  const t = copy[lang] || copy.my;

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch mb-8">
            <div className="rounded-xl p-8" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5" style={{ color: 'var(--c-accent)', border: '1px solid rgba(194,168,107,0.35)', background: 'rgba(194,168,107,0.08)' }}>
                <LayoutDashboard size={13} /> {t.badge}
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: 'var(--c-text)' }}>{t.title}</h1>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--c-muted)' }}>{t.subtitle}</p>
              <Link to="/setup" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                {t.setup}
              </Link>
            </div>

            <div className="rounded-xl p-8 flex flex-col justify-between" style={{ background: 'linear-gradient(145deg, rgba(47,58,39,0.92), rgba(8,12,8,0.96))', border: '1px solid rgba(194,168,107,0.25)' }}>
              <ShieldCheck size={34} style={{ color: 'var(--c-accent)' }} />
              <div>
                <h2 className="text-2xl font-black mb-3 text-white">{t.locked}</h2>
                <p className="text-sm leading-relaxed" style={{ color: '#C8D0BE' }}>{t.lockedDesc}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {t.cards.map(([title, value, desc, Icon]) => (
              <div key={title} className="rounded-xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <Icon size={20} style={{ color: 'var(--c-accent)' }} className="mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--c-muted)' }}>{title}</p>
                <p className="font-black mb-2" style={{ color: 'var(--c-text)' }}>{value}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div className="flex items-center gap-2 mb-5">
              <CalendarClock size={18} style={{ color: 'var(--c-accent)' }} />
              <h3 className="font-black" style={{ color: 'var(--c-text)' }}>{t.timelineTitle}</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-3">
              {t.timeline.map((item, index) => (
                <div key={item} className="rounded-lg p-4" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-3" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>{index + 1}</div>
                  <p className="text-sm" style={{ color: 'var(--c-text)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
