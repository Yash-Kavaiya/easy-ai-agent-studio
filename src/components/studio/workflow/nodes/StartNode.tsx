/**
 * Start Node Component
 * Workflow entry point
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent } from '@/components/ui/card';
import { Circle } from 'lucide-react';
import { BaseNodeData } from '@/types/workflow.types';
import { useWorkflowStore } from '@/store/workflowStore';

export const StartNode = memo(({ id, data, selected }: NodeProps<BaseNodeData>) => {
  const setSelectedNode = useWorkflowStore((state) => state.setSelectedNode);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNode(id);
  };

  return (
    <Card
      onClick={handleClick}
      className={`min-w-[140px] cursor-pointer ${
        selected ? 'ring-2 ring-node-start' : ''
      } bg-card border-node-start hover:border-node-start/80 transition-colors`}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-node-start/20 rounded-full">
            <Circle className="h-4 w-4 text-node-start fill-node-start" />
          </div>
          <div className="font-medium text-sm text-node-start">
            {data.label || 'Start'}
          </div>
        </div>

        {data.description && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
            {data.description}
          </p>
        )}

        <Handle
          type="source"
          position={Position.Right}
          className="!bg-node-start !w-3 !h-3 !border-2 !border-card"
        />
      </CardContent>
    </Card>
  );
});

StartNode.displayName = 'StartNode';
