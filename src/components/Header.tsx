import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Brain, Zap, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState<string | null>(null);

  const handleDropdownToggle = (dropdown: string) => {
    setIsDropdownOpen(isDropdownOpen === dropdown ? null : dropdown);
    setIsSubDropdownOpen(null); // Close any open sub-dropdowns
  };

  const handleSubDropdownToggle = (subDropdown: string) => {
    setIsSubDropdownOpen(isSubDropdownOpen === subDropdown ? null : subDropdown);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-nvidia-black/95 backdrop-blur-md border-b border-nvidia-gray-dark">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Brain className="h-8 w-8 text-nvidia-green" />
              <Zap className="absolute -top-1 -right-1 h-4 w-4 text-nvidia-green-light animate-pulse" />
            </div>
            <span className="text-2xl font-bold text-white">
              Easy AI <span className="text-nvidia-green">Labs</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-white hover:text-nvidia-green transition-colors"
                onClick={() => handleDropdownToggle('solutions')}
              >
                <span>Solutions</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isDropdownOpen === 'solutions' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-nvidia-gray-dark border border-nvidia-gray-medium rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Task Agents</a>
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Voice Agents</a>
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">SQL Agents</a>
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Multi-Agent Orchestration</a>
                    
                    {/* By Industries Submenu */}
                    <div className="relative">
                      <button
                        className="w-full flex items-center justify-between px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors"
                        onClick={() => handleSubDropdownToggle('industries')}
                      >
                        <span>By Industries</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      {isSubDropdownOpen === 'industries' && (
                        <div className="absolute left-full top-0 ml-1 w-48 bg-nvidia-gray-dark border border-nvidia-gray-medium rounded-lg shadow-lg z-50">
                          <div className="py-2">
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Banking</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Insurance</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Financial Services</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Healthcare</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Retail & E-commerce</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Manufacturing</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Real Estate</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Education</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Technology</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Legal Services</a>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* By Functions Submenu */}
                    <div className="relative">
                      <button
                        className="w-full flex items-center justify-between px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors"
                        onClick={() => handleSubDropdownToggle('functions')}
                      >
                        <span>By Functions</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      {isSubDropdownOpen === 'functions' && (
                        <div className="absolute left-full top-0 ml-1 w-48 bg-nvidia-gray-dark border border-nvidia-gray-medium rounded-lg shadow-lg z-50">
                          <div className="py-2">
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">HR</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Marketing</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Customer Service</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Sales</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Finance & Accounting</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Operations</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Product Management</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">IT & Development</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Procurement</a>
                            <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Supply Chain</a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Platform Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-white hover:text-nvidia-green transition-colors"
                onClick={() => handleDropdownToggle('platform')}
              >
                <span>Platform</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isDropdownOpen === 'platform' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-nvidia-gray-dark border border-nvidia-gray-medium rounded-lg shadow-lg">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Agent Studio</a>
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Responsible AI</a>
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Enterprise</a>
                  </div>
                </div>
              )}
            </div>

            <Link to="/enterprise" className="text-white hover:text-nvidia-green transition-colors">Enterprise</Link>
            <Link to="/pricing" className="text-white hover:text-nvidia-green transition-colors">Pricing</Link>
            
            {/* Partners Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-white hover:text-nvidia-green transition-colors"
                onClick={() => handleDropdownToggle('partners')}
              >
                <span>Partners</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isDropdownOpen === 'partners' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-nvidia-gray-dark border border-nvidia-gray-medium rounded-lg shadow-lg">
                  <div className="py-2">
                    <Link to="/partners/technology" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Technology Partners</Link>
                    <Link to="/partners/integration" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Integration Partners</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-white hover:text-nvidia-green transition-colors"
                onClick={() => handleDropdownToggle('resources')}
              >
                <span>Resources</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isDropdownOpen === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-nvidia-gray-dark border border-nvidia-gray-medium rounded-lg shadow-lg">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Blog</a>
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Case Studies</a>
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Documentation</a>
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:text-nvidia-green hover:bg-nvidia-gray-medium transition-colors">Webinars</a>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/studio">
              <Button variant="outline" className="border-nvidia-green text-nvidia-green hover:bg-nvidia-green hover:text-nvidia-black font-semibold px-4 py-2 rounded-lg">
                Agent Studio →
              </Button>
            </Link>
            <Link to="/book-demo">
              <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105">
                Book a Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-nvidia-gray-dark">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="#solutions" className="text-white hover:text-nvidia-green transition-colors">Solutions</a>
              <a href="#platform" className="text-white hover:text-nvidia-green transition-colors">Platform</a>
              <Link to="/enterprise" className="text-white hover:text-nvidia-green transition-colors">Enterprise</Link>
              <Link to="/pricing" className="text-white hover:text-nvidia-green transition-colors">Pricing</Link>
              <Link to="/partners/technology" className="text-white hover:text-nvidia-green transition-colors">Technology Partners</Link>
              <Link to="/partners/integration" className="text-white hover:text-nvidia-green transition-colors">Integration Partners</Link>
              <a href="#resources" className="text-white hover:text-nvidia-green transition-colors">Resources</a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-nvidia-gray-dark">
                <Link to="/studio">
                  <Button variant="outline" className="border-nvidia-green text-nvidia-green hover:bg-nvidia-green hover:text-nvidia-black font-semibold px-4 py-2 rounded-lg w-fit">
                    Agent Studio →
                  </Button>
                </Link>
                <Link to="/book-demo">
                  <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-6 py-2 rounded-lg w-fit">
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
