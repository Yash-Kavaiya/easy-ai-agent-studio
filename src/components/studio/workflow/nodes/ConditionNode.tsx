/**
 * Condition Node Component
 * Custom node for conditional branching
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitBranch } from 'lucide-react';
import { ConditionNodeData } from '@/types/workflow.types';

export const ConditionNode = memo(({ data, selected }: NodeProps<ConditionNodeData>) => {
  return (
    <Card
      className={`min-w-[180px] ${
        selected ? 'ring-2 ring-amber-500' : ''
      } bg-nvidia-gray-dark border-nvidia-gray-medium hover:border-amber-500 transition-colors`}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-2 mb-2">
          <div className="p-1.5 bg-amber-500/20 rounded">
            <GitBranch className="h-4 w-4 text-amber-500" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">{data.label || 'Condition'}</div>
            {data.operator && (
              <div className="text-xs text-muted-foreground capitalize">
                {data.operator}
              </div>
            )}
          </div>
        </div>

        {data.expression && (
          <div className="text-xs font-mono bg-black/20 p-2 rounded mb-2 break-all">
            {data.expression}
          </div>
        )}

        <div className="flex gap-1">
          <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-500">
            True
          </Badge>
          <Badge variant="secondary" className="text-xs bg-red-500/20 text-red-500">
            False
          </Badge>
        </div>

        <Handle
          type="target"
          position={Position.Left}
          className="!bg-amber-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="true"
          style={{ top: '40%' }}
          className="!bg-green-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="false"
          style={{ top: '60%' }}
          className="!bg-red-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
      </CardContent>
    </Card>
  );
});

ConditionNode.displayName = 'ConditionNode';
