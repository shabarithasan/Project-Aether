import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  RotateCcw, 
  Search, 
  ShieldAlert, 
  Wrench, 
  FileCheck,
  Terminal as TerminalIcon,
  Activity,
  DollarSign,
  Clock,
  Check,
  CheckCircle2,
  Cpu as CpuIcon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const METRIC_DATA = [
  { time: 'T-60', latency: 2.1, cost: 0.042 },
  { time: 'T-50', latency: 1.8, cost: 0.038 },
  { time: 'T-40', latency: 2.4, cost: 0.045 },
  { time: 'T-30', latency: 2.2, cost: 0.041 },
  { time: 'T-20', latency: 1.9, cost: 0.039 },
  { time: 'T-10', latency: 2.15, cost: 0.043 },
  { time: 'NOW', latency: 2.05, cost: 0.044 },
];

const STEPS = [
  { 
    agent: 'Auditor', 
    icon: Search, 
    color: 'text-blue-400', 
    bg: 'bg-blue-500/10',
    title: 'Identity Scan & Regulatory Conflict Detection',
    description: 'Scanning Sovereignty Node logstream for PII leaks in cross-border analytics export.',
    log: [
      '[SYSTEM] Initializing audit on vault_node_alpha',
      '[AUDIT] Detecting sensitive entity: USER_EMAIL_0492',
      '[CONFLICT] EU-GDPR Art. 44 conflict: Export attempt to GCP_ASIA_WEST'
    ]
  },
  { 
    agent: 'Researcher', 
    icon: ShieldAlert, 
    color: 'text-amber-400', 
    bg: 'bg-amber-500/10',
    title: 'GraphRAG Legal Interpretation',
    description: 'Querying Neo4j Knowledge Graph for sovereign data interpretation vs local statutes.',
    log: [
      '[QUERY] Neo4j Lookup: (Entity:PII)-[:GOVERNED_BY]->(Rule:GDPR)',
      '[RESULT] Mandatory pseudonymization requirement identified.',
      '[CITATION] Recital 26: Anonymous info does not relate to an identified person.'
    ]
  },
  { 
    agent: 'Fixer', 
    icon: Wrench, 
    color: 'text-indigo-400', 
    bg: 'bg-indigo-500/10',
    title: 'Automated Remediation Execution',
    description: 'Executing local SLM instructions to apply Differential Privacy noise and local-hashing.',
    log: [
      '[FIX] Invoking Llama-4-SLM Local PSQL Hash',
      '[CRYPT] SaltedSHA256 applied to identified fields',
      '[EXPORT] Rerouting cleaned data packet to Cloud reasoning layer'
    ]
  },
  { 
    agent: 'Reviewer', 
    icon: FileCheck, 
    color: 'text-emerald-400', 
    bg: 'bg-emerald-500/10',
    title: 'Audit-Trail Solidification',
    description: 'Verifying remediation efficacy and logging the change to the Immutable Sovereignty Ledger.',
    log: [
      '[VERIFY] Compliance check: 100% anonymization confirmed.',
      '[LEDGER] Entry committed to AETHER_CHAIN_01',
      '[STATUS] MTTR: 1.84s | SVI: 0.98'
    ]
  }
];

