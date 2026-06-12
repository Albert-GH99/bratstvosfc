import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChefHat,
  CreditCard,
  Gauge,
  MapPin,
  PackageCheck,
  QrCode,
  ReceiptText,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Truck,
  WalletCards,
} from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import PremiumButton from '@/components/premium/PremiumButton';
import PremiumCard from '@/components/premium/PremiumCard';
import SectionShell from '@/components/premium/SectionShell';

const copy = {
  en: {
    eyebrow: 'Bratstvo Food Order System',
    title: 'Premium F&B Ordering System for Malaysian Restaurants, Cafes, Stalls & Cloud Kitchens.',
    subtitle: 'Run QR ordering, kitchen screen, payment flow, delivery setup, costing and sales tracking in one branded system. Start simple, then upgrade as your operation grows.',
    setup: 'Request Food System Setup',
    demo: 'View Demo',
    packages: 'Compare Packages',
    value: ['Website + ordering system', 'QR order + kitchen screen', 'Built around Malaysian SME workflow'],
    problemTitle: 'Kurangkan salah order, kurangkan kerja manual, nampak lebih professional.',
    problemText: 'One connected flow keeps customer orders, kitchen work and owner reporting clear without forcing a small business to begin with an expensive full POS setup.',
    featureTitle: 'One system for the full food order operation.',
    flowTitle: 'Customer order flow',
    flowSub: 'Homepage to kitchen order, with the right payment rule for every fulfilment type.',
    operationsTitle: 'Built for customer, kitchen and owner.',
    deliveryTitle: 'Delivery charge and payment rules that match real operations.',
    deliveryText: 'Set RM5 minimum delivery for 1km to 5km, then add RM1 per KM after that. Delivery orders require full payment before confirmation, while dine-in and takeaway can pay now or later.',
    costingTitle: 'Know what sells, what it costs and what may be profitable.',
    costingText: 'Set cost per gram, kg, pcs, pack, bottle or a custom unit. Build ingredients, menu sets and combos, then review sales, best sellers and estimated profit.',
    packageTitle: 'Start with the flow you need. Upgrade when the business is ready.',
    packageSub: 'Every package is designed to give Malaysian SME food businesses a practical starting point without unnecessary complexity.',
  },
  my: {
    eyebrow: 'Bratstvo Food Order System',
    title: 'Sistem Order F&B Premium untuk Restoran, Cafe, Gerai & Cloud Kitchen Malaysia.',
    subtitle: 'Urus QR order, kitchen screen, payment flow, delivery setup, costing dan sales tracking dalam satu sistem berjenama. Mula simple, kemudian upgrade bila operasi berkembang.',
    setup: 'Request Food System Setup',
    demo: 'View Demo',
    packages: 'Compare Packages',
    value: ['Website + ordering system', 'QR order + kitchen screen', 'Dibina ikut workflow SME Malaysia'],
    problemTitle: 'Kurangkan salah order, kurangkan kerja manual, nampak lebih professional.',
    problemText: 'Satu flow yang connected bantu susun order customer, kerja kitchen dan report owner tanpa memaksa bisnes kecil bermula dengan setup POS penuh yang mahal.',
    featureTitle: 'Satu sistem untuk seluruh operasi food order.',
    flowTitle: 'Flow order customer',
    flowSub: 'Dari homepage hingga order masuk kitchen, dengan payment rule yang sesuai untuk setiap jenis order.',
    operationsTitle: 'Dibina untuk customer, kitchen dan owner.',
    deliveryTitle: 'Delivery charge dan payment rule ikut operasi sebenar.',
    deliveryText: 'Tetapkan minimum delivery RM5 untuk 1km hingga 5km, kemudian tambah RM1 setiap KM selepas itu. Delivery perlukan full payment sebelum confirmation, manakala dine-in dan takeaway boleh bayar sekarang atau kemudian.',
    costingTitle: 'Tahu apa yang laku, berapa kos dan anggaran untung.',
    costingText: 'Tetapkan kos per gram, kg, pcs, pack, bottle atau custom unit. Susun ingredients, menu set dan combo, kemudian semak sales, best seller dan profit estimate.',
    packageTitle: 'Mula dengan flow yang diperlukan. Upgrade bila bisnes sudah bersedia.',
    packageSub: 'Setiap pakej beri food business SME Malaysia titik mula yang practical tanpa complexity yang tidak diperlukan.',
  },
};

