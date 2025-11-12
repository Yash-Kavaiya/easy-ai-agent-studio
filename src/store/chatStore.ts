/**
 * Chat Store - Manages conversations and messages
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Conversation, Message, ChatSettings } from '@/types/chat.types';

interface ChatStore {
  conversations: Record<string, Conversation>;
  activeConversationId: string | null;
  isStreaming: boolean;
  streamingMessageId: string | null;
  settings: ChatSettings;

  // Conversation actions
  createConversation: (title?: string, agentId?: string) => string;
  deleteConversation: (id: string) => void;
  setActiveConversation: (id: string | null) => void;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
  getConversation: (id: string) => Conversation | undefined;
  getAllConversations: () => Conversation[];

  // Message actions
  addMessage: (conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) => string;
  updateMessage: (conversationId: string, messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;
  getMessages: (conversationId: string) => Message[];
  clearMessages: (conversationId: string) => void;

  // Streaming actions
  setStreaming: (isStreaming: boolean, messageId?: string) => void;

  // Settings actions
  updateSettings: (updates: Partial<ChatSettings>) => void;
}

const DEFAULT_SETTINGS: ChatSettings = {
  systemPrompt: '',
  temperature: 0.7,
  maxTokens: 2048,
  stream: true,
  saveHistory: true
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      conversations: {},
      activeConversationId: null,
      isStreaming: false,
      streamingMessageId: null,
      settings: DEFAULT_SETTINGS,

      // Conversation actions
      createConversation: (title, agentId) => {
        const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newConversation: Conversation = {
          id,
          title: title || 'New Conversation',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          agentId
        };

        set((state) => ({
          conversations: { ...state.conversations, [id]: newConversation },
          activeConversationId: state.activeConversationId || id
        }));

        return id;
      },

      deleteConversation: (id) => {
        set((state) => {
          const { [id]: _, ...rest } = state.conversations;
          return {
            conversations: rest,
            activeConversationId: state.activeConversationId === id ? null : state.activeConversationId
          };
        });
      },

      setActiveConversation: (id) => {
        set({ activeConversationId: id });
      },

      updateConversation: (id, updates) => {
        set((state) => {
          const conversation = state.conversations[id];
          if (!conversation) return state;

          return {
            conversations: {
              ...state.conversations,
              [id]: {
                ...conversation,
                ...updates,
                updatedAt: new Date()
              }
            }
          };
        });
      },

      getConversation: (id) => {
        return get().conversations[id];
      },

      getAllConversations: () => {
        return Object.values(get().conversations).sort(
          (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
        );
      },

      // Message actions
      addMessage: (conversationId, message) => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newMessage: Message = {
          ...message,
          id: messageId,
          timestamp: new Date()
        };

        set((state) => {
          const conversation = state.conversations[conversationId];
          if (!conversation) return state;

          return {
            conversations: {
              ...state.conversations,
              [conversationId]: {
                ...conversation,
                messages: [...conversation.messages, newMessage],
                updatedAt: new Date()
              }
            }
          };
        });

        return messageId;
      },

      updateMessage: (conversationId, messageId, updates) => {
        set((state) => {
          const conversation = state.conversations[conversationId];
          if (!conversation) return state;

          return {
            conversations: {
              ...state.conversations,
              [conversationId]: {
                ...conversation,
                messages: conversation.messages.map((msg) =>
                  msg.id === messageId ? { ...msg, ...updates } : msg
                ),
                updatedAt: new Date()
              }
            }
          };
        });
      },

      deleteMessage: (conversationId, messageId) => {
        set((state) => {
          const conversation = state.conversations[conversationId];
          if (!conversation) return state;

          return {
            conversations: {
              ...state.conversations,
              [conversationId]: {
                ...conversation,
                messages: conversation.messages.filter((msg) => msg.id !== messageId),
                updatedAt: new Date()
              }
            }
          };
        });
      },

      getMessages: (conversationId) => {
        return get().conversations[conversationId]?.messages || [];
      },

      clearMessages: (conversationId) => {
        set((state) => {
          const conversation = state.conversations[conversationId];
          if (!conversation) return state;

          return {
            conversations: {
              ...state.conversations,
              [conversationId]: {
                ...conversation,
                messages: [],
                updatedAt: new Date()
              }
            }
          };
        });
      },

      // Streaming actions
      setStreaming: (isStreaming, messageId) => {
        set({ isStreaming, streamingMessageId: messageId || null });
      },

      // Settings actions
      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates }
        }));
      }
    }),
    {
      name: 'chat-storage',
      version: 1
    }
  )
);
