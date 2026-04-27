import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ClipboardCheck, CreditCard, FileUp, LayoutDashboard, MessageSquareText, Minus, Plus, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { businessSystems, getDemoItems, getSystemName, getText } from '../data/systems';
import { useLanguage } from '../context/LanguageContext';

const dates = ['2026-04-28', '2026-04-29', '2026-04-30', '2026-05-01'];
const times = ['10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM', '8:00 PM'];

const copy = {
  en: {
    badge: 'Real workflow demos',
    title: 'Each system now behaves like its real-world workflow.',
    subtitle: 'Commerce systems have carts. HR has leave approval. Visitor systems have check-in and host alerts. CRM has pipeline data. Not every system needs checkout.',
    customer: 'User form',
    owner: 'Owner dashboard',
    submit: 'Generate record',
    pending: 'Submit the form to generate the owner record.',
    ctaTitle: 'This is closer to a real system.',
    ctaText: 'Continue to setup when the flow fits your business.',
    cta: 'Proceed setup',
    paymentNote: 'Payment note',
    paymentText: 'Only commerce, QR order, invoice, donation and payment-based systems need payment. Internal operation systems should focus on approval, status and records.',
  },
  my: {
    badge: 'Demo workflow sebenar',
    title: 'Setiap sistem sekarang ikut workflow dunia sebenar.',
    subtitle: 'Sistem jualan ada cart. HR ada leave approval. Visitor ada check-in dan host alert. CRM ada pipeline. Bukan semua sistem perlu checkout.',
    customer: 'Borang user',
    owner: 'Dashboard owner',
    submit: 'Jana rekod',
    pending: 'Submit borang untuk jana rekod owner.',
    ctaTitle: 'Ini lebih dekat dengan sistem sebenar.',
    ctaText: 'Terus setup bila flow ini sesuai dengan bisnes.',
    cta: 'Proceed setup',
    paymentNote: 'Nota payment',
    paymentText: 'Hanya sistem commerce, QR order, invoice, donation dan sistem berbayar perlukan payment. Sistem operasi dalaman fokus pada approval, status dan rekod.',
  },
};

const flowLabels = {
  order: { en: 'Order checkout', my: 'Order checkout' },
  tableOrder: { en: 'Table QR order', my: 'Order QR meja' },
  booking: { en: 'Appointment booking', my: 'Tempahan temujanji' },
  leave: { en: 'Leave request', my: 'Permohonan cuti' },
  visitor: { en: 'Visitor check-in', my: 'Check-in pelawat' },
  lead: { en: 'Lead capture', my: 'Lead capture' },
  invoice: { en: 'Invoice/quotation', my: 'Invois/sebut harga' },
  inventory: { en: 'Stock movement', my: 'Pergerakan stok' },
  job: { en: 'Job card', my: 'Job card' },
  queue: { en: 'Queue intake', my: 'Intake giliran' },
  registration: { en: 'Registration', my: 'Pendaftaran' },
  donation: { en: 'Donation record', my: 'Rekod donation' },
  dispatch: { en: 'Dispatch task', my: 'Tugasan dispatch' },
};

function getFlowType(id) {
  if (['food-preorder', 'product-order', 'ecommerce', 'membership', 'pos'].includes(id)) return 'order';
  if (id === 'qr-order') return 'tableOrder';
  if (id === 'booking' || id === 'rental') return 'booking';
  if (id === 'hr-leave') return 'leave';
  if (id === 'visitor') return 'visitor';
  if (id === 'crm' || id === 'property') return 'lead';
  if (id === 'invoice') return 'invoice';
  if (id === 'inventory') return 'inventory';
  if (id === 'workshop') return 'job';
  if (id === 'clinic-queue') return 'queue';
  if (id === 'event' || id === 'tuition') return 'registration';
  if (id === 'donation') return 'donation';
  if (id === 'dispatch') return 'dispatch';
  return 'lead';
}

