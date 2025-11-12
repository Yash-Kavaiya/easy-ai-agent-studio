/**
 * Model Selector Component
 * Select and configure AI models with parameter tuning
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModelProvider, AVAILABLE_MODELS, NVIDIA_MODELS, ModelConfig } from '@/types/model.types';
import { Brain, DollarSign, Zap, Eye, Cpu } from 'lucide-react';

interface ModelSelectorProps {
  value?: ModelConfig;
  onChange?: (config: ModelConfig) => void;
  showPlayground?: boolean;
}

export function ModelSelector({ value, onChange, showPlayground = false }: ModelSelectorProps) {
  const [provider, setProvider] = useState<ModelProvider>(value?.provider || 'openai');
  const [selectedModel, setSelectedModel] = useState(value?.model || 'gpt-3.5-turbo');
  const [temperature, setTemperature] = useState(value?.temperature || 0.7);
  const [maxTokens, setMaxTokens] = useState(value?.maxTokens || 2048);
  const [topP, setTopP] = useState(value?.topP || 1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(value?.frequencyPenalty || 0);
  const [presencePenalty, setPresencePenalty] = useState(value?.presencePenalty || 0);

  // Combine available models with NVIDIA models for 'custom' provider
  const models = provider === 'custom'
    ? NVIDIA_MODELS
    : AVAILABLE_MODELS[provider] || [];
  const modelInfo = models.find((m) => m.id === selectedModel);

  const handleProviderChange = (newProvider: ModelProvider) => {
    setProvider(newProvider);
    const firstModel = newProvider === 'custom'
      ? NVIDIA_MODELS[0]
      : AVAILABLE_MODELS[newProvider]?.[0];
    if (firstModel) {
      setSelectedModel(firstModel.id);
    }
  };

  const estimatedCost = modelInfo
    ? ((maxTokens / 1000000) * modelInfo.pricing.input).toFixed(4)
    : '0';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-nvidia-green" />
          Model Configuration
        </CardTitle>
        <CardDescription>Select and tune your AI model parameters</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs value={provider} onValueChange={(v) => handleProviderChange(v as ModelProvider)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="openai">OpenAI</TabsTrigger>
            <TabsTrigger value="anthropic">Anthropic</TabsTrigger>
            <TabsTrigger value="ollama">Ollama</TabsTrigger>
            <TabsTrigger value="custom">
              <Cpu className="h-4 w-4 mr-1" />
              NVIDIA
            </TabsTrigger>
          </TabsList>

          {(['openai', 'anthropic', 'ollama', 'custom'] as ModelProvider[]).map((p) => (
            <TabsContent key={p} value={p} className="space-y-4 mt-4">
              {/* Model Selection */}
              <div className="space-y-2">
                <Label htmlFor={`model-${p}`}>Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger id={`model-${p}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(p === 'custom' ? NVIDIA_MODELS : AVAILABLE_MODELS[p] || []).map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{model.name}</span>
                          {model.pricing.input > 0 && (
                            <span className="text-xs text-muted-foreground ml-2">
                              ${model.pricing.input}/1M tokens
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Model Info */}
                {modelInfo && (
                  <div className="mt-2 p-3 bg-nvidia-gray-dark rounded-lg space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Context Window:</span>
                      <Badge variant="outline">
                        {modelInfo.contextWindow.toLocaleString()} tokens
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Max Output:</span>
                      <Badge variant="outline">
                        {modelInfo.maxOutput.toLocaleString()} tokens
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {modelInfo.capabilities.streaming && (
                        <Badge variant="secondary">
                          <Zap className="h-3 w-3 mr-1" />
                          Streaming
                        </Badge>
                      )}
                      {modelInfo.capabilities.functionCalling && (
                        <Badge variant="secondary">Function Calling</Badge>
                      )}
                      {modelInfo.capabilities.vision && (
                        <Badge variant="secondary">
                          <Eye className="h-3 w-3 mr-1" />
                          Vision
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Parameters */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Model Parameters</h4>

          {/* Temperature */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="temperature">
                Temperature
                <span className="text-xs text-muted-foreground ml-2">
                  (Creativity)
                </span>
              </Label>
              <span className="text-sm text-muted-foreground">{temperature.toFixed(2)}</span>
            </div>
            <Slider
              id="temperature"
              min={0}
              max={2}
              step={0.01}
              value={[temperature]}
              onValueChange={([v]) => setTemperature(v)}
            />
            <p className="text-xs text-muted-foreground">
              Lower values make output more focused and deterministic
            </p>
          </div>

          {/* Max Tokens */}
          <div className="space-y-2">
            <Label htmlFor="max-tokens">Max Tokens</Label>
            <Input
              id="max-tokens"
              type="number"
              min={1}
              max={modelInfo?.maxOutput || 4096}
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">Maximum length of response</p>
          </div>

          {/* Top P */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="top-p">
                Top P <span className="text-xs text-muted-foreground ml-2">(Diversity)</span>
              </Label>
              <span className="text-sm text-muted-foreground">{topP.toFixed(2)}</span>
            </div>
            <Slider
              id="top-p"
              min={0}
              max={1}
              step={0.01}
              value={[topP]}
              onValueChange={([v]) => setTopP(v)}
            />
          </div>

          {/* Frequency Penalty */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="freq-penalty">Frequency Penalty</Label>
              <span className="text-sm text-muted-foreground">
                {frequencyPenalty.toFixed(2)}
              </span>
            </div>
            <Slider
              id="freq-penalty"
              min={-2}
              max={2}
              step={0.01}
              value={[frequencyPenalty]}
              onValueChange={([v]) => setFrequencyPenalty(v)}
            />
            <p className="text-xs text-muted-foreground">
              Penalize repeated tokens based on frequency
            </p>
          </div>

          {/* Presence Penalty */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="pres-penalty">Presence Penalty</Label>
              <span className="text-sm text-muted-foreground">
                {presencePenalty.toFixed(2)}
              </span>
            </div>
            <Slider
              id="pres-penalty"
              min={-2}
              max={2}
              step={0.01}
              value={[presencePenalty]}
              onValueChange={([v]) => setPresencePenalty(v)}
            />
            <p className="text-xs text-muted-foreground">
              Penalize repeated tokens based on presence
            </p>
          </div>
        </div>

        {/* Cost Estimate */}
        {modelInfo && modelInfo.pricing.input > 0 && (
          <div className="p-3 bg-nvidia-gray-dark rounded-lg border border-nvidia-gray-medium">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-nvidia-green" />
                <span className="text-sm font-medium">Estimated Cost (per request)</span>
              </div>
              <span className="text-lg font-bold text-nvidia-green">${estimatedCost}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {maxTokens} tokens at ${modelInfo.pricing.input}/1M input tokens
            </p>
          </div>
        )}

        {/* Save Button */}
        <Button
          className="w-full bg-nvidia-green hover:bg-nvidia-green-light text-black"
          onClick={() => {
            onChange?.({
              id: `config_${Date.now()}`,
              provider,
              model: selectedModel,
              temperature,
              maxTokens,
              topP,
              frequencyPenalty,
              presencePenalty,
              stop: [],
              streaming: true,
              jsonMode: false,
              enabled: true,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }}
        >
          Save Configuration
        </Button>
      </CardContent>
    </Card>
  );
}
