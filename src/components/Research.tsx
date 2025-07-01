import React, { useEffect } from 'react';
import { Brain, Atom, Globe, Cpu, Dna, Zap, ArrowRight } from 'lucide-react';

const Research = () => {
  useEffect(() => {
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

  const researchAreas = [
    {
      icon: Globe,
      title: 'Climate & Health',
      description: 'Studying the impacts of climate change on human health and developing adaptation strategies for vulnerable communities.',
      projects: 18,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      iconColor: 'text-blue-700'
    },
    {
      icon: Dna,
      title: 'Environmental Health',
      description: 'Investigating environmental factors affecting human health and developing evidence-based disease prevention strategies.',
      projects: 15,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      iconColor: 'text-blue-700'
    },
    {
      icon: Brain,
      title: 'One Health',
      description: 'Integrating human, animal, and environmental health for comprehensive solutions to global health challenges.',
      projects: 12,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      iconColor: 'text-blue-700'
    },
    {
      icon: Zap,
      title: 'Sustainable Systems',
      description: 'Developing sustainable energy and food systems that promote both planetary and human health.',
      projects: 14,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      iconColor: 'text-blue-700'
    },
    {
      icon: Atom,
      title: 'Pollution & Health',
      description: 'Researching the health impacts of air, water, and soil pollution with focus on vulnerable populations.',
      projects: 10,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      iconColor: 'text-blue-700'
    },
    {
      icon: Cpu,
      title: 'Health Technology',
      description: 'Leveraging cutting-edge technology for environmental health monitoring and innovative interventions.',
      projects: 8,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'from-indigo-50 to-blue-50',
      iconColor: 'text-indigo-700'
    }
  ];

  return (
    <section id="research" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
            Core Capabilities
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
                className="group bg-white rounded-2xl p-6 shadow-lg hover-lift border border-gray-100 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${area.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${area.iconColor}`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-cyan-600 transition-all duration-300">
                  {area.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {area.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">
                    {area.projects} Active Projects
                  </span>
                  <div className={`h-1 w-12 bg-gradient-to-r ${area.color} rounded-full`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Research;