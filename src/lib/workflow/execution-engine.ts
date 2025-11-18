/**
 * Workflow Execution Engine
 * Executes workflows node by node with state management
 */

import { WorkflowNode, WorkflowEdge, NodeType, ExecutionContext, NodeExecutionStatus } from '@/types/workflow.types';
import { createAIClient } from '@/lib/api/client';
import { ModelProvider } from '@/types/model.types';
import { EmbeddingGenerator } from '@/lib/knowledge/embeddings';
import { SemanticSearch } from '@/lib/knowledge/search';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { useToolStore } from '@/store/toolStore';
import { ToolExecutor } from '@/lib/tools/tool-executor';

export enum ExecutionStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  ERROR = 'error'
}

export interface ExecutionState {
  status: ExecutionStatus;
  currentNodeId: string | null;
  variables: Record<string, any>;
  history: ExecutionHistoryEntry[];
  error?: string;
  startTime?: number;
  endTime?: number;
}

export interface ExecutionHistoryEntry {
  nodeId: string;
  nodeType: NodeType;
  input: any;
  output: any;
  timestamp: number;
  duration: number;
  error?: string;
}

export class WorkflowExecutionEngine {
  private nodes: WorkflowNode[];
  private edges: WorkflowEdge[];
  private state: ExecutionState;
  private onStateChange?: (state: ExecutionState) => void;
  private onNodeStatusChange?: (nodeId: string, status: NodeExecutionStatus, error?: string) => void;
  private abortController: AbortController | null = null;

  constructor(
    nodes: WorkflowNode[],
    edges: WorkflowEdge[],
    onStateChange?: (state: ExecutionState) => void,
    onNodeStatusChange?: (nodeId: string, status: NodeExecutionStatus, error?: string) => void
  ) {
    this.nodes = nodes;
    this.edges = edges;
    this.onStateChange = onStateChange;
    this.onNodeStatusChange = onNodeStatusChange;
    this.state = {
      status: ExecutionStatus.IDLE,
      currentNodeId: null,
      variables: {},
      history: []
    };
  }

  /**
   * Start workflow execution
   */
  async start(input?: any): Promise<any> {
    // Find start node
    const startNode = this.nodes.find(n => n.type === NodeType.START);
    if (!startNode) {
      throw new Error('No start node found in workflow');
    }

    this.abortController = new AbortController();
    this.state = {
      status: ExecutionStatus.RUNNING,
      currentNodeId: startNode.id,
      variables: { input },
      history: [],
      startTime: Date.now()
    };

    this.notifyStateChange();

    try {
      const result = await this.executeNode(startNode, input);

      this.state.status = ExecutionStatus.COMPLETED;
      this.state.currentNodeId = null;
      this.state.endTime = Date.now();
      this.notifyStateChange();

      return result;
    } catch (error) {
      this.state.status = ExecutionStatus.ERROR;
      this.state.error = error instanceof Error ? error.message : 'Unknown error';
      this.state.endTime = Date.now();
      this.notifyStateChange();
      throw error;
    }
  }

  /**
   * Stop workflow execution
   */
  stop(): void {
    if (this.abortController) {
      this.abortController.abort();
    }
    this.state.status = ExecutionStatus.IDLE;
    this.state.currentNodeId = null;
    this.notifyStateChange();
  }

  /**
   * Pause execution (for human input)
   */
  pause(): void {
    this.state.status = ExecutionStatus.PAUSED;
    this.notifyStateChange();
  }

  /**
   * Resume execution
   */
  async resume(input?: any): Promise<void> {
    if (this.state.status !== ExecutionStatus.PAUSED) {
      throw new Error('Workflow is not paused');
    }

    this.state.status = ExecutionStatus.RUNNING;
    this.state.variables = { ...this.state.variables, ...input };
    this.notifyStateChange();

    if (this.state.currentNodeId) {
      const currentNode = this.nodes.find(n => n.id === this.state.currentNodeId);
      if (currentNode) {
        await this.executeNode(currentNode, this.state.variables);
      }
    }
  }

  /**
   * Get current execution state
   */
  getState(): ExecutionState {
    return { ...this.state };
  }

