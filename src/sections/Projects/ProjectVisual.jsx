import React from 'react';
import {
  GraduationCap,
  Bot,
  FileCheck2,
  Cpu,
  Share2,
  Database,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Sparkles,
  TrendingUp,
  Activity
} from 'lucide-react';

export default function ProjectVisual({ type }) {
  if (type === 'campus') {
    return (
      <div
        role="img"
        aria-label="SmartCampus AI architectural dashboard mockup showing 96.4% attendance and adaptive learning path telemetry"
        className="relative w-full h-full min-h-[260px] sm:min-h-[300px] bg-[#070D1D] rounded-2xl p-4 sm:p-5 overflow-hidden border border-blue-500/20 flex flex-col justify-between group-hover:border-cyan-400/40 transition-colors"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Dashboard Topbar */}
        <div className="flex items-center justify-between pb-3 border-b border-blue-900/40 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-cyan-300 font-semibold tracking-wider">SMARTCAMPUS // AI KERNEL</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 text-[11px] border border-blue-700/30">
            v2.4 Live
          </span>
        </div>

        {/* Main Interface Content Mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-3">
          {/* Card 1: Attendance & Academic */}
          <div className="p-3 rounded-xl bg-[#0E172E]/80 border border-blue-500/15">
            <div className="flex items-center justify-between text-[11px] text-[#94A3B8] mb-1">
              <span>Attendance</span>
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xl font-bold font-display text-white">96.4%</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">● On Schedule</div>
          </div>

          {/* Card 2: AI Recommendations */}
          <div className="p-3 rounded-xl bg-[#0E172E]/80 border border-blue-500/15">
            <div className="flex items-center justify-between text-[11px] text-[#94A3B8] mb-1">
              <span>Learning Path</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xl font-bold font-display text-cyan-300">Adaptive</div>
            <div className="text-[10px] text-blue-300 font-mono mt-0.5">3 modules suggested</div>
          </div>

          {/* Card 3: System Services */}
          <div className="p-3 rounded-xl bg-[#0E172E]/80 border border-blue-500/15">
            <div className="flex items-center justify-between text-[11px] text-[#94A3B8] mb-1">
              <span>Active Students</span>
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xl font-bold font-display text-white">12,450+</div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">Synchronized</div>
          </div>
        </div>

        {/* AI Assistant Chat Preview Bar */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-950/70 via-indigo-950/40 to-cyan-950/60 border border-cyan-500/25 flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-mono text-cyan-300 truncate">AI Student Assistant:</div>
            <div className="text-xs text-slate-300 truncate font-sans">
              "Analyzing semester schedule & personalized course syllabus..."
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
            Resolved
          </span>
        </div>
      </div>
    );
  }

  if (type === 'resume') {
    return (
      <div
        role="img"
        aria-label="Resume NLP Vector evaluation interface mockup showing 97.4% match and semantic skills alignment"
        className="relative w-full h-full min-h-[260px] sm:min-h-[300px] bg-[#070D1D] rounded-2xl p-4 sm:p-5 overflow-hidden border border-blue-500/20 flex flex-col justify-between group-hover:border-cyan-400/40 transition-colors"
      >
        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Topbar */}
        <div className="flex items-center justify-between pb-3 border-b border-blue-900/40 text-xs font-mono">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 font-semibold tracking-wider">RESUME.NLP // VECTOR EVAL</span>
          </div>
          <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 97.4% Match
          </span>
        </div>

        {/* Center Comparison Preview */}
        <div className="grid grid-cols-2 gap-3 my-3">
          <div className="p-3 rounded-xl bg-[#0E172E]/90 border border-blue-500/15">
            <div className="text-[10px] font-mono text-[#94A3B8] mb-1">INGESTED CANDIDATE</div>
            <div className="text-sm font-semibold text-white truncate">Full Stack / ML Lead</div>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="px-1.5 py-0.5 text-[9px] font-mono bg-blue-900/50 text-blue-300 rounded border border-blue-700/30">React</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono bg-cyan-900/50 text-cyan-300 rounded border border-cyan-700/30">Python</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono bg-indigo-900/50 text-indigo-300 rounded border border-indigo-700/30">RAG</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0E172E]/90 border border-blue-500/15">
            <div className="text-[10px] font-mono text-[#94A3B8] mb-1">SEMANTIC ANALYSIS</div>
            <div className="space-y-1.5 mt-1.5">
              <div>
                <div className="flex justify-between text-[10px] text-slate-300 font-mono">
                  <span>Skills Alignment</span>
                  <span className="text-cyan-300 font-bold">98%</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                  <div className="h-full bg-cyan-400 rounded-full w-[98%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-slate-300 font-mono">
                  <span>Experience Fit</span>
                  <span className="text-blue-400 font-bold">96%</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                  <div className="h-full bg-blue-500 rounded-full w-[96%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="p-2.5 rounded-lg bg-[#0E172E]/60 border border-blue-500/10 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            Extraction: PDF/DOCX Parser Active
          </span>
          <span className="text-cyan-400 font-semibold">Shortlisted (Tier-1)</span>
        </div>
      </div>
    );
  }

  if (type === 'graph') {
    return (
      <div
        role="img"
        aria-label="Graph RAG knowledge graph topology diagram showing query nodes, entity relationships, and 38% accuracy gain metrics"
        className="relative w-full h-full min-h-[260px] sm:min-h-[300px] bg-[#070D1D] rounded-2xl p-4 sm:p-5 overflow-hidden border border-blue-500/20 flex flex-col justify-between group-hover:border-cyan-400/40 transition-colors"
      >
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Topbar */}
        <div className="flex items-center justify-between pb-3 border-b border-blue-900/40 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 font-semibold tracking-wider">GRAPH RAG // BENCHMARK MATRIX</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 text-[11px] border border-indigo-700/30">
            Multi-Hop Testbed
          </span>
        </div>

        {/* Interactive Knowledge Graph SVG Representation */}
        <div className="relative h-32 w-full my-2 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 360 120" fill="none">
            {/* Edges */}
            <line x1="60" y1="60" x2="130" y2="30" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <line x1="60" y1="60" x2="130" y2="90" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6" />
            <line x1="130" y1="30" x2="220" y2="40" stroke="#22D3EE" strokeWidth="2" />
            <line x1="130" y1="90" x2="220" y2="40" stroke="#6366F1" strokeWidth="1.5" opacity="0.6" />
            <line x1="220" y1="40" x2="300" y2="60" stroke="#22D3EE" strokeWidth="2.5" />
            <line x1="130" y1="90" x2="300" y2="60" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.4" />

            {/* Nodes */}
            <circle cx="60" cy="60" r="14" fill="#101A30" stroke="#3B82F6" strokeWidth="2" />
            <text x="60" y="64" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">Query</text>

            <circle cx="130" cy="30" r="13" fill="#101A30" stroke="#22D3EE" strokeWidth="2" />
            <text x="130" y="34" fill="#22D3EE" fontSize="8" textAnchor="middle" fontFamily="monospace">Entity</text>

            <circle cx="130" cy="90" r="13" fill="#101A30" stroke="#6366F1" strokeWidth="2" />
            <text x="130" y="94" fill="#C7D2FE" fontSize="8" textAnchor="middle" fontFamily="monospace">Vector</text>

            <circle cx="220" cy="40" r="16" fill="#101A30" stroke="#22D3EE" strokeWidth="2.5" />
            <text x="220" y="44" fill="#F8FAFC" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Rel-Path</text>

            <circle cx="300" cy="60" r="16" fill="#101A30" stroke="#34D399" strokeWidth="2" />
            <text x="300" y="64" fill="#34D399" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Answer</text>
          </svg>
        </div>

        {/* Metrics Footer */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-[#0E172E]/80 border border-blue-500/15">
            <div className="text-[10px] text-slate-400 font-mono">Multi-Hop</div>
            <div className="text-xs sm:text-sm font-bold text-cyan-300 font-display">+38% Gain</div>
          </div>
          <div className="p-2 rounded-lg bg-[#0E172E]/80 border border-blue-500/15">
            <div className="text-[10px] text-slate-400 font-mono">Context Recall</div>
            <div className="text-xs sm:text-sm font-bold text-white font-display">94.1%</div>
          </div>
          <div className="p-2 rounded-lg bg-[#0E172E]/80 border border-blue-500/15">
            <div className="text-[10px] text-slate-400 font-mono">Token Pruning</div>
            <div className="text-xs sm:text-sm font-bold text-emerald-400 font-display">40% Less</div>
          </div>
        </div>
      </div>
    );
  }

  // Bank Management System
  return (
    <div
      role="img"
      aria-label="Bank Management System SQL ledger interface mockup showing ACID compliant transactions and atomic transfer telemetry"
      className="relative w-full h-full min-h-[260px] sm:min-h-[300px] bg-[#070D1D] rounded-2xl p-4 sm:p-5 overflow-hidden border border-blue-500/20 flex flex-col justify-between group-hover:border-cyan-400/40 transition-colors"
    >
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Topbar */}
      <div className="flex items-center justify-between pb-3 border-b border-blue-900/40 text-xs font-mono">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-cyan-300 font-semibold tracking-wider">BANK.CORE // SQL LEDGER</span>
        </div>
        <span className="text-emerald-400 text-xs font-mono flex items-center gap-1 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" /> ACID Compliant
        </span>
      </div>

      {/* Transaction & Record Feed */}
      <div className="space-y-2 my-2 font-mono text-[11px]">
        <div className="p-2.5 rounded-lg bg-[#0E172E]/90 border border-blue-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300">TXN #84920 - Atomic Transfer</span>
          </div>
          <span className="text-emerald-400 font-semibold">+₹45,000.00</span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#0E172E]/90 border border-blue-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-slate-300">ACC #1084 - Balance Reconciled</span>
          </div>
          <span className="text-cyan-300 font-semibold">Verified</span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#0E172E]/90 border border-blue-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <span className="text-slate-300">SQL Schema - Referential Check</span>
          </div>
          <span className="text-indigo-300 font-semibold">0 Errors</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-2.5 rounded-lg bg-[#0E172E]/60 border border-blue-500/10 flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-400 flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-blue-400" />
          Java DAO Architecture
        </span>
        <span className="text-emerald-400 font-semibold">Security Level: Enterprise</span>
      </div>
    </div>
  );
}
