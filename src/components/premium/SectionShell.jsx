import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function SectionShell({
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
  innerClassName = '',
  center = false,
  id,
}) {
  return (
    <section id={id} className={`relative px-5 py-16 md:px-6 md:py-24 ${className}`.trim()}>
      <div className={`mx-auto max-w-7xl ${innerClassName}`.trim()}>
        {(eyebrow || title || subtitle) && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            transition={{ duration: 0.42 }}
            className={`${center ? 'mx-auto text-center' : ''} mb-10 max-w-4xl`}
          >
            {eyebrow && <p className="premium-eyebrow mb-3">{eyebrow}</p>}
            {title && <h2 className="premium-section-title">{title}</h2>}
            {subtitle && <p className="mt-5 text-sm leading-relaxed md:text-lg" style={{ color: 'var(--c-muted)' }}>{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
