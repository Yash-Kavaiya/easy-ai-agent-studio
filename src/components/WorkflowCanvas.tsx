import { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Background,
  Controls,
  Connection,
  useNodesState,
  useEdgesState,
  MarkerType,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 50 },
    style: { 
      background: '#76B900', 
      color: 'white', 
      border: '2px solid #76B900',
      borderRadius: '8px',
      padding: '10px'
    },
  },
  {
    id: '2',
    data: { label: 'AI Agent' },
    position: { x: 250, y: 150 },
    style: { 
      background: '#1a1a1a', 
      color: 'white', 
      border: '2px solid #76B900',
      borderRadius: '8px',
      padding: '10px'
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#76B900', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#76B900',
    },
  },
];

export const WorkflowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(3);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: '#76B900', strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#76B900',
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  const addNode = () => {
    const newNode: Node = {
      id: `${nodeId}`,
      data: { label: `Node ${nodeId}` },
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      style: { 
        background: '#1a1a1a', 
        color: 'white', 
        border: '2px solid #76B900',
        borderRadius: '8px',
        padding: '10px'
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId((id) => id + 1);
  };

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={addNode}
          className="bg-nvidia-green hover:bg-nvidia-green/80 text-nvidia-black"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Node
        </Button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
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
      </ReactFlow>
    </div>
  );
};
