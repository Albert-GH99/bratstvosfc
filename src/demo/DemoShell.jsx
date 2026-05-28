import { useEffect, useMemo, useState } from 'react';
import { LayoutDashboard, MapPin, Settings, Smartphone, ShoppingBag } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';
import DemoAdminView from './DemoAdminView';
import DemoCustomerView from './DemoCustomerView';
import DemoSetupPanel from './DemoSetupPanel';
import DemoTimer from './DemoTimer';
import { demoPackages, demoSystems, getInitialDemoState, getPackageAccess } from './demoSystems';
import { clearAllDemoData, clearDemoSession, clearDemoState, loadDemoState, saveDemoState } from './demoStorage';
import { getSystemName, getText, systemsData } from '../data/systemsData';

const copy = {
  en: {
    badge: 'Interactive system demo',
    title: 'Try how your customer would order, book or send a request.',
    subtitle: 'Adjust the sample business, try the customer page, then view how the owner dashboard keeps everything organised.',
    dispatchTitle: 'Try internal runner and staff dispatch flow.',
    dispatchSubtitle: 'Preview how HR/admin assigns jobs, how staff updates status and how optional customer tracking can look.',
    previewing: 'Previewing',
    package: 'Package',
    setup: 'Business details',
    customer: 'Customer Page',
    admin: 'Owner Dashboard',
    dispatchSetup: 'Business Details',
    dispatchStaff: 'Staff/Runner App',
    dispatchAdmin: 'HR/Admin Dashboard',
    dispatchTracking: 'Optional Customer Tracking',
    adminLocked: 'Owner Dashboard preview unlocks from Growth.',
    starterNotice: 'Starter shows the customer page and WhatsApp summary only.',
  },
  my: {
    badge: 'Demo sistem interaktif',
    title: 'Cuba cara customer anda order, booking atau hantar request.',
    subtitle: 'Ubah contoh bisnes, cuba halaman customer, kemudian lihat bagaimana dashboard owner susun semua rekod.',
    dispatchTitle: 'Cuba flow dispatch untuk runner dan staff dalaman.',
    dispatchSubtitle: 'Preview cara HR/admin assign job, staff update status dan optional customer tracking boleh dipaparkan.',
    previewing: 'Preview',
    package: 'Pakej',
    setup: 'Detail bisnes',
    customer: 'Halaman Customer',
    admin: 'Dashboard Owner',
    dispatchSetup: 'Detail Bisnes',
    dispatchStaff: 'App Staff/Runner',
    dispatchAdmin: 'Dashboard HR/Admin',
    dispatchTracking: 'Optional Customer Tracking',
    adminLocked: 'Preview Dashboard Owner dibuka dari Growth.',
    starterNotice: 'Pakej Starter hanya tunjuk halaman customer dan WhatsApp summary.',
  },
};

const tabIcons = {
  setup: Settings,
  customer: ShoppingBag,
  admin: LayoutDashboard,
  staff: Smartphone,
  tracking: MapPin,
};

function DispatchTrackingPreview({ lang = 'en' }) {
  const labels = lang === 'my'
    ? {
      title: 'Optional customer tracking',
      subtitle: 'Customer hanya lihat status runner dan anggaran sampai. Mereka tidak pilih runner, dan ini bukan marketplace courier.',
      eta: 'Anggaran sampai',
      status: 'Runner on the way',
      note: 'Tracking page ini optional untuk bisnes yang mahu beri visibility kepada customer.',
    }
    : {
      title: 'Optional customer tracking',
      subtitle: 'Customers only see runner status and estimated arrival. They do not choose a runner, and this is not a courier marketplace.',
      eta: 'Estimated arrival',
      status: 'Runner on the way',
      note: 'This tracking page is optional for businesses that want to give customers visibility.',
    };

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <p className="premium-eyebrow mb-3">{labels.title}</p>
        <h2 className="text-2xl font-black mb-3" style={{ color: 'var(--c-text)' }}>{labels.status}</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{labels.subtitle}</p>
        <div className="mt-5 rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
          <p className="text-xs font-black" style={{ color: 'var(--c-muted)' }}>{labels.eta}</p>
          <p className="mt-1 text-3xl font-black" style={{ color: 'var(--c-accent)' }}>18 min</p>
        </div>
      </div>
      <div className="relative min-h-[320px] overflow-hidden rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <div className="absolute left-12 top-16 h-40 w-[72%] rounded-full border-2 border-dashed" style={{ borderColor: 'rgba(24,217,138,.45)' }} />
        <span className="absolute left-12 top-16 h-4 w-4 rounded-full" style={{ background: 'var(--c-accent)' }} />
        <span className="absolute right-16 bottom-20 h-4 w-4 rounded-full" style={{ background: '#fb7185' }} />
        <div className="absolute left-20 top-24 rounded-2xl p-3 text-xs font-black" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>
          Staff accepted job
        </div>
        <div className="absolute bottom-6 left-6 right-6 rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
          <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{labels.status}</p>
          <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{labels.note}</p>
        </div>
      </div>
    </div>
  );
}

