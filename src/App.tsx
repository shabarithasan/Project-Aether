import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Map, 
  Terminal, 
  Code2, 
  Briefcase, 
  LayoutDashboard,
  Cpu,
  Globe,
  Database,
  Lock,
  ChevronRight,
  Menu,
  X,
  Network,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ArchitectureVisualizer from './components/ArchitectureVisualizer';
import FeatureRoadmap from './components/FeatureRoadmap';
import CareerBlueprint from './components/CareerBlueprint';
import DevScaffold from './components/DevScaffold';
import AgentSimulation from './components/AgentSimulation';
import SovereignIntelligenceGraph from './components/SovereignIntelligenceGraph';
import PolicyPlayground from './components/PolicyPlayground';

export default function App() {
  const [activeTab, setActiveTab] = useState('arch');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const tabs = [
    { id: 'arch', label: 'Architecture', icon: LayoutDashboard },
    { id: 'sim', label: 'Reasoner Loop', icon: Terminal },
    { id: 'graph', label: 'Intelligence Graph', icon: Network },
    { id: 'policy', label: 'Enforcement Engine', icon: Lock },
    { id: 'roadmap', label: 'Feature Roadmap', icon: Map },
    { id: 'resume', label: 'Career Blueprint', icon: Briefcase },
    { id: 'scaffold', label: 'Dev Scaffold', icon: Code2 },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-neutral-300 font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="border-r border-neutral-800 bg-[#0A0A0A] flex flex-col z-50"
      >
        <div className="p-6 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold tracking-tighter text-white uppercase"
              >
                PROJECT AETHER
              </motion.span>
            )}
          </div>
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-white/5 rounded-md text-neutral-500"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-all ${
                  isActive 
                    ? 'bg-neutral-800 text-sky-400 border border-neutral-700' 
                    : 'text-neutral-500 hover:bg-white/5 hover:text-neutral-200'
                }`}
              >
                <Icon size={isSidebarOpen ? 18 : 22} />
                {isSidebarOpen && <span className="font-bold text-xs uppercase tracking-widest">{tab.label}</span>}
                {isActive && isSidebarOpen && (
                  <motion.div layoutId="active-indicator" className="ml-auto w-1 h-3 bg-sky-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <div className={`flex items-center gap-3 p-3 rounded bg-neutral-900 border border-neutral-800 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-400">ARC</div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase tracking-tight">Principal Architect</span>
                <span className="text-[9px] text-neutral-600 uppercase tracking-widest font-mono">Sovereign Cluster</span>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-neutral-800 bg-[#050505]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5 items-center px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Live</span>
            </div>
            <div className="h-4 w-px bg-neutral-800" />
            <div className="flex gap-4 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Cpu size={12} /> Local: 127.0.0.1</span>
              <span className="flex items-center gap-1.5"><Globe size={12} /> Global: cloud.as-dev.run</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-tighter">System Output</span>
              <span className="text-xs font-mono text-sky-400">98.4% F1 ACCURACY</span>
            </div>
            <div className="h-8 w-px bg-neutral-800 mx-2" />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800">
              <Database size={14} className="text-neutral-500" />
              <span className="text-[10px] font-mono text-neutral-400 uppercase">NODE_01</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#050505]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'arch' && <ArchitectureVisualizer />}
              {activeTab === 'sim' && <AgentSimulation />}
              {activeTab === 'graph' && <SovereignIntelligenceGraph />}
              {activeTab === 'policy' && <PolicyPlayground />}
              {activeTab === 'roadmap' && <FeatureRoadmap />}
              {activeTab === 'resume' && <CareerBlueprint />}
              {activeTab === 'scaffold' && <DevScaffold />}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Footer info bar */}
        <footer className="h-8 border-t border-neutral-800 bg-[#050505] px-6 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-4 text-[9px] font-mono text-neutral-600">
            <span>AUDIT_STREAM: ACTIVE</span>
            <span>POLICY_CORE: ENFORCED</span>
          </div>
          <div className="flex items-center gap-4 text-[9px] font-mono text-neutral-600">
            <span className="flex items-center gap-1"><Lock size={10} /> SOC2_COMPLIANT</span>
            <span>&copy; 2026 AETHER SYSTEMS</span>
          </div>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}} />
    </div>
  );
}
