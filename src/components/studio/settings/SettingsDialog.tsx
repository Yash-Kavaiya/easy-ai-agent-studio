/**
 * Settings Dialog Component
 * Main settings interface with tabs for different categories
 */

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AgentSettings } from './AgentSettings';
import { ModelConfigSettings } from './ModelConfigSettings';
import { Settings, Bot, Palette, Database, Wrench } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useProjectStore } from '@/store/projectStore';
import { DEFAULT_SETTINGS } from '@/types/settings.types';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { settings, updateSettings, resetSettings } = useProjectStore();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      resetSettings();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Configure your AI Agent Studio preferences and defaults
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="agent" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="agent" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Agent
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Models
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Knowledge
            </TabsTrigger>
            <TabsTrigger value="ui" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* Agent Settings */}
          <TabsContent value="agent" className="space-y-4 mt-6">
            <AgentSettings />
          </TabsContent>

          {/* Model Settings */}
          <TabsContent value="models" className="space-y-4 mt-6">
            <ModelConfigSettings />
          </TabsContent>

          {/* Knowledge Base Settings */}
          <TabsContent value="knowledge" className="space-y-4 mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Knowledge Base</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Configure document processing and embeddings
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chunk-size">Chunk Size</Label>
                <Input
                  id="chunk-size"
                  type="number"
                  min={100}
                  max={5000}
                  step={100}
                  value={settings.knowledge.chunkSize}
                  onChange={(e) =>
                    updateSettings({
                      knowledge: { ...settings.knowledge, chunkSize: parseInt(e.target.value) }
                    })
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Number of characters per chunk
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chunk-overlap">Chunk Overlap</Label>
                <Input
                  id="chunk-overlap"
                  type="number"
                  min={0}
                  max={1000}
                  step={50}
                  value={settings.knowledge.chunkOverlap}
                  onChange={(e) =>
                    updateSettings({
                      knowledge: { ...settings.knowledge, chunkOverlap: parseInt(e.target.value) }
                    })
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Characters overlap between chunks
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="embedding-model">Embedding Model</Label>
                <Select
                  value={settings.knowledge.embeddingModel}
                  onValueChange={(value) =>
                    updateSettings({
                      knowledge: { ...settings.knowledge, embeddingModel: value }
                    })
                  }
                >
                  <SelectTrigger id="embedding-model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-embedding-3-small">text-embedding-3-small</SelectItem>
                    <SelectItem value="text-embedding-3-large">text-embedding-3-large</SelectItem>
                    <SelectItem value="text-embedding-ada-002">text-embedding-ada-002</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-documents">Max Documents</Label>
                <Input
                  id="max-documents"
                  type="number"
                  min={1}
                  max={1000}
                  value={settings.knowledge.maxDocuments}
                  onChange={(e) =>
                    updateSettings({
                      knowledge: { ...settings.knowledge, maxDocuments: parseInt(e.target.value) }
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-update">Auto Update</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically update embeddings when documents change
                  </p>
                </div>
                <Switch
                  id="auto-update"
                  checked={settings.knowledge.autoUpdate}
                  onCheckedChange={(checked) =>
                    updateSettings({
                      knowledge: { ...settings.knowledge, autoUpdate: checked }
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>

          {/* UI Settings */}
          <TabsContent value="ui" className="space-y-4 mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Customize the look and feel of the studio
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.ui.theme}
                  onValueChange={(value: any) =>
                    updateSettings({
                      ui: { ...settings.ui, theme: value }
                    })
                  }
                >
                  <SelectTrigger id="theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select
                  value={settings.ui.fontSize}
                  onValueChange={(value: any) =>
                    updateSettings({
                      ui: { ...settings.ui, fontSize: value }
                    })
                  }
                >
                  <SelectTrigger id="font-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-line-numbers">Show Line Numbers</Label>
                  <p className="text-sm text-muted-foreground">
                    Display line numbers in code editors
                  </p>
                </div>
                <Switch
                  id="show-line-numbers"
                  checked={settings.ui.showLineNumbers}
                  onCheckedChange={(checked) =>
                    updateSettings({
                      ui: { ...settings.ui, showLineNumbers: checked }
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-animations">Enable Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Use animations and transitions
                  </p>
                </div>
                <Switch
                  id="enable-animations"
                  checked={settings.ui.enableAnimations}
                  onCheckedChange={(checked) =>
                    updateSettings({
                      ui: { ...settings.ui, enableAnimations: checked }
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-mode">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Use more compact spacing
                  </p>
                </div>
                <Switch
                  id="compact-mode"
                  checked={settings.ui.compactMode}
                  onCheckedChange={(checked) =>
                    updateSettings({
                      ui: { ...settings.ui, compactMode: checked }
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-4 mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Advanced</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Advanced configuration options
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Show detailed debug information
                  </p>
                </div>
                <Switch
                  id="debug-mode"
                  checked={settings.advanced.debugMode}
                  onCheckedChange={(checked) =>
                    updateSettings({
                      advanced: { ...settings.advanced, debugMode: checked }
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="log-level">Log Level</Label>
                <Select
                  value={settings.advanced.logLevel}
                  onValueChange={(value: any) =>
                    updateSettings({
                      advanced: { ...settings.advanced, logLevel: value }
                    })
                  }
                >
                  <SelectTrigger id="log-level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="performance-mode">Performance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Optimize for performance (may reduce features)
                  </p>
                </div>
                <Switch
                  id="performance-mode"
                  checked={settings.advanced.performanceMode}
                  onCheckedChange={(checked) =>
                    updateSettings({
                      advanced: { ...settings.advanced, performanceMode: checked }
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="experimental-features">Experimental Features</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable experimental and beta features
                  </p>
                </div>
                <Switch
                  id="experimental-features"
                  checked={settings.advanced.experimentalFeatures}
                  onCheckedChange={(checked) =>
                    updateSettings({
                      advanced: { ...settings.advanced, experimentalFeatures: checked }
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button onClick={handleReset} variant="outline">
            Reset to Defaults
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Fix missing Input import
import { Input } from '@/components/ui/input';
