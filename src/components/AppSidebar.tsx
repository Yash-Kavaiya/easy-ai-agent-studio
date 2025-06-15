
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
  },
  {
    title: "Knowledge Base",
    icon: Database,
  },
  {
    title: "Workflow",
    icon: Workflow,
  },
  {
    title: "AI Model",
    icon: Brain,
  },
  {
    title: "Actions",
    icon: Zap,
  },
];

// Tools
const tools = [
  {
    title: "Run Agent",
    icon: Play,
  },
  {
    title: "Test Agent",
    icon: TestTube,
  },
  {
    title: "Save Project",
    icon: Save,
  },
  {
    title: "Export",
    icon: Download,
  },
  {
    title: "Import",
    icon: Upload,
  },
];

// Settings
const settings = [
  {
    title: "Agent Settings",
    icon: Settings,
  },
  {
    title: "Model Config",
    icon: Bot,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-nvidia-gray-medium">
      <SidebarHeader className="border-b border-nvidia-gray-medium">
        <div className="flex items-center space-x-2 p-2">
          <div className="relative">
            <Brain className="h-6 w-6 text-nvidia-green" />
            <Zap className="absolute -top-1 -right-1 h-3 w-3 text-nvidia-green-light animate-pulse" />
          </div>
          <span className="font-semibold text-white">AI Studio</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-nvidia-green">Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {agentComponents.map((component) => (
                <SidebarMenuItem key={component.title}>
                  <SidebarMenuButton className="text-gray-300 hover:text-white hover:bg-nvidia-gray-medium">
                    <component.icon className="h-4 w-4" />
                    <span>{component.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-nvidia-green">Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tools.map((tool) => (
                <SidebarMenuItem key={tool.title}>
                  <SidebarMenuButton className="text-gray-300 hover:text-white hover:bg-nvidia-gray-medium">
                    <tool.icon className="h-4 w-4" />
                    <span>{tool.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-nvidia-green">Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settings.map((setting) => (
                <SidebarMenuItem key={setting.title}>
                  <SidebarMenuButton className="text-gray-300 hover:text-white hover:bg-nvidia-gray-medium">
                    <setting.icon className="h-4 w-4" />
                    <span>{setting.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-nvidia-gray-medium">
        <div className="p-2">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Blocks className="h-4 w-4" />
            <span>v1.0.0</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
