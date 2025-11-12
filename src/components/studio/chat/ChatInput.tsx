/**
 * Chat Input Component
 * Input field for sending messages with file upload support
 */

import { useState, useRef, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, X } from 'lucide-react';
import { toast } from 'sonner';

interface ChatInputProps {
  onSend: (message: string, files?: File[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Type your message...'
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim() && files.length === 0) return;

    onSend(input.trim(), files.length > 0 ? files : undefined);
    setInput('');
    setFiles([]);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    // Validate file size (max 10MB per file)
    const validFiles = selectedFiles.filter((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });

    setFiles([...files, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    // Auto-resize
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  };

  return (
    <div className="border-t border-nvidia-gray-medium p-4 bg-nvidia-gray-dark">
      {/* File Attachments */}
      {files.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-nvidia-gray-medium px-3 py-2 rounded-lg text-sm"
            >
              <Paperclip className="h-3 w-3" />
              <span className="max-w-[200px] truncate">{file.name}</span>
              <span className="text-muted-foreground">
                ({(file.size / 1024).toFixed(1)} KB)
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 hover:bg-red-500/20"
                onClick={() => removeFile(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          accept="image/*,.pdf,.txt,.md,.json"
        />

        <Button
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="shrink-0"
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        <Textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[44px] max-h-[200px] resize-none"
          rows={1}
        />

        <Button
          onClick={handleSend}
          disabled={disabled || (!input.trim() && files.length === 0)}
          className="shrink-0 bg-nvidia-green hover:bg-nvidia-green-light text-black"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-2 text-xs text-muted-foreground">
        Press <kbd className="px-1 py-0.5 bg-nvidia-gray-medium rounded">Enter</kbd> to
        send, <kbd className="px-1 py-0.5 bg-nvidia-gray-medium rounded">Shift+Enter</kbd>{' '}
        for new line
      </div>
    </div>
  );
}
