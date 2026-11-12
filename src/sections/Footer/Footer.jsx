import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import { navLinks } from '../../data/navigation';
import { socialLinks } from '../../data/socialLinks';
import './Footer.css';

/**
 * Footer - Minimal footer with identity, navigation links, copyright, and scroll-to-top.
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section relative border-t border-black/10 dark:border-blue-500/15 bg-neutral-100 dark:bg-[#050816] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-neutral-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-[#101A30] border border-black/10 dark:border-blue-500/30 flex items-center justify-center font-display font-bold text-sm text-neutral-900 dark:text-cyan-400">
              {personalInfo.initials || 'AS'}
            </div>
            <span className="text-base font-bold font-display text-neutral-950 dark:text-white tracking-wide">
              {personalInfo.name}
            </span>
          </div>
          <p className="text-xs font-mono text-neutral-700 dark:text-cyan-400/90">
            {personalInfo.professionalTitle || personalInfo.title}
          </p>
          <p className="text-xs text-neutral-500 dark:text-slate-500 mt-1 max-w-sm">
            Crafting intelligent digital experiences through full stack engineering & machine learning.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-neutral-600 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Social Links (Email, GitHub, LinkedIn) & Back to Top */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <a
            href={socialLinks.email}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#101A30] border border-black/10 dark:border-blue-500/20 text-neutral-700 dark:text-slate-300 hover:text-neutral-950 dark:hover:text-white hover:border-black/25 dark:hover:border-cyan-400/50 transition-colors text-xs font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-cyan-400"
            aria-label="Send direct email to gm956582@gmail.com"
            title="Email: gm956582@gmail.com"
          >
            <Mail className="w-3.5 h-3.5 text-neutral-600 dark:text-cyan-400" />
            <span>Email</span>
          </a>

          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#101A30] border border-black/10 dark:border-blue-500/20 text-neutral-700 dark:text-slate-300 hover:text-neutral-950 dark:hover:text-white hover:border-black/25 dark:hover:border-cyan-400/50 transition-colors text-xs font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-cyan-400"
            aria-label="GitHub profile: Ghost-apt"
            title="GitHub: Ghost-apt"
          >
            <Github className="w-3.5 h-3.5 text-neutral-600 dark:text-cyan-400" />
            <span>GitHub</span>
          </a>

          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#101A30] border border-black/10 dark:border-blue-500/20 text-neutral-700 dark:text-slate-300 hover:text-neutral-950 dark:hover:text-white hover:border-black/25 dark:hover:border-cyan-400/50 transition-colors text-xs font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-cyan-400"
            aria-label="LinkedIn profile: Anurag Singh"
            title="LinkedIn: Anurag Singh"
          >
            <Linkedin className="w-3.5 h-3.5 text-neutral-600 dark:text-cyan-400" />
            <span>LinkedIn</span>
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-neutral-900 dark:bg-blue-600/20 border border-neutral-800 dark:border-cyan-400/30 text-white dark:text-cyan-400 hover:bg-neutral-800 dark:hover:bg-blue-600/30 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-cyan-400"
            aria-label="Back to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-black/10 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 dark:text-slate-500 font-mono gap-3">
        <span>{personalInfo.copyright}</span>
        <span className="flex items-center gap-1.5 text-neutral-600 dark:text-slate-400">
          <span>Engineered with React, Vite & Tailwind CSS</span>
        </span>
      </div>
    </footer>
  );
}