function getInitialForm(flowType, lang) {
  const base = {
    name: 'Amir Hakimi',
    phone: '0123456789',
    date: dates[0],
    time: '5:30 PM',
    note: lang === 'en' ? 'Please confirm by WhatsApp.' : 'Sila confirm melalui WhatsApp.',
  };

  const byType = {
    order: { ...base, payment: 'QR DuitNow', fulfilment: 'Pickup' },
    tableOrder: { ...base, table: 'Table 7', payment: 'Pay at counter', note: 'Less ice, serve together.' },
    booking: { ...base, service: 'Consultation Slot', staff: 'Any available staff' },
    leave: { staff: 'Amir Hakimi', department: 'Operations', leaveType: 'Annual Leave', startDate: dates[0], endDate: dates[0], days: '1 day', mcFile: '', reason: 'Family matter' },
    visitor: { visitor: 'Amir Hakimi', company: 'AK Tech Sdn Bhd', host: 'Nur Aisyah', purpose: 'Meeting', time: '10:00 AM', vehicle: 'VBL 1024' },
    lead: { lead: 'Amir Hakimi', phone: '0123456789', source: 'Website', budget: 'RM5,000 - RM10,000', stage: 'New lead', followUp: dates[1] },
    invoice: { client: 'AK Tech Sdn Bhd', documentType: 'Quotation', item: 'Website + System Setup', amount: '1499', dueDate: dates[2], status: 'Draft' },
    inventory: { sku: 'BOX-PACK-001', item: 'Packaging Box', movement: 'Stock In', quantity: '120', supplier: 'Supplier A', date: dates[0] },
    job: { customer: 'Amir Hakimi', vehicle: 'Perodua Myvi', plate: 'VBL 1024', jobType: 'Oil Service', date: dates[0], status: 'Waiting inspection' },
    queue: { patient: 'Amir Hakimi', visitType: 'Walk-in', symptom: 'Fever', priority: 'Normal', time: '10:00 AM' },
    registration: { participant: 'Amir Hakimi', phone: '0123456789', programme: 'Trial Class', level: 'Beginner', date: dates[0] },
    donation: { donor: 'Amir Hakimi', campaign: 'Food Aid', amount: '100', receipt: 'Needed', payment: 'Bank Transfer' },
    dispatch: { order: 'ORD-1092', rider: 'Rider A', route: 'Zone Shah Alam', status: 'Ready for pickup', proof: 'Pending' },
  };

  return byType[flowType] || base;
}

