/**
 * Workflow Store - Manages workflow nodes and edges
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WorkflowNode, WorkflowEdge, WorkflowData } from '@/types/workflow.types';
import { addEdge, applyNodeChanges, applyEdgeChanges, Connection, EdgeChange, NodeChange } from 'reactflow';

interface WorkflowStore {
  workflows: Record<string, WorkflowData>;
  activeWorkflowId: string | null;

  // Actions
  createWorkflow: (id: string) => void;
  deleteWorkflow: (id: string) => void;
  setActiveWorkflow: (id: string) => void;

  // Node operations
  getNodes: (workflowId?: string) => WorkflowNode[];
  setNodes: (nodes: WorkflowNode[], workflowId?: string) => void;
  addNode: (node: WorkflowNode, workflowId?: string) => void;
  updateNode: (nodeId: string, updates: Partial<WorkflowNode>, workflowId?: string) => void;
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
}

export const useWorkflowStore = create<WorkflowStore>()(
  persist(
    (set, get) => ({
      workflows: {},
      activeWorkflowId: null,

      createWorkflow: (id) => {
        set((state) => ({
          workflows: {
            ...state.workflows,
            [id]: { nodes: [], edges: [] }
          },
          activeWorkflowId: state.activeWorkflowId || id
        }));
      },

      deleteWorkflow: (id) => {
        set((state) => {
          const { [id]: _, ...rest } = state.workflows;
          return {
            workflows: rest,
            activeWorkflowId: state.activeWorkflowId === id ? null : state.activeWorkflowId
          };
        });
      },

      setActiveWorkflow: (id) => {
        set({ activeWorkflowId: id });
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

      onNodesChange: (changes, workflowId) => {
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

        set((state) => {
          const workflow = state.workflows[id];
          if (!workflow) return state;

          return {
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

        set((state) => {
          const workflow = state.workflows[id];
          if (!workflow) return state;

          return {
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
      }
    }),
    {
      name: 'workflow-storage',
      version: 1
    }
  )
);
