import React, { useState } from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';

// Sections
import Hero from './sections/Hero';
import MarqueeSection from './sections/MarqueeSection';
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
    <div className="relative min-h-screen bg-[#050816] text-[#F8FAFC] selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Cinematic Ambient Background */}
      <InteractiveBackground />

      {/* Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Page Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <MarqueeSection />
        <About />
        <Expertise />
        <Skills />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <Process />
        <Experience />
        <EngineeringApproach />
        <FAQ />
        <Contact />
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
