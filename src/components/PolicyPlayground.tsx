import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, Database, ArrowRight, Lock, Unlock, Code, ChevronRight } from 'lucide-react';

type ExportScenario = {
  id: string;
  name: string;
  data: string;
  target: string;
  hasPii: boolean;
  isAnonymized: boolean;
};

const SCENARIOS: ExportScenario[] = [
  { id: '1', name: 'Standard Analytics', data: 'Aggregated Usage Metrics', target: 'EU-CENTRAL-1', hasPii: false, isAnonymized: true },
  { id: '2', name: 'User Identity Sync', data: 'User Email + Purchase History', target: 'US-EAST-1', hasPii: true, isAnonymized: false },
  { id: '3', name: 'Privacy-Preserved Audit', data: 'Hashed User ID + Token', target: 'GLOBAL-REASONER', hasPii: true, isAnonymized: true },
];

const REGO_POLICY = `
package aether.authz

default allow = false

# Rule: No raw PII exported cross-border
allow {
    not input.has_pii
}

# Rule: Anonymized data permitted
allow {
    input.is_anonymized
}

# Breach: Explicitly deny unprotected PII
deny {
    input.has_pii
    not input.is_anonymized
}
`;

export default function PolicyPlayground() {
  const [selectedScenario, setSelectedScenario] = useState<ExportScenario>(SCENARIOS[0]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<'ALLOW' | 'DENY' | null>(null);

  const runPolicy = () => {
    setIsVerifying(true);
    setResult(null);
    
    setTimeout(() => {
      setIsVerifying(false);
      if (selectedScenario.hasPii && !selectedScenario.isAnonymized) {
        setResult('DENY');
      } else {
        setResult('ALLOW');
      }
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white tracking-tighter uppercase flex items-center gap-3">
            <Lock className="text-sky-500" />
            Policy Enforcement Playground
          </h2>
          <p className="text-neutral-500 text-[10px] uppercase font-mono tracking-widest italic">Open Policy Agent (OPA) Simulation</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Scenario Selection */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded bg-neutral-900 border border-neutral-800 space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Data Export Scenarios</h3>
            <div className="space-y-3">
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedScenario(s); setResult(null); }}
                  className={`w-full text-left p-4 rounded border transition-all ${
                    selectedScenario.id === s.id 
                      ? 'bg-sky-500/5 border-sky-500/50 text-white' 
                      : 'bg-black border-neutral-800 text-neutral-500 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-tighter">{s.name}</span>
                    <ChevronRight size={12} className={selectedScenario.id === s.id ? 'text-sky-400' : 'text-neutral-800'} />
                  </div>
                  <p className="text-[9px] font-mono text-neutral-600 line-clamp-1">{s.data}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded border border-neutral-800 bg-[#020202] space-y-4">
             <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
               <span className="text-neutral-500">Input JSON</span>
               <Database size={12} className="text-neutral-700" />
             </div>
             <pre className="text-[10px] font-mono text-sky-400/80 bg-black p-4 rounded leading-relaxed border border-neutral-900">
               {JSON.stringify(selectedScenario, null, 2)}
             </pre>
          </div>
        </div>

        {/* Policy & Simulation */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="rounded bg-[#020202] border border-neutral-800 flex flex-col flex-1 overflow-hidden">
            <div className="px-4 py-2 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
               <div className="flex items-center gap-2">
                 <Code size={14} className="text-neutral-600" />
                 <span className="text-[9px] font-mono text-neutral-600 font-bold tracking-widest uppercase">policy.rego</span>
               </div>
               <span className="text-[9px] text-emerald-500 font-bold uppercase">Ready</span>
            </div>
            <div className="flex-1 p-6 bg-black font-mono text-[12px] leading-relaxed text-neutral-500">
              <pre className="whitespace-pre-wrap">{REGO_POLICY}</pre>
            </div>
          </div>

          <div className="p-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-8">
            <div className="flex-1 flex items-center gap-6">
               <div className={`w-12 h-12 rounded flex items-center justify-center border ${
                 result === 'ALLOW' ? 'bg-emerald-500/10 border-emerald-500/30' :
                 result === 'DENY' ? 'bg-red-500/10 border-red-500/30' : 'bg-neutral-800 border-neutral-700'
               }`}>
                 <AnimatePresence mode="wait">
                   {isVerifying ? (
                     <motion.div
                       animate={{ rotate: 360 }}
                       transition={{ repeat: Infinity, duration: 1 }}
                       key="loader"
                     >
                       <ShieldCheck className="text-neutral-500" size={24} />
                     </motion.div>
                   ) : result === 'ALLOW' ? (
                     <Unlock className="text-emerald-500" size={24} key="allow" />
                   ) : result === 'DENY' ? (
                     <ShieldAlert className="text-red-500" size={24} key="deny" />
                   ) : (
                     <Lock className="text-neutral-600" size={24} key="idle" />
                   )}
                 </AnimatePresence>
               </div>
               
               <div className="space-y-1">
                 <p className="text-white font-bold uppercase tracking-tight">Rego Enforcement Engine</p>
                 <p className="text-neutral-500 text-[10px] italic leading-relaxed">
                   Evaluating export from <span className="text-neutral-300">LOCAL_NODE</span> to <span className="text-neutral-300">{selectedScenario.target}</span>
                 </p>
               </div>
            </div>

            <button 
              onClick={runPolicy}
              disabled={isVerifying}
              className="px-8 py-3 rounded bg-sky-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-sky-500 disabled:bg-neutral-800 disabled:text-neutral-600 transition-all border border-sky-400/50 shadow-xl"
            >
              Run Audit Gate
            </button>
          </div>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded border flex items-center gap-4 ${
                result === 'ALLOW' ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'
              }`}
            >
              <div className={result === 'ALLOW' ? 'text-emerald-500' : 'text-red-500'}>
                {result === 'ALLOW' ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
              </div>
              <div>
                <p className={`font-bold uppercase text-xs tracking-widest ${result === 'ALLOW' ? 'text-emerald-400' : 'text-red-400'}`}>
                   Policy {result === 'ALLOW' ? 'Authorized' : 'Violation Detected'}
                </p>
                <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed italic">
                  {result === 'ALLOW' ? 'Request satisfies all sovereignty constraints. Proceeding with export.' : 'PII export crossing sovereign boundaries without anonymization detected. Gated.'}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
