/**
 * Chat Interface Component
 * Main chat UI with message history and real-time streaming
 */

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChatStore } from '@/store/chatStore';
import { useAgentStore } from '@/store/agentStore';
import { useProjectStore } from '@/store/projectStore';
import { createAIClient } from '@/lib/api/client';
import { ModelProvider } from '@/types/model.types';
import { MessageSquare, Trash2, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ChatInterfaceProps {
  className?: string;
}

export function ChatInterface({ className }: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    conversations,
    activeConversationId,
    isStreaming,
    createConversation,
    setActiveConversation,
    addMessage,
    getMessages,
    clearMessages,
    setStreaming,
    updateMessage
  } = useChatStore();

  const { activeAgentId, getAgent } = useAgentStore();
  const { settings } = useProjectStore();
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  // Initialize conversation
  useEffect(() => {
    if (!activeConversationId) {
      const id = createConversation('New Chat', activeAgentId || undefined);
      setActiveConversation(id);
      setCurrentConversationId(id);
    } else {
      setCurrentConversationId(activeConversationId);
    }
  }, [activeConversationId, activeAgentId, createConversation, setActiveConversation]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversations, currentConversationId]);

  const messages = currentConversationId ? getMessages(currentConversationId) : [];
  const agent = activeAgentId ? getAgent(activeAgentId) : null;

  const handleSendMessage = async (text: string, files?: File[]) => {
    if (!currentConversationId) return;

    // Add user message
    const userMessageId = addMessage(currentConversationId, {
      role: 'user',
      content: text,
      attachments: files?.map((file) => ({
        id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file)
      }))
    });

    // Simulate AI response (replace with actual API call)
    setStreaming(true);

    const assistantMessageId = addMessage(currentConversationId, {
      role: 'assistant',
      content: '',
      metadata: {
        model: agent?.primaryModel || 'gpt-3.5-turbo',
        tokens: 0,
        latency: 0
      }
    });

    // Stream AI response
    await streamAIResponse(currentConversationId, assistantMessageId, text);

    setStreaming(false);
  };

  /**
   * Stream AI response using configured provider
   */
  const streamAIResponse = async (
    conversationId: string,
    messageId: string,
    userMessage: string
  ) => {
    const startTime = Date.now();
    let currentText = '';
    let tokenCount = 0;

    try {
      // Get model and provider configuration
      const modelId = agent?.primaryModel || 'gpt-3.5-turbo';

      // Determine provider from model ID
      let provider: ModelProvider = 'openai';
      if (modelId.startsWith('claude')) provider = 'anthropic';
      else if (modelId.includes('nvidia') || modelId.includes('deepseek') || modelId.includes('qwen')) provider = 'nvidia';
      else if (modelId.startsWith('llama') || modelId.startsWith('mistral')) provider = 'ollama';

      // Get API key from settings
      const providerConfig = settings.models.providers.find(p => p.provider === provider && p.enabled);

      if (!providerConfig?.apiKey) {
        // Fallback to simulated response if no API key configured
        currentText = `⚠️ No API key configured for ${provider}. Please configure your API keys in Settings to use real AI models.\n\nFor now, here's a simulated response: I'm ready to help you build AI agents! Configure your API keys to unlock the full power of ${modelId}.`;
        updateMessage(conversationId, messageId, {
          content: currentText,
          metadata: {
            model: modelId,
            tokens: 0,
            latency: Date.now() - startTime
          }
        });
        return;
      }

      // Create AI client
      const client = createAIClient(provider, providerConfig.apiKey, providerConfig.baseURL);

      // Get conversation history for context
      const conversationMessages = getMessages(conversationId);
      const systemPrompt = agent?.systemPrompt || 'You are a helpful AI assistant.';

      // Build messages array
      const messages = [
        { role: 'system' as const, content: systemPrompt },
        ...conversationMessages
          .filter(m => m.role !== 'system')
          .slice(-10) // Last 10 messages for context
          .map(m => ({
            role: m.role as 'user' | 'assistant',
            content: m.content
          }))
      ];

      // Stream the response
      const stream = client.streamChatCompletion({
        model: modelId,
        messages,
        temperature: 0.7,
        max_tokens: 2048
      });

      for await (const chunk of stream) {
        currentText += chunk;
        tokenCount++;

        updateMessage(conversationId, messageId, {
          content: currentText,
          metadata: {
            model: modelId,
            tokens: tokenCount,
            latency: Date.now() - startTime
          }
        });
      }

    } catch (error) {
      console.error('Streaming error:', error);

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      currentText = `❌ Error: ${errorMessage}\n\nPlease check your API key configuration and try again.`;

      updateMessage(conversationId, messageId, {
        content: currentText,
        metadata: {
          model: agent?.primaryModel || 'unknown',
          tokens: 0,
          latency: Date.now() - startTime,
          error: errorMessage
        }
      });

      toast.error('Failed to stream response');
    }
  };

  const handleRegenerate = async (messageId: string) => {
    toast.info('Regenerating response...');
    // TODO: Implement regeneration
  };

  const handleClearChat = () => {
    if (!currentConversationId) return;

    if (confirm('Are you sure you want to clear this conversation?')) {
      clearMessages(currentConversationId);
      toast.success('Chat cleared');
    }
  };

  const handleExportChat = () => {
    if (!currentConversationId) return;

    const conversation = conversations[currentConversationId];
    if (!conversation) return;

    const exportData = {
      title: conversation.title,
      messages: conversation.messages,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Chat exported');
  };

  return (
    <Card className={`flex flex-col h-full ${className}`}>
      <CardHeader className="border-b border-nvidia-gray-medium pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-nvidia-green" />
              Chat Interface
            </CardTitle>
            <CardDescription>
              {agent ? `Using ${agent.name}` : 'No agent selected'}
            </CardDescription>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportChat}
              disabled={messages.length === 0}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearChat}
              disabled={messages.length === 0}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 flex flex-col">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div className="space-y-3">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">No messages yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start a conversation with your AI agent
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onRegenerate={handleRegenerate}
                />
              ))}

              {isStreaming && (
                <div className="flex gap-3 items-center text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <ChatInput
          onSend={handleSendMessage}
          disabled={isStreaming}
          placeholder={
            agent
              ? `Message ${agent.name}...`
              : 'Create an agent first to start chatting...'
          }
        />
      </CardContent>
    </Card>
  );
}
