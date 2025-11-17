/**
 * Workflow Template Library Component
 * Browse and load pre-built workflow templates
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, BookTemplate, Users, Database, Zap, Download, Eye } from 'lucide-react';
import { workflowTemplates, WorkflowTemplate, getTemplatesByCategory, searchTemplates } from '@/lib/workflow/workflow-templates';
import { useWorkflowStore } from '@/store/workflowStore';
import { toast } from 'sonner';

interface TemplateLibraryProps {
  workflowId?: string;
}

export function TemplateLibrary({ workflowId }: TemplateLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const { setNodes, setEdges } = useWorkflowStore();

  const handleLoadTemplate = (template: WorkflowTemplate) => {
    if (window.confirm(`Load template "${template.name}"? This will replace your current workflow.`)) {
      setNodes(template.workflow.nodes, workflowId);
      setEdges(template.workflow.edges, workflowId);
      toast.success(`Template "${template.name}" loaded successfully`);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'rag':
        return <Database className="h-4 w-4" />;
      case 'multi-agent':
        return <Users className="h-4 w-4" />;
      case 'data-processing':
        return <Zap className="h-4 w-4" />;
      default:
        return <BookTemplate className="h-4 w-4" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'rag':
        return 'RAG';
      case 'multi-agent':
        return 'Multi-Agent';
      case 'data-processing':
        return 'Data Processing';
      default:
        return 'General';
    }
  };

  const filteredTemplates = searchQuery
    ? searchTemplates(searchQuery)
    : workflowTemplates;

  const TemplateCard = ({ template }: { template: WorkflowTemplate }) => (
    <Card className="bg-nvidia-gray-dark border-nvidia-gray-medium hover:border-nvidia-green transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getCategoryIcon(template.category)}
            <CardTitle className="text-base">{template.name}</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {getCategoryName(template.category)}
          </Badge>
        </div>
        <CardDescription className="text-sm">
          {template.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {template.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="text-xs text-muted-foreground">
          {template.workflow.nodes.length} nodes • {template.workflow.edges.length} connections
        </div>

        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => setSelectedTemplate(template)}
              >
                <Eye className="h-3 w-3 mr-2" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-nvidia-gray-dark border-nvidia-gray-medium">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getCategoryIcon(template.category)}
                  {template.name}
                </DialogTitle>
                <DialogDescription>
                  {template.description}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Template Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <span className="ml-2">{getCategoryName(template.category)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Nodes:</span>
                      <span className="ml-2">{template.workflow.nodes.length}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Workflow Steps</h4>
                  <ScrollArea className="h-48 rounded border border-nvidia-gray-medium p-3">
                    <div className="space-y-2">
                      {template.workflow.nodes.map((node, idx) => (
                        <div key={node.id} className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="text-xs">
                            {idx + 1}
                          </Badge>
                          <span className="text-muted-foreground">{node.type}</span>
                          <span>→</span>
                          <span>{node.data.label}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            size="sm"
            className="flex-1 bg-nvidia-green hover:bg-nvidia-green-light text-black"
            onClick={() => handleLoadTemplate(template)}
          >
            <Download className="h-3 w-3 mr-2" />
            Load
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-nvidia-gray-dark border-nvidia-gray-medium"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="flex-1">
        <TabsList className="grid w-full grid-cols-5 bg-nvidia-gray-dark">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="rag">RAG</TabsTrigger>
          <TabsTrigger value="multi-agent">Multi-Agent</TabsTrigger>
          <TabsTrigger value="data-processing">Data</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <ScrollArea className="h-[600px]">
            <div className="grid gap-4">
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="rag" className="mt-4">
          <ScrollArea className="h-[600px]">
            <div className="grid gap-4">
              {getTemplatesByCategory('rag').filter(t =>
                !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="multi-agent" className="mt-4">
          <ScrollArea className="h-[600px]">
            <div className="grid gap-4">
              {getTemplatesByCategory('multi-agent').filter(t =>
                !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="data-processing" className="mt-4">
          <ScrollArea className="h-[600px]">
            <div className="grid gap-4">
              {getTemplatesByCategory('data-processing').filter(t =>
                !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="general" className="mt-4">
          <ScrollArea className="h-[600px]">
            <div className="grid gap-4">
              {getTemplatesByCategory('general').filter(t =>
                !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
