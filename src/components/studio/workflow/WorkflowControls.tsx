/**
 * Workflow Controls Component
 * Run, stop, and manage workflow execution
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Square, Pause, SkipForward, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { WorkflowExecutionEngine, ExecutionStatus, ExecutionState } from '@/lib/workflow/execution-engine';
import { useWorkflowStore } from '@/store/workflowStore';
import { toast } from 'sonner';

interface WorkflowControlsProps {
  className?: string;
}

export function WorkflowControls({ className }: WorkflowControlsProps) {
  const { getNodes, getEdges, activeWorkflowId } = useWorkflowStore();
  const [engine, setEngine] = useState<WorkflowExecutionEngine | null>(null);
  const [executionState, setExecutionState] = useState<ExecutionState | null>(null);
  const [inputValue, setInputValue] = useState('');

  // Create engine when nodes/edges change
  useEffect(() => {
    const nodes = getNodes();
    const edges = getEdges();

    if (nodes.length > 0) {
      const newEngine = new WorkflowExecutionEngine(
        nodes,
        edges,
        (state) => {
          setExecutionState(state);
        },
        activeWorkflowId || undefined
      );
      setEngine(newEngine);
    }
  }, [getNodes, getEdges, activeWorkflowId]);

  const handleRun = async () => {
    if (!engine) {
      toast.error('No workflow to execute');
      return;
    }

    try {
      const input = inputValue || undefined;
      await engine.start(input);
      toast.success('Workflow completed successfully');
    } catch (error) {
      console.error('Workflow execution error:', error);
      toast.error(`Workflow failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleStop = () => {
    if (!engine) return;
    engine.stop();
    toast.info('Workflow stopped');
  };

  const handleResume = async () => {
    if (!engine) return;
    try {
      await engine.resume();
      toast.info('Workflow resumed');
    } catch (error) {
      toast.error('Failed to resume workflow');
    }
  };

  const getStatusColor = (status: ExecutionStatus) => {
    switch (status) {
      case ExecutionStatus.RUNNING:
        return 'bg-nvidia-green text-black';
      case ExecutionStatus.PAUSED:
        return 'bg-amber-500 text-black';
      case ExecutionStatus.COMPLETED:
        return 'bg-green-500 text-black';
      case ExecutionStatus.ERROR:
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: ExecutionStatus) => {
    switch (status) {
      case ExecutionStatus.RUNNING:
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case ExecutionStatus.PAUSED:
        return <Pause className="h-4 w-4" />;
      case ExecutionStatus.COMPLETED:
        return <CheckCircle2 className="h-4 w-4" />;
      case ExecutionStatus.ERROR:
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDuration = (start?: number, end?: number) => {
    if (!start) return '0ms';
    const duration = (end || Date.now()) - start;
    if (duration < 1000) return `${duration}ms`;
    return `${(duration / 1000).toFixed(2)}s`;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3 border-b border-nvidia-gray-medium">
        <CardTitle className="text-base flex items-center justify-between">
          <span>Workflow Execution</span>
          {executionState && (
            <Badge className={getStatusColor(executionState.status)}>
              <span className="flex items-center gap-1">
                {getStatusIcon(executionState.status)}
                {executionState.status}
              </span>
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Initial Input (optional)</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter initial input..."
            className="w-full px-3 py-2 bg-nvidia-gray-dark border border-nvidia-gray-medium rounded text-sm focus:outline-none focus:ring-2 focus:ring-nvidia-green"
            disabled={executionState?.status === ExecutionStatus.RUNNING}
          />
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            onClick={handleRun}
            disabled={!engine || executionState?.status === ExecutionStatus.RUNNING}
            className="flex-1 bg-nvidia-green hover:bg-nvidia-green-light text-black"
          >
            <Play className="h-4 w-4 mr-2" />
            Run
          </Button>

          <Button
            onClick={handleStop}
            disabled={!engine || executionState?.status !== ExecutionStatus.RUNNING}
            variant="outline"
          >
            <Square className="h-4 w-4" />
          </Button>

          {executionState?.status === ExecutionStatus.PAUSED && (
            <Button
              onClick={handleResume}
              variant="outline"
              className="flex-1"
            >
              <SkipForward className="h-4 w-4 mr-2" />
              Resume
            </Button>
          )}
        </div>

        {/* Execution Info */}
        {executionState && (
          <div className="space-y-3 pt-3 border-t border-nvidia-gray-medium">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <span className="ml-2 font-mono">
                  {formatDuration(executionState.startTime, executionState.endTime)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Nodes:</span>
                <span className="ml-2 font-mono">{executionState.history.length}</span>
              </div>
            </div>

            {executionState.currentNodeId && (
              <div className="text-sm">
                <span className="text-muted-foreground">Current Node:</span>
                <span className="ml-2 font-mono text-nvidia-green">
                  {executionState.currentNodeId}
                </span>
              </div>
            )}

            {executionState.error && (
              <div className="p-2 bg-red-500/10 border border-red-500/30 rounded text-xs">
                <span className="text-red-500 font-medium">Error:</span>
                <p className="text-red-400 mt-1">{executionState.error}</p>
              </div>
            )}
          </div>
        )}

        {/* Execution History */}
        {executionState && executionState.history.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Execution History</div>
            <ScrollArea className="h-48 border border-nvidia-gray-medium rounded">
              <div className="p-2 space-y-2">
                {executionState.history.map((entry, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-xs ${
                      entry.error
                        ? 'bg-red-500/10 border border-red-500/30'
                        : 'bg-nvidia-gray-dark border border-nvidia-gray-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-nvidia-green">{entry.nodeType}</span>
                      <span className="text-muted-foreground">{entry.duration}ms</span>
                    </div>
                    {entry.error && (
                      <div className="text-red-400 mt-1">Error: {entry.error}</div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
