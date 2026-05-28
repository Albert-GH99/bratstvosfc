import { motion, useReducedMotion } from 'framer-motion';

export default function PremiumCard({ children, className = '', glow = false, hover = true, as: Tag = motion.div, ...props }) {
  const reduceMotion = useReducedMotion();
  const motionProps = hover && !reduceMotion ? {
    whileHover: { y: -6, scale: 1.01 },
    transition: { duration: 0.22 },
  } : {};

  return (
    <Tag
      {...motionProps}
      className={`premium-card ${glow ? 'premium-card-glow' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
}
