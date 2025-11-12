import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ConditionNodeData } from '@/types/workflow.types';

interface ConditionSettingsProps {
  data: Partial<ConditionNodeData>;
  onUpdate: (updates: Partial<ConditionNodeData>) => void;
}

export const ConditionSettings: React.FC<ConditionSettingsProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-4">
      {/* Expression */}
      <div className="space-y-2">
        <Label className="text-white">Expression</Label>
        <Input
          value={data.expression || ''}
          onChange={(e) => onUpdate({ expression: e.target.value })}
          placeholder="e.g., result.status"
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white"
        />
        <p className="text-xs text-nvidia-gray-light">
          The value or path to evaluate
        </p>
      </div>

      {/* Operator */}
      <div className="space-y-2">
        <Label className="text-white">Operator</Label>
        <Select
          value={data.operator || 'equals'}
          onValueChange={(value: any) => onUpdate({ operator: value })}
        >
          <SelectTrigger className="bg-nvidia-gray-medium border-nvidia-gray-light text-white">
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="equals">Equals</SelectItem>
            <SelectItem value="contains">Contains</SelectItem>
            <SelectItem value="greater">Greater Than</SelectItem>
            <SelectItem value="less">Less Than</SelectItem>
            <SelectItem value="regex">Regex Match</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Value */}
      <div className="space-y-2">
        <Label className="text-white">Compare Value</Label>
        <Input
          value={data.value || ''}
          onChange={(e) => onUpdate({ value: e.target.value })}
          placeholder="Value to compare against"
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white"
        />
        <p className="text-xs text-nvidia-gray-light">
          The value to compare the expression against
        </p>
      </div>
    </div>
  );
};
