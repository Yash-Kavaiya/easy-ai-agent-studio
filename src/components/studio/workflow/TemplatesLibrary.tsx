import React, { useState } from 'react';
import {
  Database,
  Users,
  Layers,
  FileText,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Eye,
  Download,
  X,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { workflowTemplates, WorkflowTemplate } from '@/lib/workflow/templates';
import { useWorkflowStore } from '@/store/workflowStore';

interface TemplatesLibraryProps {
  onClose: () => void;
}

const categoryIcons = {
  rag: Database,
  'multi-agent': Users,
  'data-processing': Layers,
  general: FileText,
};

const categoryLabels = {
  rag: 'RAG Pipelines',
  'multi-agent': 'Multi-Agent',
  'data-processing': 'Data Processing',
  general: 'General',
};

export function TemplatesLibrary({ onClose }: TemplatesLibraryProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['rag', 'multi-agent', 'data-processing', 'general'])
  );
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { setNodes, setEdges } = useWorkflowStore();

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handlePreview = (template: WorkflowTemplate) => {
    setSelectedTemplate(template);
    setPreviewOpen(true);
  };

  const handleLoadTemplate = (template: WorkflowTemplate) => {
    // Load the template into the workflow canvas
    setNodes(template.nodes);
    setEdges(template.edges);
    onClose();
  };

  const groupedTemplates = workflowTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, WorkflowTemplate[]>);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl">Workflow Templates</CardTitle>
              <CardDescription className="mt-1">
                Choose from pre-built workflows for common use cases
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1 overflow-hidden pt-6">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-6">
                {Object.entries(groupedTemplates).map(([category, templates]) => {
                  const Icon = categoryIcons[category as keyof typeof categoryIcons];
                  const isExpanded = expandedCategories.has(category);

                  return (
                    <div key={category} className="space-y-3">
                      <button
                        onClick={() => toggleCategory(category)}
                        className="flex items-center gap-2 w-full text-left hover:text-primary transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <Icon className="h-5 w-5" />
                        <h3 className="font-semibold text-lg">
                          {categoryLabels[category as keyof typeof categoryLabels]}
                        </h3>
                        <Badge variant="secondary" className="ml-auto">
                          {templates.length}
                        </Badge>
                      </button>

                      {isExpanded && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                          {templates.map((template) => (
                            <Card
                              key={template.id}
                              className="hover:border-primary transition-colors cursor-pointer"
                            >
                              <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-2">
                                  <CardTitle className="text-base">{template.name}</CardTitle>
                                  <Badge variant="outline" className="shrink-0">
                                    {template.nodes.length} nodes
                                  </Badge>
                                </div>
                                <CardDescription className="text-sm line-clamp-2">
                                  {template.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => handlePreview(template)}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </Button>
                                <Button
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => handleLoadTemplate(template)}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Use Template
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedTemplate?.name}
              <Badge variant="outline">{selectedTemplate?.nodes.length} nodes</Badge>
            </DialogTitle>
            <DialogDescription>{selectedTemplate?.description}</DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 -mx-6 px-6">
            {selectedTemplate && (
              <div className="space-y-6 py-4">
                {/* Workflow Structure */}
                <div>
                  <h4 className="font-semibold mb-3">Workflow Structure</h4>
                  <div className="space-y-2">
                    {selectedTemplate.nodes.map((node, index) => (
                      <div key={node.id} className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {node.type}
                            </Badge>
                            <span className="font-medium">{node.data.label}</span>
                          </div>
                          {node.data.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {node.data.description}
                            </p>
                          )}
                          {/* Show key configuration for specific node types */}
                          {node.type === 'ai_agent' && (
                            <div className="mt-2 text-xs text-muted-foreground space-y-1">
                              <div>Model: {(node.data as any).model}</div>
                              <div>Temperature: {(node.data as any).temperature}</div>
                            </div>
                          )}
                          {node.type === 'knowledge' && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              Top K: {(node.data as any).topK} | Threshold:{' '}
                              {(node.data as any).threshold}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connections */}
                <div>
                  <h4 className="font-semibold mb-3">Connections</h4>
                  <div className="text-sm text-muted-foreground">
                    {selectedTemplate.edges.length} connections between nodes
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                if (selectedTemplate) {
                  handleLoadTemplate(selectedTemplate);
                  setPreviewOpen(false);
                }
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Use This Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