const featureGroups = [
  [Smartphone, 'Customer ordering', ['Digital menu', 'QR dine-in', 'Takeaway / self collect', 'Delivery ordering', 'Add-ons and variations', 'Customer notes']],
  [ChefHat, 'Kitchen operations', ['Kitchen order screen', 'New / Preparing / Ready', 'Completed / Cancelled', 'Urgent order highlight', 'Dine-in / Takeaway / Delivery lanes']],
  [Store, 'Admin control', ['Menu and category setup', 'Set / combo and promo', 'Voucher / discount', 'QR generator', 'Customer database', 'Order settings']],
  [BarChart3, 'Costing and analytics', ['Ingredient costing', 'Stock tracking', 'Sales summary', 'Profit estimate', 'Best seller report', 'Custom units']],
];

const customerFlow = ['Homepage', 'Choose order type', 'Browse menu', 'Add to cart', 'Checkout', 'Payment option', 'WhatsApp / Kitchen'];

const packageRows = [
  ['Starter', 'Digital menu, WhatsApp order, basic checkout, basic admin'],
  ['Growth', 'QR order, kitchen dashboard, takeaway/delivery, sales summary'],
  ['Business', 'Full order modes, QR generator, payment, promo, costing, analytics'],
  ['Pro', 'Inventory, ingredient costing, advanced reports, multi-staff, automation'],
  ['Elite', 'Multi-branch, advanced custom system, full automation, priority support'],
];

