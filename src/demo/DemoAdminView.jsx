import { BarChart3, CheckCircle2, RefreshCw, Trash2, Users } from 'lucide-react';
import { formatMoney, getPackageAccess } from './demoSystems';
import { getFeatureList } from '@/data/systemsData';

const statusList = ['pending', 'processing', 'completed', 'rejected'];

const copy = {
  en: {
    title: 'Owner dashboard',
    subtitle: 'This is how new orders, bookings or customer requests can be reviewed in one place.',
    lockedTitle: 'Business dashboard is not included in Starter.',
    lockedText: 'Switch to Growth or above to preview order lists, status updates and dashboard features.',
    total: 'Total entries',
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed',
    rejected: 'Rejected',
    revenue: 'Demo total',
    clear: 'Clear demo entries',
    empty: 'No demo entries yet. Try the Customer Page first.',
    customer: 'Customer',
    details: 'Details',
    status: 'Status',
    whatsapp: 'WhatsApp',
    paymentStatus: 'Payment',
    customerRecords: 'Customer records',
    automation: 'WhatsApp summary preview',
    analytics: 'Analytics preview',
    multiUser: 'Multi-user preview',
    custom: 'Custom process preview',
    basicAdmin: 'Basic order list included.',
    proAdmin: 'Owner dashboard features included for this package.',
    limits: 'Package details',
    included: 'Included in this package',
    locked: 'Higher-tier features',
  },
  my: {
    title: 'Dashboard bisnes',
    subtitle: 'Ini cara order, booking atau request customer boleh disemak dari satu tempat.',
    lockedTitle: 'Dashboard bisnes tidak termasuk dalam Starter.',
    lockedText: 'Tukar ke Growth atau lebih tinggi untuk lihat senarai order, status update dan fungsi dashboard.',
    total: 'Jumlah rekod',
    pending: 'Menunggu',
    processing: 'Dalam proses',
    completed: 'Selesai',
    rejected: 'Ditolak',
    revenue: 'Jumlah demo',
    clear: 'Kosongkan rekod demo',
    empty: 'Belum ada rekod demo. Cuba Halaman Customer dahulu.',
    customer: 'Customer',
    details: 'Detail',
    status: 'Status',
    whatsapp: 'WhatsApp',
    paymentStatus: 'Payment',
    customerRecords: 'Rekod customer',
    automation: 'Pratonton ringkasan WhatsApp',
    analytics: 'Pratonton analitik',
    multiUser: 'Preview akses team',
    custom: 'Pratonton proses khas',
    basicAdmin: 'Senarai order asas termasuk.',
    proAdmin: 'Fungsi dashboard owner termasuk untuk pakej ini.',
    limits: 'Detail pakej',
    included: 'Termasuk dalam pakej ini',
    locked: 'Feature pakej lebih tinggi',
  },
};

const modulesByType = {
  product: ['Orders', 'Products', 'Customers', 'Chats/WhatsApp', 'Analytics', 'Settings', 'Website/Sales channels'],
  booking: ['Trips/Activities', 'Participants', 'Deposits', 'Slot availability', 'Itinerary editor', 'Reminder settings', 'Booking calendar'],
  appointment: ['Appointment calendar', 'Customer record', 'Staff schedule', 'Service list', 'Appointment status', 'No-show/completed', 'Reminders'],
  food: ['QR/table settings', 'Table list', 'Menu management', 'Kitchen queue', 'Order status', 'Payment status', 'Open/close ordering'],
  dispatch: ['Create job/task', 'Assign staff/runner', 'Live/current location', 'Daily staff movement', 'Proof/photo/note', 'Job history', 'Runner performance'],
  custom: ['Consultation requests', 'Requirement notes', 'Page planning', 'Appointment slots', 'Custom quote status', 'Reference links'],
};

function statusLabel(status) {
  return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending';
}

function summarize(submission) {
  if (submission.items?.length) return submission.items.map(item => `${item.qty || 1}x ${item.name}`).join(', ');
  return submission.details?.title || submission.details?.service || submission.type;
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <Icon size={18} className="mb-3" style={{ color: 'var(--c-accent)' }} />
      <p className="text-xs font-black mb-1" style={{ color: 'var(--c-muted)' }}>{label}</p>
      <p className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>{value}</p>
    </div>
  );
}

const packageOrder = ['Starter', 'Growth', 'Business', 'Pro', 'Elite'];

