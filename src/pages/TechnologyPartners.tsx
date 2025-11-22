import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Cloud,
  Brain,
  Database,
  Shield,
  Zap,
  Globe,
  Server,
  Cpu,
  Lock,
  BarChart3,
  Layers,
  Network,
  Box,
  Code,
  Settings,
  CheckCircle,
  ArrowRight,
  Building2,
  Rocket
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const TechnologyPartners = () => {
  const partnerCategories = [
    {
      title: "Cloud Infrastructure Partners",
      description: "Deploy Easy AI Labs on your preferred cloud platform with optimized performance and security.",
      icon: <Cloud className="h-10 w-10 text-nvidia-green" />,
      partners: [
        {
          name: "Amazon Web Services",
          logo: "AWS",
          description: "Enterprise-grade deployment on AWS with auto-scaling, high availability, and seamless integration with AWS AI services.",
          benefits: ["EC2 & EKS optimized", "S3 integration", "SageMaker compatible", "AWS Bedrock support"]
        },
        {
          name: "Google Cloud Platform",
          logo: "GCP",
          description: "Leverage Google's AI infrastructure with Vertex AI integration and BigQuery connectivity.",
          benefits: ["Vertex AI integration", "BigQuery analytics", "Cloud Run support", "Gemini API access"]
        },
        {
          name: "Microsoft Azure",
          logo: "Azure",
          description: "Enterprise deployment with Azure OpenAI Service integration and Active Directory support.",
          benefits: ["Azure OpenAI Service", "Active Directory SSO", "Cognitive Services", "Azure ML Studio"]
        },
        {
          name: "IBM Cloud",
          logo: "IBM",
          description: "Enterprise-ready deployment with Watson AI integration and hybrid cloud capabilities.",
          benefits: ["Watson AI integration", "Hybrid cloud ready", "Enterprise security", "IBM watsonx support"]
        }
      ]
    },
    {
      title: "AI & LLM Partners",
      description: "Access 250+ large language models from leading AI providers through our unified interface.",
      icon: <Brain className="h-10 w-10 text-nvidia-green" />,
      partners: [
        {
          name: "OpenAI",
          logo: "OpenAI",
          description: "Full integration with GPT-4, GPT-4 Turbo, and the latest OpenAI models including function calling and vision capabilities.",
          benefits: ["GPT-4 & GPT-4o", "Function calling", "Vision capabilities", "Embeddings API"]
        },
        {
          name: "Anthropic",
          logo: "Anthropic",
          description: "Claude 3 family integration with extended context windows and advanced reasoning capabilities.",
          benefits: ["Claude 3 Opus/Sonnet/Haiku", "200K context window", "Constitutional AI", "Tool use support"]
        },
        {
          name: "NVIDIA",
          logo: "NVIDIA",
          description: "NVIDIA NIM and NeMo integration for enterprise-grade AI inference and custom model training.",
          benefits: ["NVIDIA NIM", "NeMo Framework", "TensorRT-LLM", "GPU optimization"]
        },
        {
          name: "Meta AI",
          logo: "Meta",
          description: "Llama 3 integration for open-source AI deployment with fine-tuning capabilities.",
          benefits: ["Llama 3 models", "Fine-tuning support", "On-premise deployment", "Cost-effective inference"]
        },
        {
          name: "Cohere",
          logo: "Cohere",
          description: "Enterprise-focused LLMs with Command, Embed, and Rerank models for business applications.",
          benefits: ["Command models", "Embed API", "Rerank models", "Enterprise security"]
        },
        {
          name: "Mistral AI",
          logo: "Mistral",
          description: "High-performance open models with Mixtral MoE architecture for efficient inference.",
          benefits: ["Mistral Large", "Mixtral 8x7B", "Efficient inference", "European data residency"]
        }
      ]
    },
    {
      title: "Data & Vector Database Partners",
      description: "Enterprise data infrastructure for knowledge management and semantic search.",
      icon: <Database className="h-10 w-10 text-nvidia-green" />,
      partners: [
        {
          name: "Pinecone",
          logo: "Pinecone",
          description: "High-performance vector database for semantic search and RAG applications at scale.",
          benefits: ["Serverless architecture", "Real-time indexing", "Hybrid search", "Enterprise security"]
        },
        {
          name: "Weaviate",
          logo: "Weaviate",
          description: "Open-source vector database with native multi-tenancy and GraphQL support.",
          benefits: ["Multi-tenancy", "GraphQL API", "Hybrid search", "Module ecosystem"]
        },
        {
          name: "Milvus",
          logo: "Milvus",
          description: "Cloud-native vector database designed for billion-scale similarity search.",
          benefits: ["Billion-scale search", "GPU acceleration", "Cloud-native", "Open source"]
        },
        {
          name: "Qdrant",
          logo: "Qdrant",
          description: "High-performance vector search engine with advanced filtering and payload storage.",
          benefits: ["Advanced filtering", "Payload storage", "Rust performance", "On-premise option"]
        },
        {
          name: "Chroma",
          logo: "Chroma",
          description: "AI-native embedding database for LLM applications with simple developer experience.",
          benefits: ["Developer friendly", "LLM integration", "Open source", "Lightweight"]
        },
        {
          name: "MongoDB Atlas",
          logo: "MongoDB",
          description: "Document database with vector search capabilities for unified data management.",
          benefits: ["Vector search", "Document store", "Atlas Search", "Global clusters"]
        }
      ]
    },
    {
      title: "Security & Compliance Partners",
      description: "Enterprise-grade security integrations for regulated industries.",
      icon: <Shield className="h-10 w-10 text-nvidia-green" />,
      partners: [
        {
          name: "Okta",
          logo: "Okta",
          description: "Identity and access management with SSO, MFA, and lifecycle management.",
          benefits: ["SSO integration", "MFA support", "SCIM provisioning", "Lifecycle management"]
        },
        {
          name: "CrowdStrike",
          logo: "CrowdStrike",
          description: "Endpoint security and threat intelligence integration for AI workloads.",
          benefits: ["Endpoint protection", "Threat intelligence", "Cloud security", "XDR platform"]
        },
        {
          name: "Splunk",
          logo: "Splunk",
          description: "Security information and event management with AI-powered analytics.",
          benefits: ["SIEM integration", "Log analytics", "Security monitoring", "Incident response"]
        },
        {
          name: "HashiCorp Vault",
          logo: "HashiCorp",
          description: "Secrets management and encryption for securing API keys and credentials.",
          benefits: ["Secrets management", "Encryption as service", "Dynamic secrets", "PKI management"]
        }
      ]
    },
    {
      title: "Observability & Monitoring Partners",
      description: "Comprehensive monitoring and observability for AI agent operations.",
      icon: <BarChart3 className="h-10 w-10 text-nvidia-green" />,
      partners: [
        {
          name: "Datadog",
          logo: "Datadog",
          description: "Full-stack monitoring with AI/ML model performance tracking and APM.",
          benefits: ["APM integration", "ML monitoring", "Log management", "Infrastructure metrics"]
        },
        {
          name: "New Relic",
          logo: "New Relic",
          description: "Observability platform with AI-powered insights and distributed tracing.",
          benefits: ["AI monitoring", "Distributed tracing", "Error tracking", "Real-time analytics"]
        },
        {
          name: "Weights & Biases",
          logo: "W&B",
          description: "ML experiment tracking and model monitoring for AI development workflows.",
          benefits: ["Experiment tracking", "Model registry", "Artifact management", "Collaborative MLOps"]
        },
        {
          name: "LangSmith",
          logo: "LangSmith",
          description: "LLM application debugging, testing, and monitoring from LangChain.",
          benefits: ["LLM tracing", "Prompt testing", "Evaluation tools", "Production monitoring"]
        }
      ]
    },
    {
      title: "Integration & Automation Partners",
      description: "Connect Easy AI Labs with your enterprise application ecosystem.",
      icon: <Network className="h-10 w-10 text-nvidia-green" />,
      partners: [
        {
          name: "Zapier",
          logo: "Zapier",
          description: "No-code automation connecting Easy AI agents with 6,000+ applications.",
          benefits: ["6,000+ apps", "No-code workflows", "Multi-step Zaps", "Team collaboration"]
        },
        {
          name: "MuleSoft",
          logo: "MuleSoft",
          description: "Enterprise integration platform for connecting AI agents with legacy systems.",
          benefits: ["API management", "Integration flows", "Enterprise connectors", "Anypoint Platform"]
        },
        {
          name: "Workato",
          logo: "Workato",
          description: "Enterprise automation platform with AI-powered recipe recommendations.",
          benefits: ["Enterprise recipes", "AI automation", "Secure integration", "IT governance"]
        },
        {
          name: "Make (Integromat)",
          logo: "Make",
          description: "Visual automation platform for complex workflow scenarios.",
          benefits: ["Visual builder", "Complex scenarios", "Real-time execution", "Data transformation"]
        }
      ]
    }
  ];

  const partnershipBenefits = [
    {
      icon: <Rocket className="h-8 w-8 text-nvidia-green" />,
      title: "Accelerated Innovation",
      description: "Access cutting-edge AI technologies and tools to build next-generation solutions faster."
    },
    {
      icon: <Lock className="h-8 w-8 text-nvidia-green" />,
      title: "Enterprise Security",
      description: "Benefit from security-first integrations with SOC 2, HIPAA, and GDPR compliance support."
    },
    {
      icon: <Layers className="h-8 w-8 text-nvidia-green" />,
      title: "Unified Platform",
      description: "Single interface to access 250+ LLMs, multiple vector databases, and enterprise tools."
    },
    {
      icon: <Settings className="h-8 w-8 text-nvidia-green" />,
      title: "Seamless Integration",
      description: "Pre-built connectors and APIs for rapid deployment with existing enterprise systems."
    },
    {
      icon: <Globe className="h-8 w-8 text-nvidia-green" />,
      title: "Global Scale",
      description: "Deploy AI agents across multiple regions with optimized performance and data residency."
    },
    {
      icon: <Building2 className="h-8 w-8 text-nvidia-green" />,
      title: "Enterprise Support",
      description: "Dedicated support teams, SLAs, and professional services for mission-critical deployments."
    }
  ];

  const certifications = [
    { name: "SOC 2 Type II", description: "Security & availability certified" },
    { name: "ISO 27001", description: "Information security management" },
    { name: "GDPR Compliant", description: "European data protection" },
    { name: "HIPAA Ready", description: "Healthcare data compliance" },
    { name: "CSA STAR", description: "Cloud security excellence" },
    { name: "FedRAMP", description: "Government cloud ready" }
  ];

  const stats = [
    { number: "250+", label: "LLM Models", description: "Access to leading language models" },
    { number: "50+", label: "Technology Partners", description: "Enterprise integrations" },
    { number: "100+", label: "Pre-built Connectors", description: "Ready-to-use integrations" },
    { number: "99.9%", label: "Uptime SLA", description: "Enterprise reliability" }
  ];

  return (
    <div className="min-h-screen bg-nvidia-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block bg-nvidia-green text-nvidia-black px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Technology Partners
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Powered by<br />
            Industry-Leading<br />
            <span className="text-nvidia-green">Technology Partners</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Easy AI Labs integrates with the world's most trusted cloud platforms, AI providers, databases, and enterprise tools to deliver a comprehensive AI agent platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-demo">
              <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-8 py-4 rounded-lg text-lg">
                Become a Partner
              </Button>
            </Link>
            <Button variant="outline" className="border-nvidia-green text-nvidia-green hover:bg-nvidia-green hover:text-nvidia-black font-semibold px-8 py-4 rounded-lg text-lg">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-nvidia-gray-dark">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-nvidia-green mb-2">{stat.number}</div>
                <h3 className="text-xl font-bold mb-2">{stat.label}</h3>
                <p className="text-gray-300">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Categories */}
      {partnerCategories.map((category, categoryIndex) => (
        <section
          key={categoryIndex}
          className={`py-20 px-4 ${categoryIndex % 2 === 0 ? '' : 'bg-nvidia-gray-dark'}`}
        >
          <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-8">
              {category.icon}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">{category.title}</h2>
                <p className="text-gray-300 mt-2">{category.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.partners.map((partner, partnerIndex) => (
                <Card
                  key={partnerIndex}
                  className="bg-nvidia-gray-medium border-nvidia-gray-light hover:border-nvidia-green transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-nvidia-gray-dark rounded-lg flex items-center justify-center">
                        <span className="text-nvidia-green font-bold text-sm">{partner.logo}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{partner.name}</h3>
                    </div>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{partner.description}</p>
                    <div className="space-y-2">
                      {partner.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-nvidia-green flex-shrink-0" />
                          <span className="text-gray-400 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Partnership Benefits */}
      <section className="py-20 px-4 bg-nvidia-gray-dark">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-nvidia-green font-semibold mb-4 block">Why Partner With Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Technology Partnership Benefits
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join our technology ecosystem to deliver enhanced value to enterprise customers worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <Card key={index} className="bg-nvidia-gray-medium border-nvidia-gray-light hover:border-nvidia-green transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-nvidia-green font-semibold mb-4 block">Enterprise Compliance</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Security & Compliance Certifications
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our technology partnerships meet the highest standards of security and regulatory compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-nvidia-gray-dark border border-nvidia-gray-light rounded-lg p-6 text-center hover:border-nvidia-green transition-colors duration-300">
                <Shield className="h-10 w-10 text-nvidia-green mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">{cert.name}</h3>
                <p className="text-gray-400 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-nvidia-gray-dark">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to become a<br />
            <span className="text-nvidia-green">Technology Partner?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join Easy AI Labs' technology ecosystem and help enterprises build the next generation of AI agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-demo">
              <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-8 py-4 rounded-lg text-lg flex items-center gap-2">
                Apply Now <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" className="border-nvidia-green text-nvidia-green hover:bg-nvidia-green hover:text-nvidia-black font-semibold px-8 py-4 rounded-lg text-lg">
              Contact Partnership Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TechnologyPartners;
