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

    // Simulate streaming response
    await simulateStreamingResponse(currentConversationId, assistantMessageId, text);

    setStreaming(false);
  };

  const simulateStreamingResponse = async (
    conversationId: string,
    messageId: string,
    userMessage: string
  ) => {
    // This is a placeholder - replace with actual API streaming
    const responses = [
      "I'm here to help you build AI agents!",
      "You can create workflows, manage knowledge bases, and configure models.",
      "What would you like to know more about?",
      `You asked: "${userMessage}". This is a simulated response. In production, this would connect to your configured AI model (${agent?.primaryModel || 'default model'}).`,
      "The system supports multiple AI providers including OpenAI, Anthropic, and local models via Ollama.",
      "You can configure these in the Settings panel."
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];
    const words = response.split(' ');
    let currentText = '';

    const startTime = Date.now();

    for (const word of words) {
      currentText += (currentText ? ' ' : '') + word;
      updateMessage(conversationId, messageId, {
        content: currentText,
        metadata: {
          model: agent?.primaryModel || 'gpt-3.5-turbo',
          tokens: currentText.split(' ').length,
          latency: Date.now() - startTime
        }
      });
      await new Promise((resolve) => setTimeout(resolve, 50));
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
