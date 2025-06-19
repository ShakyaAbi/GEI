import React from 'react';
import { Calendar, ArrowRight, Clock, Tag } from 'lucide-react';

const News = () => {
  const newsItems = [
    {
      title: 'GEI Receives $5M Grant for Climate AI Research',
      excerpt: 'The National Science Foundation awards major funding for our groundbreaking climate prediction AI project.',
      date: '2024-01-15',
      category: 'Funding',
      readTime: '3 min read',
      image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true
    },
    {
      title: 'Breakthrough in Quantum Computing Error Correction',
      excerpt: 'Our research team develops novel quantum error correction algorithms with 99.9% fidelity rates.',
      date: '2024-01-10',
      category: 'Research',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      title: 'International Collaboration with European Research Centers',
      excerpt: 'GEI partners with leading European institutions to advance sustainable energy solutions.',
      date: '2024-01-08',
      category: 'Partnership',
      readTime: '4 min read',
      image: 'https://images.pexels.com/photos/356043/pexels-photo-356043.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      title: 'New Robotics Lab Opens with State-of-the-Art Equipment',
      excerpt: 'Our expanded robotics facility features advanced manufacturing and testing capabilities.',
      date: '2024-01-05',
      category: 'Facilities',
      readTime: '2 min read',
      image: 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      title: 'Dr. Sarah Chen Named IEEE Fellow',
      excerpt: 'GEI Director receives prestigious recognition for contributions to artificial intelligence research.',
      date: '2024-01-03',
      category: 'Awards',
      readTime: '2 min read',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      title: 'Student Team Wins International Biotech Competition',
      excerpt: 'GEI graduate students take first place in global synthetic biology challenge.',
      date: '2024-01-01',
      category: 'Student Success',
      readTime: '3 min read',
      image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    }
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Funding': 'bg-green-100 text-green-800',
      'Research': 'bg-blue-100 text-blue-800',
      'Partnership': 'bg-purple-100 text-purple-800',
      'Facilities': 'bg-orange-100 text-orange-800',
      'Awards': 'bg-yellow-100 text-yellow-800',
      'Student Success': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const featuredNews = newsItems.find(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest News & Updates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay informed about our latest research breakthroughs, partnerships, 
              and achievements in the scientific community.
            </p>
          </div>

          {/* Featured News */}
          {featuredNews && (
            <div className="mb-16">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden h-64 lg:h-auto">
                    <img
                      src={featuredNews.image}
                      alt={featuredNews.title}
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
                      <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(featuredNews.category)}`}>
                        <Tag className="w-3 h-3 mr-1" />
                        {featuredNews.category}
                      </span>
                      <span className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(featuredNews.date)}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                      {featuredNews.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {featuredNews.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredNews.readTime}
                      </span>
                      <button className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition-colors group/btn">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularNews.map((item, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                      <Tag className="w-3 h-3 mr-1" />
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(item.date)}
                    </span>
                    <span className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-r from-blue-700 to-teal-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest research updates, 
              funding announcements, and scientific breakthroughs.
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
      </div>
    </section>
  );
};

export default News;