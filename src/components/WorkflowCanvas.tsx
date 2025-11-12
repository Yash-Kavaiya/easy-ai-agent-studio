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
import { NodeType, WorkflowNode } from '@/types/workflow.types';

// Define custom node types
const nodeTypes: NodeTypes = {
  [NodeType.AI_AGENT]: AIAgentNode,
  [NodeType.TOOL]: ToolNode,
  [NodeType.CONDITION]: ConditionNode,
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
      const newNode: WorkflowNode = {
        id,
        type: nodeType as NodeType,
        position,
        data: {
          label: nodeType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          ...(nodeType === NodeType.AI_AGENT && {
            model: 'gpt-3.5-turbo',
            systemPrompt: '',
            temperature: 0.7,
            maxTokens: 2048,
            tools: []
          }),
          ...(nodeType === NodeType.TOOL && {
            toolId: '',
            parameters: {},
            timeout: 30000
          }),
          ...(nodeType === NodeType.CONDITION && {
            expression: '',
            operator: 'equals' as const,
            value: ''
          })
        }
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
          style: { stroke: '#76B900', strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#76B900',
          },
        }}
        style={{ background: '#0a0a0a' }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          color="#333"
        />
        <Controls
          style={{
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '8px'
          }}
        />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case NodeType.AI_AGENT:
                return '#76B900';
              case NodeType.TOOL:
                return '#3b82f6';
              case NodeType.CONDITION:
                return '#f59e0b';
              default:
                return '#6b7280';
            }
          }}
          style={{
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '8px'
          }}
          maskColor="rgba(0, 0, 0, 0.6)"
        />
      </ReactFlow>
    </div>
  );
};
