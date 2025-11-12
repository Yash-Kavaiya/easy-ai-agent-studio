/**
 * Tool and Action Types
 */

export enum ToolCategory {
  WEB = 'web',
  HTTP = 'http',
  FILE = 'file',
  MATH = 'math',
  TEXT = 'text',
  JSON = 'json',
  DATE = 'date',
  AI = 'ai',
  CUSTOM = 'custom'
}

export enum ParameterType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  ARRAY = 'array',
  OBJECT = 'object',
  FILE = 'file'
}

export interface ToolParameter {
  name: string;
  type: ParameterType;
  description: string;
  required: boolean;
  default?: any;
  options?: any[]; // For enum-like parameters
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

export interface ToolConfig {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon?: string;
  version: string;
  author?: string;
  parameters: ToolParameter[];
  returnType: ParameterType;
  isAsync: boolean;
  requiresAuth?: boolean;
  tags: string[];
  examples?: ToolExample[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ToolExample {
  description: string;
  input: Record<string, any>;
  output: any;
}

export interface ToolExecution {
  toolId: string;
  parameters: Record<string, any>;
  startTime: number;
  endTime?: number;
  result?: any;
  error?: string;
  status: 'pending' | 'running' | 'success' | 'error';
}

export interface CustomToolCode {
  id: string;
  toolId: string;
  code: string;
  language: 'javascript' | 'typescript';
  dependencies?: string[];
}

// Built-in tool result types
export interface WebSearchResult {
  title: string;
  url: string;
  snippet: string;
  source: string;
}

export interface HttpResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
}

export interface FileOperationResult {
  success: boolean;
  path?: string;
  content?: string;
  size?: number;
  error?: string;
}
