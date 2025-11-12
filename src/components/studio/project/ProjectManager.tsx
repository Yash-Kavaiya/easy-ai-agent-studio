/**
 * Project Manager Component
 * Handles project save, load, export, and import
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProjectStore } from '@/store/projectStore';
import { projectExporter, projectImporter } from '@/lib/storage/export';
import { ExportFormat, ExportOptions } from '@/types/project.types';
import { Save, Download, Upload, FolderOpen, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function ProjectManager() {
  const { projects, activeProjectId, createProject, deleteProject, setActiveProject } =
    useProjectStore();
  const [showNewProject, setShowNewProject] = useState(false);
  const [showLoadProject, setShowLoadProject] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  // Export state
  const [exportFormat, setExportFormat] = useState<ExportFormat>(ExportFormat.JSON);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: ExportFormat.JSON,
    includeKnowledge: true,
    includeTests: true,
    includeHistory: false,
    encrypted: false
  });

  const handleCreateProject = () => {
    if (!newProjectName.trim()) {
      toast.error('Please enter a project name');
      return;
    }

    const id = createProject(newProjectName, newProjectDesc);
    toast.success('Project created successfully');
    setShowNewProject(false);
    setNewProjectName('');
    setNewProjectDesc('');
    setActiveProject(id);
  };

  const handleLoadProject = (projectId: string) => {
    setActiveProject(projectId);
    setShowLoadProject(false);
    toast.success('Project loaded');
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId);
      toast.success('Project deleted');
    }
  };

  const handleExport = async () => {
    if (!activeProjectId) {
      toast.error('No active project to export');
      return;
    }

    const project = projects[activeProjectId];
    if (!project) {
      toast.error('Project not found');
      return;
    }

    try {
      const blob = await projectExporter.export(project, exportOptions);
      const extension = exportFormat === ExportFormat.ZIP ? 'zip' : 'json';
      const filename = `${project.name.replace(/\s+/g, '-')}-${Date.now()}.${extension}`;
      projectExporter.downloadBlob(blob, filename);
      toast.success('Project exported successfully');
      setShowExport(false);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export project');
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const project = await projectImporter.importFromFile(file);
      // Create new project with imported data
      const id = createProject(project.name, project.description);
      // TODO: Update project with imported data
      toast.success('Project imported successfully');
      setActiveProject(id);
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import project');
    }
  };

  const allProjects = Object.values(projects);

  return (
    <div className="flex items-center gap-2">
      {/* New Project */}
      <Dialog open={showNewProject} onOpenChange={setShowNewProject}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Start a new AI agent project from scratch
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="My AI Agent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-desc">Description</Label>
              <Textarea
                id="project-desc"
                value={newProjectDesc}
                onChange={(e) => setNewProjectDesc(e.target.value)}
                placeholder="What does this agent do?"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowNewProject(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProject}>Create Project</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Load Project */}
      <Dialog open={showLoadProject} onOpenChange={setShowLoadProject}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <FolderOpen className="h-4 w-4 mr-2" />
            Load Project
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Load Project</DialogTitle>
            <DialogDescription>
              Select a project to load and continue working on
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            {allProjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No projects found</p>
                <p className="text-sm mt-2">Create a new project to get started</p>
              </div>
            ) : (
              allProjects.map((project) => (
                <Card
                  key={project.id}
                  className={`cursor-pointer transition-colors hover:border-nvidia-green ${
                    project.id === activeProjectId ? 'border-nvidia-green' : ''
                  }`}
                  onClick={() => handleLoadProject(project.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{project.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {project.description || 'No description'}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>v{project.version}</span>
                      <span>•</span>
                      <span>Updated {project.updatedAt.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{project.workflow.nodes.length} nodes</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Export */}
      <Dialog open={showExport} onOpenChange={setShowExport}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" disabled={!activeProjectId}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Project</DialogTitle>
            <DialogDescription>
              Download your project in various formats
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="export-format">Format</Label>
              <Select
                value={exportFormat}
                onValueChange={(value) => {
                  const format = value as ExportFormat;
                  setExportFormat(format);
                  setExportOptions({ ...exportOptions, format });
                }}
              >
                <SelectTrigger id="export-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ExportFormat.JSON}>JSON</SelectItem>
                  <SelectItem value={ExportFormat.ZIP}>ZIP Archive</SelectItem>
                  <SelectItem value={ExportFormat.MARKDOWN}>Markdown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-knowledge">Include Knowledge Base</Label>
                <Switch
                  id="include-knowledge"
                  checked={exportOptions.includeKnowledge}
                  onCheckedChange={(checked) =>
                    setExportOptions({ ...exportOptions, includeKnowledge: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="include-tests">Include Test Suites</Label>
                <Switch
                  id="include-tests"
                  checked={exportOptions.includeTests}
                  onCheckedChange={(checked) =>
                    setExportOptions({ ...exportOptions, includeTests: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="include-history">Include History</Label>
                <Switch
                  id="include-history"
                  checked={exportOptions.includeHistory}
                  onCheckedChange={(checked) =>
                    setExportOptions({ ...exportOptions, includeHistory: checked })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowExport(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import */}
      <div>
        <Input
          id="import-file"
          type="file"
          accept=".json,.zip"
          onChange={handleImport}
          className="hidden"
        />
        <Label htmlFor="import-file">
          <Button variant="outline" size="sm" asChild>
            <span>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </span>
          </Button>
        </Label>
      </div>
    </div>
  );
}
