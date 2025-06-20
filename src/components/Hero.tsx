import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

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
    <>
      {/* Hero Section */}
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

            {/* Right Content - Globe */}
            <div className="relative flex justify-center">
              <div className="relative w-96 h-96">
                {/* Globe Container */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl overflow-hidden">
                  {/* Globe with World Map */}
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    {/* Ocean background */}
                    <circle cx="200" cy="200" r="200" fill="url(#oceanGradient)" />
                    
                    {/* Gradient definitions */}
                    <defs>
                      <radialGradient id="oceanGradient" cx="0.3" cy="0.3">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#2563EB" />
                      </radialGradient>
                      <radialGradient id="landGradient" cx="0.3" cy="0.3">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="100%" stopColor="#059669" />
                      </radialGradient>
                    </defs>
                    
                    {/* Continents */}
                    <g fill="url(#landGradient)" opacity="0.9">
                      {/* North America */}
                      <path d="M80 120 Q90 110 110 115 Q130 120 140 140 Q135 160 125 170 Q110 175 95 170 Q85 160 80 145 Z" />
                      
                      {/* South America */}
                      <path d="M120 200 Q125 190 135 195 Q145 200 150 220 Q155 250 150 270 Q145 285 135 280 Q125 275 120 260 Q115 240 120 220 Z" />
                      
                      {/* Europe */}
                      <path d="M180 100 Q190 95 200 100 Q210 105 215 115 Q210 125 200 130 Q190 135 180 130 Q175 120 180 110 Z" />
                      
                      {/* Africa */}
                      <path d="M190 140 Q200 135 210 140 Q220 145 225 165 Q230 190 225 220 Q220 245 210 250 Q200 255 190 250 Q185 230 185 210 Q185 175 190 155 Z" />
                      
                      {/* Asia */}
                      <path d="M240 110 Q280 105 320 115 Q340 125 345 145 Q350 165 340 180 Q320 190 280 185 Q250 180 240 160 Q235 140 240 125 Z" />
                      
                      {/* Australia */}
                      <path d="M290 260 Q310 255 320 265 Q325 275 320 285 Q310 290 300 285 Q290 280 290 270 Z" />
                    </g>
                    
                    {/* Globe highlight effect */}
                    <circle cx="200" cy="200" r="195" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <ellipse cx="150" cy="150" rx="60" ry="40" fill="rgba(255,255,255,0.1)" />
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
                
                {/* Orbital rings */}
                <div className="absolute inset-0 rounded-full border border-white/20 animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute inset-4 rounded-full border border-white/10 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
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

      {/* Global Presence Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Global Presence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Working across continents to create sustainable solutions and lasting environmental impact 
                in communities worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* World Map with detailed outline */}
              <div className="relative">
                <div className="bg-gray-50 rounded-3xl p-8 shadow-lg">
                  <svg viewBox="0 0 1000 500" className="w-full h-auto">
                    {/* World map outline */}
                    <g fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1">
                      {/* North America */}
                      <path d="M150 100 L200 80 L250 90 L280 110 L300 140 L290 180 L270 200 L240 210 L200 220 L170 210 L150 180 L140 140 Z" />
                      
                      {/* South America */}
                      <path d="M200 250 L230 240 L250 260 L260 300 L270 350 L260 400 L240 420 L220 410 L200 390 L190 350 L185 300 L190 270 Z" />
                      
                      {/* Europe */}
                      <path d="M450 80 L500 70 L520 80 L530 100 L525 120 L510 130 L490 135 L470 130 L450 120 L445 100 Z" />
                      
                      {/* Africa */}
                      <path d="M480 150 L520 140 L550 150 L570 180 L580 220 L575 280 L570 320 L560 360 L540 380 L520 385 L500 380 L480 370 L470 340 L465 300 L470 260 L475 220 L480 180 Z" />
                      
                      {/* Asia */}
                      <path d="M600 80 L700 70 L800 80 L850 100 L880 130 L890 160 L885 200 L870 230 L840 250 L800 260 L750 255 L700 250 L650 240 L620 220 L600 190 L590 150 L595 120 Z" />
                      
                      {/* Australia */}
                      <path d="M750 350 L800 340 L830 350 L840 370 L835 385 L820 390 L800 395 L780 390 L760 385 L750 375 Z" />
                    </g>
                    
                    {/* Highlight active countries */}
                    <g fill="#10B981" stroke="#059669" strokeWidth="2">
                      {/* Nepal region */}
                      <circle cx="780" cy="180" r="8" />
                      {/* India region */}
                      <circle cx="750" cy="210" r="12" />
                      {/* Cambodia region */}
                      <circle cx="820" cy="240" r="8" />
                    </g>
                    
                    {/* Connection lines */}
                    <g stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" opacity="0.6">
                      <line x1="780" y1="180" x2="750" y2="210" />
                      <line x1="750" y1="210" x2="820" y2="240" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Nepal</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Supporting climate-resilient agriculture and sustainable water management 
                      systems for mountain communities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">India</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Implementing renewable energy solutions and sustainable development 
                      programs in rural communities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Cambodia</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Building water security infrastructure and training communities 
                      in environmental conservation practices.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Expanding Impact</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our proven models are being adapted and scaled to new regions, 
                    with upcoming programs in Southeast Asia, Africa, and Latin America.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;