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
        selected ? 'ring-2 ring-node-end' : ''
      } bg-card border-node-end hover:border-node-end/80 transition-colors`}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-node-end/20 rounded-full">
            <CircleDot className="h-4 w-4 text-node-end" />
          </div>
          <div className="font-medium text-sm text-node-end">
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
          className="!bg-node-end !w-3 !h-3 !border-2 !border-card"
        />
      </CardContent>
    </Card>
  );
});

EndNode.displayName = 'EndNode';
