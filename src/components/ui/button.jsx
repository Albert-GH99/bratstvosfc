import { motion } from 'framer-motion';

const variants = {
  primary: 'premium-button',
  secondary: 'premium-button secondary',
  ghost: 'premium-button ghost',
};

export function Button({ children, className = '', variant = 'primary', asChild = false, ...props }) {
  const Comp = asChild ? motion.span : motion.button;
  const variantClass = variants[variant] || variants.primary;

  return (
    <Comp
      whileTap={{ scale: 0.98 }}
      {...props}
      className={`${variantClass} ${className}`.trim()}
    >
      {children}
    </Comp>
  );
}
