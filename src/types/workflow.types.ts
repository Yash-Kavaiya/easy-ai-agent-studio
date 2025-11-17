/**
 * Workflow and Node Types
 */

import { Node, Edge } from 'reactflow';

export enum NodeType {
  START = 'start',
  AI_AGENT = 'ai_agent',
  TOOL = 'tool',
  CONDITION = 'condition',
  LOOP = 'loop',
  TRANSFORM = 'transform',
  MERGE = 'merge',
  HUMAN_INPUT = 'human',
  KNOWLEDGE = 'knowledge',
  END = 'end'
}

export interface WorkflowNode extends Node {
  type: NodeType;
  data: NodeData;
}

export type WorkflowEdge = Edge & {
  animated?: boolean;
  label?: string;
};

export interface WorkflowData {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

// Node Data Types
export type NodeData =
  | AIAgentNodeData
  | ToolNodeData
  | ConditionNodeData
  | LoopNodeData
  | TransformNodeData
  | KnowledgeNodeData
  | HumanInputNodeData
  | BaseNodeData;

export enum NodeExecutionStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  COMPLETED = 'completed',
  ERROR = 'error',
  SKIPPED = 'skipped'
}

export interface BaseNodeData {
  label: string;
  description?: string;
  executionStatus?: NodeExecutionStatus;
  executionError?: string;
}

export interface AIAgentNodeData extends BaseNodeData {
  model: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  tools: string[];
}

export interface ToolNodeData extends BaseNodeData {
  toolId: string;
  parameters: Record<string, any>;
  timeout: number;
}

export interface ConditionNodeData extends BaseNodeData {
  expression: string;
  operator: 'equals' | 'contains' | 'greater' | 'less' | 'regex';
  value: any;
}

export interface LoopNodeData extends BaseNodeData {
  iterableField: string;
  iterable: string;
  itemVariable: string;
  maxIterations: number;
}

export interface TransformNodeData extends BaseNodeData {
  transformType: 'map' | 'filter' | 'reduce' | 'custom';
  code: string;
  transformScript: string;
  outputMapping: Record<string, any>;
}

export interface KnowledgeNodeData extends BaseNodeData {
  knowledgeBaseId: string;
  query: string;
  topK: number;
  threshold: number;
}

export interface HumanInputNodeData extends BaseNodeData {
  prompt: string;
  inputType: 'text' | 'number' | 'select' | 'choice' | 'file';
  options?: string[];
  variableName: string;
}

// Workflow Execution Context
export interface ExecutionContext {
  variables: Record<string, any>;
  currentNodeId: string;
  history: string[];
}
