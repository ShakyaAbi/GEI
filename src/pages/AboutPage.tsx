import React from 'react';
import { Target, Eye, Users, Lightbulb, Award, Heart, Globe, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      title: 'Executive Director',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Leading environmental scientist with 15+ years of experience in sustainable development.'
    },
    {
      name: 'Michael Rodriguez',
      title: 'Program Director',
      image: 'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Expert in international development and community-based environmental programs.'
    },
    {
      name: 'Dr. Emma Thompson',
      title: 'Research Director',
      image: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Climate scientist specializing in adaptation strategies and policy development.'
    },
    {
      name: 'James Wilson',
      title: 'Operations Director',
      image: 'https://images.pexels.com/photos/3785074/pexels-photo-3785074.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Operations expert ensuring efficient program delivery across multiple countries.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We approach every challenge with empathy and understanding for communities and ecosystems.'
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'We think globally while acting locally, understanding interconnected environmental challenges.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace creative solutions and cutting-edge approaches to environmental problems.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of partnerships and community-driven solutions.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in all our programs and research initiatives.'
    },
    {
      icon: Zap,
      title: 'Impact',
      description: 'We focus on measurable, sustainable change that transforms lives and environments.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-700 to-blue-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About GEI</h1>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
              Transforming communities and environments through innovative, sustainable solutions 
              that create lasting positive impact across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-6">
                    <Target className="w-8 h-8 text-green-700" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To create sustainable environmental solutions that empower communities, 
                  protect ecosystems, and drive positive change through innovative research, 
                  collaborative partnerships, and community-centered approaches.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-6">
                    <Eye className="w-8 h-8 text-blue-700" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  A world where environmental sustainability and human prosperity coexist, 
                  where communities are resilient and empowered, and where innovative 
                  solutions create lasting positive impact for generations to come.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core principles guide everything we do and shape our approach to creating positive change.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Leadership Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the dedicated leaders driving our mission forward with expertise, passion, and vision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-green-600 font-semibold mb-3">{member.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <p className="text-xl text-gray-600">
                From humble beginnings to global impact - the story of GEI's growth and evolution.
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-700 font-bold">2010</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Foundation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    GEI was founded with a vision to address pressing environmental challenges through 
                    innovative, community-centered solutions. Our first project launched in Nepal, 
                    focusing on sustainable agriculture practices.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-bold">2015</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Expansion</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Expanded operations to India and Cambodia, establishing key partnerships with 
                    local organizations and governments. Launched our first major climate adaptation 
                    program serving over 10,000 families.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-700 font-bold">2020</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Innovation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Launched our research and innovation hub, developing cutting-edge solutions 
                    for environmental challenges. Established partnerships with leading universities 
                    and research institutions worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-700 font-bold">2024</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Global Impact</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Today, GEI operates in over 50 countries, has impacted more than 1 million lives, 
                    and continues to pioneer innovative solutions for environmental sustainability 
                    and community resilience.
                  </p>
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

export default AboutPage;