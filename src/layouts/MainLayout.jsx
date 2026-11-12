import React, { Suspense } from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../sections/Footer/Footer';
import InteractiveBackground from '../effects/particles/InteractiveBackground';
import { siteConfig } from '../config/siteConfig';

// Code-split modals for optimal initial bundle execution
const ProjectModal = React.lazy(() => import('../components/ui/ProjectModal'));
const ResumeModal = React.lazy(() => import('../components/ui/ResumeModal'));

/**
 * MainLayout - Root application layout.
 * Envelopes skip-link, navigation, main view container, footer, modals, and ambient background.
 */
export default function MainLayout({
  children,
  selectedProject,
  onCloseProject,
  isResumeOpen,
  onOpenResume,
  onCloseResume,
}) {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-black text-[#F8FAFC] selection:bg-white/20 selection:text-white">
      {/* WCAG 2.2 AA Bypass Block: Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-2.5 focus:bg-white focus:text-black focus:font-mono focus:text-xs focus:font-semibold focus:rounded-full focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
      >
        Skip to main content
      </a>

      {/* Background ambient lighting for portfolio lower sections */}
      <div className="relative z-0 w-full max-w-full overflow-hidden" aria-hidden="true">
        <InteractiveBackground />
      </div>

      {/* Floating Minimal Navigation Bar */}
      <Navbar onOpenResume={onOpenResume} />

      {/* Main Page Flow */}
      <main id="main-content" tabIndex="-1" className="relative z-10 flex flex-col w-full max-w-full overflow-x-hidden outline-none">
        {children}
      </main>

      {/* Footer */}
      {siteConfig?.sections?.footer !== false && <Footer />}

      {/* Code-split Interactive Modals with Suspense */}
      <Suspense fallback={null}>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={Boolean(selectedProject)}
            onClose={onCloseProject}
          />
        )}

        {isResumeOpen && (
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={onCloseResume}
          />
        )}
      </Suspense>
    </div>
  );
}
