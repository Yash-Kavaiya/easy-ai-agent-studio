/**
 * Knowledge Base Types
 */

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  content: string;
  uploadedAt: Date;
  chunks: Chunk[];
  metadata: DocumentMetadata;
  tags: string[];
}

export type DocumentType = 'pdf' | 'txt' | 'md' | 'docx' | 'csv' | 'url' | 'html';

export interface DocumentMetadata {
  author?: string;
  createdAt?: Date;
  pages?: number;
  wordCount?: number;
  language?: string;
  source?: string;
  [key: string]: any;
}

export interface Chunk {
  id: string;
  documentId: string;
  content: string;
  embedding?: number[];
  index: number;
  metadata: ChunkMetadata;
}

export interface ChunkMetadata {
  page?: number;
  section?: string;
  startIndex?: number;
  endIndex?: number;
  [key: string]: any;
}

export interface SearchResult {
  chunk: Chunk;
  score: number;
  document: Document;
}

export interface KnowledgeBaseConfig {
  chunkSize: number;
  chunkOverlap: number;
  embeddingModel: string;
  maxDocuments: number;
  autoUpdate: boolean;
}

export interface VectorStoreConfig {
  provider: 'local' | 'pinecone' | 'weaviate';
  dimensions: number;
  metric: 'cosine' | 'euclidean' | 'dot';
}

export interface EmbeddingConfig {
  provider: 'openai' | 'cohere' | 'local';
  model: string;
  batchSize: number;
}
