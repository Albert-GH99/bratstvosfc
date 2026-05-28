import { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';

const copy = {
  en: {
    title: 'Demo business details',
    subtitle: 'Edit the sample business so you can imagine how your own website or system would feel.',
    businessName: 'Business name',
    brandColor: 'Brand color',
    logoText: 'Logo initials',
    whatsapp: 'WhatsApp number',
    paymentText: 'Payment method text',
    pickup: 'Pickup enabled',
    delivery: 'Delivery enabled',
    items: 'Products / menu items',
    services: 'Services',
    slots: 'Availability slots',
    staff: 'Staff',
    leaveTypes: 'Leave types',
    stages: 'Pipeline stages',
    hosts: 'Hosts',
    purposes: 'Visit purposes',
    workflow: 'Process steps',
    runners: 'Runners',
    branches: 'Branches',
    consultationTimes: 'Consultation times',
    name: 'Name',
    price: 'Price',
    stock: 'Stock',
    date: 'Date',
    time: 'Time',
    available: 'Available',
    add: 'Add',
    remove: 'Remove',
    save: 'Save setup',
    saved: 'Demo details updated.',
    reset: 'Reset demo',
    newItem: 'New item',
    newOption: 'New option',
    on: 'ON',
    off: 'OFF',
  },
  my: {
    title: 'Detail bisnes demo',
    subtitle: 'Ubah contoh bisnes supaya anda boleh bayangkan rasa website atau system sendiri.',
    businessName: 'Nama bisnes',
    brandColor: 'Warna brand',
    logoText: 'Initial logo',
    whatsapp: 'Nombor WhatsApp',
    paymentText: 'Payment text',
    pickup: 'Pickup aktif',
    delivery: 'Delivery aktif',
    items: 'Produk / menu',
    services: 'Servis',
    slots: 'Slot available',
    staff: 'Staff',
    leaveTypes: 'Jenis cuti',
    stages: 'Stage pipeline',
    hosts: 'Host',
    purposes: 'Tujuan lawatan',
    workflow: 'Langkah proses',
    runners: 'Runner',
    branches: 'Branch',
    consultationTimes: 'Masa consultation',
    name: 'Nama',
    price: 'Harga',
    stock: 'Stok',
    date: 'Tarikh',
    time: 'Masa',
    available: 'Available',
    add: 'Tambah',
    remove: 'Buang',
    save: 'Simpan setup',
    saved: 'Detail demo updated.',
    reset: 'Reset demo',
    newItem: 'Item baru',
    newOption: 'Pilihan baru',
    on: 'AKTIF',
    off: 'TUTUP',
  },
};

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-xs font-black mb-1.5 block" style={{ color: 'var(--c-muted)' }}>{label}</span>
      <input
        value={value}
        onChange={event => onChange(type === 'number' ? Number(event.target.value) : event.target.value)}
        type={type}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none"
        style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}
      />
    </label>
  );
}

function Toggle({ label, checked, onChange, onText = 'ON', offText = 'OFF' }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="rounded-xl px-4 py-3 text-sm font-black text-left"
      style={{ background: checked ? 'var(--c-accent-muted)' : 'var(--c-input-bg)', color: checked ? 'var(--c-accent)' : 'var(--c-muted)', border: '1px solid var(--c-border)' }}
    >
      {label}: {checked ? onText : offText}
    </button>
  );
}

