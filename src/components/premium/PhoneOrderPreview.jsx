import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, CreditCard, MessageCircle, ShoppingBag } from 'lucide-react';

export default function PhoneOrderPreview({ className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.46 }}
      animate={reduceMotion ? {} : { y: [0, -7, 0] }}
      className={`relative mx-auto w-full max-w-[330px] ${className}`.trim()}
    >
      <div
        className="relative overflow-hidden rounded-[34px] p-3"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.16), rgba(255,255,255,0.035))',
          border: '1px solid var(--c-border)',
          boxShadow: 'var(--c-shadow)',
        }}
      >
        <div className="min-h-[520px] overflow-hidden rounded-[27px]" style={{ background: 'var(--c-bg-soft)', border: '1px solid var(--c-border)' }}>
          <div className="mx-auto mt-3 h-1.5 w-20 rounded-full" style={{ background: 'var(--c-border)' }} />
          <div className="p-4">
            <div className="mb-4 rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>Checkout</p>
                  <p className="text-[11px]" style={{ color: 'var(--c-muted)' }}>Customers can order on their own</p>
                </div>
                <ShoppingBag size={18} style={{ color: 'var(--c-accent)' }} />
              </div>
            </div>

            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.32, delay: 0.08 }}
                className="ml-auto max-w-[86%] rounded-2xl rounded-tr-md p-3 text-xs leading-relaxed"
                style={{ background: '#22c55e', color: '#04100b', boxShadow: '0 14px 34px rgba(34,197,94,.22)' }}
              >
                Hi, I want the sage premium set. Is it in stock?
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.32, delay: 0.2 }}
                className="max-w-[88%] rounded-2xl rounded-tl-md p-3 text-xs leading-relaxed"
                style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}
              >
                Yes. Customers fill in the details on the website, and the order status appears in the dashboard.
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.36, delay: 0.34 }}
              className="mt-5 overflow-hidden rounded-2xl"
              style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}
            >
              <div className="relative h-24" style={{ background: 'linear-gradient(135deg, rgba(24,217,138,.30), rgba(126,246,193,.12), rgba(255,255,255,.08))' }}>
                <div className="grid h-full place-items-center p-3">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: 'rgba(255,255,255,.18)', color: 'var(--c-text)' }}>
                    <ShoppingBag size={23} />
                  </div>
                  <div className="absolute right-4 top-4 rounded-full px-2 py-1 text-[10px] font-black" style={{ background: 'rgba(0,0,0,.25)', color: '#fff' }}>
                    In stock
                  </div>
                  <div className="absolute bottom-3 left-4 rounded-full px-2 py-1 text-[10px] font-black" style={{ background: 'rgba(255,255,255,.18)', color: 'var(--c-text)' }}>
                    Product preview
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>Premium Set</p>
                    <p className="text-[11px]" style={{ color: 'var(--c-muted)' }}>2 item - pickup / delivery</p>
                  </div>
                  <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>RM240</p>
                </div>
                <div className="grid gap-2">
                  {[
                    ['Name', 'Nadia Rahman'],
                    ['Status', 'Payment pending'],
                    ['Method', 'FPX / transfer'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-xl px-3 py-2" style={{ background: 'var(--c-input-bg)' }}>
                      <span className="text-[11px]" style={{ color: 'var(--c-muted)' }}>{label}</span>
                      <span className="text-[11px] font-black" style={{ color: 'var(--c-text)' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
                <CreditCard size={15} style={{ color: 'var(--c-accent)' }} />
                <p className="mt-2 text-[11px] font-black" style={{ color: 'var(--c-text)' }}>Clear payment</p>
              </div>
              <div className="rounded-2xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--c-accent)' }} />
                <p className="mt-2 text-[11px] font-black" style={{ color: 'var(--c-text)' }}>Order saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-3 bottom-24 hidden rounded-2xl px-3 py-2 text-[11px] font-black md:flex md:items-center md:gap-2" style={{ background: 'var(--c-surface-solid)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>
        <MessageCircle size={13} style={{ color: 'var(--c-accent)' }} />
        WhatsApp becomes more organised
      </div>
    </motion.div>
  );
}
