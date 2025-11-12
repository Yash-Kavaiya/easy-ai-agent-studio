/**
 * Tool Node Component
 * Custom node for tool/function calls
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench } from 'lucide-react';
import { ToolNodeData } from '@/types/workflow.types';

export const ToolNode = memo(({ data, selected }: NodeProps<ToolNodeData>) => {
  return (
    <Card
      className={`min-w-[180px] ${
        selected ? 'ring-2 ring-blue-500' : ''
      } bg-nvidia-gray-dark border-nvidia-gray-medium hover:border-blue-500 transition-colors`}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-2 mb-2">
          <div className="p-1.5 bg-blue-500/20 rounded">
            <Wrench className="h-4 w-4 text-blue-500" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">{data.label || 'Tool'}</div>
            {data.toolId && (
              <div className="text-xs text-muted-foreground">{data.toolId}</div>
            )}
          </div>
        </div>

        {data.description && (
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {data.description}
          </p>
        )}

        {data.timeout && (
          <Badge variant="secondary" className="text-xs">
            Timeout: {data.timeout}ms
          </Badge>
        )}

        <Handle
          type="target"
          position={Position.Left}
          className="!bg-blue-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-blue-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
      </CardContent>
    </Card>
  );
});

ToolNode.displayName = 'ToolNode';
