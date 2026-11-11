import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';

const heroNavLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = heroNavLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 lg:px-10 ${
          scrolled ? 'py-3.5 bg-black/75 backdrop-blur-xl border-b border-white/[0.06]' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Minimalist Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/15 flex items-center justify-center font-display font-semibold text-xs text-white group-hover:border-white/50 transition-all duration-300">
              AS.
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium tracking-wider text-white font-display group-hover:text-neutral-300 transition-colors">
                ANURAG SINGH
              </span>
              <span className="text-[9px] font-mono text-neutral-400 tracking-widest uppercase">
                FULL STACK × AI/ML
              </span>
            </div>
          </a>

          {/* Minimal Floating Navigation Island */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            {heroNavLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/20"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Minimalist Pills */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {onOpenResume && (
              <button
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/[0.05] border border-white/15 text-neutral-300 hover:text-white transition-colors shrink-0 z-50 ml-auto"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 p-6 rounded-2xl bg-[#030303]/95 border border-white/15 backdrop-blur-2xl shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {heroNavLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-white/[0.08] text-white border border-white/20 font-medium'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="text-sm font-sans">{link.name}</span>
                    <span className="text-xs font-mono text-neutral-500">→</span>
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
                {onOpenResume && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenResume();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-xs font-mono text-neutral-300 hover:text-white"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    View Resume
                  </button>
                )}
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black text-xs font-medium tracking-wide shadow-lg"
                >
                  Let's Connect
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