function KitchenPreview({ lang }) {
  const columns = [
    [lang === 'my' ? 'Baru' : 'New', '#fbbf24', ['D-104 Delivery', 'T-A4 Dine-in']],
    [lang === 'my' ? 'Sedang Masak' : 'Preparing', '#60a5fa', ['P-092 Takeaway', 'T-B2 Dine-in']],
    [lang === 'my' ? 'Sedia' : 'Ready', '#18d98a', ['D-101 Delivery', 'P-089 Takeaway']],
  ];

  return (
    <PremiumCard className="p-4 md:p-5" hover={false}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="premium-eyebrow">Kitchen dashboard</p>
          <h3 className="mt-2 text-xl font-black" style={{ color: 'var(--c-text)' }}>{lang === 'my' ? 'Queue order live' : 'Live order queue'}</h3>
        </div>
        <span className="rounded-full px-3 py-1 text-[10px] font-black" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)' }}>Tablet ready</span>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {columns.map(([title, color, orders]) => (
          <div key={title} className="rounded-2xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-black" style={{ color: 'var(--c-text)' }}>{title}</span>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
            </div>
            <div className="grid gap-2">
              {orders.map((order, index) => (
                <div key={order} className="rounded-xl p-3" style={{ background: index === 0 && title === 'New' ? 'rgba(251,191,36,.12)' : 'var(--c-surface)', border: `1px solid ${index === 0 && title === 'New' ? 'rgba(251,191,36,.4)' : 'var(--c-border)'}` }}>
                  <p className="text-[11px] font-black" style={{ color: 'var(--c-text)' }}>{order}</p>
                  <p className="mt-1 text-[10px]" style={{ color: 'var(--c-muted)' }}>{index === 0 ? 'Nasi Lemak Set x2' : 'Chicken Rice + note'}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PremiumCard>
  );
}

function AdminPreview({ lang }) {
  const stats = lang === 'my'
    ? [['Sales', 'RM2,480'], ['Order', '86'], ['Profit estimate', 'RM1,026'], ['Best seller', 'Nasi Lemak']]
    : [['Sales', 'RM2,480'], ['Orders', '86'], ['Profit estimate', 'RM1,026'], ['Best seller', 'Nasi Lemak']];

  return (
    <PremiumCard className="p-4 md:p-5" hover={false}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="premium-eyebrow">Admin sales dashboard</p>
          <h3 className="mt-2 text-xl font-black" style={{ color: 'var(--c-text)' }}>{lang === 'my' ? 'Ringkasan hari ini' : 'Today at a glance'}</h3>
        </div>
        <Gauge size={22} style={{ color: 'var(--c-accent)' }} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
            <p className="text-[10px] font-black" style={{ color: 'var(--c-muted)' }}>{label}</p>
            <p className="mt-2 text-lg font-black" style={{ color: label === 'Sales' ? 'var(--c-accent)' : 'var(--c-text)' }}>{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl p-4" style={{ background: 'var(--c-primary-soft)', border: '1px solid rgba(24,217,138,.25)' }}>
        <p className="text-xs font-black" style={{ color: 'var(--c-text)' }}>Stock alert</p>
        <p className="mt-1 text-[11px]" style={{ color: 'var(--c-muted)' }}>{lang === 'my' ? 'Chicken breast: baki 4.2kg. Sambal: baki 18 portion.' : 'Chicken breast: 4.2kg remaining. Sambal batch: 18 portions.'}</p>
      </div>
    </PremiumCard>
  );
}

export default function FoodSystemExperience() {
  const { lang } = useLang();
  const t = copy[lang] || copy.en;
  const groups = lang === 'my'
    ? [
      [Smartphone, 'Order customer', ['Digital menu', 'QR dine-in', 'Takeaway / self collect', 'Delivery order', 'Add-on dan variasi', 'Nota customer']],
      [ChefHat, 'Operasi kitchen', ['Kitchen order screen', 'Baru / Sedang Masak / Sedia', 'Selesai / Batal', 'Highlight order urgent', 'Lane dine-in / takeaway / delivery']],
      [Store, 'Kawalan admin', ['Setup menu dan kategori', 'Set / combo dan promo', 'Voucher / discount', 'QR generator', 'Database customer', 'Setting order']],
      [BarChart3, 'Costing dan analytics', ['Ingredient costing', 'Stock tracking', 'Sales summary', 'Profit estimate', 'Report best seller', 'Custom unit']],
    ]
    : featureGroups;
  const flow = lang === 'my'
    ? ['Homepage', 'Pilih jenis order', 'Browse menu', 'Tambah ke cart', 'Checkout', 'Pilihan payment', 'WhatsApp / Kitchen']
    : customerFlow;
  const orderTypes = lang === 'my'
    ? [
      [QrCode, 'Dine-in', 'Scan QR meja, order masuk kitchen, bayar sekarang atau kemudian.'],
      [ShoppingBag, 'Takeaway', 'Pilih masa pickup, bayar sekarang atau kemudian, terima WhatsApp confirmation.'],
      [Truck, 'Delivery', 'Masukkan jarak, delivery charge dikira, full payment diperlukan.'],
    ]
    : [
      [QrCode, 'Dine-in', 'Scan table QR, order goes to kitchen, pay now or later.'],
      [ShoppingBag, 'Takeaway', 'Choose pickup time, pay now or later, receive WhatsApp confirmation.'],
      [Truck, 'Delivery', 'Enter distance, delivery charge calculated, full payment required.'],
    ];
  const packages = lang === 'my'
    ? [
      ['Starter', 'Digital menu, WhatsApp order, basic checkout, basic admin'],
      ['Growth', 'QR order, kitchen dashboard, takeaway/delivery, sales summary'],
      ['Business', 'Semua jenis order, QR generator, payment, promo, costing, analytics'],
      ['Pro', 'Inventory, ingredient costing, report lanjutan, multi-staff, automation'],
      ['Elite', 'Multi-branch, advanced custom system, full automation, priority support'],
    ]
    : packageRows;

  return (
    <div id="food-system">
      <SectionShell className="pt-12" eyebrow={t.eyebrow}>
        <PremiumCard glow className="overflow-hidden p-6 md:p-10" hover={false}>
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-black" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)', border: '1px solid rgba(24,217,138,.28)' }}>
                <Sparkles size={13} /> Website + Ordering + Operations
              </span>
              <h2 className="mt-5 text-3xl font-black leading-tight md:text-6xl" style={{ color: 'var(--c-text)' }}>{t.title}</h2>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed md:text-lg" style={{ color: 'var(--c-muted)' }}>{t.subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {t.value.map(item => <span key={item} className="rounded-full px-3 py-2 text-xs font-black" style={{ background: 'var(--c-input-bg)', color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>{item}</span>)}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <PremiumButton to="/setup?system=food-order&package=Business" className="px-5 py-3 text-sm">{t.setup} <ArrowRight size={15} /></PremiumButton>
                <PremiumButton to="/demo?system=food-order&package=Business" variant="secondary" className="px-5 py-3 text-sm">{t.demo}</PremiumButton>
                <PremiumButton to="/pricing" variant="ghost" className="px-5 py-3 text-sm">{t.packages}</PremiumButton>
              </div>
            </div>
            <KitchenPreview lang={lang} />
          </div>
        </PremiumCard>
      </SectionShell>

      <SectionShell title={t.problemTitle} subtitle={t.problemText}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {groups.map(([Icon, title, items]) => (
            <PremiumCard key={title} className="p-5">
              <Icon size={23} style={{ color: 'var(--c-accent)' }} />
              <h3 className="mt-5 text-xl font-black" style={{ color: 'var(--c-text)' }}>{title}</h3>
              <div className="mt-4 grid gap-2">
                {items.map(item => <p key={item} className="flex gap-2 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}><CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: 'var(--c-accent)' }} />{item}</p>)}
              </div>
            </PremiumCard>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow={t.flowTitle} title={t.flowTitle} subtitle={t.flowSub}>
        <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-7">
          {flow.map((item, index) => (
            <PremiumCard key={item} className="p-4" hover={false}>
              <span className="grid h-8 w-8 place-items-center rounded-full text-xs font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>{index + 1}</span>
              <p className="mt-4 text-sm font-black" style={{ color: 'var(--c-text)' }}>{item}</p>
            </PremiumCard>
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {orderTypes.map(([Icon, title, text]) => (
            <PremiumCard key={title} className="p-5">
              <Icon size={21} style={{ color: 'var(--c-accent)' }} />
              <h3 className="mt-4 font-black" style={{ color: 'var(--c-text)' }}>{title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{text}</p>
            </PremiumCard>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow={t.operationsTitle} title={t.operationsTitle}>
        <div className="grid gap-5 xl:grid-cols-2">
          <KitchenPreview lang={lang} />
          <AdminPreview lang={lang} />
        </div>
      </SectionShell>

      <SectionShell>
        <div className="grid gap-5 lg:grid-cols-2">
          <PremiumCard className="p-6 md:p-8" hover={false}>
            <MapPin size={24} style={{ color: 'var(--c-accent)' }} />
            <h3 className="mt-5 text-2xl font-black md:text-3xl" style={{ color: 'var(--c-text)' }}>{t.deliveryTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.deliveryText}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[[Truck, 'RM5 minimum'], [CreditCard, 'Delivery: full payment'], [WalletCards, 'Dine-in: pay now/later'], [ReceiptText, 'Takeaway: pay now/later']].map(([Icon, label]) => <div key={label} className="rounded-xl p-3 text-xs font-black" style={{ background: 'var(--c-input-bg)', color: 'var(--c-text)', border: '1px solid var(--c-border)' }}><Icon size={15} className="mb-2" style={{ color: 'var(--c-accent)' }} />{label}</div>)}
            </div>
          </PremiumCard>
          <PremiumCard className="p-6 md:p-8" hover={false}>
            <PackageCheck size={24} style={{ color: 'var(--c-accent)' }} />
            <h3 className="mt-5 text-2xl font-black md:text-3xl" style={{ color: 'var(--c-text)' }}>{t.costingTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.costingText}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['gram', 'kg', 'pcs', 'pack', 'bottle', 'custom unit', 'set / combo', 'stock tracking'].map(item => <span key={item} className="rounded-full px-3 py-1.5 text-xs font-black" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-text)', border: '1px solid rgba(24,217,138,.22)' }}>{item}</span>)}
            </div>
          </PremiumCard>
        </div>
      </SectionShell>

      <SectionShell eyebrow="Food System Packages" title={t.packageTitle} subtitle={t.packageSub}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {packages.map(([name, features]) => (
            <PremiumCard key={name} glow={name === 'Business'} className="flex flex-col p-5">
              <p className="premium-eyebrow">{name}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{features}</p>
              <PremiumButton to={`/setup?system=food-order&package=${name}`} variant={name === 'Business' ? 'primary' : 'secondary'} className="mt-5 w-full px-4 py-3 text-xs">Choose {name}</PremiumButton>
            </PremiumCard>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
