import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Zap, CheckCircle2, Mail, Phone, Building2, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Form validation schema
const demoFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name is required'),
  jobTitle: z.string().min(2, 'Job title is required'),
  companySize: z.string().min(1, 'Please select company size'),
  useCase: z.string().min(10, 'Please describe your use case (at least 10 characters)'),
});

type DemoFormData = z.infer<typeof demoFormSchema>;

const BookDemo = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
  });

  const onSubmit = async (data: DemoFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);
    setIsSubmitted(true);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-nvidia-black via-nvidia-gray-dark to-nvidia-black pt-24">
        <div className="container mx-auto px-4 py-16">
          {!isSubmitted ? (
            <div className="max-w-6xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-2 bg-nvidia-green/10 rounded-full mb-4">
                  <Calendar className="h-6 w-6 text-nvidia-green" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Book a <span className="text-nvidia-green">Demo</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  See how Easy AI Labs can transform your business with intelligent AI agents.
                  Schedule a personalized demo with our team.
                </p>
              </div>

              {/* Benefits Section */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-nvidia-gray-dark/50 border border-nvidia-gray-medium rounded-lg p-6 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-nvidia-green/10 rounded-lg">
                      <Zap className="h-5 w-5 text-nvidia-green" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Personalized Demo</h3>
                  </div>
                  <p className="text-gray-400">
                    Tailored to your specific industry and use case requirements
                  </p>
                </div>

                <div className="bg-nvidia-gray-dark/50 border border-nvidia-gray-medium rounded-lg p-6 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-nvidia-green/10 rounded-lg">
                      <Users className="h-5 w-5 text-nvidia-green" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Expert Guidance</h3>
                  </div>
                  <p className="text-gray-400">
                    Connect with our AI specialists who understand your challenges
                  </p>
                </div>

                <div className="bg-nvidia-gray-dark/50 border border-nvidia-gray-medium rounded-lg p-6 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-nvidia-green/10 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-nvidia-green" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Quick Setup</h3>
                  </div>
                  <p className="text-gray-400">
                    See how fast you can deploy AI agents in your workflow
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <div className="bg-nvidia-gray-dark/80 border border-nvidia-gray-medium rounded-2xl p-8 md:p-12 backdrop-blur-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="flex items-center space-x-2 text-sm font-medium text-gray-200 mb-2">
                        <User className="h-4 w-4 text-nvidia-green" />
                        <span>First Name *</span>
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        {...register('firstName')}
                        className="w-full px-4 py-3 bg-nvidia-gray-medium border border-nvidia-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nvidia-green focus:border-transparent transition-all"
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="flex items-center space-x-2 text-sm font-medium text-gray-200 mb-2">
                        <User className="h-4 w-4 text-nvidia-green" />
                        <span>Last Name *</span>
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        {...register('lastName')}
                        className="w-full px-4 py-3 bg-nvidia-gray-medium border border-nvidia-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nvidia-green focus:border-transparent transition-all"
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="flex items-center space-x-2 text-sm font-medium text-gray-200 mb-2">
                        <Mail className="h-4 w-4 text-nvidia-green" />
                        <span>Work Email *</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className="w-full px-4 py-3 bg-nvidia-gray-medium border border-nvidia-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nvidia-green focus:border-transparent transition-all"
                        placeholder="john.doe@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="flex items-center space-x-2 text-sm font-medium text-gray-200 mb-2">
                        <Phone className="h-4 w-4 text-nvidia-green" />
                        <span>Phone Number *</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        className="w-full px-4 py-3 bg-nvidia-gray-medium border border-nvidia-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nvidia-green focus:border-transparent transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="flex items-center space-x-2 text-sm font-medium text-gray-200 mb-2">
                        <Building2 className="h-4 w-4 text-nvidia-green" />
                        <span>Company Name *</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        {...register('company')}
                        className="w-full px-4 py-3 bg-nvidia-gray-medium border border-nvidia-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nvidia-green focus:border-transparent transition-all"
                        placeholder="Acme Corporation"
                      />
                      {errors.company && (
                        <p className="mt-1 text-sm text-red-400">{errors.company.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="jobTitle" className="flex items-center space-x-2 text-sm font-medium text-gray-200 mb-2">
                        <User className="h-4 w-4 text-nvidia-green" />
                        <span>Job Title *</span>
                      </label>
                      <input
                        id="jobTitle"
                        type="text"
                        {...register('jobTitle')}
                        className="w-full px-4 py-3 bg-nvidia-gray-medium border border-nvidia-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nvidia-green focus:border-transparent transition-all"
                        placeholder="Chief Technology Officer"
                      />
                      {errors.jobTitle && (
                        <p className="mt-1 text-sm text-red-400">{errors.jobTitle.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Company Size */}
                  <div>
                    <label htmlFor="companySize" className="flex items-center space-x-2 text-sm font-medium text-gray-200 mb-2">
                      <Users className="h-4 w-4 text-nvidia-green" />
                      <span>Company Size *</span>
                    </label>
                    <select
                      id="companySize"
                      {...register('companySize')}
                      className="w-full px-4 py-3 bg-nvidia-gray-medium border border-nvidia-gray-light rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-nvidia-green focus:border-transparent transition-all"
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                    {errors.companySize && (
                      <p className="mt-1 text-sm text-red-400">{errors.companySize.message}</p>
                    )}
                  </div>

                  {/* Use Case */}
                  <div>
                    <label htmlFor="useCase" className="flex items-center space-x-2 text-sm font-medium text-gray-200 mb-2">
                      <Zap className="h-4 w-4 text-nvidia-green" />
                      <span>Tell us about your use case *</span>
                    </label>
                    <textarea
                      id="useCase"
                      {...register('useCase')}
                      rows={4}
                      className="w-full px-4 py-3 bg-nvidia-gray-medium border border-nvidia-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nvidia-green focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your specific requirements and what you'd like to achieve with AI agents..."
                    />
                    {errors.useCase && (
                      <p className="mt-1 text-sm text-red-400">{errors.useCase.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Schedule Your Demo'
                      )}
                    </Button>
                  </div>

                  <p className="text-center text-sm text-gray-400">
                    By submitting this form, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              </div>
            </div>
          ) : (
            // Success Message
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-nvidia-gray-dark/80 border border-nvidia-green/30 rounded-2xl p-12 backdrop-blur-md">
                <div className="inline-flex items-center justify-center p-4 bg-nvidia-green/10 rounded-full mb-6">
                  <CheckCircle2 className="h-12 w-12 text-nvidia-green" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Thank You for Your Interest!
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  We've received your demo request and our team will reach out to you within 24 hours to schedule a personalized demo.
                </p>
                <div className="bg-nvidia-gray-medium/50 border border-nvidia-gray-light rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">What happens next?</h3>
                  <ul className="space-y-2 text-gray-300 text-left">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-nvidia-green mt-0.5 flex-shrink-0" />
                      <span>Our team will review your use case</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-nvidia-green mt-0.5 flex-shrink-0" />
                      <span>You'll receive a calendar invite for a demo session</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-nvidia-green mt-0.5 flex-shrink-0" />
                      <span>We'll prepare a customized demo tailored to your needs</span>
                    </li>
                  </ul>
                </div>
                <Button
                  onClick={() => window.location.href = '/'}
                  className="bg-nvidia-gradient hover:bg-nvidia-gradient-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Return to Home
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookDemo;
