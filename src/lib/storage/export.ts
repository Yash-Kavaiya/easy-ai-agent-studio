/**
 * Export/Import Utility
 * For exporting and importing projects in various formats
 */

import JSZip from 'jszip';
import { Project, ExportFormat, ExportOptions } from '@/types/project.types';

export class ProjectExporter {
  /**
   * Export project in specified format
   */
  async export(project: Project, options: ExportOptions): Promise<Blob> {
    switch (options.format) {
      case ExportFormat.JSON:
        return this.exportJSON(project, options);
      case ExportFormat.ZIP:
        return this.exportZIP(project, options);
      case ExportFormat.MARKDOWN:
        return this.exportMarkdown(project);
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }
  }

  /**
   * Export as JSON file
   */
  private async exportJSON(project: Project, options: ExportOptions): Promise<Blob> {
    const data = this.prepareProjectData(project, options);
    const json = JSON.stringify(data, null, 2);

    if (options.encrypted && options.password) {
      // Simple encryption (for production, use proper encryption library)
      const encrypted = this.simpleEncrypt(json, options.password);
      return new Blob([encrypted], { type: 'application/octet-stream' });
    }

    return new Blob([json], { type: 'application/json' });
  }

  /**
   * Export as ZIP archive
   */
  private async exportZIP(project: Project, options: ExportOptions): Promise<Blob> {
    const zip = new JSZip();

    // Add project.json
    const projectData = this.prepareProjectData(project, options);
    zip.file('project.json', JSON.stringify(projectData, null, 2));

    // Add README
    zip.file('README.md', this.generateREADME(project));

    // Add knowledge base documents
    if (options.includeKnowledge && project.knowledge.documents.length > 0) {
      const knowledgeFolder = zip.folder('knowledge');
      if (knowledgeFolder) {
        project.knowledge.documents.forEach((doc) => {
          knowledgeFolder.file(`${doc.name}`, doc.content);
        });
      }
    }

    // Add test suites
    if (options.includeTests && project.testSuites.length > 0) {
      const testsFolder = zip.folder('tests');
      if (testsFolder) {
        project.testSuites.forEach((suite, index) => {
          testsFolder.file(`suite-${index + 1}.json`, JSON.stringify(suite, null, 2));
        });
      }
    }

    return zip.generateAsync({ type: 'blob' });
  }

  /**
   * Export as Markdown documentation
   */
  private async exportMarkdown(project: Project): Promise<Blob> {
    const md = this.generateMarkdown(project);
    return new Blob([md], { type: 'text/markdown' });
  }

  /**
   * Prepare project data based on options
   */
  private prepareProjectData(project: Project, options: ExportOptions): Partial<Project> {
    const data: Partial<Project> = {
      id: project.id,
      name: project.name,
      description: project.description,
      version: project.version,
      agent: project.agent,
      workflow: project.workflow,
      models: project.models,
      tools: project.tools,
      settings: project.settings,
      metadata: project.metadata
    };

    if (options.includeKnowledge) {
      data.knowledge = project.knowledge;
    }

    if (options.includeTests) {
      data.testSuites = project.testSuites;
    }

    return data;
  }

  /**
   * Generate README content
   */
  private generateREADME(project: Project): string {
    return `# ${project.name}

${project.description}

## Project Information

- **Version**: ${project.version}
- **Created**: ${project.createdAt.toLocaleDateString()}
- **Last Updated**: ${project.updatedAt.toLocaleDateString()}
- **Author**: ${project.metadata.author || 'Unknown'}
- **Category**: ${project.metadata.category}

## Agent Configuration

- **Name**: ${project.agent.name}
- **Model**: ${project.agent.primaryModel}
- **Max Iterations**: ${project.agent.maxIterations}
- **Timeout**: ${project.agent.timeout}ms

## Workflow

- **Nodes**: ${project.workflow.nodes.length}
- **Edges**: ${project.workflow.edges.length}

## Knowledge Base

- **Documents**: ${project.knowledge.documents.length}
- **Chunk Size**: ${project.knowledge.config.chunkSize}
- **Embedding Model**: ${project.knowledge.config.embeddingModel}

## Tools

${project.tools.length > 0 ? project.tools.map((tool) => `- ${tool.name}: ${tool.description}`).join('\n') : 'No tools configured'}

## Test Suites

- **Total Suites**: ${project.testSuites.length}
- **Total Test Cases**: ${project.testSuites.reduce((acc, suite) => acc + suite.testCases.length, 0)}

---

*Exported from AI Agent Studio*
`;
  }

  /**
   * Generate Markdown documentation
   */
  private generateMarkdown(project: Project): string {
    return this.generateREADME(project) + `

## Workflow Details

${project.workflow.nodes.map((node) => `
### ${node.data.label || node.type}

- **Type**: ${node.type}
- **ID**: ${node.id}
- **Position**: (${node.position.x}, ${node.position.y})
`).join('\n')}

## Detailed Configuration

\`\`\`json
${JSON.stringify(project, null, 2)}
\`\`\`
`;
  }

  /**
   * Simple encryption (for demonstration - use proper crypto in production)
   */
  private simpleEncrypt(text: string, password: string): string {
    // This is NOT secure - use a proper encryption library in production
    return btoa(text + '::' + password);
  }

  /**
   * Download blob as file
   */
  downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export class ProjectImporter {
  /**
   * Import project from file
   */
  async importFromFile(file: File): Promise<Project> {
    const format = this.detectFormat(file);

    switch (format) {
      case ExportFormat.JSON:
        return this.importJSON(file);
      case ExportFormat.ZIP:
        return this.importZIP(file);
      default:
        throw new Error(`Unsupported file format: ${file.type}`);
    }
  }

  /**
   * Detect file format
   */
  private detectFormat(file: File): ExportFormat {
    if (file.name.endsWith('.json')) {
      return ExportFormat.JSON;
    } else if (file.name.endsWith('.zip')) {
      return ExportFormat.ZIP;
    }
    throw new Error('Unknown file format');
  }

  /**
   * Import from JSON
   */
  private async importJSON(file: File): Promise<Project> {
    const text = await file.text();
    const data = JSON.parse(text);
    return this.validateProject(data);
  }

  /**
   * Import from ZIP
   */
  private async importZIP(file: File): Promise<Project> {
    const zip = await JSZip.loadAsync(file);
    const projectFile = zip.file('project.json');

    if (!projectFile) {
      throw new Error('Invalid ZIP: missing project.json');
    }

    const text = await projectFile.async('text');
    const data = JSON.parse(text);

    // Load knowledge base documents if present
    const knowledgeFolder = zip.folder('knowledge');
    if (knowledgeFolder) {
      const documents = [];
      for (const [filename, file] of Object.entries(knowledgeFolder.files)) {
        if (!file.dir) {
          const content = await file.async('text');
          documents.push({
            id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: filename,
            type: 'txt' as const,
            size: content.length,
            content,
            uploadedAt: new Date(),
            chunks: [],
            metadata: {},
            tags: []
          });
        }
      }
      if (data.knowledge) {
        data.knowledge.documents = documents;
      }
    }

    return this.validateProject(data);
  }

  /**
   * Validate and normalize project data
   */
  private validateProject(data: any): Project {
    // Basic validation
    if (!data.name || !data.agent || !data.workflow) {
      throw new Error('Invalid project structure');
    }

    // Ensure required fields
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      agent: {
        ...data.agent,
        createdAt: new Date(data.agent.createdAt),
        updatedAt: new Date(data.agent.updatedAt)
      }
    };
  }
}

// Export singleton instances
export const projectExporter = new ProjectExporter();
export const projectImporter = new ProjectImporter();
