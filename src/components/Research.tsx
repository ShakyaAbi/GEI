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
      title: 'Climate & Environment',
      description: `Tackling environmental threats to protect communities and ecosystems\nAt GEI, we believe that environmental justice is foundational to human dignity. That’s why we co-create low-cost, locally adaptable innovations — from modular water purification systems to waste-to-resource technologies — that mitigate pollution, restore ecosystems, and ensure clean air and water for the most vulnerable.`,
      projects: 21,
      color: 'from-blue-500 to-green-500',
      bgColor: 'from-blue-50 to-green-50',
      iconColor: 'text-blue-700'
    },
    {
      icon: Brain,
      title: 'Community Health Innovation',
      description: `Closing the gap in care for mothers, children, and remote populations\nWe refuse to accept that geography or income should determine health outcomes. GEI strengthens rural health systems by upgrading facilities, equipping providers, and introducing breakthrough tools like non-invasive anemia screening. By integrating data, training, and trust-building, we ensure care reaches those who need it most — before it's too late.`,
      projects: 18,
      color: 'from-pink-500 to-red-500',
      bgColor: 'from-pink-50 to-red-50',
      iconColor: 'text-pink-700'
    },
    {
      icon: Cpu,
      title: 'Sustainable Job Creation',
      description: `Turning community potential into resilient, green livelihoods\nPoverty isn’t just about income — it’s about missed opportunity. GEI helps communities unlock that potential by investing in eco-enterprises like permaculture, plastic recycling, and dairy cooperatives. These ventures not only generate income but anchor long-term wellbeing, self-reliance, and environmental stewardship where it’s needed most.`,
      projects: 15,
      color: 'from-yellow-500 to-green-500',
      bgColor: 'from-yellow-50 to-green-50',
      iconColor: 'text-yellow-700'
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
                
                {/* Removed project count and progress bar */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Research;