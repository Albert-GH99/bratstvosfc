import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, CreditCard, MessageCircle, ReceiptText, UserRound } from 'lucide-react';

export default function WhatsAppToSystemVisual({ className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative overflow-hidden rounded-[30px] p-5 md:p-8 ${className}`.trim()} style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', boxShadow: 'var(--c-card-shadow)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 48% 12%, rgba(24,217,138,.18), transparent 34%)' }} />
      <div className="relative grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.42 }}
          className="rounded-[24px] p-4"
          style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: '#22c55e', color: '#04100b' }}>
              <MessageCircle size={20} />
            </span>
            <div>
              <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>Current WhatsApp orders</p>
              <p className="text-[11px]" style={{ color: 'var(--c-muted)' }}>Order chats mix with normal questions</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              'Hi, is size M available?',
              'I want 2 sets. Can I pay by bank transfer?',
              'My address is near Setia Alam.',
            ].map((message, index) => (
              <motion.div
                key={message}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.28, delay: index * 0.08 }}
                className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed ${index === 1 ? 'ml-auto rounded-tr-sm' : 'rounded-tl-sm'}`}
                style={{ background: index === 1 ? '#22c55e' : 'var(--c-surface)', color: index === 1 ? '#04100b' : 'var(--c-text)', border: index === 1 ? '0' : '1px solid var(--c-border)' }}
              >
                {message}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mx-auto flex items-center justify-center">
          <motion.div
            animate={reduceMotion ? {} : { x: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="grid h-16 w-16 place-items-center rounded-full"
            style={{ background: 'linear-gradient(135deg, var(--c-primary), var(--c-primary-2))', color: 'var(--c-accent-contrast)', boxShadow: '0 20px 60px rgba(18,185,120,.26)' }}
          >
            <ArrowRight size={25} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.42, delay: 0.08 }}
          className="rounded-[24px] p-4"
          style={{ background: 'var(--c-surface-solid)', border: '1px solid var(--c-border)', boxShadow: 'var(--c-card-shadow)' }}
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>Order inside the system</p>
              <p className="text-[11px]" style={{ color: 'var(--c-muted)' }}>Customer details, payment and status are clear</p>
            </div>
            <span className="rounded-full px-3 py-1 text-[11px] font-black" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)' }}>Ready</span>
          </div>

          <div className="space-y-3">
            {[
              [UserRound, 'Customer', 'Nadia Rahman'],
              [ReceiptText, 'Order', '2 x Premium Set'],
              [CreditCard, 'Payment', 'Receipt pending'],
            ].map(([Icon, label, value]) => (
              <div key={label} className="flex items-center justify-between gap-3 rounded-2xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
                <div className="flex items-center gap-3">
                  <Icon size={16} style={{ color: 'var(--c-accent)' }} />
                  <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{label}</span>
                </div>
                <span className="text-xs font-black" style={{ color: 'var(--c-text)' }}>{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-2xl p-3" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-text)', border: '1px solid rgba(24,217,138,.24)' }}>
            <CheckCircle2 size={16} style={{ color: 'var(--c-accent)' }} />
            <span className="text-xs font-black">Owners can follow up without searching old chats.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
