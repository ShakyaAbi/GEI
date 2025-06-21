import React, { useEffect, useState } from 'react';
import { ArrowRight, Globe, Users, Zap, MapPin, ExternalLink } from 'lucide-react';

const Hero = () => {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);

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

  const locations = [
    {
      id: 1,
      name: 'Nepal Office',
      country: 'Nepal',
      x: 68,
      y: 35,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80',
      description: 'Supporting climate-resilient agriculture and sustainable water management systems for mountain communities.',
      impact: '15,000+ farmers supported',
      icon: Globe
    },
    {
      id: 2,
      name: 'India Office',
      country: 'India',
      x: 65,
      y: 42,
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80',
      description: 'Implementing renewable energy solutions and sustainable development programs in rural communities.',
      impact: '50,000+ people with clean energy',
      icon: Zap
    },
    {
      id: 3,
      name: 'Cambodia Office',
      country: 'Cambodia',
      x: 72,
      y: 48,
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=400&q=80',
      description: 'Building water security infrastructure and training communities in environmental conservation practices.',
      impact: '25,000+ people with clean water',
      icon: Users
    }
  ];

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
      <section className="py-24 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-white mb-6">
              Our Global Presence
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Working across continents to create sustainable solutions and lasting environmental impact 
              in communities worldwide.
            </p>
          </div>

          {/* Interactive Dotted World Map */}
          <div className="relative reveal">
            <div className="relative w-full h-[500px] bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl overflow-hidden">
              {/* Dotted World Map Background */}
              <svg viewBox="0 0 1000 500" className="w-full h-full absolute inset-0">
                <defs>
                  <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="4" cy="4" r="1" fill="#64748b" opacity="0.4"/>
                  </pattern>
                </defs>
                
                {/* World continents as dotted patterns */}
                <g fill="url(#dots)">
                  {/* North America */}
                  <path d="M50 80 Q80 60 120 70 Q160 75 200 85 Q240 95 260 120 Q270 150 265 180 Q255 210 240 230 Q220 245 190 250 Q160 255 130 245 Q100 235 80 215 Q60 195 55 165 Q50 135 55 105 Z" />
                  
                  {/* South America */}
                  <path d="M180 260 Q200 250 220 265 Q235 280 245 310 Q250 340 255 370 Q260 400 255 430 Q250 450 240 465 Q225 475 210 470 Q195 465 185 450 Q175 435 170 420 Q165 405 165 390 Q165 375 170 360 Q175 345 175 330 Q175 315 175 300 Q175 285 175 270 Z" />
                  
                  {/* Europe */}
                  <path d="M420 70 Q450 65 480 75 Q510 85 530 100 Q540 115 535 130 Q530 145 520 155 Q505 165 485 160 Q465 155 450 145 Q435 135 425 120 Q415 105 415 90 Z" />
                  
                  {/* Africa */}
                  <path d="M450 160 Q480 150 510 165 Q540 180 560 200 Q575 220 580 250 Q585 280 580 310 Q575 340 570 370 Q565 400 555 425 Q545 445 530 455 Q515 465 500 460 Q485 455 475 445 Q465 435 460 420 Q455 405 450 390 Q445 375 445 360 Q445 345 445 330 Q445 315 445 300 Q445 285 445 270 Q445 255 445 240 Q445 225 445 210 Q445 195 445 180 Z" />
                  
                  {/* Asia */}
                  <path d="M550 80 Q600 70 650 80 Q700 90 750 105 Q800 120 830 140 Q850 160 855 185 Q860 210 850 235 Q840 260 825 280 Q810 300 790 315 Q770 330 745 335 Q720 340 695 335 Q670 330 645 320 Q620 310 600 295 Q580 280 565 260 Q550 240 545 220 Q540 200 540 180 Q540 160 545 140 Q550 120 550 100 Z" />
                  
                  {/* Australia */}
                  <path d="M720 350 Q750 345 780 355 Q800 365 815 380 Q825 395 820 410 Q815 425 805 435 Q790 445 775 440 Q760 435 750 425 Q740 415 735 400 Q730 385 730 370 Z" />
                </g>
              </svg>

              {/* Location Markers */}
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: `${location.x}%`, top: `${location.y}%` }}
                  onClick={() => setActiveLocation(activeLocation === location.id ? null : location.id)}
                >
                  {/* Marker */}
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-slate-800 font-bold text-sm shadow-lg transform group-hover:scale-110 transition-all duration-300 animate-pulse">
                      {location.id}
                    </div>
                    
                    {/* Ripple Effect */}
                    <div className="absolute inset-0 w-8 h-8 bg-yellow-400 rounded-full opacity-30 animate-ping"></div>
                  </div>

                  {/* Location Popup */}
                  {activeLocation === location.id && (
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-10 animate-fadeInUp">
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={location.image}
                          alt={location.country}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-3 left-4 text-white">
                          <h3 className="font-bold text-lg">{location.country}</h3>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {location.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                            {location.impact}
                          </span>
                          <button className="inline-flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium group/btn">
                            Learn more
                            <ExternalLink className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Office Details Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => {
              const IconComponent = location.icon;
              return (
                <div key={location.id} className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mr-4 shadow-lg motion-pulse">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{location.name}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {location.description}
                  </p>
                  <div className="flex items-center text-sm text-teal-600 font-medium">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    {location.impact}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;