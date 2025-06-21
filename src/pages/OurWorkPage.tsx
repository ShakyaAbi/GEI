import React, { useEffect, useState } from 'react';
import { Leaf, Droplets, Sun, Users, TreePine, Recycle, ArrowRight, MapPin, Calendar, TrendingUp, Award, Target, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OurWorkPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const workAreas = [
    {
      icon: Leaf,
      title: 'Climate Action',
      description: 'Implementing comprehensive climate adaptation and mitigation strategies for vulnerable communities.',
      projects: 45,
      beneficiaries: '250,000+',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
      image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: Droplets,
      title: 'Water & Sanitation',
      description: 'Ensuring access to clean water and sustainable sanitation systems for underserved communities.',
      projects: 32,
      beneficiaries: '180,000+',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: Sun,
      title: 'Renewable Energy',
      description: 'Promoting clean energy solutions for sustainable development and energy independence.',
      projects: 28,
      beneficiaries: '120,000+',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: TreePine,
      title: 'Forest Conservation',
      description: 'Protecting and restoring forest ecosystems while supporting local livelihoods.',
      projects: 38,
      beneficiaries: '300,000+',
      color: 'from-green-600 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: Users,
      title: 'Community Development',
      description: 'Empowering communities through sustainable livelihood programs and capacity building.',
      projects: 52,
      beneficiaries: '400,000+',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: Recycle,
      title: 'Waste Management',
      description: 'Developing circular economy solutions and innovative waste reduction strategies.',
      projects: 24,
      beneficiaries: '90,000+',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const featuredProjects = [
    {
      title: 'Nepal Climate Resilience Program',
      location: 'Nepal',
      duration: '2020 - 2025',
      status: 'Active',
      description: 'Supporting 15,000 farmers in adapting to climate change through sustainable agriculture practices, water management systems, and climate-smart technologies.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      impact: {
        primary: '15,000 farmers supported',
        secondary: ['50% increase in crop yields', '30% reduction in water usage', '200 water harvesting systems built']
      },
      sdgs: [1, 2, 6, 13, 15],
      budget: '$2.5M',
      partners: ['Government of Nepal', 'Local NGOs', 'Farmer Cooperatives']
    },
    {
      title: 'India Clean Energy Initiative',
      location: 'Rajasthan, India',
      duration: '2019 - 2024',
      status: 'Active',
      description: 'Installing solar power systems in rural communities, providing clean energy access to over 50,000 people while creating local employment opportunities.',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80',
      impact: {
        primary: '50,000 people with clean energy',
        secondary: ['80% reduction in energy costs', '500 jobs created', '15,000 tons CO2 avoided annually']
      },
      sdgs: [7, 8, 11, 13],
      budget: '$3.2M',
      partners: ['State Government', 'Solar Companies', 'Microfinance Institutions']
    },
    {
      title: 'Cambodia Water Security Project',
      location: 'Siem Reap, Cambodia',
      duration: '2018 - 2023',
      status: 'Completed',
      description: 'Building sustainable water infrastructure and training local communities in water management and conservation practices.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80',
      impact: {
        primary: '25,000 people with clean water',
        secondary: ['90% reduction in waterborne diseases', '300 community water points', '150 local technicians trained']
      },
      sdgs: [3, 6, 11, 17],
      budget: '$1.8M',
      partners: ['Ministry of Water Resources', 'UNICEF', 'Local Communities']
    }
  ];

  const impactStats = [
    { number: '1.2M+', label: 'Lives Impacted', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { number: '219', label: 'Active Projects', icon: Target, color: 'from-emerald-500 to-teal-500' },
    { number: '52', label: 'Countries', icon: MapPin, color: 'from-purple-500 to-indigo-500' },
    { number: '850+', label: 'Local Partners', icon: Award, color: 'from-orange-500 to-red-500' }
  ];

  const sdgColors: { [key: number]: string } = {
    1: 'bg-red-500',
    2: 'bg-yellow-500',
    3: 'bg-green-500',
    6: 'bg-blue-500',
    7: 'bg-yellow-600',
    8: 'bg-red-600',
    11: 'bg-orange-500',
    13: 'bg-green-600',
    15: 'bg-green-700',
    17: 'bg-blue-700'
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'projects', label: 'Featured Projects', icon: Award },
    { id: 'impact', label: 'Impact Stories', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="text-center reveal">
            <h1 className="text-4xl lg:text-6xl font-bold font-playfair text-gray-900 mb-6">
              Our <span className="gradient-text">Work</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Creating sustainable solutions that transform communities and protect our planet 
              through innovative programs and collaborative partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 motion-pulse`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-gray-50 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-center">
            <div className="flex bg-white rounded-full p-2 shadow-lg border border-gray-200">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-20">
        {activeTab === 'overview' && (
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-16 reveal">
              <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Our Focus Areas</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We work across multiple sectors to create comprehensive solutions for environmental 
                and social challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workAreas.map((area, index) => {
                const IconComponent = area.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover-lift border border-gray-100 reveal"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={area.image}
                        alt={area.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${area.color} rounded-xl flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 font-playfair group-hover:text-teal-700 transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{area.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <div className="font-medium">{area.projects} Projects</div>
                          <div className="text-teal-600 font-semibold">{area.beneficiaries} Beneficiaries</div>
                        </div>
                        <div className={`h-1 w-12 bg-gradient-to-r ${area.color} rounded-full`}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-16 reveal">
              <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Featured Projects</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Highlighting some of our most impactful initiatives across Nepal, India, and Cambodia.
              </p>
            </div>

            <div className="space-y-12">
              {featuredProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover-lift border border-gray-100 reveal"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                      <div className="absolute top-6 left-6 flex items-center gap-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          project.status === 'Active' 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {project.status}
                        </span>
                        <span className="px-3 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full border border-white/50">
                          {project.budget}
                        </span>
                      </div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-medium">{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{project.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8 lg:p-12">
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-playfair">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                        {project.description}
                      </p>
                      
                      {/* Primary Impact */}
                      <div className="mb-6">
                        <div className="text-2xl font-bold gradient-text mb-2">
                          {project.impact.primary}
                        </div>
                        <div className="space-y-1">
                          {project.impact.secondary.map((impact, impactIndex) => (
                            <div key={impactIndex} className="flex items-center text-sm text-gray-600">
                              <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                              {impact}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* SDGs */}
                      <div className="mb-6">
                        <div className="text-sm font-medium text-gray-700 mb-2">Contributing to SDGs:</div>
                        <div className="flex gap-2">
                          {project.sdgs.map((sdg) => (
                            <div
                              key={sdg}
                              className={`w-8 h-8 ${sdgColors[sdg]} rounded-lg flex items-center justify-center text-white text-xs font-bold`}
                            >
                              {sdg}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Partners */}
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Key Partners:</div>
                        <div className="flex flex-wrap gap-2">
                          {project.partners.map((partner, partnerIndex) => (
                            <span
                              key={partnerIndex}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200"
                            >
                              {partner}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-16 reveal">
              <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Impact Stories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Real stories from communities whose lives have been transformed through our programs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Story 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal">
                <div className="flex items-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Farmer portrait"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Ram Bahadur Thapa</h4>
                    <p className="text-gray-600 text-sm">Farmer, Sindhupalchok, Nepal</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed mb-4">
                  "Before GEI's climate resilience program, our crops would fail every other year due to unpredictable weather. 
                  Now, with the new water harvesting system and climate-smart farming techniques, our family has food security 
                  and even surplus to sell in the market."
                </blockquote>
                <div className="flex items-center text-sm text-teal-600 font-medium">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  300% increase in annual income
                </div>
              </div>

              {/* Story 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80"
                    alt="Woman entrepreneur"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Sunita Devi</h4>
                    <p className="text-gray-600 text-sm">Solar Entrepreneur, Rajasthan, India</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed mb-4">
                  "The solar energy project didn't just bring electricity to our village - it gave me a business opportunity. 
                  I now manage the community solar grid and have trained 20 other women to become solar technicians. 
                  We're not just consumers anymore, we're energy entrepreneurs."
                </blockquote>
                <div className="flex items-center text-sm text-teal-600 font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  20 women trained as solar technicians
                </div>
              </div>

              {/* Story 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
                    alt="Community leader"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Sophea Chea</h4>
                    <p className="text-gray-600 text-sm">Village Chief, Siem Reap, Cambodia</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed mb-4">
                  "Clean water changed everything for our community. Children no longer miss school due to waterborne illnesses, 
                  and women don't have to walk hours to fetch water. The water committee we formed now manages three villages, 
                  and we've become a model for the entire province."
                </blockquote>
                <div className="flex items-center text-sm text-teal-600 font-medium">
                  <Droplets className="w-4 h-4 mr-2" />
                  90% reduction in waterborne diseases
                </div>
              </div>

              {/* Story 4 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
                    alt="Young researcher"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Dr. Priya Sharma</h4>
                    <p className="text-gray-600 text-sm">Environmental Researcher, Delhi, India</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed mb-4">
                  "Working with GEI on the air quality monitoring project opened my eyes to community-based research. 
                  We're not just collecting data - we're empowering communities to understand and address their own 
                  environmental challenges. This is science with purpose."
                </blockquote>
                <div className="flex items-center text-sm text-teal-600 font-medium">
                  <Award className="w-4 h-4 mr-2" />
                  50 community monitors trained
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center text-white relative reveal">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair mb-6">Join Our Mission</h2>
          <p className="text-xl text-teal-100 mb-8 leading-relaxed">
            Partner with us to create lasting environmental and social impact. 
            Together, we can build a more sustainable and equitable world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-teal-700 font-semibold rounded-full hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Become a Partner
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-teal-700 transition-all duration-300 transform hover:scale-105">
              Support Our Work
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurWorkPage;