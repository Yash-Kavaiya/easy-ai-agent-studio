import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TransformNodeData } from '@/types/workflow.types';

interface TransformSettingsProps {
  data: Partial<TransformNodeData>;
  onUpdate: (updates: Partial<TransformNodeData>) => void;
}

export const TransformSettings: React.FC<TransformSettingsProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-4">
      {/* Transform Script */}
      <div className="space-y-2">
        <Label className="text-white">Transform Script</Label>
        <Textarea
          value={data.transformScript || ''}
          onChange={(e) => onUpdate({ transformScript: e.target.value })}
          placeholder="// Transform the data&#x0A;return { ...input, processed: true };"
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white min-h-[200px] font-mono text-sm"
        />
        <p className="text-xs text-nvidia-gray-light">
          JavaScript code to transform the input data. Use 'input' variable to access data.
        </p>
      </div>

      {/* Output Mapping */}
      <div className="space-y-2">
        <Label className="text-white">Output Mapping (JSON)</Label>
        <Textarea
          value={JSON.stringify(data.outputMapping || {}, null, 2)}
          onChange={(e) => {
            try {
              const mapping = JSON.parse(e.target.value);
              onUpdate({ outputMapping: mapping });
            } catch (err) {
              // Invalid JSON, don't update
            }
          }}
          placeholder='{\n  "outputField": "input.sourceField"\n}'
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white min-h-[120px] font-mono text-sm"
        />
        <p className="text-xs text-nvidia-gray-light">
          Map input fields to output fields
        </p>
      </div>
    </div>
  );
};
