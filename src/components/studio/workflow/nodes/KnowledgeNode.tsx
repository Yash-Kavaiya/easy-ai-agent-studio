/**
 * Knowledge Node Component
 * Queries the knowledge base
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database } from 'lucide-react';
import { KnowledgeNodeData } from '@/types/workflow.types';
import { useWorkflowStore } from '@/store/workflowStore';

export const KnowledgeNode = memo(({ id, data, selected }: NodeProps<KnowledgeNodeData>) => {
  const setSelectedNode = useWorkflowStore((state) => state.setSelectedNode);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNode(id);
  };

  return (
    <Card
      onClick={handleClick}
      className={`min-w-[200px] cursor-pointer ${
        selected ? 'ring-2 ring-indigo-500' : ''
      } bg-nvidia-gray-dark border-nvidia-gray-medium hover:border-indigo-500 transition-colors`}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-2 mb-2">
          <div className="p-1.5 bg-indigo-500/20 rounded">
            <Database className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm text-white">{data.label || 'Knowledge Search'}</div>
            {data.query && (
              <div className="text-xs text-muted-foreground truncate">
                Query: {data.query}
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
          <Badge variant="secondary" className="text-xs">
            Top {data.topK || 5}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Threshold: {data.threshold || 0.7}
          </Badge>
        </div>

        <Handle
          type="target"
          position={Position.Left}
          className="!bg-indigo-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-indigo-500 !w-3 !h-3 !border-2 !border-nvidia-gray-dark"
        />
      </CardContent>
    </Card>
  );
});

KnowledgeNode.displayName = 'KnowledgeNode';
