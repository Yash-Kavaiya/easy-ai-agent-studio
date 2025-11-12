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

export type ModelProvider = 'openai' | 'anthropic' | 'ollama' | 'cohere' | 'custom';

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
  custom: []
};
