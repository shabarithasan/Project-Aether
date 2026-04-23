import React from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Workflow, 
  Database, 
  Search,
  Lock,
  ArrowUpRight
} from 'lucide-react';

const FEATURES = [
  {
    title: 'Automated HIPAA Remediation',
    tag: 'Compliance',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    description: 'Real-time detection and localized pseudonymization of Protected Health Information (PHI) before cross-border cloud sync.',
    justification: 'Critical for healthcare firms in 2026 operating under sovereign data mandates. Reduces MTTR for breach remediation by 84% through agentic fixing.'
  },
  {
    title: 'Ontological Graph Reasoning',
    tag: 'Intelligence',
    icon: Search,
    color: 'text-indigo-400',
    description: 'Dynamic mapping of regulatory text to system architecture via Neo4j GraphRAG, enabling "Explainable Compliance" paths.',
    justification: 'Transforms black-box AI decisions into traceable, legal interpretations required for sovereign regulatory reporting.'
  },
  {
    title: 'Differential Privacy Bridge',
    tag: 'Security',
    icon: Lock,
    color: 'text-blue-400',
    description: 'Mathematical noise injection at the Sovereignty Node layer prevents deanonymization attacks even if global cloud logs are compromised.',
    justification: 'Enforces Zero-Trust data connectivity by ensuring raw identifiers never cross the sovereign boundary.'
  },
  {
    title: 'Multi-Agent Regulatory Loop',
    tag: 'Orchestration',
    icon: Workflow,
    color: 'text-amber-400',
    description: 'Four specialized agents (Auditor, Researcher, Fixer, Reviewer) collaborate in an autonomous OODA loop for security posture.',
    justification: 'Bypasses the "Human Bottleneck" in compliance operations, allowing for p95 audit latencies under 2.5 seconds.'
  },
  {
    title: 'Privacy-Aware Vector Store',
    tag: 'Database',
    icon: Database,
    color: 'text-purple-400',
    description: 'Hybrid embedding strategy that keeps sensitive semantic fragments inside the Local Node while exporting "Safe Embeddings".',
    justification: 'Enables high-performance global AI search without compromising the sovereign identity of the data.'
  }
];

export default function FeatureRoadmap() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12">
      <header className="text-center space-y-4">
        <div className="inline-block px-4 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-[10px] font-bold text-sky-400 uppercase tracking-[0.3em] mb-4">
          Audit Release v1.0
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tighter uppercase">High-Impact Controls</h2>
        <p className="text-neutral-500 max-w-2xl mx-auto italic text-sm">
          Production-grade capabilities designed for strictly audited algorithmic environments.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FEATURES.map((feature, i) => (
          <div 
            key={i}
            className="group relative p-8 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded bg-neutral-800 border border-neutral-700 group-hover:scale-105 transition-transform duration-300`}>
                <feature.icon className={feature.color.replace('indigo', 'sky')} size={24} />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-600 border border-neutral-800 px-2.5 py-1 rounded">
                {feature.tag}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition-colors uppercase tracking-tight">{feature.title}</h3>
            <p className="text-neutral-400 text-[13px] leading-relaxed mb-6">
              {feature.description}
            </p>
            
            <div className="pt-6 border-t border-neutral-800 space-y-3">
              <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-600">Technical Logic</p>
              <div className="flex gap-3 text-[11px] text-neutral-500 bg-black/40 p-3 rounded border border-neutral-800">
                <ArrowUpRight size={12} className="shrink-0 text-neutral-700" />
                <p className="italic leading-relaxed">{feature.justification}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Vision Card */}
        <div className="relative p-10 rounded bg-[#0A0A0A] border border-sky-500/20 overflow-hidden md:col-span-2 flex flex-col justify-center items-center text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[100px] pointer-events-none" />
          <h3 className="text-xl font-bold text-white mb-4 italic uppercase tracking-tighter">"Bridging the Borderless Paradox"</h3>
          <p className="text-neutral-500 max-w-xl text-xs leading-relaxed uppercase tracking-widest">
            Infrastructure for **Intent-Driven Sovereign AI**. Scalable global compute with localized identity integrity.
          </p>
        </div>
      </div>
    </div>
  );
}
