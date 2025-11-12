/**
 * Knowledge Base Component
 * Main knowledge base interface combining all features
 */

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentUpload } from './DocumentUpload';
import { DocumentList } from './DocumentList';
import { DocumentViewer } from './DocumentViewer';
import { SemanticSearchUI } from './SemanticSearchUI';
import { Document } from '@/types/knowledge.types';
import { Database, Upload, Search, List } from 'lucide-react';

export function KnowledgeBase() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [activeTab, setActiveTab] = useState('documents');

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleDocumentClose = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Database className="h-6 w-6 text-nvidia-green" />
          <h2 className="text-2xl font-bold">Knowledge Base</h2>
        </div>
        <p className="text-muted-foreground">
          Upload and manage documents for Retrieval Augmented Generation (RAG)
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search
          </TabsTrigger>
        </TabsList>

        {/* Documents Tab */}
        <TabsContent value="documents" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Document List */}
            <div style={{ height: '600px' }}>
              <DocumentList onDocumentSelect={handleDocumentSelect} />
            </div>

            {/* Document Viewer */}
            <div style={{ height: '600px' }}>
              <DocumentViewer document={selectedDocument} onClose={handleDocumentClose} />
            </div>
          </div>
        </TabsContent>

        {/* Upload Tab */}
        <TabsContent value="upload" className="mt-6">
          <div className="max-w-2xl mx-auto">
            <DocumentUpload />
          </div>
        </TabsContent>

        {/* Search Tab */}
        <TabsContent value="search" className="mt-6">
          <div className="max-w-4xl mx-auto">
            <SemanticSearchUI />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
