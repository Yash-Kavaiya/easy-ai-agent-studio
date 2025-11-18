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
import { NodeConfigDialog } from "@/components/studio/workflow/NodeConfigDialog";
import { TemplateLibrary } from "@/components/studio/workflow/TemplateLibrary";
import { WorkflowControls } from "@/components/studio/workflow/WorkflowControls";
import { useWorkflowStore } from "@/store/workflowStore";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Studio = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [configDialogNodeId, setConfigDialogNodeId] = useState<string | null>(null);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const { selectedNodeId, setSelectedNode } = useWorkflowStore();

  const handleCloseNodeSettings = () => {
    setSelectedNode(null);
  };

  const handleOpenConfigDialog = (nodeId: string) => {
    setConfigDialogNodeId(nodeId);
    setShowConfigDialog(true);
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
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Workflow Canvas */}
                    <div className="lg:col-span-3 bg-nvidia-gray-dark rounded-lg border border-nvidia-gray-medium overflow-hidden" style={{ height: '600px' }}>
                      <WorkflowCanvas onNodeDoubleClick={handleOpenConfigDialog} />
                    </div>

                    {/* Node Library and Controls */}
                    <div className="space-y-4" style={{ height: '600px' }}>
                      <NodeLibrary />
                    </div>
                  </div>

                  {/* Workflow Execution Controls */}
                  <div className="max-w-4xl mx-auto">
                    <WorkflowControls />
                  </div>
                </TabsContent>

                {/* Templates Tab */}
                <TabsContent value="templates">
                  <div className="max-w-4xl mx-auto">
                    <TemplateLibrary />
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

      {/* Node Configuration Dialog */}
      <NodeConfigDialog
        nodeId={configDialogNodeId}
        open={showConfigDialog}
        onOpenChange={setShowConfigDialog}
      />

      {/* Node Settings Panel */}
      {selectedNodeId && <NodeSettingsPanel onClose={handleCloseNodeSettings} />}
    </div>
  );
};

export default Studio;
