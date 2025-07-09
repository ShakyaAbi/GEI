import React from 'react';
import { useParams, Link } from 'react-router-dom';
import stories, { Story } from '../data/stories';
import { Calendar, Users, Leaf, Globe, Heart, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

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

const StoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const story = stories.find((s: Story) => s.id === id);

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h2>
        <Link to="/our-stories" className="text-blue-600 hover:underline flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Stories
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto pt-32 pb-16 px-6 lg:px-0">
        <Link to="/our-stories" className="text-blue-600 hover:underline flex items-center gap-2 mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Stories
        </Link>
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-80 object-cover rounded-2xl shadow-2xl mb-8"
        />
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-playfair">{story.title}</h1>
        <div className="text-gray-600 mb-8">By {story.author}</div>
        <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-line mb-12">{story.content}</div>
      </div>
      <Footer />
    </div>
  );
};

export default StoryDetailPage; 