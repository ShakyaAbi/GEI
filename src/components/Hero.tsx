import React, { useEffect } from 'react';
import { ArrowRight, Globe, Users, Zap } from 'lucide-react';

const Hero = () => {
  useEffect(() => {
    // Intersection Observer for reveal animations
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

  const handleExploreClick = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-teal-50/30 to-white pt-28">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-28 grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-8 reveal">
            <h1 className="font-playfair text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
              Accelerating Environmental 
              <span className="gradient-text block">Innovation Worldwide</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              We empower researchers, policy-makers and innovators to build a sustainable future 
              for every corner of the planet through collaborative research and transformative solutions.
            </p>
            <button
              onClick={handleExploreClick}
              className="group inline-flex items-center gap-3 px-8 py-4 btn-primary text-white rounded-full font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Learn More
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          
          <div className="reveal">
            <img 
              src="https://images.unsplash.com/photo-1601471989274-b65393f92c24?auto=format&fit=crop&w=900&q=80" 
              alt="Satellite imagery of forests and rivers" 
              className="rounded-2xl shadow-2xl motion-float w-full"
            />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-center uppercase text-sm tracking-wider text-gray-500 mb-8 font-medium">
            Trusted by forward-thinking partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-2xl font-bold text-gray-400">UNESCO</div>
            <div className="text-2xl font-bold text-gray-400">UNEP</div>
            <div className="text-2xl font-bold text-gray-400">WWF</div>
            <div className="text-2xl font-bold text-gray-400">Greenpeace</div>
            <div className="text-2xl font-bold text-gray-400">IUCN</div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="reveal">
            <p className="text-5xl lg:text-6xl font-bold gradient-text tracking-tight mb-2">1M+</p>
            <p className="text-gray-600 font-medium">Lives Impacted</p>
          </div>
          <div className="reveal" style={{ animationDelay: '0.1s' }}>
            <p className="text-5xl lg:text-6xl font-bold gradient-text tracking-tight mb-2">200+</p>
            <p className="text-gray-600 font-medium">Active Projects</p>
          </div>
          <div className="reveal" style={{ animationDelay: '0.2s' }}>
            <p className="text-5xl lg:text-6xl font-bold gradient-text tracking-tight mb-2">50+</p>
            <p className="text-gray-600 font-medium">Countries</p>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
              Our Global Presence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Working across continents to create sustainable solutions and lasting environmental impact 
              in communities worldwide.
            </p>
          </div>

          {/* Interactive World Map */}
          <div className="relative bg-gradient-to-br from-gray-50 to-teal-50 rounded-3xl shadow-2xl p-8 overflow-hidden reveal">
            <svg viewBox="0 0 1000 500" className="w-full h-auto">
              <defs>
                <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f1f5f9" />
                  <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f0fdfa" />
                  <stop offset="100%" stopColor="#e6fffa" />
                </linearGradient>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#00000020"/>
                </filter>
              </defs>
              
              <rect width="1000" height="500" fill="url(#oceanGradient)" />
              
              <g fill="url(#landGradient)" stroke="#94a3b8" strokeWidth="0.5" filter="url(#shadow)">
                {/* Simplified world continents */}
                <path d="M50 80 Q80 60 120 70 Q160 75 200 85 Q240 95 260 120 Q270 150 265 180 Q255 210 240 230 Q220 245 190 250 Q160 255 130 245 Q100 235 80 215 Q60 195 55 165 Q50 135 55 105 Z" />
                <path d="M180 260 Q200 250 220 265 Q235 280 245 310 Q250 340 255 370 Q260 400 255 430 Q250 450 240 465 Q225 475 210 470 Q195 465 185 450 Q175 435 170 420 Q165 405 165 390 Q165 375 170 360 Q175 345 175 330 Q175 315 175 300 Q175 285 175 270 Z" />
                <path d="M420 70 Q450 65 480 75 Q510 85 530 100 Q540 115 535 130 Q530 145 520 155 Q505 165 485 160 Q465 155 450 145 Q435 135 425 120 Q415 105 415 90 Z" />
                <path d="M450 160 Q480 150 510 165 Q540 180 560 200 Q575 220 580 250 Q585 280 580 310 Q575 340 570 370 Q565 400 555 425 Q545 445 530 455 Q515 465 500 460 Q485 455 475 445 Q465 435 460 420 Q455 405 450 390 Q445 375 445 360 Q445 345 445 330 Q445 315 445 300 Q445 285 445 270 Q445 255 445 240 Q445 225 445 210 Q445 195 445 180 Z" />
                <path d="M550 80 Q600 70 650 80 Q700 90 750 105 Q800 120 830 140 Q850 160 855 185 Q860 210 850 235 Q840 260 825 280 Q810 300 790 315 Q770 330 745 335 Q720 340 695 335 Q670 330 645 320 Q620 310 600 295 Q580 280 565 260 Q550 240 545 220 Q540 200 540 180 Q540 160 545 140 Q550 120 550 100 Z" />
                <path d="M720 350 Q750 345 780 355 Q800 365 815 380 Q825 395 820 410 Q815 425 805 435 Q790 445 775 440 Q760 435 750 425 Q740 415 735 400 Q730 385 730 370 Z" />
              </g>

              {/* Office locations with enhanced markers */}
              <g>
                <circle cx="680" cy="180" r="8" fill="#0f766e" stroke="#ffffff" strokeWidth="3" filter="url(#shadow)">
                  <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="680" cy="180" r="16" fill="#0f766e" opacity="0.3">
                  <animate attributeName="r" values="16;24;16" dur="3s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite"/>
                </circle>
                <text x="680" y="165" textAnchor="middle" fill="#1f2937" fontSize="14" fontWeight="bold">Nepal</text>
              </g>
              
              <g>
                <circle cx="650" cy="210" r="8" fill="#0f766e" stroke="#ffffff" strokeWidth="3" filter="url(#shadow)">
                  <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" begin="1s"/>
                </circle>
                <circle cx="650" cy="210" r="16" fill="#0f766e" opacity="0.3">
                  <animate attributeName="r" values="16;24;16" dur="3s" repeatCount="indefinite" begin="1s"/>
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" begin="1s"/>
                </circle>
                <text x="650" y="195" textAnchor="middle" fill="#1f2937" fontSize="14" fontWeight="bold">India</text>
              </g>
              
              <g>
                <circle cx="720" cy="240" r="8" fill="#0f766e" stroke="#ffffff" strokeWidth="3" filter="url(#shadow)">
                  <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" begin="2s"/>
                </circle>
                <circle cx="720" cy="240" r="16" fill="#0f766e" opacity="0.3">
                  <animate attributeName="r" values="16;24;16" dur="3s" repeatCount="indefinite" begin="2s"/>
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" begin="2s"/>
                </circle>
                <text x="720" y="225" textAnchor="middle" fill="#1f2937" fontSize="14" fontWeight="bold">Cambodia</text>
              </g>

              {/* Connection lines */}
              <g stroke="#0f766e" strokeWidth="2" strokeDasharray="8,4" opacity="0.7" fill="none">
                <path d="M680,180 Q665,195 650,210">
                  <animate attributeName="strokeDashoffset" values="0;12" dur="2s" repeatCount="indefinite"/>
                </path>
                <path d="M650,210 Q685,225 720,240">
                  <animate attributeName="strokeDashoffset" values="0;12" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                </path>
              </g>
            </svg>
          </div>

          {/* Office Details Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mr-4 shadow-lg motion-pulse">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Nepal Office</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Supporting climate-resilient agriculture and sustainable water management 
                systems for mountain communities.
              </p>
              <div className="flex items-center text-sm text-teal-600 font-medium">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                15,000+ farmers supported
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mr-4 shadow-lg motion-pulse">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">India Office</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Implementing renewable energy solutions and sustainable development 
                programs in rural communities.
              </p>
              <div className="flex items-center text-sm text-teal-600 font-medium">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                50,000+ people with clean energy
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mr-4 shadow-lg motion-pulse">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Cambodia Office</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Building water security infrastructure and training communities 
                in environmental conservation practices.
              </p>
              <div className="flex items-center text-sm text-teal-600 font-medium">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                25,000+ people with clean water
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;