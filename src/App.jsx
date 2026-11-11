import React, { useState } from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Expertise from './sections/Expertise';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Process from './sections/Process';
import Experience from './sections/Experience';
import EngineeringApproach from './sections/EngineeringApproach';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-[#F8FAFC] selection:bg-white/20 selection:text-white">
      {/* Background ambient lighting for portfolio lower sections */}
      <div className="relative z-0">
        <InteractiveBackground />
      </div>

      {/* Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Page Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Cinematic WebGL Monochromatic Fluid Smoke Hero Section */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Portfolio Body Sections */}
        <div className="relative z-20 bg-[#050816]/95">
          <About />
          <Expertise />
          <Skills />
          <Projects onSelectProject={(project) => setSelectedProject(project)} />
          <Process />
          <Experience />
          <EngineeringApproach />
          <FAQ />
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
