/**
 * Merge Node Component
 * Combines multiple workflow paths
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent } from '@/components/ui/card';
import { GitMerge } from 'lucide-react';
import { BaseNodeData } from '@/types/workflow.types';

export const MergeNode = memo(({ data, selected }: NodeProps<BaseNodeData>) => {
  return (
    <Card
      className={`min-w-[160px] ${
        selected ? 'ring-2 ring-pink-500' : ''
      } bg-nvidia-gray-dark border-nvidia-gray-medium hover:border-pink-500 transition-colors`}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-pink-500/20 rounded">
            <GitMerge className="h-4 w-4 text-pink-500" />
          </div>
          <div className="font-medium text-sm">{data.label || 'Merge'}</div>
        </div>

        {data.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {data.description}
          </p>
        )}

        <Handle
          type="target"
          position={Position.Left}
          id="input-1"
          style={{ top: '30%' }}
          className="!bg-pink-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
        <Handle
          type="target"
          position={Position.Left}
          id="input-2"
          style={{ top: '70%' }}
          className="!bg-pink-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-pink-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
      </CardContent>
    </Card>
  );
});

MergeNode.displayName = 'MergeNode';
