/**
 * Tool Execution Framework
 * Validates parameters and executes tools
 */

import { ToolConfig, ToolParameter, ParameterType, ToolExecution, HttpResponse, WebSearchResult } from '@/types/tool.types';

export class ToolExecutor {
  /**
   * Execute a tool with given parameters
   */
  static async execute(tool: ToolConfig, parameters: Record<string, any>): Promise<any> {
    // Validate parameters
    this.validateParameters(tool.parameters, parameters);

    // Create execution record
    const execution: ToolExecution = {
      toolId: tool.id,
      parameters,
      startTime: Date.now(),
      status: 'running'
    };

    try {
      let result: any;

      // Execute based on tool ID
      switch (tool.id) {
        case 'web_search':
          result = await this.executeWebSearch(parameters);
          break;

        case 'http_request':
          result = await this.executeHttpRequest(parameters);
          break;

        case 'calculator':
          result = this.executeCalculator(parameters);
          break;

        case 'text_transform':
          result = this.executeTextTransform(parameters);
          break;

        case 'json_parser':
          result = this.executeJsonParser(parameters);
          break;

        case 'date_time':
          result = this.executeDateTime(parameters);
          break;

        case 'text_extraction':
          result = this.executeTextExtraction(parameters);
          break;

        case 'array_operations':
          result = this.executeArrayOperations(parameters);
          break;

        default:
          throw new Error(`Tool execution not implemented: ${tool.id}`);
      }

      execution.result = result;
      execution.status = 'success';
      execution.endTime = Date.now();

      return result;
    } catch (error) {
      execution.error = error instanceof Error ? error.message : 'Unknown error';
      execution.status = 'error';
      execution.endTime = Date.now();
      throw error;
    }
  }

  /**
   * Validate parameters against tool definition
   */
  private static validateParameters(
    parameterDefs: ToolParameter[],
    parameters: Record<string, any>
  ): void {
    for (const param of parameterDefs) {
      const value = parameters[param.name];

      // Check required
      if (param.required && (value === undefined || value === null)) {
        throw new Error(`Required parameter missing: ${param.name}`);
      }

      // Skip validation if optional and not provided
      if (!param.required && (value === undefined || value === null)) {
        continue;
      }

      // Type validation
      const actualType = Array.isArray(value) ? 'array' : typeof value;
      const expectedType = param.type.toLowerCase();

      if (actualType !== expectedType && !(expectedType === 'object' && actualType === 'object')) {
        throw new Error(
          `Invalid type for parameter ${param.name}: expected ${expectedType}, got ${actualType}`
        );
      }

      // Validation rules
      if (param.validation) {
        const val = param.validation;

        // String validations
        if (param.type === ParameterType.STRING && typeof value === 'string') {
          if (val.minLength && value.length < val.minLength) {
            throw new Error(`${param.name} must be at least ${val.minLength} characters`);
          }
          if (val.maxLength && value.length > val.maxLength) {
            throw new Error(`${param.name} must be at most ${val.maxLength} characters`);
          }
          if (val.pattern && !new RegExp(val.pattern).test(value)) {
            throw new Error(`${param.name} does not match required pattern`);
          }
        }

        // Number validations
        if (param.type === ParameterType.NUMBER && typeof value === 'number') {
          if (val.min !== undefined && value < val.min) {
            throw new Error(`${param.name} must be at least ${val.min}`);
          }
          if (val.max !== undefined && value > val.max) {
            throw new Error(`${param.name} must be at most ${val.max}`);
          }
        }
      }

      // Options validation
      if (param.options && !param.options.includes(value)) {
        throw new Error(
          `Invalid value for ${param.name}: must be one of ${param.options.join(', ')}`
        );
      }
    }
  }

  /**
   * Execute Web Search
   */
  private static async executeWebSearch(params: Record<string, any>): Promise<WebSearchResult[]> {
    const { query, maxResults = 5 } = params;

    try {
      // Use DuckDuckGo Instant Answer API (no authentication required)
      const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();

      // Extract results
      const results: WebSearchResult[] = [];

      // Add abstract if available
      if (data.Abstract && data.AbstractText) {
        results.push({
          title: data.Heading || 'Result',
          url: data.AbstractURL || '',
          snippet: data.AbstractText,
          source: data.AbstractSource || 'DuckDuckGo'
        });
      }

      // Add related topics
      if (data.RelatedTopics) {
        for (const topic of data.RelatedTopics.slice(0, maxResults - results.length)) {
          if (topic.Text && topic.FirstURL) {
            results.push({
              title: topic.Text.split(' - ')[0] || topic.Text,
              url: topic.FirstURL,
              snippet: topic.Text,
              source: 'DuckDuckGo'
            });
          }
        }
      }

      return results.slice(0, maxResults);
    } catch (error) {
      console.error('Web search error:', error);
      return [{
        title: 'Search Unavailable',
        url: '',
        snippet: `Web search is currently unavailable. Query: "${query}"`,
        source: 'System'
      }];
    }
  }

  /**
   * Execute HTTP Request
   */
  private static async executeHttpRequest(params: Record<string, any>): Promise<HttpResponse> {
    const { url, method = 'GET', headers = {}, body, timeout = 30000 } = params;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        signal: controller.signal
      };

