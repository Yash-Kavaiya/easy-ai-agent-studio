import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LoopNodeData } from '@/types/workflow.types';

interface LoopSettingsProps {
  data: Partial<LoopNodeData>;
  onUpdate: (updates: Partial<LoopNodeData>) => void;
}

export const LoopSettings: React.FC<LoopSettingsProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-4">
      {/* Iterable */}
      <div className="space-y-2">
        <Label className="text-white">Iterable</Label>
        <Input
          value={data.iterable || ''}
          onChange={(e) => onUpdate({ iterable: e.target.value })}
          placeholder="e.g., data.items"
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white"
        />
        <p className="text-xs text-nvidia-gray-light">
          Array or collection to iterate over
        </p>
      </div>

      {/* Item Variable */}
      <div className="space-y-2">
        <Label className="text-white">Item Variable</Label>
        <Input
          value={data.itemVariable || 'item'}
          onChange={(e) => onUpdate({ itemVariable: e.target.value })}
          placeholder="item"
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white"
        />
        <p className="text-xs text-nvidia-gray-light">
          Variable name for each item in the loop
        </p>
      </div>

      {/* Max Iterations */}
      <div className="space-y-2">
        <Label className="text-white">Max Iterations</Label>
        <Input
          type="number"
          min="1"
          max="10000"
          value={data.maxIterations || 100}
          onChange={(e) => onUpdate({ maxIterations: parseInt(e.target.value) })}
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white"
        />
        <p className="text-xs text-nvidia-gray-light">
          Maximum number of iterations to prevent infinite loops
        </p>
      </div>
    </div>
  );
};
