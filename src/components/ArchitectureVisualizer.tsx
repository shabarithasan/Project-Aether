import React from 'react';
import { motion } from 'motion/react';
import { 
  Server, 
  Cloud, 
  Shield, 
  ArrowRightLeft, 
  Cpu, 
  Database, 
  Network, 
  FileText,
  Lock,
  Search,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function ArchitectureVisualizer() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      {/* Executive Pitch */}
      <section className="space-y-4 border-l border-neutral-800 pl-8 py-2">
        <h1 className="text-4xl font-bold tracking-tighter text-white uppercase leading-tight">
          Project <span className="text-sky-500">Aether</span>
        </h1>
        <p className="text-lg text-neutral-400 max-w-3xl leading-relaxed italic">
          Sovereign Multi-Agent Regulatory Audit and Remediation system. 
          Bridging the 'Borderless Paradox' by localizing sensitive PII while leveraging global cloud analytics.
        </p>
      </section>

      {/* Architecture Diagram */}
      <section className="relative bg-neutral-900/50 border border-neutral-800 rounded-lg p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent)] pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center relative">
          
          {/* Sovereign Local Node */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-emerald-400 font-mono text-[10px] tracking-widest uppercase mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Sovereign Node (On-Prem)
            </div>
            
            <div className="p-6 rounded border border-dashed border-sky-500/30 bg-sky-500/5 space-y-4 relative">
              <p className="text-[10px] absolute -top-2 left-4 bg-[#050505] px-2 text-sky-400 uppercase tracking-widest font-bold">Local Enclave</p>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2.5 rounded bg-black/40 border border-neutral-800">
                    <Database size={14} className="text-neutral-500" />
                    <span className="text-[11px] font-mono text-neutral-300">USER_DATA_VAULT</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded bg-black/40 border border-neutral-800">
                    <Cpu size={14} className="text-neutral-500" />
                    <span className="text-[11px] font-mono text-neutral-300">LOCAL_LLAMA_4_OLLAMA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bridge Connector */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-full h-24 flex items-center justify-center">
              <div className="absolute w-full h-[1px] bg-neutral-800" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="z-10 p-4 rounded bg-neutral-800 border border-neutral-700 shadow-xl"
              >
                <ArrowRightLeft className="text-sky-400" size={24} />
              </motion.div>
            </div>
            <div className="text-center">
               <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-[0.3em]">Encrypted Gateway</p>
               <p className="text-[9px] font-mono text-neutral-600 mt-1">mTLS + OPA POLICY</p>
            </div>
          </div>

          {/* Global Cloud */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sky-400 font-mono text-[10px] tracking-widest uppercase mb-4 lg:justify-end">
              Global Cloud Cluster
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            </div>
            
            <div className="p-6 rounded border border-neutral-800 bg-neutral-800/20 space-y-4 relative">
              <p className="text-[10px] absolute -top-2 right-4 bg-[#050505] px-2 text-neutral-500 uppercase tracking-widest font-bold">Public Cloud</p>
              
              <div className="space-y-3">
                <div className="space-y-2 text-right">
                  <div className="flex items-center gap-3 p-2.5 rounded bg-black/40 border border-neutral-800 justify-end">
                    <span className="text-[11px] font-mono text-neutral-400">GRAPH_RAG_REASONER</span>
                    <Network size={14} className="text-neutral-600" />
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded bg-black/40 border border-neutral-800 justify-end">
                    <span className="text-[11px] font-mono text-neutral-400">GLOBAL_ANALYTICS</span>
                    <Cloud size={14} className="text-neutral-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-12 border-t border-neutral-800">
          {[
            { label: 'Knowledge', icon: Search, text: 'GraphRAG on Neo4j for traceable legal interpretation through ontological linking.', color: 'text-sky-400' },
            { label: 'Privacy', icon: Shield, text: 'Differential Privacy Noise Injection on non-sensitive analytics exported to cloud.', color: 'text-emerald-400' },
            { label: 'DevSecOps', icon: Lock, text: 'Shift-Left compliance utilizing automated policy-as-code gates.', color: 'text-neutral-400' },
            { label: 'Latency', icon: CheckCircle2, text: 'Real-time telemetry tracking p95 latency (<2.5s) and cost-per-op.', color: 'text-sky-400' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded bg-neutral-900 border border-neutral-800">
              <div className="flex items-center gap-2 mb-2">
                <item.icon className={item.color} size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{item.label}</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-lg flex gap-4 items-center">
        <AlertTriangle className="text-sky-500 shrink-0" size={18} />
        <p className="text-xs text-neutral-500 leading-relaxed italic">
          <span className="text-white font-bold not-italic mr-2 uppercase tracking-tighter">Systems Thinking:</span>
          Project Aether maintains 98.4% compliance identification accuracy by preserving sovereign boundaries while leveraging cross-border reasoning.
        </p>
      </div>
    </div>
  );
}
