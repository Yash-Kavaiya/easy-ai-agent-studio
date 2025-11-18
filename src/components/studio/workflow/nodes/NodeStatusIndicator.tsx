/**
 * Node Status Indicator Component
 * Shows visual indicators for node execution status
 */

import { Loader2, CheckCircle2, XCircle, Circle } from 'lucide-react';
import { NodeExecutionStatus } from '@/types/workflow.types';

interface NodeStatusIndicatorProps {
  status?: NodeExecutionStatus;
}

export const NodeStatusIndicator = ({ status }: NodeStatusIndicatorProps) => {
  switch (status) {
    case NodeExecutionStatus.RUNNING:
      return <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />;
    case NodeExecutionStatus.COMPLETED:
      return <CheckCircle2 className="h-4 w-4 text-green-400" />;
    case NodeExecutionStatus.ERROR:
      return <XCircle className="h-4 w-4 text-red-400" />;
    case NodeExecutionStatus.SKIPPED:
      return <Circle className="h-4 w-4 text-gray-400" />;
    default:
      return null;
  }
};

export const getNodeStatusBorderClass = (status?: NodeExecutionStatus, selected?: boolean): string => {
  switch (status) {
    case NodeExecutionStatus.RUNNING:
      return 'ring-2 ring-blue-400 ring-offset-2 ring-offset-nvidia-gray-dark';
    case NodeExecutionStatus.COMPLETED:
      return 'ring-2 ring-green-400';
    case NodeExecutionStatus.ERROR:
      return 'ring-2 ring-red-400';
    default:
      return selected ? 'ring-2 ring-nvidia-green' : '';
  }
};
