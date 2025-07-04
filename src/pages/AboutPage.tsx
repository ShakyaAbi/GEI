import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Target, Eye, Users, Lightbulb, Award, Heart, Globe, Zap, Calendar, MapPin, Mail, Linkedin, Twitter, ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const AboutPage = () => {
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    // Handle hash-based scrolling
    if (location.hash) {
      const elementId = location.hash.substring(1); // Remove the '#'
      const element = document.getElementById(elementId);
      if (element) {
        // Small delay to ensure the page is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

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

  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      title: 'Executive Director & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80',
      bio: 'Leading environmental scientist with 15+ years of experience in sustainable development and climate adaptation strategies.',
      expertise: ['Climate Science', 'Policy Development', 'International Relations'],
      education: 'PhD Environmental Science, Stanford University',
      social: {
        email: 'sarah.chen@gei.org',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Michael Rodriguez',
      title: 'Program Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      bio: 'Expert in international development and community-based environmental programs with extensive field experience.',
      expertise: ['Program Management', 'Community Development', 'Sustainable Agriculture'],
      education: 'MS Development Studies, Oxford University',
      social: {
        email: 'michael.rodriguez@gei.org',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Dr. Emma Thompson',
      title: 'Research Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
      bio: 'Climate scientist specializing in adaptation strategies and environmental health policy development.',
      expertise: ['Climate Research', 'Environmental Health', 'Data Analytics'],
      education: 'PhD Climate Science, MIT',
      social: {
        email: 'emma.thompson@gei.org',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'James Wilson',
      title: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Operations expert ensuring efficient program delivery across multiple countries and diverse communities.',
      expertise: ['Operations Management', 'Logistics', 'Quality Assurance'],
      education: 'MBA Operations Management, Wharton',
      social: {
        email: 'james.wilson@gei.org',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Dr. Priya Patel',
      title: 'Technology Innovation Lead',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      bio: 'Technology innovator developing digital solutions for environmental monitoring and community engagement.',
      expertise: ['Environmental Technology', 'Digital Innovation', 'Data Science'],
      education: 'PhD Computer Science, Carnegie Mellon',
      social: {
        email: 'priya.patel@gei.org',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Dr. Ahmed Hassan',
      title: 'Regional Director - MENA',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      bio: 'Regional expert leading environmental initiatives across the Middle East and North Africa region.',
      expertise: ['Regional Development', 'Water Security', 'Desert Ecology'],
      education: 'PhD Environmental Engineering, AUC',
      social: {
        email: 'ahmed.hassan@gei.org',
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We approach every challenge with empathy and understanding for communities and ecosystems, ensuring that human dignity and environmental stewardship guide our every action.'
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'We think globally while acting locally, understanding the interconnected nature of environmental challenges and their impact across borders and communities.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace creative solutions and cutting-edge approaches to environmental problems, fostering a culture of continuous learning and breakthrough thinking.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of partnerships and community-driven solutions, recognizing that lasting change comes through collective action and shared responsibility.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in all our programs and research initiatives, ensuring quality, integrity, and measurable impact in everything we do.'
    },
    {
      icon: Zap,
      title: 'Impact',
      description: 'We focus on measurable, sustainable change that transforms lives and environments, prioritizing long-term solutions over short-term fixes.'
    }
  ];

  const milestones = [
    {
      year: '2010',
      title: 'Foundation',
      description: 'GEI was founded with a vision to address pressing environmental challenges through innovative, community-centered solutions. Our first project launched in Nepal, focusing on sustainable agriculture practices.',
      impact: 'First 1,000 farmers reached',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      year: '2013',
      title: 'Regional Expansion',
      description: 'Expanded operations to India, establishing key partnerships with local organizations and governments. Launched our first major water security program.',
      impact: '5 countries, 10,000 beneficiaries',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      year: '2016',
      title: 'Technology Integration',
      description: 'Integrated cutting-edge technology into our programs, including satellite monitoring and mobile data collection systems for better impact measurement.',
      impact: 'Digital transformation completed',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      year: '2018',
      title: 'Research Excellence',
      description: 'Established our research and innovation hub, developing evidence-based solutions and publishing groundbreaking research in top-tier journals.',
      impact: '50+ peer-reviewed publications',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      year: '2020',
      title: 'Global Recognition',
      description: 'Received international recognition for our innovative approaches to climate adaptation and sustainable development during the global pandemic.',
      impact: 'UN Partnership established',
      color: 'from-pink-500 to-rose-500'
    },
    {
      year: '2024',
      title: 'Scaling Impact',
      description: 'Today, GEI operates in over 50 countries, has impacted more than 1 million lives, and continues to pioneer innovative solutions for environmental sustainability.',
      impact: '1M+ lives transformed',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  // Carousel functionality
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(values.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(values.length / 3)) % Math.ceil(values.length / 3));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  const totalSlides = Math.ceil(values.length / 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="text-center reveal">
            <h1 className="text-4xl lg:text-6xl font-bold font-playfair text-gray-900 mb-6">
              About <span className="gradient-text">GEI</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Transforming communities and environments through innovative, sustainable solutions 
              that create lasting positive impact across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12 border border-blue-100 reveal">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-6 motion-pulse">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold font-playfair text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                To create sustainable environmental solutions that empower communities, 
                protect ecosystems, and drive positive change through innovative research, 
                collaborative partnerships, and community-centered approaches that respect 
                local knowledge and cultural values.
              </p>
            </div>

            <div id="vision" className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12 border border-blue-100 reveal" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-6 motion-pulse">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold font-playfair text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                A world where environmental sustainability and human prosperity coexist, 
                where communities are resilient and empowered, and where innovative 
                solutions create lasting positive impact for generations to come, 
                ensuring a thriving planet for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Carousel Section */}
      <section id="values" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These fundamental principles guide everything we do and shape our approach to creating positive change.
            </p>
          </div>

          {/* Carousel Container */}
          <div 
            className="relative reveal"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Carousel Wrapper */}
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                      {values.slice(slideIndex * 3, slideIndex * 3 + 3).map((value, index) => {
                        const IconComponent = value.icon;
                        const actualIndex = slideIndex * 3 + index;
                        const isActive = currentSlide === slideIndex;
                        
                        return (
                          <div
                            key={actualIndex}
                            className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group transform transition-all duration-700 ease-out ${
                              isActive 
                                ? 'translate-y-0 scale-100 opacity-100 hover:-translate-y-2 hover:shadow-xl' 
                                : 'translate-y-8 scale-95 opacity-60'
                            }`}
                            style={{ 
                              transitionDelay: isActive ? `${index * 150}ms` : '0ms'
                            }}
                          >
                            {/* Icon and Heading Row */}
                            <div className="flex items-center gap-4 mb-6">
                              <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 motion-pulse overflow-hidden">
                                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-500"></div>
                                  <IconComponent className="w-8 h-8 text-gray-700 group-hover:text-blue-600 transition-colors duration-500 relative z-10" />
                                </div>
                                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 rounded-3xl transition-all duration-500 -z-10"></div>
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-0 font-playfair group-hover:text-base-blue transition-colors duration-300">
                                {value.title}
                              </h3>
                            </div>
                            {/* Description and underline remain unchanged */}
                            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                              {value.description}
                            </p>
                            <div className="mt-6 h-1 w-0 bg-gradient-to-r from-base-blue to-analogous-teal rounded-full group-hover:w-full transition-all duration-700 ease-out"></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - move to bottom center */}
            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:bg-white hover:scale-110 transition-all duration-300 group z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:bg-white hover:scale-110 transition-all duration-300 group z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the dedicated leaders driving our mission forward with expertise, passion, and unwavering commitment to environmental sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift border border-gray-100 group reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 font-playfair">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                  
                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Education */}
                  <p className="text-xs text-gray-500 mb-4">{member.education}</p>
                  
                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-400 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-400 transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section id="history" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From humble beginnings to global impact - the story of GEI's growth, evolution, and unwavering commitment to environmental sustainability.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-500 hidden md:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={
                    `relative flex items-center space-x-8 reveal timeline-animate opacity-0 translate-y-8 transition-all duration-700` +
                    ` delay-[${index * 200}ms]`
                  }
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg motion-pulse border-4 border-white">
                    <span className="text-white font-bold text-sm">{milestone.year}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 font-playfair">{milestone.title}</h3>
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-800 text-white text-sm font-medium rounded-full">
                        {milestone.impact}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section id="partnerships" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Global Partnerships</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We collaborate with leading organizations, governments, and communities to amplify our impact and create sustainable change.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-playfair">UN Agencies</h3>
              <p className="text-gray-600 leading-relaxed">
                Strategic partnerships with UNEP, UNESCO, and other UN agencies to align our work with global sustainability goals.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-playfair">Government Partners</h3>
              <p className="text-gray-600 leading-relaxed">
                Collaboration with national and local governments to implement policy-driven environmental solutions.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-playfair">Academic Institutions</h3>
              <p className="text-gray-600 leading-relaxed">
                Research partnerships with leading universities to advance scientific understanding and innovation.
              </p>
            </div>
          </div>

          {/* Trusted Partners Bar */}
          <div className="mt-20">
            <p className="text-center uppercase text-sm tracking-wider text-gray-500 mb-8 font-medium">
              Trusted by forward-thinking partners
            </p>
            <div className="relative w-full overflow-hidden opacity-60">
              <div 
                className="flex flex-nowrap items-center w-max animate-scroll-left"
                style={{ '--scroll-duration': '30s' } as React.CSSProperties}
              >
                {[...Array(5)].map((_, setIndex) => (
                  [
                    { name: 'UNESCO', className: 'text-2xl font-bold text-gray-400' },
                    { name: 'UNEP', className: 'text-2xl font-bold text-gray-400' },
                    { name: 'WWF', className: 'text-2xl font-bold text-gray-400' },
                    { name: 'Greenpeace', className: 'text-2xl font-bold text-gray-400' },
                    { name: 'IUCN', className: 'text-2xl font-bold text-gray-400' },
                  ].map((logo, logoIndex) => (
                    <div key={`logo-${setIndex}-${logoIndex}`} className={`flex-shrink-0 mx-6 ${logo.className}`}>
                      {logo.name}
                    </div>
                  ))
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-blue-500 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center text-white relative reveal">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair mb-6">Join Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Be part of the solution. Whether you're a researcher, policy maker, or passionate individual, 
            there are many ways to contribute to our global environmental mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Make a Difference
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105">
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;