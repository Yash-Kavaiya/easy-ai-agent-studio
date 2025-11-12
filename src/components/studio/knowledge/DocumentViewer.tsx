/**
 * Document Viewer Component
 * View document content and chunks
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, FileText, Hash, Info } from 'lucide-react';
import { Document } from '@/types/knowledge.types';
import ReactMarkdown from 'react-markdown';

interface DocumentViewerProps {
  document: Document | null;
  onClose: () => void;
}

export function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  const [selectedTab, setSelectedTab] = useState('content');

  if (!document) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Select a document to view</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate">{document.name}</CardTitle>
            <CardDescription className="text-xs mt-1">
              {document.type.toUpperCase()} • {(document.size / 1024).toFixed(1)} KB •{' '}
              {document.chunks.length} chunks
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="shrink-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="h-full flex flex-col">
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="content" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="chunks" className="flex-1">
              <Hash className="h-4 w-4 mr-2" />
              Chunks ({document.chunks.length})
            </TabsTrigger>
            <TabsTrigger value="metadata" className="flex-1">
              <Info className="h-4 w-4 mr-2" />
              Metadata
            </TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="flex-1 overflow-hidden m-0">
            <ScrollArea className="h-full">
              <div className="p-6">
                {document.type === 'md' ? (
                  <div className="prose prose-sm prose-invert max-w-none">
                    <ReactMarkdown>{document.content}</ReactMarkdown>
                  </div>
                ) : document.type === 'json' ? (
                  <pre className="text-xs bg-black/20 p-4 rounded overflow-x-auto">
                    <code>{JSON.stringify(JSON.parse(document.content), null, 2)}</code>
                  </pre>
                ) : (
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {document.content}
                  </pre>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Chunks Tab */}
          <TabsContent value="chunks" className="flex-1 overflow-hidden m-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-3">
                {document.chunks.map((chunk, index) => (
                  <Card key={chunk.id} className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        Chunk {chunk.index + 1}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {chunk.content.length} chars
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {chunk.content}
                    </p>
                    {chunk.embedding && (
                      <div className="mt-2 pt-2 border-t">
                        <span className="text-xs text-muted-foreground">
                          Embedding: {chunk.embedding.length} dimensions
                        </span>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Metadata Tab */}
          <TabsContent value="metadata" className="flex-1 overflow-hidden m-0">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Document Information</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <dt className="text-muted-foreground">ID:</dt>
                      <dd className="font-mono text-xs">{document.id}</dd>
                    </div>
                    <div className="flex justify-between text-sm">
                      <dt className="text-muted-foreground">Type:</dt>
                      <dd>{document.type.toUpperCase()}</dd>
                    </div>
                    <div className="flex justify-between text-sm">
                      <dt className="text-muted-foreground">Size:</dt>
                      <dd>{(document.size / 1024).toFixed(2)} KB</dd>
                    </div>
                    <div className="flex justify-between text-sm">
                      <dt className="text-muted-foreground">Uploaded:</dt>
                      <dd>{new Date(document.uploadedAt).toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between text-sm">
                      <dt className="text-muted-foreground">Chunks:</dt>
                      <dd>{document.chunks.length}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Content Metadata</h4>
                  <dl className="space-y-2">
                    {Object.entries(document.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <dt className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </dt>
                        <dd>{String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {document.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {document.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
