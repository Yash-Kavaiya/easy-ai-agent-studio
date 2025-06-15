
import {
  Bot,
  Blocks,
  Settings,
  Play,
  Save,
  Download,
  Upload,
  Zap,
  Database,
  MessageSquare,
  Brain,
  Workflow,
  TestTube,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

// Agent Components
const agentComponents = [
  {
    title: "Chat Interface",
    icon: MessageSquare,
    description: "Interactive conversation UI"
  },
  {
    title: "Knowledge Base",
    icon: Database,
    description: "Data storage and retrieval"
  },
  {
    title: "Workflow",
    icon: Workflow,
    description: "Process automation"
  },
  {
    title: "AI Model",
    icon: Brain,
    description: "Core intelligence engine"
  },
  {
    title: "Actions",
    icon: Zap,
    description: "Custom functionality"
  },
];

// Tools
const tools = [
  {
    title: "Run Agent",
    icon: Play,
    description: "Execute your agent"
  },
  {
    title: "Test Agent",
    icon: TestTube,
    description: "Debug and validate"
  },
  {
    title: "Save Project",
    icon: Save,
    description: "Store your work"
  },
  {
    title: "Export",
    icon: Download,
    description: "Download project"
  },
  {
    title: "Import",
    icon: Upload,
    description: "Load existing project"
  },
];

// Settings
const settings = [
  {
    title: "Agent Settings",
    icon: Settings,
    description: "Configure behavior"
  },
  {
    title: "Model Config",
    icon: Bot,
    description: "AI model parameters"
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-nvidia-gray-medium bg-nvidia-gray-dark">
      <SidebarHeader className="border-b border-nvidia-gray-medium bg-nvidia-black/50 p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="rounded-lg bg-nvidia-green/20 p-2">
              <Brain className="h-6 w-6 text-nvidia-green" />
            </div>
            <Zap className="absolute -top-1 -right-1 h-4 w-4 text-nvidia-green animate-pulse" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg">AI Studio</h2>
            <p className="text-xs text-gray-400">Build intelligent agents</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-nvidia-green font-semibold text-sm mb-3 px-2">
            Components
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {agentComponents.map((component) => (
                <SidebarMenuItem key={component.title}>
                  <SidebarMenuButton 
                    className="group text-gray-300 hover:text-white hover:bg-nvidia-gray-medium/80 rounded-lg p-3 transition-all duration-200 hover:shadow-sm"
                    tooltip={component.description}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="rounded-md bg-nvidia-gray-medium/50 p-1.5 group-hover:bg-nvidia-green/20 transition-colors">
                        <component.icon className="h-4 w-4 group-hover:text-nvidia-green transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm">{component.title}</span>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-nvidia-green font-semibold text-sm mb-3 px-2">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {tools.map((tool) => (
                <SidebarMenuItem key={tool.title}>
                  <SidebarMenuButton 
                    className="group text-gray-300 hover:text-white hover:bg-nvidia-gray-medium/80 rounded-lg p-3 transition-all duration-200 hover:shadow-sm"
                    tooltip={tool.description}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="rounded-md bg-nvidia-gray-medium/50 p-1.5 group-hover:bg-nvidia-green/20 transition-colors">
                        <tool.icon className="h-4 w-4 group-hover:text-nvidia-green transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm">{tool.title}</span>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-nvidia-green font-semibold text-sm mb-3 px-2">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {settings.map((setting) => (
                <SidebarMenuItem key={setting.title}>
                  <SidebarMenuButton 
                    className="group text-gray-300 hover:text-white hover:bg-nvidia-gray-medium/80 rounded-lg p-3 transition-all duration-200 hover:shadow-sm"
                    tooltip={setting.description}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="rounded-md bg-nvidia-gray-medium/50 p-1.5 group-hover:bg-nvidia-green/20 transition-colors">
                        <setting.icon className="h-4 w-4 group-hover:text-nvidia-green transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm">{setting.title}</span>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-nvidia-gray-medium bg-nvidia-black/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="rounded-full bg-nvidia-green/20 p-1">
              <Blocks className="h-3 w-3 text-nvidia-green" />
            </div>
            <span className="font-medium">v1.0.0</span>
          </div>
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" title="System Online"></div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
