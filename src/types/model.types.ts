/**
 * AI Model Configuration Types
 */

export interface ModelConfig {
  id: string;
  provider: ModelProvider;
  model: string;
  apiKey?: string;
  baseURL?: string;

  // Parameters
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxTokens: number;
  stop: string[];

  // Advanced
  streaming: boolean;
  jsonMode: boolean;
  seed?: number;

  // Metadata
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ModelProvider = 'openai' | 'anthropic' | 'ollama' | 'cohere' | 'nvidia' | 'custom';

export interface ModelInfo {
  id: string;
  name: string;
  provider: ModelProvider;
  contextWindow: number;
  maxOutput: number;
  pricing: ModelPricing;
  capabilities: ModelCapabilities;
}

export interface ModelPricing {
  input: number; // cost per 1M tokens
  output: number; // cost per 1M tokens
  currency: string;
}

export interface ModelCapabilities {
  streaming: boolean;
  jsonMode: boolean;
  functionCalling: boolean;
  vision: boolean;
  multimodal: boolean;
}

export interface ProviderConfig {
  provider: ModelProvider;
  apiKey: string;
  baseURL?: string;
  enabled: boolean;
  models: string[];
}

// Available Models
export const AVAILABLE_MODELS: Record<ModelProvider, ModelInfo[]> = {
  openai: [
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      provider: 'openai',
      contextWindow: 128000,
      maxOutput: 4096,
      pricing: { input: 10, output: 30, currency: 'USD' },
      capabilities: {
        streaming: true,
        jsonMode: true,
        functionCalling: true,
        vision: true,
        multimodal: true
      }
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'openai',
      contextWindow: 8192,
      maxOutput: 4096,
      pricing: { input: 30, output: 60, currency: 'USD' },
      capabilities: {
        streaming: true,
        jsonMode: true,
        functionCalling: true,
        vision: false,
        multimodal: false
      }
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'openai',
      contextWindow: 16385,
      maxOutput: 4096,
      pricing: { input: 0.5, output: 1.5, currency: 'USD' },
      capabilities: {
        streaming: true,
        jsonMode: true,
        functionCalling: true,
        vision: false,
        multimodal: false
      }
    }
  ],
  anthropic: [
    {
      id: 'claude-3-opus-20240229',
      name: 'Claude 3 Opus',
      provider: 'anthropic',
      contextWindow: 200000,
      maxOutput: 4096,
      pricing: { input: 15, output: 75, currency: 'USD' },
      capabilities: {
        streaming: true,
        jsonMode: false,
        functionCalling: true,
        vision: true,
        multimodal: true
      }
    },
    {
      id: 'claude-3-sonnet-20240229',
      name: 'Claude 3 Sonnet',
      provider: 'anthropic',
      contextWindow: 200000,
      maxOutput: 4096,
      pricing: { input: 3, output: 15, currency: 'USD' },
      capabilities: {
        streaming: true,
        jsonMode: false,
        functionCalling: true,
        vision: true,
        multimodal: true
      }
    },
    {
      id: 'claude-3-haiku-20240307',
      name: 'Claude 3 Haiku',
      provider: 'anthropic',
      contextWindow: 200000,
      maxOutput: 4096,
      pricing: { input: 0.25, output: 1.25, currency: 'USD' },
      capabilities: {
        streaming: true,
        jsonMode: false,
        functionCalling: true,
        vision: true,
        multimodal: true
      }
    }
  ],
  ollama: [
    {
      id: 'llama2',
      name: 'Llama 2',
      provider: 'ollama',
      contextWindow: 4096,
      maxOutput: 2048,
      pricing: { input: 0, output: 0, currency: 'USD' },
      capabilities: {
        streaming: true,
        jsonMode: false,
        functionCalling: false,
        vision: false,
        multimodal: false
      }
    },
    {
      id: 'mistral',
      name: 'Mistral',
      provider: 'ollama',
      contextWindow: 8192,
      maxOutput: 4096,
      pricing: { input: 0, output: 0, currency: 'USD' },
      capabilities: {
        streaming: true,
        jsonMode: false,
        functionCalling: false,
        vision: false,
        multimodal: false
      }
    }
  ],
  cohere: [],
  nvidia: [],
  custom: []
};

