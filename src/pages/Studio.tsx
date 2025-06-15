
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";

const Studio = () => {
  return (
    <div className="min-h-screen bg-nvidia-black">
      <Header />
      <SidebarProvider>
        <div className="flex w-full pt-20">
          <AppSidebar />
          <main className="flex-1 p-6">
            <SidebarTrigger className="mb-4" />
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Easy AI <span className="text-nvidia-green">Studio</span>
                </h1>
                <p className="text-gray-300 text-lg">
                  Build, test, and deploy AI agents with our intuitive visual editor
                </p>
              </div>

              {/* Main Studio Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Agent Canvas */}
                <div className="lg:col-span-2 bg-nvidia-gray-dark rounded-lg p-6 border border-nvidia-gray-medium">
                  <h2 className="text-xl font-semibold text-white mb-4">Agent Canvas</h2>
                  <div className="bg-nvidia-gray-medium rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-nvidia-gray-light">
                    <div className="text-center">
                      <div className="text-4xl text-nvidia-green mb-4">🤖</div>
                      <p className="text-gray-300">Drop components here to build your agent</p>
                    </div>
                  </div>
                </div>

                {/* Properties Panel */}
                <div className="bg-nvidia-gray-dark rounded-lg p-6 border border-nvidia-gray-medium">
                  <h2 className="text-xl font-semibold text-white mb-4">Properties</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Agent Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-nvidia-gray-medium border border-nvidia-gray-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-nvidia-green"
                        placeholder="My AI Agent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        className="w-full px-3 py-2 bg-nvidia-gray-medium border border-nvidia-gray-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-nvidia-green h-24 resize-none"
                        placeholder="Describe what your agent does..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Model
                      </label>
                      <select className="w-full px-3 py-2 bg-nvidia-gray-medium border border-nvidia-gray-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-nvidia-green">
                        <option>GPT-4</option>
                        <option>Claude-3</option>
                        <option>Llama-2</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Panel */}
              <div className="mt-6 bg-nvidia-gray-dark rounded-lg p-6 border border-nvidia-gray-medium">
                <h2 className="text-xl font-semibold text-white mb-4">Testing Console</h2>
                <div className="bg-black rounded-lg p-4 h-32 overflow-y-auto">
                  <div className="text-green-400 font-mono text-sm">
                    <div>Agent Studio initialized...</div>
                    <div>Ready to build your AI agent 🚀</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Studio;
