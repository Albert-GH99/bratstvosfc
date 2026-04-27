import { Package, Plus } from 'lucide-react';
import { businessSystems, getDemoItems } from '../../data/systems';

export default function Products() {
  const products = getDemoItems(businessSystems[0].id);

  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2">
          <Package size={18} style={{ color: 'var(--c-accent)' }} />
          <h2 className="font-black" style={{ color: 'var(--c-text)' }}>Produk</h2>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
          <Plus size={15} /> Tambah
        </button>
      </div>
      <div className="grid gap-3">
        {products.map(product => (
          <div key={product.name} className="rounded-xl p-4 flex items-center justify-between gap-4" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
            <div>
              <p className="font-black" style={{ color: 'var(--c-text)' }}>{product.name}</p>
              <p className="text-xs" style={{ color: 'var(--c-muted)' }}>Stok {product.stock}</p>
            </div>
            <p className="font-black" style={{ color: 'var(--c-accent)' }}>RM{product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