export default function AgentSimulation() {
  const [isRunning, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const startSim = () => {
    setRunning(true);
    setCurrentStep(0);
    setLogs([]);
  };

  const resetSim = () => {
    setRunning(false);
    setCurrentStep(-1);
    setLogs([]);
  };

  useEffect(() => {
    if (isRunning && currentStep < STEPS.length) {
      const step = STEPS[currentStep];
      let lineIndex = 0;
      
      const interval = setInterval(() => {
        if (lineIndex < step.log.length) {
          setLogs(prev => [...prev, step.log[lineIndex]]);
          lineIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentStep(prev => prev + 1);
          }, 1000);
        }
      }, 800);

      return () => clearInterval(interval);
    } else if (currentStep === STEPS.length) {
      setRunning(false);
    }
  }, [isRunning, currentStep]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 pb-12">
      
      {/* Simulation Control & State */}
      <div className="xl:col-span-8 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tighter uppercase flex items-center gap-3">
              <TerminalIcon className="text-sky-500" />
              Sovereign Reasoner Loop
            </h2>
            <p className="text-neutral-500 text-[10px] mt-1 uppercase tracking-widest font-mono">Status: Auditor-Researcher-Fixer-Reviewer</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={isRunning ? undefined : (currentStep === -1 ? startSim : resetSim)}
              disabled={isRunning}
              className={`flex items-center gap-2 px-6 py-2 rounded font-bold text-xs uppercase tracking-widest transition-all ${
                isRunning 
                  ? 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800' 
                  : currentStep === -1 
                    ? 'bg-sky-600 text-white hover:bg-sky-500 active:scale-95 border border-sky-400/50' 
                    : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30'
              }`}
            >
              {currentStep === -1 ? <><Play size={14} fill="currentColor" /> Initialize Audit</> : <><RotateCcw size={14} /> Reset Cycle</>}
            </button>
          </div>
        </header>

        {/* Step Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = currentStep > idx;
            const isActive = currentStep === idx;
            return (
              <div 
                key={idx}
                className={`relative p-5 rounded border transition-all duration-500 ${
                  isActive 
                    ? 'bg-sky-500/5 border-sky-500/40 shadow-[0_0_20px_rgba(14,165,233,0.1)]' 
                    : isCompleted
                      ? 'bg-emerald-500/5 border-emerald-500/20'
                      : 'bg-neutral-900 border-neutral-800'
                }`}
              >
                <div className={`w-10 h-10 rounded flex items-center justify-center mb-4 transition-colors ${
                  isActive ? 'bg-sky-500/10' : isCompleted ? 'bg-emerald-500/20' : 'bg-neutral-800'
                }`}>
                  <Icon size={18} className={isActive ? 'text-sky-400' : isCompleted ? 'text-emerald-400' : 'text-neutral-600'} />
                </div>
                <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isActive ? 'text-white' : 'text-neutral-600'}`}>Agent 0{idx + 1}</h3>
                <p className={`text-[10px] font-mono uppercase ${isActive ? 'text-sky-300' : isCompleted ? 'text-emerald-500' : 'text-neutral-500'}`}>
                  {step.agent}
                </p>
                {isCompleted && (
                  <div className="absolute top-4 right-4">
                    <Check size={12} className="text-emerald-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Step Details */}
        <AnimatePresence mode="wait">
          {currentStep >= 0 && currentStep < STEPS.length ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 rounded bg-neutral-900 border border-neutral-800 relative"
            >
              <div className="flex gap-6 items-center">
                <div className={`p-4 rounded bg-neutral-800 border border-neutral-700`}>
                  {React.createElement(STEPS[currentStep].icon, { className: 'text-sky-400', size: 28 })}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">{STEPS[currentStep].title}</h3>
                  <p className="text-neutral-500 text-sm italic">"{STEPS[currentStep].description}"</p>
                </div>
              </div>
            </motion.div>
          ) : currentStep === STEPS.length ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-10 rounded bg-emerald-500/5 border border-emerald-500/20 text-center space-y-4"
            >
              <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Cycle Validated</h3>
              <p className="text-emerald-400 font-mono tracking-widest text-[10px] uppercase">Compliance: AUTHENTICATED | MTTR: 1.84s</p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Real-time Console */}
        <div className="rounded bg-[#020202] border border-neutral-800 overflow-hidden flex flex-col h-[300px]">
          <div className="px-4 py-2 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
            <div className="flex gap-2 items-center">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-neutral-800" />
                <div className="w-2 h-2 rounded-full bg-neutral-800" />
                <div className="w-2 h-2 rounded-full bg-neutral-800" />
              </div>
              <span className="text-[9px] font-mono text-neutral-600 ml-4 font-bold tracking-widest uppercase">Stream: Agent_Core_Audit</span>
            </div>
          </div>
          <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto custom-scrollbar space-y-1">
            {logs.length === 0 && <span className="text-neutral-800 italic uppercase">System Idle... Waiting for Node initialization</span>}
            {logs.map((log, i) => (
              <div key={i} className="flex gap-3 items-start border-l border-neutral-800 pl-4 py-0.5">
                <span className="text-neutral-700 shrink-0">{new Date().toLocaleTimeString([], { hour12: false, second: '2-digit' })}</span>
                <span className={
                  log.includes('[AUDIT]') ? 'text-sky-400' : 
                  log.includes('[FIX]') ? 'text-indigo-400' :
                  log.includes('[CONFLICT]') ? 'text-red-400' :
                  log.includes('[LEDGER]') ? 'text-emerald-400' : 'text-neutral-500'
                }>{log}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>

      {/* Observability Panel */}
      <div className="xl:col-span-4 space-y-6">
        <div className="p-6 rounded bg-neutral-900 border border-neutral-800 space-y-6 relative overflow-hidden">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-6 flex items-center gap-2">
              <Activity size={12} className="text-sky-500" /> Observation Hub
            </h3>
            
            <div className="space-y-8">
              {/* Latency Metric */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">p95 Latency</p>
                    <p className="text-2xl font-mono text-white leading-none tracking-tighter">1.82s</p>
                  </div>
                  <p className="text-[9px] text-emerald-500 font-bold uppercase">Optimal</p>
                </div>
                <div className="h-20 w-full border-b border-neutral-800">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={METRIC_DATA}>
                      <Line type="step" dataKey="latency" stroke="#0ea5e9" strokeWidth={1} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Cost Metric */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">Efficiency</p>
                    <p className="text-2xl font-mono text-white leading-none tracking-tighter">$0.042</p>
                  </div>
                  <p className="text-[9px] text-neutral-500 font-bold uppercase italic">/OP</p>
                </div>
                <div className="h-20 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={METRIC_DATA}>
                      <Line type="step" dataKey="cost" stroke="#22c55e" strokeWidth={1} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Node Registry */}
        <div className="p-6 rounded bg-black border border-neutral-800 space-y-4">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-600">Active Registry</span>
          <div className="space-y-2">
            {[
              { name: 'Sovereign_Alpha_01', health: 100 },
              { name: 'Sovereign_Beta_04', health: 92 },
              { name: 'Global_Cloud_Aggregator', health: 100 },
            ].map((node, i) => (
              <div key={i} className="flex justify-between items-center p-2 border-b border-neutral-900 last:border-0">
                <span className="text-[10px] font-mono text-neutral-500">{node.name}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
