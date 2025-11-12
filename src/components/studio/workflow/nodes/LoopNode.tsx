/**
 * Loop Node Component
 * Iterates over data collections
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCw } from 'lucide-react';
import { LoopNodeData } from '@/types/workflow.types';

export const LoopNode = memo(({ data, selected }: NodeProps<LoopNodeData>) => {
  return (
    <Card
      className={`min-w-[200px] ${
        selected ? 'ring-2 ring-purple-500' : ''
      } bg-nvidia-gray-dark border-nvidia-gray-medium hover:border-purple-500 transition-colors`}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-2 mb-2">
          <div className="p-1.5 bg-purple-500/20 rounded">
            <RotateCw className="h-4 w-4 text-purple-500" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm text-white">{data.label || 'Loop'}</div>
            {data.iterableField && (
              <div className="text-xs text-muted-foreground">
                Iterate: {data.iterableField}
              </div>
            )}
          </div>
        </div>

        {data.description && (
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {data.description}
          </p>
        )}

        <div className="flex gap-1">
          <Badge variant="secondary" className="text-xs">
            Max: {data.maxIterations || 100}
          </Badge>
        </div>

        <Handle
          type="target"
          position={Position.Left}
          className="!bg-purple-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="body"
          style={{ top: '50%' }}
          className="!bg-purple-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="exit"
          className="!bg-purple-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
      </CardContent>
    </Card>
  );
});

LoopNode.displayName = 'LoopNode';
