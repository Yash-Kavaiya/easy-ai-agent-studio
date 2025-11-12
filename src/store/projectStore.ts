/**
 * Project Store - Manages projects and settings
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '@/types/project.types';
import { AppSettings, DEFAULT_SETTINGS } from '@/types/settings.types';

interface ProjectStore {
  projects: Record<string, Project>;
  activeProjectId: string | null;
  settings: AppSettings;

  // Project actions
  createProject: (name: string, description?: string) => string;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setActiveProject: (id: string | null) => void;
  getProject: (id: string) => Project | undefined;
  getAllProjects: () => Project[];
  duplicateProject: (id: string) => string | null;

  // Settings actions
  updateSettings: (updates: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: {},
      activeProjectId: null,
      settings: DEFAULT_SETTINGS,

      // Project actions
      createProject: (name, description = '') => {
        const id = `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const newProject: Project = {
          id,
          name,
          description,
          version: '1.0.0',
          createdAt: new Date(),
          updatedAt: new Date(),
          agent: {
            id: `agent_${id}`,
            name: `${name} Agent`,
            description: '',
            systemPrompt: '',
            primaryModel: 'gpt-3.5-turbo',
            fallbackModels: [],
            maxIterations: 10,
            timeout: 30000,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          workflow: {
            nodes: [],
            edges: []
          },
          knowledge: {
            documents: [],
            config: {
              chunkSize: 1000,
              chunkOverlap: 200,
              embeddingModel: 'text-embedding-3-small',
              maxDocuments: 100,
              autoUpdate: true
            }
          },
          models: [],
          tools: [],
          testSuites: [],
          settings: {
            autoSave: true,
            autoSaveInterval: 30000,
            theme: 'dark',
            debugMode: false
          },
          metadata: {
            author: '',
            tags: [],
            category: 'general',
            isTemplate: false
          }
        };

        set((state) => ({
          projects: { ...state.projects, [id]: newProject },
          activeProjectId: state.activeProjectId || id
        }));

        return id;
      },

      updateProject: (id, updates) => {
        set((state) => {
          const project = state.projects[id];
          if (!project) return state;

          return {
            projects: {
              ...state.projects,
              [id]: {
                ...project,
                ...updates,
                updatedAt: new Date()
              }
            }
          };
        });
      },

      deleteProject: (id) => {
        set((state) => {
          const { [id]: _, ...rest } = state.projects;
          return {
            projects: rest,
            activeProjectId: state.activeProjectId === id ? null : state.activeProjectId
          };
        });
      },

      setActiveProject: (id) => {
        set({ activeProjectId: id });
      },

      getProject: (id) => {
        return get().projects[id];
      },

      getAllProjects: () => {
        return Object.values(get().projects).sort(
          (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
        );
      },

      duplicateProject: (id) => {
        const project = get().projects[id];
        if (!project) return null;

        const newId = `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const duplicatedProject: Project = {
          ...project,
          id: newId,
          name: `${project.name} (Copy)`,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        set((state) => ({
          projects: { ...state.projects, [newId]: duplicatedProject }
        }));

        return newId;
      },

      // Settings actions
      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates }
        }));
      },

      resetSettings: () => {
        set({ settings: DEFAULT_SETTINGS });
      }
    }),
    {
      name: 'project-storage',
      version: 1
    }
  )
);
