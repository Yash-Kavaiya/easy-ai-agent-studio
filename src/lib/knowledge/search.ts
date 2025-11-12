/**
 * Semantic Search Utility
 * Search documents using embedding similarity
 */

import { Chunk, Document, SearchResult } from '@/types/knowledge.types';
import { EmbeddingGenerator } from './embeddings';

export interface SearchOptions {
  topK?: number;
  threshold?: number;
  filter?: {
    documentIds?: string[];
    tags?: string[];
  };
}

export class SemanticSearch {
  private generator: EmbeddingGenerator;

  constructor(generator: EmbeddingGenerator) {
    this.generator = generator;
  }

  /**
   * Search for relevant chunks given a query
   */
  async search(
    query: string,
    chunks: Chunk[],
    documents: Document[],
    options: SearchOptions = {}
  ): Promise<SearchResult[]> {
    const { topK = 5, threshold = 0.0, filter } = options;

    // Generate query embedding
    const queryEmbedding = await this.generator.generateEmbedding(query);

    // Filter chunks
    let filteredChunks = chunks;
    if (filter?.documentIds) {
      filteredChunks = filteredChunks.filter(chunk =>
        filter.documentIds!.includes(chunk.documentId)
      );
    }

    // Calculate similarity scores
    const results: Array<{ chunk: Chunk; score: number; document: Document }> = [];

    for (const chunk of filteredChunks) {
      if (!chunk.embedding) continue;

      const score = EmbeddingGenerator.cosineSimilarity(
        queryEmbedding,
        chunk.embedding
      );

      if (score >= threshold) {
        const document = documents.find(d => d.id === chunk.documentId);
        if (document) {
          results.push({ chunk, score, document });
        }
      }
    }

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    // Return top K results
    return results.slice(0, topK);
  }

  /**
   * Hybrid search combining semantic and keyword search
   */
  async hybridSearch(
    query: string,
    chunks: Chunk[],
    documents: Document[],
    options: SearchOptions = {}
  ): Promise<SearchResult[]> {
    // Get semantic results
    const semanticResults = await this.search(query, chunks, documents, {
      ...options,
      topK: options.topK ? options.topK * 2 : 10
    });

    // Get keyword results
    const keywordResults = this.keywordSearch(query, chunks, documents, options);

    // Combine and re-rank results
    const combined = this.combineResults(semanticResults, keywordResults);

    // Return top K
    return combined.slice(0, options.topK || 5);
  }

  /**
   * Simple keyword search
   */
  private keywordSearch(
    query: string,
    chunks: Chunk[],
    documents: Document[],
    options: SearchOptions = {}
  ): SearchResult[] {
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower.split(/\s+/);

    const results: SearchResult[] = [];

    for (const chunk of chunks) {
      const contentLower = chunk.content.toLowerCase();

      // Calculate keyword match score
      let score = 0;
      for (const term of queryTerms) {
        if (contentLower.includes(term)) {
          score += 1;
        }
      }

      if (score > 0) {
        const document = documents.find(d => d.id === chunk.documentId);
        if (document) {
          // Normalize score
          score = score / queryTerms.length;
          results.push({ chunk, score, document });
        }
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, options.topK || 5);
  }

  /**
   * Combine semantic and keyword results
   */
  private combineResults(
    semanticResults: SearchResult[],
    keywordResults: SearchResult[]
  ): SearchResult[] {
    const combined = new Map<string, SearchResult>();

    // Add semantic results with weight 0.7
    for (const result of semanticResults) {
      combined.set(result.chunk.id, {
        ...result,
        score: result.score * 0.7
      });
    }

    // Add/merge keyword results with weight 0.3
    for (const result of keywordResults) {
      const existing = combined.get(result.chunk.id);
      if (existing) {
        existing.score += result.score * 0.3;
      } else {
        combined.set(result.chunk.id, {
          ...result,
          score: result.score * 0.3
        });
      }
    }

    // Convert to array and sort
    const results = Array.from(combined.values());
    results.sort((a, b) => b.score - a.score);

    return results;
  }

  /**
   * Get document statistics
   */
  static getDocumentStats(documents: Document[]) {
    return {
      totalDocuments: documents.length,
      totalChunks: documents.reduce((sum, doc) => sum + doc.chunks.length, 0),
      averageChunksPerDoc: documents.length > 0
        ? documents.reduce((sum, doc) => sum + doc.chunks.length, 0) / documents.length
        : 0,
      totalSize: documents.reduce((sum, doc) => sum + doc.size, 0)
    };
  }
}
