import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, MapPin, Calendar, Users, DollarSign, Target, Eye, Search, Filter, Loader2, AlertCircle, Upload, Image as ImageIcon } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import { useProgramAreas } from '../../hooks/useProgramAreas';
import { ProjectStatusBadge } from '../projects/ProjectStatusBadge';
import ImageUpload from './ImageUpload';
import { imageUploadService } from '../../lib/imageUpload';
import type { Project, ProjectFormData, ProjectStatus } from '../../types/project';
import ProjectContentEditor from './ProjectContentEditor';
import { fetchProjectContent } from '../../lib/projectsApi';

interface ProjectsAdminProps {
  programAreaId?: string;
}

const ProjectsAdmin: React.FC<ProjectsAdminProps> = ({ programAreaId }) => {
  const { projects, loading, error, createProject, updateProject, deleteProject } = useProjects();
  const { programAreas } = useProgramAreas();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [programAreaFilter, setProgramAreaFilter] = useState<string>(programAreaId || 'all');
  
  // Image upload states
  const [selectedHeroImage, setSelectedHeroImage] = useState<globalThis.File | null>(null);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [heroImageProgress, setHeroImageProgress] = useState(0);
  const [heroImageError, setHeroImageError] = useState<string>('');

  // Project content state
  const [projectContent, setProjectContent] = useState<any[]>([]);

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    location: '',
    duration: '',
    status: 'active',
    budget: '',
    beneficiaries: '',
    impact_metrics: [],
    program_area_id: programAreaId || '',
    order_index: 0,
    start_date: '',
    end_date: '',
    slug: '',
    hero_image: ''
  });

  const [impactMetric, setImpactMetric] = useState('');

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesProgramArea = programAreaFilter === 'all' || project.program_area_id === programAreaFilter;
    return matchesSearch && matchesStatus && matchesProgramArea;
  });

  const openModal = async (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description || '',
        location: project.location || '',
        duration: project.duration || '',
        status: project.status || 'active',
        budget: project.budget || '',
        beneficiaries: project.beneficiaries || '',
        impact_metrics: project.impact_metrics || [],
        program_area_id: project.program_area_id || programAreaId || '',
        order_index: project.order_index || 0,
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        slug: project.slug || '',
        hero_image: project.hero_image || ''
      });
      // Fetch project content from backend
      const res = await fetchProjectContent(project.id);
      setProjectContent(res.data || []);
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        location: '',
        duration: '',
        status: 'active',
        budget: '',
        beneficiaries: '',
        impact_metrics: [],
        program_area_id: programAreaId || '',
        order_index: 0,
        start_date: '',
        end_date: '',
        slug: '',
        hero_image: ''
      });
      setProjectContent([]);
    }
    
    // Reset image upload states
    setSelectedHeroImage(null);
    setUploadingHeroImage(false);
    setHeroImageProgress(0);
    setHeroImageError('');
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setImpactMetric('');
    setSelectedHeroImage(null);
    setHeroImageError('');
    setProjectContent([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setFormData((prev: ProjectFormData) => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value)
      }));
    } else if (name === 'budget') {
      setFormData((prev: ProjectFormData) => ({ ...prev, budget: value }));
    } else {
      setFormData((prev: ProjectFormData) => ({ ...prev, [name]: value }));
    }
  };

  const addImpactMetric = () => {
    if ((impactMetric || '').trim()) {
      setFormData((prev: ProjectFormData) => ({
        ...prev,
        impact_metrics: [...((prev.impact_metrics ?? [])), (impactMetric || '').trim()]
      }));
      setImpactMetric('');
    }
  };

  const removeImpactMetric = (index: number) => {
    setFormData((prev: ProjectFormData) => ({
      ...prev,
      impact_metrics: (prev.impact_metrics ?? []).filter((_: string, i: number) => i !== index)
    }));
  };

  const handleHeroImageSelect = (file: globalThis.File) => {
    const validation = imageUploadService.validateImage(file);
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
    if (!selectedHeroImage) return formData.hero_image;

    setUploadingHeroImage(true);
    setHeroImageProgress(0);

    try {
      const result = await imageUploadService.uploadImage(
        selectedHeroImage, 
        'projects/hero', 
        setHeroImageProgress
      );
      return result.url;
    } catch (error) {
      setHeroImageError('Failed to upload image. Please try again.');
      throw error;
    } finally {
      setUploadingHeroImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHeroImageError(''); // Clear previous image errors
    try {
      // Upload hero image if selected
      const heroImageUrl = await uploadHeroImage();

      // Clean up form data before submission
      const projectData: ProjectFormData = {
        title: formData.title,
        description: formData.description || '',
        location: formData.location || '',
        duration: formData.duration || '',
        status: formData.status,
        budget: formData.budget !== '' && !isNaN(Number(formData.budget)) ? String(Number(formData.budget)) : undefined,
        beneficiaries: formData.beneficiaries || '',
        impact_metrics: formData.impact_metrics.length > 0 ? formData.impact_metrics : [],
        program_area_id: formData.program_area_id || '',
        order_index: formData.order_index,
        start_date: formData.start_date || '',
        end_date: formData.end_date || '',
        slug: formData.slug || generateSlug(formData.title),
        hero_image: heroImageUrl
        // Note: project_content will be handled separately in a real implementation
      };

      if (editingProject) {
        await updateProject(editingProject.id, projectData);
      } else {
        await createProject(projectData);
      }

      closeModal();
    } catch (error) {
      console.error('Failed to save project:', error);
      if (error && typeof error === 'object' && 'message' in error) {
        setHeroImageError((error as any).message || 'Failed to save project. Please try again.');
      } else {
        setHeroImageError('Failed to save project. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteProject(id);
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  const viewProject = (project: Project) => {
    window.open(`/projects/${project.slug || project.id}`, '_blank');
  };

  if (error) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Projects</h3>
        <p className="text-gray-600">There was an error loading the projects. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600">Manage projects within program areas</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Project
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {!programAreaId && (
              <select
                value={programAreaFilter}
                onChange={(e) => setProgramAreaFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Program Areas</option>
                {programAreas.map(area => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' || programAreaFilter !== 'all'
                ? 'No projects match your current filters.'
                : 'Get started by creating your first project.'
              }
            </p>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Project
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredProjects.map((project) => (
              <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    {/* Project Hero Image */}
                    {project.hero_image && (
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                        <img
                          src={project.hero_image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {project.title}
                      </h3>
                      <ProjectStatusBadge status={project.status || 'active'} />
                    </div>
                    
                    {project.description && (
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      {project.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{project.location}</span>
                        </div>
                      )}
                      {project.start_date && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{new Date(project.start_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {project.beneficiaries && (
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{project.beneficiaries}</span>
                        </div>
                      )}
                      {project.budget && (
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          <span>{project.budget}</span>
                        </div>
                      )}
                    </div>

                      {project.program_areas && (
                        <div className="text-sm text-blue-600 font-medium">
                          {typeof project.program_areas === 'object' && project.program_areas?.name 
                            ? project.program_areas.name 
                            : programAreas.find(pa => pa.id === project.program_area_id)?.name || 'No Program Area'
                          }
                        </div>
                      )}
                    </div>
                    </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => viewProject(project)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Project"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal(project)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Project"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
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
                      Project Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter project title"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Describe the project objectives and impact"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Project location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 6 months"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="on_hold">On Hold</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Program Area
                    </label>
                    <select
                      name="program_area_id"
                      value={formData.program_area_id}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={!!programAreaId}
                    >
                      <option value="">Select a program area</option>
                      {programAreas.map(area => (
                        <option key={area.id} value={area.id}>
                          {area.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., $50,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Beneficiaries
                    </label>
                    <input
                      type="text"
                      name="beneficiaries"
                      value={formData.beneficiaries}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 500 families"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Impact Metrics
                    </label>
                    <div className="space-y-3">
                      {(formData.impact_metrics ?? []).map((metric: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <Target className="w-4 h-4 text-gray-400" />
                          <span className="flex-1 text-sm">{metric}</span>
                          <button
                            type="button"
                            onClick={() => removeImpactMetric(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={impactMetric}
                          onChange={(e) => setImpactMetric(e.target.value)}
                          placeholder="Add impact metric"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={addImpactMetric}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                {/* Project Content Editor */}
                <div className="md:col-span-2">
                  {editingProject?.id ? (
                  <ProjectContentEditor
                      projectId={editingProject.id}
                    content={projectContent}
                    onContentUpdate={setProjectContent}
                  />
                  ) : (
                    <div className="p-6 bg-gray-50 rounded-lg text-gray-500 text-center border border-dashed border-gray-300">
                      Save the project first to add content.
                    </div>
                  )}
                </div>

                  <div>
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
                </div>
              </div>

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
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting || uploadingHeroImage ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {uploadingHeroImage ? 'Uploading...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      {editingProject ? 'Update' : 'Create'} Project
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

export default ProjectsAdmin;