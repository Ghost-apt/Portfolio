import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';

const THEME_STORAGE_KEY = 'anurag-portfolio-theme';
const DEFAULT_THEME = 'dark';

export const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
});

/**
 * Helper to get the initial theme synchronously before first paint.
 */
function getInitialTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch (e) {
    // LocalStorage restricted or disabled
  }
  return DEFAULT_THEME;
}

/**
 * Apply theme attributes to document element.
 */
function applyThemeToDOM(theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  // Root data attribute & class list for Tailwind darkMode: 'class'
  root.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }

  // Native color-scheme synchronization
  root.style.colorScheme = theme;

  // Browser chrome theme-color meta tag
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#000000' : '#FFFFFF');
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  // Synchronize DOM on initial render and whenever theme changes
  useLayoutEffect(() => {
    applyThemeToDOM(theme);
    try {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      }
    } catch (e) {}
  }, [theme]);

  const setTheme = (newTheme) => {
    if (newTheme !== 'dark' && newTheme !== 'light') return;
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {}
    applyThemeToDOM(newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const value = {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
