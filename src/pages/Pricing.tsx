
import { Check, X, Star, Zap, Crown, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for small teams getting started with AI agents",
      icon: <Zap className="h-6 w-6 text-nvidia-green" />,
      popular: false,
      features: [
        "Up to 3 AI agents",
        "5,000 agent interactions/month",
        "Basic integrations (Email, Slack)",
        "Community support",
        "Agent performance analytics",
        "Standard security",
        "API access (100 calls/day)",
        "Basic customization",
      ],
      limitations: [
        "No custom integrations",
        "Limited to 3 team members",
        "Basic reporting only",
        "No priority support",
      ]
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      description: "Ideal for growing businesses scaling their AI operations",
      icon: <Star className="h-6 w-6 text-nvidia-green" />,
      popular: true,
      features: [
        "Up to 10 AI agents",
        "25,000 agent interactions/month",
        "Advanced integrations (CRM, ERP, Custom APIs)",
        "Priority email & chat support",
        "Advanced analytics & reporting",
        "Enhanced security & compliance",
        "API access (1,000 calls/day)",
        "Custom agent training",
        "Multi-language support",
        "Workflow automation",
        "Team collaboration tools",
        "Custom branding",
      ],
      limitations: [
        "Limited custom model training",
        "Standard SLA (99.5% uptime)",
      ]
    },
    {
      name: "Enterprise",
      price: "$999",
      period: "/month",
      description: "Comprehensive solution for large organizations",
      icon: <Building className="h-6 w-6 text-nvidia-green" />,
      popular: false,
      features: [
        "Unlimited AI agents",
        "100,000 agent interactions/month",
        "Enterprise integrations & SSO",
        "24/7 dedicated support",
        "Advanced security (SOC2, HIPAA)",
        "Custom model training & fine-tuning",
        "Unlimited API access",
        "On-premise deployment option",
        "Custom development support",
        "Advanced compliance tools",
        "Multi-tenant architecture",
        "Dedicated account manager",
        "Custom SLA (99.9% uptime)",
        "White-label solutions",
        "Advanced audit logs",
      ],
      limitations: []
    },
    {
      name: "Enterprise Plus",
      price: "$2,499",
      period: "/month",
      description: "Ultimate AI solution for mission-critical operations",
      icon: <Crown className="h-6 w-6 text-nvidia-green" />,
      popular: false,
      features: [
        "Unlimited everything",
        "500,000+ agent interactions/month",
        "Custom enterprise integrations",
        "24/7 premium support with SLA",
        "Maximum security & compliance",
        "Fully custom AI model development",
        "Dedicated infrastructure",
        "On-premise or private cloud",
        "Custom feature development",
        "Advanced AI research collaboration",
        "Multi-region deployment",
        "Disaster recovery & backup",
        "99.99% uptime guarantee",
        "Executive support & training",
        "Custom contract terms",
        "Revenue sharing opportunities",
      ],
      limitations: []
    }
  ];

  const additionalFeatures = [
    {
      category: "Agent Types",
      description: "Choose from our specialized AI agents",
      items: [
        "Jazon - AI SDR for sales automation",
        "Skott - AI Marketer for campaign management",
        "Dwight - AI RFP Scout for proposal management",
        "Diane - AI HR agent for talent management",
        "Kathy - AI Competitor Analyst",
        "Jeff - AI Support agent for customer service"
      ]
    },
    {
      category: "Industry Solutions",
      description: "Tailored solutions for your industry",
      items: [
        "Banking & Financial Services",
        "Healthcare & Life Sciences",
        "Retail & E-commerce",
        "Manufacturing & Supply Chain",
        "Real Estate & Property Management",
        "Legal Services & Compliance"
      ]
    },
    {
      category: "Platform Features",
      description: "Powerful platform capabilities",
      items: [
        "Agent Studio - Visual agent builder",
        "Responsible AI - Ethical AI guidelines",
        "OGI - Omnichannel Generation Interface",
        "Multi-agent orchestration",
        "Voice agent capabilities",
        "SQL agent for database interactions"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-nvidia-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Choose Your <span className="text-nvidia-green">AI Journey</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Scale your business with our comprehensive AI agent platform. From startups to enterprise, 
            we have the perfect plan to accelerate your AI transformation.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`relative bg-nvidia-gray-dark border-nvidia-gray-medium hover:border-nvidia-green transition-all duration-300 ${
                  plan.popular ? 'border-nvidia-green scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-nvidia-green text-nvidia-black px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-sm mb-4">
                    {plan.description}
                  </CardDescription>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-nvidia-green">
                      {plan.price}
                    </span>
                    <span className="text-gray-300 text-lg">
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button 
                    className={`w-full mb-6 ${
                      plan.popular 
                        ? 'bg-nvidia-green hover:bg-nvidia-green-dark text-nvidia-black' 
                        : 'bg-nvidia-gray-medium hover:bg-nvidia-gray-light text-white'
                    }`}
                  >
                    {plan.name === "Enterprise Plus" ? "Contact Sales" : "Start Free Trial"}
                  </Button>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-nvidia-green mb-2">Included:</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-nvidia-green mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}

                    {plan.limitations.length > 0 && (
                      <>
                        <h4 className="font-semibold text-red-400 mb-2 mt-4">Limitations:</h4>
                        {plan.limitations.map((limitation, limitIndex) => (
                          <div key={limitIndex} className="flex items-start space-x-2">
                            <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-400">{limitation}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 px-4 bg-nvidia-gray-dark">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            What's Included in <span className="text-nvidia-green">Every Plan</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="bg-nvidia-black border-nvidia-gray-medium">
                <CardHeader>
                  <CardTitle className="text-xl text-nvidia-green">
                    {feature.category}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-nvidia-green mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked <span className="text-nvidia-green">Questions</span>
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "Can I upgrade or downgrade my plan anytime?",
                answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle."
              },
              {
                question: "What happens if I exceed my agent interaction limits?",
                answer: "We'll notify you when you're approaching your limit. You can upgrade your plan or purchase additional interactions as needed."
              },
              {
                question: "Do you offer custom pricing for large enterprises?",
                answer: "Yes, we offer custom pricing and solutions for large enterprises with specific requirements. Contact our sales team for a tailored quote."
              },
              {
                question: "Is there a free trial available?",
                answer: "Yes, all plans come with a 14-day free trial. No credit card required to get started."
              },
              {
                question: "What kind of support do you provide?",
                answer: "Support varies by plan: Community support for Starter, Priority support for Professional, and 24/7 dedicated support for Enterprise plans."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-nvidia-gray-dark border-nvidia-gray-medium">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-nvidia-gradient">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using Easy AI Labs to automate their operations and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-nvidia-black hover:bg-gray-200 font-semibold px-8 py-3">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-nvidia-black font-semibold px-8 py-3">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