  /**
   * Execute a single node
   */
  private async executeNode(node: WorkflowNode, input: any): Promise<any> {
    const startTime = Date.now();
    this.state.currentNodeId = node.id;

    // Update node status to running
    if (this.onNodeStatusChange) {
      this.onNodeStatusChange(node.id, NodeExecutionStatus.RUNNING);
    }

    this.notifyStateChange();

    try {
      let output: any;

      switch (node.type) {
        case NodeType.START:
          output = input;
          break;

        case NodeType.AI_AGENT:
          output = await this.executeAIAgent(node, input);
          break;

        case NodeType.TOOL:
          output = await this.executeTool(node, input);
          break;

        case NodeType.CONDITION:
          output = await this.executeCondition(node, input);
          break;

        case NodeType.LOOP:
          output = await this.executeLoop(node, input);
          break;

        case NodeType.TRANSFORM:
          output = await this.executeTransform(node, input);
          break;

        case NodeType.MERGE:
          output = await this.executeMerge(node, input);
          break;

        case NodeType.KNOWLEDGE:
          output = await this.executeKnowledge(node, input);
          break;

        case NodeType.HUMAN_INPUT:
          output = await this.executeHumanInput(node, input);
          break;

        case NodeType.END:
          output = input;
          break;

        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }

      // Record history
      this.state.history.push({
        nodeId: node.id,
        nodeType: node.type,
        input,
        output,
        timestamp: Date.now(),
        duration: Date.now() - startTime
      });

      // Store output in variables
      this.state.variables[node.id] = output;

      // Update node status to completed
      if (this.onNodeStatusChange) {
        this.onNodeStatusChange(node.id, NodeExecutionStatus.COMPLETED);
      }

      // Execute next nodes
      if (node.type !== NodeType.END) {
        const nextNodes = this.getNextNodes(node, output);

        if (nextNodes.length === 0) {
          return output;
        }

        // Execute next nodes
        if (nextNodes.length === 1) {
          return await this.executeNode(nextNodes[0], output);
        } else {
          // Parallel execution for multiple paths
          const results = await Promise.all(
            nextNodes.map(n => this.executeNode(n, output))
          );
          return results;
        }
      }

      return output;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      // Update node status to error
      if (this.onNodeStatusChange) {
        this.onNodeStatusChange(node.id, NodeExecutionStatus.ERROR, errorMessage);
      }

      this.state.history.push({
        nodeId: node.id,
        nodeType: node.type,
        input,
        output: null,
        timestamp: Date.now(),
        duration: Date.now() - startTime,
        error: errorMessage
      });
      throw error;
    }
  }

  /**
   * Execute AI Agent node
   */
  private async executeAIAgent(node: WorkflowNode, input: any): Promise<string> {
    const data = node.data as any;
    const modelId = data.model || 'gpt-3.5-turbo';

    // Determine provider from model ID
    let provider: ModelProvider = 'openai';
    if (modelId.startsWith('claude')) provider = 'anthropic';
    else if (modelId.includes('nvidia') || modelId.includes('deepseek')) provider = 'nvidia';

    // Get API key from environment or settings
    const apiKey = process.env[`${provider.toUpperCase()}_API_KEY`] || '';

    if (!apiKey) {
      throw new Error(`No API key configured for provider: ${provider}`);
    }

    const client = createAIClient(provider, apiKey);

    const messages = [
      { role: 'system' as const, content: data.systemPrompt || 'You are a helpful assistant.' },
      { role: 'user' as const, content: typeof input === 'string' ? input : JSON.stringify(input) }
    ];

    let fullResponse = '';
    const stream = client.streamChatCompletion({
      model: modelId,
      messages,
      temperature: data.temperature || 0.7,
      max_tokens: data.maxTokens || 2048
    });

    for await (const chunk of stream) {
      fullResponse += chunk;
    }

    return fullResponse;
  }

