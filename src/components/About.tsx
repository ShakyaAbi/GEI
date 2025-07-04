import React, { useEffect } from 'react';
import { Target, Eye, Users, Lightbulb, Award, Heart } from 'lucide-react';

const About = () => {
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

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-neutral-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
            About GEI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The Global Environmental Initiative is dedicated to creating sustainable solutions 
            that transform communities and protect our planet through innovative programs and collaborative partnerships.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift border border-gray-100 reveal">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-analogous-teal/20 to-analogous-teal/30 rounded-2xl flex items-center justify-center mr-6">
                <Target className="w-8 h-8 text-analogous-teal" />
              </div>
              <h3 className="text-2xl font-bold font-playfair text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              To create sustainable environmental solutions that empower communities, 
              protect ecosystems, and drive positive change through innovative research, 
              collaborative partnerships, and community-centered approaches.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-muted-blue/20 to-muted-blue/30 rounded-2xl flex items-center justify-center mr-6">
                <Eye className="w-8 h-8 text-muted-blue" />
              </div>
              <h3 className="text-2xl font-bold font-playfair text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              A world where environmental sustainability and human prosperity coexist, 
              where communities are resilient and empowered, and where innovative 
              solutions create lasting positive impact for generations to come.
            </p>
          </div>
        </div>

        {/* Values Section */}
        {/*
        <div className="bg-gradient-to-b from-base-blue to-muted-blue rounded-3xl p-8 lg:p-12 text-white reveal">
          <h3 className="text-3xl font-bold font-playfair text-center mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Innovation</h4>
              <p className="text-light-blue text-sm leading-relaxed">
                Pursuing creative solutions for environmental challenges through cutting-edge research and technology
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Collaboration</h4>
              <p className="text-light-blue text-sm leading-relaxed">
                Fostering partnerships across communities, institutions, and sectors for maximum impact
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Excellence</h4>
              <p className="text-light-blue text-sm leading-relaxed">
                Maintaining the highest standards in research, implementation, and community engagement
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Impact</h4>
              <p className="text-light-blue text-sm leading-relaxed">
                Creating measurable, sustainable change for communities and the environment
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Compassion</h4>
              <p className="text-light-blue text-sm leading-relaxed">
                Approaching every challenge with empathy and understanding for all stakeholders
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Transparency</h4>
              <p className="text-light-blue text-sm leading-relaxed">
                Maintaining open communication and accountability in all our operations
              </p>
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default About;