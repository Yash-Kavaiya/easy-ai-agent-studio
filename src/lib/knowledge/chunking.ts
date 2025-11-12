/**
 * Text Chunking Utility
 * Split documents into chunks for embedding and retrieval
 */

import { Chunk, ChunkMetadata } from '@/types/knowledge.types';

export interface ChunkingOptions {
  chunkSize: number;
  chunkOverlap: number;
  separators?: string[];
}

export class TextChunker {
  /**
   * Split text into chunks with overlap
   */
  static chunkText(
    text: string,
    documentId: string,
    options: ChunkingOptions
  ): Chunk[] {
    const { chunkSize, chunkOverlap, separators = ['\n\n', '\n', '. ', ' '] } = options;
    const chunks: Chunk[] = [];

    // Split by separators
    const splits = this.splitTextRecursive(text, separators, chunkSize);

    // Create chunks with overlap
    let chunkIndex = 0;
    for (let i = 0; i < splits.length; i++) {
      const content = splits[i];

      if (content.trim().length === 0) continue;

      const chunk: Chunk = {
        id: `chunk_${documentId}_${chunkIndex}`,
        documentId,
        content: content.trim(),
        index: chunkIndex,
        metadata: {
          startIndex: text.indexOf(content),
          endIndex: text.indexOf(content) + content.length
        }
      };

      chunks.push(chunk);
      chunkIndex++;
    }

    return chunks;
  }

  /**
   * Recursively split text by separators
   */
  private static splitTextRecursive(
    text: string,
    separators: string[],
    chunkSize: number
  ): string[] {
    if (separators.length === 0) {
      return this.splitByLength(text, chunkSize);
    }

    const separator = separators[0];
    const splits = text.split(separator);
    const result: string[] = [];
    let currentChunk = '';

    for (const split of splits) {
      if (currentChunk.length + split.length <= chunkSize) {
        currentChunk += (currentChunk ? separator : '') + split;
      } else {
        if (currentChunk) {
          result.push(currentChunk);
        }

        if (split.length > chunkSize) {
          // Split further
          const subSplits = this.splitTextRecursive(
            split,
            separators.slice(1),
            chunkSize
          );
          result.push(...subSplits);
          currentChunk = '';
        } else {
          currentChunk = split;
        }
      }
    }

    if (currentChunk) {
      result.push(currentChunk);
    }

    return result;
  }

  /**
   * Split by fixed length
   */
  private static splitByLength(text: string, length: number): string[] {
    const result: string[] = [];
    for (let i = 0; i < text.length; i += length) {
      result.push(text.slice(i, i + length));
    }
    return result;
  }

  /**
   * Extract text from different file types
   */
  static async extractText(file: File): Promise<string> {
    const type = file.type;

    // Plain text
    if (type === 'text/plain' || type === 'text/markdown') {
      return file.text();
    }

    // JSON
    if (type === 'application/json') {
      const json = JSON.parse(await file.text());
      return JSON.stringify(json, null, 2);
    }

    // CSV
    if (type === 'text/csv') {
      return file.text();
    }

    // HTML
    if (type === 'text/html') {
      const html = await file.text();
      // Simple HTML to text conversion
      return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    }

    // PDF (would need pdf-parse library)
    if (type === 'application/pdf') {
      // Placeholder - in production, use pdf-parse
      return `[PDF content from ${file.name} - PDF parsing requires server-side processing]`;
    }

    // Default
    return file.text();
  }

  /**
   * Calculate chunk statistics
   */
  static getChunkStats(chunks: Chunk[]) {
    const lengths = chunks.map(c => c.content.length);
    return {
      count: chunks.length,
      avgLength: lengths.reduce((a, b) => a + b, 0) / lengths.length,
      minLength: Math.min(...lengths),
      maxLength: Math.max(...lengths),
      totalChars: lengths.reduce((a, b) => a + b, 0)
    };
  }
}
