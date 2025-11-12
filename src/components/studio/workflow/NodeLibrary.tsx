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
    color: 'text-green-500',
    bgColor: 'bg-green-500/20'
  },
  {
    type: NodeType.AI_AGENT,
    label: 'AI Agent',
    description: 'Call an AI model',
    icon: Bot,
    color: 'text-nvidia-green',
    bgColor: 'bg-nvidia-green/20'
  },
  {
    type: NodeType.TOOL,
    label: 'Tool',
    description: 'Execute a function or API call',
    icon: Wrench,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/20'
  },
  {
    type: NodeType.CONDITION,
    label: 'Condition',
    description: 'Branch based on condition',
    icon: GitBranch,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/20'
  },
  {
    type: NodeType.LOOP,
    label: 'Loop',
    description: 'Iterate over data',
    icon: RotateCw,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/20'
  },
  {
    type: NodeType.TRANSFORM,
    label: 'Transform',
    description: 'Transform data',
    icon: Code,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/20'
  },
  {
    type: NodeType.MERGE,
    label: 'Merge',
    description: 'Combine multiple paths',
    icon: GitMerge,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/20'
  },
  {
    type: NodeType.KNOWLEDGE,
    label: 'Knowledge',
    description: 'Query knowledge base',
    icon: Database,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/20'
  },
  {
    type: NodeType.HUMAN_INPUT,
    label: 'Human Input',
    description: 'Wait for user input',
    icon: User,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/20'
  },
  {
    type: NodeType.END,
    label: 'End',
    description: 'Terminal node',
    icon: CircleDot,
    color: 'text-red-500',
    bgColor: 'bg-red-500/20'
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
                  className="p-3 border border-nvidia-gray-medium rounded-lg hover:border-nvidia-green cursor-move transition-colors bg-nvidia-gray-dark group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded ${nodeType.bgColor} shrink-0`}>
                      <Icon className={`h-4 w-4 ${nodeType.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{nodeType.label}</span>
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
