import { useState, useEffect } from 'react';

/**
 * Custom hook to safely detect WebGL / WebGL2 capability in the browser.
 *
 * @returns {boolean} Whether WebGL is supported and available
 */
export function useWebGLSupport() {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      setIsSupported(Boolean(gl));
    } catch (e) {
      setIsSupported(false);
    }
  }, []);

  return isSupported;
}

export default useWebGLSupport;
