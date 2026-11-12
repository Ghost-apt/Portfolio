import React from 'react';
import { motion } from 'framer-motion';

/**
 * NavLinks - Desktop navigation links with spring-animated active pill.
 * Automatically adapts between Light Mode and Dark Mode.
 */
export default function NavLinks({ links = [], activeSection = 'home' }) {
  return (
    <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 backdrop-blur-xl transition-colors duration-300">
      {links.map((link) => {
        const isActive = activeSection === link.href.substring(1);
        return (
          <a
            key={link.name}
            href={link.href}
            className={`relative px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-colors duration-200 ${
              isActive
                ? 'text-black dark:text-white font-medium'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeNavPill"
                className="absolute inset-0 rounded-full bg-black/[0.08] dark:bg-white/[0.08] border border-black/15 dark:border-white/20"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{link.name}</span>
          </a>
        );
      })}
    </nav>
  );
}
