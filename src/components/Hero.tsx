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

      {/* Our Offices Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Offices
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Working across continents to create sustainable solutions and lasting environmental impact 
                in communities worldwide.
              </p>
            </div>

            {/* Dotted World Map */}
            <div className="relative bg-gray-700 rounded-3xl p-8 overflow-hidden">
              <svg viewBox="0 0 1200 600" className="w-full h-auto">
                {/* World map made of dots */}
                <defs>
                  <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="4" cy="4" r="1.5" fill="#9CA3AF" opacity="0.6"/>
                  </pattern>
                </defs>
                
                {/* Continents as dotted shapes */}
                {/* North America */}
                <path d="M150 120 Q200 100 280 110 Q320 120 350 140 Q360 180 340 220 Q300 240 250 250 Q200 260 160 240 Q130 200 140 160 Z" fill="url(#dots)" />
                
                {/* South America */}
                <path d="M280 280 Q320 270 340 290 Q360 320 370 380 Q375 440 365 480 Q350 500 330 495 Q310 490 295 470 Q280 440 275 400 Q270 360 275 320 Z" fill="url(#dots)" />
                
                {/* Europe */}
                <path d="M480 100 Q520 90 560 100 Q580 110 590 130 Q585 150 570 160 Q540 170 510 165 Q485 155 480 135 Z" fill="url(#dots)" />
                
                {/* Africa */}
                <path d="M520 180 Q560 170 590 185 Q610 200 620 240 Q625 290 620 340 Q615 390 600 420 Q580 440 560 435 Q540 430 525 410 Q510 380 505 340 Q500 300 505 260 Q510 220 520 190 Z" fill="url(#dots)" />
                
                {/* Asia */}
                <path d="M620 120 Q720 110 820 125 Q880 140 920 165 Q940 190 935 220 Q925 250 900 270 Q860 285 800 280 Q740 275 680 265 Q640 250 620 220 Q610 190 615 160 Z" fill="url(#dots)" />
                
                {/* Australia */}
                <path d="M820 380 Q870 370 900 385 Q915 400 910 420 Q900 435 885 440 Q865 445 845 440 Q825 435 820 420 Q815 405 820 390 Z" fill="url(#dots)" />

                {/* Office locations with yellow markers */}
                {/* Nepal */}
                <circle cx="780" cy="200" r="12" fill="#FCD34D" stroke="#F59E0B" strokeWidth="3">
                  <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite"/>
                </circle>
                <text x="780" y="185" textAnchor="middle" fill="#FCD34D" fontSize="12" fontWeight="bold">Nepal</text>
                
                {/* India */}
                <circle cx="750" cy="230" r="12" fill="#FCD34D" stroke="#F59E0B" strokeWidth="3">
                  <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                </circle>
                <text x="750" y="215" textAnchor="middle" fill="#FCD34D" fontSize="12" fontWeight="bold">India</text>
                
                {/* Cambodia */}
                <circle cx="820" cy="260" r="12" fill="#FCD34D" stroke="#F59E0B" strokeWidth="3">
                  <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" begin="1s"/>
                </circle>
                <text x="820" y="245" textAnchor="middle" fill="#FCD34D" fontSize="12" fontWeight="bold">Cambodia</text>

                {/* Connection lines */}
                <g stroke="#FCD34D" strokeWidth="2" strokeDasharray="5,5" opacity="0.7">
                  <line x1="780" y1="200" x2="750" y2="230">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite"/>
                  </line>
                  <line x1="750" y1="230" x2="820" y2="260">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite"/>
                  </line>
                </g>
              </svg>
            </div>

            {/* Office Details */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-700 rounded-2xl p-6 text-center hover:bg-gray-600 transition-colors duration-300">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-800 font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Nepal Office</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Supporting climate-resilient agriculture and sustainable water management 
                  systems for mountain communities.
                </p>
              </div>

              <div className="bg-gray-700 rounded-2xl p-6 text-center hover:bg-gray-600 transition-colors duration-300">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-800 font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">India Office</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Implementing renewable energy solutions and sustainable development 
                  programs in rural communities.
                </p>
              </div>

              <div className="bg-gray-700 rounded-2xl p-6 text-center hover:bg-gray-600 transition-colors duration-300">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-800 font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Cambodia Office</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Building water security infrastructure and training communities 
                  in environmental conservation practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;