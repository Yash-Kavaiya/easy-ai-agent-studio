/**
 * End Node Component
 * Workflow terminal node
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent } from '@/components/ui/card';
import { CircleDot } from 'lucide-react';
import { BaseNodeData } from '@/types/workflow.types';

export const EndNode = memo(({ data, selected }: NodeProps<BaseNodeData>) => {
  return (
    <Card
      className={`min-w-[140px] ${
        selected ? 'ring-2 ring-red-500' : ''
      } bg-nvidia-gray-dark border-red-500 hover:border-red-400 transition-colors`}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-500/20 rounded-full">
            <CircleDot className="h-4 w-4 text-red-500" />
          </div>
          <div className="font-medium text-sm text-red-500">
            {data.label || 'End'}
          </div>
        </div>

        {data.description && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
            {data.description}
          </p>
        )}

        <Handle
          type="target"
          position={Position.Left}
          className="!bg-red-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
      </CardContent>
    </Card>
  );
});

EndNode.displayName = 'EndNode';
