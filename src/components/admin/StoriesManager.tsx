import React, { useState, useEffect } from 'react';
import { Story } from '../../hooks/useStories';
import StoryForm from './StoryForm';

const StoriesManager = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Partial<Story> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stories');
      const data = await response.json();
      setStories(data);
    } catch (error) {
      console.error('Failed to fetch stories:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleAddStory = () => {
    setSelectedStory(null);
    setIsFormOpen(true);
  };

  const handleEditStory = (story: Story) => {
    setSelectedStory(story);
    setIsFormOpen(true);
  };

  const handleDeleteStory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`/api/stories/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        fetchStories(); // Refresh list
      } catch (error) {
        console.error('Failed to delete story:', error);
      }
    }
  };

  const handleSaveStory = async (storyData: Partial<Story>) => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('token');
      const method = storyData.id ? 'PUT' : 'POST';
      const url = storyData.id ? `/api/stories/${storyData.id}` : '/api/stories';

      // Map heroImage to image, and filter out non-schema fields
      const {
        id,
        title,
        excerpt,
        content,
        image,
        heroImage,
        category,
        author,
        readTime,
        featured,
        // Remove date and any other non-schema fields
      } = storyData;
      const payload: any = {
        title,
        excerpt,
        content,
        image: heroImage || image || '',
        category,
        author,
        readTime,
        featured,
      };
      // Remove undefined fields
      Object.keys(payload).forEach(
        (key) => payload[key] === undefined && delete payload[key]
      );

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      setIsFormOpen(false);
      fetchStories(); // Refresh list
    } catch (error) {
      console.error('Failed to save story:', error);
    }
    setIsSaving(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Stories</h1>
      <div className="mb-4">
        <button 
          onClick={handleAddStory}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Story
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Featured</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => (
              <tr key={story.id}>
                <td className="py-2 px-4 border-b">{story.title}</td>
                <td className="py-2 px-4 border-b">{story.author}</td>
                <td className="py-2 px-4 border-b">{story.category}</td>
                <td className="py-2 px-4 border-b">{story.featured ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border-b">
                  <button 
                    onClick={() => handleEditStory(story)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteStory(story.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <StoryForm
          story={selectedStory}
          onSave={handleSaveStory}
          onCancel={() => setIsFormOpen(false)}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};

export default StoriesManager;
