import React from "react";
import { Mail, ExternalLink, Award } from "lucide-react";
import { useFaculty } from "../hooks/useFaculty";
import { normalizeImagePath } from "../lib/imageOptimization";

const Faculty = () => {
  const { facultyMembers, loading, error } = useFaculty();

  if (loading) {
    return (
      <section id="faculty" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-600">Loading faculty members...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="faculty" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-red-600">Error loading faculty: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!facultyMembers || facultyMembers.length === 0) {
    return null;
  }

  const legacyFacultyMembers = [
    {
      name: "Dr. Sarah Chen",
      title: "Director & Principal Investigator",
      department: "Climate & Health",
      image:
        "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialization: "Climate Change Health Impacts, Adaptation Strategies",
      email: "sarah.chen@phrc.edu",
      publications: 45,
      awards: 8,
    },
    {
      name: "Dr. Michael Rodriguez",
      title: "Senior Research Scientist",
      department: "Environmental Health",
      image:
        "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialization: "Environmental Toxicology, Public Health",
      email: "michael.rodriguez@phrc.edu",
      publications: 38,
      awards: 5,
    },
    {
      name: "Dr. Emma Thompson",
      title: "Associate Director",
      department: "One Health",
      image:
        "https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialization: "Zoonotic Diseases, Ecosystem Health",
      email: "emma.thompson@phrc.edu",
      publications: 52,
      awards: 12,
    },
    {
      name: "Dr. James Wilson",
      title: "Principal Investigator",
      department: "Sustainable Systems",
      image:
        "https://images.pexels.com/photos/3785074/pexels-photo-3785074.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialization: "Sustainable Agriculture, Food Security",
      email: "james.wilson@phrc.edu",
      publications: 41,
      awards: 7,
    },
    {
      name: "Dr. Lisa Park",
      title: "Research Scientist",
      department: "Pollution & Health",
      image:
        "https://images.pexels.com/photos/3765114/pexels-photo-3765114.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialization: "Air Quality, Respiratory Health",
      email: "lisa.park@phrc.edu",
      publications: 36,
      awards: 6,
    },
    {
      name: "Dr. David Kumar",
      title: "Senior Researcher",
      department: "Health Technology",
      image:
        "https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialization: "Digital Health, Environmental Monitoring",
      email: "david.kumar@phrc.edu",
      publications: 33,
      awards: 4,
    },
  ];

  return (
    <section id="faculty" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet our dedicated team members working to advance global environmental health initiatives.
            </p>
          </div>

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...facultyMembers]
              .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
              .map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                {/* Profile Image */}
                <div className="relative overflow-hidden h-64 sm:h-72 bg-gray-100">
                  <img
                    src={normalizeImagePath(member.photo || '/faculty/placeholder.jpg')}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('placeholder.jpg')) {
                        target.src = '/faculty/placeholder.jpg';
                      }
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
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
                  </div>

                  {/* LinkedIn Contact */}
                  {member.linkedin && (
                    <div className="flex items-center justify-between mt-4">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-green-700 hover:text-green-800 transition-colors group/linkedin"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-10h3v1.765c1.396-2.586 7-2.777 7 2.476v5.759z"/>
                        </svg>
                        <span className="text-sm font-medium">LinkedIn</span>
                      </a>
                    </div>
                  )}
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
