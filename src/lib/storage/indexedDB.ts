/**
 * IndexedDB Storage Utility
 * For storing large data like documents, embeddings, and chat history
 */

import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Document } from '@/types/knowledge.types';
import { Project } from '@/types/project.types';

interface AIStudioDB extends DBSchema {
  documents: {
    key: string;
    value: Document;
    indexes: { 'by-uploadedAt': Date; 'by-tags': string };
  };
  projects: {
    key: string;
    value: Project;
    indexes: { 'by-updatedAt': Date };
  };
  chunks: {
    key: string;
    value: {
      id: string;
      documentId: string;
      content: string;
      embedding?: number[];
      metadata: any;
    };
    indexes: { 'by-documentId': string };
  };
}

class IndexedDBStorage {
  private db: IDBPDatabase<AIStudioDB> | null = null;
  private readonly DB_NAME = 'ai-studio-db';
  private readonly DB_VERSION = 1;

  async init(): Promise<void> {
    if (this.db) return;

    this.db = await openDB<AIStudioDB>(this.DB_NAME, this.DB_VERSION, {
      upgrade(db) {
        // Documents store
        if (!db.objectStoreNames.contains('documents')) {
          const documentStore = db.createObjectStore('documents', { keyPath: 'id' });
          documentStore.createIndex('by-uploadedAt', 'uploadedAt');
          documentStore.createIndex('by-tags', 'tags', { multiEntry: true });
        }

        // Projects store
        if (!db.objectStoreNames.contains('projects')) {
          const projectStore = db.createObjectStore('projects', { keyPath: 'id' });
          projectStore.createIndex('by-updatedAt', 'updatedAt');
        }

        // Chunks store (for embeddings)
        if (!db.objectStoreNames.contains('chunks')) {
          const chunkStore = db.createObjectStore('chunks', { keyPath: 'id' });
          chunkStore.createIndex('by-documentId', 'documentId');
        }
      }
    });
  }

  async ensureDB(): Promise<IDBPDatabase<AIStudioDB>> {
    if (!this.db) {
      await this.init();
    }
    return this.db!;
  }

  // Document operations
  async saveDocument(document: Document): Promise<void> {
    const db = await this.ensureDB();
    await db.put('documents', document);
  }

  async getDocument(id: string): Promise<Document | undefined> {
    const db = await this.ensureDB();
    return db.get('documents', id);
  }

  async getAllDocuments(): Promise<Document[]> {
    const db = await this.ensureDB();
    return db.getAll('documents');
  }

  async deleteDocument(id: string): Promise<void> {
    const db = await this.ensureDB();
    await db.delete('documents', id);

    // Also delete associated chunks
    const chunks = await db.getAllFromIndex('chunks', 'by-documentId', id);
    const tx = db.transaction('chunks', 'readwrite');
    await Promise.all(chunks.map((chunk) => tx.store.delete(chunk.id)));
    await tx.done;
  }

  async searchDocumentsByTag(tag: string): Promise<Document[]> {
    const db = await this.ensureDB();
    return db.getAllFromIndex('documents', 'by-tags', tag);
  }

  // Project operations
  async saveProject(project: Project): Promise<void> {
    const db = await this.ensureDB();
    await db.put('projects', project);
  }

  async getProject(id: string): Promise<Project | undefined> {
    const db = await this.ensureDB();
    return db.get('projects', id);
  }

  async getAllProjects(): Promise<Project[]> {
    const db = await this.ensureDB();
    return db.getAll('projects');
  }

  async deleteProject(id: string): Promise<void> {
    const db = await this.ensureDB();
    await db.delete('projects', id);
  }

  // Chunk operations (for embeddings)
  async saveChunk(chunk: {
    id: string;
    documentId: string;
    content: string;
    embedding?: number[];
    metadata: any;
  }): Promise<void> {
    const db = await this.ensureDB();
    await db.put('chunks', chunk);
  }

  async getChunksByDocument(documentId: string): Promise<any[]> {
    const db = await this.ensureDB();
    return db.getAllFromIndex('chunks', 'by-documentId', documentId);
  }

  async deleteChunksByDocument(documentId: string): Promise<void> {
    const db = await this.ensureDB();
    const chunks = await db.getAllFromIndex('chunks', 'by-documentId', documentId);
    const tx = db.transaction('chunks', 'readwrite');
    await Promise.all(chunks.map((chunk) => tx.store.delete(chunk.id)));
    await tx.done;
  }

  // Utility operations
  async clearAll(): Promise<void> {
    const db = await this.ensureDB();
    const tx = db.transaction(['documents', 'projects', 'chunks'], 'readwrite');
    await Promise.all([
      tx.objectStore('documents').clear(),
      tx.objectStore('projects').clear(),
      tx.objectStore('chunks').clear()
    ]);
    await tx.done;
  }

  async getStorageSize(): Promise<number> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return estimate.usage || 0;
    }
    return 0;
  }

  async close(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

// Export singleton instance
export const indexedDBStorage = new IndexedDBStorage();