// NVIDIA NIM Models (from NVIDIA API Catalog)
export const NVIDIA_MODELS: ModelInfo[] = [
  // Top Reasoning Models
  {
    id: 'nvidia/llama-3.3-nemotron-super-49b-v1.5',
    name: 'Llama 3.3 Nemotron Super 49B v1.5',
    provider: 'custom',
    contextWindow: 128000,
    maxOutput: 4096,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: true, vision: false, multimodal: false }
  },
  {
    id: 'nvidia/llama-3.1-nemotron-ultra-253b-v1',
    name: 'Llama 3.1 Nemotron Ultra 253B',
    provider: 'custom',
    contextWindow: 128000,
    maxOutput: 4096,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: true, vision: false, multimodal: false }
  },
  {
    id: 'deepseek-ai/deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'custom',
    contextWindow: 64000,
    maxOutput: 8192,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: false, vision: false, multimodal: false }
  },
  {
    id: 'deepseek-ai/deepseek-v3.1',
    name: 'DeepSeek V3.1',
    provider: 'custom',
    contextWindow: 64000,
    maxOutput: 8192,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: false, vision: false, multimodal: false }
  },
  {
    id: 'qwen/qwq-32b',
    name: 'QwQ 32B',
    provider: 'custom',
    contextWindow: 32768,
    maxOutput: 4096,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: false, vision: false, multimodal: false }
  },
  // Chat Models with Function Calling
  {
    id: 'mistralai/mistral-nemotron',
    name: 'Mistral Nemotron',
    provider: 'custom',
    contextWindow: 128000,
    maxOutput: 4096,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: true, vision: false, multimodal: false }
  },
  {
    id: 'minimax/minimax-m2',
    name: 'MiniMax M2',
    provider: 'custom',
    contextWindow: 200000,
    maxOutput: 4096,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: true, vision: false, multimodal: false }
  },
  {
    id: 'moonshot-ai/kimi-k2-instruct',
    name: 'Kimi K2 Instruct',
    provider: 'custom',
    contextWindow: 200000,
    maxOutput: 4096,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: false, vision: false, multimodal: false }
  },
  // Edge/Efficient Models
  {
    id: 'nvidia/llama-3.1-nemotron-nano-8b-v1',
    name: 'Llama 3.1 Nemotron Nano 8B',
    provider: 'custom',
    contextWindow: 128000,
    maxOutput: 4096,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: false, vision: false, multimodal: false }
  },
  {
    id: 'nvidia/llama-3.1-nemotron-nano-4b-v1.1',
    name: 'Llama 3.1 Nemotron Nano 4B',
    provider: 'custom',
    contextWindow: 128000,
    maxOutput: 4096,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: false, vision: false, multimodal: false }
  },
  {
    id: 'microsoft/phi-4-mini-instruct',
    name: 'Phi-4 Mini Instruct',
    provider: 'custom',
    contextWindow: 16000,
    maxOutput: 4096,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: false, vision: false, multimodal: false }
  },
  // General Purpose
  {
    id: 'meta/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B Instruct',
    provider: 'custom',
    contextWindow: 128000,
    maxOutput: 4096,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: false, vision: false, multimodal: false }
  },
  {
    id: 'google/gemma-3-27b-it',
    name: 'Gemma 3 27B IT',
    provider: 'custom',
    contextWindow: 8192,
    maxOutput: 4096,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: false, vision: false, multimodal: false }
  },
  {
    id: 'ibm/granite-3.3-8b-instruct',
    name: 'Granite 3.3 8B Instruct',
    provider: 'custom',
    contextWindow: 8192,
    maxOutput: 4096,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: false, vision: false, multimodal: false }
  },
  // Coding Models
  {
    id: 'qwen/qwen3-coder-480b-a35b-instruct',
    name: 'Qwen3 Coder 480B',
    provider: 'custom',
    contextWindow: 32768,
    maxOutput: 8192,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: false, vision: false, multimodal: false }
  },
  {
    id: 'qwen/qwen2.5-coder-32b-instruct',
    name: 'Qwen2.5 Coder 32B',
    provider: 'custom',
    contextWindow: 32768,
    maxOutput: 4096,
    pricing: { input: 0, output: 0, currency: 'USD' },
    capabilities: { streaming: true, jsonMode: false, functionCalling: false, vision: false, multimodal: false }
  }
];
