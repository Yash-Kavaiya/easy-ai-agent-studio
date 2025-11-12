/**
 * Agent Configuration Types
 */

export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  primaryModel: string;
  fallbackModels: string[];
  maxIterations: number;
  timeout: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentExecution {
  id: string;
  agentId: string;
  status: ExecutionStatus;
  startTime: Date;
  endTime?: Date;
  input: any;
  output?: any;
  logs: ExecutionLog[];
  metrics: ExecutionMetrics;
}

export type ExecutionStatus = 'idle' | 'running' | 'paused' | 'completed' | 'error';

export interface ExecutionLog {
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  nodeId?: string;
  data?: any;
}

export interface ExecutionMetrics {
  tokensUsed: number;
  cost: number;
  latency: number;
  toolsCalled: number;
}
