import React from 'react';
import { 
  Briefcase, 
  Award, 
  BarChart3, 
  Target, 
  Cpu, 
  ShieldCheck,
  TrendingUp,
  FileText
} from 'lucide-react';

const BULLETS = [
  {
    problem: 'Saturated cross-border data silos resulting in 40%+ compliance failure rates and p95 latency spikes (>10s) during regulatory audits.',
    action: 'Architected Aether—a sovereign multi-agent RAG system utilizing Llama 4 SLMs for local PII remediation and Neo4j GraphRAG for legal interpretations.',
    result: 'Achieved 95%+ audit accuracy, 84% reduction in MTTR for privacy conflicts, and ensured 100% adherence to Sovereign Vault Integrity (SVI) indexes.'
  },
  {
    problem: 'Manual identity scrubbing bottlenecks leading to $0.50+ cost-per-audit and potential exposure of sensitive identifiers during cloud transfers.',
    action: 'Implemented an autonomous "Shift-Left" compliance pipeline using Open Policy Agent (OPA) and Differential Privacy (DP) at the edge nodes.',
    result: 'Optimized cost-per-audit to <$0.05 (90% reduction) while maintaining a p95 latency of <2.5s tracking via full OpenTelemetry integration.'
  },
  {
    problem: 'Traceability gaps in AI-driven compliance decisions leading to "Black Box" remediation rejections from EU-based regulatory bodies.',
    action: 'Developed an ontological reasoning layer that links agentive actions directly to legal statutes using ontological indexing in a knowledge graph.',
    result: 'Reached an F1-Score of 0.98 on identifying high-risk PII patterns, facilitating zero-rejection rates during 2026 mid-year regulatory stress tests.'
  }
];

export default function CareerBlueprint() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12">
      <header className="flex items-end justify-between border-b border-neutral-800 pb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sky-500 font-mono text-[10px] uppercase tracking-[0.3em]">
            <Award size={12} /> Strategic Portfolio v2.6
          </div>
          <h2 className="text-4xl font-bold text-white tracking-tighter uppercase">High-Impact Metrics</h2>
          <p className="text-neutral-500 max-w-xl text-sm italic">
            Optimized for AI-driven filters and human architects. Leveraging the **PAR** framework with 2026 industry-leading SVI targets.
          </p>
        </div>
        <div className="hidden lg:block p-5 rounded bg-neutral-900 border border-neutral-800 text-right">
          <p className="text-[9px] uppercase tracking-widest font-bold text-neutral-600 mb-1">Architecture Score</p>
          <p className="text-3xl font-mono text-white leading-none">9.8<span className="text-sm text-sky-500">/10</span></p>
          <p className="text-[8px] text-emerald-400 font-bold uppercase mt-2 tracking-widest">Tier-1 Optimal</p>
        </div>
      </header>

      <section className="space-y-6">
        {BULLETS.map((bullet, i) => (
          <div key={i} className="group p-8 rounded bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="md:col-span-4 flex items-center gap-4 mb-4">
                <div className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  Metric_0{i + 1}
                </div>
                <div className="h-px flex-1 bg-neutral-800" />
              </div>

              <div className="space-y-2">
                <h4 className="text-[9px] font-bold uppercase tracking-widest text-red-500/60 mb-2 flex items-center gap-2">
                  <Target size={11} /> Problem
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed italic">"{bullet.problem}"</p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <h4 className="text-[9px] font-bold uppercase tracking-widest text-sky-500/60 mb-2 flex items-center gap-2">
                  <Cpu size={11} /> Action
                </h4>
                <p className="text-xs text-neutral-100 leading-relaxed font-bold underline decoration-sky-500/30 underline-offset-4">
                  {bullet.action}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[9px] font-bold uppercase tracking-widest text-emerald-500/60 mb-2 flex items-center gap-2">
                  <ShieldCheck size={11} /> Result
                </h4>
                <p className="text-xs text-emerald-400 font-bold leading-relaxed px-3 py-2 rounded bg-emerald-500/5 border border-emerald-500/10">
                  {bullet.result}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Meta Advantage Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12">
        <div className="lg:col-span-2 p-8 rounded bg-neutral-900 border border-neutral-800 space-y-4">
          <h4 className="text-white font-bold flex items-center gap-3 uppercase text-xs tracking-widest">
            <BarChart3 className="text-sky-500" size={16} />
            Architect's Verdict
          </h4>
          <p className="text-xs text-neutral-500 leading-relaxed font-mono">
             In 2026, Tier-1 firms prioritize **Sovereignty** over general purpose wrappers. 
             By quantifying **p95 Latency** and **MTTR reduction** via agentic loops, this project 
             validates production-grade systems thinking.
          </p>
          <div className="flex gap-4 pt-2">
            <div className="px-3 py-1 bg-black rounded text-[9px] font-mono text-neutral-600 uppercase tracking-widest">
               LATENCY_P95: 1.82s
            </div>
            <div className="px-3 py-1 bg-black rounded text-[9px] font-mono text-neutral-600 uppercase tracking-widest">
               CORE: GRAPHRAG_OPA
            </div>
          </div>
        </div>

        <div className="p-8 rounded bg-[#0A0A0A] border border-neutral-800 flex flex-col justify-between items-center text-center">
           <FileText size={40} className="text-neutral-700 mb-4" />
           <p className="text-[10px] text-neutral-500 italic mb-6">"Project Aether serves as the primary anchor for 2026 senior-tier placement."</p>
           <button className="w-full py-2.5 rounded bg-white text-black font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors">
              Export Blueprint
           </button>
        </div>
      </div>
    </div>
  );
}
