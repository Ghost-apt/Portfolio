import { useState, useEffect } from 'react';

/**
 * Custom hook for matching media queries reactively.
 *
 * @param {string} query - CSS media query (e.g. '(min-width: 768px)')
 * @returns {boolean} Whether the media query currently matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);

    mediaQueryList.addEventListener('change', listener);
    setMatches(mediaQueryList.matches);

    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export default useMediaQuery;
