import React, { useEffect, useState } from 'react';
import { Lightbulb, TrendingUp, FileText, Users, Zap, Globe, ArrowRight, Calendar, Clock, BookOpen, Download, ExternalLink, Search, Filter } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Publications from '../components/Publications';

const IdeasPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const innovationAreas = [
    {
      icon: Lightbulb,
      title: 'Innovation Hub',
      description: 'Developing cutting-edge solutions for environmental challenges through research and technology.',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      count: 24
    },
    {
      icon: FileText,
      title: 'Policy Papers',
      description: 'Research-backed policy recommendations for sustainable development and environmental protection.',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      count: 18
    },
    {
      icon: TrendingUp,
      title: 'Future Trends',
      description: 'Analyzing emerging trends in sustainability, technology, and environmental science.',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
      count: 15
    },
    {
      icon: Users,
      title: 'Thought Leadership',
      description: 'Sharing insights and expertise to influence positive change in environmental policy.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      count: 21
    }
  ];

  const featuredContent = [
    {
      type: 'Innovation',
      title: 'AI-Powered Climate Prediction Models for Vulnerable Communities',
      category: 'Technology',
      description: 'Leveraging artificial intelligence to improve climate prediction accuracy and help communities prepare for environmental changes with unprecedented precision and local relevance.',
      author: 'Dr. Sarah Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      featured: true,
      tags: ['AI', 'Climate', 'Prediction', 'Community'],
      downloadUrl: '#'
    },
    {
      type: 'Policy',
      title: 'Circular Economy Framework for Rural Development',
      category: 'Policy',
      description: 'A comprehensive policy framework for implementing circular economy principles in rural settings to reduce waste and create sustainable livelihoods.',
      author: 'Michael Rodriguez',
      date: '2024-01-10',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
      featured: false,
      tags: ['Circular Economy', 'Rural Development', 'Policy'],
      downloadUrl: '#'
    },
    {
      type: 'Research',
      title: 'Blockchain for Environmental Monitoring and Transparency',
      category: 'Technology',
      description: 'Exploring how blockchain technology can enhance transparency and accountability in environmental conservation efforts and carbon credit systems.',
      author: 'Dr. Emma Thompson',
      date: '2024-01-08',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80',
      featured: false,
      tags: ['Blockchain', 'Monitoring', 'Transparency'],
      downloadUrl: '#'
    },
    {
      type: 'Innovation',
      title: 'Community-Based Renewable Energy Microgrids',
      category: 'Energy',
      description: 'Designing decentralized renewable energy systems that empower communities and reduce dependence on fossil fuels while creating local economic opportunities.',
      author: 'James Wilson',
      date: '2024-01-05',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80',
      featured: false,
      tags: ['Renewable Energy', 'Microgrids', 'Community'],
      downloadUrl: '#'
    },
    {
      type: 'Policy',
      title: 'Nature-Based Solutions for Urban Climate Resilience',
      category: 'Urban Planning',
      description: 'Policy recommendations for integrating nature-based solutions into urban planning for enhanced climate resilience and improved quality of life.',
      author: 'Dr. Priya Patel',
      date: '2024-01-03',
      readTime: '11 min read',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=80',
      featured: false,
      tags: ['Nature-Based Solutions', 'Urban Planning', 'Resilience'],
      downloadUrl: '#'
    },
    {
      type: 'Research',
      title: 'Digital Platforms for Environmental Education and Engagement',
      category: 'Education',
      description: 'Innovative digital platforms and tools to enhance environmental education and community engagement in sustainability practices.',
      author: 'Dr. Ahmed Hassan',
      date: '2024-01-01',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
      featured: false,
      tags: ['Digital Education', 'Engagement', 'Sustainability'],
      downloadUrl: '#'
    }
  ];

  const categories = ['all', 'Technology', 'Policy', 'Energy', 'Urban Planning', 'Education'];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Technology': 'bg-blue-100 text-blue-800 border-blue-200',
      'Policy': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Energy': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Urban Planning': 'bg-purple-100 text-purple-800 border-purple-200',
      'Education': 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const filteredContent = featuredContent.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredItem = filteredContent.find(item => item.featured);
  const regularItems = filteredContent.filter(item => !item.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="text-center reveal">
            <h1 className="text-4xl lg:text-6xl font-bold font-playfair text-gray-900 mb-6">
              Ideas & <span className="gradient-text">Innovation</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Exploring cutting-edge solutions, sharing insights, and shaping the future 
              of environmental sustainability through innovative thinking and research.
            </p>
          </div>
        </div>
      </section>

      {/* Innovation Areas */}
      <section id="innovation" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Innovation Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our focus areas for developing and sharing innovative solutions for environmental challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {innovationAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 group reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${area.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-teal-700" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-playfair">{area.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm mb-4">{area.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">{area.count} Publications</span>
                    <div className={`h-1 w-12 bg-gradient-to-r ${area.color} rounded-full`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Policy Section */}
      <section id="policy" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Policy Papers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Research-backed policy recommendations for sustainable development and environmental protection.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12 border border-blue-100">
            <p className="text-gray-700 text-lg leading-relaxed text-center">
              Our policy papers provide evidence-based recommendations for governments, organizations, and communities 
              to implement effective environmental policies and sustainable development strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Research Insights Section */}
      <section id="insights" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Research Insights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Latest findings and analysis from our research initiatives and global partnerships.
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 lg:p-12 border border-emerald-100">
            <p className="text-gray-700 text-lg leading-relaxed text-center">
              Our research insights combine scientific rigor with practical application, providing valuable knowledge 
              that drives innovation and informs decision-making in environmental sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* Future Trends Section */}
      <section id="trends" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Future Trends</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Emerging trends in sustainability, technology, and environmental science that will shape our future.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 lg:p-12 border border-purple-100">
            <p className="text-gray-700 text-lg leading-relaxed text-center">
              We analyze emerging trends and technologies to anticipate future challenges and opportunities 
              in environmental sustainability, helping organizations prepare for tomorrow's solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Thought Leadership Section */}
      <section id="leadership" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Thought Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Expert opinions and perspectives that influence positive change in environmental policy and practice.
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 lg:p-12 border border-yellow-100">
            <p className="text-gray-700 text-lg leading-relaxed text-center">
              Our thought leadership pieces share expert insights and perspectives on critical environmental issues, 
              influencing policy discussions and driving positive change in sustainability practices.
            </p>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <Publications />

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search ideas, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-base-blue to-analogous-teal text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Latest Ideas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our latest thinking on environmental innovation, policy, and technology.
            </p>
          </div>

          {regularItems.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Content Found</h3>
              <p className="text-gray-600 mb-8">
                No content matches your current search and filter criteria.
              </p>
              <button 
                onClick={() => {
                  setActiveCategory('all');
                  setSearchTerm('');
                }}
                className="text-base-blue hover:text-dark-blue font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularItems.map((item, index) => (
                <article
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift border border-gray-100 group reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full border border-white/50">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 font-playfair group-hover:text-teal-700 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">By {item.author}</span>
                      <div className="flex items-center space-x-3 text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.readTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <a
                        href={item.downloadUrl}
                        className="inline-flex items-center text-gray-600 hover:text-base-blue text-sm font-medium transition-colors group/btn"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </a>
                      <button className="inline-flex items-center text-base-blue hover:text-dark-blue text-sm font-medium transition-colors group/btn">
                        Read More
                        <ExternalLink className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center text-white relative reveal">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair mb-6">Stay Informed</h2>
          <p className="text-xl text-teal-100 mb-8 leading-relaxed">
            Subscribe to our newsletter to receive the latest insights, innovations, 
            and ideas in environmental sustainability delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
            />
            <button className="px-8 py-4 bg-white text-teal-700 font-semibold rounded-full hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IdeasPage;