import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Eye,
  LayoutDashboard,
  Package,
  Plus,
  Save,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import { businessSystems, getDemoItems } from '../data/systems';

const starterProducts = getDemoItems(businessSystems[0].id).map((item, index) => ({
  id: index + 1,
  name: item.name,
  price: item.price,
  stock: item.stock,
  status: index === 2 ? 'draft' : 'active',
}));

const starterOrders = [
  { id: 'BD-FOO-1126', customer: 'Aina Rahman', total: 25.8, payment: 'Paid - QR DuitNow', status: 'Baru', time: '10:42 AM' },
  { id: 'BD-FOO-1127', customer: 'Farid Amin', total: 54, payment: 'Pending receipt', status: 'Packing', time: '11:08 AM' },
  { id: 'BD-FOO-1128', customer: 'Nadia Saleh', total: 18, payment: 'Cash pickup', status: 'Siap', time: '11:31 AM' },
];

function formatMoney(value) {
  return `RM${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function Admin() {
  const [tab, setTab] = useState('overview');
  const [products, setProducts] = useState(starterProducts);
  const [orders] = useState(starterOrders);
  const [draft, setDraft] = useState({ name: '', price: '', stock: '' });

  const stats = useMemo(() => {
    const activeProducts = products.filter(item => item.status === 'active').length;
    const totalStock = products.reduce((sum, item) => sum + Number(item.stock || 0), 0);
    const sales = orders.reduce((sum, order) => sum + order.total, 0);
    return [
      ['Produk aktif', activeProducts, Package],
      ['Order hari ini', orders.length, ShoppingBag],
      ['Jumlah stok', totalStock, ClipboardList],
      ['Jualan demo', formatMoney(sales), CreditCard],
    ];
  }, [orders, products]);

  const addProduct = () => {
    if (!draft.name || !draft.price) return;
    setProducts(prev => [
      {
        id: Date.now(),
        name: draft.name,
        price: Number(draft.price),
        stock: Number(draft.stock || 0),
        status: 'active',
      },
      ...prev,
    ]);
    setDraft({ name: '', price: '', stock: '' });
  };

  const removeProduct = id => {
    setProducts(prev => prev.filter(item => item.id !== id));
  };

  const toggleProduct = id => {
    setProducts(prev => prev.map(item => item.id === id ? { ...item, status: item.status === 'active' ? 'draft' : 'active' } : item));
  };

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>Admin preview</p>
              <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: 'var(--c-text)' }}>Produk, order dan bayaran dalam satu dashboard.</h1>
              <p className="text-sm md:text-base max-w-3xl leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                Ini preview admin yang akan disambung ke Supabase. Dalam live mode, produk dan order datang dari database, bukan data contoh.
              </p>
            </div>
            <span className="rounded-full px-4 py-2 text-xs font-black" style={{ background: 'rgba(32,200,117,0.12)', color: 'var(--c-accent)', border: '1px solid rgba(32,200,117,0.24)' }}>
              Supabase-ready
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map(([label, value, Icon]) => (
              <div key={label} className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <Icon size={19} className="mb-4" style={{ color: 'var(--c-accent)' }} />
                <p className="text-xs font-bold mb-2" style={{ color: 'var(--c-muted)' }}>{label}</p>
                <p className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>{value}</p>
              </div>
            ))}
          </div>

          <div className="flex rounded-xl p-1 mb-8 max-w-xl" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            {[
              ['overview', 'Overview'],
              ['products', 'Produk'],
              ['orders', 'Order'],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="flex-1 rounded-lg px-4 py-2.5 text-sm font-black"
                style={{ background: tab === id ? 'var(--c-accent)' : 'transparent', color: tab === id ? 'var(--c-accent-contrast)' : 'var(--c-muted)' }}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <div className="flex items-center gap-2 mb-5">
                  <LayoutDashboard size={19} style={{ color: 'var(--c-accent)' }} />
                  <h2 className="font-black" style={{ color: 'var(--c-text)' }}>Bagaimana ia berfungsi live</h2>
                </div>
                <div className="space-y-3">
                  {[
                    'Customer submit order dari demo/customer page.',
                    'Order disimpan ke table orders dalam Supabase.',
                    'Owner nampak status order dan status payment.',
                    'Jika gateway disambung, payment boleh auto update kepada paid.',
                  ].map(item => (
                    <div key={item} className="flex gap-2 text-sm" style={{ color: 'var(--c-muted)' }}>
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--c-accent)' }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <h2 className="font-black mb-5" style={{ color: 'var(--c-text)' }}>Action pantas</h2>
                <div className="grid gap-3">
                  <button onClick={() => setTab('products')} className="rounded-xl p-4 text-left" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                    <p className="font-black mb-1" style={{ color: 'var(--c-text)' }}>Urus produk</p>
                    <p className="text-sm" style={{ color: 'var(--c-muted)' }}>Tambah produk, ubah stok dan publish/draft.</p>
                  </button>
                  <button onClick={() => setTab('orders')} className="rounded-xl p-4 text-left" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                    <p className="font-black mb-1" style={{ color: 'var(--c-text)' }}>Semak order</p>
                    <p className="text-sm" style={{ color: 'var(--c-muted)' }}>Pantau order baru, packing dan payment.</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === 'products' && (
            <div className="grid lg:grid-cols-[380px_1fr] gap-5">
              <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <h2 className="font-black mb-4" style={{ color: 'var(--c-text)' }}>Tambah produk demo</h2>
                <div className="space-y-3">
                  {[
                    ['name', 'Nama produk'],
                    ['price', 'Harga RM'],
                    ['stock', 'Stok'],
                  ].map(([key, label]) => (
                    <input
                      key={key}
                      value={draft[key]}
                      onChange={event => setDraft(prev => ({ ...prev, [key]: event.target.value }))}
                      placeholder={label}
                      type={key === 'name' ? 'text' : 'number'}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                      style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}
                    />
                  ))}
                  <button onClick={addProduct} className="w-full rounded-xl py-3 text-sm font-black flex items-center justify-center gap-2" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                    <Plus size={16} /> Tambah produk
                  </button>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                {products.map(product => (
                  <div key={product.id} className="p-4 flex items-center justify-between gap-4" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
                    <div>
                      <p className="font-black" style={{ color: 'var(--c-text)' }}>{product.name}</p>
                      <p className="text-xs" style={{ color: 'var(--c-muted)' }}>{formatMoney(product.price)} - stok {product.stock} - {product.status}</p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => toggleProduct(product.id)} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ color: product.status === 'active' ? 'var(--c-accent)' : 'var(--c-muted)', border: '1px solid var(--c-border)' }}>
                        <Eye size={15} />
                      </button>
                      <button onClick={() => removeProduct(product.id)} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ color: '#EF4444', border: '1px solid var(--c-border)' }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              {orders.map(order => (
                <div key={order.id} className="p-5 grid md:grid-cols-[1fr_1fr_1fr_auto] gap-4 md:items-center" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
                  <div>
                    <p className="font-black" style={{ color: 'var(--c-text)' }}>{order.id}</p>
                    <p className="text-xs" style={{ color: 'var(--c-muted)' }}>{order.customer} - {order.time}</p>
                  </div>
                  <p className="text-sm font-black" style={{ color: 'var(--c-accent)' }}>{formatMoney(order.total)}</p>
                  <p className="text-sm" style={{ color: 'var(--c-muted)' }}>{order.payment}</p>
                  <span className="rounded-full px-3 py-1 text-xs font-black text-center" style={{ background: 'rgba(32,200,117,0.12)', color: 'var(--c-accent)' }}>{order.status}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div>
              <p className="font-black mb-1" style={{ color: 'var(--c-text)' }}>Untuk jadikan betul-betul live</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>Sambungkan form customer kepada `orders`, admin produk kepada `products`, dan payment gateway kepada status payment. Schema Supabase asas sudah ada dalam projek.</p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
              <Save size={16} /> Demo saved locally
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
