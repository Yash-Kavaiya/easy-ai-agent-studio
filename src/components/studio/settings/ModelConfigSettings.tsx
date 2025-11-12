/**
 * Model Configuration Settings Component
 */

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProjectStore } from '@/store/projectStore';
import { Eye, EyeOff, Trash2, Plus } from 'lucide-react';
import { ModelProvider } from '@/types/model.types';

export function ModelConfigSettings() {
  const { settings, updateSettings } = useProjectStore();
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const addProvider = () => {
    const newProvider = {
      provider: 'openai' as ModelProvider,
      apiKey: '',
      enabled: true,
      models: []
    };

    updateSettings({
      models: {
        ...settings.models,
        providers: [...settings.models.providers, newProvider]
      }
    });
  };

  const updateProvider = (index: number, updates: any) => {
    const providers = [...settings.models.providers];
    providers[index] = { ...providers[index], ...updates };

    updateSettings({
      models: { ...settings.models, providers }
    });
  };

  const removeProvider = (index: number) => {
    const providers = settings.models.providers.filter((_, i) => i !== index);
    updateSettings({
      models: { ...settings.models, providers }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Model Configuration</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Configure AI model providers and API keys
        </p>
      </div>

      {/* Default Provider */}
      <div className="space-y-2">
        <Label htmlFor="default-provider">Default Provider</Label>
        <Select
          value={settings.models.defaultProvider}
          onValueChange={(value) =>
            updateSettings({
              models: { ...settings.models, defaultProvider: value }
            })
          }
        >
          <SelectTrigger id="default-provider">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="openai">OpenAI</SelectItem>
            <SelectItem value="anthropic">Anthropic</SelectItem>
            <SelectItem value="ollama">Ollama</SelectItem>
            <SelectItem value="cohere">Cohere</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Fallback Enabled */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="fallback-enabled">Enable Fallback</Label>
          <p className="text-sm text-muted-foreground">
            Automatically fallback to alternative models on failure
          </p>
        </div>
        <Switch
          id="fallback-enabled"
          checked={settings.models.fallbackEnabled}
          onCheckedChange={(checked) =>
            updateSettings({
              models: { ...settings.models, fallbackEnabled: checked }
            })
          }
        />
      </div>

      {/* Cost Limit */}
      <div className="space-y-2">
        <Label htmlFor="cost-limit">Cost Limit (USD)</Label>
        <Input
          id="cost-limit"
          type="number"
          min={0}
          step={10}
          value={settings.models.costLimit}
          onChange={(e) =>
            updateSettings({
              models: { ...settings.models, costLimit: parseFloat(e.target.value) }
            })
          }
        />
        <p className="text-sm text-muted-foreground">
          Maximum monthly cost allowed
        </p>
      </div>

      {/* Token Limit */}
      <div className="space-y-2">
        <Label htmlFor="token-limit">Token Limit</Label>
        <Input
          id="token-limit"
          type="number"
          min={0}
          step={100000}
          value={settings.models.tokenLimit}
          onChange={(e) =>
            updateSettings({
              models: { ...settings.models, tokenLimit: parseInt(e.target.value) }
            })
          }
        />
        <p className="text-sm text-muted-foreground">
          Maximum monthly tokens allowed
        </p>
      </div>

      {/* API Providers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>API Providers</Label>
          <Button onClick={addProvider} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Provider
          </Button>
        </div>

        {settings.models.providers.map((provider, index) => (
          <Card key={index} className="border-nvidia-gray-light">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {provider.provider.charAt(0).toUpperCase() + provider.provider.slice(1)}
                </CardTitle>
                <Button
                  onClick={() => removeProvider(index)}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Provider Selection */}
              <div className="space-y-2">
                <Label>Provider</Label>
                <Select
                  value={provider.provider}
                  onValueChange={(value) =>
                    updateProvider(index, { provider: value as ModelProvider })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                    <SelectItem value="ollama">Ollama</SelectItem>
                    <SelectItem value="cohere">Cohere</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* API Key */}
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <Input
                    type={showKeys[index] ? 'text' : 'password'}
                    value={provider.apiKey}
                    onChange={(e) =>
                      updateProvider(index, { apiKey: e.target.value })
                    }
                    placeholder="sk-..."
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setShowKeys({ ...showKeys, [index]: !showKeys[index] })
                    }
                  >
                    {showKeys[index] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Base URL (for custom providers) */}
              {provider.provider === 'custom' && (
                <div className="space-y-2">
                  <Label>Base URL</Label>
                  <Input
                    value={provider.baseURL || ''}
                    onChange={(e) =>
                      updateProvider(index, { baseURL: e.target.value })
                    }
                    placeholder="https://api.example.com/v1"
                  />
                </div>
              )}

              {/* Enabled Switch */}
              <div className="flex items-center justify-between">
                <Label>Enabled</Label>
                <Switch
                  checked={provider.enabled}
                  onCheckedChange={(checked) =>
                    updateProvider(index, { enabled: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}

        {settings.models.providers.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                No providers configured
              </p>
              <Button onClick={addProvider} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Provider
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
