/**
 * NVIDIA NIM API Client
 * Integration with NVIDIA's NIM API for chat and embeddings
 */

export interface NVIDIAConfig {
  apiKey: string;
  baseURL?: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionOptions {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
}

// NVIDIA NIM Chat Models - Top reasoning and chat models
export const NVIDIA_CHAT_MODELS = [
  // Top Reasoning Models
  { id: 'nvidia/llama-3.3-nemotron-super-49b-v1.5', name: 'Llama 3.3 Nemotron Super 49B v1.5', category: 'reasoning' },
  { id: 'nvidia/llama-3.1-nemotron-ultra-253b-v1', name: 'Llama 3.1 Nemotron Ultra 253B', category: 'reasoning' },
  { id: 'deepseek-ai/deepseek-r1', name: 'DeepSeek R1', category: 'reasoning' },
  { id: 'deepseek-ai/deepseek-v3.1', name: 'DeepSeek V3.1', category: 'reasoning' },
  { id: 'qwen/qwq-32b', name: 'QwQ 32B', category: 'reasoning' },

  // Chat Models with Function Calling
  { id: 'mistralai/mistral-nemotron', name: 'Mistral Nemotron', category: 'chat' },
  { id: 'minimax/minimax-m2', name: 'MiniMax M2', category: 'chat' },
  { id: 'moonshot-ai/kimi-k2-instruct', name: 'Kimi K2 Instruct', category: 'chat' },

  // Multilingual Models
  { id: 'magistral/magistral-small-2506', name: 'Magistral Small 2506', category: 'multilingual' },
  { id: 'sarvam-ai/sarvam-m', name: 'Sarvam M (Indic)', category: 'multilingual' },
  { id: 'eurollm/eurollm-9b-instruct', name: 'EuroLLM 9B', category: 'multilingual' },

  // Coding Models
  { id: 'qwen/qwen3-coder-480b-a35b-instruct', name: 'Qwen3 Coder 480B', category: 'coding' },
  { id: 'qwen/qwen2.5-coder-32b-instruct', name: 'Qwen2.5 Coder 32B', category: 'coding' },
  { id: 'nvidia/nv-embedcode-7b-v1', name: 'NV EmbedCode 7B', category: 'coding' },

  // Edge/Efficient Models
  { id: 'nvidia/llama-3.1-nemotron-nano-8b-v1', name: 'Llama 3.1 Nemotron Nano 8B', category: 'edge' },
  { id: 'nvidia/llama-3.1-nemotron-nano-4b-v1.1', name: 'Llama 3.1 Nemotron Nano 4B', category: 'edge' },
  { id: 'microsoft/phi-4-mini-instruct', name: 'Phi-4 Mini Instruct', category: 'edge' },

  // General Purpose
  { id: 'meta/llama-3.3-70b-instruct', name: 'Llama 3.3 70B Instruct', category: 'general' },
  { id: 'google/gemma-3-27b-it', name: 'Gemma 3 27B IT', category: 'general' },
  { id: 'ibm/granite-3.3-8b-instruct', name: 'Granite 3.3 8B Instruct', category: 'general' }
];

export class NVIDIAClient {
  private config: NVIDIAConfig;
  private baseURL: string;

  constructor(config: NVIDIAConfig) {
    this.config = config;
    this.baseURL = config.baseURL || 'https://integrate.api.nvidia.com/v1';
  }

  /**
   * Create a chat completion
   */
  async createChatCompletion(options: ChatCompletionOptions): Promise<any> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: options.model,
        messages: options.messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens ?? 1024,
        top_p: options.top_p ?? 1,
        stream: options.stream ?? false
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`NVIDIA API Error: ${response.status} - ${JSON.stringify(error)}`);
    }

    if (options.stream) {
      return response.body;
    }

    return response.json();
  }

  /**
   * Stream chat completion
   */
  async* streamChatCompletion(options: ChatCompletionOptions): AsyncGenerator<string> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: options.model,
        messages: options.messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens ?? 1024,
        top_p: options.top_p ?? 1,
        stream: true
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`NVIDIA API Error: ${response.status} - ${JSON.stringify(error)}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                yield content;
              }
            } catch (e) {
              // Skip malformed JSON
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Generate embeddings
   */
  async createEmbedding(input: string | string[], model: string): Promise<number[][]> {
    const response = await fetch(`${this.baseURL}/embeddings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        input: Array.isArray(input) ? input : [input],
        encoding_format: 'float'
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`NVIDIA API Error: ${response.status} - ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    return data.data.map((item: any) => item.embedding);
  }
}
