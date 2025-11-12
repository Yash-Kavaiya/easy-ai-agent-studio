/**
 * Embedding Generation Utility
 * Support for multiple embedding providers including NVIDIA NeMo Retriever
 */

export type EmbeddingProvider = 'openai' | 'nvidia' | 'local' | 'simulated';

export interface EmbeddingConfig {
  provider: EmbeddingProvider;
  model: string;
  apiKey?: string;
  baseURL?: string;
  dimensions?: number;
}

// NVIDIA NeMo Retriever Models (from NVIDIA API Catalog)
export const NVIDIA_EMBEDDING_MODELS = [
  {
    id: 'llama-3_2-nemoretriever-300m-embed-v2',
    name: 'NeMo Retriever 300M Embed v2',
    dimensions: 1024,
    description: 'Multilingual, cross-lingual embedding model for long-document QA retrieval, supporting 26 languages',
    maxTokens: 32768
  },
  {
    id: 'llama-3.2-nemoretriever-1b-vlm-embed-v1',
    name: 'NeMo Retriever 1B VLM Embed',
    dimensions: 2048,
    description: 'Multimodal question-answer retrieval representing user queries as text and documents as images',
    maxTokens: 4096
  },
  {
    id: 'nv-embedcode-7b-v1',
    name: 'NV-EmbedCode 7B',
    dimensions: 4096,
    description: 'Embedding model optimized for code retrieval, supporting text, code, and hybrid queries',
    maxTokens: 8192
  },
  {
    id: 'llama-3.2-nv-embedqa-1b-v2',
    name: 'NV-EmbedQA 1B v2',
    dimensions: 2048,
    description: 'Multilingual and cross-lingual text question-answering retrieval with long context support',
    maxTokens: 32768
  },
  {
    id: 'nv-embed-v1',
    name: 'NV-Embed v1',
    dimensions: 4096,
    description: 'Generates high-quality numerical embeddings from text inputs',
    maxTokens: 4096
  }
];

// OpenAI Models
export const OPENAI_EMBEDDING_MODELS = [
  {
    id: 'text-embedding-3-small',
    name: 'Text Embedding 3 Small',
    dimensions: 1536,
    description: 'High efficiency and performance',
    maxTokens: 8191
  },
  {
    id: 'text-embedding-3-large',
    name: 'Text Embedding 3 Large',
    dimensions: 3072,
    description: 'Best performance',
    maxTokens: 8191
  },
  {
    id: 'text-embedding-ada-002',
    name: 'Ada 002',
    dimensions: 1536,
    description: 'Legacy model',
    maxTokens: 8191
  }
];

export class EmbeddingGenerator {
  private config: EmbeddingConfig;

  constructor(config: EmbeddingConfig) {
    this.config = config;
  }

  /**
   * Generate embedding for a single text
   */
  async generateEmbedding(text: string): Promise<number[]> {
    switch (this.config.provider) {
      case 'openai':
        return this.generateOpenAIEmbedding(text);
      case 'nvidia':
        return this.generateNVIDIAEmbedding(text);
      case 'simulated':
        return this.generateSimulatedEmbedding(text);
      default:
        throw new Error(`Unsupported provider: ${this.config.provider}`);
    }
  }

  /**
   * Generate embeddings for multiple texts (batch)
   */
  async generateEmbeddings(texts: string[]): Promise<number[][]> {
    // For production, implement batch processing
    const embeddings: number[][] = [];

    for (const text of texts) {
      const embedding = await this.generateEmbedding(text);
      embeddings.push(embedding);
    }

    return embeddings;
  }

  /**
   * OpenAI Embeddings API
   */
  private async generateOpenAIEmbedding(text: string): Promise<number[]> {
    if (!this.config.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // In production, implement actual API call
    // For now, return simulated embedding
    return this.generateSimulatedEmbedding(text);

    /* Production implementation:
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: text,
        model: this.config.model
      })
    });

    const data = await response.json();
    return data.data[0].embedding;
    */
  }

  /**
   * NVIDIA NeMo Retriever Embeddings API
   */
  private async generateNVIDIAEmbedding(text: string): Promise<number[]> {
    if (!this.config.apiKey) {
      throw new Error('NVIDIA API key not configured');
    }

    // In production, implement actual NVIDIA API call
    // For now, return simulated embedding
    return this.generateSimulatedEmbedding(text);

    /* Production implementation:
    const response = await fetch('https://integrate.api.nvidia.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: text,
        model: this.config.model,
        encoding_format: 'float'
      })
    });

    const data = await response.json();
    return data.data[0].embedding;
    */
  }

  /**
   * Simulated embedding generation (for demo/testing)
   * Uses simple hash-based approach
   */
  private generateSimulatedEmbedding(text: string): number[] {
    const dimensions = this.config.dimensions || 1536;
    const embedding: number[] = [];

    // Create a deterministic but pseudo-random embedding based on text
    const hash = this.hashCode(text);

    for (let i = 0; i < dimensions; i++) {
      // Use hash and index to generate values
      const seed = hash + i;
      const value = Math.sin(seed) * Math.cos(seed * 0.5);
      embedding.push(value);
    }

    // Normalize the embedding
    return this.normalizeEmbedding(embedding);
  }

  /**
   * Simple hash function for text
   */
  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  }

  /**
   * Normalize embedding to unit vector
   */
  private normalizeEmbedding(embedding: number[]): number[] {
    const magnitude = Math.sqrt(
      embedding.reduce((sum, val) => sum + val * val, 0)
    );

    return embedding.map(val => val / magnitude);
  }

  /**
   * Calculate cosine similarity between two embeddings
   */
  static cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error('Embeddings must have same dimensions');
    }

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      magnitudeA += a[i] * a[i];
      magnitudeB += b[i] * b[i];
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    return dotProduct / (magnitudeA * magnitudeB);
  }

  /**
   * Get all available embedding models
   */
  static getAllModels() {
    return {
      nvidia: NVIDIA_EMBEDDING_MODELS,
      openai: OPENAI_EMBEDDING_MODELS
    };
  }
}
