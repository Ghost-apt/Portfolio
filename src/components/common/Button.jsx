import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Button component supporting variants and link/button semantics.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none select-none';

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-xs gap-1.5',
    md: 'px-6 py-2.5 text-xs sm:text-sm gap-2',
    lg: 'px-7 py-3.5 text-sm sm:text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]',
    outline:
      'text-white bg-black/40 border border-white/25 hover:border-white hover:bg-white hover:text-black shadow-[0_0_20px_rgba(255,255,255,0.06)] backdrop-blur-md',
    glass:
      'text-neutral-300 hover:text-white bg-white/[0.04] border border-white/15 hover:border-white/50 hover:bg-white/[0.08] backdrop-blur-md',
    ghost:
      'text-neutral-400 hover:text-white bg-transparent hover:bg-white/[0.05]',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={combinedClasses}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={combinedClasses}
      {...props}
    >
      {content}
    </motion.button>
  );
}
