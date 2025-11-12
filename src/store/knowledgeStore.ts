/**
 * Knowledge Store - Manages documents and knowledge base
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Document, KnowledgeBaseConfig } from '@/types/knowledge.types';

interface KnowledgeStore {
  documents: Record<string, Document>;
  config: KnowledgeBaseConfig;
  isProcessing: boolean;
  processingProgress: number;

  // Document actions
  addDocument: (document: Omit<Document, 'id' | 'uploadedAt'>) => string;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  getDocument: (id: string) => Document | undefined;
  getAllDocuments: () => Document[];

  // Search actions
  searchDocuments: (query: string) => Document[];

  // Config actions
  updateConfig: (updates: Partial<KnowledgeBaseConfig>) => void;

  // Processing actions
  setProcessing: (isProcessing: boolean, progress?: number) => void;

  // Bulk actions
  clearAll: () => void;
}

const DEFAULT_CONFIG: KnowledgeBaseConfig = {
  chunkSize: 1000,
  chunkOverlap: 200,
  embeddingModel: 'text-embedding-3-small',
  maxDocuments: 100,
  autoUpdate: true
};

export const useKnowledgeStore = create<KnowledgeStore>()(
  persist(
    (set, get) => ({
      documents: {},
      config: DEFAULT_CONFIG,
      isProcessing: false,
      processingProgress: 0,

      // Document actions
      addDocument: (document) => {
        const id = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newDocument: Document = {
          ...document,
          id,
          uploadedAt: new Date()
        };

        set((state) => ({
          documents: { ...state.documents, [id]: newDocument }
        }));

        return id;
      },

      updateDocument: (id, updates) => {
        set((state) => {
          const document = state.documents[id];
          if (!document) return state;

          return {
            documents: {
              ...state.documents,
              [id]: { ...document, ...updates }
            }
          };
        });
      },

      deleteDocument: (id) => {
        set((state) => {
          const { [id]: _, ...rest } = state.documents;
          return { documents: rest };
        });
      },

      getDocument: (id) => {
        return get().documents[id];
      },

      getAllDocuments: () => {
        return Object.values(get().documents).sort(
          (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()
        );
      },

      // Search actions
      searchDocuments: (query) => {
        const lowerQuery = query.toLowerCase();
        return Object.values(get().documents).filter(
          (doc) =>
            doc.name.toLowerCase().includes(lowerQuery) ||
            doc.content.toLowerCase().includes(lowerQuery) ||
            doc.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        );
      },

      // Config actions
      updateConfig: (updates) => {
        set((state) => ({
          config: { ...state.config, ...updates }
        }));
      },

      // Processing actions
      setProcessing: (isProcessing, progress = 0) => {
        set({ isProcessing, processingProgress: progress });
      },

      // Bulk actions
      clearAll: () => {
        set({ documents: {} });
      }
    }),
    {
      name: 'knowledge-storage',
      version: 1,
      // Don't persist large documents in localStorage
      partialize: (state) => ({
        documents: {},
        config: state.config,
        isProcessing: false,
        processingProgress: 0
      })
    }
  )
);
