/**
 * AI Agent Node Component
 * Custom node for AI model calls
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Settings } from 'lucide-react';
import { AIAgentNodeData } from '@/types/workflow.types';

export const AIAgentNode = memo(({ data, selected }: NodeProps<AIAgentNodeData>) => {
  return (
    <Card
      className={`min-w-[200px] ${
        selected ? 'ring-2 ring-nvidia-green' : ''
      } bg-nvidia-gray-dark border-nvidia-gray-medium hover:border-nvidia-green transition-colors`}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-nvidia-green/20 rounded">
              <Bot className="h-4 w-4 text-nvidia-green" />
            </div>
            <div>
              <div className="font-medium text-sm">{data.label || 'AI Agent'}</div>
              {data.model && (
                <div className="text-xs text-muted-foreground">{data.model}</div>
              )}
            </div>
          </div>
          <Settings className="h-3 w-3 text-muted-foreground" />
        </div>

        {data.description && (
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {data.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">
            Temp: {data.temperature}
          </Badge>
          {data.tools && data.tools.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {data.tools.length} tools
            </Badge>
          )}
        </div>

        <Handle
          type="target"
          position={Position.Left}
          className="!bg-nvidia-green !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-nvidia-green !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
      </CardContent>
    </Card>
  );
});

AIAgentNode.displayName = 'AIAgentNode';
