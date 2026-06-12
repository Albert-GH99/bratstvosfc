import { useState } from 'react';
import { CheckCircle2, Minus, Plus, Send } from 'lucide-react';
import { createSubmissionId, formatMoney } from './demoSystems';

const copy = {
  en: {
    customerView: 'Customer page',
    customerViewText: 'This is the type of page customers can use to order, book or send details without messy back-and-forth chat.',
    name: 'Name',
    phone: 'WhatsApp number',
    email: 'Email',
    address: 'Address',
    item: 'Item',
    service: 'Service',
    variant: 'Variant',
    pickupTime: 'Pickup time',
    fulfilment: 'Fulfilment',
    delivery: 'Delivery',
    pickup: 'Pickup',
    dineIn: 'Dine-in QR table',
    table: 'Table number',
    date: 'Date',
    time: 'Time',
    staff: 'Staff name',
    leaveType: 'Leave type',
    startDate: 'Start date',
    endDate: 'End date',
    reason: 'Reason',
    leadCompany: 'Company / lead name',
    dealValue: 'Deal value',
    stage: 'Stage',
    followUp: 'Follow-up note',
    visitor: 'Visitor name',
    host: 'Host',
    purpose: 'Purpose',
    client: 'Customer name',
    status: 'Status',
    pending: 'pending',
    cart: 'Cart',
    total: 'Total',
    submit: 'Send demo request',
    submitted: 'Demo request sent.',
    whatsapp: 'WhatsApp message preview',
    add: 'Add',
    available: 'available',
    emptyCart: 'Add at least one item to continue.',
    noSlots: 'No available slots. Add slots in Setup.',
    slots: 'slots',
    branch: 'Branch',
    notes: 'Notes',
    runnerNote: 'Item / job description',
    pickupLocation: 'Pickup location',
    dropoffLocation: 'Drop-off location',
    preferredTime: 'Preferred time',
    consultationDate: 'Preferred consultation date',
    consultationTime: 'Preferred consultation time',
    customNeed: 'What do you need?',
    deposit: 'Deposit',
    fullPayment: 'Full payment',
    paymentOption: 'Payment option',
    payNow: 'Pay now',
    payLater: 'Pay later',
    distance: 'Delivery distance (KM)',
    deliveryCharge: 'Delivery charge',
    orderNotes: 'Order notes',
    difficulty: 'Difficulty',
    itinerary: 'Itinerary',
    bring: 'What to bring',
  },
  my: {
    customerView: 'Halaman customer',
    customerViewText: 'Ini contoh halaman yang customer boleh guna untuk order, booking atau hantar detail tanpa chat berulang-ulang.',
    name: 'Nama',
    phone: 'Nombor WhatsApp',
    email: 'Email',
    address: 'Alamat',
    item: 'Item',
    service: 'Servis',
    variant: 'Variasi',
    pickupTime: 'Masa pickup',
    fulfilment: 'Fulfilment',
    delivery: 'Delivery',
    pickup: 'Pickup',
    dineIn: 'Dine-in QR meja',
    table: 'Nombor meja',
    date: 'Tarikh',
    time: 'Masa',
    staff: 'Nama staff',
    leaveType: 'Jenis cuti',
    startDate: 'Tarikh mula',
    endDate: 'Tarikh tamat',
    reason: 'Sebab',
    leadCompany: 'Nama syarikat / lead',
    dealValue: 'Nilai deal',
    stage: 'Stage',
    followUp: 'Nota follow-up',
    visitor: 'Nama visitor',
    host: 'Host',
    purpose: 'Tujuan',
    client: 'Nama customer',
    status: 'Status',
    pending: 'pending',
    cart: 'Cart',
    total: 'Jumlah',
    submit: 'Hantar request demo',
    submitted: 'Request demo sudah dihantar.',
    whatsapp: 'Preview mesej WhatsApp',
    add: 'Tambah',
    available: 'available',
    emptyCart: 'Tambah sekurang-kurangnya satu item untuk teruskan.',
    noSlots: 'Belum ada slot available. Tambah slot di Setup.',
    slots: 'slot',
    branch: 'Branch',
    notes: 'Nota',
    runnerNote: 'Penerangan item / job',
    pickupLocation: 'Lokasi pickup',
    dropoffLocation: 'Lokasi drop-off',
    preferredTime: 'Masa pilihan',
    consultationDate: 'Tarikh consultation pilihan',
    consultationTime: 'Masa consultation pilihan',
    customNeed: 'Apa yang anda perlukan?',
    deposit: 'Deposit',
    fullPayment: 'Full payment',
    paymentOption: 'Pilihan payment',
    payNow: 'Bayar sekarang',
    payLater: 'Bayar kemudian',
    distance: 'Jarak delivery (KM)',
    deliveryCharge: 'Delivery charge',
    orderNotes: 'Nota order',
    difficulty: 'Tahap kesukaran',
    itinerary: 'Itinerary',
    bring: 'Apa yang perlu dibawa',
  },
};

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-xs font-black mb-1.5 block" style={{ color: 'var(--c-muted)' }}>{label}</span>
      <input value={value} onChange={event => onChange(type === 'number' ? Number(event.target.value) : event.target.value)} type={type} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }} />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  const normalizedOptions = options.map(option => (typeof option === 'string' ? { value: option, label: option } : option));
  return (
    <label className="block">
      <span className="text-xs font-black mb-1.5 block" style={{ color: 'var(--c-muted)' }}>{label}</span>
      <select value={value} onChange={event => onChange(event.target.value)} className="bd-select w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}>
        {normalizedOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function SandboxHeader({ settings, labels }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black" style={{ background: settings.brandColor, color: 'var(--c-accent-contrast)' }}>{settings.logoText || 'BD'}</div>
        <div>
          <h2 className="font-black text-xl" style={{ color: 'var(--c-text)' }}>{settings.businessName}</h2>
          <p className="text-xs" style={{ color: 'var(--c-muted)' }}>{labels.customerView}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{labels.customerViewText}</p>
    </div>
  );
}

function Confirmation({ message, labels }) {
  if (!message) return null;
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--c-accent-muted)', border: '1px solid var(--c-border)' }}>
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle2 size={18} style={{ color: 'var(--c-accent)' }} />
        <p className="font-black" style={{ color: 'var(--c-text)' }}>{labels.submitted}</p>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{message}</p>
    </div>
  );
}

