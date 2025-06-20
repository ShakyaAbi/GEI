import React from 'react';
import { Target, Eye, Users, Lightbulb, Award } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About GEI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The Global Environmental Initiative is dedicated to creating sustainable solutions 
              that transform communities and protect our planet through innovative programs and collaborative partnerships.
            </p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To create sustainable environmental solutions that empower communities, 
                protect ecosystems, and drive positive change through innovative research, 
                collaborative partnerships, and community-centered approaches.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                A world where environmental sustainability and human prosperity coexist, 
                where communities are resilient and empowered, and where innovative 
                solutions create lasting positive impact for generations to come.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="bg-gradient-to-r from-green-700 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold text-center mb-12">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Innovation</h4>
                <p className="text-green-100 text-sm">
                  Pursuing creative solutions for environmental challenges
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Collaboration</h4>
                <p className="text-green-100 text-sm">
                  Fostering partnerships across communities and institutions
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Excellence</h4>
                <p className="text-green-100 text-sm">
                  Maintaining the highest standards in all our programs
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Impact</h4>
                <p className="text-green-100 text-sm">
                  Creating meaningful change for communities and environment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;