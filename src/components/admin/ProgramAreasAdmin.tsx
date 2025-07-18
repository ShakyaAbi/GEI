import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Loader2, Goal, Eye, Search, SortAsc, SortDesc, FolderOpen } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useProgramAreas } from '../../hooks/useProgramAreas';
import ImageUpload from './ImageUpload';
import { programAreasApi } from '../../lib/programAreasApi';
import { imageUploadService } from '../../lib/imageUpload';
import type { ProgramArea } from '../../lib/programAreasApi';
import ProjectsAdmin from './ProjectsAdmin';
import axios from 'axios';

// Helper to get Lucide icon component by name
function getLucideIcon(iconName: string) {
  if (!iconName) return null;
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent ? <IconComponent className="w-5 h-5 mr-2 text-blue-500 inline-block align-middle" /> : null;
}

const ProgramAreasAdmin = () => {
  const { programAreas, loading, refetch } = useProgramAreas();
  const [activeTab, setActiveTab] = useState<'program-areas' | 'projects'>('program-areas');
  const [selectedProgramAreaId, setSelectedProgramAreaId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgramArea, setEditingProgramArea] = useState<ProgramArea | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'order_index' | 'created_at'>('order_index');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Image upload states
  const [selectedHeroImage, setSelectedHeroImage] = useState<globalThis.File | null>(null);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [heroImageProgress, setHeroImageProgress] = useState(0);
  const [heroImageError, setHeroImageError] = useState<string>('');

  // Add state for icon type and custom icon upload
  const [iconType, setIconType] = useState<'lucide' | 'custom'>('lucide');
  const [selectedIconImage, setSelectedIconImage] = useState<File | null>(null);
  const [uploadingIconImage, setUploadingIconImage] = useState(false);
  const [iconImageProgress, setIconImageProgress] = useState(0);
  const [iconImageError, setIconImageError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    hero_image: '',
    seo_title: '',
    seo_description: '',
    order_index: 0,
    icon: '',
    icon_url: ''
  });

  const [featuresByArea, setFeaturesByArea] = useState<Record<string, any[]>>({});
  const [featureModal, setFeatureModal] = useState<{ open: boolean, programAreaId?: string, feature?: any }>({ open: false });
  const [featureForm, setFeatureForm] = useState({ title: '', subtitle: '', description: '', image: '', orderIndex: 0 });
  const [featureSubmitting, setFeatureSubmitting] = useState(false);

  // Fetch features for all program areas
  useEffect(() => {
    if (programAreas.length > 0) {
      programAreas.forEach(area => {
        axios.get(`/api/program-areas/${area.id}/features`).then(res => {
          setFeaturesByArea(prev => ({ ...prev, [area.id]: res.data.data || [] }));
        });
      });
    }
  }, [programAreas]);

  const filteredAreas = programAreas.filter(area =>
    area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (area.description && area.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedAreas = [...filteredAreas].sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];
    
    if (sortBy === 'created_at') {
      aValue = new Date(a.created_at || 0);
      bValue = new Date(b.created_at || 0);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const openModal = (programArea?: ProgramArea) => {
    if (programArea) {
      setEditingProgramArea(programArea);
      setFormData({
        name: programArea.name,
        slug: programArea.slug,
        description: programArea.description || '',
        hero_image: programArea.hero_image || '',
        seo_title: programArea.seo_title || '',
        seo_description: programArea.seo_description || '',
        order_index: programArea.order_index,
        icon: programArea.icon || '',
        icon_url: programArea.icon_url || ''
      });
      if (programArea.icon_url) {
        setIconType('custom');
      } else {
        setIconType('lucide');
      }
    } else {
      setEditingProgramArea(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        hero_image: '',
        seo_title: '',
        seo_description: '',
        order_index: 0,
        icon: '',
        icon_url: ''
      });
      setIconType('lucide');
    }
    
    // Reset image upload states
    setSelectedHeroImage(null);
    setUploadingHeroImage(false);
    setHeroImageProgress(0);
    setHeroImageError('');
    
    // Reset icon image states
    setSelectedIconImage(null);
    setUploadingIconImage(false);
    setIconImageProgress(0);
    setIconImageError('');

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProgramArea(null);
    setSelectedHeroImage(null);
    setHeroImageError('');
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleHeroImageSelect = async (file: globalThis.File) => {
    const validation = await imageUploadService.validateImage(file);
    if (!validation.valid) {
      setHeroImageError(validation.error || 'Invalid file');
      return;
    }
    setSelectedHeroImage(file);
    setHeroImageError('');
  };

  const handleHeroImageRemove = () => {
    setSelectedHeroImage(null);
    setFormData(prev => ({ ...prev, hero_image: '' }));
    setHeroImageError('');
  };

  const uploadHeroImage = async (): Promise<string> => {
    if (!selectedHeroImage) return formData.hero_image || '';
    setUploadingHeroImage(true);
    setHeroImageProgress(0);
    try {
      const result = await imageUploadService.uploadImage(
        selectedHeroImage,
        'program-areas/hero',
        setHeroImageProgress
      );
      return result.url || '';
    } catch (error) {
      setHeroImageError('Failed to upload image. Please try again.');
      throw error;
    } finally {
      setUploadingHeroImage(false);
    }
  };

  // Icon image upload handler
  const handleIconImageSelect = (file: File) => {
    const validation = imageUploadService.validateImage(file);
    if (!validation.valid) {
      setIconImageError(validation.error || 'Invalid file');
      return;
    }
    setSelectedIconImage(file);
    setIconImageError('');
  };
  const handleIconImageRemove = () => {
    setSelectedIconImage(null);
    setFormData(prev => ({ ...prev, icon_url: '' }));
    setIconImageError('');
  };
  const uploadIconImage = async (): Promise<string> => {
    if (!selectedIconImage) return formData.icon_url || '';
    setUploadingIconImage(true);
    setIconImageProgress(0);
    try {
      const result = await imageUploadService.uploadImage(
        selectedIconImage,
        'program-areas/icons',
        setIconImageProgress
      );
      return result.url;
    } catch (error) {
      setIconImageError('Failed to upload icon image. Please try again.');
      throw error;
    } finally {
      setUploadingIconImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHeroImageError('');
    setIconImageError('');

    try {
      // Upload hero image if selected
      const heroImageUrl = await uploadHeroImage();
      let iconUrl = formData.icon_url || '';
      if (iconType === 'custom') {
        iconUrl = await uploadIconImage();
      }
      const programAreaData: any = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        hero_image: heroImageUrl,
        seo_title: formData.seo_title,
        seo_description: formData.seo_description,
        order_index: formData.order_index,
        icon: iconType === 'lucide' ? formData.icon : null,
        icon_url: iconType === 'custom' ? iconUrl : null
      };

      if (editingProgramArea) {
        await programAreasApi.updateProgramArea(editingProgramArea.id, programAreaData);
      } else {
        await programAreasApi.createProgramArea(programAreaData);
      }

      await refetch();
      closeModal();
    } catch (error) {
      console.error('Failed to save program area:', error);
      if (error && typeof error === 'object' && 'message' in error) {
        alert(`Failed to save program area: ${(error as any).message}`);
      } else {
        alert('Failed to save program area. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program area?')) return;

    try {
      await programAreasApi.deleteProgramArea(id);
      await refetch();
    } catch (error) {
      console.error('Failed to delete program area:', error);
      alert('Failed to delete program area. Please try again.');
    }
  };

  const viewProgramArea = (programArea: ProgramArea) => {
    window.open(`/areas/${programArea.slug}`, '_blank');
  };

  const openFeatureModal = (programAreaId: string, feature?: any) => {
    setFeatureForm(feature ? {
      title: feature.title,
      subtitle: feature.subtitle || '',
      description: feature.description || '',
      image: feature.image || '',
      orderIndex: feature.orderIndex || 0
    } : { title: '', subtitle: '', description: '', image: '', orderIndex: 0 });
    setFeatureModal({ open: true, programAreaId, feature });
  };

  const closeFeatureModal = () => {
    setFeatureModal({ open: false });
    setFeatureForm({ title: '', subtitle: '', description: '', image: '', orderIndex: 0 });
  };

  const handleFeatureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeatureSubmitting(true);
    try {
      if (featureModal.feature) {
        // Update
        await axios.put(`/api/program-areas/features/${featureModal.feature.id}`, featureForm);
      } else {
        // Create
        await axios.post(`/api/program-areas/${featureModal.programAreaId}/features`, featureForm);
      }
      // Refresh features
      const res = await axios.get(`/api/program-areas/${featureModal.programAreaId}/features`);
      setFeaturesByArea(prev => ({ ...prev, [featureModal.programAreaId!]: res.data.data || [] }));
      closeFeatureModal();
    } catch (err) {
      alert('Failed to save feature.');
    } finally {
      setFeatureSubmitting(false);
    }
  };

  const handleDeleteFeature = async (programAreaId: string, featureId: string) => {
    if (!window.confirm('Delete this feature?')) return;
    try {
      await axios.delete(`/api/program-areas/features/${featureId}`);
      const res = await axios.get(`/api/program-areas/${programAreaId}/features`);
      setFeaturesByArea(prev => ({ ...prev, [programAreaId]: res.data.data || [] }));
    } catch (err) {
      alert('Failed to delete feature.');
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Programs Admin</h1>
                <p className="text-gray-600">Manage program areas and projects</p>
              </div>
              <div className="flex items-center gap-4">
                {activeTab === 'program-areas' && (
                  <button
                    onClick={() => openModal()}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Program Area
                  </button>
                )}
              </div>
            </div>
            
            {/* Tabs */}
            <div className="mt-8 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => {
                    setActiveTab('program-areas');
                    setSelectedProgramAreaId(null);
                  }}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'program-areas'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FolderOpen className="w-4 h-4 mr-2 inline" />
                  Program Areas
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'projects'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Goal className="w-4 h-4 mr-2 inline" />
                  All Projects
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'program-areas' ? (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">All Program Areas</h2>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search program areas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="order_index">Order</option>
                      <option value="name">Name</option>
                      <option value="created_at">Created Date</option>
                    </select>
                    
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <p className="text-sm text-gray-600">
                Showing {sortedAreas.length} of {programAreas.length} program areas
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : sortedAreas.length === 0 ? (
              <div className="text-center py-20">
                <Goal className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Program Areas Yet</h3>
                <p className="text-gray-600 mb-6">Get started by adding your first program area.</p>
                <button
                  onClick={() => openModal()}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add First Program Area
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {sortedAreas.map((programArea) => (
                  <div key={programArea.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        {/* Program Area Image */}
                        {programArea.hero_image && (
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={programArea.hero_image}
                              alt={programArea.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {/* Icon display logic */}
                            {programArea.icon_url
                              ? <img src={programArea.icon_url} alt="icon" className="inline w-5 h-5 mr-2 align-middle" />
                              : programArea.icon && getLucideIcon(programArea.icon)
                            }
                            <h3 className="text-lg font-semibold text-gray-900">
                              {programArea.name}
                            </h3>
                            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              Order: {programArea.order_index}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span>Slug: /{programArea.slug}</span>
                          </div>

                          {programArea.description && (
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                              {programArea.description}
                            </p>
                          )}

                          {programArea.seo_title && (
                            <div className="mt-2">
                              <span className="text-xs text-gray-500">SEO Title: </span>
                              <span className="text-xs text-gray-700">{programArea.seo_title}</span>
                            </div>
                          )}
                          {programArea.icon && (
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full ml-2">
                              Icon: {programArea.icon}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => viewProgramArea(programArea)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Program Area"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProgramAreaId(programArea.id);
                            setActiveTab('projects');
                          }}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Manage Projects"
                        >
                          <Goal className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal(programArea)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Program Area"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(programArea.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Program Area"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold mb-2">Featured Sections</h4>
                      <button
                        className="mb-2 px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                        onClick={() => openFeatureModal(programArea.id)}
                      >
                        + Add Feature
                      </button>
                      <ul className="divide-y divide-gray-100">
                        {(featuresByArea[programArea.id] || []).map(feature => (
                          <li key={feature.id} className="py-2 flex items-center justify-between">
                            <div>
                              <span className="font-medium text-gray-900">{feature.title}</span>
                              {feature.subtitle && <span className="ml-2 text-xs text-gray-500">{feature.subtitle}</span>}
                            </div>
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:underline text-xs" onClick={() => openFeatureModal(programArea.id, feature)}>Edit</button>
                              <button className="text-red-600 hover:underline text-xs" onClick={() => handleDeleteFeature(programArea.id, feature.id)}>Delete</button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {selectedProgramAreaId && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-blue-900">
                        Filtering by: {programAreas.find(pa => pa.id === selectedProgramAreaId)?.name}
                      </h3>
                      <p className="text-sm text-blue-700">Showing projects for this program area only</p>
                    </div>
                    <button
                      onClick={() => setSelectedProgramAreaId(null)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
              <ProjectsAdmin programAreaId={selectedProgramAreaId || undefined} />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProgramArea ? 'Edit Program Area' : 'Add New Program Area'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter program area name"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="program-area-slug"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Auto-generated from name, but you can customize it
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Image
                    </label>
                    <ImageUpload
                      onImageSelect={handleHeroImageSelect}
                      onImageRemove={handleHeroImageRemove}
                      selectedImage={selectedHeroImage}
                      currentImageUrl={formData.hero_image}
                      uploading={uploadingHeroImage}
                      uploadProgress={heroImageProgress}
                      error={heroImageError}
                      label="Upload Hero Image"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Program area description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      value={formData.seo_title}
                      onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="SEO title for search engines"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Index
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.order_index}
                      onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon
                    </label>
                    <div className="flex items-center gap-4 mb-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="iconType"
                          value="lucide"
                          checked={iconType === 'lucide'}
                          onChange={() => setIconType('lucide')}
                        />
                        <span>Lucide Icon</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="iconType"
                          value="custom"
                          checked={iconType === 'custom'}
                          onChange={() => setIconType('custom')}
                        />
                        <span>Custom Upload</span>
                      </label>
                    </div>
                    {iconType === 'lucide' ? (
                      <input
                        type="text"
                        value={formData.icon || ''}
                        onChange={e => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g. Globe, Users, Zap"
                      />
                    ) : (
                      <ImageUpload
                        onImageSelect={handleIconImageSelect}
                        onImageRemove={handleIconImageRemove}
                        selectedImage={selectedIconImage}
                        currentImageUrl={formData.icon_url}
                        uploading={uploadingIconImage}
                        uploadProgress={iconImageProgress}
                        error={iconImageError}
                        label="Upload Custom Icon"
                        maxSize={1}
                      />
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      {iconType === 'lucide'
                        ? 'Enter a Lucide icon name (e.g. Globe)'
                        : 'Upload a small PNG, JPEG, or WebP icon (max 1MB).'}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.seo_description}
                      onChange={(e) => setFormData(prev => ({ ...prev, seo_description: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="SEO description for search engines"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 mt-8">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || uploadingHeroImage || uploadingIconImage}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting || uploadingHeroImage || uploadingIconImage ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {uploadingHeroImage ? 'Uploading...' : uploadingIconImage ? 'Uploading Icon...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      {editingProgramArea ? 'Update' : 'Create'} Program Area
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {featureModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
            <h3 className="text-lg font-bold mb-4">{featureModal.feature ? 'Edit' : 'Add'} Feature</h3>
            <form onSubmit={handleFeatureSubmit} className="space-y-4">
              <input type="text" required placeholder="Title" value={featureForm.title} onChange={e => setFeatureForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 border rounded" />
              <input type="text" placeholder="Subtitle" value={featureForm.subtitle} onChange={e => setFeatureForm(f => ({ ...f, subtitle: e.target.value }))} className="w-full px-3 py-2 border rounded" />
              <input type="text" placeholder="Image URL" value={featureForm.image} onChange={e => setFeatureForm(f => ({ ...f, image: e.target.value }))} className="w-full px-3 py-2 border rounded" />
              <textarea placeholder="Description" value={featureForm.description} onChange={e => setFeatureForm(f => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 border rounded" />
              <input type="number" placeholder="Order Index" value={featureForm.orderIndex} onChange={e => setFeatureForm(f => ({ ...f, orderIndex: parseInt(e.target.value) || 0 }))} className="w-full px-3 py-2 border rounded" />
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={closeFeatureModal} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
                <button type="submit" disabled={featureSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded">{featureSubmitting ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramAreasAdmin;