/**
 * Agent Settings Component
 */

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useProjectStore } from '@/store/projectStore';

export function AgentSettings() {
  const { settings, updateSettings } = useProjectStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Agent Settings</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Configure default behavior for AI agents
        </p>
      </div>

      {/* Default Model */}
      <div className="space-y-2">
        <Label htmlFor="default-model">Default Model</Label>
        <Select
          value={settings.agent.defaultModel}
          onValueChange={(value) =>
            updateSettings({
              agent: { ...settings.agent, defaultModel: value }
            })
          }
        >
          <SelectTrigger id="default-model">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
            <SelectItem value="gpt-4">GPT-4</SelectItem>
            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
            <SelectItem value="claude-3-opus-20240229">Claude 3 Opus</SelectItem>
            <SelectItem value="claude-3-sonnet-20240229">Claude 3 Sonnet</SelectItem>
            <SelectItem value="claude-3-haiku-20240307">Claude 3 Haiku</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          The default AI model for new agents
        </p>
      </div>

      {/* Default Temperature */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="default-temperature">Default Temperature</Label>
          <span className="text-sm text-muted-foreground">
            {settings.agent.defaultTemperature.toFixed(1)}
          </span>
        </div>
        <Slider
          id="default-temperature"
          min={0}
          max={2}
          step={0.1}
          value={[settings.agent.defaultTemperature]}
          onValueChange={([value]) =>
            updateSettings({
              agent: { ...settings.agent, defaultTemperature: value }
            })
          }
          className="w-full"
        />
        <p className="text-sm text-muted-foreground">
          Controls randomness: 0 is focused, 2 is creative
        </p>
      </div>

      {/* Max Retries */}
      <div className="space-y-2">
        <Label htmlFor="max-retries">Max Retries</Label>
        <Input
          id="max-retries"
          type="number"
          min={0}
          max={10}
          value={settings.agent.maxRetries}
          onChange={(e) =>
            updateSettings({
              agent: { ...settings.agent, maxRetries: parseInt(e.target.value) }
            })
          }
        />
        <p className="text-sm text-muted-foreground">
          Number of retry attempts on failure
        </p>
      </div>

      {/* Timeout */}
      <div className="space-y-2">
        <Label htmlFor="timeout">Timeout (ms)</Label>
        <Input
          id="timeout"
          type="number"
          min={1000}
          max={300000}
          step={1000}
          value={settings.agent.timeout}
          onChange={(e) =>
            updateSettings({
              agent: { ...settings.agent, timeout: parseInt(e.target.value) }
            })
          }
        />
        <p className="text-sm text-muted-foreground">
          Maximum execution time per request
        </p>
      </div>

      {/* Enable Streaming */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="enable-streaming">Enable Streaming</Label>
          <p className="text-sm text-muted-foreground">
            Stream responses in real-time
          </p>
        </div>
        <Switch
          id="enable-streaming"
          checked={settings.agent.enableStreaming}
          onCheckedChange={(checked) =>
            updateSettings({
              agent: { ...settings.agent, enableStreaming: checked }
            })
          }
        />
      </div>

      {/* Save History */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="save-history">Save History</Label>
          <p className="text-sm text-muted-foreground">
            Automatically save conversation history
          </p>
        </div>
        <Switch
          id="save-history"
          checked={settings.agent.saveHistory}
          onCheckedChange={(checked) =>
            updateSettings({
              agent: { ...settings.agent, saveHistory: checked }
            })
          }
        />
      </div>
    </div>
  );
}