function DashboardModules({ system, type, packageName, labels, lang }) {
  const modules = modulesByType[type] || modulesByType.product;
  const limited = packageName === 'Starter';
  const selectedIndex = packageOrder.indexOf(packageName);
  const currentFeatures = getFeatureList(system.packageBreakdown?.[packageName] || system.featuresByPackage?.[packageName], lang);
  const lockedFeatures = selectedIndex >= packageOrder.length - 1
    ? []
    : packageOrder.slice(selectedIndex + 1).flatMap(name => getFeatureList(system.packageBreakdown?.[name] || system.featuresByPackage?.[name], lang)).slice(0, 5);

  return (
    <div className="grid gap-3 xl:grid-cols-[220px_1fr]">
      <div className="rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <p className="text-xs font-black mb-3" style={{ color: 'var(--c-muted)' }}>Dashboard menu</p>
        <div className="space-y-2">
          {modules.slice(0, 7).map((item, index) => (
            <div key={item} className="rounded-xl px-3 py-2 text-xs font-black" style={{ background: index === 0 ? 'var(--c-primary-soft)' : 'var(--c-input-bg)', color: index === 0 ? 'var(--c-accent)' : 'var(--c-muted)', border: '1px solid var(--c-border)' }}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl p-4" style={{ background: limited ? 'var(--c-primary-soft)' : 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <p className="font-black mb-2" style={{ color: 'var(--c-text)' }}>{labels.limits}</p>
        <p className="text-xs font-black" style={{ color: 'var(--c-accent)' }}>{packageName} - {labels.included}</p>
        <div className="mt-3 grid gap-2">
          {currentFeatures.map(feature => (
            <div key={feature} className="flex gap-2 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>
              <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: 'var(--c-accent)' }} />
              {feature}
            </div>
          ))}
        </div>
        {lockedFeatures.length > 0 && (
          <div className="mt-4 rounded-xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
            <p className="mb-2 text-[11px] font-black" style={{ color: 'var(--c-muted)' }}>{labels.locked}</p>
            <div className="flex flex-wrap gap-2">
              {lockedFeatures.map(feature => (
                <span key={feature} className="rounded-full px-2.5 py-1 text-[10px] font-black" style={{ background: 'var(--c-surface)', color: 'var(--c-muted)', border: '1px solid var(--c-border)' }}>{feature}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusButtons({ value, onChange, labels }) {
  return (
    <div className="flex flex-wrap gap-2">
      {statusList.map(status => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className="rounded-lg px-3 py-2 text-xs font-black"
          style={{ background: value === status ? 'var(--c-accent)' : 'var(--c-input-bg)', color: value === status ? 'var(--c-accent-contrast)' : 'var(--c-muted)', border: '1px solid var(--c-border)' }}
        >
          {labels[status] || statusLabel(status)}
        </button>
      ))}
    </div>
  );
}

function SubmissionCard({ submission, labels, onUpdate }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div>
          <p className="font-black" style={{ color: 'var(--c-text)' }}>{submission.id}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--c-muted)' }}>{new Date(submission.createdAt).toLocaleString()}</p>
        </div>
        <span className="rounded-full px-3 py-1 text-xs font-black self-start" style={{ background: 'var(--c-accent-muted)', color: 'var(--c-accent)' }}>{labels[submission.status] || statusLabel(submission.status)}</span>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs font-black mb-1" style={{ color: 'var(--c-muted)' }}>{labels.customer}</p>
          <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{submission.customer?.name || '-'}</p>
          <p className="text-xs" style={{ color: 'var(--c-muted)' }}>{submission.customer?.phone || submission.customer?.email || '-'}</p>
        </div>
        <div>
          <p className="text-xs font-black mb-1" style={{ color: 'var(--c-muted)' }}>{labels.details}</p>
          <p className="text-sm" style={{ color: 'var(--c-text)' }}>{summarize(submission)}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--c-accent)' }}>{formatMoney(submission.total)}</p>
          {submission.details?.paymentStatus && <p className="text-xs mt-1" style={{ color: 'var(--c-muted)' }}>{labels.paymentStatus}: {submission.details.paymentStatus}</p>}
        </div>
        <div>
          <p className="text-xs font-black mb-2" style={{ color: 'var(--c-muted)' }}>{labels.status}</p>
          <StatusButtons value={submission.status} onChange={status => onUpdate(submission.id, { status })} labels={labels} />
        </div>
      </div>
      <div className="rounded-xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
        <p className="text-xs font-black mb-1" style={{ color: 'var(--c-muted)' }}>{labels.whatsapp}</p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--c-text)' }}>{submission.whatsappMessage}</p>
      </div>
    </div>
  );
}

function CrmBoard({ submissions, settings, labels, onUpdate }) {
  const crmItems = submissions.filter(item => item.type === 'crm');
  const stages = settings.pipelineStages.length ? settings.pipelineStages : ['New Lead', 'Qualified', 'Proposal', 'Won'];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
      {stages.map(stage => {
        const items = crmItems.filter(item => item.details?.stage === stage);
        return (
          <div key={stage} className="rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div className="flex items-center justify-between gap-3 mb-3">
              <h3 className="font-black" style={{ color: 'var(--c-text)' }}>{stage}</h3>
              <span className="text-xs font-black" style={{ color: 'var(--c-accent)' }}>{items.length}</span>
            </div>
            <div className="grid gap-3">
              {items.map(item => (
                <div key={item.id} className="rounded-xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
                  <p className="text-sm font-black mb-1" style={{ color: 'var(--c-text)' }}>{item.details?.company || item.customer?.name}</p>
                  <p className="text-xs mb-3" style={{ color: 'var(--c-muted)' }}>{formatMoney(item.total)}</p>
                  <StatusButtons value={item.status} onChange={status => onUpdate(item.id, { status })} labels={labels} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function DemoAdminView({ system, state, packageName, onUpdateSubmission, onClearData, lang = 'en' }) {
  const labels = copy[lang] || copy.en;
  const isDispatch = system.sandboxType === 'dispatch';
  const access = getPackageAccess(packageName);
  const submissions = state.submissions || [];
  const pending = submissions.filter(item => item.status === 'pending').length;
  const completed = submissions.filter(item => item.status === 'completed').length;
  const total = submissions.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const customers = Array.from(new Set(submissions.map(item => item.customer?.phone || item.customer?.email || item.customer?.name).filter(Boolean)));

  if (!access.hasAdmin) {
    return (
      <div className="rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <h2 className="text-2xl font-black mb-3" style={{ color: 'var(--c-text)' }}>{labels.lockedTitle}</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{labels.lockedText}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--c-text)' }}>{isDispatch ? (lang === 'my' ? 'Dashboard HR/Admin' : 'HR/Admin Dashboard') : labels.title}</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
            {isDispatch
              ? (lang === 'my'
                ? 'HR, admin atau operations manager boleh create job, assign runner, monitor status kerja, lokasi semasa, proof dan rekod pergerakan harian.'
                : 'HR, admin or operations managers can create jobs, assign runners, monitor work status, current location, proof and daily movement history.')
              : labels.subtitle}
          </p>
        </div>
        <button onClick={onClearData} className="rounded-xl px-4 py-3 text-sm font-black inline-flex items-center justify-center gap-2" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>
          <Trash2 size={15} /> {labels.clear}
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label={labels.total} value={submissions.length} icon={RefreshCw} />
        <StatCard label={labels.pending} value={pending} icon={RefreshCw} />
        <StatCard label={labels.completed} value={completed} icon={CheckCircle2} />
        <StatCard label={labels.revenue} value={formatMoney(total)} icon={BarChart3} />
      </div>

      <DashboardModules system={system} type={system.sandboxType} packageName={packageName} labels={labels} lang={lang} />

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          <p className="font-black mb-2" style={{ color: 'var(--c-text)' }}>{access.basicAdmin ? labels.basicAdmin : labels.title}</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{access.tier >= 2 ? labels.proAdmin : labels.subtitle}</p>
        </div>
        {access.customerRecords && <StatCard label={labels.customerRecords} value={customers.length} icon={Users} />}
        {access.automation && <StatCard label={labels.automation} value="ON" icon={RefreshCw} />}
        {access.analytics && <StatCard label={labels.analytics} value="ON" icon={BarChart3} />}
        {access.multiUser && <StatCard label={labels.multiUser} value="3" icon={Users} />}
        {access.customWorkflow && <StatCard label={labels.custom} value="ON" icon={CheckCircle2} />}
      </div>

      {submissions.length === 0 && (
        <p className="rounded-2xl p-5 text-sm" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>{labels.empty}</p>
      )}

      {system.sandboxType === 'crm' && submissions.some(item => item.type === 'crm') && (
        <CrmBoard submissions={submissions} settings={state.settings} labels={labels} onUpdate={onUpdateSubmission} />
      )}

      <div className="grid gap-3">
        {submissions.map(submission => (
          <SubmissionCard key={submission.id} submission={submission} labels={labels} onUpdate={onUpdateSubmission} />
        ))}
      </div>
    </div>
  );
}
