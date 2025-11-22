import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users,
  Building2,
  Globe,
  Award,
  Target,
  Briefcase,
  GraduationCap,
  Handshake,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Clock,
  BarChart3,
  Code,
  HeadphonesIcon,
  Settings,
  BookOpen,
  Star,
  MapPin,
  Phone
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const IntegrationPartners = () => {
  const partnerTypes = [
    {
      title: "Global System Integrators",
      description: "World-class consulting and implementation partners delivering enterprise AI transformations.",
      icon: <Building2 className="h-10 w-10 text-nvidia-green" />,
      partners: [
        {
          name: "Accenture",
          tier: "Platinum Partner",
          logo: "ACN",
          description: "Global leader in digital transformation with deep AI expertise across industries. Specialized practices in GenAI, responsible AI, and enterprise automation.",
          specializations: ["Digital Transformation", "GenAI Strategy", "Change Management", "Industry Solutions"],
          regions: ["Global"],
          certifiedExperts: "500+"
        },
        {
          name: "Deloitte",
          tier: "Platinum Partner",
          logo: "DLT",
          description: "Professional services leader with extensive AI implementation experience in financial services, healthcare, and government sectors.",
          specializations: ["AI Strategy", "Risk & Compliance", "Cloud Migration", "Data Analytics"],
          regions: ["Global"],
          certifiedExperts: "450+"
        },
        {
          name: "NTT DATA",
          tier: "Gold Partner",
          logo: "NTT",
          description: "Trusted global innovator delivering AI-powered solutions with deep expertise in automotive, manufacturing, and telecommunications.",
          specializations: ["Industry 4.0", "Smart Manufacturing", "Telecom AI", "Edge Computing"],
          regions: ["Americas", "EMEA", "APAC"],
          certifiedExperts: "350+"
        },
        {
          name: "Cognizant",
          tier: "Gold Partner",
          logo: "CTSH",
          description: "Technology modernization specialist with strong AI practice focusing on healthcare, financial services, and retail transformation.",
          specializations: ["Healthcare AI", "FinTech Solutions", "Retail Intelligence", "Process Automation"],
          regions: ["Americas", "EMEA", "APAC"],
          certifiedExperts: "300+"
        },
        {
          name: "Wipro",
          tier: "Gold Partner",
          logo: "WIT",
          description: "Digital transformation partner with AI Labs and dedicated practice for enterprise AI agent implementations.",
          specializations: ["AI Labs", "Cognitive Automation", "Digital Operations", "Sustainability AI"],
          regions: ["Global"],
          certifiedExperts: "280+"
        },
        {
          name: "Infosys",
          tier: "Gold Partner",
          logo: "INFY",
          description: "Next-generation digital services leader with Infosys Topaz AI platform and extensive enterprise AI experience.",
          specializations: ["Infosys Topaz", "Generative AI", "Knowledge Management", "Digital Core"],
          regions: ["Global"],
          certifiedExperts: "320+"
        }
      ]
    },
    {
      title: "Regional System Integrators",
      description: "Specialized partners delivering localized AI implementations with regional expertise.",
      icon: <MapPin className="h-10 w-10 text-nvidia-green" />,
      partners: [
        {
          name: "HFS Research",
          tier: "Silver Partner",
          logo: "HFS",
          description: "Leading analyst and advisory firm with deep expertise in AI strategy and vendor selection for enterprise clients.",
          specializations: ["AI Advisory", "Vendor Selection", "Market Research", "Strategy Consulting"],
          regions: ["Americas", "EMEA"],
          certifiedExperts: "50+"
        },
        {
          name: "Surepeople",
          tier: "Silver Partner",
          logo: "SP",
          description: "HR technology specialist focusing on AI-powered workforce solutions and employee experience platforms.",
          specializations: ["HR Tech", "Workforce AI", "Employee Experience", "Talent Analytics"],
          regions: ["Americas"],
          certifiedExperts: "40+"
        },
        {
          name: "Uniglobe",
          tier: "Silver Partner",
          logo: "UG",
          description: "Travel and hospitality AI specialist delivering intelligent customer service and booking automation solutions.",
          specializations: ["Travel AI", "Customer Service", "Booking Automation", "Hospitality Tech"],
          regions: ["Global"],
          certifiedExperts: "60+"
        },
        {
          name: "Dairyland",
          tier: "Silver Partner",
          logo: "DL",
          description: "Insurance and financial services specialist with expertise in claims processing and underwriting automation.",
          specializations: ["Insurance AI", "Claims Automation", "Underwriting", "Risk Assessment"],
          regions: ["Americas"],
          certifiedExperts: "35+"
        }
      ]
    },
    {
      title: "Boutique AI Consultancies",
      description: "Specialized AI firms delivering focused expertise and innovative solutions.",
      icon: <Target className="h-10 w-10 text-nvidia-green" />,
      partners: [
        {
          name: "AI First Labs",
          tier: "Certified Partner",
          logo: "AFL",
          description: "Pure-play AI consultancy specializing in GenAI strategy, LLM fine-tuning, and custom agent development.",
          specializations: ["GenAI Strategy", "LLM Fine-tuning", "Custom Agents", "AI Architecture"],
          regions: ["Americas", "EMEA"],
          certifiedExperts: "25+"
        },
        {
          name: "DataRobot Services",
          tier: "Certified Partner",
          logo: "DR",
          description: "MLOps and AI implementation specialist with focus on enterprise AI operationalization.",
          specializations: ["MLOps", "Model Deployment", "AI Governance", "AutoML"],
          regions: ["Americas", "EMEA"],
          certifiedExperts: "30+"
        },
        {
          name: "Scale AI Partners",
          tier: "Certified Partner",
          logo: "SCALE",
          description: "Data labeling and AI training data specialist for enterprise AI model development.",
          specializations: ["Data Labeling", "Training Data", "RLHF", "Quality Assurance"],
          regions: ["Americas"],
          certifiedExperts: "20+"
        },
        {
          name: "Anthropic Consulting",
          tier: "Certified Partner",
          logo: "AC",
          description: "Constitutional AI and responsible AI implementation specialist for regulated industries.",
          specializations: ["Responsible AI", "AI Safety", "Constitutional AI", "Compliance"],
          regions: ["Americas", "EMEA"],
          certifiedExperts: "15+"
        }
      ]
    },
    {
      title: "Industry-Specific Partners",
      description: "Deep domain expertise partners for specialized industry implementations.",
      icon: <Briefcase className="h-10 w-10 text-nvidia-green" />,
      partners: [
        {
          name: "HealthTech AI Solutions",
          tier: "Industry Partner",
          logo: "HTA",
          description: "Healthcare AI specialist with HIPAA expertise, clinical workflow automation, and patient engagement solutions.",
          specializations: ["Clinical AI", "HIPAA Compliance", "Patient Engagement", "Medical Coding"],
          regions: ["Americas"],
          certifiedExperts: "45+"
        },
        {
          name: "FinServ Intelligence",
          tier: "Industry Partner",
          logo: "FSI",
          description: "Financial services AI leader specializing in fraud detection, risk management, and regulatory compliance.",
          specializations: ["Fraud Detection", "Risk AI", "RegTech", "Trading Intelligence"],
          regions: ["Americas", "EMEA"],
          certifiedExperts: "55+"
        },
        {
          name: "RetailAI Pro",
          tier: "Industry Partner",
          logo: "RAP",
          description: "Retail and e-commerce AI specialist with expertise in personalization, inventory, and customer service.",
          specializations: ["Personalization", "Inventory AI", "Customer Service", "Demand Forecasting"],
          regions: ["Americas", "APAC"],
          certifiedExperts: "40+"
        },
        {
          name: "ManufactureSmart",
          tier: "Industry Partner",
          logo: "MS",
          description: "Manufacturing AI expert focusing on predictive maintenance, quality control, and supply chain optimization.",
          specializations: ["Predictive Maintenance", "Quality AI", "Supply Chain", "Digital Twin"],
          regions: ["Americas", "EMEA", "APAC"],
          certifiedExperts: "50+"
        }
      ]
    }
  ];

  const partnerTiers = [
    {
      tier: "Platinum",
      color: "bg-gradient-to-r from-purple-600 to-purple-400",
      benefits: [
        "Exclusive early access to new features",
        "Dedicated partner success manager",
        "Co-marketing and go-to-market support",
        "Priority technical support (24/7)",
        "Joint solution development",
        "Revenue sharing on referred deals",
        "Executive business reviews",
        "Annual partner summit invitation"
      ],
      requirements: [
        "50+ certified professionals",
        "5+ successful implementations",
        "$1M+ annual partnership revenue",
        "Dedicated Easy AI Labs practice"
      ]
    },
    {
      tier: "Gold",
      color: "bg-gradient-to-r from-yellow-600 to-yellow-400",
      benefits: [
        "Early access to new features",
        "Partner success manager",
        "Marketing development funds",
        "Priority technical support",
        "Solution blueprints access",
        "Partner portal access",
        "Quarterly business reviews"
      ],
      requirements: [
        "25+ certified professionals",
        "3+ successful implementations",
        "$500K+ annual partnership revenue"
      ]
    },
    {
      tier: "Silver",
      color: "bg-gradient-to-r from-gray-400 to-gray-300",
      benefits: [
        "Standard feature access",
        "Technical support",
        "Partner portal access",
        "Training resources",
        "Lead registration",
        "Partner directory listing"
      ],
      requirements: [
        "10+ certified professionals",
        "1+ successful implementation",
        "$100K+ annual partnership revenue"
      ]
    },
    {
      tier: "Certified",
      color: "bg-gradient-to-r from-nvidia-green to-nvidia-green-light",
      benefits: [
        "Partner certification",
        "Technical documentation",
        "Community support",
        "Training access",
        "Partner badge usage"
      ],
      requirements: [
        "5+ certified professionals",
        "Complete partner training",
        "Pass certification exam"
      ]
    }
  ];

  const certificationProgram = [
    {
      icon: <BookOpen className="h-8 w-8 text-nvidia-green" />,
      title: "Easy AI Labs Fundamentals",
      duration: "2 days",
      description: "Core platform training covering agent creation, workflow design, and basic integrations."
    },
    {
      icon: <Code className="h-8 w-8 text-nvidia-green" />,
      title: "Developer Certification",
      duration: "3 days",
      description: "Advanced technical training on API integration, custom agent development, and LLM fine-tuning."
    },
    {
      icon: <Settings className="h-8 w-8 text-nvidia-green" />,
      title: "Architecture Certification",
      duration: "4 days",
      description: "Enterprise architecture patterns, scalability design, and security best practices."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-nvidia-green" />,
      title: "Business Certification",
      duration: "2 days",
      description: "Solution selling, use case identification, ROI calculation, and proposal development."
    }
  ];

  const successStories = [
    {
      partner: "NTT DATA",
      client: "Global Manufacturing Company",
      challenge: "Manual quality inspection causing 15% defect rate in production",
      solution: "Deployed AI-powered visual inspection agents with real-time defect detection",
      results: [
        "95% defect detection accuracy",
        "60% reduction in manual inspection time",
        "$2.5M annual cost savings",
        "ROI achieved in 6 months"
      ]
    },
    {
      partner: "Accenture",
      client: "Fortune 500 Insurance Provider",
      challenge: "Claims processing taking 14 days average with high error rates",
      solution: "Implemented intelligent claims processing agents with automated document analysis",
      results: [
        "Claims processed in 2 days average",
        "85% straight-through processing rate",
        "40% reduction in operational costs",
        "Customer satisfaction up 35%"
      ]
    },
    {
      partner: "Deloitte",
      client: "Major Healthcare Network",
      challenge: "Patient scheduling inefficiencies causing 25% no-show rate",
      solution: "Deployed conversational AI agents for appointment scheduling and reminders",
      results: [
        "No-show rate reduced to 8%",
        "50% reduction in call center volume",
        "Patient satisfaction score increased 40%",
        "$1.8M annual revenue recovered"
      ]
    }
  ];

  const partnerResources = [
    {
      icon: <GraduationCap className="h-8 w-8 text-nvidia-green" />,
      title: "Partner Academy",
      description: "Comprehensive training programs with certifications for sales, technical, and delivery teams."
    },
    {
      icon: <HeadphonesIcon className="h-8 w-8 text-nvidia-green" />,
      title: "Partner Support",
      description: "Dedicated support channels with priority response times and escalation paths."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-nvidia-green" />,
      title: "Marketing Resources",
      description: "Co-branded materials, case studies, and go-to-market playbooks for partners."
    },
    {
      icon: <Zap className="h-8 w-8 text-nvidia-green" />,
      title: "Demo Environment",
      description: "Fully-featured sandbox environments for customer demonstrations and POCs."
    }
  ];

  const stats = [
    { number: "100+", label: "Integration Partners", description: "Worldwide network" },
    { number: "5,000+", label: "Certified Experts", description: "Trained professionals" },
    { number: "500+", label: "Implementations", description: "Successful deployments" },
    { number: "50+", label: "Countries", description: "Global coverage" }
  ];

  return (
    <div className="min-h-screen bg-nvidia-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block bg-nvidia-green text-nvidia-black px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Integration Partners
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Partner with<br />
            Industry Leaders in<br />
            <span className="text-nvidia-green">AI Implementation</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Our global network of system integrators, consultants, and implementation partners helps enterprises successfully deploy and scale AI agent solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-demo">
              <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-8 py-4 rounded-lg text-lg">
                Find a Partner
              </Button>
            </Link>
            <Button variant="outline" className="border-nvidia-green text-nvidia-green hover:bg-nvidia-green hover:text-nvidia-black font-semibold px-8 py-4 rounded-lg text-lg">
              Become a Partner
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

      {/* Partner Types */}
      {partnerTypes.map((category, categoryIndex) => (
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
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-nvidia-gray-dark rounded-lg flex items-center justify-center">
                          <span className="text-nvidia-green font-bold text-sm">{partner.logo}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{partner.name}</h3>
                          <span className="text-nvidia-green text-sm">{partner.tier}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{partner.description}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {partner.specializations.map((spec, specIndex) => (
                          <span
                            key={specIndex}
                            className="bg-nvidia-gray-dark text-gray-300 text-xs px-2 py-1 rounded"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span>{partner.regions.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="h-4 w-4" />
                        <span>{partner.certifiedExperts} experts</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Partner Tiers */}
      <section className="py-20 px-4 bg-nvidia-gray-dark">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-nvidia-green font-semibold mb-4 block">Partnership Program</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Partner Tier Benefits
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Choose the partnership level that matches your organization's commitment and capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerTiers.map((tier, index) => (
              <Card key={index} className="bg-nvidia-gray-medium border-nvidia-gray-light hover:border-nvidia-green transition-colors duration-300">
                <CardContent className="p-6">
                  <div className={`inline-block px-4 py-2 rounded-full text-white text-sm font-semibold mb-4 ${tier.color}`}>
                    {tier.tier} Partner
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Benefits</h4>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-nvidia-green flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {tier.requirements.map((req, rIndex) => (
                        <li key={rIndex} className="flex items-start gap-2">
                          <Target className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-400 text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Program */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-nvidia-green font-semibold mb-4 block">Training & Certification</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Partner Certification Program
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Comprehensive training programs to build expertise in Easy AI Labs platform and solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificationProgram.map((cert, index) => (
              <Card key={index} className="bg-nvidia-gray-dark border-nvidia-gray-light hover:border-nvidia-green transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{cert.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">{cert.title}</h3>
                  <span className="inline-block bg-nvidia-gray-medium text-nvidia-green text-sm px-3 py-1 rounded-full mb-4">
                    {cert.duration}
                  </span>
                  <p className="text-gray-300 text-sm">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 bg-nvidia-gray-dark">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-nvidia-green font-semibold mb-4 block">Customer Success</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Partner Success Stories
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              See how our integration partners are delivering transformative results for enterprise customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="bg-nvidia-gray-medium border-nvidia-gray-light hover:border-nvidia-green transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-8 w-8 text-nvidia-green" />
                    <div>
                      <h3 className="font-bold text-white">{story.partner}</h3>
                      <p className="text-gray-400 text-sm">{story.client}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Challenge</h4>
                    <p className="text-gray-300 text-sm">{story.challenge}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Solution</h4>
                    <p className="text-gray-300 text-sm">{story.solution}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Results</h4>
                    <ul className="space-y-1">
                      {story.results.map((result, rIndex) => (
                        <li key={rIndex} className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-nvidia-green flex-shrink-0" />
                          <span className="text-nvidia-green text-sm font-semibold">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Resources */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-nvidia-green font-semibold mb-4 block">Partner Enablement</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Partner Resources
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Everything you need to succeed as an Easy AI Labs integration partner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerResources.map((resource, index) => (
              <Card key={index} className="bg-nvidia-gray-dark border-nvidia-gray-light hover:border-nvidia-green transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{resource.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">{resource.title}</h3>
                  <p className="text-gray-300">{resource.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-nvidia-gray-dark">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to become an<br />
                <span className="text-nvidia-green">Integration Partner?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join our growing ecosystem of implementation partners and help enterprises transform with AI agents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book-demo">
                  <Button className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-8 py-4 rounded-lg text-lg flex items-center gap-2">
                    Apply to Partner Program <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-nvidia-gray-medium border border-nvidia-gray-light rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Partnership Team</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-nvidia-green" />
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Globe className="h-6 w-6 text-nvidia-green" />
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">partners@easyailabs.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-nvidia-green" />
                  <div>
                    <p className="text-gray-400 text-sm">Headquarters</p>
                    <p className="text-white">Gandhinagar, Gujarat, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IntegrationPartners;
