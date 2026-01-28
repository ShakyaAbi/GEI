import React, { useRef, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, ExternalLink, Upload, Loader2, BookOpen, Eye, Users, Tag, FileIcon, ArrowUp, ArrowDown, ListOrdered } from 'lucide-react';
import { usePublications } from '../../hooks/usePublications';
import FileUpload from './FileUpload';
import { publicationsApi, authorsApi } from '../../lib/apiClient';
import { useCategories } from '../../hooks/useCategories';
import { fileUploadService } from '../../lib/fileUpload';
import type { Publication, Author } from '../../types/prisma';

const PublicationsAdmin = () => {
  const { publications, loading, refetch } = usePublications();
  const { categories } = useCategories();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<globalThis.File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string>('');
  const [isAuthorSubmitting, setIsAuthorSubmitting] = useState(false);
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    email: '',
    affiliation: ''
  });
  const abstractRef = useRef<HTMLDivElement | null>(null);
  const [reorderMode, setReorderMode] = useState(false);
  const [reorderPublications, setReorderPublications] = useState<Publication[]>([]);
  const [isReorderSaving, setIsReorderSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    journal: '',
    publicationYear: new Date().getFullYear(),
    publicationType: 'Journal Article',
    doi: '',
    pdfUrl: '',
    externalUrl: '',
    categoryId: '',
    isFeatured: false,
    authorIds: [] as string[]
  });

  React.useEffect(() => {
    loadAuthors();
  }, []);

  React.useEffect(() => {
    if (!reorderMode) return;
    const ordered = publications
      .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
    setReorderPublications(ordered);
  }, [reorderMode, publications]);

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
        publicationYear: publication.publicationYear || new Date().getFullYear(),
        publicationType: publication.publicationType,
        doi: publication.doi || '',
        pdfUrl: publication.pdfUrl || '',
        externalUrl: publication.externalUrl || '',
        categoryId: publication.categoryId || '',
        isFeatured: publication.isFeatured,
        authorIds: publication.publicationAuthors?.map(pa => pa.authorId) || []
      });
    } else {
      setEditingPublication(null);
      setFormData({
        title: '',
        abstract: '',
        journal: '',
        publicationYear: new Date().getFullYear(),
        publicationType: 'Journal Article',
        doi: '',
        pdfUrl: '',
        externalUrl: '',
        categoryId: '',
        isFeatured: false,
        authorIds: []
      });
    }
    setSelectedFile(null);
    setUploadError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPublication(null);
    setSelectedFile(null);
    setUploadError('');
    if (abstractRef.current) {
      abstractRef.current.innerHTML = '';
    }
  };

  const handleFileSelect = (file: globalThis.File) => {
    const validation = fileUploadService.validatePDF(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file');
      return;
    }
    
    setSelectedFile(file);
    setUploadError('');
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setUploadError('');
  };

  const sanitizeHtml = (html: string) => {
    // Minimal sanitization for admin-authored content
    return html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
      .replace(/\son\w+="[^"]*"/gi, '')
      .replace(/\son\w+='[^']*'/gi, '');
  };

  const handleAbstractInput = (value: string) => {
    setFormData(prev => ({ ...prev, abstract: sanitizeHtml(value) }));
  };

  const applyFormat = (command: string, value?: string) => {
    if (!abstractRef.current) return;
    abstractRef.current.focus();
    document.execCommand(command, false, value);
    handleAbstractInput(abstractRef.current.innerHTML);
  };

  const uploadFile = async (): Promise<string> => {
    if (!selectedFile) return formData.pdfUrl;

    setUploading(true);
    setUploadProgress(0);

    try {
      const result = await fileUploadService.uploadPDF(selectedFile, setUploadProgress);
      setFormData(prev => ({ ...prev, pdfUrl: result.url }));
      return result.url;
    } catch (error) {
      setUploadError('Failed to upload file. Please try again.');
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadError("");
    try {
      const pdfUrl = await uploadFile();
      const publicationData = {
        title: formData.title,
        abstract: formData.abstract || undefined,
        journal: formData.journal || undefined,
        publicationYear: formData.publicationYear,
        publicationType: formData.publicationType,
        doi: formData.doi || undefined,
        pdfUrl: pdfUrl || formData.pdfUrl || undefined,
        externalUrl: formData.externalUrl || undefined,
        isFeatured: formData.isFeatured,
        categoryId: formData.categoryId || undefined,
        authorIds: formData.authorIds,
      };
      let publication;
      if (editingPublication) {
        publication = await publicationsApi.updatePublication(editingPublication.id, publicationData);
      } else {
        publication = await publicationsApi.createPublication(publicationData);
      }
      await refetch();
      closeModal();
    } catch (error) {
      console.error('Failed to save publication:', error);
      if (error && typeof error === 'object' && 'message' in error) {
        alert(`Failed to save publication: ${(error as any).message}`);
      } else {
        alert('Failed to save publication. Please try again.');
      }
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
      if (error && typeof error === 'object' && 'message' in error) {
        alert(`Failed to delete publication: ${(error as any).message}`);
      } else {
        alert('Failed to delete publication. Please try again.');
      }
    }
  };

  const handleAuthorToggle = (authorId: string) => {
    setFormData(prev => ({
      ...prev,
      authorIds: prev.authorIds.includes(authorId)
        ? prev.authorIds.filter(id => id !== authorId)
        : [...prev.authorIds, authorId]
    }));
  };

  const handleAddAuthor = async () => {
    if (!newAuthor.name.trim()) {
      alert('Author name is required.');
      return;
    }

    setIsAuthorSubmitting(true);
    try {
      const created = await authorsApi.createAuthor({
        name: newAuthor.name.trim(),
        email: newAuthor.email.trim() || undefined,
        affiliation: newAuthor.affiliation.trim() || undefined,
      });
      setNewAuthor({ name: '', email: '', affiliation: '' });
      await loadAuthors();
      setFormData(prev => ({
        ...prev,
        authorIds: prev.authorIds.includes(created.id)
          ? prev.authorIds
          : [...prev.authorIds, created.id]
      }));
    } catch (error) {
      console.error('Failed to create author:', error);
      if (error && typeof error === 'object' && 'message' in error) {
        alert(`Failed to create author: ${(error as any).message}`);
      } else {
        alert('Failed to create author. Please try again.');
      }
    } finally {
      setIsAuthorSubmitting(false);
    }
  };

  const handleDeleteAuthor = async (authorId: string, name: string) => {
    if (!confirm(`Delete author "${name}"? This will remove them from publications.`)) return;

    try {
      await authorsApi.deleteAuthor(authorId);
      await loadAuthors();
      setFormData(prev => ({
        ...prev,
        authorIds: prev.authorIds.filter(id => id !== authorId)
      }));
    } catch (error) {
      console.error('Failed to delete author:', error);
      if (error && typeof error === 'object' && 'message' in error) {
        alert(`Failed to delete author: ${(error as any).message}`);
      } else {
        alert('Failed to delete author. Please try again.');
      }
    }
  };

  const viewPublication = (publication: Publication) => {
    window.open(`/publications/${publication.id}`, '_blank');
  };

  const movePublication = (index: number, direction: -1 | 1) => {
    setReorderPublications((prev) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= prev.length) return prev;
      const updated = [...prev];
      const [moved] = updated.splice(index, 1);
      updated.splice(nextIndex, 0, moved);
      return updated;
    });
  };

  const saveReorder = async () => {
    setIsReorderSaving(true);
    try {
      await publicationsApi.reorderPublications(reorderPublications.map((p) => p.id));
      await refetch();
      setReorderMode(false);
    } catch (error) {
      console.error('Failed to save publication order:', error);
      alert('Failed to save publication order. Please try again.');
    } finally {
      setIsReorderSaving(false);
    }
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
                <p className="text-gray-600">Manage research publications, upload PDFs, and organize content</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReorderMode((prev) => !prev)}
                  className="inline-flex items-center px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ListOrdered className="w-5 h-5 mr-2" />
                  {reorderMode ? 'Exit Reorder' : 'Reorder'}
                </button>
                <button
                  onClick={() => openModal()}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Publication
                </button>
              </div>
            </div>
          </div>

          {/* Publications List */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">All Publications</h2>
            </div>

            {reorderMode && (
              <div className="p-4 bg-blue-50 border-b border-blue-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-blue-700">Reordering all publications</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setReorderMode(false)}
                    className="px-3 py-2 text-sm font-medium text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveReorder}
                    disabled={isReorderSaving}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isReorderSaving ? 'Saving...' : 'Save Order'}
                  </button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : reorderMode ? (
              <div className="divide-y divide-gray-200">
                {reorderPublications.length === 0 ? (
                  <div className="text-center py-10 text-gray-600">
                    No publications available.
                  </div>
                ) : (
                  reorderPublications.map((publication, index) => (
                    <div key={publication.id} className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 w-6">{index + 1}</span>
                        <div>
                          <div className="font-medium text-gray-900">{publication.title}</div>
                          <div className="text-xs text-gray-500">Order: {publication.orderIndex ?? 0}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => movePublication(index, -1)}
                          disabled={index === 0}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                          title="Move up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => movePublication(index, 1)}
                          disabled={index === reorderPublications.length - 1}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                          title="Move down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : publications.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Publications Yet</h3>
                <p className="text-gray-600 mb-6">Get started by adding your first publication.</p>
                <button
                  onClick={() => openModal()}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
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
                          {publication.isFeatured && (
                            <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                              Featured
                            </span>
                          )}
                          {publication.pdfUrl && (
                            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              <FileIcon className="w-3 h-3 mr-1" />
                              PDF
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span>{publication.publicationType}</span>
                          <span>•</span>
                          <span>{publication.publicationYear}</span>
                          {publication.journal && (
                            <>
                              <span>•</span>
                              <span className="text-blue-600">{publication.journal}</span>
                            </>
                          )}
                        </div>

                        {publication.publicationAuthors && publication.publicationAuthors.length > 0 && (
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {publication.publicationAuthors
                                .sort((a, b) => a.authorOrder - b.authorOrder)
                                .map(pa => pa.author.name)
                                .join(', ')}
                            </span>
                          </div>
                        )}

                        {publication.researchCategories && (
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {publication.researchCategories.name}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => viewPublication(publication)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Publication"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal(publication)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Publication"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(publication.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Publication"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter publication title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Abstract
                  </label>
                  <div className="border border-gray-300 rounded-lg">
                    <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 bg-gray-50">
                      <button
                        type="button"
                        onClick={() => applyFormat('bold')}
                        className="px-2 py-1 text-sm font-semibold border border-gray-300 rounded hover:bg-white"
                        title="Bold"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFormat('italic')}
                        className="px-2 py-1 text-sm italic border border-gray-300 rounded hover:bg-white"
                        title="Italic"
                      >
                        I
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFormat('underline')}
                        className="px-2 py-1 text-sm underline border border-gray-300 rounded hover:bg-white"
                        title="Underline"
                      >
                        U
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const url = window.prompt('Enter link URL');
                          if (url) applyFormat('createLink', url);
                        }}
                        className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-white"
                        title="Link"
                      >
                        Link
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFormat('insertUnorderedList')}
                        className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-white"
                        title="Bullet list"
                      >
                        • List
                      </button>
                    </div>
                    <div
                      ref={abstractRef}
                      contentEditable
                      onInput={(e) => handleAbstractInput((e.target as HTMLDivElement).innerHTML)}
                      className="min-h-[140px] px-4 py-3 focus:outline-none"
                      dangerouslySetInnerHTML={{ __html: formData.abstract || '' }}
                      aria-label="Publication abstract"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PDF Document
                  </label>
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    onFileRemove={handleFileRemove}
                    selectedFile={selectedFile}
                    uploading={uploading}
                    uploadProgress={uploadProgress}
                    error={uploadError}
                  />
                  {formData.pdfUrl && !selectedFile && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        Current PDF: <a href={formData.pdfUrl} target="_blank" rel="noopener noreferrer" className="underline">View existing document</a>
                      </p>
                    </div>
                  )}
                  {!formData.pdfUrl && formData.externalUrl && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        External link: <a href={formData.externalUrl} target="_blank" rel="noopener noreferrer" className="underline">View publication</a>
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Journal
                  </label>
                  <input
                    type="text"
                    value={formData.journal}
                    onChange={(e) => setFormData(prev => ({ ...prev, journal: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    value={formData.publicationYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, publicationYear: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publication Type
                  </label>
                  <select
                    value={formData.publicationType}
                    onChange={(e) => setFormData(prev => ({ ...prev, publicationType: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Journal Article">Journal Article</option>
                    <option value="Conference Paper">Conference Paper</option>
                    <option value="Policy Papers">Policy Papers</option>
                    <option value="Technical Report">Technical Report</option>
                    <option value="Preprint">Preprint</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10.1000/xyz123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    External Link (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.externalUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, externalUrl: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/publication"
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Featured Publication</span>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Authors
                  </label>
                  <div className="mb-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={newAuthor.name}
                      onChange={(e) => setNewAuthor(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Name *"
                    />
                    <input
                      type="email"
                      value={newAuthor.email}
                      onChange={(e) => setNewAuthor(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Email (optional)"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newAuthor.affiliation}
                        onChange={(e) => setNewAuthor(prev => ({ ...prev, affiliation: e.target.value }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Affiliation (optional)"
                      />
                      <button
                        type="button"
                        onClick={handleAddAuthor}
                        disabled={isAuthorSubmitting}
                        className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {isAuthorSubmitting ? 'Adding...' : 'Add'}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
                    {authors.map((author) => (
                      <div key={author.id} className="flex items-center justify-between gap-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.authorIds.includes(author.id)}
                            onChange={() => handleAuthorToggle(author.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{author.name}</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => handleDeleteAuthor(author.id, author.name)}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title={`Delete ${author.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
                  disabled={isSubmitting || uploading}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting || uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {uploading ? 'Uploading...' : 'Saving...'}
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
