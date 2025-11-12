/**
 * Tool Store - Manages tools and actions
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ToolConfig, CustomToolCode } from '@/types/tool.types';
import { BUILT_IN_TOOLS } from '@/lib/tools/built-in-tools';

interface ToolStore {
  tools: Record<string, ToolConfig>;
  customTools: Record<string, CustomToolCode>;
  favoriteToolIds: string[];

  // Actions
  initializeBuiltInTools: () => void;
  getTool: (id: string) => ToolConfig | undefined;
  getAllTools: () => ToolConfig[];
  getCustomTools: () => ToolConfig[];
  addCustomTool: (tool: ToolConfig, code?: CustomToolCode) => void;
  updateTool: (id: string, updates: Partial<ToolConfig>) => void;
  deleteTool: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getFavoriteTools: () => ToolConfig[];
  searchTools: (query: string) => ToolConfig[];
}

export const useToolStore = create<ToolStore>()(
  persist(
    (set, get) => ({
      tools: {},
      customTools: {},
      favoriteToolIds: [],

      initializeBuiltInTools: () => {
        const builtInToolsMap: Record<string, ToolConfig> = {};
        BUILT_IN_TOOLS.forEach(tool => {
          builtInToolsMap[tool.id] = tool;
        });

        set((state) => ({
          tools: { ...builtInToolsMap, ...state.tools }
        }));
      },

      getTool: (id) => {
        return get().tools[id];
      },

      getAllTools: () => {
        return Object.values(get().tools).sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      },

      getCustomTools: () => {
        return Object.values(get().tools).filter(
          tool => Object.keys(get().customTools).includes(tool.id)
        );
      },

      addCustomTool: (tool, code) => {
        set((state) => {
          const newTools = { ...state.tools, [tool.id]: tool };
          const newCustomTools = code
            ? { ...state.customTools, [tool.id]: code }
            : state.customTools;

          return {
            tools: newTools,
            customTools: newCustomTools
          };
        });
      },

      updateTool: (id, updates) => {
        set((state) => {
          const tool = state.tools[id];
          if (!tool) return state;

          return {
            tools: {
              ...state.tools,
              [id]: {
                ...tool,
                ...updates,
                updatedAt: new Date()
              }
            }
          };
        });
      },

      deleteTool: (id) => {
        set((state) => {
          const { [id]: _, ...remainingTools } = state.tools;
          const { [id]: __, ...remainingCustomTools } = state.customTools;

          return {
            tools: remainingTools,
            customTools: remainingCustomTools,
            favoriteToolIds: state.favoriteToolIds.filter(fid => fid !== id)
          };
        });
      },

      toggleFavorite: (id) => {
        set((state) => {
          const isFavorite = state.favoriteToolIds.includes(id);
          return {
            favoriteToolIds: isFavorite
              ? state.favoriteToolIds.filter(fid => fid !== id)
              : [...state.favoriteToolIds, id]
          };
        });
      },

      isFavorite: (id) => {
        return get().favoriteToolIds.includes(id);
      },

      getFavoriteTools: () => {
        const tools = get().tools;
        return get().favoriteToolIds
          .map(id => tools[id])
          .filter(Boolean);
      },

      searchTools: (query) => {
        const lowerQuery = query.toLowerCase();
        return Object.values(get().tools).filter(tool =>
          tool.name.toLowerCase().includes(lowerQuery) ||
          tool.description.toLowerCase().includes(lowerQuery) ||
          tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
      }
    }),
    {
      name: 'tool-storage',
      version: 1
    }
  )
);
