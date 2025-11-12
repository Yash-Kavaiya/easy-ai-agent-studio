import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ToolNodeData } from '@/types/workflow.types';

interface ToolSettingsProps {
  data: Partial<ToolNodeData>;
  onUpdate: (updates: Partial<ToolNodeData>) => void;
}

export const ToolSettings: React.FC<ToolSettingsProps> = ({ data, onUpdate }) => {
  const handleParameterChange = (key: string, value: string) => {
    const parameters = { ...(data.parameters || {}), [key]: value };
    onUpdate({ parameters });
  };

  return (
    <div className="space-y-4">
      {/* Tool ID */}
      <div className="space-y-2">
        <Label className="text-white">Tool ID</Label>
        <Input
          value={data.toolId || ''}
          onChange={(e) => onUpdate({ toolId: e.target.value })}
          placeholder="Enter tool identifier"
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white"
        />
        <p className="text-xs text-nvidia-gray-light">
          Unique identifier for the tool to execute
        </p>
      </div>

      {/* Parameters */}
      <div className="space-y-2">
        <Label className="text-white">Parameters (JSON)</Label>
        <Textarea
          value={JSON.stringify(data.parameters || {}, null, 2)}
          onChange={(e) => {
            try {
              const params = JSON.parse(e.target.value);
              onUpdate({ parameters: params });
            } catch (err) {
              // Invalid JSON, don't update
            }
          }}
          placeholder='{\n  "key": "value"\n}'
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white min-h-[120px] font-mono text-sm"
        />
        <p className="text-xs text-nvidia-gray-light">
          Tool parameters as JSON object
        </p>
      </div>

      {/* Timeout */}
      <div className="space-y-2">
        <Label className="text-white">Timeout (seconds)</Label>
        <Input
          type="number"
          min="1"
          max="300"
          value={data.timeout || 30}
          onChange={(e) => onUpdate({ timeout: parseInt(e.target.value) })}
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white"
        />
        <p className="text-xs text-nvidia-gray-light">
          Maximum execution time for this tool
        </p>
      </div>
    </div>
  );
};
