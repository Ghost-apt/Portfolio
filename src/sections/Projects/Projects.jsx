import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight, Eye } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import ProjectVisual from './ProjectVisual';
import { projectsData } from '../../data/projects';
import './Projects.css';

/**
 * Projects - Featured engineering projects showcase.
 */
export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'Full Stack & AI', 'AI / NLP', 'GenAI & RAG', 'Backend & Systems'];

  const filteredProjects =
    filter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="projects-section relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Accent */}
      <div className="absolute top-1/4 right-10 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <SectionHeading
        tag="04 // PORTFOLIO"
        title="Featured"
        highlight="Engineering Projects."
        subtitle="A showcase of end-to-end applications, intelligent systems, and AI research workflows built with modern software architecture."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 sm:mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className="relative px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-colors border border-blue-500/20"
          >
            {filter === cat && (
              <motion.div
                layoutId="activeProjectTabIndicator"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${filter === cat ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'}`}>
              {cat === 'all' ? 'All Works' : cat}
            </span>
          </button>
        ))}
      </div>

      {/* Projects Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative rounded-3xl bg-[#0B1120] border border-blue-500/20 hover:border-cyan-400/40 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_-15px_rgba(34,211,238,0.15)]"
          >
            {/* Top Visual Area */}
            <div className="p-3 sm:p-4">
              <div className="relative rounded-2xl overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
                <ProjectVisual type={project.visualType} />

                {/* Hover Quick Overlay */}
                <div className="absolute inset-0 bg-[#050816]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => onSelectProject && onSelectProject(project)}
                    className="px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg flex items-center gap-1.5 hover:scale-105 transition-transform"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Architecture</span>
                  </button>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-200 bg-[#101A30] border border-slate-700 hover:border-slate-500 flex items-center gap-1.5 hover:scale-105 transition-transform"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-medium text-cyan-400 tracking-wider">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-blue-950/80 text-blue-300 border border-blue-800/40">
                    {project.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm font-mono text-cyan-400/80 mt-1 mb-3">
                  {project.subtitle}
                </p>

                {/* Short Description */}
                <p className="text-sm text-[#94A3B8] leading-relaxed font-sans line-clamp-3">
                  {project.shortDescription}
                </p>
              </div>

              {/* Technologies Tags */}
              <div className="mt-6 pt-5 border-t border-blue-900/30">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#101A30] text-slate-300 border border-blue-500/15"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-1 rounded-md text-[11px] font-mono bg-blue-950/40 text-cyan-400">
                      +{project.technologies.length - 5} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    data-testid="inspect-blueprint-btn"
                    onClick={() => onSelectProject && onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/btn cursor-pointer"
                    aria-label={`Inspect architectural blueprint for ${project.title}`}
                  >
                    <span>Inspect Blueprint</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#101A30] border border-blue-500/20 text-slate-300 hover:text-white hover:border-cyan-400/50 transition-all"
                    aria-label={`View GitHub repository for ${project.title}`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