function ItemEditor({ title, items, labels, onChange }) {
  const updateItem = (id, patch) => {
    onChange(items.map(item => (item.id === id ? { ...item, ...patch } : item)));
  };

  const addItem = () => {
    onChange([
      ...items,
      { id: `item-${Date.now()}`, name: labels.newItem, price: 0, stock: 10, variants: ['Standard'], active: true },
    ]);
  };

  const removeItem = id => {
    onChange(items.filter(item => item.id !== id));
  };

  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="font-black" style={{ color: 'var(--c-text)' }}>{title}</h3>
        <button onClick={addItem} className="rounded-xl px-3 py-2 text-xs font-black inline-flex items-center gap-2" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
          <Plus size={14} /> {labels.add}
        </button>
      </div>
      <div className="grid gap-3">
        {items.map(item => (
          <div key={item.id} className="grid md:grid-cols-[1fr_120px_120px_44px] gap-2">
            <Field label={labels.name} value={item.name} onChange={value => updateItem(item.id, { name: value })} />
            <Field label={labels.price} value={item.price} onChange={value => updateItem(item.id, { price: value })} type="number" />
            <Field label={labels.stock} value={item.stock} onChange={value => updateItem(item.id, { stock: value })} type="number" />
            <button onClick={() => removeItem(item.id)} className="self-end h-[46px] rounded-xl flex items-center justify-center" style={{ color: 'var(--c-muted)', border: '1px solid var(--c-border)' }} aria-label={labels.remove}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StringListEditor({ title, items, labels, onChange }) {
  const updateItem = (index, value) => onChange(items.map((item, itemIndex) => (itemIndex === index ? value : item)));
  const addItem = () => onChange([...items, labels.newOption]);
  const removeItem = index => onChange(items.filter((_, itemIndex) => itemIndex !== index));

  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="font-black" style={{ color: 'var(--c-text)' }}>{title}</h3>
        <button onClick={addItem} className="rounded-xl px-3 py-2 text-xs font-black inline-flex items-center gap-2" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
          <Plus size={14} /> {labels.add}
        </button>
      </div>
      <div className="grid gap-2">
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="grid grid-cols-[1fr_44px] gap-2">
            <input value={item} onChange={event => updateItem(index, event.target.value)} className="rounded-xl px-4 py-3 text-sm outline-none" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }} />
            <button onClick={() => removeItem(index)} className="rounded-xl flex items-center justify-center" style={{ color: 'var(--c-muted)', border: '1px solid var(--c-border)' }} aria-label={labels.remove}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlotEditor({ slots, labels, onChange }) {
  const updateSlot = (id, patch) => onChange(slots.map(slot => (slot.id === id ? { ...slot, ...patch } : slot)));
  const addSlot = () => onChange([...slots, { id: `slot-${Date.now()}`, date: '2026-06-10', time: '10:00 AM', available: true }]);
  const removeSlot = id => onChange(slots.filter(slot => slot.id !== id));

  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="font-black" style={{ color: 'var(--c-text)' }}>{labels.slots}</h3>
        <button onClick={addSlot} className="rounded-xl px-3 py-2 text-xs font-black inline-flex items-center gap-2" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
          <Plus size={14} /> {labels.add}
        </button>
      </div>
      <div className="grid gap-3">
        {slots.slice(0, 10).map(slot => (
          <div key={slot.id} className="grid md:grid-cols-[1fr_1fr_120px_44px] gap-2">
            <Field label={labels.date} value={slot.date} onChange={value => updateSlot(slot.id, { date: value })} />
            <Field label={labels.time} value={slot.time} onChange={value => updateSlot(slot.id, { time: value })} />
            <Toggle label={labels.available} checked={slot.available} onChange={value => updateSlot(slot.id, { available: value })} onText={labels.on} offText={labels.off} />
            <button onClick={() => removeSlot(slot.id)} className="self-end h-[46px] rounded-xl flex items-center justify-center" style={{ color: 'var(--c-muted)', border: '1px solid var(--c-border)' }} aria-label={labels.remove}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DemoSetupPanel({ system, state, onSettingsChange, onReset, lang = 'en' }) {
  const labels = copy[lang] || copy.en;
  const settings = state.settings;
  const type = system.sandboxType;
  const save = patch => onSettingsChange({ ...settings, ...patch });
  const [message, setMessage] = useState('');

  const markSaved = () => {
    setMessage(labels.saved);
    window.setTimeout(() => setMessage(''), 1800);
  };

  const showCatalog = ['food', 'product', 'qr'].includes(type);
  const showFulfilment = ['food', 'product'].includes(type);
  const showServices = ['booking', 'appointment'].includes(type);

  return (
    <div className="grid gap-5">
      <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
          <div>
            <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--c-text)' }}>{labels.title}</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{labels.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={markSaved} className="rounded-xl px-4 py-3 text-sm font-black inline-flex items-center gap-2" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
              <Save size={15} /> {labels.save}
            </button>
            <button onClick={onReset} className="rounded-xl px-4 py-3 text-sm font-black" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>
              {labels.reset}
            </button>
          </div>
        </div>

        {message && (
          <p className="rounded-xl px-4 py-3 text-sm font-black mb-5" style={{ background: 'var(--c-accent-muted)', color: 'var(--c-accent)', border: '1px solid var(--c-border)' }}>
            {message}
          </p>
        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
          <Field label={labels.businessName} value={settings.businessName} onChange={value => save({ businessName: value })} />
          <Field label={labels.logoText} value={settings.logoText} onChange={value => save({ logoText: value })} />
          <Field label={labels.whatsapp} value={settings.whatsapp} onChange={value => save({ whatsapp: value })} />
          <label className="block">
            <span className="text-xs font-black mb-1.5 block" style={{ color: 'var(--c-muted)' }}>{labels.brandColor}</span>
            <input value={settings.brandColor} onChange={event => save({ brandColor: event.target.value })} type="color" className="w-full h-[46px] rounded-xl px-2 py-2 outline-none" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)' }} />
          </label>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_auto] gap-3 mt-4">
          <Field label={labels.paymentText} value={settings.paymentText} onChange={value => save({ paymentText: value })} />
          {showFulfilment && <Toggle label={labels.pickup} checked={settings.pickupEnabled} onChange={value => save({ pickupEnabled: value })} onText={labels.on} offText={labels.off} />}
          {showFulfilment && <Toggle label={labels.delivery} checked={settings.deliveryEnabled} onChange={value => save({ deliveryEnabled: value })} onText={labels.on} offText={labels.off} />}
        </div>
      </div>

      {showCatalog && (
        <ItemEditor title={labels.items} items={settings.products} labels={labels} onChange={products => save({ products })} />
      )}

      {showServices && (
        <>
          <ItemEditor title={labels.services} items={settings.services} labels={labels} onChange={services => save({ services })} />
          <SlotEditor slots={settings.slots} labels={labels} onChange={slots => save({ slots })} />
        </>
      )}

      {type === 'hr' && (
        <div className="grid md:grid-cols-2 gap-5">
          <StringListEditor title={labels.staff} items={settings.staff} labels={labels} onChange={staff => save({ staff })} />
          <StringListEditor title={labels.leaveTypes} items={settings.leaveTypes} labels={labels} onChange={leaveTypes => save({ leaveTypes })} />
        </div>
      )}

      {type === 'crm' && (
        <StringListEditor title={labels.stages} items={settings.pipelineStages} labels={labels} onChange={pipelineStages => save({ pipelineStages })} />
      )}

      {type === 'dispatch' && (
        <StringListEditor title={labels.runners} items={settings.runners || []} labels={labels} onChange={runners => save({ runners })} />
      )}

      {type === 'appointment' && (
        <StringListEditor title={labels.branches} items={settings.branches || []} labels={labels} onChange={branches => save({ branches })} />
      )}

      {type === 'custom' && (
        <StringListEditor title={labels.consultationTimes} items={settings.consultationTimes || []} labels={labels} onChange={consultationTimes => save({ consultationTimes })} />
      )}

      {type === 'visitor' && (
        <div className="grid md:grid-cols-2 gap-5">
          <StringListEditor title={labels.hosts} items={settings.hosts} labels={labels} onChange={hosts => save({ hosts })} />
          <StringListEditor title={labels.purposes} items={settings.purposes} labels={labels} onChange={purposes => save({ purposes })} />
        </div>
      )}

      {type === 'invoice' && (
        <ItemEditor title={labels.items} items={settings.invoiceItems} labels={labels} onChange={invoiceItems => save({ invoiceItems })} />
      )}

      {type === 'workflow' && (
        <StringListEditor title={labels.workflow} items={settings.workflowSteps} labels={labels} onChange={workflowSteps => save({ workflowSteps })} />
      )}
    </div>
  );
}
