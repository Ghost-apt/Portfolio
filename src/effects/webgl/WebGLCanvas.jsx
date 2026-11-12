import React, { forwardRef } from 'react';

/**
 * Reusable full-viewport WebGL canvas element.
 */
export const WebGLCanvas = forwardRef(function WebGLCanvas(
  { className = '', style = {}, ariaHidden = true, ...props },
  ref
) {
  return (
    <canvas
      ref={ref}
      aria-hidden={ariaHidden}
      className={`block w-full h-full pointer-events-none select-none ${className}`}
      style={{ touchAction: 'none', ...style }}
      {...props}
    />
  );
});

export default WebGLCanvas;
