import React from 'react';
import { Leaf, Droplets, Sun, Users, TreePine, Recycle, ArrowRight, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OurWorkPage = () => {
  const workAreas = [
    {
      icon: Leaf,
      title: 'Climate Action',
      description: 'Implementing comprehensive climate adaptation and mitigation strategies.',
      projects: 45,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Droplets,
      title: 'Water & Sanitation',
      description: 'Ensuring access to clean water and sustainable sanitation systems.',
      projects: 32,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Sun,
      title: 'Renewable Energy',
      description: 'Promoting clean energy solutions for sustainable development.',
      projects: 28,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: TreePine,
      title: 'Forest Conservation',
      description: 'Protecting and restoring forest ecosystems and biodiversity.',
      projects: 38,
      color: 'from-green-600 to-teal-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Users,
      title: 'Community Development',
      description: 'Empowering communities through sustainable livelihood programs.',
      projects: 52,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Recycle,
      title: 'Waste Management',
      description: 'Developing circular economy solutions and waste reduction strategies.',
      projects: 24,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50'
    }
  ];

  const featuredProjects = [
    {
      title: 'Nepal Climate Resilience Program',
      location: 'Nepal',
      description: 'Supporting 15,000 farmers in adapting to climate change through sustainable agriculture practices and water management systems.',
      image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=600',
      impact: '15,000 farmers supported',
      status: 'Active'
    },
    {
      title: 'India Clean Energy Initiative',
      location: 'India',
      description: 'Installing solar power systems in rural communities, providing clean energy access to over 50,000 people.',
      image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=600',
      impact: '50,000 people with clean energy',
      status: 'Active'
    },
    {
      title: 'Cambodia Water Security Project',
      location: 'Cambodia',
      description: 'Building sustainable water infrastructure and training local communities in water management and conservation.',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600',
      impact: '25,000 people with clean water',
      status: 'Completed'
    }
  ];

  const impactStats = [
    { number: '1M+', label: 'Lives Impacted' },
    { number: '200+', label: 'Active Projects' },
    { number: '50+', label: 'Countries' },
    { number: '500+', label: 'Local Partners' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-700 to-blue-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Work</h1>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
              Creating sustainable solutions that transform communities and protect our planet 
              through innovative programs and collaborative partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Areas */}
      <section id="climate" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Focus Areas</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We work across multiple sectors to create comprehensive solutions for environmental 
                and social challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workAreas.map((area, index) => {
                const IconComponent = area.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                  >
                    <div className={`w-16 h-16 ${area.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-green-700" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{area.description}</p>
                    
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
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="research" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Projects</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Highlighting some of our most impactful initiatives across Nepal, India, and Cambodia.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        project.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                      <MapPin className="w-3 h-3 text-gray-600" />
                      <span className="text-xs font-medium text-gray-700">{project.location}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">
                        {project.impact}
                      </span>
                      <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group/btn">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-blue-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Partner with us to create lasting environmental and social impact. 
              Together, we can build a more sustainable and equitable world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-green-700 font-semibold rounded-full hover:bg-green-50 transition-colors transform hover:scale-105">
                Become a Partner
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-700 transition-all transform hover:scale-105">
                Support Our Work
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurWorkPage;