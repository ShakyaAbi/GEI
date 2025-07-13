import { useState, useEffect } from 'react';

export interface Story {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  heroImage?: string; // Add this field for hero image support
  category: string;
  author: string;
  readTime: string;
  featured: boolean;
}

export const useStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/stories');
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        const data = await response.json();
        setStories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stories');
      }
      setLoading(false);
    };

    fetchStories();
  }, []);

  return { stories, loading, error };
};