      if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      let data: any;
      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      return {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        data
      };
    } catch (error) {
      throw new Error(`HTTP request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Execute Calculator
   */
  private static executeCalculator(params: Record<string, any>): number {
    const { expression } = params;

    try {
      // Create a safe math context
      const mathContext = {
        Math,
        abs: Math.abs,
        acos: Math.acos,
        asin: Math.asin,
        atan: Math.atan,
        ceil: Math.ceil,
        cos: Math.cos,
        exp: Math.exp,
        floor: Math.floor,
        log: Math.log,
        max: Math.max,
        min: Math.min,
        pow: Math.pow,
        random: Math.random,
        round: Math.round,
        sin: Math.sin,
        sqrt: Math.sqrt,
        tan: Math.tan,
        PI: Math.PI,
        E: Math.E
      };

      // Evaluate expression safely
      const func = new Function(...Object.keys(mathContext), `return ${expression}`);
      const result = func(...Object.values(mathContext));

      if (typeof result !== 'number' || isNaN(result)) {
        throw new Error('Result is not a valid number');
      }

      return result;
    } catch (error) {
      throw new Error(`Calculation error: ${error instanceof Error ? error.message : 'Invalid expression'}`);
    }
  }

  /**
   * Execute Text Transform
   */
  private static executeTextTransform(params: Record<string, any>): string | number {
    const { text, operation } = params;

    switch (operation) {
      case 'uppercase':
        return text.toUpperCase();

      case 'lowercase':
        return text.toLowerCase();

      case 'titlecase':
        return text.replace(/\w\S*/g, (txt: string) =>
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );

      case 'reverse':
        return text.split('').reverse().join('');

      case 'trim':
        return text.trim();

      case 'length':
        return text.length;

      case 'words':
        return text.split(/\s+/).filter((w: string) => w.length > 0).length;

      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }

  /**
   * Execute JSON Parser
   */
  private static executeJsonParser(params: Record<string, any>): any {
    const { input, operation, path } = params;

    switch (operation) {
      case 'parse':
        try {
          return JSON.parse(input);
        } catch (error) {
          throw new Error('Invalid JSON string');
        }

      case 'stringify':
        return JSON.stringify(input, null, 2);

      case 'validate':
        try {
          JSON.parse(input);
          return { valid: true };
        } catch (error) {
          return { valid: false, error: error instanceof Error ? error.message : 'Invalid JSON' };
        }

      case 'extract':
        if (!path) {
          throw new Error('Path required for extract operation');
        }
        try {
          const obj = typeof input === 'string' ? JSON.parse(input) : input;
          const keys = path.split('.');
          let result = obj;
          for (const key of keys) {
            result = result[key];
            if (result === undefined) break;
          }
          return result;
        } catch (error) {
          throw new Error('Failed to extract value from path');
        }

      case 'format':
        try {
          const obj = typeof input === 'string' ? JSON.parse(input) : input;
          return JSON.stringify(obj, null, 2);
        } catch (error) {
          throw new Error('Failed to format JSON');
        }

      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }

  /**
   * Execute Date/Time operations
   */
  private static executeDateTime(params: Record<string, any>): string {
    const { operation, date, format = 'ISO', amount, unit } = params;

    const parseDate = (dateStr?: string): Date => {
      return dateStr ? new Date(dateStr) : new Date();
    };

    switch (operation) {
      case 'now':
        return new Date().toISOString();

      case 'format': {
        const d = parseDate(date);
        if (format === 'ISO') return d.toISOString();
        if (format === 'UTC') return d.toUTCString();
        if (format === 'locale') return d.toLocaleString();
        return d.toString();
      }

      case 'parse':
        return parseDate(date).toISOString();

      case 'add':
      case 'subtract': {
        if (!amount || !unit) {
          throw new Error('Amount and unit required for add/subtract');
        }
        const d = parseDate(date);
        const multiplier = operation === 'subtract' ? -1 : 1;
        const ms = amount * multiplier;

        const unitMap: Record<string, number> = {
          seconds: 1000,
          minutes: 60 * 1000,
          hours: 60 * 60 * 1000,
          days: 24 * 60 * 60 * 1000,
          weeks: 7 * 24 * 60 * 60 * 1000
        };

        if (unitMap[unit]) {
          d.setTime(d.getTime() + ms * unitMap[unit]);
        } else if (unit === 'months') {
          d.setMonth(d.getMonth() + ms);
        } else if (unit === 'years') {
          d.setFullYear(d.getFullYear() + ms);
        }

        return d.toISOString();
      }

      case 'diff': {
        if (!date) {
          throw new Error('Date required for diff');
        }
        const d1 = new Date();
        const d2 = parseDate(date);
        const diff = Math.abs(d1.getTime() - d2.getTime());
        return `${Math.floor(diff / 1000)} seconds`;
      }

      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }

  /**
   * Execute Text Extraction
   */
  private static executeTextExtraction(params: Record<string, any>): string[] {
    const { text, pattern, flags = 'g' } = params;

    try {
      const regex = new RegExp(pattern, flags);
      const matches = text.match(regex);
      return matches || [];
    } catch (error) {
      throw new Error(`Invalid regex pattern: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Execute Array Operations
   */
  private static executeArrayOperations(params: Record<string, any>): any {
    const { array, operation, parameter } = params;

    if (!Array.isArray(array)) {
      throw new Error('Input must be an array');
    }

    switch (operation) {
      case 'length':
        return array.length;

      case 'unique':
        return [...new Set(array)];

      case 'sort':
        return [...array].sort();

      case 'reverse':
        return [...array].reverse();

      case 'sum':
        return array.reduce((sum, val) => sum + Number(val), 0);

      case 'average': {
        const sum = array.reduce((sum, val) => sum + Number(val), 0);
        return sum / array.length;
      }

      case 'min':
        return Math.min(...array.map(Number));

      case 'max':
        return Math.max(...array.map(Number));

      case 'join':
        return array.join(parameter || ',');

      case 'filter': {
        if (!parameter) {
          throw new Error('Filter expression required');
        }
        return array.filter((item) => {
          try {
            const func = new Function('item', `return ${parameter}`);
            return func(item);
          } catch {
            return false;
          }
        });
      }

      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }
}
