/**
 * Merge Node Component
 * Combines multiple workflow paths
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent } from '@/components/ui/card';
import { GitMerge } from 'lucide-react';
import { BaseNodeData } from '@/types/workflow.types';
import { useWorkflowStore } from '@/store/workflowStore';
import { NodeExecutionStatusIndicator, getNodeBorderClass, getNodeGlowClass } from '../NodeExecutionStatus';
import { cn } from '@/lib/utils';

export const MergeNode = memo(({ id, data, selected }: NodeProps<BaseNodeData>) => {
  const setSelectedNode = useWorkflowStore((state) => state.setSelectedNode);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNode(id);
  };

  return (
    <div className="relative">
      <NodeExecutionStatusIndicator status={data.executionStatus} />
      <Card
        onClick={handleClick}
        className={cn(
          'min-w-[160px] cursor-pointer bg-card border-node-merge hover:border-node-merge/80 transition-colors',
          selected ? 'ring-2 ring-node-merge' : '',
          getNodeBorderClass(data.executionStatus),
          getNodeGlowClass(data.executionStatus)
        )}
      >
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-node-merge/20 rounded">
            <GitMerge className="h-4 w-4 text-node-merge" />
          </div>
          <div className="font-medium text-sm text-node-merge">{data.label || 'Merge'}</div>
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
          className="!bg-node-merge !w-3 !h-3 !border-2 !border-card"
        />
        <Handle
          type="target"
          position={Position.Left}
          id="input-2"
          style={{ top: '70%' }}
          className="!bg-node-merge !w-3 !h-3 !border-2 !border-card"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-node-merge !w-3 !h-3 !border-2 !border-card"
        />
      </CardContent>
    </Card>
    </div>
  );
});

MergeNode.displayName = 'MergeNode';
