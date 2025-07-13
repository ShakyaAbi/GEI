import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Users, Leaf, Globe, Heart, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

interface Story {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  image?: string;
  category?: string;
  author?: string;
  readTime?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

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
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/stories/${id}`);
        if (!res.ok) throw new Error('Story not found');
        const data = await res.json();
        setStory(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch story');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchStory();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <div className="text-xl text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error || !story) {
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
            {story.createdAt ? new Date(story.createdAt).toLocaleDateString() : ''}
          </span>
          <span className="flex items-center gap-1">
            {getCategoryIcon(story.category || '')}
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