
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Shield, Clock, Cpu, Users, Zap, Brain, Settings, BarChart3, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Enterprise = () => {
  const features = [
    {
      icon: <Settings className="h-8 w-8 text-nvidia-green" />,
      title: "Fully customizable",
      description: "solutions tailored to your enterprise's unique needs, adapting to your specific goals, processes, and data requirements."
    },
    {
      icon: <Shield className="h-8 w-8 text-nvidia-green" />,
      title: "Enterprise-grade security",
      description: "through private SDKs and full control over your infrastructure."
    },
    {
      icon: <Clock className="h-8 w-8 text-nvidia-green" />,
      title: "24/7 dedicated support",
      description: "with a 24-hour upgrade SLA, ensuring your AI applications always run smoothly."
    },
    {
      icon: <Globe className="h-8 w-8 text-nvidia-green" />,
      title: "250+ LLMs & Enterprise Apps",
      description: "supporting all leading LLMs, running on AWS, Google Cloud, IBM, Azure, and integrating with ERP, CRM, ITSM, & more."
    }
  ];

  const architectureFeatures = [
    {
      title: "Seamless scalability",
      description: "Easily scale your AI infrastructure as your business grows."
    },
    {
      title: "High performance",
      description: "Optimized for enterprise workloads with maximum efficiency."
    },
    {
      title: "Custom integrations",
      description: "Connect with your existing enterprise systems seamlessly."
    }
  ];

  const agentMeshFeatures = [
    {
      title: "Connected agents",
      description: "Seamlessly communicate across functions to maximize efficiency."
    },
    {
      title: "Accelerated decision-making",
      description: "Agents share insights, enabling faster business decisions and actions."
    },
    {
      title: "Optimized workflows",
      description: "Streamlined agent collaboration enhances operational performance."
    }
  ];

  const managementFeatures = [
    {
      title: "LLMOPs for Monitoring & Control",
      description: "Agent API studio – you can automate complex workflows just with a few clicks integrate with an API"
    },
    {
      title: "ISO-Compliant Infrastructure",
      description: "Centralized platform where employees can discover, download, and manage improving workflow."
    },
    {
      title: "Prompt Testing & Hosting",
      description: "API protects sensitive data by encrypting it, anonymizing user info, keeping all data secure and private."
    },
    {
      title: "Private SDKs & On-Prem/Cloud Deployment",
      description: "Support provides personalized, high-touch service, ensuring a seamless and premium customer experience."
    }
  ];

  const integrationStats = [
    { number: "250+", label: "LLMs", description: "Access a broad range of language models." },
    { number: "All", label: "Major cloud platforms", description: "Compatible with AWS, Google Cloud, Azure, and more." },
    { number: "100+", label: "Enterprise applications", description: "Connect smoothly with CRM, ERP, and other tools" }
  ];

  const testimonials = [
    {
      company: "AirAsiaMove",
      author: "Bharat Sannareddy",
      role: "AirAsiaMove",
      content: "Easy AI Labs' SEO automation features have greatly benefited AirAsiaMove. By simplifying essential processes, Easy AI Labs' solutions have notably enabled our team to save precious time, allowing us to concentrate on wider strategic efforts. AirAsiaMove looks forward to collaborating with Easy AI Labs in exploring the future of AI-driven solutions.",
      metric: "95%",
      metricLabel: "Saving precious time"
    },
    {
      company: "Enfinite Tech",
      author: "Varun Rai",
      role: "Cofounder & CTO, Enfinite Tech",
      content: "At Enfinite, we utilized Easy AI Labs' GenAI agents to validate a proof of concept and successfully integrate their capabilities into our GenAI platform. A special shoutout goes to their exceptional support team for being consistently available and going above and beyond to customize the agents to meet our specific needs.",
      metric: "10x",
      metricLabel: "Faster invoice processing"
    }
  ];

  const blogs = [
    {
      title: "LAgMo – The Large Agent Model by Easy AI Labs",
      description: "LAgMo – The Large Agent Model by Easy AI Labs"
    },
    {
      title: "Easy AI Labs' Blueprint for Organizational General Intelligence",
      description: "Easy AI Labs' Blueprint for Organizational General Intelligence"
    },
    {
      title: "How to Build a State-of-the-Art (SOTA) RAG Engine?",
      description: "How to Build a State-of-the-Art (SOTA) RAG Engine?"
    }
  ];

  return (
    <div className="min-h-screen bg-nvidia-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block bg-nvidia-green text-nvidia-black px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Award-winning Enterprise Agent Platform
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Build reliable,<br />
            safe & responsible<br />
            <span className="text-nvidia-green">AI agents</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            The only agent framework that natively integrates Safe AI & Responsible AI within the core agent architecture.
          </p>
          <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-8 py-4 rounded-lg text-lg">
            Book Demo
          </Button>
          
          {/* Partner Logos */}
          <div className="mt-16 flex justify-center items-center space-x-8 opacity-60">
            <span className="text-gray-400">HFS-research</span>
            <span className="text-gray-400">Surepeople</span>
            <span className="text-gray-400">NTT_data</span>
          </div>
        </div>
      </section>

      {/* Why Enterprises Trust Section */}
      <section className="py-20 px-4 bg-nvidia-gray-dark">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-nvidia-green font-semibold mb-4 block">Unified Solutions</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why enterprises trust<br />
              Easy AI Labs for AI transformation?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Enterprises choose Easy AI Labs for AI solutions tailored to their needs, automating processes and driving results.
            </p>
            <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-8 py-4 rounded-lg">
              Book Demo
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-nvidia-gray-medium border-nvidia-gray-light hover:border-nvidia-green transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Architecture Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-nvidia-green font-semibold mb-4 block">For Enterprises</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powered by state-of-the-art agent architecture
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Easy AI Labs' enterprise-grade architecture ensures seamless scaling and performance, enabling your AI agents to operate efficiently, even under heavy workloads.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {architectureFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold mb-2 text-nvidia-green">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-8 py-4 rounded-lg">
              Book Demo
            </Button>
          </div>
        </div>
      </section>

      {/* AgentMesh Section */}
      <section className="py-20 px-4 bg-nvidia-gray-dark">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-nvidia-green font-semibold mb-4 block">Unified Solutions</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Central intelligence with Easy AI Labs' AgentMesh
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Easy AI Labs' AgentMesh connects all your AI agents into a central, intelligent network. By working together, these agents boost cross-functional efficiency, accelerating decision-making and execution.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {agentMeshFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold mb-2 text-nvidia-green">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-8 py-4 rounded-lg">
              Book Demo
            </Button>
          </div>
        </div>
      </section>

      {/* OGI Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <span className="text-nvidia-green font-semibold mb-4 block">For Enterprises</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Leading to<br />
            <span className="text-nvidia-green">Organizational General Intelligence (OGI)</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Easy AI Labs' enterprise-grade architecture ensures seamless scaling and performance, enabling your AI agents to operate efficiently, even under heavy workloads.
          </p>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2 text-nvidia-green">Centralized intelligence</h3>
            <p className="text-gray-300">Monitors performance across all agents to drive success.</p>
          </div>
          <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-8 py-4 rounded-lg">
            Book Demo
          </Button>
        </div>
      </section>

      {/* AI Management System Section */}
      <section className="py-20 px-4 bg-nvidia-gray-dark">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-nvidia-green font-semibold mb-4 block">For Enterprises</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The All-In-One<br />
              AI Management system for enterprises
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Easy AI Labs' AI Management System (AIMS) provides enterprises with an all-in-one platform to build, deploy, and manage AI applications at scale.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {managementFeatures.map((feature, index) => (
              <Card key={index} className="bg-nvidia-gray-medium border-nvidia-gray-light hover:border-nvidia-green transition-colors duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-nvidia-green font-semibold mb-4 block">Unified Solutions</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise-ready integrations
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Seamless connectivity with Easy AI Labs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {integrationStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-nvidia-green mb-2">{stat.number}</div>
                <h3 className="text-xl font-bold mb-2">{stat.label}</h3>
                <p className="text-gray-300">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-nvidia-gray-dark">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-nvidia-green font-semibold mb-4 block">Enterprises</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              trust Easy AI Labs to deploy<br />
              reliable AI agents
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-nvidia-gray-medium border-nvidia-gray-light">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-nvidia-green mb-2">{testimonial.metric}</div>
                    <div className="text-lg font-semibold">{testimonial.metricLabel}</div>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.content}</p>
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-gray-400">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-nvidia-green font-semibold mb-4 block">Blogs</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Resources to keep you updated
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <Card key={index} className="bg-nvidia-gray-dark border-nvidia-gray-light hover:border-nvidia-green transition-colors duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-white">{blog.title}</h3>
                  <Button variant="outline" className="border-nvidia-green text-nvidia-green hover:bg-nvidia-green hover:text-nvidia-black">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enterprise;
