import React, { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2, Upload, MapPin, Calendar, Link, Mail, Hash, Type, Target, Users, DollarSign } from 'lucide-react';
import { useProgramAreas } from '../../hooks/useProgramAreas';
import type { Project, ProjectCustomField } from '../../types/project';
import { generateSlug } from '../../lib/projectsApi';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const { programAreas } = useProgramAreas();
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    location: '',
    duration: '',
    status: 'active',
    budget: '',
    beneficiaries: '',
    impact_metrics: [],
    program_area_id: '',
    order_index: 0,
    start_date: '',
    end_date: '',
    slug: '',
    ...project
  });

  const [customFields, setCustomFields] = useState<Omit<ProjectCustomField, 'id' | 'project_id' | 'created_at'>[]>([]);
  const [impactMetric, setImpactMetric] = useState('');
  const [newCustomField, setNewCustomField] = useState({
    field_name: '',
    field_value: '',
    field_type: 'text' as ProjectCustomField['field_type']
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug when title changes
    if (name === 'title') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, image_url: imageUrl }));
  };

  const addImpactMetric = () => {
    if (impactMetric.trim()) {
      setFormData(prev => ({
        ...prev,
        impact_metrics: [...(prev.impact_metrics || []), impactMetric.trim()]
      }));
      setImpactMetric('');
    }
  };

  const removeImpactMetric = (index: number) => {
    setFormData(prev => ({
      ...prev,
      impact_metrics: prev.impact_metrics?.filter((_, i) => i !== index) || []
    }));
    setImpactMetric('');
  };

  const addCustomField = () => {
    if (newCustomField.field_name && newCustomField.field_value) {
      setCustomFields(prev => [...prev, { ...newCustomField }]);
      setNewCustomField({
        field_name: '',
        field_value: '',
        field_type: 'text'
      });
    }
  };

  const removeCustomField = (index: number) => {
    setCustomFields(prev => prev.filter((_, i) => i !== index));
  };

  const getFieldIcon = (type: ProjectCustomField['field_type']) => {
    switch (type) {
      case 'url': return Link;
      case 'email': return Mail;
      case 'number': return Hash;
      case 'date': return Calendar;
      default: return Type;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, custom_fields: customFields });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {project ? 'Edit Project' : 'Create New Project'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter project title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the project objectives and impact"
            />
          </div>

          {/* Location and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Project location"
                />
              </div>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration || ''}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 6 months"
                />
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date || ''}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date || ''}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              URL Slug
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug || ''}
                onChange={handleInputChange}
                placeholder="project-url-slug"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              This will be used in the project URL: /projects/{formData.slug || 'project-slug'}
            </p>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Budget and Beneficiaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                Budget
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={formData.budget || ''}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., $50,000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="beneficiaries" className="block text-sm font-medium text-gray-700 mb-2">
                Beneficiaries
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="beneficiaries"
                  name="beneficiaries"
                  value={formData.beneficiaries || ''}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 500 families"
                />
              </div>
            </div>
          </div>

          {/* Program Area */}
          <div>
            <label htmlFor="program_area_id" className="block text-sm font-medium text-gray-700 mb-2">
              Program Area
            </label>
            <select
              id="program_area_id"
              name="program_area_id"
              value={formData.program_area_id || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a program area</option>
              {programAreas.map(area => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>

          {/* Impact Metrics */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Impact Metrics
            </label>
            <div className="space-y-3">
              {formData.impact_metrics?.map((metric, index) => (
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

          {/* Custom Fields */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Fields</h3>
            
            {/* Existing Custom Fields */}
            {customFields.length > 0 && (
              <div className="space-y-3 mb-4">
                {customFields.map((field, index) => {
                  const IconComponent = getFieldIcon(field.field_type);
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <IconComponent className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                        <span className="font-medium text-sm text-gray-700">{field.field_name}:</span>
                        <span className="ml-2 text-sm text-gray-600">{field.field_value}</span>
                        <span className="ml-2 text-xs text-gray-400">({field.field_type})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCustomField(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add New Custom Field */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Add Custom Field</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Field name"
                  value={newCustomField.field_name}
                  onChange={(e) => setNewCustomField(prev => ({ ...prev, field_name: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Field value"
                  value={newCustomField.field_value}
                  onChange={(e) => setNewCustomField(prev => ({ ...prev, field_value: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={newCustomField.field_type}
                  onChange={(e) => setNewCustomField(prev => ({ ...prev, field_type: e.target.value as ProjectCustomField['field_type'] }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="boolean">Boolean</option>
                  <option value="url">URL</option>
                  <option value="email">Email</option>
                </select>
                <button
                  type="button"
                  onClick={addCustomField}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Image
            </label>
            <ImageUpload
              currentImage={formData.image_url}
              onImageUpload={handleImageUpload}
              folder="projects"
            />
          </div>

          {/* Order Index */}
          <div>
            <label htmlFor="order_index" className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              id="order_index"
              name="order_index"
              value={formData.order_index || 0}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="mt-1 text-sm text-gray-500">
              Lower numbers appear first in the project list
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {project ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}