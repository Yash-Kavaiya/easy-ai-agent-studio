/**
 * Workflow Validation
 * Validates workflow before execution
 */

import { WorkflowNode, WorkflowEdge, NodeType } from '@/types/workflow.types';

export interface ValidationError {
  type: 'error' | 'warning';
  nodeId?: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

export class WorkflowValidator {
  private nodes: WorkflowNode[];
  private edges: WorkflowEdge[];

  constructor(nodes: WorkflowNode[], edges: WorkflowEdge[]) {
    this.nodes = nodes;
    this.edges = edges;
  }

  /**
   * Validate the entire workflow
   */
  validate(): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    // Check for start node
    const startNodeErrors = this.validateStartNode();
    errors.push(...startNodeErrors);

    // Check for disconnected nodes
    const disconnectedErrors = this.validateConnectedNodes();
    errors.push(...disconnectedErrors);

    // Check for circular dependencies
    const circularErrors = this.validateNoCycles();
    errors.push(...circularErrors);

    // Check for missing required configurations
    const configErrors = this.validateNodeConfigurations();
    errors.push(...configErrors);

    // Check for unreachable nodes
    const unreachableWarnings = this.findUnreachableNodes();
    warnings.push(...unreachableWarnings);

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate that there is exactly one start node
   */
  private validateStartNode(): ValidationError[] {
    const startNodes = this.nodes.filter(n => n.type === NodeType.START);

    if (startNodes.length === 0) {
      return [{
        type: 'error',
        message: 'Workflow must have a START node'
      }];
    }

    if (startNodes.length > 1) {
      return [{
        type: 'error',
        message: 'Workflow can only have one START node',
        nodeId: startNodes[1].id
      }];
    }

    return [];
  }

  /**
   * Validate that all nodes (except START) have incoming connections
   * and all nodes (except END) have outgoing connections
   */
  private validateConnectedNodes(): ValidationError[] {
    const errors: ValidationError[] = [];

    for (const node of this.nodes) {
      const incomingEdges = this.edges.filter(e => e.target === node.id);
      const outgoingEdges = this.edges.filter(e => e.source === node.id);

      // START node should not have incoming edges
      if (node.type === NodeType.START && incomingEdges.length > 0) {
        errors.push({
          type: 'error',
          nodeId: node.id,
          message: `START node should not have incoming connections`
        });
      }

      // Non-START nodes (except isolated ones) should have incoming edges
      if (node.type !== NodeType.START && incomingEdges.length === 0) {
        errors.push({
          type: 'error',
          nodeId: node.id,
          message: `Node "${node.data.label}" has no incoming connections`
        });
      }

      // END node should not have outgoing edges
      if (node.type === NodeType.END && outgoingEdges.length > 0) {
        errors.push({
          type: 'error',
          nodeId: node.id,
          message: `END node should not have outgoing connections`
        });
      }

      // Non-END nodes should have outgoing edges
      if (node.type !== NodeType.END && outgoingEdges.length === 0) {
        errors.push({
          type: 'error',
          nodeId: node.id,
          message: `Node "${node.data.label}" has no outgoing connections`
        });
      }
    }

    return errors;
  }

  /**
   * Detect circular dependencies using DFS
   */
  private validateNoCycles(): ValidationError[] {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const errors: ValidationError[] = [];

    const hasCycle = (nodeId: string, path: string[]): boolean => {
      visited.add(nodeId);
      recursionStack.add(nodeId);

      const outgoingEdges = this.edges.filter(e => e.source === nodeId);

      for (const edge of outgoingEdges) {
        if (!visited.has(edge.target)) {
          if (hasCycle(edge.target, [...path, edge.target])) {
            return true;
          }
        } else if (recursionStack.has(edge.target)) {
          // Found a cycle
          const cycleStart = path.indexOf(edge.target);
          const cyclePath = path.slice(cycleStart).map(id => {
            const node = this.nodes.find(n => n.id === id);
            return node?.data.label || id;
          }).join(' → ');

          errors.push({
            type: 'error',
            nodeId,
            message: `Circular dependency detected: ${cyclePath} → ${this.nodes.find(n => n.id === edge.target)?.data.label}`
          });
          return true;
        }
      }

      recursionStack.delete(nodeId);
      return false;
    };

    // Start DFS from all nodes
    for (const node of this.nodes) {
      if (!visited.has(node.id)) {
        hasCycle(node.id, [node.id]);
      }
    }

    return errors;
  }