  /**
   * Execute Tool node
   */
  private async executeTool(node: WorkflowNode, input: any): Promise<any> {
    const data = node.data as any;
    const toolId = data.toolId;

    if (!toolId) {
      throw new Error('No tool selected for Tool node');
    }

    // Get tool from store
    const toolStore = useToolStore.getState();
    const tool = toolStore.getTool(toolId);

    if (!tool) {
      throw new Error(`Tool not found: ${toolId}`);
    }

    // Merge parameters with input
    const parameters = {
      ...data.parameters,
      ...(typeof input === 'object' ? input : { input })
    };

    try {
      // Execute tool using ToolExecutor
      const result = await ToolExecutor.execute(tool, parameters);

      return {
        tool: toolId,
        toolName: tool.name,
        result,
        input,
        executedAt: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Tool execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Execute Condition node
   */
  private async executeCondition(node: WorkflowNode, input: any): Promise<any> {
    const data = node.data as any;
    const expression = data.expression;
    const operator = data.operator;
    const value = data.value;

    let result = false;

    // Extract field value from input
    const inputValue = typeof input === 'object' ? input[expression] : input;

    switch (operator) {
      case 'equals':
        result = inputValue === value;
        break;
      case 'contains':
        result = String(inputValue).includes(String(value));
        break;
      case 'greater':
        result = Number(inputValue) > Number(value);
        break;
      case 'less':
        result = Number(inputValue) < Number(value);
        break;
      case 'regex':
        result = new RegExp(value).test(String(inputValue));
        break;
    }

    return {
      ...input,
      conditionResult: result,
      conditionPath: result ? 'true' : 'false'
    };
  }

  /**
   * Execute Loop node
   */
  private async executeLoop(node: WorkflowNode, input: any): Promise<any> {
    const data = node.data as any;
    const iterableField = data.iterableField;
    const maxIterations = data.maxIterations || 100;

    let items = input;
    if (typeof input === 'object' && iterableField) {
      items = input[iterableField];
    }

    if (!Array.isArray(items)) {
      throw new Error('Loop input must be an array');
    }

    const results = [];
    const loopBody = this.getNextNodes(node, input)[0];

    if (!loopBody) {
      return items;
    }

    for (let i = 0; i < Math.min(items.length, maxIterations); i++) {
      const result = await this.executeNode(loopBody, items[i]);
      results.push(result);
    }

    return results;
  }

  /**
   * Execute Transform node
   */
  private async executeTransform(node: WorkflowNode, input: any): Promise<any> {
    const data = node.data as any;
    const transformType = data.transformType;
    const code = data.code;

    try {
      // Create a safe function from the code
      const transform = new Function('input', code);
      return transform(input);
    } catch (error) {
      throw new Error(`Transform error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Execute Merge node
   */
  private async executeMerge(node: WorkflowNode, input: any): Promise<any> {
    // Get all incoming edges
    const incomingEdges = this.edges.filter(e => e.target === node.id);

    // Collect outputs from all incoming nodes
    const inputs = incomingEdges.map(e => this.state.variables[e.source]).filter(Boolean);

    // Merge all inputs
    if (Array.isArray(input)) {
      return [...inputs, ...input];
    } else if (typeof input === 'object') {
      return Object.assign({}, ...inputs, input);
    }

    return inputs;
  }

  /**
   * Execute Knowledge node
   */
  private async executeKnowledge(node: WorkflowNode, input: any): Promise<any> {
    const data = node.data as any;
    const query = typeof input === 'string' ? input : data.query;
    const topK = data.topK || 5;
    const threshold = data.threshold || 0.7;

    // Get documents from knowledge store
    const knowledgeStore = useKnowledgeStore.getState();
    const documents = knowledgeStore.getAllDocuments();

    if (documents.length === 0) {
      return {
        query,
        results: [],
        message: 'No documents in knowledge base'
      };
    }

    // Create generator and chunks for search - using simulated embeddings for now
    const { EmbeddingGenerator } = await import('@/lib/knowledge/embeddings');
    const { TextChunker } = await import('@/lib/knowledge/chunking');
    
    const generator = new EmbeddingGenerator({
      provider: 'simulated',
      model: 'simulated',
      dimensions: 1536
    });
    
    const allChunks = documents.flatMap(doc => 
      TextChunker.chunkText(doc.content, doc.id, { chunkSize: 512, chunkOverlap: 50 })
    );

    // Perform semantic search
    const searchInstance = new SemanticSearch(generator as any);
    const results = await searchInstance.search(
      query,
      allChunks as any,
      documents,
      { topK, threshold }
    );

    return {
      query,
      results: results.map(r => ({
        content: (r.chunk as any).content || (r.chunk as any).text,
        score: r.score,
        documentId: (r.chunk as any).documentId
      }))
    };
  }

  /**
   * Execute Human Input node
   */
  private async executeHumanInput(node: WorkflowNode, input: any): Promise<any> {
    // Pause execution and wait for human input
    this.pause();

    // Return a promise that resolves when resume is called
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (this.state.status !== ExecutionStatus.PAUSED) {
          clearInterval(checkInterval);
          resolve(this.state.variables);
        }
      }, 100);
    });
  }

  /**
   * Get next nodes to execute
   */
  private getNextNodes(node: WorkflowNode, output: any): WorkflowNode[] {
    const outgoingEdges = this.edges.filter(e => e.source === node.id);

    // For condition nodes, filter based on condition result
    if (node.type === NodeType.CONDITION && output?.conditionPath) {
      const truePath = outgoingEdges.filter(e => e.label === 'true' || e.label === 'yes');
      const falsePath = outgoingEdges.filter(e => e.label === 'false' || e.label === 'no');

      if (output.conditionPath === 'true' && truePath.length > 0) {
        return truePath.map(e => this.nodes.find(n => n.id === e.target)!).filter(Boolean);
      } else if (output.conditionPath === 'false' && falsePath.length > 0) {
        return falsePath.map(e => this.nodes.find(n => n.id === e.target)!).filter(Boolean);
      }
    }

    return outgoingEdges
      .map(e => this.nodes.find(n => n.id === e.target))
      .filter(Boolean) as WorkflowNode[];
  }

  /**
   * Notify state change
   */
  private notifyStateChange(): void {
    if (this.onStateChange) {
      this.onStateChange(this.state);
    }
  }
}
