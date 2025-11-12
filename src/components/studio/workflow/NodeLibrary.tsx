/**
 * Node Library Component
 * Draggable node palette for the workflow canvas
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  Wrench,
  GitBranch,
  RotateCw,
  Code,
  GitMerge,
  Database,
  User,
  Circle,
  CircleDot
} from 'lucide-react';
import { NodeType } from '@/types/workflow.types';

const NODE_TYPES = [
  {
    type: NodeType.START,
    label: 'Start',
    description: 'Entry point of the workflow',
    icon: Circle,
    color: 'text-node-start',
    bgColor: 'bg-node-start/20'
  },
  {
    type: NodeType.AI_AGENT,
    label: 'AI Agent',
    description: 'Call an AI model',
    icon: Bot,
    color: 'text-node-ai',
    bgColor: 'bg-node-ai/20'
  },
  {
    type: NodeType.TOOL,
    label: 'Tool',
    description: 'Execute a function or API call',
    icon: Wrench,
    color: 'text-node-tool',
    bgColor: 'bg-node-tool/20'
  },
  {
    type: NodeType.CONDITION,
    label: 'Condition',
    description: 'Branch based on condition',
    icon: GitBranch,
    color: 'text-node-condition',
    bgColor: 'bg-node-condition/20'
  },
  {
    type: NodeType.LOOP,
    label: 'Loop',
    description: 'Iterate over data',
    icon: RotateCw,
    color: 'text-node-loop',
    bgColor: 'bg-node-loop/20'
  },
  {
    type: NodeType.TRANSFORM,
    label: 'Transform',
    description: 'Transform data',
    icon: Code,
    color: 'text-node-transform',
    bgColor: 'bg-node-transform/20'
  },
  {
    type: NodeType.MERGE,
    label: 'Merge',
    description: 'Combine multiple paths',
    icon: GitMerge,
    color: 'text-node-merge',
    bgColor: 'bg-node-merge/20'
  },
  {
    type: NodeType.KNOWLEDGE,
    label: 'Knowledge',
    description: 'Query knowledge base',
    icon: Database,
    color: 'text-node-knowledge',
    bgColor: 'bg-node-knowledge/20'
  },
  {
    type: NodeType.HUMAN_INPUT,
    label: 'Human Input',
    description: 'Wait for user input',
    icon: User,
    color: 'text-node-human',
    bgColor: 'bg-node-human/20'
  },
  {
    type: NodeType.END,
    label: 'End',
    description: 'Terminal node',
    icon: CircleDot,
    color: 'text-node-end',
    bgColor: 'bg-node-end/20'
  }
];

interface NodeLibraryProps {
  onNodeAdd?: (nodeType: NodeType) => void;
}

export function NodeLibrary({ onNodeAdd }: NodeLibraryProps) {
  const handleDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Node Library</CardTitle>
        <CardDescription className="text-xs">
          Drag nodes onto the canvas
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100%-80px)]">
          <div className="px-4 pb-4 space-y-2">
            {NODE_TYPES.map((nodeType) => {
              const Icon = nodeType.icon;
              return (
                <div
                  key={nodeType.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, nodeType.type)}
                  onClick={() => onNodeAdd?.(nodeType.type)}
                  className="p-3 border border-border rounded-lg hover:border-primary cursor-move transition-colors bg-card group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded ${nodeType.bgColor} shrink-0`}>
                      <Icon className={`h-4 w-4 ${nodeType.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-foreground">{nodeType.label}</span>
                        <Badge
                          variant="outline"
                          className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Click or Drag
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {nodeType.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