  /**
   * Validate that nodes have required configuration
   */
  private validateNodeConfigurations(): ValidationError[] {
    const errors: ValidationError[] = [];

    for (const node of this.nodes) {
      switch (node.type) {
        case NodeType.AI_AGENT:
          if (!node.data.model) {
            errors.push({
              type: 'error',
              nodeId: node.id,
              message: `AI Agent "${node.data.label}" must have a model selected`
            });
          }
          if (node.data.temperature !== undefined && (node.data.temperature < 0 || node.data.temperature > 2)) {
            errors.push({
              type: 'error',
              nodeId: node.id,
              message: `AI Agent "${node.data.label}" temperature must be between 0 and 2`
            });
          }
          if (node.data.maxTokens !== undefined && node.data.maxTokens < 1) {
            errors.push({
              type: 'error',
              nodeId: node.id,
              message: `AI Agent "${node.data.label}" max tokens must be at least 1`
            });
          }
          break;

        case NodeType.TOOL:
          if (!node.data.toolId) {
            errors.push({
              type: 'error',
              nodeId: node.id,
              message: `Tool node "${node.data.label}" must have a tool selected`
            });
          }
          break;

        case NodeType.CONDITION:
          if (!node.data.expression || !node.data.operator) {
            errors.push({
              type: 'error',
              nodeId: node.id,
              message: `Condition node "${node.data.label}" must have an expression and operator`
            });
          }
          break;

        case NodeType.LOOP:
          if (!node.data.iterableField) {
            errors.push({
              type: 'error',
              nodeId: node.id,
              message: `Loop node "${node.data.label}" must have an iterable field`
            });
          }
          if (node.data.maxIterations !== undefined && node.data.maxIterations < 1) {
            errors.push({
              type: 'error',
              nodeId: node.id,
              message: `Loop node "${node.data.label}" max iterations must be at least 1`
            });
          }
          break;

        case NodeType.TRANSFORM:
          if (!node.data.code && !node.data.transformScript) {
            errors.push({
              type: 'error',
              nodeId: node.id,
              message: `Transform node "${node.data.label}" must have transformation code`
            });
          }
          break;

        case NodeType.KNOWLEDGE:
          if (!node.data.knowledgeBaseId) {
            errors.push({
              type: 'error',
              nodeId: node.id,
              message: `Knowledge node "${node.data.label}" must have a knowledge base selected`
            });
          }
          break;

        case NodeType.HUMAN_INPUT:
          if (!node.data.prompt) {
            errors.push({
              type: 'error',
              nodeId: node.id,
              message: `Human Input node "${node.data.label}" must have a prompt`
            });
          }
          break;
      }
    }

    return errors;
  }

  /**
   * Find nodes that are unreachable from the start node
   */
  private findUnreachableNodes(): ValidationError[] {
    const startNode = this.nodes.find(n => n.type === NodeType.START);
    if (!startNode) return [];

    const reachable = new Set<string>();
    const queue = [startNode.id];

    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      reachable.add(nodeId);

      const outgoingEdges = this.edges.filter(e => e.source === nodeId);
      for (const edge of outgoingEdges) {
        if (!reachable.has(edge.target)) {
          queue.push(edge.target);
        }
      }
    }

    const warnings: ValidationError[] = [];
    for (const node of this.nodes) {
      if (!reachable.has(node.id)) {
        warnings.push({
          type: 'warning',
          nodeId: node.id,
          message: `Node "${node.data.label}" is unreachable from START node`
        });
      }
    }

    return warnings;
  }
}
