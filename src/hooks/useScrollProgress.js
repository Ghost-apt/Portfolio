import { useState, useEffect } from 'react';

/**
 * Custom hook to track window scroll position, scroll percentage,
 * and currently active section.
 *
 * @param {Array<string>} sectionIds - Array of section IDs (e.g. ['home', 'about'])
 * @returns {{ scrollY: number, progress: number, activeSection: string }}
 */
export function useScrollProgress(sectionIds = []) {
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(sectionIds[0] || 'home');
  const sectionsKey = sectionIds.join(',');

  useEffect(() => {
    const ids = sectionsKey ? sectionsKey.split(',') : [];
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Compute total scroll percentage
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, currentProgress)));

      // Active section detection
      if (ids.length > 0) {
        if (currentScrollY < 150) {
          setActiveSection(ids[0] || 'home');
          return;
        }
        const offsetPosition = currentScrollY + 200;
        for (let i = ids.length - 1; i >= 0; i--) {
          const el = document.getElementById(ids[i]);
          if (el && el.offsetTop <= offsetPosition) {
            setActiveSection(ids[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionsKey]);

  return { scrollY, progress, activeSection };
}

export default useScrollProgress;
