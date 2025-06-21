import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const handleExploreClick = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <div className="max-w-4xl mx-auto text-center">
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
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Global Presence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Working across continents to create sustainable solutions and lasting environmental impact 
                in communities worldwide.
              </p>
            </div>

            {/* World Map Container */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 overflow-hidden">
              <svg viewBox="0 0 1000 500" className="w-full h-auto">
                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E5E7EB" />
                    <stop offset="100%" stopColor="#D1D5DB" />
                  </linearGradient>
                  <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F0F9FF" />
                    <stop offset="100%" stopColor="#E0F2FE" />
                  </linearGradient>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#00000020"/>
                  </filter>
                </defs>
                
                {/* Ocean background */}
                <rect width="1000" height="500" fill="url(#oceanGradient)" />
                
                {/* World continents with realistic shapes */}
                <g fill="url(#landGradient)" stroke="#9CA3AF" strokeWidth="0.5" filter="url(#shadow)">
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

                {/* Office locations with enhanced markers */}
                {/* Nepal */}
                <g>
                  <circle cx="680" cy="180" r="8" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="3" filter="url(#shadow)">
                    <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="680" cy="180" r="16" fill="#F59E0B" opacity="0.3">
                    <animate attributeName="r" values="16;24;16" dur="3s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <text x="680" y="165" textAnchor="middle" fill="#1F2937" fontSize="14" fontWeight="bold">Nepal</text>
                </g>
                
                {/* India */}
                <g>
                  <circle cx="650" cy="210" r="8" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="3" filter="url(#shadow)">
                    <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" begin="1s"/>
                  </circle>
                  <circle cx="650" cy="210" r="16" fill="#F59E0B" opacity="0.3">
                    <animate attributeName="r" values="16;24;16" dur="3s" repeatCount="indefinite" begin="1s"/>
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" begin="1s"/>
                  </circle>
                  <text x="650" y="195" textAnchor="middle" fill="#1F2937" fontSize="14" fontWeight="bold">India</text>
                </g>
                
                {/* Cambodia */}
                <g>
                  <circle cx="720" cy="240" r="8" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="3" filter="url(#shadow)">
                    <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" begin="2s"/>
                  </circle>
                  <circle cx="720" cy="240" r="16" fill="#F59E0B" opacity="0.3">
                    <animate attributeName="r" values="16;24;16" dur="3s" repeatCount="indefinite" begin="2s"/>
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" begin="2s"/>
                  </circle>
                  <text x="720" y="225" textAnchor="middle" fill="#1F2937" fontSize="14" fontWeight="bold">Cambodia</text>
                </g>

                {/* Connection lines with animation */}
                <g stroke="#10B981" strokeWidth="2" strokeDasharray="8,4" opacity="0.7" fill="none">
                  <path d="M680,180 Q665,195 650,210">
                    <animate attributeName="stroke-dashoffset" values="0;12" dur="2s" repeatCount="indefinite"/>
                  </path>
                  <path d="M650,210 Q685,225 720,240">
                    <animate attributeName="stroke-dashoffset" values="0;12" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                  </path>
                </g>
              </svg>
            </div>

            {/* Office Details Cards */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Nepal Office</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Supporting climate-resilient agriculture and sustainable water management 
                  systems for mountain communities.
                </p>
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  15,000+ farmers supported
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">India Office</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Implementing renewable energy solutions and sustainable development 
                  programs in rural communities.
                </p>
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  50,000+ people with clean energy
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Cambodia Office</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Building water security infrastructure and training communities 
                  in environmental conservation practices.
                </p>
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  25,000+ people with clean water
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