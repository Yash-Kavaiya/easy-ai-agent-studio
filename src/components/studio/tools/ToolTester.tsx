/**
 * Tool Tester Component
 * Test tools with custom inputs
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ToolConfig, ParameterType } from '@/types/tool.types';
import { ToolExecutor } from '@/lib/tools/tool-executor';
import { Play, X, CheckCircle2, XCircle, Loader2, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface ToolTesterProps {
  tool: ToolConfig;
  onClose: () => void;
}

export function ToolTester({ tool, onClose }: ToolTesterProps) {
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number>(0);

  // Initialize parameters with defaults
  useState(() => {
    const defaults: Record<string, any> = {};
    tool.parameters.forEach(param => {
      if (param.default !== undefined) {
        defaults[param.name] = param.default;
      }
    });
    setParameters(defaults);
  });

  const handleParameterChange = (name: string, value: any, type: ParameterType) => {
    let processedValue = value;

    // Type conversion
    switch (type) {
      case ParameterType.NUMBER:
        processedValue = value === '' ? undefined : Number(value);
        break;
      case ParameterType.BOOLEAN:
        processedValue = value === 'true';
        break;
      case ParameterType.ARRAY:
      case ParameterType.OBJECT:
        try {
          processedValue = JSON.parse(value);
        } catch {
          // Keep as string if invalid JSON
        }
        break;
    }

    setParameters(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleExecute = async () => {
    setIsRunning(true);
    setError(null);
    setResult(null);

    const startTime = Date.now();

    try {
      const output = await ToolExecutor.execute(tool, parameters);
      setResult(output);
      setExecutionTime(Date.now() - startTime);
      toast.success('Tool executed successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      toast.error(`Execution failed: ${errorMessage}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      toast.success('Result copied to clipboard');
    }
  };

  const getInputType = (type: ParameterType): string => {
    switch (type) {
      case ParameterType.NUMBER:
        return 'number';
      case ParameterType.BOOLEAN:
        return 'text';
      default:
        return 'text';
    }
  };

  return (
    <Card className="w-96">
      <CardHeader className="border-b border-nvidia-gray-medium">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Test Tool</CardTitle>
            <CardDescription>{tool.name}</CardDescription>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-4">
            {/* Parameters */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Parameters</h4>
              {tool.parameters.map((param) => (
                <div key={param.name} className="space-y-2">
                  <Label htmlFor={param.name} className="text-sm">
                    {param.name}
                    {param.required && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        Required
                      </Badge>
                    )}
                  </Label>

                  {param.options ? (
                    <select
                      id={param.name}
                      value={parameters[param.name] || ''}
                      onChange={(e) => handleParameterChange(param.name, e.target.value, param.type)}
                      className="w-full px-3 py-2 bg-nvidia-gray-dark border border-nvidia-gray-medium rounded text-sm"
                    >
                      <option value="">Select...</option>
                      {param.options.map((opt: any) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : param.type === ParameterType.BOOLEAN ? (
                    <select
                      id={param.name}
                      value={parameters[param.name]?.toString() || 'false'}
                      onChange={(e) => handleParameterChange(param.name, e.target.value, param.type)}
                      className="w-full px-3 py-2 bg-nvidia-gray-dark border border-nvidia-gray-medium rounded text-sm"
                    >
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  ) : param.type === ParameterType.ARRAY || param.type === ParameterType.OBJECT ? (
                    <textarea
                      id={param.name}
                      value={
                        typeof parameters[param.name] === 'object'
                          ? JSON.stringify(parameters[param.name], null, 2)
                          : parameters[param.name] || ''
                      }
                      onChange={(e) => handleParameterChange(param.name, e.target.value, param.type)}
                      placeholder={param.type === ParameterType.ARRAY ? '["item1", "item2"]' : '{"key": "value"}'}
                      rows={3}
                      className="w-full px-3 py-2 bg-nvidia-gray-dark border border-nvidia-gray-medium rounded text-sm font-mono"
                    />
                  ) : (
                    <Input
                      id={param.name}
                      type={getInputType(param.type)}
                      value={parameters[param.name] ?? ''}
                      onChange={(e) => handleParameterChange(param.name, e.target.value, param.type)}
                      placeholder={param.description}
                      className="text-sm"
                    />
                  )}

                  <p className="text-xs text-muted-foreground">{param.description}</p>
                </div>
              ))}
            </div>

            {/* Execute Button */}
            <Button
              onClick={handleExecute}
              disabled={isRunning}
              className="w-full bg-nvidia-green hover:bg-nvidia-green-light text-black"
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Execute Tool
                </>
              )}
            </Button>

            {/* Result */}
            {(result !== null || error) && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    {error ? (
                      <>
                        <XCircle className="h-4 w-4 text-red-500" />
                        Error
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Result
                      </>
                    )}
                  </h4>
                  {result !== null && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleCopyResult}
                      className="h-8 w-8 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                <div className={`p-3 rounded border ${
                  error
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-nvidia-gray-dark border-nvidia-gray-medium'
                }`}>
                  {error ? (
                    <p className="text-sm text-red-400">{error}</p>
                  ) : (
                    <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                      <code>{JSON.stringify(result, null, 2)}</code>
                    </pre>
                  )}
                </div>

                {!error && executionTime > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Executed in {executionTime}ms
                  </p>
                )}
              </div>
            )}

            {/* Examples */}
            {tool.examples && tool.examples.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Examples</h4>
                <div className="space-y-2">
                  {tool.examples.map((example, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => setParameters(example.input)}
                      className="w-full justify-start text-left"
                    >
                      <span className="text-xs truncate">{example.description}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
