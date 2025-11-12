import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { KnowledgeNodeData } from '@/types/workflow.types';

interface KnowledgeSettingsProps {
  data: Partial<KnowledgeNodeData>;
  onUpdate: (updates: Partial<KnowledgeNodeData>) => void;
}

export const KnowledgeSettings: React.FC<KnowledgeSettingsProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-4">
      {/* Knowledge Base ID */}
      <div className="space-y-2">
        <Label className="text-white">Knowledge Base ID</Label>
        <Input
          value={data.knowledgeBaseId || ''}
          onChange={(e) => onUpdate({ knowledgeBaseId: e.target.value })}
          placeholder="Enter knowledge base ID"
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white"
        />
        <p className="text-xs text-nvidia-gray-light">
          ID of the knowledge base to query
        </p>
      </div>

      {/* Query */}
      <div className="space-y-2">
        <Label className="text-white">Query</Label>
        <Textarea
          value={data.query || ''}
          onChange={(e) => onUpdate({ query: e.target.value })}
          placeholder="Enter search query or use variables like {input.question}"
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white min-h-[100px]"
        />
        <p className="text-xs text-nvidia-gray-light">
          Query to search in the knowledge base
        </p>
      </div>

      {/* Top K Results */}
      <div className="space-y-2">
        <Label className="text-white">Top K Results</Label>
        <Input
          type="number"
          min="1"
          max="100"
          value={data.topK || 5}
          onChange={(e) => onUpdate({ topK: parseInt(e.target.value) })}
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white"
        />
        <p className="text-xs text-nvidia-gray-light">
          Number of most relevant results to return
        </p>
      </div>
    </div>
  );
};
