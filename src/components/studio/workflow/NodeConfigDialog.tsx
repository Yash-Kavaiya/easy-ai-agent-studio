/**
 * Node Configuration Dialog Component
 * Dialog-based interface for configuring node properties
 */

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, X } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';
import { WorkflowNode, NodeType } from '@/types/workflow.types';
import { AIAgentSettings } from './settings/AIAgentSettings';
import { ToolSettings } from './settings/ToolSettings';
import { ConditionSettings } from './settings/ConditionSettings';
import { LoopSettings } from './settings/LoopSettings';
import { TransformSettings } from './settings/TransformSettings';
import { KnowledgeSettings } from './settings/KnowledgeSettings';
import { HumanInputSettings } from './settings/HumanInputSettings';

interface NodeConfigDialogProps {
  nodeId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NodeConfigDialog: React.FC<NodeConfigDialogProps> = ({
  nodeId,
  open,
  onOpenChange
}) => {
  const { getNodes, updateNode } = useWorkflowStore();
  const nodes = getNodes();
  const selectedNode = nodes.find(n => n.id === nodeId);

  const [localData, setLocalData] = useState<any>(selectedNode?.data || {});

  useEffect(() => {
    if (selectedNode) {
      setLocalData(selectedNode.data);
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return null;
  }

  const handleUpdate = (updates: any) => {
    const newData = { ...localData, ...updates };
    setLocalData(newData);
  };

  const handleSave = () => {
    updateNode(selectedNode.id, { data: localData });
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset local data to original
    setLocalData(selectedNode.data);
    onOpenChange(false);
  };

  const handleLabelChange = (label: string) => {
    setLocalData({ ...localData, label });
  };

  const renderNodeSpecificSettings = () => {
    switch (selectedNode.type) {
      case NodeType.AI_AGENT:
        return <AIAgentSettings data={localData} onUpdate={handleUpdate} />;
      case NodeType.TOOL:
        return <ToolSettings data={localData} onUpdate={handleUpdate} />;
      case NodeType.CONDITION:
        return <ConditionSettings data={localData} onUpdate={handleUpdate} />;
      case NodeType.LOOP:
        return <LoopSettings data={localData} onUpdate={handleUpdate} />;
      case NodeType.TRANSFORM:
        return <TransformSettings data={localData} onUpdate={handleUpdate} />;
      case NodeType.KNOWLEDGE:
        return <KnowledgeSettings data={localData} onUpdate={handleUpdate} />;
      case NodeType.HUMAN_INPUT:
        return <HumanInputSettings data={localData} onUpdate={handleUpdate} />;
      case NodeType.START:
      case NodeType.END:
      case NodeType.MERGE:
        return (
          <div className="text-sm text-nvidia-gray-light p-4 bg-nvidia-gray-dark/50 rounded border border-nvidia-gray-medium">
            This node type has no additional configuration options.
          </div>
        );
      default:
        return null;
    }
  };

  const getNodeTypeName = (type: NodeType): string => {
    const typeNames: Record<NodeType, string> = {
      [NodeType.START]: 'Start',
      [NodeType.END]: 'End',
      [NodeType.AI_AGENT]: 'AI Agent',
      [NodeType.TOOL]: 'Tool',
      [NodeType.CONDITION]: 'Condition',
      [NodeType.LOOP]: 'Loop',
      [NodeType.TRANSFORM]: 'Transform',
      [NodeType.KNOWLEDGE]: 'Knowledge',
      [NodeType.HUMAN_INPUT]: 'Human Input',
      [NodeType.MERGE]: 'Merge',
    };
    return typeNames[type] || type;
  };

  const getNodeTypeColor = (type: NodeType): string => {
    const colors: Record<NodeType, string> = {
      [NodeType.START]: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      [NodeType.END]: 'bg-red-500/20 text-red-400 border-red-500/30',
      [NodeType.AI_AGENT]: 'bg-nvidia-green/20 text-nvidia-green border-nvidia-green/30',
      [NodeType.TOOL]: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      [NodeType.CONDITION]: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      [NodeType.LOOP]: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      [NodeType.TRANSFORM]: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      [NodeType.KNOWLEDGE]: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      [NodeType.HUMAN_INPUT]: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      [NodeType.MERGE]: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    };
    return colors[type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] bg-nvidia-gray-dark border-nvidia-gray-medium">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white flex items-center gap-3">
            <Badge className={`${getNodeTypeColor(selectedNode.type)} border px-3 py-1`}>
              {getNodeTypeName(selectedNode.type)}
            </Badge>
            <span className="text-nvidia-gray-light text-sm font-mono">
              {selectedNode.id}
            </span>
          </DialogTitle>
          <DialogDescription className="text-nvidia-gray-light">
            Configure the properties and settings for this node
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6 py-4">
            {/* Node Label */}
            <div className="space-y-2">
              <Label htmlFor="dialog-node-label" className="text-white font-medium">
                Node Label
              </Label>
              <Input
                id="dialog-node-label"
                value={localData.label || ''}
                onChange={(e) => handleLabelChange(e.target.value)}
                placeholder="Enter node label"
                className="bg-nvidia-gray-medium border-nvidia-gray-light text-white"
              />
            </div>

            {/* Node Description */}
            <div className="space-y-2">
              <Label htmlFor="dialog-node-description" className="text-white font-medium">
                Description (Optional)
              </Label>
              <Textarea
                id="dialog-node-description"
                value={localData.description || ''}
                onChange={(e) => handleUpdate({ description: e.target.value })}
                placeholder="Add a description for this node"
                className="bg-nvidia-gray-medium border-nvidia-gray-light text-white min-h-[80px]"
              />
            </div>

            {/* Separator */}
            <div className="border-t border-nvidia-gray-medium" />

            {/* Node-Specific Settings */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="h-px w-8 bg-nvidia-green"></span>
                Configuration
              </h3>
              {renderNodeSpecificSettings()}
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="border-t border-nvidia-gray-medium pt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-nvidia-gray-light text-white hover:bg-nvidia-gray-medium"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-nvidia-green hover:bg-nvidia-green-light text-black font-medium"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
