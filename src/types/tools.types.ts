/**
 * Tools and Actions Types
 */

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  schema: ToolSchema;
  implementation: ToolImplementation;
  enabled: boolean;
}

export enum ToolCategory {
  WEB = 'web',
  DATABASE = 'database',
  FILE = 'file',
  CODE = 'code',
  INTEGRATION = 'integration',
  CUSTOM = 'custom'
}

export interface ToolSchema {
  input: JSONSchema;
  output: JSONSchema;
}

export interface JSONSchema {
  type: string;
  properties?: Record<string, any>;
  required?: string[];
  [key: string]: any;
}

export interface ToolImplementation {
  type: 'http' | 'javascript' | 'python' | 'builtin';
  code?: string;
  config: ToolConfig;
}

export interface ToolConfig {
  timeout?: number;
  retries?: number;
  rateLimit?: RateLimitConfig;
  auth?: AuthConfig;
  [key: string]: any;
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface AuthConfig {
  type: 'none' | 'apiKey' | 'oauth' | 'basic';
  credentials?: Record<string, string>;
}

export interface HTTPToolConfig extends ToolConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
}

export interface ToolExecution {
  id: string;
  toolId: string;
  input: any;
  output?: any;
  status: 'pending' | 'running' | 'success' | 'error';
  startTime: Date;
  endTime?: Date;
  error?: string;
}
