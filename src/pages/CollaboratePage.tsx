import React, { useState } from 'react';
import { Heart, Users, Globe, Zap, Mail, Phone, MapPin, ArrowRight, CheckCircle, Star, Award, Target, Handshake, DollarSign, CreditCard, Building, UserCheck, Send } from 'lucide-react';
import Footer from '../components/Footer';

const CollaboratePage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [collaborationForm, setCollaborationForm] = useState({
    name: '',
    email: '',
    organization: '',
    type: '',
    message: ''
  });

  const donationAmounts = [25, 50, 100, 250, 500, 1000];
  
  const collaborationTypes = [
    {
      title: 'Research Partnership',
      description: 'Collaborate on cutting-edge environmental and health research projects',
      icon: Target,
      benefits: ['Joint publications', 'Shared resources', 'Global network access']
    },
    {
      title: 'Corporate Partnership',
      description: 'Partner with us to create sustainable business solutions',
      icon: Building,
      benefits: ['CSR alignment', 'Brand visibility', 'Impact measurement']
    },
    {
      title: 'Volunteer Program',
      description: 'Join our global network of passionate volunteers',
      icon: Users,
      benefits: ['Skill development', 'Global community', 'Meaningful impact']
    },
    {
      title: 'Academic Collaboration',
      description: 'Work with our faculty on innovative research initiatives',
      icon: Award,
      benefits: ['Student exchanges', 'Research grants', 'Publication opportunities']
    }
  ];

  const impactAreas = [
    {
      title: 'Environmental Health',
      description: 'Clean water systems, air quality improvement, and waste management',
      icon: Globe,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Community Health',
      description: 'Maternal care, child health, and healthcare capacity building',
      icon: Heart,
      color: 'from-pink-500 to-rose-600'
    },
    {
      title: 'Economic Development',
      description: 'Green jobs, sustainable livelihoods, and community empowerment',
      icon: Zap,
      color: 'from-blue-500 to-indigo-600'
    }
  ];

  const handleDonation = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      alert('Please select or enter a valid donation amount');
      return;
    }

    // Redirect to Stripe setup page as per instructions
    window.open('https://bolt.new/setup/stripe', '_blank');
  };

  const handleCollaborationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle collaboration form submission
    console.log('Collaboration form submitted:', collaborationForm);
    alert('Thank you for your interest! We will contact you soon.');
    setCollaborationForm({
      name: '',
      email: '',
      organization: '',
      type: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-green-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold font-playfair text-gray-900 mb-6">
              Join Our <span className="gradient-text">Mission</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Partner with us to create lasting environmental and health impact. Whether through collaboration, 
              donation, or volunteering, your support drives meaningful change worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('collaborate')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-8 py-4 text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 text-lg font-medium rounded-xl border-2 border-blue-200 hover:border-transparent transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <Handshake className="w-5 h-5 mr-2" />
                Collaborate
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
              Where Your Support Makes Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your contributions directly fund innovative programs that transform communities and protect our planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${area.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-playfair">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
              Support Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Your donation directly funds life-changing programs in environmental health, 
              community development, and sustainable innovation.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            {/* Donation Type Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-full p-1 flex">
                <button
                  onClick={() => setDonationType('one-time')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    donationType === 'one-time'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  One-time
                </button>
                <button
                  onClick={() => setDonationType('monthly')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    donationType === 'monthly'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Donation Amounts */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {donationAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`p-4 rounded-xl border-2 font-semibold transition-all duration-300 ${
                    selectedAmount === amount
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 text-gray-700'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or enter a custom amount:
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  min="1"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            {/* Impact Statement */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border border-green-100">
              <h3 className="font-bold text-green-800 mb-2">Your Impact:</h3>
              <p className="text-green-700">
                ${selectedAmount || customAmount || '0'} can provide clean water access for 5 families, 
                train 2 community health workers, or support 1 month of maternal care programs.
              </p>
            </div>

            {/* Donate Button */}
            <button
              onClick={handleDonation}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
            >
              <CreditCard className="w-6 h-6 mr-3" />
              Donate ${selectedAmount || customAmount || '0'} {donationType === 'monthly' ? '/month' : ''}
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Secure payment processing powered by Stripe. Your donation is tax-deductible.
            </p>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section id="collaborate" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
              Collaborate With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our global network of partners, researchers, and changemakers working together 
              to create sustainable solutions for environmental and health challenges.
            </p>
          </div>

          {/* Collaboration Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {collaborationTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 group"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 font-playfair">
                      {type.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {type.description}
                  </p>
                  <div className="space-y-2">
                    {type.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Collaboration Form */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">
                  Start a Collaboration
                </h3>
                <p className="text-gray-600">
                  Tell us about your organization and how you'd like to work together.
                </p>
              </div>

              <form onSubmit={handleCollaborationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={collaborationForm.name}
                      onChange={(e) => setCollaborationForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={collaborationForm.email}
                      onChange={(e) => setCollaborationForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={collaborationForm.organization}
                    onChange={(e) => setCollaborationForm(prev => ({ ...prev, organization: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your organization or institution"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collaboration Type *
                  </label>
                  <select
                    required
                    value={collaborationForm.type}
                    onChange={(e) => setCollaborationForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select collaboration type</option>
                    <option value="research">Research Partnership</option>
                    <option value="corporate">Corporate Partnership</option>
                    <option value="volunteer">Volunteer Program</option>
                    <option value="academic">Academic Collaboration</option>
                    <option value="funding">Funding Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={collaborationForm.message}
                    onChange={(e) => setCollaborationForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your collaboration idea, goals, and how we can work together..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  <Send className="w-5 h-5 mr-3" />
                  Send Collaboration Request
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to make a difference? Contact us to discuss partnership opportunities, 
              volunteer programs, or learn more about our work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-playfair">Email Us</h3>
              <p className="text-gray-600 mb-4">Get in touch for partnerships and collaborations</p>
              <a
                href="mailto:partnerships@gei.org"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                partnerships@gei.org
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-playfair">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak directly with our partnership team</p>
              <a
                href="tel:+15551234567"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                +1 (555) 123-4567
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-playfair">Visit Us</h3>
              <p className="text-gray-600 mb-4">Our headquarters and main office</p>
              <p className="text-blue-600 font-medium">
                123 Environmental Way<br />
                Green City, GC 12345
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center text-white relative">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair mb-6">
            Together, We Can Change the World
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Every donation, every partnership, every volunteer hour contributes to a more sustainable 
            and equitable future. Join us in creating lasting positive impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <Heart className="w-5 h-5 mr-2" />
              Make a Donation
            </button>
            <button
              onClick={() => document.getElementById('collaborate')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Handshake className="w-5 h-5 mr-2" />
              Start Collaborating
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollaboratePage;