import React from 'react';
import { Mail, ExternalLink, Award } from 'lucide-react';

const Faculty = () => {
  const facultyMembers = [
    {
      name: 'Dr. Sarah Chen',
      title: 'Director & Principal Investigator',
      department: 'Climate & Health',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialization: 'Climate Change Health Impacts, Adaptation Strategies',
      email: 'sarah.chen@phrc.edu',
      publications: 45,
      awards: 8
    },
    {
      name: 'Dr. Michael Rodriguez',
      title: 'Senior Research Scientist',
      department: 'Environmental Health',
      image: 'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialization: 'Environmental Toxicology, Public Health',
      email: 'michael.rodriguez@phrc.edu',
      publications: 38,
      awards: 5
    },
    {
      name: 'Dr. Emma Thompson',
      title: 'Associate Director',
      department: 'One Health',
      image: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialization: 'Zoonotic Diseases, Ecosystem Health',
      email: 'emma.thompson@phrc.edu',
      publications: 52,
      awards: 12
    },
    {
      name: 'Dr. James Wilson',
      title: 'Principal Investigator',
      department: 'Sustainable Systems',
      image: 'https://images.pexels.com/photos/3785074/pexels-photo-3785074.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialization: 'Sustainable Agriculture, Food Security',
      email: 'james.wilson@phrc.edu',
      publications: 41,
      awards: 7
    },
    {
      name: 'Dr. Lisa Park',
      title: 'Research Scientist',
      department: 'Pollution & Health',
      image: 'https://images.pexels.com/photos/3765114/pexels-photo-3765114.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialization: 'Air Quality, Respiratory Health',
      email: 'lisa.park@phrc.edu',
      publications: 36,
      awards: 6
    },
    {
      name: 'Dr. David Kumar',
      title: 'Senior Researcher',
      department: 'Health Technology',
      image: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialization: 'Digital Health, Environmental Monitoring',
      email: 'david.kumar@phrc.edu',
      publications: 33,
      awards: 4
    }
  ];

  return (
    <section id="faculty" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Faculty
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet our world-class researchers and scientists who are leading 
              groundbreaking research in planetary health across multiple disciplines.
            </p>
          </div>

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                {/* Profile Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-green-700 font-semibold text-sm mb-1">
                      {member.title}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {member.department}
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {member.specialization}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <ExternalLink className="w-4 h-4" />
                      <span>{member.publications} Publications</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Award className="w-4 h-4" />
                      <span>{member.awards} Awards</span>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center justify-between">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center space-x-2 text-green-700 hover:text-green-800 transition-colors group/email"
                    >
                      <Mail className="w-4 h-4 group-hover/email:scale-110 transition-transform" />
                      <span className="text-sm font-medium">Contact</span>
                    </a>
                    <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      View Profile →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faculty;