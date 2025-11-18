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
import { useWorkflowStore } from '@/store/workflowStore';
import { NodeExecutionStatusIndicator, getNodeBorderClass, getNodeGlowClass } from '../NodeExecutionStatus';
import { cn } from '@/lib/utils';

export const ToolNode = memo(({ id, data, selected }: NodeProps<ToolNodeData>) => {
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
          'min-w-[180px] cursor-pointer bg-card border-node-tool hover:border-node-tool/80 transition-colors',
          selected ? 'ring-2 ring-node-tool' : '',
          getNodeBorderClass(data.executionStatus),
          getNodeGlowClass(data.executionStatus)
        )}
      >
        <CardContent className="p-3">
          <div className="flex items-start gap-2 mb-2">
            <div className="p-1.5 bg-node-tool/20 rounded">
              <Wrench className="h-4 w-4 text-node-tool" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm text-node-tool">{data.label || 'Tool'}</div>
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
            className="!bg-node-tool !w-3 !h-3 !border-2 !border-card"
          />
          <Handle
            type="source"
            position={Position.Right}
            className="!bg-node-tool !w-3 !h-3 !border-2 !border-card"
          />
        </CardContent>
      </Card>
    </div>
  );
});

ToolNode.displayName = 'ToolNode';
