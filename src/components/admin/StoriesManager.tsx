import { useState, useEffect } from 'react';
import { AlertCircle, BookText, CheckCircle2, Image as ImageIcon, PencilLine, Plus, Star, Trash2 } from 'lucide-react';
import { Story } from '../../hooks/useStories';
import StoryForm from './StoryForm';

const StoriesManager = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Partial<Story> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');

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
      setSaveError('');
      setSaveSuccess('');
      const token = localStorage.getItem('token');
      const method = storyData.id ? 'PUT' : 'POST';
      const url = storyData.id ? `/api/stories/${storyData.id}` : '/api/stories';

      // Map heroImage to image, and filter out non-schema fields
      const {
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
      const payload: Record<string, string | boolean | undefined> = {
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

      console.log('Saving story with payload:', payload);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save story');
      }

      const savedStory = await response.json();
      console.log('Story saved successfully:', savedStory);
      
      setSaveSuccess(storyData.id ? 'Story updated successfully!' : 'Story created successfully!');
      setIsFormOpen(false);
      fetchStories(); // Refresh list
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save story';
      console.error('Failed to save story:', error);
      setSaveError(errorMessage);
    }
    setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <BookText className="h-7 w-7" />
          </div>
          <p className="text-lg font-semibold text-slate-800">Loading stories...</p>
          <p className="mt-1 text-sm text-slate-500">Fetching the latest story entries and metadata.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-blue-700 px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
            Story Administration
          </div>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Manage Stories</h1>
              <p className="max-w-2xl text-blue-100">Create, edit, and manage your community stories with better content formatting, image control, and featured placement.</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm text-white/90 sm:w-auto">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <div className="text-white/70">Total</div>
                <div className="mt-1 text-2xl font-bold text-white">{stories.length}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <div className="text-white/70">Featured</div>
                <div className="mt-1 text-2xl font-bold text-white">{stories.filter(s => s.featured).length}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <div className="text-white/70">Images</div>
                <div className="mt-1 text-2xl font-bold text-white">{stories.filter(s => s.image).length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Alerts */}
        {saveError && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <p className="text-red-800">
              <span className="font-bold">Error:</span> {saveError}
            </p>
          </div>
        )}
        {saveSuccess && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 shadow-sm">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
            <p className="text-green-800">
              <span className="font-bold">Success:</span> {saveSuccess}
            </p>
          </div>
        )}

        {/* Add Button */}
        <div className="mb-8 flex justify-end">
          <button 
            onClick={handleAddStory}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 font-bold text-white shadow-lg transition hover:from-blue-700 hover:to-blue-800"
          >
            <Plus className="h-4 w-4" />
            Add New Story
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {stories.length === 0 ? (
            <div className="py-14 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <BookText className="h-8 w-8" />
              </div>
              <p className="mb-2 text-lg font-semibold text-slate-700">No stories yet</p>
              <p className="text-sm text-slate-500">Create your first story to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-100/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Author</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Category</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Featured</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stories.map((story, index) => (
                    <tr 
                      key={story.id}
                      className={`border-b border-slate-100 transition hover:bg-blue-50/40 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{story.title}</div>
                        {story.image && (
                          <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                            <ImageIcon className="h-3.5 w-3.5" />
                            Has image
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{story.author || '—'}</td>
                      <td className="px-6 py-4">
                        {story.category ? (
                          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">
                            {story.category}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {story.featured ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                            <Star className="h-3.5 w-3.5" />
                            Yes
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <button 
                            onClick={() => handleEditStory(story)}
                            className="flex items-center gap-2 rounded-xl bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-200"
                          >
                            <PencilLine className="h-4 w-4" />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteStory(story.id)}
                            className="flex items-center gap-2 rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-600">Total Stories</p>
            <p className="text-3xl font-bold text-blue-600">{stories.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-600">Featured</p>
            <p className="text-3xl font-bold text-amber-500">{stories.filter(s => s.featured).length}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-600">With Images</p>
            <p className="text-3xl font-bold text-green-600">{stories.filter(s => s.image).length}</p>
          </div>
        </div>
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
