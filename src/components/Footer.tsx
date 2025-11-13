
import { Brain, Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-nvidia-black border-t border-nvidia-gray-dark">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-nvidia-green" />
              <span className="text-2xl font-bold text-white">
                Easy AI <span className="text-nvidia-green">Labs</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Build reliable, private and self-learning AI agents.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-5 w-5 text-nvidia-green" />
                <span>155 2nd street, #108, Jersey City, NJ, 07302</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-5 w-5 text-nvidia-green" />
                <span>hello@easyailabs.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-5 w-5 text-nvidia-green" />
                <span>+91 98765 43210</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Wall of Love</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Easy AI Labs raises Angel Round 🔥</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">News</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Banking</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Sales</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Marketing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">HR</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Customer Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Financial Services</a></li>
            </ul>
          </div>

          {/* Agents */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Agents</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Jazon - AI SDR</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Skott - AI Marketer</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Dwight - AI RFP Scout</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Diane - AI HR agent</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Kathy - AI Competitor Analyst</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Jeff - AI Support agent</a></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Agent studio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Responsible AI</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">OGI</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Enterprise</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">AWS partnership</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Speak to Lyra</a></li>
            </ul>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {/* Fundamentals */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Fundamentals</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">AI Agents</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Agent frameworks</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Generative AI</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">AI Model monitoring</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Intent Recognition</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Machine Translation</a></li>
            </ul>
          </div>

          {/* Case Studies */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Case Studies</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Leading HR tech innovator</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Leading energy provider</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Global IT giant</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">HR & workforce leader</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Customer service leader</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Industrial manufacturing firm</a></li>
              <li>
                <a
                  href="https://github.com/Yash-Kavaiya/NVDIA-Retail-AI-Teams"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-nvidia-green transition-colors"
                  title="NVIDIA Retail AI Teams - Multi-agent system transforming retail operations with 99% accuracy in policy retrieval, 3x faster response times, and 70% reduction in analyst workload"
                >
                  NVIDIA Retail AI Teams
                </a>
              </li>
            </ul>
          </div>

          {/* Comparisons & Playbooks */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Comparisons</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Easy AI Labs vs Crew Ai</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Easy AI Labs vs Agentforce</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Easy AI Labs vs LangGraph</a></li>
            </ul>
            <h3 className="text-white font-semibold text-lg mb-4 mt-6">Playbooks</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">HR Agent Playbook</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Sales Agent Playbook</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Content Agent Playbook</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Marketing Agent Playbook</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Banking Playbook</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Webinars</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Courses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Usecases</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Videos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">State of AI Agents</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">AI Readiness Assessment</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Research</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Showcase</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-nvidia-gray-dark mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Privacy policy</a>
              <a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Security</a>
              <a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Terms of Use</a>
            </div>
            
            <div className="text-gray-300 text-sm">
              EASY AI LABS © 2025. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
