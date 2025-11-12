/**
 * Built-in Tools Library
 * Pre-configured tools for common operations
 */

import { ToolConfig, ToolCategory, ParameterType, HttpResponse, WebSearchResult } from '@/types/tool.types';

/**
 * Web Search Tool
 */
export const webSearchTool: ToolConfig = {
  id: 'web_search',
  name: 'Web Search',
  description: 'Search the web using DuckDuckGo API',
  category: ToolCategory.WEB,
  icon: 'Search',
  version: '1.0.0',
  author: 'System',
  parameters: [
    {
      name: 'query',
      type: ParameterType.STRING,
      description: 'Search query',
      required: true,
      validation: { minLength: 1, maxLength: 500 }
    },
    {
      name: 'maxResults',
      type: ParameterType.NUMBER,
      description: 'Maximum number of results',
      required: false,
      default: 5,
      validation: { min: 1, max: 20 }
    }
  ],
  returnType: ParameterType.ARRAY,
  isAsync: true,
  tags: ['search', 'web', 'internet'],
  examples: [
    {
      description: 'Search for AI news',
      input: { query: 'latest AI news', maxResults: 5 },
      output: [
        { title: 'AI News Today', url: 'https://example.com', snippet: 'Latest AI developments...' }
      ]
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};

/**
 * HTTP Request Tool
 */
export const httpRequestTool: ToolConfig = {
  id: 'http_request',
  name: 'HTTP Request',
  description: 'Make HTTP requests to APIs',
  category: ToolCategory.HTTP,
  icon: 'Globe',
  version: '1.0.0',
  author: 'System',
  parameters: [
    {
      name: 'url',
      type: ParameterType.STRING,
      description: 'Request URL',
      required: true,
      validation: { pattern: '^https?://.+' }
    },
    {
      name: 'method',
      type: ParameterType.STRING,
      description: 'HTTP method',
      required: false,
      default: 'GET',
      options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
    },
    {
      name: 'headers',
      type: ParameterType.OBJECT,
      description: 'Request headers',
      required: false,
      default: {}
    },
    {
      name: 'body',
      type: ParameterType.OBJECT,
      description: 'Request body (for POST/PUT)',
      required: false
    },
    {
      name: 'timeout',
      type: ParameterType.NUMBER,
      description: 'Request timeout in milliseconds',
      required: false,
      default: 30000,
      validation: { min: 1000, max: 120000 }
    }
  ],
  returnType: ParameterType.OBJECT,
  isAsync: true,
  tags: ['http', 'api', 'request', 'fetch'],
  examples: [
    {
      description: 'GET request',
      input: { url: 'https://api.example.com/data', method: 'GET' },
      output: { status: 200, data: { message: 'Success' } }
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};

/**
 * Calculator Tool
 */
export const calculatorTool: ToolConfig = {
  id: 'calculator',
  name: 'Calculator',
  description: 'Perform mathematical calculations',
  category: ToolCategory.MATH,
  icon: 'Calculator',
  version: '1.0.0',
  author: 'System',
  parameters: [
    {
      name: 'expression',
      type: ParameterType.STRING,
      description: 'Mathematical expression to evaluate',
      required: true,
      validation: { minLength: 1, maxLength: 1000 }
    }
  ],
  returnType: ParameterType.NUMBER,
  isAsync: false,
  tags: ['math', 'calculator', 'arithmetic'],
  examples: [
    {
      description: 'Simple calculation',
      input: { expression: '2 + 2 * 3' },
      output: 8
    },
    {
      description: 'Complex calculation',
      input: { expression: 'Math.sqrt(16) + Math.pow(2, 3)' },
      output: 12
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};

/**
 * Text Transform Tool
 */
export const textTransformTool: ToolConfig = {
  id: 'text_transform',
  name: 'Text Transform',
  description: 'Transform text with various operations',
  category: ToolCategory.TEXT,
  icon: 'Type',
  version: '1.0.0',
  author: 'System',
  parameters: [
    {
      name: 'text',
      type: ParameterType.STRING,
      description: 'Input text',
      required: true
    },
    {
      name: 'operation',
      type: ParameterType.STRING,
      description: 'Transform operation',
      required: true,
      options: ['uppercase', 'lowercase', 'titlecase', 'reverse', 'trim', 'length', 'words']
    }
  ],
  returnType: ParameterType.STRING,
  isAsync: false,
  tags: ['text', 'string', 'transform'],
  examples: [
    {
      description: 'Convert to uppercase',
      input: { text: 'hello world', operation: 'uppercase' },
      output: 'HELLO WORLD'
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};

/**
 * JSON Parser Tool
 */
export const jsonParserTool: ToolConfig = {
  id: 'json_parser',
  name: 'JSON Parser',
  description: 'Parse and manipulate JSON data',
  category: ToolCategory.JSON,
  icon: 'Braces',
  version: '1.0.0',
  author: 'System',
  parameters: [
    {
      name: 'input',
      type: ParameterType.STRING,
      description: 'JSON string or operation',
      required: true
    },
    {
      name: 'operation',
      type: ParameterType.STRING,
      description: 'Operation to perform',
      required: true,
      options: ['parse', 'stringify', 'validate', 'extract', 'format']
    },
    {
      name: 'path',
      type: ParameterType.STRING,
      description: 'JSON path for extract operation (e.g., "user.name")',
      required: false
    }
  ],
  returnType: ParameterType.OBJECT,
  isAsync: false,
  tags: ['json', 'parse', 'data'],
  examples: [
    {
      description: 'Parse JSON string',
      input: { input: '{"name": "John"}', operation: 'parse' },
      output: { name: 'John' }
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};

/**
 * Date/Time Tool
 */
export const dateTimeTool: ToolConfig = {
  id: 'date_time',
  name: 'Date/Time',
  description: 'Work with dates and times',
  category: ToolCategory.DATE,
  icon: 'Calendar',
  version: '1.0.0',
  author: 'System',
  parameters: [
    {
      name: 'operation',
      type: ParameterType.STRING,
      description: 'Date operation',
      required: true,
      options: ['now', 'format', 'parse', 'add', 'subtract', 'diff']
    },
    {
      name: 'date',
      type: ParameterType.STRING,
      description: 'Date string (ISO format)',
      required: false
    },
    {
      name: 'format',
      type: ParameterType.STRING,
      description: 'Output format',
      required: false,
      default: 'ISO'
    },
    {
      name: 'amount',
      type: ParameterType.NUMBER,
      description: 'Amount to add/subtract',
      required: false
    },
    {
      name: 'unit',
      type: ParameterType.STRING,
      description: 'Time unit',
      required: false,
      options: ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years']
    }
  ],
  returnType: ParameterType.STRING,
  isAsync: false,
  tags: ['date', 'time', 'datetime', 'timestamp'],
  examples: [
    {
      description: 'Get current time',
      input: { operation: 'now' },
      output: '2024-01-01T12:00:00Z'
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};

/**
 * Text Extraction Tool
 */
export const textExtractionTool: ToolConfig = {
  id: 'text_extraction',
  name: 'Text Extraction',
  description: 'Extract text using regex patterns',
  category: ToolCategory.TEXT,
  icon: 'Filter',
  version: '1.0.0',
  author: 'System',
  parameters: [
    {
      name: 'text',
      type: ParameterType.STRING,
      description: 'Input text',
      required: true
    },
    {
      name: 'pattern',
      type: ParameterType.STRING,
      description: 'Regex pattern',
      required: true
    },
    {
      name: 'flags',
      type: ParameterType.STRING,
      description: 'Regex flags (g, i, m)',
      required: false,
      default: 'g'
    }
  ],
  returnType: ParameterType.ARRAY,
  isAsync: false,
  tags: ['text', 'regex', 'extract', 'pattern'],
  examples: [
    {
      description: 'Extract email addresses',
      input: { text: 'Contact: user@example.com', pattern: '[\\w.-]+@[\\w.-]+\\.\\w+' },
      output: ['user@example.com']
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};

/**
 * Array Operations Tool
 */
export const arrayOperationsTool: ToolConfig = {
  id: 'array_operations',
  name: 'Array Operations',
  description: 'Perform operations on arrays',
  category: ToolCategory.JSON,
  icon: 'List',
  version: '1.0.0',
  author: 'System',
  parameters: [
    {
      name: 'array',
      type: ParameterType.ARRAY,
      description: 'Input array',
      required: true
    },
    {
      name: 'operation',
      type: ParameterType.STRING,
      description: 'Operation to perform',
      required: true,
      options: ['length', 'unique', 'sort', 'reverse', 'sum', 'average', 'min', 'max', 'join', 'filter']
    },
    {
      name: 'parameter',
      type: ParameterType.STRING,
      description: 'Optional parameter for operation (e.g., join separator)',
      required: false
    }
  ],
  returnType: ParameterType.OBJECT,
  isAsync: false,
  tags: ['array', 'list', 'collection'],
  examples: [
    {
      description: 'Get unique values',
      input: { array: [1, 2, 2, 3, 3, 3], operation: 'unique' },
      output: [1, 2, 3]
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};

/**
 * Export all built-in tools
 */
export const BUILT_IN_TOOLS: ToolConfig[] = [
  webSearchTool,
  httpRequestTool,
  calculatorTool,
  textTransformTool,
  jsonParserTool,
  dateTimeTool,
  textExtractionTool,
  arrayOperationsTool
];

/**
 * Get tool by ID
 */
export function getBuiltInTool(id: string): ToolConfig | undefined {
  return BUILT_IN_TOOLS.find(tool => tool.id === id);
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: ToolCategory): ToolConfig[] {
  return BUILT_IN_TOOLS.filter(tool => tool.category === category);
}
