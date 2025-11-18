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
import { useWorkflowStore } from '@/store/workflowStore';
import { NodeExecutionStatusIndicator, getNodeBorderClass, getNodeGlowClass } from '../NodeExecutionStatus';
import { cn } from '@/lib/utils';

export const TransformNode = memo(({ id, data, selected }: NodeProps<TransformNodeData>) => {
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
          'min-w-[200px] cursor-pointer bg-card border-node-transform hover:border-node-transform/80 transition-colors',
          selected ? 'ring-2 ring-node-transform' : '',
          getNodeBorderClass(data.executionStatus),
          getNodeGlowClass(data.executionStatus)
        )}
      >
      <CardContent className="p-3">
        <div className="flex items-start gap-2 mb-2">
          <div className="p-1.5 bg-node-transform/20 rounded">
            <Code className="h-4 w-4 text-node-transform" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm text-node-transform">{data.label || 'Transform'}</div>
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
          <div className="text-xs font-mono bg-muted/30 p-2 rounded mt-2 max-h-20 overflow-hidden">
            <code className="text-node-transform">{data.code.slice(0, 50)}...</code>
          </div>
        )}

        <Handle
          type="target"
          position={Position.Left}
          className="!bg-node-transform !w-3 !h-3 !border-2 !border-card"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-node-transform !w-3 !h-3 !border-2 !border-card"
        />
      </CardContent>
    </Card>
    </div>
  );
});

TransformNode.displayName = 'TransformNode';
