/**
 * Chat Message Component
 * Displays individual messages with markdown support
 */

import { Message } from '@/types/chat.types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCw, User, Bot } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface ChatMessageProps {
  message: Message;
  onRegenerate?: (messageId: string) => void;
}

export function ChatMessage({ message, onRegenerate }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success('Copied to clipboard');
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <Avatar className="h-8 w-8 mt-1">
          <AvatarFallback className="bg-nvidia-green text-black">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
        <Card
          className={`px-4 py-3 ${
            isUser
              ? 'bg-nvidia-green text-black'
              : isSystem
              ? 'bg-amber-900/20 border-amber-700'
              : 'bg-nvidia-gray-dark border-nvidia-gray-medium'
          }`}
        >
          {isSystem && (
            <div className="text-amber-500 text-xs font-semibold mb-2">SYSTEM</div>
          )}

          <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert' : 'prose-invert'}`}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {message.content}
            </ReactMarkdown>
          </div>

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center gap-2 p-2 bg-black/20 rounded text-xs"
                >
                  <span>{attachment.name}</span>
                  <span className="text-muted-foreground">
                    ({(attachment.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Metadata */}
          {message.metadata && (
            <div className="mt-3 pt-3 border-t border-current/10 text-xs opacity-70 space-y-1">
              {message.metadata.model && <div>Model: {message.metadata.model}</div>}
              {message.metadata.tokens && <div>Tokens: {message.metadata.tokens}</div>}
              {message.metadata.latency && (
                <div>Latency: {message.metadata.latency}ms</div>
              )}
            </div>
          )}
        </Card>

        {/* Actions */}
        <div className="flex gap-1 mt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 text-xs"
          >
            <Copy className="h-3 w-3" />
          </Button>

          {!isUser && onRegenerate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRegenerate(message.id)}
              className="h-7 px-2 text-xs"
            >
              <RotateCw className="h-3 w-3" />
            </Button>
          )}

          <span className="text-xs text-muted-foreground flex items-center px-2">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 mt-1">
          <AvatarFallback className="bg-nvidia-gray-medium">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
