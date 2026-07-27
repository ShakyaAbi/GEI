import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FileImage, ImagePlus, Loader2, PencilLine, PlusCircle, Save, Star } from 'lucide-react';
import { Story } from '../../hooks/useStories';

const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const normalizeRichTextContent = (value: string) => {
  if (!value) {
    return '';
  }

  if (HTML_TAG_PATTERN.test(value)) {
    return value;
  }

  return value
    .trim()
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br />')}</p>`)
    .join('');
};

const getRichTextPlainText = (value: string) =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const hasMeaningfulRichText = (value: string) => getRichTextPlainText(value).length > 0;

const STORY_EDITOR_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

const STORY_EDITOR_FORMATS = [
  'header',
  'bold',
  'italic',
  'underline',
  'blockquote',
  'list',
  'bullet',
  'link',
];

interface StoryFormProps {
  story: Partial<Story> | null;
  onSave: (storyData: Partial<Story>) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const StoryForm: React.FC<StoryFormProps> = ({ story, onSave, onCancel, isSaving }) => {
  const [formData, setFormData] = React.useState<Partial<Story>>(() => ({
    ...(story || {}),
    content: normalizeRichTextContent(story?.content || ''),
  }));
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string>(formData.heroImage || formData.image || '');
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState('');
  const [formError, setFormError] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContentChange = (value: string) => {
    setFormData((current) => ({
      ...current,
      content: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (): Promise<string | null> => {
    if (!imageFile) return null;
    setUploading(true);
    setUploadError('');
    try {
      const token = localStorage.getItem('token');
      const formDataObj = new FormData();
      formDataObj.append('image', imageFile);
      formDataObj.append('folder', 'stories');
      const res = await fetch('/api/uploads/image', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataObj,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.message || 'Upload failed');
      const imageUrl = data.data.url;
      setFormData(prev => ({ ...prev, heroImage: imageUrl }));
      setImagePreview(imageUrl);
      return imageUrl;
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setUploadError(errorMessage);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Validate required fields
    if (!formData.title || !hasMeaningfulRichText(formData.content || '')) {
      setFormError('Title and content are required');
      return;
    }
    
    const updatedFormData = { ...formData };
    
    if (imageFile && !formData.heroImage) {
      const imageUrl = await handleImageUpload();
      if (!imageUrl) {
        setFormError('Image upload failed. Please try again.');
        return; // Upload failed, don't save
      }
      updatedFormData.heroImage = imageUrl;
    }
    
    // Reset image file state before saving
    setImageFile(null);
    onSave(updatedFormData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-[0_24px_80px_rgba(15,23,42,0.28)]">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-blue-900/20 bg-gradient-to-r from-slate-900 via-blue-900 to-blue-700 px-8 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                {story?.id ? 'Editing' : 'New story'}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-white">
                  {story?.id ? <PencilLine className="h-6 w-6" /> : <PlusCircle className="h-6 w-6" />}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {story?.id ? 'Edit Story' : 'Add New Story'}
                  </h2>
                  <p className="mt-1 text-sm text-blue-100">
                    Fill in the story details, add structured content, and manage the hero image.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-blue-50">
              Stories support rich text formatting, links, and featured placement.
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="px-8 pt-6">
          {formError && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 shadow-sm">
              <p className="font-medium text-red-800">{formError}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8">
          {/* Main Content Section */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.95fr)]">
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Story Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title || ''}
                onChange={handleChange}
                placeholder="Enter an engaging title for your story"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700 mb-2">
                Excerpt <span className="text-gray-400 text-xs font-normal">(optional)</span>
              </label>
              <input
                type="text"
                name="excerpt"
                id="excerpt"
                value={formData.excerpt || ''}
                onChange={handleChange}
                placeholder="A brief summary of the story"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-1">This will appear in story previews</p>
            </div>

            {/* Author and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  value={formData.author || ''}
                  onChange={handleChange}
                  placeholder="Author name"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-gray-400 text-xs font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  placeholder="e.g., Community, Impact, Innovation"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                Story Content <span className="text-red-500">*</span>
              </label>
              <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition">
                <ReactQuill
                  theme="snow"
                  value={formData.content || ''}
                  onChange={handleContentChange}
                  modules={STORY_EDITOR_MODULES}
                  formats={STORY_EDITOR_FORMATS}
                  placeholder="Write your story here... Share the inspiring journey, challenges, and impact."
                  className="bg-white"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {getRichTextPlainText(formData.content || '').length} characters
              </p>
            </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Story Settings</h3>
                <p className="mt-1 text-sm text-slate-500">Add metadata and a hero image to improve presentation.</p>
              </div>

              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-6 transition hover:border-blue-300 hover:bg-blue-50/30">
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Hero Image <span className="text-gray-400 text-xs font-normal">(optional)</span>
                </label>

                {!imagePreview ? (
                  <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-input"
                  />
                  <label
                    htmlFor="image-input"
                    className="flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 p-8 text-center transition hover:border-blue-300 hover:bg-blue-50/40"
                  >
                    <div>
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                        <FileImage className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">Choose a hero image</p>
                      <p className="mt-1 text-xs text-gray-500">PNG, JPG, or WebP up to 5MB</p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                    <img src={imagePreview} alt="Preview" className="max-h-64 w-full object-cover shadow-sm" />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                    }}
                    className="w-full rounded-xl bg-red-100 px-4 py-2.5 font-medium text-red-700 transition hover:bg-red-200"
                  >
                    Remove Image
                  </button>
                </div>
              )}

              {imageFile && !formData.heroImage && (
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    disabled={uploading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
                      </>
                    ) : (
                      <>
                        <ImagePlus className="h-4 w-4" /> Upload Image
                      </>
                    )}
                  </button>
                </div>
              )}

              {uploadError && (
                <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3">
                  <p className="text-sm text-red-700">{uploadError}</p>
                </div>
              )}
              </div>

              <div>
                <label htmlFor="readTime" className="block text-sm font-semibold text-gray-700 mb-2">
                  Read Time <span className="text-gray-400 text-xs font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  name="readTime"
                  id="readTime"
                  value={formData.readTime || ''}
                  onChange={handleChange}
                  placeholder="e.g., 5 min"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="featured"
                    id="featured"
                    checked={!!formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="mt-1 h-5 w-5 cursor-pointer rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
                  />
                  <span className="flex-1">
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                      <Star className="h-4 w-4 text-amber-500" />
                      Feature this story on the homepage
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      Featured stories are prioritized in highlighted story sections.
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl bg-slate-100 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || uploading}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-medium text-white transition hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> Save Story
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoryForm;
