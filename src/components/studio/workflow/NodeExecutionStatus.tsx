/**
 * Node Execution Status Indicator
 * Visual indicator showing the current execution status of a workflow node
 */

import { NodeExecutionStatus } from '@/types/workflow.types';
import { cn } from '@/lib/utils';
import {
  Circle,
  Loader2,
  CheckCircle2,
  XCircle,
  Pause,
  ArrowRight,
  MinusCircle
} from 'lucide-react';

interface NodeExecutionStatusIndicatorProps {
  status?: NodeExecutionStatus;
  className?: string;
}

export function NodeExecutionStatusIndicator({
  status,
  className
}: NodeExecutionStatusIndicatorProps) {
  if (!status || status === NodeExecutionStatus.IDLE) {
    return null;
  }

  const getStatusConfig = () => {
    switch (status) {
      case NodeExecutionStatus.PENDING:
        return {
          icon: Circle,
          color: 'text-gray-400',
          bgColor: 'bg-gray-100',
          label: 'Pending',
          animated: false
        };
      case NodeExecutionStatus.RUNNING:
        return {
          icon: Loader2,
          color: 'text-blue-500',
          bgColor: 'bg-blue-100',
          label: 'Running',
          animated: true
        };
      case NodeExecutionStatus.COMPLETED:
        return {
          icon: CheckCircle2,
          color: 'text-green-500',
          bgColor: 'bg-green-100',
          label: 'Completed',
          animated: false
        };
      case NodeExecutionStatus.ERROR:
        return {
          icon: XCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-100',
          label: 'Error',
          animated: false
        };
      case NodeExecutionStatus.PAUSED:
        return {
          icon: Pause,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-100',
          label: 'Paused',
          animated: false
        };
      case NodeExecutionStatus.SKIPPED:
        return {
          icon: MinusCircle,
          color: 'text-gray-400',
          bgColor: 'bg-gray-100',
          label: 'Skipped',
          animated: false
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig();
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div
      className={cn(
        'absolute -top-2 -right-2 flex items-center justify-center',
        'rounded-full p-1 shadow-md border-2 border-white',
        config.bgColor,
        className
      )}
      title={config.label}
    >
      <Icon
        className={cn(
          'h-4 w-4',
          config.color,
          config.animated && 'animate-spin'
        )}
      />
    </div>
  );
}

/**
 * Node Border Indicator
 * Shows execution status via node border styling
 */
interface NodeBorderIndicatorProps {
  status?: NodeExecutionStatus;
}

export function getNodeBorderClass(status?: NodeExecutionStatus): string {
  if (!status || status === NodeExecutionStatus.IDLE) {
    return 'border-border';
  }

  switch (status) {
    case NodeExecutionStatus.PENDING:
      return 'border-muted-foreground/50 border-dashed';
    case NodeExecutionStatus.RUNNING:
      return 'border-[hsl(var(--node-ai))] border-2';
    case NodeExecutionStatus.COMPLETED:
      return 'border-[hsl(var(--node-start))] border-2';
    case NodeExecutionStatus.ERROR:
      return 'border-destructive border-2';
    case NodeExecutionStatus.PAUSED:
      return 'border-[hsl(var(--node-condition))] border-2';
    case NodeExecutionStatus.SKIPPED:
      return 'border-muted-foreground/30 border-dashed opacity-60';
    default:
      return 'border-border';
  }
}

/**
 * Node Glow Effect with CSS animation classes
 */
export function getNodeGlowClass(status?: NodeExecutionStatus): string {
  switch (status) {
    case NodeExecutionStatus.RUNNING:
      return 'workflow-node-running';
    case NodeExecutionStatus.COMPLETED:
      return 'workflow-node-completed';
    case NodeExecutionStatus.ERROR:
      return 'workflow-node-error';
    default:
      return '';
  }
}
