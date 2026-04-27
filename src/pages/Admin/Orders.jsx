import { ShoppingBag } from 'lucide-react';

const orders = [
  { id: 'BD-1126', customer: 'Aina Rahman', status: 'Baru', total: 'RM25.80' },
  { id: 'BD-1127', customer: 'Farid Amin', status: 'Packing', total: 'RM54.00' },
  { id: 'BD-1128', customer: 'Nadia Saleh', status: 'Siap', total: 'RM18.00' },
];

export default function Orders() {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <div className="flex items-center gap-2 mb-5">
        <ShoppingBag size={18} style={{ color: 'var(--c-accent)' }} />
        <h2 className="font-black" style={{ color: 'var(--c-text)' }}>Order</h2>
      </div>
      <div className="grid gap-3">
        {orders.map(order => (
          <div key={order.id} className="rounded-xl p-4 grid grid-cols-[1fr_auto] gap-3" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
            <div>
              <p className="font-black" style={{ color: 'var(--c-text)' }}>{order.id}</p>
              <p className="text-xs" style={{ color: 'var(--c-muted)' }}>{order.customer} - {order.status}</p>
            </div>
            <p className="font-black" style={{ color: 'var(--c-accent)' }}>{order.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