function ProductFlow({ type, settings, onSubmit, labels, lang }) {
  const [cart, setCart] = useState({});
  const [form, setForm] = useState({
    name: 'Amirul Hakimi',
    phone: '0123456789',
    address: 'Demo address',
    fulfilment: settings.pickupEnabled ? labels.pickup : labels.delivery,
    pickupTime: settings.pickupTimes[0] || '10:00 AM',
    table: 'A1',
    variant: 'Standard',
    distance: 3,
    paymentOption: labels.payLater,
    notes: 'Sambal asing',
  });
  const [confirmation, setConfirmation] = useState('');
  const products = settings.products.filter(item => item.active !== false);
  const variantOptions = Array.from(new Set(products.flatMap(item => item.variants || ['Standard'])));
  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const setQty = (item, change) => setCart(prev => ({ ...prev, [item.id]: Math.max(0, (prev[item.id] || 0) + change) }));
  const lines = products.map(item => ({ ...item, qty: cart[item.id] || 0 })).filter(item => item.qty > 0);
  const itemTotal = lines.reduce((sum, item) => sum + item.price * item.qty, 0);
  const isDelivery = type === 'food' && form.fulfilment === labels.delivery;
  const deliveryCharge = isDelivery ? (form.distance <= 5 ? 5 : 5 + (form.distance - 5)) : 0;
  const total = itemTotal + deliveryCharge;
  const fulfilmentOptions = type === 'qr'
    ? []
    : type === 'food'
      ? [labels.dineIn, settings.pickupEnabled ? labels.pickup : null, settings.deliveryEnabled ? labels.delivery : null].filter(Boolean)
      : [settings.pickupEnabled ? labels.pickup : null, settings.deliveryEnabled ? labels.delivery : null].filter(Boolean);

  const submit = () => {
    if (!lines.length) return;
    const id = createSubmissionId(type === 'qr' ? 'QR' : 'ORD');
    const itemSummary = lines.map(item => `${item.qty}x ${item.name}`).join(', ');
    const message = lang === 'my'
      ? `Hai ${settings.businessName}, order baru ${id}: ${itemSummary}. Jumlah ${formatMoney(total)}. ${isDelivery ? `Delivery ${formatMoney(deliveryCharge)} dan full payment diperlukan.` : `Payment: ${form.paymentOption}.`} Customer ${form.name}, ${form.phone}.`
      : `Hi ${settings.businessName}, new order ${id}: ${itemSummary}. Total ${formatMoney(total)}. ${isDelivery ? `Delivery ${formatMoney(deliveryCharge)} and full payment required.` : `Payment: ${form.paymentOption}.`} Customer ${form.name}, ${form.phone}.`;

    onSubmit({
      id,
      type,
      status: 'pending',
      createdAt: new Date().toISOString(),
      customer: { name: form.name, phone: form.phone, address: form.address },
      details: { fulfilment: form.fulfilment, pickupTime: form.pickupTime, table: form.table, variant: form.variant, notes: form.notes, deliveryCharge, paymentStatus: isDelivery ? labels.fullPayment : form.paymentOption },
      items: lines,
      total,
      whatsappMessage: message,
    });
    setConfirmation(message);
    setCart({});
  };

  return (
    <div className="grid lg:grid-cols-[1fr_0.8fr] gap-5">
      <div className="grid gap-3">
        {products.map(item => (
          <div key={item.id} className="rounded-2xl p-4 flex items-center justify-between gap-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div>
              <p className="font-black" style={{ color: 'var(--c-text)' }}>{item.name}</p>
              <p className="text-xs" style={{ color: 'var(--c-muted)' }}>{item.stock} {labels.available}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-black" style={{ color: 'var(--c-accent)' }}>{formatMoney(item.price)}</p>
              <button onClick={() => setQty(item, -1)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}><Minus size={14} /></button>
              <span className="w-7 text-center text-sm font-black" style={{ color: 'var(--c-text)' }}>{cart[item.id] || 0}</span>
              <button onClick={() => setQty(item, 1)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}><Plus size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          <h3 className="font-black mb-4" style={{ color: 'var(--c-text)' }}>{labels.cart}</h3>
          <div className="grid gap-3">
            <Field label={labels.name} value={form.name} onChange={value => set('name', value)} />
            <Field label={labels.phone} value={form.phone} onChange={value => set('phone', value)} />
            {(type === 'product' || (type === 'food' && form.fulfilment === labels.delivery)) && <Field label={labels.address} value={form.address} onChange={value => set('address', value)} />}
            {(type === 'qr' || (type === 'food' && form.fulfilment === labels.dineIn)) && <Field label={labels.table} value={form.table} onChange={value => set('table', value)} />}
            {type === 'product' && variantOptions.length > 0 && <Select label={labels.variant} value={form.variant} onChange={value => set('variant', value)} options={variantOptions} />}
            {fulfilmentOptions.length > 0 && <Select label={labels.fulfilment} value={form.fulfilment} onChange={value => set('fulfilment', value)} options={fulfilmentOptions} />}
            {settings.pickupEnabled && type !== 'qr' && <Select label={labels.pickupTime} value={form.pickupTime} onChange={value => set('pickupTime', value)} options={settings.pickupTimes} />}
            {isDelivery && <Field label={labels.distance} value={form.distance} onChange={value => set('distance', Math.max(1, value))} type="number" />}
            {type === 'food' && <Select label={labels.paymentOption} value={isDelivery ? labels.fullPayment : form.paymentOption} onChange={value => set('paymentOption', value)} options={isDelivery ? [labels.fullPayment] : [labels.payLater, labels.payNow]} />}
            {type === 'food' && <Field label={labels.orderNotes} value={form.notes} onChange={value => set('notes', value)} />}
          </div>
          <div className="mt-4 space-y-2">
            {lines.length === 0 && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>{labels.emptyCart}</p>}
            {lines.map(line => (
              <div key={line.id} className="flex justify-between text-xs" style={{ color: 'var(--c-muted)' }}>
                <span>{line.qty}x {line.name}</span>
                <span>{formatMoney(line.price * line.qty)}</span>
              </div>
            ))}
            {isDelivery && (
              <div className="flex justify-between text-xs" style={{ color: 'var(--c-muted)' }}>
                <span>{labels.deliveryCharge}</span>
                <span>{formatMoney(deliveryCharge)}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 font-black" style={{ color: 'var(--c-text)', borderTop: '1px solid var(--c-border)' }}>
              <span>{labels.total}</span>
              <span style={{ color: 'var(--c-accent)' }}>{formatMoney(total)}</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{settings.paymentText}</p>
          </div>
          <button onClick={submit} disabled={!lines.length} className="mt-4 w-full rounded-xl py-3 text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-40" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
            <Send size={15} /> {labels.submit}
          </button>
        </div>
        <Confirmation message={confirmation} labels={labels} />
      </div>
    </div>
  );
}

function BookingFlow({ settings, onSubmit, labels, lang }) {
  const services = settings.services;
  const slots = settings.slots.filter(slot => slot.available);
  const [form, setForm] = useState({
    name: 'Amirul Hakimi',
    phone: '0123456789',
    serviceId: services[0]?.id || '',
    slotId: slots[0]?.id || '',
  });
  const [confirmation, setConfirmation] = useState('');
  const service = services.find(item => item.id === form.serviceId) || services[0];
  const slot = slots.find(item => item.id === form.slotId) || slots[0];
  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const submit = () => {
    if (!service || !slot) return;
    const id = createSubmissionId('BOOK');
    const message = lang === 'my'
      ? `Hai ${settings.businessName}, booking baru ${id}: ${service.name}, ${slot.date} ${slot.time}, ${form.name}, ${form.phone}.`
      : `Hi ${settings.businessName}, new booking ${id}: ${service.name}, ${slot.date} ${slot.time}, ${form.name}, ${form.phone}.`;
    onSubmit({
      id,
      type: 'booking',
      status: 'pending',
      createdAt: new Date().toISOString(),
      customer: { name: form.name, phone: form.phone },
      details: { service: service.name, date: slot.date, time: slot.time },
      items: [{ ...service, qty: 1 }],
      total: service.price,
      whatsappMessage: message,
    });
    setConfirmation(message);
  };

  return (
    <div className="grid lg:grid-cols-[1fr_0.8fr] gap-5">
      <div className="grid gap-3">
        {services.map(item => (
          <button key={item.id} onClick={() => set('serviceId', item.id)} className="rounded-2xl p-4 text-left flex items-center justify-between gap-4" style={{ background: form.serviceId === item.id ? 'var(--c-accent-muted)' : 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div>
              <p className="font-black" style={{ color: 'var(--c-text)' }}>{item.name}</p>
              <p className="text-xs" style={{ color: 'var(--c-muted)' }}>{settings.difficulty || 'Beginner friendly'} - {item.stock} {labels.slots}</p>
            </div>
            <p className="font-black" style={{ color: 'var(--c-accent)' }}>{formatMoney(item.price)}</p>
          </button>
        ))}
        <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          <p className="font-black mb-3" style={{ color: 'var(--c-text)' }}>{labels.itinerary}</p>
          <div className="grid gap-2">
            {(settings.itinerary || []).map((item, index) => (
              <div key={item} className="flex gap-3 rounded-xl p-3" style={{ background: 'var(--c-input-bg)' }}>
                <span className="text-xs font-black" style={{ color: 'var(--c-accent)' }}>0{index + 1}</span>
                <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          <div className="grid gap-3">
            <Field label={labels.name} value={form.name} onChange={value => set('name', value)} />
            <Field label={labels.phone} value={form.phone} onChange={value => set('phone', value)} />
            <Select label="Payment option" value={form.paymentOption || labels.deposit} onChange={value => set('paymentOption', value)} options={[labels.deposit, labels.fullPayment]} />
            {slots.length ? (
              <Select label={`${labels.date} / ${labels.time}`} value={form.slotId} onChange={value => set('slotId', value)} options={slots.map(item => ({ value: item.id, label: `${item.date} - ${item.time}` }))} />
            ) : (
              <p className="text-sm" style={{ color: 'var(--c-muted)' }}>{labels.noSlots}</p>
            )}
          </div>
          <button onClick={submit} disabled={!slot} className="mt-4 w-full rounded-xl py-3 text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-40" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
            <Send size={15} /> {labels.submit}
          </button>
        </div>
        <Confirmation message={confirmation} labels={labels} />
      </div>
    </div>
  );
}

function AppointmentFlow({ settings, onSubmit, labels, lang }) {
  const services = settings.services;
  const slots = settings.slots.filter(slot => slot.available);
  const [form, setForm] = useState({
    name: 'Marissa Tan',
    phone: '0123456789',
    serviceId: services[0]?.id || '',
    branch: settings.branches?.[0] || 'HQ',
    staff: settings.staff?.[0] || 'Amirul Hakimi',
    slotId: slots[0]?.id || '',
    reason: 'Need consultation',
    notes: '',
  });
  const [confirmation, setConfirmation] = useState('');
  const service = services.find(item => item.id === form.serviceId) || services[0];
  const slot = slots.find(item => item.id === form.slotId) || slots[0];
  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const submit = () => {
    if (!service || !slot) return;
    const id = createSubmissionId('APPT');
    const message = lang === 'my'
      ? `Hai ${settings.businessName}, appointment baru ${id}: ${service.name}, ${slot.date} ${slot.time}, ${form.name}, ${form.phone}.`
      : `Hi ${settings.businessName}, new appointment ${id}: ${service.name}, ${slot.date} ${slot.time}, ${form.name}, ${form.phone}.`;
    onSubmit({
      id,
      type: 'appointment',
      status: 'pending',
      createdAt: new Date().toISOString(),
      customer: { name: form.name, phone: form.phone },
      details: { service: service.name, branch: form.branch, staff: form.staff, date: slot.date, time: slot.time, reason: form.reason, notes: form.notes },
      items: [{ ...service, qty: 1 }],
      total: service.price,
      whatsappMessage: message,
    });
    setConfirmation(message);
  };

  return (
    <div className="grid lg:grid-cols-[1fr_0.8fr] gap-5">
      <div className="grid gap-3">
        {services.map(item => (
          <button key={item.id} onClick={() => set('serviceId', item.id)} className="rounded-2xl p-4 text-left flex items-center justify-between gap-4" style={{ background: form.serviceId === item.id ? 'var(--c-accent-muted)' : 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div>
              <p className="font-black" style={{ color: 'var(--c-text)' }}>{item.name}</p>
              <p className="text-xs" style={{ color: 'var(--c-muted)' }}>{item.stock} {labels.slots}</p>
            </div>
            <p className="font-black" style={{ color: 'var(--c-accent)' }}>{formatMoney(item.price)}</p>
          </button>
        ))}
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          <div className="grid gap-3">
            <Select label={labels.service} value={form.serviceId} onChange={value => set('serviceId', value)} options={services.map(item => ({ value: item.id, label: item.name }))} />
            <Select label={labels.branch} value={form.branch} onChange={value => set('branch', value)} options={settings.branches || ['HQ']} />
            <Select label={labels.staff} value={form.staff} onChange={value => set('staff', value)} options={settings.staff || []} />
            {slots.length ? (
              <Select label={`${labels.date} / ${labels.time}`} value={form.slotId} onChange={value => set('slotId', value)} options={slots.map(item => ({ value: item.id, label: `${item.date} - ${item.time}` }))} />
            ) : (
              <p className="text-sm" style={{ color: 'var(--c-muted)' }}>{labels.noSlots}</p>
            )}
            <Field label={labels.name} value={form.name} onChange={value => set('name', value)} />
            <Field label={labels.phone} value={form.phone} onChange={value => set('phone', value)} />
            <Field label={labels.reason} value={form.reason} onChange={value => set('reason', value)} />
            <Field label={labels.notes} value={form.notes} onChange={value => set('notes', value)} />
          </div>
          <button onClick={submit} disabled={!slot} className="mt-4 w-full rounded-xl py-3 text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-40" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
            <Send size={15} /> {labels.submit}
          </button>
        </div>
        <Confirmation message={confirmation} labels={labels} />
      </div>
    </div>
  );
}

function DispatchFlow({ settings, onSubmit, labels, lang }) {
  const [form, setForm] = useState({
    runner: settings.runners?.[0] || 'Izzat',
    jobTitle: 'Collect documents from HQ',
    location: 'Setia Alam HQ to customer branch',
    status: 'assigned',
    proofNote: 'Will upload proof after arrival.',
  });
  const [confirmation, setConfirmation] = useState('');
  const [locationEnabled, setLocationEnabled] = useState(false);
  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const submit = () => {
    const id = createSubmissionId('JOB');
    const message = lang === 'my'
      ? `Update staff ${id}: ${form.runner} - ${form.jobTitle}. Status ${form.status}. Location tracking ${locationEnabled ? 'on' : 'off'}.`
      : `Staff update ${id}: ${form.runner} - ${form.jobTitle}. Status ${form.status}. Location tracking ${locationEnabled ? 'on' : 'off'}.`;
    onSubmit({
      id,
      type: 'dispatch',
      status: form.status === 'completed' ? 'completed' : 'processing',
      createdAt: new Date().toISOString(),
      customer: { name: form.runner, phone: 'staff-app' },
      details: { ...form, locationEnabled, assignedRunner: form.runner, title: form.jobTitle },
      items: [],
      total: 0,
      whatsappMessage: message,
    });
    setConfirmation(message);
  };

  return (
    <div className="grid lg:grid-cols-[1fr_0.8fr] gap-5">
      <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <p className="font-black mb-2" style={{ color: 'var(--c-text)' }}>Staff/Runner app</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
          {lang === 'my'
            ? 'Runner nampak job yang assigned, mula kerja, aktifkan location tracking, update status dan tambah proof atau note. Flow ini untuk monitoring staff dalaman, bukan marketplace order customer.'
            : 'Runners see assigned jobs, start the task, enable location tracking, update status and add proof or notes. This is for internal staff monitoring, not customer marketplace ordering.'}
        </p>
        <div className="mt-5 grid gap-2">
          {(settings.runners || []).map((runner, index) => (
            <div key={runner} className="flex items-center justify-between rounded-xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
              <span className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{runner}</span>
              <span className="rounded-full px-3 py-1 text-[10px] font-black" style={{ background: index === 0 ? 'var(--c-accent)' : 'var(--c-surface)', color: index === 0 ? 'var(--c-accent-contrast)' : 'var(--c-muted)' }}>{index === 0 ? (lang === 'my' ? 'Available' : 'Available') : (lang === 'my' ? 'Sedang kerja' : 'On job')}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          <div className="grid gap-3">
            <Select label="Runner / staff" value={form.runner} onChange={value => set('runner', value)} options={settings.runners || ['Izzat']} />
            <Field label="Assigned job" value={form.jobTitle} onChange={value => set('jobTitle', value)} />
            <Field label="Route / location" value={form.location} onChange={value => set('location', value)} />
            <Select label={labels.status} value={form.status} onChange={value => set('status', value)} options={['assigned', 'on the way', 'arrived', 'completed', 'cancelled']} />
            <button type="button" onClick={() => setLocationEnabled(value => !value)} className="rounded-xl px-4 py-3 text-left text-sm font-black" style={{ background: locationEnabled ? 'var(--c-primary-soft)' : 'var(--c-input-bg)', border: locationEnabled ? '1px solid var(--c-accent)' : '1px solid var(--c-border)', color: 'var(--c-text)' }}>
              {locationEnabled
                ? (lang === 'my' ? 'Location tracking aktif' : 'Location tracking enabled')
                : (lang === 'my' ? 'Aktifkan location tracking' : 'Enable location tracking')}
            </button>
            <Field label="Proof / note" value={form.proofNote} onChange={value => set('proofNote', value)} />
          </div>
          <button onClick={submit} className="mt-4 w-full rounded-xl py-3 text-sm font-black inline-flex items-center justify-center gap-2" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
            <Send size={15} /> {lang === 'my' ? 'Update job' : 'Update job'}
          </button>
        </div>
        <Confirmation message={confirmation} labels={labels} />
      </div>
    </div>
  );
}

function CustomConsultationFlow({ settings, onSubmit, labels, lang }) {
  const [form, setForm] = useState({
    name: 'Iman Rosli',
    phone: '0123456789',
    email: 'iman@example.com',
    consultationDate: '2026-06-10',
    consultationTime: settings.consultationTimes?.[0] || '10:00 AM',
    customNeed: 'Saya perlukan website premium dengan booking consultation.',
  });
  const [confirmation, setConfirmation] = useState('');
  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const submit = () => {
    const id = createSubmissionId('CONS');
    const message = lang === 'my'
      ? `Hai ${settings.businessName}, consultation request ${id}: ${form.customNeed}. Preferred: ${form.consultationDate} ${form.consultationTime}.`
      : `Hi ${settings.businessName}, consultation request ${id}: ${form.customNeed}. Preferred: ${form.consultationDate} ${form.consultationTime}.`;
    onSubmit({
      id,
      type: 'custom',
      status: 'pending',
      createdAt: new Date().toISOString(),
      customer: { name: form.name, phone: form.phone, email: form.email },
      details: { ...form, title: 'Custom Website/System Consultation' },
      items: [],
      total: 0,
      whatsappMessage: message,
    });
    setConfirmation(message);
  };

  return (
    <div className="grid lg:grid-cols-[1fr_0.8fr] gap-5">
      <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <p className="font-black mb-2" style={{ color: 'var(--c-text)' }}>{lang === 'my' ? 'Custom quote selepas review' : 'Custom quote after review'}</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
          {lang === 'my'
            ? 'Untuk bisnes yang perlukan website atau system khas ikut workflow sendiri. Kami review keperluan anda dan set appointment sebelum harga akhir diberi.'
            : 'For businesses that need a custom website or system built around their own workflow. We review your needs and set a consultation before the final quote is confirmed.'}
        </p>
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          <div className="grid gap-3">
            <Field label={labels.name} value={form.name} onChange={value => set('name', value)} />
            <Field label={labels.phone} value={form.phone} onChange={value => set('phone', value)} />
            <Field label={labels.email} value={form.email} onChange={value => set('email', value)} />
            <Field label={labels.consultationDate} value={form.consultationDate} onChange={value => set('consultationDate', value)} type="date" />
            <Select label={labels.consultationTime} value={form.consultationTime} onChange={value => set('consultationTime', value)} options={settings.consultationTimes || ['10:00 AM']} />
            <Field label={labels.customNeed} value={form.customNeed} onChange={value => set('customNeed', value)} />
          </div>
          <button onClick={submit} className="mt-4 w-full rounded-xl py-3 text-sm font-black inline-flex items-center justify-center gap-2" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
            <Send size={15} /> {labels.submit}
          </button>
        </div>
        <Confirmation message={confirmation} labels={labels} />
      </div>
    </div>
  );
}

function FormFlow({ type, settings, onSubmit, labels, lang }) {
  const [form, setForm] = useState({
    name: 'Amirul Hakimi',
    phone: '0123456789',
    email: 'amir@example.com',
    staff: settings.staff[0] || 'Amirul Hakimi',
    leaveType: settings.leaveTypes[0] || 'Annual Leave',
    startDate: '2026-06-05',
    endDate: '2026-06-06',
    reason: 'Family matter',
    company: 'AK Tech Sdn Bhd',
    dealValue: 8500,
    stage: settings.pipelineStages[0] || 'New Lead',
    followUp: 'Follow up tomorrow',
    visitor: 'Liyana Razak',
    host: settings.hosts[0] || 'Front Desk',
    purpose: settings.purposes[0] || 'Meeting',
    client: 'Client Sdn Bhd',
    invoiceItem: settings.invoiceItems[0]?.id || '',
    workflowStep: settings.workflowSteps[0] || 'Request',
  });
  const [confirmation, setConfirmation] = useState('');
  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const selectedInvoiceItem = settings.invoiceItems.find(item => item.id === form.invoiceItem) || settings.invoiceItems[0];

  const submit = () => {
    const id = createSubmissionId(type.toUpperCase().slice(0, 4));
    const total = type === 'invoice' ? Number(selectedInvoiceItem?.price || 0) : type === 'crm' ? Number(form.dealValue || 0) : 0;
    const title = type === 'hr' ? `${form.staff} - ${form.leaveType}`
      : type === 'crm' ? form.company
      : type === 'visitor' ? form.visitor
      : type === 'invoice' ? form.client
      : `${form.name} - ${form.workflowStep}`;
    const message = lang === 'my'
      ? `Hai ${settings.businessName}, request baru ${id}: ${title}. Status: ${labels.pending}.`
      : `Hi ${settings.businessName}, new request ${id}: ${title}. Status: ${labels.pending}.`;

    onSubmit({
      id,
      type,
      status: 'pending',
      createdAt: new Date().toISOString(),
      customer: { name: type === 'visitor' ? form.visitor : form.name, phone: form.phone, email: form.email },
      details: { ...form, title, paymentStatus: type === 'invoice' ? 'unpaid' : null },
      items: selectedInvoiceItem ? [{ ...selectedInvoiceItem, qty: 1 }] : [],
      total,
      whatsappMessage: message,
    });
    setConfirmation(message);
  };

  return (
    <div className="grid lg:grid-cols-[1fr_0.8fr] gap-5">
      <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <div className="grid md:grid-cols-2 gap-3">
          {type === 'hr' && (
            <>
              <Select label={labels.staff} value={form.staff} onChange={value => set('staff', value)} options={settings.staff} />
              <Select label={labels.leaveType} value={form.leaveType} onChange={value => set('leaveType', value)} options={settings.leaveTypes} />
              <Field label={labels.startDate} value={form.startDate} onChange={value => set('startDate', value)} />
              <Field label={labels.endDate} value={form.endDate} onChange={value => set('endDate', value)} />
              <Field label={labels.reason} value={form.reason} onChange={value => set('reason', value)} />
            </>
          )}
          {type === 'crm' && (
            <>
              <Field label={labels.leadCompany} value={form.company} onChange={value => set('company', value)} />
              <Field label={labels.phone} value={form.phone} onChange={value => set('phone', value)} />
              <Field label={labels.dealValue} value={form.dealValue} onChange={value => set('dealValue', value)} type="number" />
              <Select label={labels.stage} value={form.stage} onChange={value => set('stage', value)} options={settings.pipelineStages} />
              <Field label={labels.followUp} value={form.followUp} onChange={value => set('followUp', value)} />
            </>
          )}
          {type === 'visitor' && (
            <>
              <Field label={labels.visitor} value={form.visitor} onChange={value => set('visitor', value)} />
              <Field label={labels.phone} value={form.phone} onChange={value => set('phone', value)} />
              <Select label={labels.host} value={form.host} onChange={value => set('host', value)} options={settings.hosts} />
              <Select label={labels.purpose} value={form.purpose} onChange={value => set('purpose', value)} options={settings.purposes} />
            </>
          )}
          {type === 'invoice' && (
            <>
              <Field label={labels.client} value={form.client} onChange={value => set('client', value)} />
              <Field label={labels.email} value={form.email} onChange={value => set('email', value)} />
              <Select label={labels.item} value={form.invoiceItem} onChange={value => set('invoiceItem', value)} options={settings.invoiceItems.map(item => ({ value: item.id, label: `${item.name} - ${formatMoney(item.price)}` }))} />
            </>
          )}
          {type === 'workflow' && (
            <>
              <Field label={labels.name} value={form.name} onChange={value => set('name', value)} />
              <Field label={labels.phone} value={form.phone} onChange={value => set('phone', value)} />
              <Select label={labels.status} value={form.workflowStep} onChange={value => set('workflowStep', value)} options={settings.workflowSteps} />
              <Field label={labels.reason} value={form.reason} onChange={value => set('reason', value)} />
            </>
          )}
        </div>
        <button onClick={submit} className="mt-4 w-full rounded-xl py-3 text-sm font-black inline-flex items-center justify-center gap-2" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
          <Send size={15} /> {labels.submit}
        </button>
      </div>

      <div className="space-y-4">
        <Confirmation message={confirmation} labels={labels} />
        <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          <p className="font-black mb-3" style={{ color: 'var(--c-text)' }}>{labels.whatsapp}</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{confirmation || settings.paymentText}</p>
          {type === 'invoice' && selectedInvoiceItem && (
            <div className="mt-4 rounded-xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
              <div className="flex justify-between gap-4 text-sm">
                <span style={{ color: 'var(--c-muted)' }}>{selectedInvoiceItem.name}</span>
                <strong style={{ color: 'var(--c-accent)' }}>{formatMoney(selectedInvoiceItem.price)}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DemoCustomerView({ system, state, onAddSubmission, lang = 'en' }) {
  const labels = copy[lang] || copy.en;
  const settings = state.settings;
  const type = system.sandboxType;

  return (
    <div className="grid gap-5">
      <SandboxHeader settings={settings} labels={labels} />
      {['food', 'product', 'qr'].includes(type) && <ProductFlow type={type} settings={settings} onSubmit={onAddSubmission} labels={labels} lang={lang} />}
      {type === 'booking' && <BookingFlow settings={settings} onSubmit={onAddSubmission} labels={labels} lang={lang} />}
      {type === 'appointment' && <AppointmentFlow settings={settings} onSubmit={onAddSubmission} labels={labels} lang={lang} />}
      {type === 'dispatch' && <DispatchFlow settings={settings} onSubmit={onAddSubmission} labels={labels} lang={lang} />}
      {type === 'custom' && <CustomConsultationFlow settings={settings} onSubmit={onAddSubmission} labels={labels} lang={lang} />}
      {['hr', 'crm', 'visitor', 'invoice', 'workflow'].includes(type) && <FormFlow type={type} settings={settings} onSubmit={onAddSubmission} labels={labels} lang={lang} />}
    </div>
  );
}
