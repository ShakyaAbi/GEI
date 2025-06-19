import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader2, BookOpen, Users, Tag } from 'lucide-react';
import { usePublications } from '../../hooks/usePublications';
import { useCategories } from '../../hooks/useCategories';
import { publicationsApi, authorsApi } from '../../lib/apiClient';
import type { Publication, Author } from '../../lib/supabase';

const PublicationsAdmin = () => {
  const { publications, loading, refetch } = usePublications();
  const { categories } = useCategories();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    journal: '',
    publication_year: new Date().getFullYear(),
    publication_type: 'Journal Article',
    doi: '',
    pdf_url: '',
    citations: 0,
    category_id: '',
    is_featured: false,
    author_ids: [] as string[]
  });

  React.useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      const data = await authorsApi.getAuthors();
      setAuthors(data);
    } catch (error) {
      console.error('Failed to load authors:', error);
    }
  };

  const openModal = (publication?: Publication) => {
    if (publication) {
      setEditingPublication(publication);
      setFormData({
        title: publication.title,
        abstract: publication.abstract || '',
        journal: publication.journal || '',
        publication_year: publication.publication_year || new Date().getFullYear(),
        publication_type: publication.publication_type,
        doi: publication.doi || '',
        pdf_url: publication.pdf_url || '',
        citations: publication.citations,
        category_id: publication.category_id || '',
        is_featured: publication.is_featured,
        author_ids: publication.publication_authors?.map(pa => pa.authors.id) || []
      });
    } else {
      setEditingPublication(null);
      setFormData({
        title: '',
        abstract: '',
        journal: '',
        publication_year: new Date().getFullYear(),
        publication_type: 'Journal Article',
        doi: '',
        pdf_url: '',
        citations: 0,
        category_id: '',
        is_featured: false,
        author_ids: []
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPublication(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const publicationData = {
        title: formData.title,
        abstract: formData.abstract || undefined,
        journal: formData.journal || undefined,
        publication_year: formData.publication_year,
        publication_type: formData.publication_type,
        doi: formData.doi || undefined,
        pdf_url: formData.pdf_url || undefined,
        citations: formData.citations,
        category_id: formData.category_id || undefined,
        is_featured: formData.is_featured
      };

      let publication: Publication;

      if (editingPublication) {
        publication = await publicationsApi.updatePublication(editingPublication.id, publicationData);
        // Remove existing authors and add new ones
        await publicationsApi.removeAuthorsFromPublication(editingPublication.id);
      } else {
        publication = await publicationsApi.createPublication(publicationData);
      }

      // Add authors to publication
      if (formData.author_ids.length > 0) {
        await publicationsApi.addAuthorsToPublication(publication.id, formData.author_ids);
      }

      await refetch();
      closeModal();
    } catch (error) {
      console.error('Failed to save publication:', error);
      alert('Failed to save publication. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this publication?')) return;

    try {
      await publicationsApi.deletePublication(id);
      await refetch();
    } catch (error) {
      console.error('Failed to delete publication:', error);
      alert('Failed to delete publication. Please try again.');
    }
  };

  const handleAuthorToggle = (authorId: string) => {
    setFormData(prev => ({
      ...prev,
      author_ids: prev.author_ids.includes(authorId)
        ? prev.author_ids.filter(id => id !== authorId)
        : [...prev.author_ids, authorId]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Publications Admin</h1>
                <p className="text-gray-600">Manage planetary health research publications and authors</p>
              </div>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Publication
              </button>
            </div>
          </div>

          {/* Publications List */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">All Publications</h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
              </div>
            ) : publications.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Publications Yet</h3>
                <p className="text-gray-600 mb-6">Get started by adding your first publication.</p>
                <button
                  onClick={() => openModal()}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add First Publication
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {publications.map((publication) => (
                  <div key={publication.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {publication.title}
                          </h3>
                          {publication.is_featured && (
                            <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span>{publication.publication_type}</span>
                          <span>•</span>
                          <span>{publication.publication_year}</span>
                          {publication.journal && (
                            <>
                              <span>•</span>
                              <span className="text-green-600">{publication.journal}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{publication.citations} citations</span>
                        </div>

                        {publication.publication_authors && publication.publication_authors.length > 0 && (
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {publication.publication_authors
                                .sort((a, b) => a.author_order - b.author_order)
                                .map(pa => pa.authors.name)
                                .join(', ')}
                            </span>
                          </div>
                        )}

                        {publication.research_categories && (
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {publication.research_categories.name}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => openModal(publication)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(publication.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingPublication ? 'Edit Publication' : 'Add New Publication'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter publication title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Abstract
                  </label>
                  <textarea
                    rows={4}
                    value={formData.abstract}
                    onChange={(e) => setFormData(prev => ({ ...prev, abstract: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Enter publication abstract"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Journal
                  </label>
                  <input
                    type="text"
                    value={formData.journal}
                    onChange={(e) => setFormData(prev => ({ ...prev, journal: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter journal name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publication Year
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear() + 10}
                    value={formData.publication_year}
                    onChange={(e) => setFormData(prev => ({ ...prev, publication_year: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publication Type
                  </label>
                  <select
                    value={formData.publication_type}
                    onChange={(e) => setFormData(prev => ({ ...prev, publication_type: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Journal Article">Journal Article</option>
                    <option value="Conference Paper">Conference Paper</option>
                    <option value="Book Chapter">Book Chapter</option>
                    <option value="Technical Report">Technical Report</option>
                    <option value="Preprint">Preprint</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DOI
                  </label>
                  <input
                    type="text"
                    value={formData.doi}
                    onChange={(e) => setFormData(prev => ({ ...prev, doi: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="10.1000/xyz123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PDF URL
                  </label>
                  <input
                    type="url"
                    value={formData.pdf_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, pdf_url: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://example.com/paper.pdf"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Citations
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.citations}
                    onChange={(e) => setFormData(prev => ({ ...prev, citations: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Featured Publication</span>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Authors
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
                    {authors.map((author) => (
                      <label key={author.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.author_ids.includes(author.id)}
                          onChange={() => handleAuthorToggle(author.id)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{author.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      {editingPublication ? 'Update' : 'Create'} Publication
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicationsAdmin;