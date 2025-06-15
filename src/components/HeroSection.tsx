
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Cpu, Brain, Mail } from 'lucide-react';
import { useState } from 'react';

const HeroSection = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Handle email submission here
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-nvidia-black overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-ai-gradient opacity-10 animate-gradient-shift bg-[length:400%_400%]"></div>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="border border-nvidia-green/20 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-nvidia-gray-dark border border-nvidia-green/30 text-nvidia-green text-sm font-medium mb-8 animate-scale-in">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Agents Solution from India
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in leading-tight">
            The agent infrastructure platform for
            <span className="block bg-nvidia-gradient bg-clip-text text-transparent">
              building reliable AI Agents
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Automate not just workflows, but entire job functions. Safe AI and Responsible AI guardrails 
            integrated natively into the core agent architecture.
          </p>

          {/* Email Capture Form */}
          <div className="max-w-md mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-nvidia-gray-dark border border-nvidia-gray-medium rounded-lg text-white placeholder-gray-400 focus:border-nvidia-green focus:outline-none focus:ring-2 focus:ring-nvidia-green/20"
                  required
                />
              </div>
              <Button 
                type="submit"
                className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Book a Demo
              </Button>
            </form>
          </div>

          {/* Secondary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button variant="outline" className="border-nvidia-green text-nvidia-green hover:bg-nvidia-green hover:text-nvidia-black font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300">
              Explore Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trusted By Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-sm text-gray-400 mb-6 font-medium">Trusted By</p>
            <div className="flex justify-center items-center flex-wrap gap-8 opacity-60">
              <div className="text-lg font-semibold text-gray-400">Accenture</div>
              <div className="text-lg font-semibold text-gray-400">AirAsia</div>
              <div className="text-lg font-semibold text-gray-400">NTT Data</div>
              <div className="text-lg font-semibold text-gray-400">HFS</div>
              <div className="text-lg font-semibold text-gray-400">Uniglobe</div>
              <div className="text-lg font-semibold text-gray-400">Dairyland</div>
            </div>
          </div>

          {/* Tech Icons */}
          <div className="flex justify-center items-center space-x-8 mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center space-x-2 text-nvidia-green">
              <Brain className="h-6 w-6" />
              <span className="text-sm font-medium">AI Agents</span>
            </div>
            <div className="flex items-center space-x-2 text-nvidia-green">
              <Cpu className="h-6 w-6" />
              <span className="text-sm font-medium">Agent Infrastructure</span>
            </div>
            <div className="flex items-center space-x-2 text-nvidia-green">
              <Sparkles className="h-6 w-6" />
              <span className="text-sm font-medium">Responsible AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-nvidia-green rounded-full flex justify-center">
          <div className="w-1 h-3 bg-nvidia-green rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
