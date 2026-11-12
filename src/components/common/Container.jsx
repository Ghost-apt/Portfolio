import React from 'react';

/**
 * Standard page / section container wrapper.
 */
export default function Container({
  children,
  className = '',
  size = '7xl',
  ...props
}) {
  const sizeMap = {
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'w-full',
  };

  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${sizeMap[size] || 'max-w-7xl'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
