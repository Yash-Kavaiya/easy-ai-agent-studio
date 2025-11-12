import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HumanInputNodeData } from '@/types/workflow.types';

interface HumanInputSettingsProps {
  data: Partial<HumanInputNodeData>;
  onUpdate: (updates: Partial<HumanInputNodeData>) => void;
}

export const HumanInputSettings: React.FC<HumanInputSettingsProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-4">
      {/* Prompt */}
      <div className="space-y-2">
        <Label className="text-white">Prompt Message</Label>
        <Textarea
          value={data.prompt || ''}
          onChange={(e) => onUpdate({ prompt: e.target.value })}
          placeholder="Enter the prompt to show to the user"
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white min-h-[100px]"
        />
        <p className="text-xs text-nvidia-gray-light">
          Message displayed to the user when requesting input
        </p>
      </div>

      {/* Input Type */}
      <div className="space-y-2">
        <Label className="text-white">Input Type</Label>
        <Select
          value={data.inputType || 'text'}
          onValueChange={(value: any) => onUpdate({ inputType: value })}
        >
          <SelectTrigger className="bg-nvidia-gray-medium border-nvidia-gray-light text-white">
            <SelectValue placeholder="Select input type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="select">Select</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Options (for select type) */}
      {data.inputType === 'select' && (
        <div className="space-y-2">
          <Label className="text-white">Options</Label>
          <Textarea
            value={data.options?.join('\n') || ''}
            onChange={(e) => onUpdate({ options: e.target.value.split('\n').filter(o => o.trim()) })}
            placeholder="Option 1&#x0A;Option 2&#x0A;Option 3"
            className="bg-nvidia-gray-medium border-nvidia-gray-light text-white min-h-[100px]"
          />
          <p className="text-xs text-nvidia-gray-light">
            Available options (one per line)
          </p>
        </div>
      )}

      {/* Variable Name */}
      <div className="space-y-2">
        <Label className="text-white">Variable Name</Label>
        <Input
          value={data.variableName || 'userInput'}
          onChange={(e) => onUpdate({ variableName: e.target.value })}
          placeholder="userInput"
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white"
        />
        <p className="text-xs text-nvidia-gray-light">
          Variable name to store the user's input
        </p>
      </div>
    </div>
  );
};