function formatMoney(value) {
  return `RM${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function Field({ label, value, onChange, type = 'text', options = [] }) {
  const baseStyle = { background: 'var(--c-surface-strong)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' };

  return (
    <label className="block">
      <span className="text-xs font-bold mb-1.5 block" style={{ color: 'var(--c-muted)' }}>{label}</span>
      {type === 'select' ? (
        <select value={value} onChange={event => onChange(event.target.value)} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={baseStyle}>
          {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : type === 'file' ? (
        <label className="w-full rounded-xl px-4 py-3 text-sm outline-none flex items-center gap-2 cursor-pointer" style={baseStyle}>
          <FileUp size={15} />
          <span>{value || 'Upload file'}</span>
          <input type="file" className="hidden" onChange={event => onChange(event.target.files?.[0]?.name || '')} />
        </label>
      ) : (
        <input value={value} onChange={event => onChange(event.target.value)} type={type} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }} />
      )}
    </label>
  );
}

function FlowForm({ flowType, form, setForm, system }) {
  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  if (flowType === 'leave') {
    const isMc = form.leaveType === 'Medical Leave';
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Staff name" value={form.staff} onChange={value => set('staff', value)} />
        <Field label="Department" value={form.department} onChange={value => set('department', value)} />
        <Field label="Leave type" value={form.leaveType} onChange={value => set('leaveType', value)} type="select" options={['Annual Leave', 'Medical Leave', 'Emergency Leave', 'Unpaid Leave']} />
        <Field label={isMc ? 'MC duration' : 'Leave duration'} value={form.days} onChange={value => set('days', value)} type="select" options={isMc ? ['1 day MC', '2 days MC', '3 days MC', 'More than 3 days'] : ['1 day', '2 days', 'Half day AM', 'Half day PM']} />
        {!isMc && <Field label="Start date" value={form.startDate} onChange={value => set('startDate', value)} type="select" options={dates} />}
        {!isMc && <Field label="End date" value={form.endDate} onChange={value => set('endDate', value)} type="select" options={dates} />}
        {isMc && <div className="sm:col-span-2"><Field label="Upload MC" value={form.mcFile} onChange={value => set('mcFile', value)} type="file" /></div>}
        <div className="sm:col-span-2"><Field label="Reason" value={form.reason} onChange={value => set('reason', value)} /></div>
      </div>
    );
  }

  if (flowType === 'visitor') {
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Visitor name" value={form.visitor} onChange={value => set('visitor', value)} />
        <Field label="Company / IC" value={form.company} onChange={value => set('company', value)} />
        <Field label="Host" value={form.host} onChange={value => set('host', value)} />
        <Field label="Purpose" value={form.purpose} onChange={value => set('purpose', value)} type="select" options={['Meeting', 'Interview', 'Delivery', 'Maintenance', 'Event guest']} />
        <Field label="Arrival time" value={form.time} onChange={value => set('time', value)} type="select" options={times} />
        <Field label="Vehicle number" value={form.vehicle} onChange={value => set('vehicle', value)} />
      </div>
    );
  }

  if (flowType === 'lead') {
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Lead name" value={form.lead} onChange={value => set('lead', value)} />
        <Field label="Phone" value={form.phone} onChange={value => set('phone', value)} />
        <Field label="Source" value={form.source} onChange={value => set('source', value)} type="select" options={['Website', 'Facebook Ads', 'Walk-in', 'Referral', 'WhatsApp']} />
        <Field label="Budget" value={form.budget} onChange={value => set('budget', value)} type="select" options={['Below RM1,000', 'RM1,000 - RM5,000', 'RM5,000 - RM10,000', 'RM10,000+']} />
        <Field label="Stage" value={form.stage} onChange={value => set('stage', value)} type="select" options={['New lead', 'Qualified', 'Proposal', 'Negotiation']} />
        <Field label="Follow-up date" value={form.followUp} onChange={value => set('followUp', value)} type="select" options={dates} />
      </div>
    );
  }

  if (flowType === 'invoice') {
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Client" value={form.client} onChange={value => set('client', value)} />
        <Field label="Document type" value={form.documentType} onChange={value => set('documentType', value)} type="select" options={['Quotation', 'Invoice']} />
        <Field label="Item / scope" value={form.item} onChange={value => set('item', value)} />
        <Field label="Amount" value={form.amount} onChange={value => set('amount', value)} type="number" />
        <Field label="Due date" value={form.dueDate} onChange={value => set('dueDate', value)} type="select" options={dates} />
        <Field label="Status" value={form.status} onChange={value => set('status', value)} type="select" options={['Draft', 'Sent', 'Paid', 'Overdue']} />
      </div>
    );
  }

  if (flowType === 'inventory') {
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="SKU" value={form.sku} onChange={value => set('sku', value)} />
        <Field label="Item" value={form.item} onChange={value => set('item', value)} />
        <Field label="Movement" value={form.movement} onChange={value => set('movement', value)} type="select" options={['Stock In', 'Stock Out', 'Adjustment', 'Return']} />
        <Field label="Quantity" value={form.quantity} onChange={value => set('quantity', value)} type="number" />
        <Field label="Supplier / reason" value={form.supplier} onChange={value => set('supplier', value)} />
        <Field label="Date" value={form.date} onChange={value => set('date', value)} type="select" options={dates} />
      </div>
    );
  }

  if (flowType === 'job') {
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Customer" value={form.customer} onChange={value => set('customer', value)} />
        <Field label="Vehicle" value={form.vehicle} onChange={value => set('vehicle', value)} />
        <Field label="Plate number" value={form.plate} onChange={value => set('plate', value)} />
        <Field label="Job type" value={form.jobType} onChange={value => set('jobType', value)} type="select" options={['Oil Service', 'Brake Check', 'Tyre Change', 'Diagnostic']} />
        <Field label="Date" value={form.date} onChange={value => set('date', value)} type="select" options={dates} />
        <Field label="Status" value={form.status} onChange={value => set('status', value)} type="select" options={['Waiting inspection', 'In progress', 'Waiting parts', 'Ready pickup']} />
      </div>
    );
  }

  if (flowType === 'queue') {
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Patient" value={form.patient} onChange={value => set('patient', value)} />
        <Field label="Visit type" value={form.visitType} onChange={value => set('visitType', value)} type="select" options={['Walk-in', 'Appointment', 'Follow-up', 'Vaccination']} />
        <Field label="Symptom / reason" value={form.symptom} onChange={value => set('symptom', value)} />
        <Field label="Priority" value={form.priority} onChange={value => set('priority', value)} type="select" options={['Normal', 'Priority', 'Emergency']} />
        <Field label="Arrival time" value={form.time} onChange={value => set('time', value)} type="select" options={times} />
      </div>
    );
  }

  if (flowType === 'registration') {
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Participant" value={form.participant} onChange={value => set('participant', value)} />
        <Field label="Phone" value={form.phone} onChange={value => set('phone', value)} />
        <Field label="Programme" value={form.programme} onChange={value => set('programme', value)} type="select" options={system.id === 'event' ? ['General Ticket', 'VIP Ticket', 'Workshop Pass'] : ['Trial Class', 'Math Form 5', 'Coding Kids']} />
        <Field label="Level / type" value={form.level} onChange={value => set('level', value)} type="select" options={['Beginner', 'Intermediate', 'Advanced', 'VIP']} />
        <Field label="Date" value={form.date} onChange={value => set('date', value)} type="select" options={dates} />
      </div>
    );
  }

  if (flowType === 'donation') {
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Donor" value={form.donor} onChange={value => set('donor', value)} />
        <Field label="Campaign" value={form.campaign} onChange={value => set('campaign', value)} type="select" options={['Food Aid', 'Education Fund', 'Flood Relief', 'Monthly Donor']} />
        <Field label="Amount" value={form.amount} onChange={value => set('amount', value)} type="number" />
        <Field label="Receipt" value={form.receipt} onChange={value => set('receipt', value)} type="select" options={['Needed', 'Not needed']} />
        <Field label="Payment" value={form.payment} onChange={value => set('payment', value)} type="select" options={['Bank Transfer', 'QR DuitNow', 'Cash']} />
      </div>
    );
  }

  if (flowType === 'dispatch') {
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Order ID" value={form.order} onChange={value => set('order', value)} />
        <Field label="Rider" value={form.rider} onChange={value => set('rider', value)} type="select" options={['Rider A', 'Rider B', 'Rider C']} />
        <Field label="Route" value={form.route} onChange={value => set('route', value)} type="select" options={['Zone Shah Alam', 'Zone Klang', 'Zone KL']} />
        <Field label="Status" value={form.status} onChange={value => set('status', value)} type="select" options={['Ready for pickup', 'Out for delivery', 'Delivered', 'Failed']} />
        <Field label="Proof" value={form.proof} onChange={value => set('proof', value)} type="select" options={['Pending', 'Photo uploaded', 'Signature captured']} />
      </div>
    );
  }

  const orderItems = getDemoItems(system.id);
  return (
    <OrderFlow
      flowType={flowType}
      form={form}
      setForm={setForm}
      items={orderItems}
      system={system}
    />
  );
}

function OrderFlow({ flowType, form, setForm, items }) {
  const [cart, setCart] = useState(() => ({ [items[0].name]: 1 }));
  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const setQty = (item, change) => setCart(prev => ({ ...prev, [item.name]: Math.max(0, (prev[item.name] || 0) + change) }));
  const cartLines = items.map(item => ({ ...item, qty: cart[item.name] || 0 })).filter(item => item.qty > 0);
  const total = cartLines.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="space-y-5">
      {flowType === 'tableOrder' && (
        <div className="rounded-xl p-4" style={{ background: 'rgba(32,200,117,0.10)', border: '1px solid rgba(32,200,117,0.22)', color: 'var(--c-text)' }}>
          Customer scans QR at <strong>{form.table}</strong>. The table number is attached automatically before order goes to kitchen.
        </div>
      )}
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.name} className="rounded-xl p-4 flex items-center justify-between gap-4" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
            <div>
              <p className="font-black" style={{ color: 'var(--c-text)' }}>{item.name}</p>
              <p className="text-xs" style={{ color: 'var(--c-muted)' }}>{item.stock} slots/stock left</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-black" style={{ color: 'var(--c-accent)' }}>{formatMoney(item.price)}</p>
              <button onClick={() => setQty(item, -1)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ border: '1px solid var(--c-border)', color: 'var(--c-text)' }}><Minus size={14} /></button>
              <span className="w-8 text-center text-sm font-black" style={{ color: 'var(--c-text)' }}>{cart[item.name] || 0}</span>
              <button onClick={() => setQty(item, 1)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}><Plus size={14} /></button>
            </div>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Customer name" value={form.name} onChange={value => set('name', value)} />
        <Field label="WhatsApp" value={form.phone} onChange={value => set('phone', value)} />
        {flowType === 'tableOrder' && <Field label="Table" value={form.table} onChange={value => set('table', value)} type="select" options={['Table 1', 'Table 7', 'Table 12']} />}
        <Field label="Date" value={form.date} onChange={value => set('date', value)} type="select" options={dates} />
        <Field label="Time" value={form.time} onChange={value => set('time', value)} type="select" options={times} />
        <Field label="Payment" value={form.payment} onChange={value => set('payment', value)} type="select" options={['QR DuitNow', 'Bank Transfer', 'Cash on Pickup', 'Pay at counter', 'Payment Gateway']} />
      </div>
      <div className="rounded-xl p-4" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
        <div className="space-y-2 mb-3">
          {cartLines.map(line => (
            <div key={line.name} className="flex justify-between text-sm" style={{ color: 'var(--c-muted)' }}>
              <span>{line.qty}x {line.name}</span>
              <span>{formatMoney(line.price * line.qty)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-black" style={{ color: 'var(--c-text)', borderTop: '1px solid var(--c-border)', paddingTop: 12 }}>
          <span>Total</span>
          <span style={{ color: 'var(--c-accent)' }}>{formatMoney(total)}</span>
        </div>
      </div>
    </div>
  );
}

function buildRecord(flowType, form, system, lang) {
  const systemName = getSystemName(system, lang);
  const records = {
    leave: [
      ['Request', `${form.leaveType} - ${form.days}`],
      ['Staff', `${form.staff} (${form.department})`],
      ['Date / MC', form.leaveType === 'Medical Leave' ? (form.mcFile || 'MC upload pending') : `${form.startDate} to ${form.endDate}`],
      ['Manager action', 'Approve / Reject'],
    ],
    visitor: [
      ['Visitor', `${form.visitor} - ${form.company}`],
      ['Host', form.host],
      ['Purpose', form.purpose],
      ['Front desk action', 'Notify host + print badge + check-out later'],
    ],
    lead: [
      ['Lead', `${form.lead} - ${form.phone}`],
      ['Source / budget', `${form.source} - ${form.budget}`],
      ['Stage', form.stage],
      ['Next follow-up', form.followUp],
    ],
    invoice: [
      ['Document', `${form.documentType} for ${form.client}`],
      ['Item', form.item],
      ['Amount', formatMoney(form.amount)],
      ['Status', `${form.status} - due ${form.dueDate}`],
    ],
    inventory: [
      ['Item', `${form.item} (${form.sku})`],
      ['Movement', `${form.movement} ${form.quantity} units`],
      ['Supplier / reason', form.supplier],
      ['Stock action', 'Update stock ledger + low stock report'],
    ],
    job: [
      ['Job card', `${form.plate} - ${form.vehicle}`],
      ['Customer', form.customer],
      ['Job type', form.jobType],
      ['Status', form.status],
    ],
    queue: [
      ['Patient', form.patient],
      ['Visit', `${form.visitType} - ${form.symptom}`],
      ['Priority', form.priority],
      ['Queue action', 'Generate queue number + assign room'],
    ],
    registration: [
      ['Participant', `${form.participant} - ${form.phone}`],
      ['Programme', form.programme],
      ['Level / type', form.level],
      ['Date', form.date],
    ],
    donation: [
      ['Donor', form.donor],
      ['Campaign', form.campaign],
      ['Amount', formatMoney(form.amount)],
      ['Receipt', form.receipt],
    ],
    dispatch: [
      ['Order', form.order],
      ['Rider / route', `${form.rider} - ${form.route}`],
      ['Status', form.status],
      ['Proof', form.proof],
    ],
  };

  return records[flowType] || [
    ['Customer', `${form.name} - ${form.phone}`],
    ['System', systemName],
    ['Slot', `${form.date}, ${form.time}`],
    ['Payment', form.payment],
  ];
}

export default function Demo() {
  const { lang } = useLanguage();
  const t = copy[lang] || copy.en;
  const [activeId, setActiveId] = useState(businessSystems[0].id);
  const activeSystem = businessSystems.find(system => system.id === activeId) || businessSystems[0];
  const flowType = getFlowType(activeSystem.id);
  const [form, setForm] = useState(() => getInitialForm(flowType, lang));
  const [submitted, setSubmitted] = useState(true);

  const orderId = useMemo(() => `BD-${activeSystem.id.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`, [activeSystem.id]);
  const record = buildRecord(flowType, form, activeSystem, lang);

  const switchSystem = id => {
    const system = businessSystems.find(item => item.id === id) || businessSystems[0];
    const nextFlow = getFlowType(system.id);
    setActiveId(id);
    setForm(getInitialForm(nextFlow, lang));
    setSubmitted(false);
  };

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{t.badge}</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5" style={{ color: 'var(--c-text)' }}>{t.title}</h1>
            <p className="text-base leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.subtitle}</p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-3 mb-7">
            {businessSystems.map(system => {
              const active = system.id === activeId;
              return (
                <button key={system.id} onClick={() => switchSystem(system.id)} className="shrink-0 rounded-full px-4 py-2 text-sm font-black transition-all" style={{ background: active ? 'var(--c-accent)' : 'var(--c-surface)', color: active ? 'var(--c-accent-contrast)' : 'var(--c-muted)', border: '1px solid var(--c-border)' }}>
                  {system.emoji} {getText(system.shortName, lang)}
                </button>
              );
            })}
          </div>

          <div className="grid xl:grid-cols-[1fr_420px] gap-6 items-start">
            <motion.div layout className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--c-accent)' }}>{getText(flowLabels[flowType], lang)}</p>
                  <h2 className="text-2xl md:text-3xl font-black" style={{ color: 'var(--c-text)' }}>{getSystemName(activeSystem, lang)}</h2>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-black self-start" style={{ background: 'rgba(32,200,117,0.12)', color: 'var(--c-accent)' }}>Real flow</span>
              </div>

              <FlowForm key={activeId} flowType={flowType} form={form} setForm={setForm} system={activeSystem} />

              <button onClick={() => setSubmitted(true)} className="w-full mt-6 rounded-xl py-4 text-sm font-black flex items-center justify-center gap-2" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                {t.submit} <Send size={16} />
              </button>
            </motion.div>

            <aside className="xl:sticky xl:top-24 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div key={`${activeId}-${submitted}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <LayoutDashboard size={18} style={{ color: 'var(--c-accent)' }} />
                    <h2 className="text-xl font-black" style={{ color: 'var(--c-text)' }}>{t.owner}</h2>
                  </div>
                  {!submitted ? (
                    <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>{t.pending}</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="rounded-xl p-4" style={{ background: 'rgba(32,200,117,0.12)', border: '1px solid rgba(32,200,117,0.28)' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 size={17} style={{ color: 'var(--c-accent)' }} />
                          <p className="font-black" style={{ color: 'var(--c-text)' }}>{orderId}</p>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--c-muted)' }}>{getText(flowLabels[flowType], lang)} record generated</p>
                      </div>
                      {record.map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-4 py-2" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
                          <span className="text-xs font-bold" style={{ color: 'var(--c-muted)' }}>{label}</span>
                          <span className="text-xs font-black text-right" style={{ color: 'var(--c-text)' }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard size={18} style={{ color: 'var(--c-gold)' }} />
                  <h3 className="font-black" style={{ color: 'var(--c-text)' }}>{t.paymentNote}</h3>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--c-muted)' }}>{t.paymentText}</p>
                <div className="grid gap-2">
                  {[
                    'Checkout only when the real workflow needs money collection',
                    'Internal systems need approval/status/history more than price',
                    'Dashboard actions should match staff work: approve, notify, assign, complete',
                  ].map(item => (
                    <div key={item} className="flex gap-2 text-sm" style={{ color: 'var(--c-muted)' }}>
                      <ClipboardCheck size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--c-accent)' }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(145deg, rgba(15,81,50,0.78), rgba(2,16,10,0.86))', border: '1px solid rgba(32,200,117,0.26)' }}>
                <MessageSquareText size={20} className="mb-3 text-white" />
                <h3 className="font-black mb-2 text-white">{t.ctaTitle}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#CDE4D4' }}>{t.ctaText}</p>
                <Link to="/setup" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                  {t.cta} <ArrowRight size={15} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
