# Easy AI Agent Studio - AI Assistant Development Guide

**Last Updated:** 2025-11-14

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Directory Structure](#directory-structure)
4. [State Management](#state-management)
5. [Key Concepts](#key-concepts)
6. [Development Workflows](#development-workflows)
7. [Code Conventions](#code-conventions)
8. [Component Patterns](#component-patterns)
9. [Testing & Building](#testing--building)
10. [AI Integration](#ai-integration)
11. [Common Tasks](#common-tasks)

---

## Project Overview

Easy AI Agent Studio is a visual, no-code platform for building, testing, and deploying AI agents. It provides:

- **Visual Workflow Builder**: Drag-and-drop interface using ReactFlow for creating AI agent workflows
- **Multi-Provider Support**: Integration with OpenAI, Anthropic, and NVIDIA AI models
- **Knowledge Base**: Vector-based knowledge storage with embeddings and semantic search
- **Tool System**: Extensible tool library with built-in and custom tools
- **Project Management**: Save, load, and export complete agent projects
- **Chat Interface**: Test and interact with agents in real-time
- **Execution Engine**: Runtime for executing workflow-based agents

---

## Architecture & Technology Stack

### Core Technologies
- **Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Build Tool**: Vite 5.4.1
- **Bundler**: SWC (Fast Refresh via @vitejs/plugin-react-swc)

### UI & Styling
- **Component Library**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS 3.4.11
- **Icons**: Lucide React
- **Theme**: NVIDIA-inspired dark theme with custom color palette
- **Animations**: tailwindcss-animate

### State Management
- **Global State**: Zustand 5.0.8 with persistence middleware
- **Server State**: TanStack Query 5.56.2
- **Form State**: React Hook Form 7.53.0 with Zod validation

### Key Libraries
- **Workflow Canvas**: ReactFlow 11.11.4
- **Storage**: IndexedDB (via idb 8.0.3)
- **Routing**: React Router DOM 6.26.2
- **Markdown**: react-markdown with rehype-highlight
- **Utilities**: clsx, tailwind-merge, class-variance-authority

---

## Directory Structure

```
easy-ai-agent-studio/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components (button, dialog, etc.)
│   │   └── studio/         # Studio-specific components
│   │       ├── actions/    # Tool and action components
│   │       ├── chat/       # Chat interface components
│   │       ├── knowledge/  # Knowledge base UI
│   │       ├── model/      # Model configuration UI
│   │       ├── project/    # Project management UI
│   │       ├── settings/   # Settings dialog components
│   │       ├── tools/      # Tool library components
│   │       └── workflow/   # Workflow canvas components
│   │           ├── nodes/  # Custom node types
│   │           └── settings/ # Node configuration
│   ├── lib/                # Core utilities and logic
│   │   ├── api/           # AI provider clients
│   │   │   ├── client.ts  # Unified AI client
│   │   │   ├── openai.ts  # OpenAI integration
│   │   │   ├── anthropic.ts # Anthropic integration
│   │   │   └── nvidia.ts  # NVIDIA NIM integration
│   │   ├── knowledge/     # Knowledge base system
│   │   │   ├── embeddings.ts # Vector embeddings
│   │   │   ├── search.ts  # Semantic search
│   │   │   └── chunking.ts # Text chunking
│   │   ├── storage/       # Persistence layer
│   │   │   ├── indexedDB.ts # IndexedDB operations
│   │   │   ├── localStorage.ts # LocalStorage operations
│   │   │   └── export.ts  # Project export/import
│   │   ├── tools/         # Tool execution system
│   │   │   ├── tool-executor.ts # Tool runtime
│   │   │   └── built-in-tools.ts # Built-in tools
│   │   ├── workflow/      # Workflow execution
│   │   │   └── execution-engine.ts # Workflow runtime
│   │   └── utils.ts       # Shared utilities (cn, etc.)
│   ├── store/             # Zustand state stores
│   │   ├── agentStore.ts  # Agent configuration state
│   │   ├── chatStore.ts   # Chat history and state
│   │   ├── knowledgeStore.ts # Knowledge base state
│   │   ├── projectStore.ts # Project management state
│   │   ├── toolStore.ts   # Tool registry state
│   │   └── workflowStore.ts # Workflow nodes/edges state
│   ├── types/             # TypeScript type definitions
│   │   ├── agent.types.ts
│   │   ├── chat.types.ts
│   │   ├── knowledge.types.ts
│   │   ├── model.types.ts
│   │   ├── project.types.ts
│   │   ├── settings.types.ts
│   │   ├── tool.types.ts
│   │   ├── tools.types.ts
│   │   └── workflow.types.ts
│   ├── pages/             # Route components
│   │   ├── Index.tsx      # Landing page
│   │   ├── Studio.tsx     # Main studio interface
│   │   ├── Enterprise.tsx # Enterprise page
│   │   ├── Pricing.tsx    # Pricing page
│   │   └── NotFound.tsx   # 404 page
│   ├── hooks/             # Custom React hooks
│   ├── App.tsx            # Root component with routing
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles and CSS variables
├── public/                # Static assets
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind configuration
├── vite.config.ts         # Vite configuration
└── components.json        # shadcn/ui configuration
```

---

## State Management

### Zustand Stores

The application uses Zustand for state management with persistence. Each store is modular and handles a specific domain:

#### 1. **workflowStore** (src/store/workflowStore.ts)
- **Purpose**: Manages workflow nodes and edges
- **Key State**:
  - `workflows`: Record of workflow data by ID
  - `activeWorkflowId`: Currently active workflow
  - `selectedNodeId`: Currently selected node
- **Key Actions**:
  - `createWorkflow`, `deleteWorkflow`, `setActiveWorkflow`
  - `addNode`, `updateNode`, `deleteNode`, `onNodesChange`
  - `addEdge`, `deleteEdge`, `onEdgesChange`
- **Persistence**: Persisted to localStorage as `workflow-storage`

#### 2. **agentStore** (src/store/agentStore.ts)
- **Purpose**: Manages agent configurations
- **Key State**: Agent settings, prompts, model configurations
- **Persistence**: Persisted to localStorage

#### 3. **chatStore** (src/store/chatStore.ts)
- **Purpose**: Manages chat conversations and messages
- **Key State**: Message history, active conversations
- **Persistence**: Persisted to localStorage

#### 4. **knowledgeStore** (src/store/knowledgeStore.ts)
- **Purpose**: Manages knowledge base documents and embeddings
- **Key State**: Documents, embeddings, search indices
- **Persistence**: IndexedDB for large data

#### 5. **toolStore** (src/store/toolStore.ts)
- **Purpose**: Manages available tools and their configurations
- **Key State**: Tool registry, custom tools
- **Persistence**: Persisted to localStorage

#### 6. **projectStore** (src/store/projectStore.ts)
- **Purpose**: Manages project-level state and metadata
- **Key State**: Project settings, export/import state
- **Persistence**: Persisted to localStorage

---

## Key Concepts

### 1. Workflow System

Workflows are built using **ReactFlow** and consist of nodes and edges:

**Node Types** (defined in `src/types/workflow.types.ts`):
- `START`: Entry point of the workflow
- `AI_AGENT`: LLM interaction node
- `TOOL`: Tool execution node
- `CONDITION`: Conditional branching
- `LOOP`: Iteration node
- `TRANSFORM`: Data transformation
- `MERGE`: Merge multiple branches
- `HUMAN_INPUT`: Human-in-the-loop input
- `KNOWLEDGE`: Knowledge base query
- `END`: Exit point

**Node Components** (src/components/studio/workflow/nodes/):
Each node type has a corresponding React component that renders in the workflow canvas.

### 2. AI Provider Integration

The `AIClient` (src/lib/api/client.ts) provides a unified interface for multiple AI providers:

```typescript
// Create a client
const client = new AIClient({
  provider: 'openai', // or 'anthropic', 'nvidia'
  apiKey: 'your-api-key',
  baseURL: 'optional-base-url'
});

// Chat completion
const response = await client.createChatCompletion({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello' }],
  temperature: 0.7,
  max_tokens: 1000
});

// Streaming
for await (const chunk of client.streamChatCompletion(request)) {
  console.log(chunk);
}

// Embeddings (OpenAI/NVIDIA only)
const embeddings = await client.createEmbedding('text', 'text-embedding-3-small');
```

### 3. Knowledge Base System

Vector-based knowledge storage with semantic search:

**Flow**:
1. Document upload → Text chunking
2. Chunk embedding via AI provider
3. Storage in IndexedDB with vectors
4. Semantic search using cosine similarity

**Files**:
- `src/lib/knowledge/chunking.ts`: Text splitting logic
- `src/lib/knowledge/embeddings.ts`: Vector operations
- `src/lib/knowledge/search.ts`: Semantic search

### 4. Tool System

Extensible tool framework for agent capabilities:

**Built-in Tools** (src/lib/tools/built-in-tools.ts):
- Web search
- Code execution
- File operations
- API calls
- Data transformations

**Tool Executor** (src/lib/tools/tool-executor.ts):
Handles tool invocation with timeout, error handling, and result formatting.

### 5. Execution Engine

Workflow runtime (src/lib/workflow/execution-engine.ts):
- Topological execution order
- Node state tracking
- Error handling and retries
- Context passing between nodes

---

## Development Workflows

### Setup

```bash
# Install dependencies
npm install

# Start development server (port 5173)
npm run dev

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Adding a New Node Type

1. **Define the type** in `src/types/workflow.types.ts`:
```typescript
export enum NodeType {
  // ... existing types
  NEW_TYPE = 'new_type'
}

export interface NewTypeNodeData extends BaseNodeData {
  customField: string;
}
```

2. **Create node component** in `src/components/studio/workflow/nodes/NewTypeNode.tsx`:
```typescript
import { memo } from 'react';
import { Handle, Position } from 'reactflow';

export const NewTypeNode = memo(({ data }: { data: NewTypeNodeData }) => {
  return (
    <div className="bg-node-new border-2 border-nvidia-green rounded-lg p-4">
      <Handle type="target" position={Position.Left} />
      <div className="font-bold">{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
});
```

3. **Register in NodeLibrary** (src/components/studio/workflow/NodeLibrary.tsx)

4. **Add to WorkflowCanvas** node types mapping

5. **Create settings panel** in `src/components/studio/workflow/settings/`

### Adding a New AI Provider

1. **Create provider client** in `src/lib/api/your-provider.ts`:
```typescript
export class YourProviderClient {
  async createChatCompletion(request: ChatCompletionRequest) {
    // Implementation
  }
}
```

2. **Add to AIClient** in `src/lib/api/client.ts`:
```typescript
case 'your-provider':
  this.client = new YourProviderClient({
    apiKey: config.apiKey,
    baseURL: config.baseURL
  });
  break;
```

3. **Update model types** in `src/types/model.types.ts`:
```typescript
export type ModelProvider = 'openai' | 'anthropic' | 'nvidia' | 'your-provider';
```

4. **Add UI in ModelSelector** component

### Adding a New Built-in Tool

1. **Define tool** in `src/lib/tools/built-in-tools.ts`:
```typescript
export const BUILT_IN_TOOLS = [
  {
    id: 'your-tool',
    name: 'Your Tool',
    description: 'Tool description',
    category: 'utility',
    parameters: {
      param1: { type: 'string', required: true }
    },
    execute: async (params) => {
      // Implementation
      return { success: true, result: 'output' };
    }
  }
];
```

2. **Tool will automatically appear** in ToolsLibrary component

---

## Code Conventions

### TypeScript

- **Strict mode disabled** for rapid development (see tsconfig.json)
- `noImplicitAny: false`, `strictNullChecks: false`
- Use explicit types for public APIs
- Interfaces for data structures, types for unions/intersections

### React

- **Functional components** with hooks (no class components)
- **Memo** for expensive renders (ReactFlow nodes)
- **Custom hooks** in `src/hooks/` directory
- **Component naming**: PascalCase (e.g., `ModelSelector.tsx`)

### File Organization

- One component per file
- Co-locate types with components if component-specific
- Shared types go in `src/types/`
- Use index files for clean exports (avoid when possible)

### State Updates

```typescript
// ✅ Good: Update via store actions
const { updateNode } = useWorkflowStore();
updateNode(nodeId, { label: 'New Label' });

// ❌ Bad: Direct state mutation
nodes[0].label = 'New Label';
```

### Styling

- **Tailwind utility classes** for styling
- **Custom colors** defined in tailwind.config.ts
- **NVIDIA brand colors**: `nvidia-green`, `nvidia-black`, `nvidia-gray-*`
- **Node colors**: `node-start`, `node-ai`, `node-tool`, etc.
- Use `cn()` utility for conditional classes:
```typescript
import { cn } from '@/lib/utils';

className={cn(
  "base-classes",
  condition && "conditional-classes"
)}
```

### Imports

- Use path aliases: `@/components`, `@/lib`, `@/store`, `@/types`
- Group imports: React, third-party, local components, types
```typescript
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useWorkflowStore } from '@/store/workflowStore';
import type { WorkflowNode } from '@/types/workflow.types';
```

---

## Component Patterns

### shadcn/ui Components

All UI components are from shadcn/ui (src/components/ui/):
- Pre-built, accessible components based on Radix UI
- Customizable via Tailwind classes
- Copy-paste friendly (not npm package)

**Common components**:
- `Button`, `Input`, `Textarea`, `Select`
- `Dialog`, `Popover`, `Tooltip`
- `Tabs`, `Accordion`, `Card`
- `Toast` (via Sonner)

### Forms

Use React Hook Form + Zod for validation:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email()
});

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: { name: '', email: '' }
});
```

### Zustand Store Access

```typescript
// Get entire store
const store = useWorkflowStore();

// Selective subscription (better performance)
const nodes = useWorkflowStore((state) => state.getNodes());
const addNode = useWorkflowStore((state) => state.addNode);
```

### ReactFlow Integration

```typescript
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom node types
const nodeTypes = {
  start: StartNode,
  ai_agent: AIAgentNode,
  tool: ToolNode,
  // ...
};

<ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  onConnect={onConnect}
/>
```

---

## Testing & Building

### Development

```bash
npm run dev
```
- Runs on http://localhost:5173
- Hot module replacement (HMR) enabled
- Fast refresh via SWC

### Production Build

```bash
npm run build
```
- Outputs to `dist/` directory
- Minified and optimized
- Source maps disabled

### Development Build

```bash
npm run build:dev
```
- Includes source maps for debugging
- Useful for staging environments

### Linting

```bash
npm run lint
```
- ESLint configuration in `eslint.config.js`
- React hooks rules enabled
- TypeScript ESLint integration

---

## AI Integration

### Model Configuration

Models are defined in `src/types/model.types.ts`:

**Supported Providers**:
- **OpenAI**: GPT-4, GPT-3.5, embeddings
- **Anthropic**: Claude 3 (Opus, Sonnet, Haiku)
- **NVIDIA**: NIM endpoints (Llama, Mistral, etc.)

### Chat Interface

The chat interface (src/components/studio/chat/ChatInterface.tsx):
- Supports streaming responses
- Message history persistence
- Tool call display
- Error handling

### System Prompts

Agent system prompts are stored in agentStore and can include:
- Role definitions
- Instructions
- Context
- Tool descriptions
- Output formatting rules

---

## Common Tasks

### 1. Update Node Settings

When a user clicks a node, the `NodeSettingsPanel` opens:

```typescript
// In workflow canvas
const handleNodeClick = (event: React.MouseEvent, node: WorkflowNode) => {
  setSelectedNode(node.id);
};

// NodeSettingsPanel reads selectedNodeId from store
const { selectedNodeId } = useWorkflowStore();
```

### 2. Save/Load Projects

Projects are managed via projectStore:

```typescript
import { saveProject, loadProject } from '@/lib/storage/indexedDB';

// Save
await saveProject({
  id: projectId,
  name: 'My Project',
  workflows: workflowStore.workflows,
  agents: agentStore.agents,
  tools: toolStore.tools
});

// Load
const project = await loadProject(projectId);
```

### 3. Execute Workflow

```typescript
import { executeWorkflow } from '@/lib/workflow/execution-engine';

const result = await executeWorkflow(
  workflow,
  { input: 'user input' },
  {
    onNodeStart: (nodeId) => console.log('Starting', nodeId),
    onNodeComplete: (nodeId, output) => console.log('Done', nodeId),
    onError: (error) => console.error(error)
  }
);
```

### 4. Add Knowledge Base Document

```typescript
import { useKnowledgeStore } from '@/store/knowledgeStore';

const { addDocument } = useKnowledgeStore();

await addDocument({
  id: crypto.randomUUID(),
  title: 'Document Title',
  content: 'Document content...',
  metadata: { source: 'upload' }
});
```

### 5. Search Knowledge Base

```typescript
import { semanticSearch } from '@/lib/knowledge/search';

const results = await semanticSearch(
  'query text',
  knowledgeBase,
  { topK: 5, threshold: 0.7 }
);
```

---

## Git Workflow

### Branch Naming

- Feature branches: `claude/feature-description-{session-id}`
- Bug fixes: `claude/fix-description-{session-id}`
- **Important**: Branch names MUST start with `claude/` and end with session ID

### Commit Messages

Use conventional commits:
- `feat: Add new node type`
- `fix: Correct workflow execution bug`
- `refactor: Improve store organization`
- `docs: Update CLAUDE.md`
- `style: Fix linting issues`

### Push Protocol

```bash
# Always push to your feature branch
git push -u origin claude/your-branch-name

# Retry on network errors with exponential backoff
```

---

## Important Notes for AI Assistants

### DO:
- ✅ Use Zustand stores for state management
- ✅ Follow Tailwind utility-first styling
- ✅ Use shadcn/ui components for UI
- ✅ Maintain TypeScript types even with loose config
- ✅ Test workflows in the Studio interface
- ✅ Use path aliases (@/) for imports
- ✅ Preserve NVIDIA branding colors
- ✅ Handle async operations with proper error handling
- ✅ Use ReactFlow conventions for node/edge operations

### DON'T:
- ❌ Mutate Zustand state directly
- ❌ Use inline styles (prefer Tailwind)
- ❌ Install competing UI libraries (use shadcn/ui)
- ❌ Bypass the AIClient for API calls
- ❌ Commit directly to main/master
- ❌ Remove persistence from stores
- ❌ Break ReactFlow node component patterns
- ❌ Ignore TypeScript errors (even if allowed)

### Key Files to Review:
- `src/store/workflowStore.ts` - Workflow state management
- `src/lib/api/client.ts` - AI provider integration
- `src/types/workflow.types.ts` - Workflow type definitions
- `src/components/studio/workflow/NodeLibrary.tsx` - Available nodes
- `tailwind.config.ts` - Theme and styling configuration

---

## Troubleshooting

### Common Issues

**1. State not persisting**
- Check Zustand persist configuration
- Verify localStorage/IndexedDB is not full
- Check browser privacy settings

**2. ReactFlow nodes not rendering**
- Ensure node type is registered in nodeTypes object
- Check that node data matches interface
- Verify ReactFlow CSS is imported

**3. AI requests failing**
- Verify API keys in settings
- Check provider client implementation
- Look for CORS issues in browser console

**4. Build errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`
- Verify Vite config

---

## Resources

- **Vite**: https://vitejs.dev/
- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/
- **Tailwind CSS**: https://tailwindcss.com/
- **shadcn/ui**: https://ui.shadcn.com/
- **ReactFlow**: https://reactflow.dev/
- **Zustand**: https://zustand-demo.pmnd.rs/
- **TanStack Query**: https://tanstack.com/query/latest

---

**Version**: 1.0.0
**Maintained by**: Easy AI Agent Studio Team
**Last Updated**: 2025-11-14
