/**
 * Human Input Node Component
 * Pauses workflow for human input
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import { HumanInputNodeData } from '@/types/workflow.types';
import { useWorkflowStore } from '@/store/workflowStore';

export const HumanInputNode = memo(({ id, data, selected }: NodeProps<HumanInputNodeData>) => {
  const setSelectedNode = useWorkflowStore((state) => state.setSelectedNode);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNode(id);
  };

  return (
    <Card
      onClick={handleClick}
      className={`min-w-[200px] cursor-pointer ${
        selected ? 'ring-2 ring-orange-500' : ''
      } bg-nvidia-gray-dark border-nvidia-gray-medium hover:border-orange-500 transition-colors`}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-2 mb-2">
          <div className="p-1.5 bg-orange-500/20 rounded">
            <User className="h-4 w-4 text-orange-500" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm text-white">{data.label || 'Human Input'}</div>
            {data.prompt && (
              <div className="text-xs text-muted-foreground truncate">
                {data.prompt}
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
          <Badge variant="secondary" className="text-xs capitalize">
            {data.inputType || 'text'}
          </Badge>
          {data.options && data.options.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {data.options.length} options
            </Badge>
          )}
        </div>

        <Handle
          type="target"
          position={Position.Left}
          className="!bg-orange-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-orange-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
      </CardContent>
    </Card>
  );
});

HumanInputNode.displayName = 'HumanInputNode';
