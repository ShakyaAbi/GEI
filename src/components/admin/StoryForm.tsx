import React from 'react';
import { Story } from '../../hooks/useStories';

interface StoryFormProps {
  story: Partial<Story> | null;
  onSave: (storyData: Partial<Story>) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const StoryForm: React.FC<StoryFormProps> = ({ story, onSave, onCancel, isSaving }) => {
  const [formData, setFormData] = React.useState(story || {});
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string>(formData.heroImage || formData.image || '');
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    setUploading(true);
    setUploadError('');
    try {
      const token = localStorage.getItem('token');
      const formDataObj = new FormData();
      formDataObj.append('image', imageFile);
      const res = await fetch('/api/uploads/image', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataObj,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.message || 'Upload failed');
      setFormData(prev => ({ ...prev, heroImage: data.data.url }));
      setImagePreview(data.data.url);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFile && !formData.heroImage) {
      await handleImageUpload();
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">{story?.id ? 'Edit Story' : 'Add New Story'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt (optional)</label>
              <input
                type="text"
                name="excerpt"
                id="excerpt"
                value={formData.excerpt || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
              <input
                type="text"
                name="author"
                id="author"
                value={formData.author || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category (optional)</label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                name="content"
                id="content"
                value={formData.content || ''}
                onChange={handleChange}
                rows={6}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Hero Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 rounded-md max-h-40" />
              )}
              {imageFile && !formData.heroImage && (
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
              )}
              {uploadError && <div className="text-red-600 mt-2">{uploadError}</div>}
            </div>
            <div>
              <label htmlFor="readTime" className="block text-sm font-medium text-gray-700">Read Time (optional)</label>
              <input
                type="text"
                name="readTime"
                id="readTime"
                value={formData.readTime || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 5 min"
              />
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={!!formData.featured}
                onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">Featured</label>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isSaving ? 'Saving...' : 'Save Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoryForm;
