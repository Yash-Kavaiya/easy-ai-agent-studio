/**
 * Workflow Templates Library
 * Pre-built workflows for common use cases
 */

import { WorkflowNode, WorkflowEdge, WorkflowData, NodeType } from '@/types/workflow.types';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'rag' | 'multi-agent' | 'data-processing' | 'general';
  tags: string[];
  workflow: WorkflowData;
}

export const workflowTemplates: WorkflowTemplate[] = [
  // RAG (Retrieval-Augmented Generation) Template
  {
    id: 'rag-basic',
    name: 'Basic RAG Pipeline',
    description: 'Retrieve relevant context from knowledge base and generate responses using an AI agent',
    category: 'rag',
    tags: ['retrieval', 'knowledge-base', 'ai'],
    workflow: {
      nodes: [
        {
          id: 'start-1',
          type: NodeType.START,
          position: { x: 50, y: 200 },
          data: { label: 'Start' }
        },
        {
          id: 'knowledge-1',
          type: NodeType.KNOWLEDGE,
          position: { x: 250, y: 200 },
          data: {
            label: 'Retrieve Context',
            description: 'Search knowledge base for relevant information',
            knowledgeBaseId: '',
            query: '{{input}}',
            topK: 5,
            threshold: 0.7
          }
        },
        {
          id: 'agent-1',
          type: NodeType.AI_AGENT,
          position: { x: 500, y: 200 },
          data: {
            label: 'Generate Response',
            description: 'Generate AI response using retrieved context',
            model: 'gpt-4',
            systemPrompt: 'You are a helpful assistant. Use the provided context to answer the user\'s question accurately.',
            temperature: 0.7,
            maxTokens: 2048,
            tools: []
          }
        },
        {
          id: 'end-1',
          type: NodeType.END,
          position: { x: 750, y: 200 },
          data: { label: 'End' }
        }
      ],
      edges: [
        {
          id: 'e1',
          source: 'start-1',
          target: 'knowledge-1',
          animated: true
        },
        {
          id: 'e2',
          source: 'knowledge-1',
          target: 'agent-1',
          animated: true
        },
        {
          id: 'e3',
          source: 'agent-1',
          target: 'end-1',
          animated: true
        }
      ]
    }
  },

  // Multi-Agent Collaboration Template
  {
    id: 'multi-agent-research',
    name: 'Multi-Agent Research',
    description: 'Multiple AI agents collaborate: researcher gathers info, analyst processes it, writer creates summary',
    category: 'multi-agent',
    tags: ['collaboration', 'research', 'analysis'],
    workflow: {
      nodes: [
        {
          id: 'start-1',
          type: NodeType.START,
          position: { x: 50, y: 250 },
          data: { label: 'Start' }
        },
        {
          id: 'agent-1',
          type: NodeType.AI_AGENT,
          position: { x: 250, y: 250 },
          data: {
            label: 'Researcher Agent',
            description: 'Gather initial research and facts',
            model: 'gpt-4',
            systemPrompt: 'You are a research assistant. Gather comprehensive information about the given topic.',
            temperature: 0.5,
            maxTokens: 1024,
            tools: []
          }
        },
        {
          id: 'agent-2',
          type: NodeType.AI_AGENT,
          position: { x: 500, y: 250 },
          data: {
            label: 'Analyst Agent',
            description: 'Analyze and structure the research',
            model: 'gpt-4',
            systemPrompt: 'You are an analytical expert. Analyze the research data and identify key insights and patterns.',
            temperature: 0.3,
            maxTokens: 1024,
            tools: []
          }
        },
        {
          id: 'agent-3',
          type: NodeType.AI_AGENT,
          position: { x: 750, y: 250 },
          data: {
            label: 'Writer Agent',
            description: 'Create polished summary',
            model: 'gpt-4',
            systemPrompt: 'You are a professional writer. Create a clear, engaging summary based on the analysis.',
            temperature: 0.7,
            maxTokens: 2048,
            tools: []
          }
        },
        {
          id: 'end-1',
          type: NodeType.END,
          position: { x: 1000, y: 250 },
          data: { label: 'End' }
        }
      ],
      edges: [
        {
          id: 'e1',
          source: 'start-1',
          target: 'agent-1',
          animated: true
        },
        {
          id: 'e2',
          source: 'agent-1',
          target: 'agent-2',
          animated: true
        },
        {
          id: 'e3',
          source: 'agent-2',
          target: 'agent-3',
          animated: true
        },
        {
          id: 'e4',
          source: 'agent-3',
          target: 'end-1',
          animated: true
        }
      ]
    }
  },

  // Data Processing Pipeline Template
  {
    id: 'data-processing-etl',
    name: 'ETL Data Pipeline',
    description: 'Extract, Transform, and Load data with validation and error handling',
    category: 'data-processing',
    tags: ['etl', 'transformation', 'validation'],
    workflow: {
      nodes: [
        {
          id: 'start-1',
          type: NodeType.START,
          position: { x: 50, y: 300 },
          data: { label: 'Start' }
        },
        {
          id: 'transform-1',
          type: NodeType.TRANSFORM,
          position: { x: 250, y: 300 },
          data: {
            label: 'Extract & Validate',
            description: 'Extract and validate input data',
            transformType: 'custom',
            code: 'return { data: input, valid: true };',
            transformScript: '',
            outputMapping: {}
          }
        },
        {
          id: 'condition-1',
          type: NodeType.CONDITION,
          position: { x: 500, y: 300 },
          data: {
            label: 'Check Valid',
            description: 'Verify data is valid',
            expression: 'valid',
            operator: 'equals',
            value: true
          }
        },
        {
          id: 'loop-1',
          type: NodeType.LOOP,
          position: { x: 750, y: 200 },
          data: {
            label: 'Process Items',
            description: 'Transform each data item',
            iterableField: 'data',
            iterable: '',
            itemVariable: 'item',
            maxIterations: 100
          }
        },
        {
          id: 'transform-2',
          type: NodeType.TRANSFORM,
          position: { x: 1000, y: 200 },
          data: {
            label: 'Transform',
            description: 'Apply transformations',
            transformType: 'map',
            code: 'return input;',
            transformScript: '',
            outputMapping: {}
          }
        },
        {
          id: 'agent-1',
          type: NodeType.AI_AGENT,
          position: { x: 750, y: 400 },
          data: {
            label: 'Handle Error',
            description: 'Process validation errors',
            model: 'gpt-3.5-turbo',
            systemPrompt: 'Analyze the validation error and suggest corrections.',
            temperature: 0.3,
            maxTokens: 512,
            tools: []
          }
        },
        {
          id: 'merge-1',
          type: NodeType.MERGE,
          position: { x: 1250, y: 300 },
          data: { label: 'Merge Results' }
        },
        {
          id: 'end-1',
          type: NodeType.END,
          position: { x: 1450, y: 300 },
          data: { label: 'End' }
        }
      ],
      edges: [
        {
          id: 'e1',
          source: 'start-1',
          target: 'transform-1',
          animated: true
        },
        {
          id: 'e2',
          source: 'transform-1',
          target: 'condition-1',
          animated: true
        },
        {
          id: 'e3',
          source: 'condition-1',
          sourceHandle: 'true',
          target: 'loop-1',
          animated: true,
          label: 'valid'
        },
        {
          id: 'e4',
          source: 'condition-1',
          sourceHandle: 'false',
          target: 'agent-1',
          animated: true,
          label: 'invalid'
        },
        {
          id: 'e5',
          source: 'loop-1',
          target: 'transform-2',
          animated: true
        },
        {
          id: 'e6',
          source: 'transform-2',
          target: 'merge-1',
          animated: true
        },
        {
          id: 'e7',
          source: 'agent-1',
          target: 'merge-1',
          animated: true
        },
        {
          id: 'e8',
          source: 'merge-1',
          target: 'end-1',
          animated: true
        }
      ]
    }
  },

  // Simple Q&A Template
  {
    id: 'simple-qa',
    name: 'Simple Q&A Bot',
    description: 'Basic question-answering workflow with a single AI agent',
    category: 'general',
    tags: ['qa', 'chatbot', 'simple'],
    workflow: {
      nodes: [
        {
          id: 'start-1',
          type: NodeType.START,
          position: { x: 50, y: 200 },
          data: { label: 'Start' }
        },
        {
          id: 'agent-1',
          type: NodeType.AI_AGENT,
          position: { x: 350, y: 200 },
          data: {
            label: 'Q&A Agent',
            description: 'Answer user questions',
            model: 'gpt-4',
            systemPrompt: 'You are a helpful assistant that provides clear and concise answers.',
            temperature: 0.7,
            maxTokens: 1024,
            tools: []
          }
        },
        {
          id: 'end-1',
          type: NodeType.END,
          position: { x: 650, y: 200 },
          data: { label: 'End' }
        }
      ],
      edges: [
        {
          id: 'e1',
          source: 'start-1',
          target: 'agent-1',
          animated: true
        },
        {
          id: 'e2',
          source: 'agent-1',
          target: 'end-1',
          animated: true
        }
      ]
    }
  },

  // Human-in-the-Loop Template
  {
    id: 'human-in-loop-review',
    name: 'Human-in-the-Loop Review',
    description: 'AI generates content, human reviews and approves before final processing',
    category: 'general',
    tags: ['human-review', 'approval', 'workflow'],
    workflow: {
      nodes: [
        {
          id: 'start-1',
          type: NodeType.START,
          position: { x: 50, y: 200 },
          data: { label: 'Start' }
        },
        {
          id: 'agent-1',
          type: NodeType.AI_AGENT,
          position: { x: 250, y: 200 },
          data: {
            label: 'Generate Draft',
            description: 'AI generates initial draft',
            model: 'gpt-4',
            systemPrompt: 'Generate a draft response based on the input.',
            temperature: 0.7,
            maxTokens: 2048,
            tools: []
          }
        },
        {
          id: 'human-1',
          type: NodeType.HUMAN_INPUT,
          position: { x: 500, y: 200 },
          data: {
            label: 'Human Review',
            description: 'Review and approve draft',
            prompt: 'Please review the draft and approve or provide feedback',
            inputType: 'choice',
            options: ['Approve', 'Revise'],
            variableName: 'decision'
          }
        },
        {
          id: 'condition-1',
          type: NodeType.CONDITION,
          position: { x: 750, y: 200 },
          data: {
            label: 'Check Decision',
            expression: 'decision',
            operator: 'equals',
            value: 'Approve'
          }
        },
        {
          id: 'agent-2',
          type: NodeType.AI_AGENT,
          position: { x: 850, y: 100 },
          data: {
            label: 'Revise Draft',
            description: 'AI revises based on feedback',
            model: 'gpt-4',
            systemPrompt: 'Revise the draft based on the feedback provided.',
            temperature: 0.5,
            maxTokens: 2048,
            tools: []
          }
        },
        {
          id: 'end-1',
          type: NodeType.END,
          position: { x: 1000, y: 200 },
          data: { label: 'End' }
        }
      ],
      edges: [
        {
          id: 'e1',
          source: 'start-1',
          target: 'agent-1',
          animated: true
        },
        {
          id: 'e2',
          source: 'agent-1',
          target: 'human-1',
          animated: true
        },
        {
          id: 'e3',
          source: 'human-1',
          target: 'condition-1',
          animated: true
        },
        {
          id: 'e4',
          source: 'condition-1',
          sourceHandle: 'true',
          target: 'end-1',
          animated: true,
          label: 'approved'
        },
        {
          id: 'e5',
          source: 'condition-1',
          sourceHandle: 'false',
          target: 'agent-2',
          animated: true,
          label: 'revise'
        },
        {
          id: 'e6',
          source: 'agent-2',
          target: 'human-1',
          animated: true
        }
      ]
    }
  },

  // Advanced RAG with Re-ranking
  {
    id: 'rag-reranking',
    name: 'Advanced RAG with Re-ranking',
    description: 'RAG pipeline with query expansion, retrieval, re-ranking, and response generation',
    category: 'rag',
    tags: ['rag', 'reranking', 'advanced', 'knowledge-base'],
    workflow: {
      nodes: [
        {
          id: 'start-1',
          type: NodeType.START,
          position: { x: 50, y: 300 },
          data: { label: 'Start' }
        },
        {
          id: 'agent-1',
          type: NodeType.AI_AGENT,
          position: { x: 250, y: 300 },
          data: {
            label: 'Query Expansion',
            description: 'Expand query with related terms',
            model: 'gpt-3.5-turbo',
            systemPrompt: 'Expand the query with related terms and synonyms to improve retrieval.',
            temperature: 0.3,
            maxTokens: 256,
            tools: []
          }
        },
        {
          id: 'knowledge-1',
          type: NodeType.KNOWLEDGE,
          position: { x: 500, y: 300 },
          data: {
            label: 'Retrieve Candidates',
            description: 'Get top candidate documents',
            knowledgeBaseId: '',
            query: '{{input}}',
            topK: 20,
            threshold: 0.6
          }
        },
        {
          id: 'agent-2',
          type: NodeType.AI_AGENT,
          position: { x: 750, y: 300 },
          data: {
            label: 'Re-rank Results',
            description: 'Re-rank by relevance',
            model: 'gpt-4',
            systemPrompt: 'Re-rank the retrieved documents by relevance to the query.',
            temperature: 0.1,
            maxTokens: 512,
            tools: []
          }
        },
        {
          id: 'agent-3',
          type: NodeType.AI_AGENT,
          position: { x: 1000, y: 300 },
          data: {
            label: 'Generate Answer',
            description: 'Generate final answer',
            model: 'gpt-4',
            systemPrompt: 'Generate a comprehensive answer using the most relevant context.',
            temperature: 0.7,
            maxTokens: 2048,
            tools: []
          }
        },
        {
          id: 'end-1',
          type: NodeType.END,
          position: { x: 1250, y: 300 },
          data: { label: 'End' }
        }
      ],
      edges: [
        {
          id: 'e1',
          source: 'start-1',
          target: 'agent-1',
          animated: true
        },
        {
          id: 'e2',
          source: 'agent-1',
          target: 'knowledge-1',
          animated: true
        },
        {
          id: 'e3',
          source: 'knowledge-1',
          target: 'agent-2',
          animated: true
        },
        {
          id: 'e4',
          source: 'agent-2',
          target: 'agent-3',
          animated: true
        },
        {
          id: 'e5',
          source: 'agent-3',
          target: 'end-1',
          animated: true
        }
      ]
    }
  }
];

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: string): WorkflowTemplate[] {
  return workflowTemplates.filter(t => t.category === category);
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): WorkflowTemplate | undefined {
  return workflowTemplates.find(t => t.id === id);
}

/**
 * Search templates by name or tags
 */
export function searchTemplates(query: string): WorkflowTemplate[] {
  const lowerQuery = query.toLowerCase();
  return workflowTemplates.filter(t =>
    t.name.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery) ||
    t.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
