import { motion, useReducedMotion } from 'framer-motion';
import {
  BadgePercent,
  CheckCircle2,
  CircleDollarSign,
  Globe2,
  HelpCircle,
  ClipboardList,
  MessageCircle,
  MonitorCheck,
  ServerCog,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

function VisualShell({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] p-4 ${className}`.trim()} style={{ background: 'linear-gradient(145deg, var(--c-bg-soft), var(--c-surface-strong))', border: '1px solid var(--c-border)', boxShadow: 'var(--c-card-shadow)' }}>
      <div className="absolute inset-0 premium-background-grid opacity-45" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function MiniBarChart({ values = [38, 76, 54, 92] }) {
  return (
    <div className="flex h-24 items-end gap-2">
      {values.map((height, index) => (
        <motion.span
          key={`${height}-${index}`}
          initial={{ height: 0 }}
          whileInView={{ height: `${height}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
          className="flex-1 rounded-t-lg"
          style={{ background: index === values.length - 1 ? 'var(--c-accent)' : 'var(--c-border)' }}
        />
      ))}
    </div>
  );
}

export function WhatsAppTransformVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <VisualShell className="my-8 lg:my-0">
      <div className="grid gap-4 md:grid-cols-[0.92fr_auto_1fr] md:items-center">
        <div className="rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
          <div className="mb-4 flex items-center gap-2">
            <MessageCircle size={17} style={{ color: 'var(--c-muted)' }} />
            <p className="text-xs font-black" style={{ color: 'var(--c-text)' }}>WhatsApp inbox</p>
          </div>
          {['Boss, saya nak order', 'Dah bayar?', 'Alamat mana ya?'].map((item, index) => (
            <motion.div
              key={item}
              animate={reduceMotion ? undefined : { x: [0, index % 2 ? 5 : -5, 0] }}
              transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-2 rounded-2xl px-3 py-2 text-xs"
              style={{ background: index === 0 ? 'var(--c-surface)' : 'var(--c-bg)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}
            >
              {item}
            </motion.div>
          ))}
        </div>

        <div className="relative hidden h-20 w-24 md:block">
          <div className="absolute left-0 right-0 top-1/2 h-px" style={{ background: 'linear-gradient(90deg, var(--c-border), var(--c-accent), var(--c-border))' }} />
          <motion.span
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
            style={{ background: 'var(--c-accent)', boxShadow: '0 0 26px rgba(24,217,138,.65)' }}
            animate={reduceMotion ? undefined : { left: ['0%', '92%'] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid rgba(24,217,138,.28)' }}>
          <div className="mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MonitorCheck size={17} style={{ color: 'var(--c-accent)' }} />
              <p className="text-xs font-black" style={{ color: 'var(--c-text)' }}>Business dashboard</p>
            </span>
            <span className="rounded-full px-2.5 py-1 text-[10px] font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>READY</span>
          </div>
          {['Order record', 'Payment status', 'Customer profile'].map((item, index) => (
            <div key={item} className="mb-2 flex items-center justify-between rounded-xl px-3 py-2" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
              <span className="text-xs font-bold" style={{ color: 'var(--c-text)' }}>{item}</span>
              <CheckCircle2 size={14} style={{ color: index === 1 ? 'var(--c-accent)' : 'var(--c-muted)' }} />
            </div>
          ))}
        </div>
      </div>
    </VisualShell>
  );
}

export function PricingHeroVisual() {
  return (
    <VisualShell>
      <div className="grid gap-4 md:grid-cols-[0.85fr_1fr] md:items-center">
        <div>
          <p className="premium-eyebrow mb-3">Bundle saver</p>
          <h3 className="text-3xl font-black leading-tight" style={{ color: 'var(--c-text)' }}>Combine systems and save more when your business needs more than one flow.</h3>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>Choose order, booking, food order or delivery systems together and see an instant estimated total.</p>
        </div>
        <div className="rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
          <MiniBarChart values={[36, 58, 74, 92]} />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {['1 system', '2 = -25%', '3 = -50%'].map((item, index) => (
              <span key={item} className="rounded-full px-3 py-1 text-center text-[10px] font-black" style={{ background: index === 2 ? 'var(--c-accent)' : 'var(--c-surface)', color: index === 2 ? 'var(--c-accent-contrast)' : 'var(--c-muted)', border: '1px solid var(--c-border)' }}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </VisualShell>
  );
}

export function BundlePricingVisual() {
  return (
    <VisualShell>
      <div className="grid gap-4 md:grid-cols-[1fr_0.8fr] md:items-center">
        <div className="space-y-3">
          {['Ecommerce System', 'Booking System', 'Food Order System'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              className="flex items-center justify-between rounded-2xl px-4 py-3"
              style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}
            >
              <span className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{item}</span>
              <CheckCircle2 size={16} style={{ color: 'var(--c-accent)' }} />
            </motion.div>
          ))}
        </div>
        <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--c-primary-soft)', border: '1px solid rgba(24,217,138,.28)' }}>
          <BadgePercent size={24} className="mx-auto" style={{ color: 'var(--c-accent)' }} />
          <p className="mt-4 text-4xl font-black" style={{ color: 'var(--c-text)' }}>50%</p>
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--c-muted)' }}>max bundle saver</p>
        </div>
      </div>
    </VisualShell>
  );
}

export function CarePlanVisual() {
  return (
    <VisualShell>
      <div className="grid gap-4 md:grid-cols-[0.8fr_1fr] md:items-center">
        <div className="rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
          <ServerCog size={21} style={{ color: 'var(--c-accent)' }} />
          <p className="mt-4 text-sm font-black" style={{ color: 'var(--c-text)' }}>Website care monitor</p>
          <div className="mt-4 space-y-2">
            {['Hosting', 'Maintenance', 'Small updates'].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-xl px-3 py-2" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <span className="text-xs font-bold" style={{ color: 'var(--c-text)' }}>{item}</span>
                <span className="text-[10px] font-black" style={{ color: index === 0 ? 'var(--c-accent)' : 'var(--c-muted)' }}>{index === 0 ? 'online' : 'ready'}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <MiniBarChart values={[74, 82, 88, 96]} />
          <p className="mt-4 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>Care plans keep your website or system updated, maintained and supported after launch.</p>
        </div>
      </div>
    </VisualShell>
  );
}

export function CompareMatrixVisual() {
  const rows = [
    ['Starter', 'Simple page', 'Start small'],
    ['Growth', 'Customer records', 'Simple dashboard'],
    ['Business', 'Order + payment', 'Recommended'],
    ['Pro', 'Team access', 'Growth ready'],
    ['Elite', 'Custom build', 'Premium build'],
  ];

  return (
    <VisualShell>
      <div className="space-y-2">
        {rows.map(([plan, feature, note], index) => (
          <motion.div
            key={plan}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.24, delay: index * 0.04 }}
            className="grid grid-cols-[82px_1fr_auto] items-center gap-3 rounded-2xl px-3 py-3"
            style={{ background: plan === 'Business' ? 'var(--c-primary-soft)' : 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}
          >
            <span className="text-xs font-black" style={{ color: plan === 'Business' ? 'var(--c-accent)' : 'var(--c-text)' }}>{plan}</span>
            <span className="truncate text-xs" style={{ color: 'var(--c-muted)' }}>{feature}</span>
            <span className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-black" style={{ background: 'var(--c-surface)', color: plan === 'Business' ? 'var(--c-accent)' : 'var(--c-muted)', border: '1px solid var(--c-border)' }}>
              <CheckCircle2 size={11} />
              {note}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Sparkles size={16} style={{ color: 'var(--c-accent)' }} />
        <p className="text-xs font-black" style={{ color: 'var(--c-text)' }}>Package fit preview</p>
      </div>
    </VisualShell>
  );
}

export function FaqSignalVisual() {
  return (
    <VisualShell>
      <div className="space-y-3">
        {[
          [HelpCircle, 'Which package fits?', 'Start with setup request'],
          [Globe2, 'Need custom domain?', 'From RM125/year'],
          [ClipboardList, 'After request?', 'Clear suggestion and price'],
        ].map(([Icon, title, text], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: index * 0.06 }}
            className="flex items-center gap-3 rounded-2xl p-3"
            style={{ background: index === 2 ? 'var(--c-primary-soft)' : 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'var(--c-surface)', color: 'var(--c-accent)', border: '1px solid var(--c-border)' }}>
              <Icon size={17} />
            </span>
            <span>
              <span className="block text-sm font-black" style={{ color: 'var(--c-text)' }}>{title}</span>
              <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{text}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </VisualShell>
  );
}

export function CtaLaunchVisual() {
  return (
    <VisualShell>
      <div className="grid gap-4 sm:grid-cols-[0.72fr_1fr] sm:items-center">
        <div className="rounded-2xl p-4" style={{ background: 'var(--c-primary-soft)', border: '1px solid rgba(24,217,138,.28)' }}>
          <TrendingUp size={24} style={{ color: 'var(--c-accent)' }} />
          <p className="mt-4 text-3xl font-black" style={{ color: 'var(--c-text)' }}>Ready</p>
          <p className="text-xs" style={{ color: 'var(--c-muted)' }}>to discuss your setup</p>
        </div>
        <div className="space-y-2">
          {['Tell us your business', 'Get a clear suggestion', 'Build starts'].map((item, index) => (
            <div key={item} className="rounded-xl px-3 py-2" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
              <p className="text-xs font-black" style={{ color: 'var(--c-text)' }}>{item}</p>
              <p className="text-[10px]" style={{ color: index === 1 ? 'var(--c-accent)' : 'var(--c-muted)' }}>{index === 1 ? 'next' : 'included'}</p>
            </div>
          ))}
        </div>
      </div>
    </VisualShell>
  );
}
