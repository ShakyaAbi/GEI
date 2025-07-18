import React, { useState } from 'react';
import { Calendar, ArrowRight, Users, Leaf, Globe, Heart } from 'lucide-react';
import Footer from '../components/Footer';
import { useStories, Story } from '../hooks/useStories';
import { useNavigate } from 'react-router-dom';

const OurStoriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const { stories, loading, error } = useStories();

  const filteredStories = selectedCategory === 'All' 
    ? stories 
    : stories.filter((story: Story) => story.category === selectedCategory);

  const storiesToShow = filteredStories;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Conservation': return <Leaf className="h-4 w-4" />;
      case 'Youth Leadership': return <Users className="h-4 w-4" />;
      case 'Renewable Energy': return <Globe className="h-4 w-4" />;
      case 'Urban Agriculture': return <Heart className="h-4 w-4" />;
      case 'Education': return <Users className="h-4 w-4" />;
      default: return <Leaf className="h-4 w-4" />;
    }
  };

  // Handler to go to story detail page
  const goToStory = (id: string) => {
    navigate(`/our-stories/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading stories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Error fetching stories: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-green-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold font-playfair text-gray-900 mb-6">
              Our <span className="gradient-text">Stories</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover the inspiring journeys of communities, innovators, and changemakers who are creating a more sustainable future for our planet.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      {/* Remove the category filter buttons */}
      {/* <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md hover:shadow-lg'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div> */}

      {/* Unified Stories List (Alternating Format) */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-16">
          {storiesToShow.map((story: Story, index: number) => (
            <div key={story.id} className={`flex flex-col lg:flex-row gap-12 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              <div className="lg:w-1/2">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                />
              </div>
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {story.date}
                  </span>
                  <span className="flex items-center gap-1">
                    {getCategoryIcon(story.category)}
                    {story.category}
                  </span>
                  <span>{story.readTime}</span>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 leading-tight font-playfair">
                  {story.title}
                </h2>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  {story.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">By {story.author}</span>
                  <button onClick={() => goToStory(story.id)} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Read Story <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OurStoriesPage; 