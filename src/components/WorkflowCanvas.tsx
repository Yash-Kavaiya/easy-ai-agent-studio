import { useCallback, useState, DragEvent, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Connection,
  MarkerType,
  BackgroundVariant,
  MiniMap,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowStore } from '@/store/workflowStore';
import { AIAgentNode } from './studio/workflow/nodes/AIAgentNode';
import { ToolNode } from './studio/workflow/nodes/ToolNode';
import { ConditionNode } from './studio/workflow/nodes/ConditionNode';
import { LoopNode } from './studio/workflow/nodes/LoopNode';
import { TransformNode } from './studio/workflow/nodes/TransformNode';
import { MergeNode } from './studio/workflow/nodes/MergeNode';
import { KnowledgeNode } from './studio/workflow/nodes/KnowledgeNode';
import { HumanInputNode } from './studio/workflow/nodes/HumanInputNode';
import { StartNode } from './studio/workflow/nodes/StartNode';
import { EndNode } from './studio/workflow/nodes/EndNode';
import { NodeType, WorkflowNode } from '@/types/workflow.types';

// Define custom node types
const nodeTypes: NodeTypes = {
  [NodeType.START]: StartNode,
  [NodeType.AI_AGENT]: AIAgentNode,
  [NodeType.TOOL]: ToolNode,
  [NodeType.CONDITION]: ConditionNode,
  [NodeType.LOOP]: LoopNode,
  [NodeType.TRANSFORM]: TransformNode,
  [NodeType.MERGE]: MergeNode,
  [NodeType.KNOWLEDGE]: KnowledgeNode,
  [NodeType.HUMAN_INPUT]: HumanInputNode,
  [NodeType.END]: EndNode,
};

// Default nodes for new workflows
const initialNodes: WorkflowNode[] = [
  {
    id: 'start-1',
    type: NodeType.START,
    position: { x: 250, y: 50 },
    data: { label: 'Start' }
  },
  {
    id: 'agent-1',
    type: NodeType.AI_AGENT,
    position: { x: 250, y: 150 },
    data: {
      label: 'AI Agent',
      model: 'gpt-3.5-turbo',
      systemPrompt: '',
      temperature: 0.7,
      maxTokens: 2048,
      tools: []
    }
  },
];

interface WorkflowCanvasProps {
  workflowId?: string;
}

export const WorkflowCanvas = ({ workflowId }: WorkflowCanvasProps = {}) => {
  const {
    getNodes,
    setNodes,
    getEdges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    addNode,
    addEdge: addEdgeToStore,
    createWorkflow,
    setActiveWorkflow
  } = useWorkflowStore();

  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [currentWorkflowId, setCurrentWorkflowId] = useState<string | null>(null);

  // Initialize workflow
  useEffect(() => {
    const id = workflowId || 'default-workflow';
    createWorkflow(id);
    setActiveWorkflow(id);
    setCurrentWorkflowId(id);

    // Set initial nodes if empty
    const nodes = getNodes(id);
    if (nodes.length === 0) {
      setNodes(initialNodes, id);
    }
  }, [workflowId]);

  const nodes = currentWorkflowId ? getNodes(currentWorkflowId) : [];
  const edges = currentWorkflowId ? getEdges(currentWorkflowId) : [];

  const onConnect = useCallback(
    (params: Connection) => {
      if (!currentWorkflowId) return;
      addEdgeToStore(params, currentWorkflowId);
    },
    [addEdgeToStore, currentWorkflowId]
  );

  // Handle node drop
  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (!currentWorkflowId || !reactFlowInstance) return;

      const nodeType = event.dataTransfer.getData('application/reactflow');
      if (!nodeType) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const id = `${nodeType}-${Date.now()}`;

      // Helper to get default data for each node type
      const getDefaultData = (type: string) => {
        const baseData = {
          label: type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
        };

        switch (type as NodeType) {
          case NodeType.START:
          case NodeType.END:
            return baseData;

          case NodeType.AI_AGENT:
            return {
              ...baseData,
              model: 'gpt-3.5-turbo',
              systemPrompt: '',
              temperature: 0.7,
              maxTokens: 2048,
              tools: []
            };

          case NodeType.TOOL:
            return {
              ...baseData,
              toolId: '',
              parameters: {},
              timeout: 30000
            };

          case NodeType.CONDITION:
            return {
              ...baseData,
              expression: '',
              operator: 'equals' as const,
              value: ''
            };

          case NodeType.LOOP:
            return {
              ...baseData,
              iterableField: 'items',
              maxIterations: 100
            };

          case NodeType.TRANSFORM:
            return {
              ...baseData,
              transformType: 'custom' as const,
              code: 'return input;'
            };

          case NodeType.KNOWLEDGE:
            return {
              ...baseData,
              query: '',
              topK: 5,
              threshold: 0.7
            };

          case NodeType.HUMAN_INPUT:
            return {
              ...baseData,
              prompt: 'Please provide input',
              inputType: 'text' as const,
              options: []
            };

          case NodeType.MERGE:
            return baseData;

          default:
            return baseData;
        }
      };

      const newNode: WorkflowNode = {
        id,
        type: nodeType as NodeType,
        position,
        data: getDefaultData(nodeType)
      };

      addNode(newNode, currentWorkflowId);
    },
    [reactFlowInstance, addNode, currentWorkflowId]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="h-full w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={(changes) => currentWorkflowId && onNodesChange(changes, currentWorkflowId)}
        onEdgesChange={(changes) => currentWorkflowId && onEdgesChange(changes, currentWorkflowId)}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        fitView
        defaultEdgeOptions={{
          animated: true,
          style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'hsl(var(--primary))',
          },
        }}
        className="bg-background"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          className="opacity-20"
        />
        <Controls className="bg-card border-border rounded-lg" />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case NodeType.START:
                return 'hsl(var(--node-start))';
              case NodeType.AI_AGENT:
                return 'hsl(var(--node-ai))';
              case NodeType.TOOL:
                return 'hsl(var(--node-tool))';
              case NodeType.CONDITION:
                return 'hsl(var(--node-condition))';
              case NodeType.LOOP:
                return 'hsl(var(--node-loop))';
              case NodeType.TRANSFORM:
                return 'hsl(var(--node-transform))';
              case NodeType.MERGE:
                return 'hsl(var(--node-merge))';
              case NodeType.KNOWLEDGE:
                return 'hsl(var(--node-knowledge))';
              case NodeType.HUMAN_INPUT:
                return 'hsl(var(--node-human))';
              case NodeType.END:
                return 'hsl(var(--node-end))';
              default:
                return 'hsl(var(--muted))';
            }
          }}
          className="bg-card border-border rounded-lg"
          maskColor="rgba(0, 0, 0, 0.6)"
        />
      </ReactFlow>
    </div>
  );
};
