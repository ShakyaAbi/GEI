import React from 'react';
import { Lightbulb, TrendingUp, FileText, Users, Zap, Globe, ArrowRight, Calendar, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const IdeasPage = () => {
  const innovationAreas = [
    {
      icon: Lightbulb,
      title: 'Innovation Hub',
      description: 'Developing cutting-edge solutions for environmental challenges through research and technology.',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: FileText,
      title: 'Policy Papers',
      description: 'Research-backed policy recommendations for sustainable development and environmental protection.',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: TrendingUp,
      title: 'Future Trends',
      description: 'Analyzing emerging trends in sustainability, technology, and environmental science.',
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Users,
      title: 'Thought Leadership',
      description: 'Sharing insights and expertise to influence positive change in environmental policy.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    }
  ];

  const featuredIdeas = [
    {
      title: 'AI-Powered Climate Prediction Models',
      category: 'Innovation',
      description: 'Leveraging artificial intelligence to improve climate prediction accuracy and help communities prepare for environmental changes.',
      author: 'Dr. Sarah Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true
    },
    {
      title: 'Circular Economy in Rural Communities',
      category: 'Policy',
      description: 'A comprehensive framework for implementing circular economy principles in rural settings to reduce waste and create sustainable livelihoods.',
      author: 'Michael Rodriguez',
      date: '2024-01-10',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      title: 'Blockchain for Environmental Monitoring',
      category: 'Technology',
      description: 'Exploring how blockchain technology can enhance transparency and accountability in environmental conservation efforts.',
      author: 'Dr. Emma Thompson',
      date: '2024-01-08',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      title: 'Community-Based Renewable Energy Systems',
      category: 'Innovation',
      description: 'Designing decentralized renewable energy systems that empower communities and reduce dependence on fossil fuels.',
      author: 'James Wilson',
      date: '2024-01-05',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      title: 'Nature-Based Solutions for Urban Resilience',
      category: 'Policy',
      description: 'Policy recommendations for integrating nature-based solutions into urban planning for climate resilience.',
      author: 'Dr. Lisa Park',
      date: '2024-01-03',
      readTime: '9 min read',
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      title: 'Digital Tools for Environmental Education',
      category: 'Technology',
      description: 'Innovative digital platforms and tools to enhance environmental education and awareness in communities.',
      author: 'Dr. David Kumar',
      date: '2024-01-01',
      readTime: '4 min read',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Innovation': 'bg-yellow-100 text-yellow-800',
      'Policy': 'bg-blue-100 text-blue-800',
      'Technology': 'bg-green-100 text-green-800',
      'Research': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const featuredIdea = featuredIdeas.find(idea => idea.featured);
  const regularIdeas = featuredIdeas.filter(idea => !idea.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-700 to-blue-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Ideas & Innovation</h1>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
              Exploring cutting-edge solutions, sharing insights, and shaping the future 
              of environmental sustainability through innovative thinking and research.
            </p>
          </div>
        </div>
      </section>

      {/* Innovation Areas */}
      <section id="innovation" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Innovation Areas</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our focus areas for developing and sharing innovative solutions for environmental challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {innovationAreas.map((area, index) => {
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
                    <p className="text-gray-600 leading-relaxed text-sm">{area.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Idea */}
      {featuredIdea && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Insight</h2>
              </div>

              <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden h-64 lg:h-auto">
                    <img
                      src={featuredIdea.image}
                      alt={featuredIdea.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(featuredIdea.category)}`}>
                        {featuredIdea.category}
                      </span>
                      <span className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredIdea.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                      {featuredIdea.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {featuredIdea.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">By {featuredIdea.author}</span>
                        <span className="flex items-center text-gray-500 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {featuredIdea.readTime}
                        </span>
                      </div>
                      <button className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition-colors group/btn">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ideas Grid */}
      <section id="insights" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Latest Ideas</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our latest thinking on environmental innovation, policy, and technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularIdeas.map((idea, index) => (
                <article
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={idea.image}
                      alt={idea.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(idea.category)}`}>
                        {idea.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
                      {idea.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {idea.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">By {idea.author}</span>
                      <div className="flex items-center space-x-3 text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(idea.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {idea.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-teal-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Informed</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Subscribe to our newsletter to receive the latest insights, innovations, 
              and ideas in environmental sustainability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-colors transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IdeasPage;