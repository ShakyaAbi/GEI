import React, { useEffect, useState } from 'react';
import { ArrowRight, Globe, Users, Zap, MapPin, ExternalLink, X } from 'lucide-react';
import ImageGalleryCarousel from './ImageGalleryCarousel';

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
      x: 72,
      y: 36,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80',
      description: 'Supporting climate-resilient agriculture and sustainable water management systems for mountain communities.',
      impact: '15,000+ farmers supported',
      icon: Globe,
      color: 'from-base-blue to-analogous-teal'
    },
    {
      id: 2,
      name: 'India Office',
      country: 'India',
      x: 69,
      y: 42,
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80',
      description: 'Implementing renewable energy solutions and sustainable development programs in rural communities.',
      impact: '50,000+ people with clean energy',
      icon: Zap,
      color: 'from-light-blue to-muted-blue'
    },
    {
      id: 3,
      name: 'Cambodia Office',
      country: 'Cambodia',
      x: 75,
      y: 48,
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=400&q=80',
      description: 'Building water security infrastructure and training communities in environmental conservation practices.',
      impact: '25,000+ people with clean water',
      icon: Users,
      color: 'from-analogous-teal to-light-blue'
    }
  ];

  // Gallery images for the carousel
  const galleryImages = [
    {
      src: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Community members working together on environmental project',
      caption: 'Community-led environmental initiatives creating lasting change'
    },
    {
      src: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Solar panels installation in rural community',
      caption: 'Renewable energy solutions powering sustainable development'
    },
    {
      src: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Clean water access project in developing region',
      caption: 'Clean water infrastructure transforming communities'
    },
    {
      src: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Reforestation and conservation efforts',
      caption: 'Forest conservation protecting biodiversity and climate'
    },
    {
      src: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Agricultural training and sustainable farming',
      caption: 'Climate-smart agriculture ensuring food security'
    },
    {
      src: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Educational programs and capacity building',
      caption: 'Education and training building local expertise'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-light-blue/20 to-white pt-28">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-base-blue/20 to-analogous-teal/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-light-blue/20 to-analogous-teal/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-28 grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-8 reveal">
            <h1 className="font-playfair text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
              Accelerating Environmental 
              <span className="bg-gradient-to-r from-base-blue to-analogous-teal bg-clip-text text-transparent block">Innovation Worldwide</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              We empower researchers, policy-makers and innovators to build a sustainable future 
              for every corner of the planet through collaborative research and transformative solutions.
            </p>
            <button
              onClick={handleExploreClick}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-base-blue to-dark-blue text-white rounded-full font-semibold shadow-lg hover:from-dark-blue hover:to-base-blue transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-blue"
            >
              Learn More
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          
          <div className="reveal flex items-center justify-center">
            <img
              src="/crystal-ball.gif"
              alt="Animated crystal ball globe"
              className="rounded-2xl shadow-2xl w-full max-w-xl"
              style={{ background: 'transparent' }}
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
      <section className="py-20 bg-gradient-to-r from-light-blue/30 to-analogous-teal/30">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="reveal">
            <p className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-base-blue to-analogous-teal bg-clip-text text-transparent tracking-tight mb-2">1M+</p>
            <p className="text-gray-600 font-medium">Lives Impacted</p>
          </div>
          <div className="reveal" style={{ animationDelay: '0.1s' }}>
            <p className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-base-blue to-analogous-teal bg-clip-text text-transparent tracking-tight mb-2">200+</p>
            <p className="text-gray-600 font-medium">Active Projects</p>
          </div>
          <div className="reveal" style={{ animationDelay: '0.2s' }}>
            <p className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-base-blue to-analogous-teal bg-clip-text text-transparent tracking-tight mb-2">50+</p>
            <p className="text-gray-600 font-medium">Countries</p>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-100 to-light-blue/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-slate-800 mb-6">
              Our Global Presence
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Working across continents to create sustainable solutions and lasting environmental impact 
              in communities worldwide.
            </p>
          </div>

          {/* Interactive World Map */}
          <div className="relative reveal">
            <div className="relative w-full h-[600px] bg-gradient-to-br from-neutral-100 to-light-blue/20 rounded-3xl overflow-hidden shadow-2xl">
              {/* World Map Background */}
              <div className="absolute inset-0 p-8">
                <img 
                  src="/kyg9_108f_220222.jpg" 
                  alt="World Map showing global presence" 
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>

              {/* Location Markers */}
             {locations.map((location) => (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                onClick={() =>
                  setActiveLocation(
                    activeLocation === location.id ? null : location.id
                  )
                }
              >
                <div className="relative">
                  {/* Main sleek marker in GEI blue */}
                  <div
                    className="
                      w-6 h-6 rounded-full
                      bg-base-blue border-2 border-white
                      shadow-md
                      transform transition-transform duration-200
                      group-hover:scale-125
                    "
                  />
            
                  {/* Hover highlight ring */}
                  <div
                    className="
                      absolute inset-0 rounded-full
                      bg-white opacity-0
                      transition-opacity duration-200
                      group-hover:opacity-20
                    "
                  />
                </div>
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
                    <div className={`w-12 h-12 bg-gradient-to-br ${location.color} rounded-full flex items-center justify-center mr-4 shadow-lg motion-pulse`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{location.name}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {location.description}
                  </p>
                  <div className="flex items-center text-sm font-medium">
                    <div className={`w-2 h-2 bg-gradient-to-r ${location.color} rounded-full mr-2`}></div>
                    <span className="text-gray-700">{location.impact}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Gallery Carousel */}
      <ImageGalleryCarousel
        images={galleryImages}
        sectionTitle="Our Impact in Action"
        sectionDescription="Witness the transformative power of our environmental initiatives through real stories and impactful moments from communities around the world."
        autoScrollSpeed={4000}
      />

      {/* Centered Modal Popup */}
      {activeLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden max-w-md w-full animate-fadeInUp">
            {(() => {
              const location = locations.find(loc => loc.id === activeLocation);
              if (!location) return null;

              return (
                <>
                  {/* Close Button */}
                  <button
                    onClick={() => setActiveLocation(null)}
                    className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-30"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>

                  {/* Image Header */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={location.image}
                      alt={location.country}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium opacity-90">{location.country}</span>
                      </div>
                      <h3 className="font-bold text-xl">{location.name}</h3>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {location.description}
                    </p>
                    
                    {/* Impact Badge */}
                    <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${location.color} text-white text-sm font-medium rounded-full mb-4 shadow-lg`}>
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      {location.impact}
                    </div>
                    
                    {/* Action Button */}
                    <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white font-medium rounded-xl hover:from-slate-700 hover:to-slate-600 transition-all duration-300 transform hover:scale-105 group/btn">
                      Learn More About Our Work
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;