/**
 * Tools Library Component
 * Browse and configure available tools for the agent
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Globe,
  Database,
  FileText,
  Code,
  Plug,
  Plus,
  Settings
} from 'lucide-react';
import { ToolCategory } from '@/types/tools.types';

// Built-in tools catalog
const BUILTIN_TOOLS = [
  {
    id: 'http_request',
    name: 'HTTP Request',
    description: 'Make HTTP/HTTPS requests to APIs',
    category: 'web' as ToolCategory,
    icon: Globe,
    enabled: true
  },
  {
    id: 'web_search',
    name: 'Web Search',
    description: 'Search the internet for information',
    category: 'web' as ToolCategory,
    icon: Search,
    enabled: true
  },
  {
    id: 'read_file',
    name: 'Read File',
    description: 'Read content from files',
    category: 'file' as ToolCategory,
    icon: FileText,
    enabled: true
  },
  {
    id: 'write_file',
    name: 'Write File',
    description: 'Write content to files',
    category: 'file' as ToolCategory,
    icon: FileText,
    enabled: true
  },
  {
    id: 'sql_query',
    name: 'SQL Query',
    description: 'Execute SQL database queries',
    category: 'database' as ToolCategory,
    icon: Database,
    enabled: true
  },
  {
    id: 'python_execute',
    name: 'Python Execute',
    description: 'Run Python code in sandbox',
    category: 'code' as ToolCategory,
    icon: Code,
    enabled: false
  },
  {
    id: 'javascript_execute',
    name: 'JavaScript Execute',
    description: 'Run JavaScript code',
    category: 'code' as ToolCategory,
    icon: Code,
    enabled: true
  },
  {
    id: 'github_api',
    name: 'GitHub API',
    description: 'Interact with GitHub repositories',
    category: 'integration' as ToolCategory,
    icon: Plug,
    enabled: false
  },
  {
    id: 'slack_api',
    name: 'Slack API',
    description: 'Send messages to Slack',
    category: 'integration' as ToolCategory,
    icon: Plug,
    enabled: false
  }
];

const CATEGORY_INFO = {
  web: { label: 'Web', icon: Globe, color: 'text-blue-500' },
  database: { label: 'Database', icon: Database, color: 'text-purple-500' },
  file: { label: 'File', icon: FileText, color: 'text-green-500' },
  code: { label: 'Code', icon: Code, color: 'text-amber-500' },
  integration: { label: 'Integration', icon: Plug, color: 'text-pink-500' },
  custom: { label: 'Custom', icon: Settings, color: 'text-cyan-500' }
};

interface ToolsLibraryProps {
  onToolSelect?: (toolId: string) => void;
}

export function ToolsLibrary({ onToolSelect }: ToolsLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');

  const filteredTools = BUILTIN_TOOLS.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryCount = (category: ToolCategory) =>
    BUILTIN_TOOLS.filter((t) => t.category === category).length;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Tools Library</CardTitle>
            <CardDescription className="text-xs">
              Add capabilities to your agent
            </CardDescription>
          </div>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Custom
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="text-xs">
              All ({BUILTIN_TOOLS.length})
            </TabsTrigger>
            <TabsTrigger value="web" className="text-xs">
              Web ({categoryCount('web')})
            </TabsTrigger>
            <TabsTrigger value="file" className="text-xs">
              File ({categoryCount('file')})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Tools List */}
        <ScrollArea className="h-[400px]">
          <div className="space-y-2 pr-4">
            {filteredTools.map((tool) => {
              const CategoryIcon = CATEGORY_INFO[tool.category].icon;
              return (
                <Card
                  key={tool.id}
                  className="p-3 cursor-pointer hover:border-nvidia-green transition-colors group"
                  onClick={() => onToolSelect?.(tool.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-nvidia-gray-medium rounded shrink-0">
                      <CategoryIcon
                        className={`h-4 w-4 ${CATEGORY_INFO[tool.category].color}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{tool.name}</span>
                        {!tool.enabled && (
                          <Badge variant="outline" className="text-xs">
                            Pro
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {tool.description}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {CATEGORY_INFO[tool.category].label}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}

            {filteredTools.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No tools found</p>
                <p className="text-xs mt-1">Try a different search or category</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