export default function DemoShell() {
  const { lang } = useLang();
  const labels = copy[lang] || copy.en;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedId = searchParams.get('system');
  const requestedPackage = searchParams.get('package');
  const requestedSystem = useMemo(() => systemsData.find(system => system.id === requestedId), [requestedId]);
  const activeSystem = useMemo(() => demoSystems.find(system => system.id === requestedId), [requestedId]);
  const [packageName, setPackageName] = useState(demoPackages.includes(requestedPackage) ? requestedPackage : 'Business');
  const [activeTab, setActiveTab] = useState('setup');
  const [state, setState] = useState(() => loadDemoState(activeSystem || demoSystems[0], lang));
  const access = getPackageAccess(packageName);

  useEffect(() => {
    if (requestedSystem?.demoPath) navigate(requestedSystem.demoPath, { replace: true });
  }, [navigate, requestedSystem]);

  useEffect(() => {
    if (!requestedId || !activeSystem) {
      navigate('/systems', { replace: true });
      return;
    }
    setState(loadDemoState(activeSystem, lang));
  }, [activeSystem, lang, navigate, requestedId]);

  useEffect(() => {
    if (demoPackages.includes(requestedPackage)) setPackageName(requestedPackage);
  }, [requestedPackage]);

  useEffect(() => {
    if (!access.hasAdmin && activeTab === 'admin') setActiveTab(activeSystem?.sandboxType === 'dispatch' ? 'staff' : 'customer');
  }, [access.hasAdmin, activeTab, activeSystem]);

  const persist = nextState => {
    setState(nextState);
    saveDemoState(activeSystem.id, nextState);
  };

  const updateSettings = settings => {
    persist({
      ...state,
      settings,
      updatedAt: new Date().toISOString(),
    });
  };

  const addSubmission = submission => {
    const nextState = {
      ...state,
      submissions: [submission, ...state.submissions],
      activity: [
        { id: `activity-${Date.now()}`, text: `${submission.id} submitted`, createdAt: new Date().toISOString() },
        ...state.activity,
      ].slice(0, 20),
      updatedAt: new Date().toISOString(),
    };
    persist(nextState);
  };

  const updateSubmission = (submissionId, updates) => {
    const nextState = {
      ...state,
      submissions: state.submissions.map(item => (item.id === submissionId ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item)),
      updatedAt: new Date().toISOString(),
    };
    persist(nextState);
  };

  const resetCurrentDemo = () => {
    clearDemoState(activeSystem.id);
    persist(getInitialDemoState(activeSystem, lang));
  };

  const leaveDemo = () => {
    clearAllDemoData();
    clearDemoSession();
    navigate('/systems');
  };

  const isDispatch = activeSystem?.sandboxType === 'dispatch';
  const tabs = isDispatch
    ? [
      { id: 'setup', label: labels.dispatchSetup },
      { id: 'admin', label: labels.dispatchAdmin, disabled: !access.hasAdmin },
      { id: 'staff', label: labels.dispatchStaff },
      { id: 'tracking', label: labels.dispatchTracking },
    ]
    : [
      { id: 'setup', label: labels.setup },
      { id: 'customer', label: labels.customer },
      { id: 'admin', label: labels.admin, disabled: !access.hasAdmin },
    ];

  if (!requestedId || !activeSystem) return null;

  return (
    <div className="page-shell">
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{labels.badge}</p>
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4" style={{ color: 'var(--c-text)' }}>{isDispatch ? labels.dispatchTitle : labels.title}</h1>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--c-muted)' }}>{isDispatch ? labels.dispatchSubtitle : labels.subtitle}</p>
            </div>
            <DemoTimer lang={lang} onLeave={leaveDemo} />
          </div>

          <div className="rounded-2xl p-4 mb-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: 'var(--c-muted)' }}>{labels.previewing}</p>
                <h2 className="text-xl md:text-2xl font-black" style={{ color: 'var(--c-text)' }}>
                  {getSystemName(activeSystem, lang)} <span style={{ color: 'var(--c-muted)' }}>-</span> <span style={{ color: 'var(--c-accent)' }}>{packageName}</span>
                </h2>
                <p className="text-xs mt-2" style={{ color: 'var(--c-muted)' }}>{getText(activeSystem.sandboxTypeLabel, lang)}</p>
              </div>
              <div className="grid gap-3">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {demoPackages.map(item => (
                    <button
                      key={item}
                      onClick={() => {
                        setPackageName(item);
                        setSearchParams({ system: activeSystem.id, package: item });
                      }}
                      className="shrink-0 rounded-xl px-4 py-2 text-xs font-black"
                      style={{ background: packageName === item ? 'var(--c-accent)' : 'var(--c-bg)', color: packageName === item ? 'var(--c-accent-contrast)' : 'var(--c-muted)', border: '1px solid var(--c-border)' }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                {!access.hasAdmin && <p className="text-xs" style={{ color: 'var(--c-muted)' }}>{labels.starterNotice}</p>}
              </div>
            </div>
          </div>

          <div className={`rounded-2xl p-2 mb-5 grid gap-2 ${isDispatch ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-3'}`} style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            {tabs.map(tab => {
              const Icon = tabIcons[tab.id];
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => !tab.disabled && setActiveTab(tab.id)}
                  disabled={tab.disabled}
                  title={tab.disabled ? labels.adminLocked : tab.label}
                  className="rounded-xl px-3 py-3 text-xs md:text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-45"
                  style={{ background: active ? 'var(--c-accent)' : 'transparent', color: active ? 'var(--c-accent-contrast)' : 'var(--c-muted)' }}
                >
                  <Icon size={15} /> {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === 'setup' && (
            <DemoSetupPanel system={activeSystem} state={state} onSettingsChange={updateSettings} onReset={resetCurrentDemo} lang={lang} />
          )}
          {(activeTab === 'customer' || activeTab === 'staff') && (
            <DemoCustomerView system={activeSystem} state={state} packageName={packageName} onAddSubmission={addSubmission} lang={lang} />
          )}
          {activeTab === 'admin' && (
            <DemoAdminView system={activeSystem} state={state} packageName={packageName} onUpdateSubmission={updateSubmission} onClearData={resetCurrentDemo} lang={lang} />
          )}
          {activeTab === 'tracking' && <DispatchTrackingPreview lang={lang} />}
        </div>
      </section>
    </div>
  );
}
