import { WorkflowNode, WorkflowEdge, NodeType } from '@/types/workflow.types';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'rag' | 'multi-agent' | 'data-processing' | 'general';
  icon: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export const workflowTemplates: WorkflowTemplate[] = [
  // RAG (Retrieval-Augmented Generation) Template
  {
    id: 'rag-basic',
    name: 'Basic RAG Pipeline',
    description: 'Retrieve relevant documents from a knowledge base and generate AI responses based on the context',
    category: 'rag',
    icon: 'Database',
    nodes: [
      {
        id: 'start-1',
        type: 'start' as NodeType,
        position: { x: 100, y: 100 },
        data: { label: 'Start' },
      },
      {
        id: 'human-input-1',
        type: 'human' as NodeType,
        position: { x: 100, y: 200 },
        data: {
          label: 'User Query',
          prompt: 'Enter your question',
          inputType: 'text',
          variableName: 'user_query',
        },
      },
      {
        id: 'knowledge-1',
        type: 'knowledge' as NodeType,
        position: { x: 100, y: 320 },
        data: {
          label: 'Retrieve Documents',
          knowledgeBaseId: 'default',
          query: '${user_query}',
          topK: 5,
          threshold: 0.7,
        },
      },
      {
        id: 'ai-agent-1',
        type: 'ai_agent' as NodeType,
        position: { x: 100, y: 460 },
        data: {
          label: 'Generate Response',
          model: 'gpt-4',
          systemPrompt: 'You are a helpful assistant. Answer the user\'s question based on the provided context documents. If the context doesn\'t contain relevant information, say so.',
          temperature: 0.7,
          maxTokens: 2000,
          tools: [],
        },
      },
      {
        id: 'end-1',
        type: 'end' as NodeType,
        position: { x: 100, y: 600 },
        data: { label: 'End' },
      },
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'start-1',
        target: 'human-input-1',
        animated: true,
      },
      {
        id: 'e2-3',
        source: 'human-input-1',
        target: 'knowledge-1',
        animated: true,
      },
      {
        id: 'e3-4',
        source: 'knowledge-1',
        target: 'ai-agent-1',
        animated: true,
      },
      {
        id: 'e4-5',
        source: 'ai-agent-1',
        target: 'end-1',
        animated: true,
      },
    ],
  },

  // Advanced RAG with Re-ranking
  {
    id: 'rag-advanced',
    name: 'Advanced RAG with Re-ranking',
    description: 'Retrieve documents, transform and re-rank results, then generate contextual AI responses',
    category: 'rag',
    icon: 'Database',
    nodes: [
      {
        id: 'start-1',
        type: 'start' as NodeType,
        position: { x: 100, y: 50 },
        data: { label: 'Start' },
      },
      {
        id: 'human-input-1',
        type: 'human' as NodeType,
        position: { x: 100, y: 150 },
        data: {
          label: 'User Query',
          prompt: 'Enter your question',
          inputType: 'text',
          variableName: 'user_query',
        },
      },
      {
        id: 'knowledge-1',
        type: 'knowledge' as NodeType,
        position: { x: 100, y: 270 },
        data: {
          label: 'Initial Retrieval',
          knowledgeBaseId: 'default',
          query: '${user_query}',
          topK: 10,
          threshold: 0.6,
        },
      },
      {
        id: 'transform-1',
        type: 'transform' as NodeType,
        position: { x: 100, y: 390 },
        data: {
          label: 'Re-rank Results',
          transformType: 'custom',
          code: 'return input.documents.sort((a, b) => b.relevance - a.relevance).slice(0, 5);',
          transformScript: '',
          outputMapping: {},
        },
      },
      {
        id: 'ai-agent-1',
        type: 'ai_agent' as NodeType,
        position: { x: 100, y: 510 },
        data: {
          label: 'Generate Answer',
          model: 'gpt-4',
          systemPrompt: 'You are an expert assistant. Use the provided context to answer questions accurately. Cite sources when possible.',
          temperature: 0.5,
          maxTokens: 3000,
          tools: [],
        },
      },
      {
        id: 'end-1',
        type: 'end' as NodeType,
        position: { x: 100, y: 630 },
        data: { label: 'End' },
      },
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'start-1',
        target: 'human-input-1',
        animated: true,
      },
      {
        id: 'e2-3',
        source: 'human-input-1',
        target: 'knowledge-1',
        animated: true,
      },
      {
        id: 'e3-4',
        source: 'knowledge-1',
        target: 'transform-1',
        animated: true,
      },
      {
        id: 'e4-5',
        source: 'transform-1',
        target: 'ai-agent-1',
        animated: true,
      },
      {
        id: 'e5-6',
        source: 'ai-agent-1',
        target: 'end-1',
        animated: true,
      },
    ],
  },

  // Multi-Agent Collaboration - Research & Analysis
  {
    id: 'multi-agent-research',
    name: 'Multi-Agent Research Team',
    description: 'Multiple AI agents collaborate: researcher gathers data, analyst processes it, and writer creates the final report',
    category: 'multi-agent',
    icon: 'Users',
    nodes: [
      {
        id: 'start-1',
        type: 'start' as NodeType,
        position: { x: 100, y: 50 },
        data: { label: 'Start' },
      },
      {
        id: 'human-input-1',
        type: 'human' as NodeType,
        position: { x: 100, y: 150 },
        data: {
          label: 'Research Topic',
          prompt: 'Enter the research topic',
          inputType: 'text',
          variableName: 'topic',
        },
      },
      {
        id: 'ai-agent-1',
        type: 'ai_agent' as NodeType,
        position: { x: 100, y: 270 },
        data: {
          label: 'Researcher Agent',
          model: 'gpt-4',
          systemPrompt: 'You are a research assistant. Gather comprehensive information about the given topic. Provide key facts, statistics, and important details.',
          temperature: 0.7,
          maxTokens: 3000,
          tools: ['web_search', 'wikipedia'],
        },
      },
      {
        id: 'ai-agent-2',
        type: 'ai_agent' as NodeType,
        position: { x: 100, y: 410 },
        data: {
          label: 'Analyst Agent',
          model: 'gpt-4',
          systemPrompt: 'You are a data analyst. Analyze the research data, identify patterns, trends, and key insights. Provide structured analysis.',
          temperature: 0.5,
          maxTokens: 2500,
          tools: [],
        },
      },
      {
        id: 'ai-agent-3',
        type: 'ai_agent' as NodeType,
        position: { x: 100, y: 550 },
        data: {
          label: 'Writer Agent',
          model: 'gpt-4',
          systemPrompt: 'You are a professional writer. Create a well-structured, comprehensive report based on the research and analysis provided. Use clear language and proper formatting.',
          temperature: 0.8,
          maxTokens: 4000,
          tools: [],
        },
      },
      {
        id: 'end-1',
        type: 'end' as NodeType,
        position: { x: 100, y: 690 },
        data: { label: 'End' },
      },
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'start-1',
        target: 'human-input-1',
        animated: true,
      },
      {
        id: 'e2-3',
        source: 'human-input-1',
        target: 'ai-agent-1',
        animated: true,
      },
      {
        id: 'e3-4',
        source: 'ai-agent-1',
        target: 'ai-agent-2',
        animated: true,
      },
      {
        id: 'e4-5',
        source: 'ai-agent-2',
        target: 'ai-agent-3',
        animated: true,
      },
      {
        id: 'e5-6',
        source: 'ai-agent-3',
        target: 'end-1',
        animated: true,
      },
    ],
  },

  // Multi-Agent Collaboration - Debate System
  {
    id: 'multi-agent-debate',
    name: 'AI Debate System',
    description: 'Two AI agents debate a topic, and a judge agent evaluates and synthesizes their arguments',
    category: 'multi-agent',
    icon: 'MessageSquare',
    nodes: [
      {
        id: 'start-1',
        type: 'start' as NodeType,
        position: { x: 250, y: 50 },
        data: { label: 'Start' },
      },
      {
        id: 'human-input-1',
        type: 'human' as NodeType,
        position: { x: 250, y: 150 },
        data: {
          label: 'Debate Topic',
          prompt: 'Enter a debate topic or question',
          inputType: 'text',
          variableName: 'debate_topic',
        },
      },
      {
        id: 'ai-agent-1',
        type: 'ai_agent' as NodeType,
        position: { x: 100, y: 270 },
        data: {
          label: 'Advocate Agent',
          model: 'gpt-4',
          systemPrompt: 'You are a debate advocate. Present strong arguments IN FAVOR of the given topic. Use logic, evidence, and persuasive reasoning.',
          temperature: 0.8,
          maxTokens: 2000,
          tools: [],
        },
      },
      {
        id: 'ai-agent-2',
        type: 'ai_agent' as NodeType,
        position: { x: 400, y: 270 },
        data: {
          label: 'Opposition Agent',
          model: 'gpt-4',
          systemPrompt: 'You are a debate opponent. Present strong arguments AGAINST the given topic. Use logic, evidence, and persuasive reasoning.',
          temperature: 0.8,
          maxTokens: 2000,
          tools: [],
        },
      },
      {
        id: 'merge-1',
        type: 'merge' as NodeType,
        position: { x: 250, y: 410 },
        data: {
          label: 'Combine Arguments',
        },
      },
      {
        id: 'ai-agent-3',
        type: 'ai_agent' as NodeType,
        position: { x: 250, y: 530 },
        data: {
          label: 'Judge Agent',
          model: 'gpt-4',
          systemPrompt: 'You are an impartial judge. Evaluate both sides of the debate, analyze the strength of arguments, and provide a balanced synthesis with your reasoned conclusion.',
          temperature: 0.6,
          maxTokens: 3000,
          tools: [],
        },
      },
      {
        id: 'end-1',
        type: 'end' as NodeType,
        position: { x: 250, y: 670 },
        data: { label: 'End' },
      },
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'start-1',
        target: 'human-input-1',
        animated: true,
      },
      {
        id: 'e2-3',
        source: 'human-input-1',
        target: 'ai-agent-1',
        animated: true,
      },
      {
        id: 'e2-4',
        source: 'human-input-1',
        target: 'ai-agent-2',
        animated: true,
      },
      {
        id: 'e3-5',
        source: 'ai-agent-1',
        target: 'merge-1',
        animated: true,
      },
      {
        id: 'e4-5',
        source: 'ai-agent-2',
        target: 'merge-1',
        animated: true,
      },
      {
        id: 'e5-6',
        source: 'merge-1',
        target: 'ai-agent-3',
        animated: true,
      },
      {
        id: 'e6-7',
        source: 'ai-agent-3',
        target: 'end-1',
        animated: true,
      },
    ],
  },

  // Data Processing Pipeline - ETL
  {
    id: 'data-etl-pipeline',
    name: 'ETL Data Pipeline',
    description: 'Extract data from a source, transform it through multiple stages, and load to destination',
    category: 'data-processing',
    icon: 'Database',
    nodes: [
      {
        id: 'start-1',
        type: 'start' as NodeType,
        position: { x: 100, y: 50 },
        data: { label: 'Start' },
      },
      {
        id: 'tool-1',
        type: 'tool' as NodeType,
        position: { x: 100, y: 150 },
        data: {
          label: 'Extract Data',
          toolId: 'data_source_connector',
          parameters: {
            source: 'database',
            query: 'SELECT * FROM users',
          },
          timeout: 30000,
        },
      },
      {
        id: 'transform-1',
        type: 'transform' as NodeType,
        position: { x: 100, y: 270 },
        data: {
          label: 'Clean Data',
          transformType: 'custom',
          code: 'return input.map(row => ({ ...row, email: row.email.toLowerCase().trim() }));',
          transformScript: '',
          outputMapping: {},
        },
      },
      {
        id: 'transform-2',
        type: 'transform' as NodeType,
        position: { x: 100, y: 390 },
        data: {
          label: 'Filter Invalid',
          transformType: 'filter',
          code: 'return input.filter(row => row.email && row.email.includes("@"));',
          transformScript: '',
          outputMapping: {},
        },
      },
      {
        id: 'transform-3',
        type: 'transform' as NodeType,
        position: { x: 100, y: 510 },
        data: {
          label: 'Enrich Data',
          transformType: 'map',
          code: 'return input.map(row => ({ ...row, full_name: `${row.first_name} ${row.last_name}`, created_at: new Date() }));',
          transformScript: '',
          outputMapping: {},
        },
      },
      {
        id: 'tool-2',
        type: 'tool' as NodeType,
        position: { x: 100, y: 630 },
        data: {
          label: 'Load Data',
          toolId: 'data_destination_connector',
          parameters: {
            destination: 'warehouse',
            table: 'processed_users',
          },
          timeout: 30000,
        },
      },
      {
        id: 'end-1',
        type: 'end' as NodeType,
        position: { x: 100, y: 750 },
        data: { label: 'End' },
      },
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'start-1',
        target: 'tool-1',
        animated: true,
      },
      {
        id: 'e2-3',
        source: 'tool-1',
        target: 'transform-1',
        animated: true,
      },
      {
        id: 'e3-4',
        source: 'transform-1',
        target: 'transform-2',
        animated: true,
      },
      {
        id: 'e4-5',
        source: 'transform-2',
        target: 'transform-3',
        animated: true,
      },
      {
        id: 'e5-6',
        source: 'transform-3',
        target: 'tool-2',
        animated: true,
      },
      {
        id: 'e6-7',
        source: 'tool-2',
        target: 'end-1',
        animated: true,
      },
    ],
  },

  // Data Processing - Batch Processing with Loops
  {
    id: 'data-batch-processing',
    name: 'Batch Data Processing',
    description: 'Process data in batches using loops, with conditional error handling and aggregation',
    category: 'data-processing',
    icon: 'Layers',
    nodes: [
      {
        id: 'start-1',
        type: 'start' as NodeType,
        position: { x: 250, y: 50 },
        data: { label: 'Start' },
      },
      {
        id: 'tool-1',
        type: 'tool' as NodeType,
        position: { x: 250, y: 150 },
        data: {
          label: 'Load Dataset',
          toolId: 'file_reader',
          parameters: {
            file_path: 'data/input.json',
          },
          timeout: 10000,
        },
      },
      {
        id: 'loop-1',
        type: 'loop' as NodeType,
        position: { x: 250, y: 270 },
        data: {
          label: 'Process Each Item',
          iterableField: 'items',
          iterable: 'data.items',
          itemVariable: 'item',
          maxIterations: 1000,
        },
      },
      {
        id: 'condition-1',
        type: 'condition' as NodeType,
        position: { x: 250, y: 390 },
        data: {
          label: 'Validate Item',
          expression: 'item.status',
          operator: 'equals',
          value: 'valid',
        },
      },
      {
        id: 'transform-1',
        type: 'transform' as NodeType,
        position: { x: 150, y: 530 },
        data: {
          label: 'Process Valid',
          transformType: 'custom',
          code: 'return { ...item, processed: true, timestamp: Date.now() };',
          transformScript: '',
          outputMapping: {},
        },
      },
      {
        id: 'transform-2',
        type: 'transform' as NodeType,
        position: { x: 350, y: 530 },
        data: {
          label: 'Handle Invalid',
          transformType: 'custom',
          code: 'return { ...item, error: true, reason: "Invalid status" };',
          transformScript: '',
          outputMapping: {},
        },
      },
      {
        id: 'merge-1',
        type: 'merge' as NodeType,
        position: { x: 250, y: 670 },
        data: {
          label: 'Merge Results',
        },
      },
      {
        id: 'transform-3',
        type: 'transform' as NodeType,
        position: { x: 250, y: 790 },
        data: {
          label: 'Aggregate Results',
          transformType: 'reduce',
          code: 'return { total: results.length, processed: results.filter(r => r.processed).length, errors: results.filter(r => r.error).length };',
          transformScript: '',
          outputMapping: {},
        },
      },
      {
        id: 'end-1',
        type: 'end' as NodeType,
        position: { x: 250, y: 910 },
        data: { label: 'End' },
      },
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'start-1',
        target: 'tool-1',
        animated: true,
      },
      {
        id: 'e2-3',
        source: 'tool-1',
        target: 'loop-1',
        animated: true,
      },
      {
        id: 'e3-4',
        source: 'loop-1',
        target: 'condition-1',
        animated: true,
      },
      {
        id: 'e4-5',
        source: 'condition-1',
        target: 'transform-1',
        animated: true,
        label: 'true',
      },
      {
        id: 'e4-6',
        source: 'condition-1',
        target: 'transform-2',
        animated: true,
        label: 'false',
      },
      {
        id: 'e5-7',
        source: 'transform-1',
        target: 'merge-1',
        animated: true,
      },
      {
        id: 'e6-7',
        source: 'transform-2',
        target: 'merge-1',
        animated: true,
      },
      {
        id: 'e7-8',
        source: 'merge-1',
        target: 'transform-3',
        animated: true,
      },
      {
        id: 'e8-9',
        source: 'transform-3',
        target: 'end-1',
        animated: true,
      },
    ],
  },

  // Content Generation Pipeline
  {
    id: 'content-generation',
    name: 'AI Content Generation Pipeline',
    description: 'Generate content with AI: brainstorm topics, create outline, write content, and review quality',
    category: 'general',
    icon: 'FileText',
    nodes: [
      {
        id: 'start-1',
        type: 'start' as NodeType,
        position: { x: 100, y: 50 },
        data: { label: 'Start' },
      },
      {
        id: 'human-input-1',
        type: 'human' as NodeType,
        position: { x: 100, y: 150 },
        data: {
          label: 'Content Brief',
          prompt: 'Describe the content you want to create',
          inputType: 'text',
          variableName: 'content_brief',
        },
      },
      {
        id: 'ai-agent-1',
        type: 'ai_agent' as NodeType,
        position: { x: 100, y: 270 },
        data: {
          label: 'Topic Brainstorm',
          model: 'gpt-4',
          systemPrompt: 'You are a creative brainstorming assistant. Generate 5 engaging topic ideas based on the content brief.',
          temperature: 0.9,
          maxTokens: 1000,
          tools: [],
        },
      },
      {
        id: 'human-input-2',
        type: 'human' as NodeType,
        position: { x: 100, y: 390 },
        data: {
          label: 'Select Topic',
          prompt: 'Choose a topic from the suggestions',
          inputType: 'select',
          options: [],
          variableName: 'selected_topic',
        },
      },
      {
        id: 'ai-agent-2',
        type: 'ai_agent' as NodeType,
        position: { x: 100, y: 510 },
        data: {
          label: 'Create Outline',
          model: 'gpt-4',
          systemPrompt: 'You are a content strategist. Create a detailed outline with sections and key points for the chosen topic.',
          temperature: 0.7,
          maxTokens: 1500,
          tools: [],
        },
      },
      {
        id: 'ai-agent-3',
        type: 'ai_agent' as NodeType,
        position: { x: 100, y: 630 },
        data: {
          label: 'Write Content',
          model: 'gpt-4',
          systemPrompt: 'You are a professional content writer. Write engaging, well-structured content based on the outline provided.',
          temperature: 0.8,
          maxTokens: 4000,
          tools: [],
        },
      },
      {
        id: 'ai-agent-4',
        type: 'ai_agent' as NodeType,
        position: { x: 100, y: 750 },
        data: {
          label: 'Quality Review',
          model: 'gpt-4',
          systemPrompt: 'You are an editor. Review the content for grammar, clarity, engagement, and suggest improvements.',
          temperature: 0.5,
          maxTokens: 2000,
          tools: [],
        },
      },
      {
        id: 'end-1',
        type: 'end' as NodeType,
        position: { x: 100, y: 870 },
        data: { label: 'End' },
      },
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'start-1',
        target: 'human-input-1',
        animated: true,
      },
      {
        id: 'e2-3',
        source: 'human-input-1',
        target: 'ai-agent-1',
        animated: true,
      },
      {
        id: 'e3-4',
        source: 'ai-agent-1',
        target: 'human-input-2',
        animated: true,
      },
      {
        id: 'e4-5',
        source: 'human-input-2',
        target: 'ai-agent-2',
        animated: true,
      },
      {
        id: 'e5-6',
        source: 'ai-agent-2',
        target: 'ai-agent-3',
        animated: true,
      },
      {
        id: 'e6-7',
        source: 'ai-agent-3',
        target: 'ai-agent-4',
        animated: true,
      },
      {
        id: 'e7-8',
        source: 'ai-agent-4',
        target: 'end-1',
        animated: true,
      },
    ],
  },
];

export function getTemplateById(id: string): WorkflowTemplate | undefined {
  return workflowTemplates.find(template => template.id === id);
}

export function getTemplatesByCategory(category: WorkflowTemplate['category']): WorkflowTemplate[] {
  return workflowTemplates.filter(template => template.category === category);
}
