import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import { SettingsDialog } from "@/components/studio/settings/SettingsDialog";
import { ProjectManager } from "@/components/studio/project/ProjectManager";
import { ChatInterface } from "@/components/studio/chat/ChatInterface";
import { ModelSelector } from "@/components/studio/model/ModelSelector";
import { NodeLibrary } from "@/components/studio/workflow/NodeLibrary";
import { ToolsLibrary } from "@/components/studio/actions/ToolsLibrary";
import { KnowledgeBase } from "@/components/studio/knowledge/KnowledgeBase";
import { NodeSettingsPanel } from "@/components/studio/workflow/NodeSettingsPanel";
import { TemplatesLibrary } from "@/components/studio/workflow/TemplatesLibrary";
import { useWorkflowStore } from "@/store/workflowStore";
import { Settings, Library, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Studio = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const { selectedNodeId, setSelectedNode, clearWorkflow } = useWorkflowStore();

  const handleCloseNodeSettings = () => {
    setSelectedNode(null);
  };

  const handleClearWorkflow = () => {
    if (confirm('Are you sure you want to clear the current workflow? This action cannot be undone.')) {
      clearWorkflow();
    }
  };

  return (
    <div className="min-h-screen bg-nvidia-black">
      <div className="flex w-full">
        <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                      Easy AI <span className="text-nvidia-green">Studio</span>
                    </h1>
                    <p className="text-gray-300 text-lg">
                      Build, test, and deploy AI agents with our intuitive visual editor
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ProjectManager />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSettings(true)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main Studio Content */}
              <Tabs defaultValue="workflow" className="w-full">
                <TabsList className="grid w-full grid-cols-6 mb-6">
                  <TabsTrigger value="workflow">Workflow</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
                  <TabsTrigger value="model">Model Config</TabsTrigger>
                  <TabsTrigger value="tools">Tools</TabsTrigger>
                </TabsList>

                {/* Workflow Tab */}
                <TabsContent value="workflow" className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white">Workflow Builder</h2>
                      <p className="text-sm text-gray-400">Design your AI agent workflow visually</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearWorkflow}
                        className="gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Clear Workflow
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTemplates(true)}
                        className="gap-2"
                      >
                        <Library className="h-4 w-4" />
                        Templates Library
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Workflow Canvas */}
                    <div className="lg:col-span-3 bg-nvidia-gray-dark rounded-lg border border-nvidia-gray-medium overflow-hidden" style={{ height: '600px' }}>
                      <WorkflowCanvas />
                    </div>

                    {/* Node Library */}
                    <div style={{ height: '600px' }}>
                      <NodeLibrary />
                    </div>
                  </div>
                </TabsContent>

                {/* Templates Tab */}
                <TabsContent value="templates">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-semibold text-white mb-4">Workflow Templates</h2>
                      <p className="text-gray-400 mb-6">Browse and use pre-built workflow templates</p>
                      <Button onClick={() => setShowTemplates(true)} className="gap-2">
                        <Library className="h-4 w-4" />
                        Open Templates Library
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Chat Tab */}
                <TabsContent value="chat">
                  <div style={{ height: '600px' }}>
                    <ChatInterface />
                  </div>
                </TabsContent>

                {/* Knowledge Base Tab */}
                <TabsContent value="knowledge">
                  <KnowledgeBase />
                </TabsContent>

                {/* Model Config Tab */}
                <TabsContent value="model">
                  <div className="max-w-2xl mx-auto">
                    <ModelSelector />
                  </div>
                </TabsContent>

                {/* Tools Tab */}
                <TabsContent value="tools">
                  <div className="max-w-2xl mx-auto" style={{ height: '600px' }}>
                    <ToolsLibrary />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>

      {/* Settings Dialog */}
      <SettingsDialog open={showSettings} onOpenChange={setShowSettings} />

      {/* Templates Library */}
      {showTemplates && <TemplatesLibrary onClose={() => setShowTemplates(false)} />}

      {/* Node Settings Panel */}
      {selectedNodeId && <NodeSettingsPanel onClose={handleCloseNodeSettings} />}
    </div>
  );
};

export default Studio;
