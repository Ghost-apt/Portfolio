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
    <footer className="footer-section relative border-t border-blue-500/15 bg-[#050816] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#101A30] border border-blue-500/30 flex items-center justify-center font-display font-bold text-sm text-cyan-400">
              {personalInfo.initials || 'AS'}
            </div>
            <span className="text-base font-bold font-display text-white tracking-wide">
              {personalInfo.name}
            </span>
          </div>
          <p className="text-xs font-mono text-cyan-400/90">
            {personalInfo.professionalTitle || personalInfo.title}
          </p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Crafting intelligent digital experiences through full stack engineering & machine learning.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Socials & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#101A30] border border-blue-500/20 text-slate-400 hover:text-white hover:border-cyan-400/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="GitHub profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#101A30] border border-blue-500/20 text-slate-400 hover:text-white hover:border-cyan-400/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            className="p-2.5 rounded-xl bg-[#101A30] border border-blue-500/20 text-slate-400 hover:text-white hover:border-cyan-400/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Send direct email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-blue-600/20 border border-cyan-400/30 text-cyan-400 hover:bg-blue-600/30 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Back to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-3">
        <span>{personalInfo.copyright}</span>
        <span className="flex items-center gap-1.5 text-slate-400">
          <span>Engineered with React, Vite & Tailwind CSS</span>
        </span>
      </div>
    </footer>
  );
}
