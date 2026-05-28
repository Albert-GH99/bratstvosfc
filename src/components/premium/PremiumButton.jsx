import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

const styles = {
  primary: 'premium-button',
  secondary: 'premium-button secondary',
  ghost: 'premium-button ghost',
};

export default function PremiumButton({ to, href, children, variant = 'primary', className = '', ...props }) {
  const reduceMotion = useReducedMotion();
  const classes = `${styles[variant] || styles.primary} ${className}`.trim();
  const motionProps = reduceMotion ? {} : {
    whileHover: { y: -2 },
    whileTap: { scale: 0.985 },
  };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link to={to} className={classes} {...props}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a {...motionProps} href={href} className={classes} {...props}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps} type="button" className={classes} {...props}>
      {children}
    </motion.button>
  );
}
