import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { ProjectCarousel } from '../components/projects/ProjectCarousel';
import { ProjectOverview } from '../components/projects/ProjectOverview';
import { ProjectStatusBadge } from '../components/projects/ProjectStatusBadge';

const statusOptions: { value: 'active' | 'completed' | 'on_hold' | 'cancelled' | 'all'; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'cancelled', label: 'Cancelled' }
];

const ProjectsPage = () => {
  const { projects, loading, error } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'active' | 'completed' | 'on_hold' | 'cancelled' | 'all'>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading projects: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-dark-blue transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            </div>
            <button className="bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-dark-blue transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Project
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Projects Carousel */}
        {projects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Projects</h2>
            <ProjectCarousel projects={projects.slice(0, 5)} />
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'active' | 'completed' | 'on_hold' | 'cancelled' | 'all')}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent appearance-none bg-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectOverview key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Plus className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first project'
              }
            </p>
            <button className="bg-brand-blue text-white px-6 py-3 rounded-lg hover:bg-brand-dark-blue transition-colors">
              Create Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;