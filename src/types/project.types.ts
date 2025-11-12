/**
 * Project and Settings Types
 */

import { AgentConfig } from './agent.types';
import { WorkflowData } from './workflow.types';
import { Document, KnowledgeBaseConfig } from './knowledge.types';
import { Tool } from './tools.types';
import { ModelConfig } from './model.types';

export interface Project {
  id: string;
  name: string;
  description: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;

  // Configuration
  agent: AgentConfig;
  workflow: WorkflowData;
  knowledge: KnowledgeBaseData;
  models: ModelConfig[];
  tools: Tool[];

  // Testing
  testSuites: TestSuite[];

  // Settings
  settings: ProjectSettings;

  // Metadata
  metadata: ProjectMetadata;
}

export interface KnowledgeBaseData {
  documents: Document[];
  config: KnowledgeBaseConfig;
}

export interface TestSuite {
  id: string;
  name: string;
  testCases: TestCase[];
  createdAt: Date;
}

export interface TestCase {
  id: string;
  name: string;
  description: string;
  input: any;
  expectedOutput?: any;
  assertions: Assertion[];
  status?: TestStatus;
  result?: TestResult;
}

export type TestStatus = 'pending' | 'running' | 'passed' | 'failed';

export interface Assertion {
  type: 'equals' | 'contains' | 'matches' | 'custom';
  field: string;
  expected: any;
  actual?: any;
}

export interface TestResult {
  passed: boolean;
  duration: number;
  output: any;
  errors: string[];
  logs: any[];
}

export interface ProjectSettings {
  autoSave: boolean;
  autoSaveInterval: number;
  theme: 'dark' | 'light';
  debugMode: boolean;
}

export interface ProjectMetadata {
  author: string;
  tags: string[];
  category: string;
  isTemplate: boolean;
}

// Export/Import Types
export enum ExportFormat {
  JSON = 'json',
  ZIP = 'zip',
  LANGCHAIN = 'langchain',
  OPENAPI = 'openapi',
  MARKDOWN = 'markdown'
}

export interface ExportOptions {
  format: ExportFormat;
  includeKnowledge: boolean;
  includeTests: boolean;
  includeHistory: boolean;
  encrypted: boolean;
  password?: string;
}

export interface ImportOptions {
  merge: boolean;
  overwrite: boolean;
  validateSchema: boolean;
}
