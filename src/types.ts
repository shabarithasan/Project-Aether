/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AgentStep {
  agent: 'Auditor' | 'Researcher' | 'Fixer' | 'Reviewer';
  action: string;
  status: 'pending' | 'processing' | 'completed';
  details?: string;
}

export interface MetricPoint {
  time: string;
  latency: number;
  cost: number;
}
