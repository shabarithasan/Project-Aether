import React, { useState } from 'react';
import { 
  FolderTree, 
  FileCode, 
  Copy, 
  Check, 
  Coffee, 
  Terminal,
  Zap,
  Box,
  FileJson
} from 'lucide-react';

const DIRECTORY_STRUCTURE = `
project-aether/
├── sovereign_hub/          # Local Node (Sovereignty Layer)
│   ├── slm_core/           # Local Llama 4/DeepSeek Inference
│   ├── pii_scrubber.py     # Differential Privacy & Hashing
│   └── secure_vault.db     # Fragmented Identity Store
├── global_cloud/           # Public Reasoner (Intelligence Layer)
│   ├── agents/             # Auditor, Researcher, Fixer
│   ├── graph_rag/          # Neo4j Ontological Indexing
│   └── analytics_bridge.py # Privacy-Aware Connector
├── infrastructure/         # DevSecOps (Shift-Left)
│   ├── opa_policies/       # Policy-as-Code Compliance
│   └── observability/      # OpenTelemetry p95 Collectors
├── tests/                  # Integrity Validation
└── docker-compose.yml      # Hybrid Local-Cloud Stack
`;

const BOILERPLATE_CODE = `
# aether/global_cloud/agents/loop.py
from typing import TypedDict, List
from aether.sovereign_hub import local_scrubber
from aether.global_cloud.graph_rag import KnowledgeGraph

class AgentState(TypedDict):
    logs: List[str]
    compliance_status: float
    is_safe_to_export: bool

def react_agent_loop(request_payload: dict):
    """
    Sovereign Multi-Agent ReAct Loop
    Bridges Local PII with Global Intelligence
    """
    # 1. AUDITOR: Scan local metadata for PII leaks
    leaks = local_scrubber.detect_pii(request_payload)
    
    if leaks:
        # 2. RESEARCHER: Interpret vs Neo4j GraphRAG
        rule_interpretation = KnowledgeGraph.query_statute("GDPR Article 44")
        
        # 3. FIXER: Apply Local SLM Pseudonymization
        remediated_payload = local_scrubber.apply_noise(
            request_payload, 
            method="differential_privacy"
        )
        
        # 4. REVIEWER: Verify and Sign Audit Trail
        local_scrubber.sign_audit_ledger(remediated_payload)
        
    return remediated_payload
`;

export default function DevScaffold() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      <header className="space-y-4">
        <h2 className="text-3xl font-bold text-white tracking-tighter uppercase flex items-center gap-3">
          <Terminal size={28} className="text-sky-500" />
          Technical Scaffold
        </h2>
        <p className="text-neutral-500 max-w-2xl text-sm italic">
          Complete production-ready directory structure and core ReAct agent boilerplate. 
          Focus on the **Sovereignty Layer** integration and local SLM coupling.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Directory Structure */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 flex items-center gap-2">
              <FolderTree size={12} className="text-neutral-700" /> Repo Structure
            </h4>
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
            </div>
          </div>
          <div className="relative group">
            <pre className="p-8 rounded bg-[#020202] border border-neutral-800 font-mono text-[11px] text-neutral-400 leading-relaxed overflow-x-auto custom-scrollbar">
              {DIRECTORY_STRUCTURE}
            </pre>
            <button 
              onClick={() => copyToClipboard(DIRECTORY_STRUCTURE, 'dir')}
              className="absolute top-4 right-4 p-2 rounded bg-neutral-900 border border-neutral-800 text-neutral-500 opacity-0 group-hover:opacity-100 transition-all hover:text-white"
            >
              {copied === 'dir' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
          </div>
          <div className="p-5 rounded bg-neutral-900 border border-neutral-800 flex gap-4 items-center">
            <Box size={24} className="text-sky-500 shrink-0" />
            <p className="text-[11px] text-neutral-500 leading-relaxed italic">
              <span className="text-white font-bold not-italic mr-2">TEE Enclave:</span>
              The `/sovereign_hub` is designed to run in a localized Trusted Execution Environment 
              to prevent unauthorized memory scraping from the public host.
            </p>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 flex items-center gap-2">
              <FileCode size={12} className="text-neutral-700" /> ReAct Python Core
            </h4>
            <div className="flex gap-2 items-center">
               <FileJson size={12} className="text-neutral-700" />
               <span className="text-[10px] font-mono text-neutral-700 uppercase">loop.py</span>
            </div>
          </div>
          <div className="relative group">
            <pre className="p-8 rounded bg-[#020202] border border-neutral-800 font-mono text-[11px] text-neutral-400 leading-relaxed overflow-x-auto min-h-[400px] custom-scrollbar">
              <code className="text-sky-400 whitespace-pre">
                {BOILERPLATE_CODE}
              </code>
            </pre>
            <button 
              onClick={() => copyToClipboard(BOILERPLATE_CODE, 'code')}
              className="absolute top-4 right-4 p-2 rounded bg-neutral-900 border border-neutral-800 text-neutral-500 opacity-0 group-hover:opacity-100 transition-all hover:text-white"
            >
              {copied === 'code' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* Tech Stack Callout */}
      <div className="p-8 rounded bg-neutral-900/50 border border-neutral-800">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-600 mb-8 flex items-center justify-center gap-3">
          <Zap size={14} className="text-sky-400" /> 2026 Core Infrastructure Level
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'FastAPI', icon: '⚡' },
            { name: 'Neo4j', icon: '🕸️' },
            { name: 'Ollama', icon: '🦙' },
            { name: 'Snyk/OPA', icon: '🛡️' },
            { name: 'LangGraph', icon: '⛓️' },
            { name: 'OTel', icon: '👁️' },
          ].map((tech, i) => (
            <div key={i} className="flex flex-col items-center gap-3 p-4 rounded bg-black border border-neutral-800 group hover:border-sky-500/30 transition-all">
              <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{tech.icon}</span>
              <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-8 border-t border-neutral-800">
        <div className="flex items-center gap-3 text-neutral-600 text-[11px] uppercase tracking-[0.2em] font-bold italic">
           Project Aether / Sovereign Audit System / v1.0.4-stable
        </div>
      </div>
    </div>
  );
}
