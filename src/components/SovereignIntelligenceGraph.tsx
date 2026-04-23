import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Network, Shield, Brain, BookOpen } from 'lucide-react';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: 'legal' | 'tech' | 'agent';
  label: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  value: number;
}

const DATA: { nodes: Node[], links: Link[] } = {
  nodes: [
    { id: 'GDPR', group: 'legal', label: 'GDPR Art. 44' },
    { id: 'EUAI', group: 'legal', label: 'EU AI Act v2' },
    { id: 'PII', group: 'tech', label: 'Sovereign PII Vault' },
    { id: 'SLM', group: 'tech', label: 'Local SLM (Llama4)' },
    { id: 'CLOUD', group: 'tech', label: 'Global Cloud Node' },
    { id: 'AUDITOR', group: 'agent', label: 'Auditor Agent' },
    { id: 'RESEARCHER', group: 'agent', label: 'Researcher Agent' },
    { id: 'FIXER', group: 'agent', label: 'Fixer Agent' },
  ],
  links: [
    { source: 'AUDITOR', target: 'PII', value: 2 },
    { source: 'RESEARCHER', target: 'GDPR', value: 2 },
    { source: 'RESEARCHER', target: 'EUAI', value: 2 },
    { source: 'FIXER', target: 'SLM', value: 2 },
    { source: 'FIXER', target: 'PII', value: 1 },
    { source: 'AUDITOR', target: 'RESEARCHER', value: 3 },
    { source: 'RESEARCHER', target: 'FIXER', value: 3 },
    { source: 'SLM', target: 'CLOUD', value: 1 },
    { source: 'PII', target: 'SLM', value: 4 },
  ]
};

export default function SovereignIntelligenceGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 500;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation<Node>(DATA.nodes)
      .force('link', d3.forceLink<Node, Link>(DATA.links).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .selectAll('line')
      .data(DATA.links)
      .join('line')
      .attr('stroke', '#1E1E1E')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.sqrt(d.value));

    const node = svg.append('g')
      .selectAll('g')
      .data(DATA.nodes)
      .join('g')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    node.append('circle')
      .attr('r', 25)
      .attr('fill', d => {
        if (d.group === 'legal') return '#ef444433';
        if (d.group === 'tech') return '#0ea5e933';
        return '#f59e0b33';
      })
      .attr('stroke', d => {
        if (d.group === 'legal') return '#ef4444';
        if (d.group === 'tech') return '#0ea5e9';
        return '#f59e0b';
      })
      .attr('stroke-width', 2);

    node.append('text')
      .attr('dy', 40)
      .attr('text-anchor', 'middle')
      .attr('fill', '#888')
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-mono)')
      .attr('font-weight', 'bold')
      .text(d => d.label.toUpperCase());

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tighter uppercase flex items-center gap-3">
            <Network className="text-sky-500" />
            Intelligence Graph (GraphRAG)
          </h2>
          <p className="text-neutral-500 text-[10px] mt-1 uppercase tracking-widest font-mono italic">Ontological relationships between law and logic</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/30 border border-red-500" />
            <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-widest">Legal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-500/30 border border-sky-500" />
            <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-widest">Tech</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500/30 border border-amber-500" />
            <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-widest">Agent</span>
          </div>
        </div>
      </header>

      <div ref={containerRef} className="rounded border border-neutral-800 bg-[#020202] overflow-hidden relative min-h-[500px]">
        <svg ref={svgRef} className="w-full h-full cursor-crosshair" />
        
        <div className="absolute bottom-6 left-6 grid grid-cols-1 gap-4 max-w-xs">
          <div className="p-4 rounded bg-neutral-900 border border-neutral-800 space-y-2">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Shield size={12} className="text-sky-500" /> Integrity Verification
            </h4>
            <p className="text-[10px] text-neutral-500 leading-relaxed italic">
              Agents use this graph to traverse cross-border legal interpretations without exposing localized raw data.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded bg-neutral-900 border border-neutral-800 space-y-4">
          <Brain className="text-sky-500" size={24} />
          <h3 className="text-xs font-bold text-white uppercase tracking-widest">Sovereign Reasoning</h3>
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            The graph acts as the memory layer for the multi-agent loop, allowing for zero-trust reasoning.
          </p>
        </div>
        <div className="p-6 rounded bg-neutral-900 border border-neutral-800 space-y-4">
          <BookOpen className="text-red-500" size={24} />
          <h3 className="text-xs font-bold text-white uppercase tracking-widest">Regulatory Mapping</h3>
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            Direct linking of GDPR/CCPA statutes to technical audit tasks ensuring full traceability.
          </p>
        </div>
        <div className="p-6 rounded bg-black border border-neutral-800 flex items-center justify-center">
          <p className="text-[9px] text-neutral-600 font-mono uppercase tracking-[0.2em] text-center">
            System: GraphRAG_Sync <br/> [STABLE]
          </p>
        </div>
      </div>
    </div>
  );
}
