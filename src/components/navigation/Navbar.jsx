import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import { heroNavLinks } from '../../data/navigation';
import { personalInfo } from '../../data/personalInfo';
import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * Navbar - Floating minimal navigation header.
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
            ? 'py-3.5 bg-black/75 backdrop-blur-xl border-b border-white/[0.06]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/15 flex items-center justify-center font-display font-semibold text-xs text-white group-hover:border-white/50 transition-all duration-300">
              {personalInfo.initials || 'AS.'}
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium tracking-wider text-white font-display group-hover:text-neutral-300 transition-colors">
                {personalInfo.displayName || personalInfo.name}
              </span>
              <span className="text-[9px] font-mono text-neutral-400 tracking-widest uppercase">
                {personalInfo.tagline ? 'FULL STACK × AI/ML' : 'DEVELOPER'}
              </span>
            </div>
          </a>

          {/* Desktop Floating Navigation Links */}
          <NavLinks links={links} activeSection={activeSection} />

          {/* Right Action Minimalist Pills */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-neutral-400 hover:text-white bg-transparent border border-white/10 hover:border-white/30 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-400" />
                <span>Resume</span>
              </button>
            )}

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-white bg-white/[0.06] hover:bg-white hover:text-black border border-white/20 hover:border-white transition-all duration-300"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/[0.05] border border-white/15 text-neutral-300 hover:text-white transition-colors shrink-0 z-50 ml-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
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
