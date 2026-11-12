import React, { useState } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';
import { heroNavLinks } from '../../data/navigation';
import { personalInfo } from '../../data/personalInfo';
import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * Navbar - Floating minimal navigation header with theme toggle.
 * Layout:
 * - LEFT: ANURAG SINGH / FULL STACK × AI/ML
 * - CENTER: Navigation links
 * - RIGHT: [Resume] [Theme Toggle]
 */
export default function Navbar({ onOpenResume, links = heroNavLinks }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY, activeSection } = useScrollProgress(links.map((l) => l.href.substring(1)));
  const isScrolled = scrollY > 40;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 lg:px-10 ${
          isScrolled
            ? 'py-3.5 bg-white/80 dark:bg-black/75 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.06] shadow-sm dark:shadow-none'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* LEFT: Logo & Identity */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/15 dark:border-white/15 flex items-center justify-center font-display font-semibold text-xs text-neutral-900 dark:text-white group-hover:border-black/40 dark:group-hover:border-white/50 transition-all duration-300">
              {personalInfo.initials || 'AS.'}
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium tracking-wider text-neutral-900 dark:text-white font-display group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                {personalInfo.displayName || personalInfo.name}
              </span>
              <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">
                {personalInfo.tagline ? 'FULL STACK × AI/ML' : 'DEVELOPER'}
              </span>
            </div>
          </a>

          {/* CENTER: Desktop Floating Navigation Links */}
          <NavLinks links={links} activeSection={activeSection} />

          {/* RIGHT: [Resume] [Theme Toggle] */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white bg-transparent border border-black/15 dark:border-white/10 hover:border-black/35 dark:hover:border-white/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-white/40"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                <span>Resume</span>
              </button>
            )}

            <ThemeToggle id="theme-toggle" />
          </div>

          {/* MOBILE: Top-right Theme Toggle & Menu Button */}
          <div className="lg:hidden flex items-center gap-2.5 z-50 ml-auto">
            <ThemeToggle id="mobile-theme-toggle" />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.05] border border-black/15 dark:border-white/15 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-cyan-400"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={links}
        activeSection={activeSection}
        onOpenResume={onOpenResume}
      />
    </>
  );
}
