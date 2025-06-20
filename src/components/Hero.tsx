import React from 'react';
import { ArrowRight, Users, BookOpen, Award, MapPin } from 'lucide-react';

const Hero = () => {
  const handleExploreClick = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const workingCountries = [
    { name: 'Nepal', position: { top: '35%', left: '78%' } },
    { name: 'India', position: { top: '42%', left: '75%' } },
    { name: 'Cambodia', position: { top: '48%', left: '82%' } }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 via-green-700 to-blue-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='17' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='37' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='17' r='1'/%3E%3Ccircle cx='17' cy='17' r='1'/%3E%3Ccircle cx='27' cy='17' r='1'/%3E%3Ccircle cx='37' cy='17' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Global Environmental
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">
                Initiative
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
              Driving sustainable change across the globe through innovative environmental solutions, 
              community partnerships, and transformative research.
            </p>

            <button
              onClick={handleExploreClick}
              className="inline-flex items-center px-8 py-4 bg-white text-green-900 font-semibold rounded-full hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              Explore Our Impact
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-green-200 text-sm">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">200+</div>
                <div className="text-green-200 text-sm">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">1M+</div>
                <div className="text-green-200 text-sm">Lives Impacted</div>
              </div>
            </div>
          </div>

          {/* Right Content - World Map */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Where We Work</h3>
              
              {/* World Map Container */}
              <div className="relative w-full h-80 bg-gray-200/20 rounded-2xl overflow-hidden">
                {/* Simplified World Map SVG */}
                <svg viewBox="0 0 1000 500" className="w-full h-full">
                  {/* Continents - Simplified shapes */}
                  <g fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1">
                    {/* North America */}
                    <path d="M150 100 L300 80 L320 150 L280 200 L200 220 L150 180 Z" />
                    {/* South America */}
                    <path d="M200 250 L280 240 L300 350 L250 400 L200 380 L180 300 Z" />
                    {/* Europe */}
                    <path d="M450 80 L550 70 L560 130 L500 140 L450 120 Z" />
                    {/* Africa */}
                    <path d="M480 150 L580 140 L600 300 L550 380 L480 370 L460 250 Z" />
                    {/* Asia */}
                    <path d="M600 80 L850 70 L880 200 L820 250 L600 240 L580 150 Z" />
                    {/* Australia */}
                    <path d="M750 350 L850 340 L860 380 L800 390 L750 380 Z" />
                  </g>
                </svg>

                {/* Country Markers */}
                {workingCountries.map((country, index) => (
                  <div
                    key={country.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={country.position}
                  >
                    <div className="relative">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {country.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-green-100 text-sm mb-4">
                  Currently active in Nepal, India, and Cambodia with expanding global presence
                </p>
                <div className="flex items-center justify-center space-x-2 text-yellow-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">Active Regions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;