
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Cpu, Brain } from 'lucide-react';

const HeroSection = () => {
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
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-nvidia-gray-dark border border-nvidia-green/30 text-nvidia-green text-sm font-medium mb-8 animate-scale-in">
            <Sparkles className="h-4 w-4 mr-2" />
            Next-Gen AI Solutions from India
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            The Future of
            <span className="block bg-nvidia-gradient bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
            is Here
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Empowering businesses with cutting-edge AI solutions. From machine learning to computer vision, 
            we're building the next generation of intelligent systems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105 group">
              Explore Our Solutions
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="border-nvidia-green text-nvidia-green hover:bg-nvidia-green hover:text-nvidia-black font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300">
              Watch Demo
            </Button>
          </div>

          {/* Tech Icons */}
          <div className="flex justify-center items-center space-x-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center space-x-2 text-nvidia-green">
              <Brain className="h-6 w-6" />
              <span className="text-sm font-medium">Neural Networks</span>
            </div>
            <div className="flex items-center space-x-2 text-nvidia-green">
              <Cpu className="h-6 w-6" />
              <span className="text-sm font-medium">GPU Computing</span>
            </div>
            <div className="flex items-center space-x-2 text-nvidia-green">
              <Sparkles className="h-6 w-6" />
              <span className="text-sm font-medium">AI Innovation</span>
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
