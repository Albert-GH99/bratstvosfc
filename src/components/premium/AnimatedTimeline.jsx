import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Hammer, MousePointerClick, PackageCheck, SearchCheck, Send, Settings2 } from 'lucide-react';

const defaultSteps = [
  { title: 'Choose system', text: 'Pick what your customers need: order, booking, payment or request.', icon: MousePointerClick },
  { title: 'Configure package', text: 'Choose package, care plan and domain option.', icon: Settings2 },
  { title: 'Submit setup request', text: 'Send your business details and notes.', icon: Send },
  { title: 'Scope review', text: 'Scope and pricing are confirmed clearly.', icon: SearchCheck },
  { title: 'Build plan ready', text: 'Pages, flow and records are planned.', icon: PackageCheck },
  { title: 'System build starts', text: 'Your website or system begins production.', icon: Hammer },
];

export function FloatingWorkflowOrb({ className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className={`floating-workflow-orb ${className}`.trim()}
      animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.72, 1, 0.72] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export function AutomationFlowVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative hidden min-h-[150px] lg:block">
      <div className="absolute left-8 right-8 top-1/2 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--c-border), var(--c-accent), var(--c-border), transparent)' }} />
      <motion.div
        className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
        style={{ background: 'var(--c-accent)', boxShadow: '0 0 30px rgba(24,217,138,.55)' }}
        animate={reduceMotion ? undefined : { left: ['8%', '88%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute left-[18%] top-7 rounded-2xl px-4 py-3 text-xs font-black" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>
        quote confirmed
      </div>
      <div className="absolute right-[15%] bottom-7 rounded-2xl px-4 py-3 text-xs font-black" style={{ background: 'var(--c-primary-soft)', border: '1px solid rgba(24,217,138,.32)', color: 'var(--c-text)' }}>
        build starts
      </div>
    </div>
  );
}

export default function AnimatedTimeline({ steps = defaultSteps }) {
  return (
    <div className="relative">
      <AutomationFlowVisual />
      <div className="absolute left-6 top-0 bottom-0 w-px lg:hidden" style={{ background: 'linear-gradient(to bottom, var(--c-border), var(--c-accent), var(--c-border))' }} />
      <div className="grid gap-4 lg:grid-cols-6">
        {steps.map((step, index) => {
          const Icon = step.icon || CheckCircle2;
          const final = index === steps.length - 1;

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.34, delay: index * 0.055 }}
              className="relative rounded-2xl p-5 pl-16 lg:pl-5"
              style={{
                background: final ? 'linear-gradient(145deg, var(--c-primary-soft), var(--c-surface))' : 'var(--c-surface)',
                border: final ? '1px solid rgba(24,217,138,.36)' : '1px solid var(--c-border)',
                boxShadow: final ? '0 22px 60px rgba(18,185,120,.14)' : 'var(--c-card-shadow)',
              }}
            >
              <span
                className="absolute left-3 top-5 flex h-10 w-10 items-center justify-center rounded-xl lg:static lg:mb-5"
                style={{ background: final ? 'var(--c-accent)' : 'var(--c-primary-soft)', color: final ? 'var(--c-accent-contrast)' : 'var(--c-accent)' }}
              >
                <Icon size={18} />
              </span>
              <p className="text-[11px] font-black" style={{ color: 'var(--c-muted)' }}>0{index + 1}</p>
              <h3 className="mt-2 text-sm font-black leading-snug" style={{ color: 'var(--c-text)' }}>{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{step.text}</p>
              {final && <FloatingWorkflowOrb className="absolute right-4 top-4" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
