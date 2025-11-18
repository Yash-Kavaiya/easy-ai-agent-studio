/**
 * Workflow Store - Manages workflow nodes and edges
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WorkflowNode, WorkflowEdge, WorkflowData, WorkflowExecutionState, NodeExecutionStatus, NodeExecutionState } from '@/types/workflow.types';
import { WorkflowNode, WorkflowEdge, WorkflowData, NodeExecutionStatus } from '@/types/workflow.types';
import { addEdge, applyNodeChanges, applyEdgeChanges, Connection, EdgeChange, NodeChange } from 'reactflow';

interface WorkflowStore {
  workflows: Record<string, WorkflowData>;
  activeWorkflowId: string | null;
  selectedNodeId: string | null;
  executionStates: Record<string, WorkflowExecutionState>;

  // Actions
  createWorkflow: (id: string) => void;
  deleteWorkflow: (id: string) => void;
  setActiveWorkflow: (id: string) => void;
  setSelectedNode: (nodeId: string | null) => void;

  // Node operations
  getNodes: (workflowId?: string) => WorkflowNode[];
  setNodes: (nodes: WorkflowNode[], workflowId?: string) => void;
  addNode: (node: WorkflowNode, workflowId?: string) => void;
  updateNode: (nodeId: string, updates: Partial<WorkflowNode>, workflowId?: string) => void;
  updateNodeStatus: (nodeId: string, status: NodeExecutionStatus, error?: string, workflowId?: string) => void;
  resetAllNodeStatuses: (workflowId?: string) => void;
  deleteNode: (nodeId: string, workflowId?: string) => void;
  onNodesChange: (changes: NodeChange[], workflowId?: string) => void;

  // Edge operations
  getEdges: (workflowId?: string) => WorkflowEdge[];
  setEdges: (edges: WorkflowEdge[], workflowId?: string) => void;
  addEdge: (connection: Connection, workflowId?: string) => void;
  deleteEdge: (edgeId: string, workflowId?: string) => void;
  onEdgesChange: (changes: EdgeChange[], workflowId?: string) => void;

  // Workflow operations
  getWorkflow: (workflowId?: string) => WorkflowData | null;
  clearWorkflow: (workflowId?: string) => void;

  // Execution state operations
  getExecutionState: (workflowId?: string) => WorkflowExecutionState | null;
  updateNodeExecutionStatus: (nodeId: string, status: NodeExecutionStatus, error?: string, output?: any, workflowId?: string) => void;
  setCurrentExecutingNode: (nodeId: string | null, workflowId?: string) => void;
  addToExecutionPath: (nodeId: string, workflowId?: string) => void;
  resetExecutionState: (workflowId?: string) => void;
  setExecutionRunning: (isRunning: boolean, workflowId?: string) => void;
  setExecutionPaused: (isPaused: boolean, workflowId?: string) => void;
}

export const useWorkflowStore = create<WorkflowStore>()(
  persist(
    (set, get) => ({
      workflows: {},
      activeWorkflowId: null,
      selectedNodeId: null,
      executionStates: {},

      createWorkflow: (id) => {
        set((state) => ({
          workflows: {
            ...state.workflows,
            [id]: { nodes: [], edges: [] }
          },
          executionStates: {
            ...state.executionStates,
            [id]: {
              isRunning: false,
              isPaused: false,
              currentNodeId: null,
              nodeStates: {},
              executionPath: []
            }
          },
          activeWorkflowId: state.activeWorkflowId || id
        }));
      },

      deleteWorkflow: (id) => {
        set((state) => {
          const { [id]: _, ...rest } = state.workflows;
          const { [id]: __, ...restExecStates } = state.executionStates;
          return {
            workflows: rest,
            executionStates: restExecStates,
            activeWorkflowId: state.activeWorkflowId === id ? null : state.activeWorkflowId
          };
        });
      },

      setActiveWorkflow: (id) => {
        set({ activeWorkflowId: id });
      },

      setSelectedNode: (nodeId) => {
        set({ selectedNodeId: nodeId });
      },

      // Node operations
      getNodes: (workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return [];
        return get().workflows[id]?.nodes || [];
      },

      setNodes: (nodes, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => ({
          workflows: {
            ...state.workflows,
            [id]: {
              ...state.workflows[id],
              nodes
            }
          }
        }));
      },

      addNode: (node, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => {
          const workflow = state.workflows[id];
          return {
            workflows: {
              ...state.workflows,
              [id]: {
                ...workflow,
                nodes: [...(workflow?.nodes || []), node]
              }
            }
          };
        });
      },

      updateNode: (nodeId, updates, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => {
          const workflow = state.workflows[id];
          if (!workflow) return state;

          return {
            workflows: {
              ...state.workflows,
              [id]: {
                ...workflow,
                nodes: workflow.nodes.map((node) =>
                  node.id === nodeId ? { ...node, ...updates } : node
                )
              }
            }
          };
        });
      },

      deleteNode: (nodeId, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => {
          const workflow = state.workflows[id];
          if (!workflow) return state;

          return {
            workflows: {
              ...state.workflows,
              [id]: {
                nodes: workflow.nodes.filter((node) => node.id !== nodeId),
                edges: workflow.edges.filter(
                  (edge) => edge.source !== nodeId && edge.target !== nodeId
                )
              }
            }
          };
        });
      },

      updateNodeStatus: (nodeId, status, error, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => {
          const workflow = state.workflows[id];
          if (!workflow) return state;

          return {
            workflows: {
              ...state.workflows,
              [id]: {
                ...workflow,
                nodes: workflow.nodes.map((node) =>
                  node.id === nodeId
                    ? {
                        ...node,
                        data: {
                          ...node.data,
                          executionStatus: status,
                          executionError: error
                        }
                      }
                    : node
                )
              }
            }
          };
        });
      },

      resetAllNodeStatuses: (workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => {
          const workflow = state.workflows[id];
          if (!workflow) return state;

          return {
            workflows: {
              ...state.workflows,
              [id]: {
                ...workflow,
                nodes: workflow.nodes.map((node) => ({
                  ...node,
                  data: {
                    ...node.data,
                    executionStatus: NodeExecutionStatus.IDLE,
                    executionError: undefined
                  }
                }))
              }
            }
          };
        });
      },

      onNodesChange: (changes, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state: any) => {
          const workflow = state.workflows[id];
          if (!workflow) return state;

          return {
            ...state,
            workflows: {
              ...state.workflows,
              [id]: {
                ...workflow,
                nodes: applyNodeChanges(changes, workflow.nodes)
              }
            }
          };
        });
      },

      // Edge operations
      getEdges: (workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return [];
        return get().workflows[id]?.edges || [];
      },

      setEdges: (edges, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => ({
          workflows: {
            ...state.workflows,
            [id]: {
              ...state.workflows[id],
              edges
            }
          }
        }));
      },

      addEdge: (connection, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state: any) => {
          const workflow = state.workflows[id];
          if (!workflow) return state;

          return {
            ...state,
            workflows: {
              ...state.workflows,
              [id]: {
                ...workflow,
                edges: addEdge(connection, workflow.edges)
              }
            }
          };
        });
      },

      deleteEdge: (edgeId, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => {
          const workflow = state.workflows[id];
          if (!workflow) return state;

          return {
            workflows: {
              ...state.workflows,
              [id]: {
                ...workflow,
                edges: workflow.edges.filter((edge) => edge.id !== edgeId)
              }
            }
          };
        });
      },

      onEdgesChange: (changes, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state: any) => {
          const workflow = state.workflows[id];
          if (!workflow) return state;

          return {
            ...state,
            workflows: {
              ...state.workflows,
              [id]: {
                ...workflow,
                edges: applyEdgeChanges(changes, workflow.edges)
              }
            }
          };
        });
      },

      // Workflow operations
      getWorkflow: (workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return null;
        return get().workflows[id] || null;
      },

      clearWorkflow: (workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => ({
          workflows: {
            ...state.workflows,
            [id]: { nodes: [], edges: [] }
          }
        }));
      },

      // Execution state operations
      getExecutionState: (workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return null;
        return get().executionStates[id] || null;
      },

      updateNodeExecutionStatus: (nodeId, status, error, output, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => {
          const execState = state.executionStates[id] || {
            isRunning: false,
            isPaused: false,
            currentNodeId: null,
            nodeStates: {},
            executionPath: []
          };

          const nodeState: NodeExecutionState = {
            nodeId,
            status,
            ...(status === NodeExecutionStatus.RUNNING && { startTime: Date.now() }),
            ...(status === NodeExecutionStatus.COMPLETED || status === NodeExecutionStatus.ERROR
              ? { endTime: Date.now() }
              : {}),
            ...(error && { error }),
            ...(output !== undefined && { output })
          };

          // Update node data with execution status
          const workflow = state.workflows[id];
          const updatedNodes = workflow?.nodes.map(node =>
            node.id === nodeId
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    executionStatus: status,
                    executionError: error,
                    executionOutput: output
                  }
                }
              : node
          ) || [];

          return {
            workflows: {
              ...state.workflows,
              [id]: {
                ...workflow,
                nodes: updatedNodes
              }
            },
            executionStates: {
              ...state.executionStates,
              [id]: {
                ...execState,
                nodeStates: {
                  ...execState.nodeStates,
                  [nodeId]: nodeState
                }
              }
            }
          };
        });
      },

      setCurrentExecutingNode: (nodeId, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => {
          const execState = state.executionStates[id] || {
            isRunning: false,
            isPaused: false,
            currentNodeId: null,
            nodeStates: {},
            executionPath: []
          };

          return {
            executionStates: {
              ...state.executionStates,
              [id]: {
                ...execState,
                currentNodeId: nodeId
              }
            }
          };
        });
      },

      addToExecutionPath: (nodeId, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => {
          const execState = state.executionStates[id] || {
            isRunning: false,
            isPaused: false,
            currentNodeId: null,
            nodeStates: {},
            executionPath: []
          };

          return {
            executionStates: {
              ...state.executionStates,
              [id]: {
                ...execState,
                executionPath: [...execState.executionPath, nodeId]
              }
            }
          };
        });
      },

      resetExecutionState: (workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => {
          // Reset execution status on all nodes
          const workflow = state.workflows[id];
          const resetNodes = workflow?.nodes.map(node => ({
            ...node,
            data: {
              ...node.data,
              executionStatus: undefined,
              executionError: undefined,
              executionOutput: undefined
            }
          })) || [];

          return {
            workflows: {
              ...state.workflows,
              [id]: {
                ...workflow,
                nodes: resetNodes
              }
            },
            executionStates: {
              ...state.executionStates,
              [id]: {
                isRunning: false,
                isPaused: false,
                currentNodeId: null,
                nodeStates: {},
                executionPath: []
              }
            }
          };
        });
      },

      setExecutionRunning: (isRunning, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => {
          const execState = state.executionStates[id] || {
            isRunning: false,
            isPaused: false,
            currentNodeId: null,
            nodeStates: {},
            executionPath: []
          };

          return {
            executionStates: {
              ...state.executionStates,
              [id]: {
                ...execState,
                isRunning
              }
            }
          };
        });
      },

      setExecutionPaused: (isPaused, workflowId) => {
        const id = workflowId || get().activeWorkflowId;
        if (!id) return;

        set((state) => {
          const execState = state.executionStates[id] || {
            isRunning: false,
            isPaused: false,
            currentNodeId: null,
            nodeStates: {},
            executionPath: []
          };

          return {
            executionStates: {
              ...state.executionStates,
              [id]: {
                ...execState,
                isPaused
              }
            }
          };
        });
      }
    }),
    {
      name: 'workflow-storage',
      version: 1
    }
  )
);
