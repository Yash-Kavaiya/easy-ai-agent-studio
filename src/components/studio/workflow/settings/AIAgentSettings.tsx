import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AIAgentNodeData } from '@/types/workflow.types';

interface AIAgentSettingsProps {
  data: Partial<AIAgentNodeData>;
  onUpdate: (updates: Partial<AIAgentNodeData>) => void;
}

export const AIAgentSettings: React.FC<AIAgentSettingsProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-4">
      {/* Model Selection */}
      <div className="space-y-2">
        <Label className="text-white">AI Model</Label>
        <Select
          value={data.model || 'gpt-4'}
          onValueChange={(value) => onUpdate({ model: value })}
        >
          <SelectTrigger className="bg-nvidia-gray-medium border-nvidia-gray-light text-white">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4">GPT-4</SelectItem>
            <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
            <SelectItem value="gpt-4o">GPT-4o</SelectItem>
            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
            <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
            <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
            <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
            <SelectItem value="claude-sonnet-4-5">Claude Sonnet 4.5</SelectItem>
            <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
            <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
            <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
            <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
            <SelectItem value="llama-3-8b">Llama 3 8B</SelectItem>
            <SelectItem value="mistral-large">Mistral Large</SelectItem>
            <SelectItem value="mistral-medium">Mistral Medium</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-nvidia-gray-light">
          Choose the AI model for this agent
        </p>
      </div>

      {/* System Prompt */}
      <div className="space-y-2">
        <Label className="text-white">System Prompt</Label>
        <Textarea
          value={data.systemPrompt || ''}
          onChange={(e) => onUpdate({ systemPrompt: e.target.value })}
          placeholder="Enter system prompt for the AI agent"
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white min-h-[120px]"
        />
      </div>

      {/* Temperature */}
      <div className="space-y-2">
        <Label className="text-white">Temperature: {data.temperature?.toFixed(2) || '0.70'}</Label>
        <Input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={data.temperature || 0.7}
          onChange={(e) => onUpdate({ temperature: parseFloat(e.target.value) })}
          className="bg-nvidia-gray-medium"
        />
        <p className="text-xs text-nvidia-gray-light">
          Controls randomness: 0 is focused, 2 is creative
        </p>
      </div>

      {/* Max Tokens */}
      <div className="space-y-2">
        <Label className="text-white">Max Tokens</Label>
        <Input
          type="number"
          min="1"
          max="32000"
          value={data.maxTokens || 2000}
          onChange={(e) => onUpdate({ maxTokens: parseInt(e.target.value) })}
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white"
        />
        <p className="text-xs text-nvidia-gray-light">
          Maximum length of the response
        </p>
      </div>

      {/* Tools */}
      <div className="space-y-2">
        <Label className="text-white">Available Tools</Label>
        <Textarea
          value={data.tools?.join('\n') || ''}
          onChange={(e) => onUpdate({ tools: e.target.value.split('\n').filter(t => t.trim()) })}
          placeholder="Enter tool names (one per line)"
          className="bg-nvidia-gray-medium border-nvidia-gray-light text-white min-h-[80px]"
        />
        <p className="text-xs text-nvidia-gray-light">
          Tools available to this agent (one per line)
        </p>
      </div>
    </div>
  );
};
