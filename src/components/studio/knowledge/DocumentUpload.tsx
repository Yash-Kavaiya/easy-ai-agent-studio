/**
 * Document Upload Component
 * Drag-and-drop and click-to-upload interface
 */

import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { TextChunker } from '@/lib/knowledge/chunking';
import { EmbeddingGenerator } from '@/lib/knowledge/embeddings';
import { Document } from '@/types/knowledge.types';
import { toast } from 'sonner';

interface UploadingFile {
  file: File;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
}

export function DocumentUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const { addDocument, config, setProcessing } = useKnowledgeStore();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, []);

  const handleFiles = async (files: File[]) => {
    // Validate files
    const validFiles = files.filter((file) => {
      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 50MB)`);
        return false;
      }

      // Check file type
      const validTypes = [
        'text/plain',
        'text/markdown',
        'application/json',
        'text/csv',
        'text/html',
        'application/pdf'
      ];

      if (!validTypes.includes(file.type) && !file.name.endsWith('.md')) {
        toast.error(`${file.name} has unsupported file type`);
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    // Initialize uploading state
    const uploadingFilesState: UploadingFile[] = validFiles.map((file) => ({
      file,
      status: 'pending',
      progress: 0
    }));

    setUploadingFiles(uploadingFilesState);

    // Process files
    for (let i = 0; i < validFiles.length; i++) {
      await processFile(validFiles[i], i);
    }

    // Clear uploading state after a delay
    setTimeout(() => {
      setUploadingFiles([]);
    }, 3000);
  };

  const processFile = async (file: File, index: number) => {
    try {
      // Update status to processing
      setUploadingFiles((prev) =>
        prev.map((f, i) =>
          i === index ? { ...f, status: 'processing', progress: 10 } : f
        )
      );

      // Extract text
      const text = await TextChunker.extractText(file);

      setUploadingFiles((prev) =>
        prev.map((f, i) =>
          i === index ? { ...f, progress: 30 } : f
        )
      );

      // Create document ID
      const docId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Chunk text
      const chunks = TextChunker.chunkText(text, docId, {
        chunkSize: config.chunkSize,
        chunkOverlap: config.chunkOverlap
      });

      setUploadingFiles((prev) =>
        prev.map((f, i) =>
          i === index ? { ...f, progress: 50 } : f
        )
      );

      // Generate embeddings (simulated for demo)
      const generator = new EmbeddingGenerator({
        provider: 'simulated',
        model: config.embeddingModel,
        dimensions: 1536
      });

      for (let j = 0; j < chunks.length; j++) {
        const embedding = await generator.generateEmbedding(chunks[j].content);
        chunks[j].embedding = embedding;

        // Update progress
        const progress = 50 + ((j + 1) / chunks.length) * 40;
        setUploadingFiles((prev) =>
          prev.map((f, i) =>
            i === index ? { ...f, progress } : f
          )
        );
      }

      // Determine document type
      const getDocType = (file: File) => {
        if (file.type === 'application/pdf') return 'pdf';
        if (file.type === 'text/csv') return 'csv';
        if (file.type === 'text/html') return 'html';
        if (file.type === 'application/json') return 'json';
        if (file.name.endsWith('.md')) return 'md';
        return 'txt';
      };

      // Create document
      const document: Omit<Document, 'id' | 'uploadedAt'> = {
        name: file.name,
        type: getDocType(file),
        size: file.size,
        content: text,
        chunks,
        metadata: {
          wordCount: text.split(/\s+/).length,
          language: 'en'
        },
        tags: []
      };

      // Add to store
      addDocument(document);

      setUploadingFiles((prev) =>
        prev.map((f, i) =>
          i === index ? { ...f, status: 'completed', progress: 100 } : f
        )
      );

      toast.success(`${file.name} uploaded successfully`);
    } catch (error) {
      console.error('Error processing file:', error);

      setUploadingFiles((prev) =>
        prev.map((f, i) =>
          i === index
            ? {
                ...f,
                status: 'error',
                progress: 0,
                error: error instanceof Error ? error.message : 'Unknown error'
              }
            : f
        )
      );

      toast.error(`Failed to upload ${file.name}`);
    }
  };

  const removeUploadingFile = (index: number) => {
    setUploadingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-nvidia-green" />
          Upload Documents
        </CardTitle>
        <CardDescription>
          Add documents to your knowledge base for RAG
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
            isDragging
              ? 'border-nvidia-green bg-nvidia-green/10'
              : 'border-nvidia-gray-medium hover:border-nvidia-green/50'
          }`}
        >
          <input
            type="file"
            id="file-upload"
            multiple
            accept=".txt,.md,.json,.csv,.html,.pdf"
            onChange={handleFileSelect}
            className="hidden"
          />

          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">
              {isDragging ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
            <Button variant="outline" size="sm" type="button">
              Select Files
            </Button>
          </label>

          <div className="mt-4 text-xs text-muted-foreground text-center">
            Supported: TXT, MD, JSON, CSV, HTML, PDF (max 50MB)
          </div>
        </div>

        {/* Uploading Files */}
        {uploadingFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Processing Files</h4>
            {uploadingFiles.map((uploadingFile, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-nvidia-gray-medium rounded shrink-0">
                    {uploadingFile.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : uploadingFile.status === 'error' ? (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <File className="h-4 w-4 text-nvidia-green" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium truncate">
                        {uploadingFile.file.name}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => removeUploadingFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-muted-foreground">
                        {(uploadingFile.file.size / 1024).toFixed(1)} KB
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {uploadingFile.status}
                      </Badge>
                    </div>

                    {uploadingFile.status === 'processing' && (
                      <Progress value={uploadingFile.progress} className="h-1" />
                    )}

                    {uploadingFile.error && (
                      <p className="text-xs text-red-500 mt-1">{uploadingFile.error}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
