/**
 * Transform Node Component
 * Transforms data using custom code
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code } from 'lucide-react';
import { TransformNodeData } from '@/types/workflow.types';

export const TransformNode = memo(({ data, selected }: NodeProps<TransformNodeData>) => {
  return (
    <Card
      className={`min-w-[200px] ${
        selected ? 'ring-2 ring-cyan-500' : ''
      } bg-nvidia-gray-dark border-nvidia-gray-medium hover:border-cyan-500 transition-colors`}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-2 mb-2">
          <div className="p-1.5 bg-cyan-500/20 rounded">
            <Code className="h-4 w-4 text-cyan-500" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">{data.label || 'Transform'}</div>
            <div className="text-xs text-muted-foreground capitalize">
              {data.transformType || 'custom'}
            </div>
          </div>
        </div>

        {data.description && (
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {data.description}
          </p>
        )}

        {data.code && (
          <div className="text-xs font-mono bg-black/30 p-2 rounded mt-2 max-h-20 overflow-hidden">
            <code className="text-cyan-400">{data.code.slice(0, 50)}...</code>
          </div>
        )}

        <Handle
          type="target"
          position={Position.Left}
          className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
      </CardContent>
    </Card>
  );
});

TransformNode.displayName = 'TransformNode';
