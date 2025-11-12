/**
 * Document List Component
 * Display and manage uploaded documents
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  File,
  FileText,
  FileJson,
  FileCode,
  Search,
  MoreVertical,
  Trash2,
  Eye,
  Download,
  Tag
} from 'lucide-react';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { Document, DocumentType } from '@/types/knowledge.types';
import { toast } from 'sonner';

interface DocumentListProps {
  onDocumentSelect?: (document: Document) => void;
}

const FILE_TYPE_ICONS = {
  txt: FileText,
  md: FileText,
  json: FileJson,
  csv: FileCode,
  html: FileCode,
  pdf: File,
  url: File
};

const FILE_TYPE_COLORS = {
  txt: 'text-blue-500',
  md: 'text-purple-500',
  json: 'text-green-500',
  csv: 'text-amber-500',
  html: 'text-orange-500',
  pdf: 'text-red-500',
  url: 'text-cyan-500'
};

export function DocumentList({ onDocumentSelect }: DocumentListProps) {
  const { getAllDocuments, deleteDocument, searchDocuments } = useKnowledgeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<DocumentType | 'all'>('all');

  const allDocuments = getAllDocuments();

  // Filter documents
  const filteredDocuments = searchQuery
    ? searchDocuments(searchQuery)
    : allDocuments.filter((doc) => selectedType === 'all' || doc.type === selectedType);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteDocument(id);
      toast.success('Document deleted');
    }
  };

  const handleDownload = (doc: Document) => {
    const blob = new Blob([doc.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Document downloaded');
  };

  const documentTypes = Array.from(new Set(allDocuments.map((d) => d.type)));

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Documents</CardTitle>
            <CardDescription className="text-xs">
              {allDocuments.length} document{allDocuments.length !== 1 ? 's' : ''} in
              knowledge base
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4 overflow-hidden">
        {/* Search and Filter */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Type Filter */}
          {documentTypes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <Badge
                variant={selectedType === 'all' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedType('all')}
              >
                All ({allDocuments.length})
              </Badge>
              {documentTypes.map((type) => (
                <Badge
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedType(type)}
                >
                  {type.toUpperCase()} ({allDocuments.filter((d) => d.type === type).length})
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Document List */}
        <ScrollArea className="flex-1">
          {filteredDocuments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <File className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm font-medium">
                {searchQuery || selectedType !== 'all'
                  ? 'No documents found'
                  : 'No documents yet'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {searchQuery || selectedType !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Upload documents to get started'}
              </p>
            </div>
          ) : (
            <div className="space-y-2 pr-4">
              {filteredDocuments.map((doc) => {
                const Icon = FILE_TYPE_ICONS[doc.type] || FileText;
                const iconColor = FILE_TYPE_COLORS[doc.type] || 'text-gray-500';

                return (
                  <Card
                    key={doc.id}
                    className="p-3 cursor-pointer hover:border-nvidia-green transition-colors group"
                    onClick={() => onDocumentSelect?.(doc)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-nvidia-gray-medium rounded shrink-0">
                        <Icon className={`h-4 w-4 ${iconColor}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-sm font-medium truncate pr-2">{doc.name}</h4>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onDocumentSelect?.(doc)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownload(doc)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(doc.id, doc.name)}
                                className="text-red-500"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <span>{(doc.size / 1024).toFixed(1)} KB</span>
                          <span>•</span>
                          <span>{doc.chunks.length} chunks</span>
                          <span>•</span>
                          <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                        </div>

                        {doc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {doc.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
