
import { Brain, Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-nvidia-black border-t border-nvidia-gray-dark">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-nvidia-green" />
              <span className="text-2xl font-bold text-white">
                Easy AI <span className="text-nvidia-green">Labs</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Pioneering the future of artificial intelligence from India. Building world-class AI solutions 
              that transform businesses and empower innovation.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-5 w-5 text-nvidia-green" />
                <span>Gandhinagar, Gujarat, India</span>
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
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Machine Learning</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Computer Vision</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">NLP Solutions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">AI Consulting</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Custom AI Development</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-nvidia-green transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-nvidia-gray-dark mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            © 2024 Easy AI Labs. All rights reserved. Made with ❤️ in India.
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
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
