import React from 'react';
import { ArrowRight, Users, BookOpen, Award } from 'lucide-react';

const Hero = () => {
  const handleExploreClick = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 via-green-700 to-blue-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='17' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='37' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='17' r='1'/%3E%3Ccircle cx='17' cy='17' r='1'/%3E%3Ccircle cx='27' cy='17' r='1'/%3E%3Ccircle cx='37' cy='17' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Planetary Health
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">
              Research Center
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed max-w-3xl mx-auto">
            Advancing planetary health through innovative research, fostering global collaboration, 
            and driving scientific breakthroughs for a sustainable future.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleExploreClick}
            className="inline-flex items-center px-8 py-4 bg-white text-green-900 font-semibold rounded-full hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            Explore Our Research
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">150+</div>
              <div className="text-green-200">Researchers</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-green-200">Publications</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-green-200">Awards</div>
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