
import { Button } from '@/components/ui/button';
import { MapPin, Users, Award, TrendingUp } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: Users, value: "50+", label: "AI Experts" },
    { icon: Award, value: "100+", label: "Projects Delivered" },
    { icon: TrendingUp, value: "99%", label: "Client Satisfaction" },
    { icon: MapPin, value: "India", label: "Proudly Based" }
  ];

  return (
    <section id="about" className="py-20 bg-nvidia-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-nvidia-green">Easy AI Labs</span>
            </h2>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              Founded in the heart of India's innovation ecosystem, Easy AI Labs is pioneering the future of artificial intelligence. 
              Based in Gandhinagar, Gujarat, we're building world-class AI solutions that compete globally while staying rooted in Indian values.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Our team of passionate AI researchers and engineers work tirelessly to democratize artificial intelligence, 
              making cutting-edge technology accessible to businesses of all sizes.
            </p>
            
            {/* Location Badge */}
            <div className="flex items-center space-x-2 mb-8">
              <MapPin className="h-5 w-5 text-nvidia-green" />
              <span className="text-nvidia-green font-semibold">Headquartered in Gandhinagar, Gujarat, India</span>
            </div>

            <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105">
              Learn More About Us
            </Button>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-nvidia-gray-dark rounded-lg border border-nvidia-gray-medium hover:border-nvidia-green/50 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-nvidia-gradient rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
