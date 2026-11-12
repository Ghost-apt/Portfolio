import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import { siteConfig } from './config/siteConfig';

// Sections
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Expertise from './sections/Expertise/Expertise';
import Skills from './sections/Skills/Skills';
import Projects from './sections/Projects/Projects';
import Process from './sections/Process/Process';
import Experience from './sections/Experience/Experience';
import EngineeringApproach from './sections/EngineeringApproach/EngineeringApproach';
import FAQ from './sections/FAQ/FAQ';
import Contact from './sections/Contact/Contact';

/**
 * App - Root application component.
 * Composes independent, modular sections within MainLayout.
 */
export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const { sections } = siteConfig;

  return (
    <MainLayout
      selectedProject={selectedProject}
      onCloseProject={() => setSelectedProject(null)}
      isResumeOpen={isResumeOpen}
      onOpenResume={() => setIsResumeOpen(true)}
      onCloseResume={() => setIsResumeOpen(false)}
    >
      {/* 1. Cinematic Ambient Monochromatic Fluid Smoke Hero Section */}
      {sections.hero && (
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
      )}

      {/* 2. Portfolio Body Sections */}
      <div className="relative z-20 bg-black">
        {sections.about && <About />}
        {sections.expertise && <Expertise />}
        {sections.skills && <Skills />}
        {sections.projects && (
          <Projects onSelectProject={(project) => setSelectedProject(project)} />
        )}
        {sections.process && <Process />}
        {sections.experience && <Experience />}
        {sections.principles && <EngineeringApproach />}
        {sections.faq && <FAQ />}
        {sections.contact && <Contact />}
      </div>
    </MainLayout>
  );
}
