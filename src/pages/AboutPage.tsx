import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Target, Eye, Users, Lightbulb, Award, Heart, Globe, Zap, Calendar, MapPin, Mail, Linkedin, Twitter, ChevronLeft, ChevronRight, Brain, Compass, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import TiltedCard from '../components/TiltedCard';

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

  // Faculty Team (new content)
  const facultyTeam = [
    { name: 'Suyog, MBA', title: 'GEI business development' },
    { name: 'Allison Judkins MD', title: 'Director: Research and Maternal child health' },
    { name: 'Spencer Crocker MS', title: 'Founder and President' },
    { name: 'Bibek Lamicchane MPH', title: 'Director of operations GEI Asia' },
    { name: 'Ranjan Dhungana MPH', title: 'Project Consultant' },
    { name: 'Rabin Dhital MPH', title: 'Field officer' },
    { name: 'Leela Khanal MS', title: 'Project Project consultant.' },
    { name: 'Sarala Sharma, BSN', title: 'Project consultant' },
    { name: 'Priyanka', title: 'Program officer' },
    { name: 'Paribesh Bidari, MS', title: 'Research and Data and Communications' },
    { name: 'Vaskar Sapkota MPH', title: 'Project Manager' },
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
      year: '2015',
      title: 'Nuwakot Beginnings',
      description: 'Our journey started with a livelihood and healthcare capacity project in Nuwakot district.',
      impact: 'First project launched',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      year: '2017',
      title: 'Nepal & Kenya Expansion',
      description: 'Established a policlinic and launched a goat raising livelihood project in Nepal. Supported hospital construction in Kenya.',
      impact: 'Policlinic & hospital support',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      year: '2018',
      title: 'Capacity Building & Training',
      description: 'Healthcare capacity building in Humla district. Master training in collaboration with the National Health Training Center Nepal in Maternal Neonatal Care.',
      impact: 'Master training launched',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      year: '2020',
      title: 'Birthing Centers & Staff Training',
      description: 'Completed 13 birthing centers in Humla. Trained 100+ staff.',
      impact: '13 birthing centers, 100+ staff',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      year: '2021',
      title: 'Curriculum Redesign & Master Training',
      description: 'Redesigned training curricula in Helping Babies Breathe and Helping Mothers Survive. Established Master training courses throughout Nepal.',
      impact: 'National training programs',
      color: 'from-pink-500 to-rose-500'
    },
    {
      year: '2022',
      title: 'Research & Evaluation',
      description: 'Investigated micro and macronutrient deficiencies in several districts. Described micro- and macroeconomics impact on health and outcomes. Post-pandemic project evaluations revealed sustainability challenges in many aspects.',
      impact: 'Research & evaluation',
      color: 'from-green-500 to-teal-500'
    },
    {
      year: '2023',
      title: 'GEI Foundation Established',
      description: 'GEI formally established as a not-for-profit operating Foundation in the US. Identified integrated community development as preferred strategy combining health care development, economic growth, and environmental preservation as cornerstones based on science and responsible business.',
      impact: 'US Foundation established',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      year: '2024',
      title: 'Collaborations & Integrated Development',
      description: 'Project collaboration with Dhulikel Hospital: low cost water treatment plant. Achham and Bajura: Integrated community development project.',
      impact: 'Water treatment & community development',
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

  // Parallax background for process section
  const ProcessParallaxBackground = () => {
    const [scrollY, setScrollY] = React.useState(0);
    React.useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
      <div className="fixed inset-0 pointer-events-none z-10">
        <div 
          className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-blue-200/20 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute top-96 left-10 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-blue-100/10 rounded-full blur-2xl"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
        <div 
          className="absolute bottom-20 right-1/3 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-blue-400/10 rounded-full blur-xl"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
      </div>
    );
  };

  const impactSteps = [
    {
      id: 1,
      icon: Brain,
      title: "Diagnose",
      description: "We start by understanding real community needs using our innovative data collection platform. Through household surveys, environmental assessments, and health system reviews, we identify the root causes of challenges — not just the symptoms.",
      linkText: "Explore our assessment tools",
      hoverExample: "1500 children lacked clean water – see our field data",
      parallaxSpeed: 0.5
    },
    {
      id: 2,
      icon: Compass,
      title: "Plan",
      description: "GEI works hand-in-hand with communities, governments, and private partners to design targeted, scalable solutions. Whether upgrading rural clinics, planning clean water systems, or launching nutrition programs — we co-create every step to ensure relevance and sustainability.",
      linkText: "See our project planning in action",
      hoverExample: "Co-designed water plant with Dhulikhel engineers",
      parallaxSpeed: 0.3
    },
    {
      id: 3,
      icon: Zap,
      title: "Empower",
      description: "We implement locally led programs that generate green jobs, improve health, restore environments, and build resilience. Our approach centers communities as leaders — ensuring that change grows from within and lasts for generations.",
      linkText: "View our community-led programs",
      hoverExample: "Plastic recycling co-op creates 20+ jobs",
      parallaxSpeed: 0.7
    }
  ];

  const ProcessSteps = () => {
    return (
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {impactSteps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="relative group">
              <TiltedCard
                containerHeight="400px"
                containerWidth="100%"
                imageHeight="400px"
                imageWidth="100%"
                scaleOnHover={1.05}
                rotateAmplitude={8}
                showTooltip={true}
                captionText={step.hoverExample}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-full h-full p-8 flex flex-col justify-between">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-dark-blue rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                        {React.createElement(step.icon, { size: 32 })}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 font-playfair">{step.title}</h3>
                      <p className="text-gray-600 mb-4 font-inter">{step.description}</p>
                      <span className="inline-flex items-center text-brand-blue font-semibold cursor-pointer hover:underline">
                        {step.linkText} <span className="ml-2">→</span>
                      </span>
                    </div>
                  </div>
                }
              />
            </div>
            {/* Arrow for Mobile with no parallax */}
            {index < impactSteps.length - 1 && (
              <div className="lg:hidden flex justify-center my-8">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-blue to-brand-dark-blue rounded-full flex items-center justify-center text-white shadow-lg">
                  <ArrowRight size={16} className="transform rotate-90" />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

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
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-inter">
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
              <p className="text-gray-700 leading-relaxed text-lg font-inter">
                We believe in a future where economic progress, human health, and environmental stewardship are inseparable.
              </p>
            </div>

            <div id="vision" className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12 border border-blue-100 reveal" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-6 motion-pulse">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold font-playfair text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg font-inter">
                At GEI, our mission is to build resilient, thriving communities by advancing environmental sustainability, equitable healthcare, and economic opportunity. We empower individuals through green job creation, support community health initiatives, and drive forward innovative research that fosters a just and sustainable future. Guided by a deep commitment to environmental stewardship and social equity, we work collaboratively with local stakeholders to create lasting impact for people and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Model Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        {/* Parallax Background Elements */}
        <ProcessParallaxBackground />
        <div className="container mx-auto px-6 py-16 relative z-20">
          <div className="text-center mb-16 reveal">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 font-playfair">Our Impact Model</h1>
            <p className="text-xl text-gray-600 font-medium font-inter">From Data to Change</p>
          </div>
          <div className="relative max-w-7xl mx-auto">
            {/* Animated Connection Lines */}
            <div className="hidden lg:block absolute top-32 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
              <div className="flex justify-between items-center px-8">
                <div className="w-1/3 h-0.5 bg-gradient-to-r from-blue-300/60 to-blue-500/80 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                </div>
                <div className="w-1/3 h-0.5 bg-gradient-to-r from-blue-500/80 to-blue-700/60 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer delay-1000" />
                </div>
              </div>
            </div>
            {/* Step Cards */}
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Faculty Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyTeam.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col items-center justify-center py-8">
                <h3 className="text-xl font-bold text-gray-900 mb-1 font-playfair">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3 text-center font-inter">{member.title}</p>
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-inter">
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
                    <span className="text-white font-bold text-sm">
                      {milestone.year}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 font-playfair">
                        {milestone.title}
                      </h3>
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-800 text-white text-sm font-medium rounded-full">
                        {milestone.impact}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg font-inter">
                      {milestone.description}
                    </p>
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-inter">
              We collaborate with leading organizations, governments, and communities to amplify our impact and create sustainable change.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-playfair">UN Agencies</h3>
              <p className="text-gray-600 leading-relaxed font-inter">
                Strategic partnerships with UNEP, UNESCO, and other UN agencies to align our work with global sustainability goals.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-playfair">Government Partners</h3>
              <p className="text-gray-600 leading-relaxed font-inter">
                Collaboration with national and local governments to implement policy-driven environmental solutions.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-playfair">Academic Institutions</h3>
              <p className="text-gray-600 leading-relaxed font-inter">
                Research partnerships with leading universities to advance scientific understanding and innovation.
              </p>
            </div>
          </div>

          {/* Trusted Partners Bar */}
          <div className="mt-20">
            <p className="text-center uppercase text-sm tracking-wider text-gray-500 mb-8 font-medium font-inter">
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
          <p className="text-xl text-blue-100 mb-8 leading-relaxed font-inter">
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