/**
 * Tools Library Component
 * Browse, search, and manage tools
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToolStore } from '@/store/toolStore';
import { ToolCategory } from '@/types/tool.types';
import {
  Search,
  Wrench,
  Plus,
  Star,
  StarOff,
  Globe,
  Calculator,
  Type,
  Braces,
  Calendar,
  Filter,
  List,
  Play
} from 'lucide-react';
import { ToolTester } from './ToolTester';
import { toast } from 'sonner';

const CATEGORY_ICONS: Record<ToolCategory, any> = {
  [ToolCategory.WEB]: Search,
  [ToolCategory.HTTP]: Globe,
  [ToolCategory.FILE]: Filter,
  [ToolCategory.MATH]: Calculator,
  [ToolCategory.TEXT]: Type,
  [ToolCategory.JSON]: Braces,
  [ToolCategory.DATE]: Calendar,
  [ToolCategory.AI]: Wrench,
  [ToolCategory.CUSTOM]: Plus
};

const CATEGORY_COLORS: Record<ToolCategory, string> = {
  [ToolCategory.WEB]: 'text-blue-500 bg-blue-500/20',
  [ToolCategory.HTTP]: 'text-green-500 bg-green-500/20',
  [ToolCategory.FILE]: 'text-purple-500 bg-purple-500/20',
  [ToolCategory.MATH]: 'text-orange-500 bg-orange-500/20',
  [ToolCategory.TEXT]: 'text-cyan-500 bg-cyan-500/20',
  [ToolCategory.JSON]: 'text-pink-500 bg-pink-500/20',
  [ToolCategory.DATE]: 'text-indigo-500 bg-indigo-500/20',
  [ToolCategory.AI]: 'text-nvidia-green bg-nvidia-green/20',
  [ToolCategory.CUSTOM]: 'text-amber-500 bg-amber-500/20'
};

interface ToolsLibraryProps {
  className?: string;
}

export function ToolsLibrary({ className }: ToolsLibraryProps) {
  const {
    getAllTools,
    getFavoriteTools,
    toggleFavorite,
    isFavorite,
    searchTools,
    initializeBuiltInTools
  } = useToolStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showTester, setShowTester] = useState(false);

  // Initialize built-in tools on mount
  useEffect(() => {
    initializeBuiltInTools();
  }, [initializeBuiltInTools]);

  const allTools = getAllTools();
  const favoriteTools = getFavoriteTools();

  // Filter tools
  const filteredTools = searchQuery
    ? searchTools(searchQuery)
    : selectedCategory === 'all'
    ? allTools
    : allTools.filter(tool => tool.category === selectedCategory);

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handleToggleFavorite = (toolId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(toolId);
    toast.success(isFavorite(toolId) ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleTestTool = (toolId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTool(toolId);
    setShowTester(true);
  };

  const selectedToolData = selectedTool ? allTools.find(t => t.id === selectedTool) : null;

  return (
    <div className={`flex gap-4 h-full ${className}`}>
      {/* Tools List */}
      <Card className="flex-1">
        <CardHeader className="pb-3 border-b border-nvidia-gray-medium">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-nvidia-green" />
                Tools Library
              </CardTitle>
              <CardDescription className="mt-1">
                {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} available
              </CardDescription>
            </div>
            <Button
              size="sm"
              className="bg-nvidia-green hover:bg-nvidia-green-light text-black"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Tool
            </Button>
          </div>

          {/* Search */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
            <TabsList className="w-full justify-start rounded-none border-b border-nvidia-gray-medium p-0 h-auto">
              <TabsTrigger value="all" className="rounded-none">All</TabsTrigger>
              <TabsTrigger value={ToolCategory.WEB} className="rounded-none">Web</TabsTrigger>
              <TabsTrigger value={ToolCategory.HTTP} className="rounded-none">HTTP</TabsTrigger>
              <TabsTrigger value={ToolCategory.MATH} className="rounded-none">Math</TabsTrigger>
              <TabsTrigger value={ToolCategory.TEXT} className="rounded-none">Text</TabsTrigger>
              <TabsTrigger value={ToolCategory.JSON} className="rounded-none">JSON</TabsTrigger>
              <TabsTrigger value={ToolCategory.DATE} className="rounded-none">Date</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="p-4 space-y-2">
                {filteredTools.length === 0 ? (
                  <div className="text-center py-12">
                    <Wrench className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No tools found</p>
                  </div>
                ) : (
                  filteredTools.map((tool) => {
                    const Icon = CATEGORY_ICONS[tool.category];
                    const colorClass = CATEGORY_COLORS[tool.category];
                    const favorite = isFavorite(tool.id);

                    return (
                      <div
                        key={tool.id}
                        onClick={() => handleToolSelect(tool.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedTool === tool.id
                            ? 'border-nvidia-green bg-nvidia-green/5'
                            : 'border-nvidia-gray-medium hover:border-nvidia-green/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded ${colorClass} shrink-0`}>
                            <Icon className="h-4 w-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm">{tool.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {tool.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {tool.description}
                            </p>

                            {tool.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {tool.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex gap-1 shrink-0">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => handleToggleFavorite(tool.id, e)}
                              className="h-8 w-8 p-0"
                            >
                              {favorite ? (
                                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              ) : (
                                <StarOff className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => handleTestTool(tool.id, e)}
                              className="h-8 w-8 p-0"
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tool Details */}
      {selectedToolData && !showTester && (
        <Card className="w-96">
          <CardHeader className="border-b border-nvidia-gray-medium">
            <CardTitle className="text-base">{selectedToolData.name}</CardTitle>
            <CardDescription>{selectedToolData.description}</CardDescription>
          </CardHeader>

          <CardContent className="p-4">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-4">
                {/* Metadata */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <Badge variant="outline">{selectedToolData.category}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Version:</span>
                      <span>{selectedToolData.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{selectedToolData.isAsync ? 'Async' : 'Sync'}</span>
                    </div>
                  </div>
                </div>

                {/* Parameters */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Parameters</h4>
                  <div className="space-y-3">
                    {selectedToolData.parameters.map((param) => (
                      <div
                        key={param.name}
                        className="p-2 bg-nvidia-gray-dark rounded border border-nvidia-gray-medium"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm">{param.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {param.type}
                          </Badge>
                          {param.required && (
                            <Badge variant="destructive" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {param.description}
                        </p>
                        {param.default !== undefined && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Default: <code className="text-nvidia-green">{JSON.stringify(param.default)}</code>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                {selectedToolData.examples && selectedToolData.examples.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Examples</h4>
                    <div className="space-y-3">
                      {selectedToolData.examples.map((example, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-nvidia-gray-dark rounded border border-nvidia-gray-medium"
                        >
                          <p className="text-sm font-medium mb-2">{example.description}</p>
                          <div className="space-y-2">
                            <div>
                              <span className="text-xs text-muted-foreground">Input:</span>
                              <pre className="text-xs bg-black/30 p-2 rounded mt-1 overflow-x-auto">
                                <code>{JSON.stringify(example.input, null, 2)}</code>
                              </pre>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Output:</span>
                              <pre className="text-xs bg-black/30 p-2 rounded mt-1 overflow-x-auto">
                                <code>{JSON.stringify(example.output, null, 2)}</code>
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => setShowTester(true)}
                    className="flex-1 bg-nvidia-green hover:bg-nvidia-green-light text-black"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Test Tool
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Tool Tester */}
      {selectedToolData && showTester && (
        <ToolTester
          tool={selectedToolData}
          onClose={() => setShowTester(false)}
        />
      )}
    </div>
  );
}
