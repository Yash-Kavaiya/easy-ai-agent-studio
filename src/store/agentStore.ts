/**
 * Agent Store - Manages agent configurations
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AgentConfig } from '@/types/agent.types';

interface AgentStore {
  agents: Record<string, AgentConfig>;
  activeAgentId: string | null;

  // Actions
  createAgent: (config: Omit<AgentConfig, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateAgent: (id: string, updates: Partial<AgentConfig>) => void;
  deleteAgent: (id: string) => void;
  setActiveAgent: (id: string | null) => void;
  getAgent: (id: string) => AgentConfig | undefined;
  getAllAgents: () => AgentConfig[];
}

export const useAgentStore = create<AgentStore>()(
  persist(
    (set, get) => ({
      agents: {},
      activeAgentId: null,

      createAgent: (config) => {
        const id = `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newAgent: AgentConfig = {
          ...config,
          id,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        set((state) => ({
          agents: { ...state.agents, [id]: newAgent },
          activeAgentId: state.activeAgentId || id // Set as active if first agent
        }));

        return id;
      },

      updateAgent: (id, updates) => {
        set((state) => {
          const agent = state.agents[id];
          if (!agent) return state;

          return {
            agents: {
              ...state.agents,
              [id]: {
                ...agent,
                ...updates,
                updatedAt: new Date()
              }
            }
          };
        });
      },

      deleteAgent: (id) => {
        set((state) => {
          const { [id]: _, ...rest } = state.agents;
          return {
            agents: rest,
            activeAgentId: state.activeAgentId === id ? null : state.activeAgentId
          };
        });
      },

      setActiveAgent: (id) => {
        set({ activeAgentId: id });
      },

      getAgent: (id) => {
        return get().agents[id];
      },

      getAllAgents: () => {
        return Object.values(get().agents);
      }
    }),
    {
      name: 'agent-storage',
      version: 1
    }
  )
);
