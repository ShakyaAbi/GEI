import React from 'react';
import { Brain, Atom, Globe, Cpu, Dna, Zap } from 'lucide-react';

const Research = () => {
  const researchAreas = [
    {
      icon: Globe,
      title: 'Climate & Health',
      description: 'Studying the impacts of climate change on human health and developing adaptation strategies.',
      projects: 18,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-700'
    },
    {
      icon: Dna,
      title: 'Environmental Health',
      description: 'Investigating environmental factors affecting human health and disease prevention.',
      projects: 15,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-700'
    },
    {
      icon: Brain,
      title: 'One Health',
      description: 'Integrating human, animal, and environmental health for comprehensive solutions.',
      projects: 12,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-700'
    },
    {
      icon: Zap,
      title: 'Sustainable Systems',
      description: 'Developing sustainable energy and food systems for planetary health.',
      projects: 14,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-700'
    },
    {
      icon: Atom,
      title: 'Pollution & Health',
      description: 'Researching the health impacts of air, water, and soil pollution.',
      projects: 10,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-700'
    },
    {
      icon: Cpu,
      title: 'Health Technology',
      description: 'Leveraging technology for environmental health monitoring and intervention.',
      projects: 8,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-700'
    }
  ];

  return (
    <section id="research" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Research Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our interdisciplinary research spans multiple cutting-edge fields in planetary health, 
              driving innovation and addressing global environmental health challenges.
            </p>
          </div>

          {/* Research Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`w-16 h-16 ${area.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${area.iconColor}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-700 group-hover:to-blue-600 transition-all duration-300">
                    {area.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {area.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {area.projects} Active Projects
                    </span>
                    <div className={`h-1 w-12 bg-gradient-to-r ${area.color} rounded-full`}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Interested in Collaboration?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              We welcome partnerships with industry leaders, academic institutions, 
              and government agencies to advance planetary health research and innovation.
            </p>
            <button className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 transform hover:scale-105">
              Learn More About Partnerships
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;