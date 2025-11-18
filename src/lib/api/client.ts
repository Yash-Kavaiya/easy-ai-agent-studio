/**
 * Unified AI Client
 * Routes requests to appropriate provider (OpenAI, Anthropic, NVIDIA)
 */

import { OpenAIClient } from './openai';
import { AnthropicClient } from './anthropic';
import { NVIDIAClient } from './nvidia';
import { ModelProvider } from '@/types/model.types';

export interface AIClientConfig {
  provider: ModelProvider;
  apiKey: string;
  baseURL?: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stream?: boolean;
}

export interface ChatCompletionResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class AIClient {
  private provider: ModelProvider;
  private client: OpenAIClient | AnthropicClient | NVIDIAClient;

  constructor(config: AIClientConfig) {
    this.provider = config.provider;

    switch (config.provider) {
      case 'openai':
        this.client = new OpenAIClient({
          apiKey: config.apiKey,
          baseURL: config.baseURL
        });
        break;

      case 'anthropic':
        this.client = new AnthropicClient({
          apiKey: config.apiKey,
          baseURL: config.baseURL
        });
        break;

      case 'nvidia':
        this.client = new NVIDIAClient({
          apiKey: config.apiKey,
          baseURL: config.baseURL
        });
        break;

      default:
        throw new Error(`Unsupported provider: ${config.provider}`);
    }
  }

  /**
   * Create a chat completion
   */
  async createChatCompletion(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
    // Handle Anthropic's different message format
    if (this.provider === 'anthropic') {
      const systemMessage = request.messages.find(m => m.role === 'system');
      const userMessages = request.messages.filter(m => m.role !== 'system');

      const anthropicClient = this.client as AnthropicClient;
      const response = await anthropicClient.createChatCompletion({
        model: request.model,
        messages: userMessages as any,
        system: systemMessage?.content,
        temperature: request.temperature,
        max_tokens: request.max_tokens,
        top_p: request.top_p,
        stream: false
      });

      // Convert Anthropic response to standard format
      return {
        id: response.id,
        choices: [{
          message: {
            role: 'assistant',
            content: response.content[0].text
          },
          finish_reason: response.stop_reason
        }],
        usage: {
          prompt_tokens: response.usage.input_tokens,
          completion_tokens: response.usage.output_tokens,
          total_tokens: response.usage.input_tokens + response.usage.output_tokens
        }
      };
    }

    // OpenAI and NVIDIA use the same format
    const response = await this.client.createChatCompletion(request as any);
    return response;
  }

  /**
   * Stream a chat completion
   */
  async* streamChatCompletion(request: ChatCompletionRequest): AsyncGenerator<string> {
    // Handle Anthropic's different message format
    if (this.provider === 'anthropic') {
      const systemMessage = request.messages.find(m => m.role === 'system');
      const userMessages = request.messages.filter(m => m.role !== 'system');

      const anthropicClient = this.client as AnthropicClient;
      yield* anthropicClient.streamChatCompletion({
        model: request.model,
        messages: userMessages as any,
        system: systemMessage?.content,
        temperature: request.temperature,
        max_tokens: request.max_tokens,
        top_p: request.top_p,
        stream: true
      });
      return;
    }

    // OpenAI and NVIDIA use the same format
    if ('streamChatCompletion' in this.client) {
      yield* this.client.streamChatCompletion(request as any);
    }
  }

  /**
   * Generate embeddings (OpenAI and NVIDIA only)
   */
  async createEmbedding(input: string | string[], model: string): Promise<number[][]> {
    if (this.provider === 'anthropic') {
      throw new Error('Anthropic does not support embeddings');
    }

    if ('createEmbedding' in this.client) {
      return this.client.createEmbedding(input, model);
    }

    throw new Error('Embeddings not supported for this provider');
  }
}

/**
 * Create an AI client from settings
 */
export function createAIClient(provider: ModelProvider, apiKey: string, baseURL?: string): AIClient {
  return new AIClient({ provider, apiKey, baseURL });
}
