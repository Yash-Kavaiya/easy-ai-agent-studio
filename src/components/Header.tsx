
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Brain, Zap } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-nvidia-black/90 backdrop-blur-md border-b border-nvidia-gray-dark">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Brain className="h-8 w-8 text-nvidia-green" />
              <Zap className="absolute -top-1 -right-1 h-4 w-4 text-nvidia-green-light animate-pulse" />
            </div>
            <span className="text-2xl font-bold text-white">
              Easy AI <span className="text-nvidia-green">Labs</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-nvidia-green transition-colors">Home</a>
            <a href="#features" className="text-white hover:text-nvidia-green transition-colors">Features</a>
            <a href="#solutions" className="text-white hover:text-nvidia-green transition-colors">Solutions</a>
            <a href="#about" className="text-white hover:text-nvidia-green transition-colors">About</a>
            <a href="#contact" className="text-white hover:text-nvidia-green transition-colors">Contact</a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-nvidia-gray-dark">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="#home" className="text-white hover:text-nvidia-green transition-colors">Home</a>
              <a href="#features" className="text-white hover:text-nvidia-green transition-colors">Features</a>
              <a href="#solutions" className="text-white hover:text-nvidia-green transition-colors">Solutions</a>
              <a href="#about" className="text-white hover:text-nvidia-green transition-colors">About</a>
              <a href="#contact" className="text-white hover:text-nvidia-green transition-colors">Contact</a>
              <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-6 py-2 rounded-lg w-fit">
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
