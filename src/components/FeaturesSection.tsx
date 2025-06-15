
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Eye, MessageSquare, BarChart3, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Advanced ML algorithms powered by cutting-edge neural networks for intelligent automation and prediction.",
    gradient: "from-nvidia-green to-nvidia-green-light"
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Real-time image and video analysis with object detection, recognition, and classification capabilities.",
    gradient: "from-nvidia-green-light to-nvidia-green"
  },
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    description: "Sophisticated NLP solutions for text analysis, sentiment detection, and conversational AI.",
    gradient: "from-nvidia-green to-nvidia-green-dark"
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Data-driven insights and forecasting to help businesses make informed decisions.",
    gradient: "from-nvidia-green-dark to-nvidia-green"
  },
  {
    icon: Shield,
    title: "AI Security",
    description: "Robust security frameworks ensuring your AI solutions are safe, reliable, and trustworthy.",
    gradient: "from-nvidia-green to-nvidia-green-light"
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Lightning-fast AI inference with optimized performance for real-time applications.",
    gradient: "from-nvidia-green-light to-nvidia-green-dark"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-nvidia-gray-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful AI <span className="text-nvidia-green">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our comprehensive suite of AI technologies designed to transform your business operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-nvidia-black border-nvidia-gray-medium hover:border-nvidia-green/50 transition-all duration-300 hover:scale-105 group"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
