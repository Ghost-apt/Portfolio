import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Copy, Check, ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Constructs a real mailto trigger with pre-filled subject and body
    const mailtoSubject = encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name} via Portfolio`
    );
    const mailtoBody = encodeURIComponent(
      `Hello Anurag,\n\n${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );

    window.location.href = `mailto:${personalInfo.contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Prominent Blurred Blue & Cyan Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[400px] sm:h-[550px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-cyan-400/20 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101A30]/80 border border-blue-500/20 text-xs font-mono tracking-wider text-cyan-400 mb-4 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>09 // INITIATE DIALOGUE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display text-white tracking-tight leading-[1.15]">
          Have an idea?{' '}
          <span className="text-gradient-cyan block sm:inline">
            Let's build something intelligent.
          </span>
        </h2>

        <p className="mt-5 text-base sm:text-lg text-[#94A3B8] font-sans leading-relaxed">
          {personalInfo.cta.subtext}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-5xl mx-auto items-start">
        {/* Left Column: Direct Connect & Socials */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Quick Copy Email Card */}
          <div className="rounded-3xl bg-[#0B1120] border border-blue-500/20 p-6 sm:p-7 shadow-xl">
            <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider block mb-2">
              DIRECT EMAIL
            </span>
            <div className="text-sm sm:text-base font-mono text-white break-all mb-4">
              {personalInfo.contact.email}
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-slate-200 bg-[#101A30] hover:bg-[#162244] border border-blue-500/30 hover:border-cyan-400/50 transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-white bg-blue-600/80 hover:bg-blue-600 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open Mail Client</span>
              </a>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="rounded-3xl bg-[#0B1120] border border-blue-500/20 p-6 sm:p-7 shadow-xl space-y-4">
            <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider block">
              COLLABORATIVE CHANNELS
            </span>

            <div className="space-y-3">
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#101A30] border border-blue-500/15 hover:border-cyan-400/40 text-slate-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs font-bold text-white">GitHub</div>
                    <div className="text-[11px] font-mono text-slate-400">View Repositories & Architecture</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#101A30] border border-blue-500/15 hover:border-cyan-400/40 text-slate-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs font-bold text-white">LinkedIn</div>
                    <div className="text-[11px] font-mono text-slate-400">Professional Network & Inquiries</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Real Functional Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="rounded-3xl bg-[#0B1120] border border-blue-500/20 p-6 sm:p-9 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-blue-900/40">
              <h3 className="text-xl font-bold font-display text-white">
                Send a Direct Message
              </h3>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Inbox
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Chen"
                    className="w-full px-4 py-3 rounded-xl bg-[#101A30] border border-blue-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#101A30] border border-blue-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-slate-300 mb-1.5">
                  Subject / Project Scope
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack System or AI/ML Opportunity"
                  className="w-full px-4 py-3 rounded-xl bg-[#101A30] border border-blue-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, timeline, or engineering inquiry..."
                  className="w-full px-4 py-3 rounded-xl bg-[#101A30] border border-blue-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Message via Email</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 text-center animate-fadeIn">
                  Your email client has been prepared with this message. If it didn't open automatically, send directly to {personalInfo.contact.email}.
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
