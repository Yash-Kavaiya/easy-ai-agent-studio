import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWorkflowStore } from '@/store/workflowStore';
import { WorkflowNode, NodeType } from '@/types/workflow.types';
import { AIAgentSettings } from './settings/AIAgentSettings';
import { ToolSettings } from './settings/ToolSettings';
import { ConditionSettings } from './settings/ConditionSettings';
import { LoopSettings } from './settings/LoopSettings';
import { TransformSettings } from './settings/TransformSettings';
import { KnowledgeSettings } from './settings/KnowledgeSettings';
import { HumanInputSettings } from './settings/HumanInputSettings';

interface NodeSettingsPanelProps {
  onClose: () => void;
}

export const NodeSettingsPanel: React.FC<NodeSettingsPanelProps> = ({ onClose }) => {
  const { selectedNodeId, getNodes, updateNode } = useWorkflowStore();
  const nodes = getNodes();
  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const [localData, setLocalData] = useState(selectedNode?.data || {});

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
    updateNode(selectedNode.id, { data: newData });
  };

  const handleLabelChange = (label: string) => {
    const newData = { ...localData, label };
    setLocalData(newData);
    updateNode(selectedNode.id, { data: newData });
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
          <div className="text-sm text-nvidia-gray-light">
            This node type has no additional settings.
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

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-nvidia-gray-dark border-l border-nvidia-gray-medium shadow-lg z-50 overflow-y-auto">
      <div className="sticky top-0 bg-nvidia-gray-dark border-b border-nvidia-gray-medium p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Node Settings</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Node Type Badge */}
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-nvidia-green/20 text-nvidia-green">
            {getNodeTypeName(selectedNode.type)}
          </span>
        </div>

        {/* Node Label */}
        <div className="space-y-2">
          <Label htmlFor="node-label" className="text-white">Node Label</Label>
          <Input
            id="node-label"
            value={localData.label || ''}
            onChange={(e) => handleLabelChange(e.target.value)}
            placeholder="Enter node label"
            className="bg-nvidia-gray-medium border-nvidia-gray-light text-white"
          />
        </div>

        {/* Node Description */}
        <div className="space-y-2">
          <Label htmlFor="node-description" className="text-white">Description</Label>
          <Textarea
            id="node-description"
            value={localData.description || ''}
            onChange={(e) => handleUpdate({ description: e.target.value })}
            placeholder="Optional description"
            className="bg-nvidia-gray-medium border-nvidia-gray-light text-white min-h-[80px]"
          />
        </div>

        {/* Node-Specific Settings */}
        <div className="border-t border-nvidia-gray-medium pt-6">
          <h3 className="text-sm font-semibold text-white mb-4">Node Configuration</h3>
          {renderNodeSpecificSettings()}
        </div>
      </div>
    </div>
  );
};
