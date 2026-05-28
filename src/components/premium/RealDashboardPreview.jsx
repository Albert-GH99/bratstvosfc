import { motion, useReducedMotion } from 'framer-motion';
import { BarChart3, CheckCircle2, CreditCard, MessageCircle, PackageCheck, Search, ShoppingBag, Users } from 'lucide-react';

const orders = [
  { id: '#1048', name: 'Nadia Rahman', item: 'Kurung Linen', amount: 'RM189', status: 'Paid' },
  { id: '#1049', name: 'Daniel Lim', item: 'Gift Box Raya', amount: 'RM86', status: 'Pending' },
  { id: '#1050', name: 'Mira K.', item: 'Premium Set', amount: 'RM240', status: 'Paid' },
];

const metrics = [
  { label: 'Orders today', value: '38', icon: ShoppingBag },
  { label: 'Payments collected', value: 'RM4.8k', icon: CreditCard },
  { label: 'New customers', value: '12', icon: Users },
];

function StatusPill({ status }) {
  const paid = status === 'Paid';
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[11px] font-black"
      style={{
        color: paid ? 'var(--c-accent-contrast)' : 'var(--c-text)',
        background: paid ? 'linear-gradient(135deg, var(--c-primary), var(--c-primary-2))' : 'var(--c-input-bg)',
        border: paid ? '0' : '1px solid var(--c-border)',
      }}
    >
      {paid ? 'Paid' : 'Pending'}
    </span>
  );
}

function MiniChart() {
  const bars = [46, 68, 55, 82, 64, 92, 76];
  return (
    <div className="relative h-32 overflow-hidden rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-black" style={{ color: 'var(--c-text)' }}>This week's sales</p>
          <p className="text-[11px]" style={{ color: 'var(--c-muted)' }}>Orders are becoming steadier</p>
        </div>
        <BarChart3 size={16} style={{ color: 'var(--c-accent)' }} />
      </div>
      <div className="flex h-16 items-end gap-2">
        {bars.map((height, index) => (
          <motion.span
            key={height}
            initial={{ height: 8 }}
            whileInView={{ height }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            className="flex-1 rounded-t-lg"
            style={{ background: index === 5 ? 'linear-gradient(180deg, var(--c-primary-2), var(--c-primary))' : 'rgba(255,255,255,0.18)' }}
          />
        ))}
      </div>
    </div>
  );
}

export default function RealDashboardPreview({ className = '', compact = false }) {
  const reduceMotion = useReducedMotion();
  const floatAnimation = reduceMotion ? {} : { y: [0, -8, 0] };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative ${className}`.trim()}
    >
      <motion.div
        animate={floatAnimation}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative overflow-hidden rounded-[30px] p-3"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))',
          border: '1px solid var(--c-border)',
          boxShadow: 'var(--c-shadow)',
          backdropFilter: 'blur(22px)',
        }}
      >
        <div className="overflow-hidden rounded-[24px]" style={{ background: 'var(--c-bg-soft)', border: '1px solid var(--c-border)' }}>
          <div className="flex items-center justify-between gap-3 px-4 py-3" style={{ background: 'var(--c-surface)', borderBottom: '1px solid var(--c-border)' }}>
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff6b6b]" />
              <span className="h-3 w-3 rounded-full bg-[#ffd166]" />
              <span className="h-3 w-3 rounded-full bg-[#18d98a]" />
            </div>
            <div className="hidden min-w-0 flex-1 items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold sm:flex" style={{ background: 'var(--c-input-bg)', color: 'var(--c-muted)' }}>
              <Search size={12} />
              bisnesanda.bratstvosfc.com
            </div>
            <span className="rounded-full px-3 py-1 text-[11px] font-black" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)' }}>Live</span>
          </div>

          <div className={`grid gap-4 p-4 ${compact ? '' : 'md:grid-cols-[0.72fr_1.28fr]'}`}>
            <aside className="hidden rounded-2xl p-4 md:block" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: 'linear-gradient(135deg, var(--c-primary), var(--c-primary-2))', color: 'var(--c-accent-contrast)' }}>
                  BD
                </span>
                <div>
                  <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>Bisnes Anda</p>
                  <p className="text-[11px]" style={{ color: 'var(--c-muted)' }}>Owner dashboard</p>
                </div>
              </div>
              {['Orders', 'Products', 'Customers', 'Payments'].map((item, index) => (
                <div
                  key={item}
                  className="mb-2 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold"
                  style={{
                    color: index === 0 ? 'var(--c-text)' : 'var(--c-muted)',
                    background: index === 0 ? 'var(--c-primary-soft)' : 'transparent',
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: index === 0 ? 'var(--c-accent)' : 'var(--c-border)' }} />
                  {item}
                </div>
              ))}
            </aside>

            <main className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {metrics.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                    <Icon size={17} style={{ color: 'var(--c-accent)' }} />
                    <p className="mt-3 text-xl font-black" style={{ color: 'var(--c-text)' }}>{value}</p>
                    <p className="mt-1 text-[11px]" style={{ color: 'var(--c-muted)' }}>{label}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>Incoming orders</p>
                      <p className="text-[11px]" style={{ color: 'var(--c-muted)' }}>Every order is easier to review</p>
                    </div>
                    <PackageCheck size={17} style={{ color: 'var(--c-accent)' }} />
                  </div>
                  <div className="space-y-2">
                    {orders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: 14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.06 }}
                        className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl p-3"
                        style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-xl text-xs font-black" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)' }}>
                          {order.name.split(' ').map(part => part[0]).join('').slice(0, 2)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-black" style={{ color: 'var(--c-text)' }}>{order.item}</p>
                          <p className="truncate text-[11px]" style={{ color: 'var(--c-muted)' }}>{order.id} - {order.name} - {order.amount}</p>
                        </div>
                        <StatusPill status={order.status} />
                      </motion.div>
                    ))}
                  </div>
                </div>
                <MiniChart />
              </div>
            </main>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -18, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.28 }}
        className="absolute -left-2 top-12 hidden max-w-[220px] rounded-2xl p-3 text-xs shadow-2xl md:block"
        style={{ background: 'var(--c-surface-solid)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}
      >
        <div className="mb-2 flex items-center gap-2 font-black">
          <MessageCircle size={14} style={{ color: 'var(--c-accent)' }} />
          WhatsApp order
        </div>
        "Hi, I want 2 sets. Is COD available?"
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.42, delay: 0.45 }}
        className="absolute -bottom-3 right-4 hidden rounded-2xl p-3 text-xs font-black md:flex md:items-center md:gap-2"
        style={{ background: 'linear-gradient(135deg, var(--c-primary), var(--c-primary-2))', color: 'var(--c-accent-contrast)', boxShadow: '0 18px 50px rgba(18,185,120,0.28)' }}
      >
        <CheckCircle2 size={15} />
        Order saved as a record
      </motion.div>
    </motion.div>
  );
}
