/**
 * Application Settings Types
 */

import { ProviderConfig } from './model.types';
import { KnowledgeBaseConfig } from './knowledge.types';

export interface AppSettings {
  // Agent Settings
  agent: AgentSettings;

  // Model Config
  models: ModelsSettings;

  // Knowledge Base
  knowledge: KnowledgeBaseConfig;

  // Workflow
  workflow: WorkflowSettings;

  // UI/UX
  ui: UISettings;

  // Storage
  storage: StorageSettings;

  // Advanced
  advanced: AdvancedSettings;
}

export interface AgentSettings {
  defaultModel: string;
  defaultTemperature: number;
  maxRetries: number;
  timeout: number;
  enableStreaming: boolean;
  saveHistory: boolean;
}

export interface ModelsSettings {
  providers: ProviderConfig[];
  defaultProvider: string;
  fallbackEnabled: boolean;
  costLimit: number;
  tokenLimit: number;
}

export interface WorkflowSettings {
  autoSave: boolean;
  autoSaveInterval: number;
  maxExecutionTime: number;
  parallelExecution: boolean;
}

export interface UISettings {
  theme: 'dark' | 'light' | 'system';
  accentColor: string;
  fontSize: 'small' | 'medium' | 'large';
  showLineNumbers: boolean;
  enableAnimations: boolean;
  compactMode: boolean;
}

export interface StorageSettings {
  maxStorageSize: number;
  compressionEnabled: boolean;
  encryptionEnabled: boolean;
  clearOnExit: boolean;
}

export interface AdvancedSettings {
  debugMode: boolean;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
  telemetryEnabled: boolean;
  experimentalFeatures: boolean;
  performanceMode: boolean;
}

// Default Settings
export const DEFAULT_SETTINGS: AppSettings = {
  agent: {
    defaultModel: 'gpt-3.5-turbo',
    defaultTemperature: 0.7,
    maxRetries: 3,
    timeout: 30000,
    enableStreaming: true,
    saveHistory: true
  },
  models: {
    providers: [],
    defaultProvider: 'openai',
    fallbackEnabled: true,
    costLimit: 100,
    tokenLimit: 1000000
  },
  knowledge: {
    chunkSize: 1000,
    chunkOverlap: 200,
    embeddingModel: 'text-embedding-3-small',
    maxDocuments: 100,
    autoUpdate: true
  },
  workflow: {
    autoSave: true,
    autoSaveInterval: 30000,
    maxExecutionTime: 300000,
    parallelExecution: true
  },
  ui: {
    theme: 'dark',
    accentColor: '#76B900',
    fontSize: 'medium',
    showLineNumbers: true,
    enableAnimations: true,
    compactMode: false
  },
  storage: {
    maxStorageSize: 100 * 1024 * 1024, // 100MB
    compressionEnabled: true,
    encryptionEnabled: false,
    clearOnExit: false
  },
  advanced: {
    debugMode: false,
    logLevel: 'info',
    telemetryEnabled: false,
    experimentalFeatures: false,
    performanceMode: false
  }
};
