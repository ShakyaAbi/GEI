import React, { useEffect, useState } from 'react';
import { ArrowRight, Globe, Users, Zap, MapPin, ExternalLink, X } from 'lucide-react';
import ImageGalleryCarousel from './ImageGalleryCarousel';
import CountUp from './CountUp';

const Hero = () => {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);

  // Define partner logos for the trust bar
  const partnerLogos = [
    { name: 'UNESCO', className: 'text-2xl font-bold text-gray-400' },
    { name: 'UNEP', className: 'text-2xl font-bold text-gray-400' },
    { name: 'WWF', className: 'text-2xl font-bold text-gray-400' },
    { name: 'Greenpeace', className: 'text-2xl font-bold text-gray-400' },
    { name: 'IUCN', className: 'text-2xl font-bold text-gray-400' },
  ];

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
      src: './public/image1.jpeg',
      alt: 'Community members working together on environmental project',
      caption: 'Community-led environmental initiatives creating lasting change'
    },
    {
      src: './public/image2.jpg',
      alt: 'Solar panels installation in rural community',
      caption: 'Renewable energy solutions powering sustainable development'
    },
    {
      src: './public/image1.jpeg',
      alt: 'Clean water access project in developing region',
      caption: 'Clean water infrastructure transforming communities'
    },
    {
      src: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Reforestation and conservation efforts',
      caption: 'Forest conservation protecting biodiversity and climate'
    },
  
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
          {/* Left: Text Content */}
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
          {/* Right: Hero Image */}
          <div className="w-full h-80 lg:h-[32rem] flex items-center justify-center">
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
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
          {/* Scrolling Logos Container */}
          <div className="relative w-full overflow-hidden opacity-60">
            <div 
              className="flex flex-nowrap items-center w-max animate-scroll-left"
              style={{ '--scroll-duration': '30s' } as React.CSSProperties} // Set duration via CSS variable
            >
              {/* Duplicate logos to create continuous scroll effect */}
              {partnerLogos.map((logo, index) => (
                <div key={`logo-1-${index}`} className={`flex-shrink-0 mx-6 ${logo.className}`}>
                  {logo.name}
                </div>
              ))}
              {partnerLogos.map((logo, index) => (
                <div key={`logo-2-${index}`} className={`flex-shrink-0 mx-6 ${logo.className}`}>
                  {logo.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 bg-gradient-to-r from-light-blue/30 to-analogous-teal/30">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="reveal">
            <p className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-base-blue to-analogous-teal bg-clip-text text-transparent tracking-tight mb-2">
              <CountUp from={0} to={10000} separator="," direction="up" duration={1.5} className="count-up-text" />+
            </p>
            <p className="text-gray-600 font-medium">Lives Impacted</p>
          </div>
          <div className="reveal" style={{ animationDelay: '0.1s' }}>
            <p className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-base-blue to-analogous-teal bg-clip-text text-transparent tracking-tight mb-2">
              <CountUp from={0} to={200} separator="," direction="up" duration={1.5} className="count-up-text" />+
            </p>
            <p className="text-gray-600 font-medium">Active Projects</p>
          </div>
          <div className="reveal" style={{ animationDelay: '0.2s' }}>
            <p className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-base-blue to-analogous-teal bg-clip-text text-transparent tracking-tight mb-2">
              <CountUp from={0} to={50} separator="," direction="up" duration={1.5} className="count-up-text" />+
            </p>
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
                  src="./public/2987330-01.png" 
                  alt="World Map showing global presence" 
                  className="w-full h-full object-cover rounded-2xl"
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

          {/* Office Details Cards are hidden for now */}
        </div>
      </section>

      {/* Centered Modal Popup */}
      {activeLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden max-w-sm w-full animate-fadeInUp">
            {(() => {
              const location = locations.find(loc => loc.id === activeLocation);
              if (!location) return null;

              return (
                <>
                  {/* Close Button */}
                  <button
                    onClick={() => setActiveLocation(null)}
                    className="absolute top-3 right-3 w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-30"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>

                  {/* Image Header (no overlay) */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={location.image}
                      alt={location.country}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Minimal Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{location.name}</h3>
                    <p className="text-gray-600 text-sm mb-0">{location.description}</p>
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