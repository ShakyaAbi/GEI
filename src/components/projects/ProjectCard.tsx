import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, ArrowRight, Clock, Target, Award, TrendingUp } from 'lucide-react';
import type { Project } from '../../types/project';
import { ProjectStatusBadge } from './ProjectStatusBadge';

interface ProjectCardProps {
  project: Project;
  viewMode?: 'grid' | 'list';
}

export function ProjectCard({ project, viewMode = 'grid' }: ProjectCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
        <div className="flex flex-col md:flex-row gap-6">
          {(project.hero_image || project.image) && (
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="aspect-video md:aspect-square rounded-xl overflow-hidden shadow-md">
                <img
                  src={project.hero_image || project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          )}
          
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>
              {project.status && <ProjectStatusBadge status={project.status} />}
            </div>
            
            {project.description && (
              <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              {(project.start_date || project.end_date) && (
                <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4 mr-1 text-blue-600" />
                  <span>
                    {project.start_date && formatDate(project.start_date)}
                    {project.start_date && project.end_date && ' - '}
                    {project.end_date && formatDate(project.end_date)}
                    {!project.end_date && project.start_date && ' - Ongoing'}
                  </span>
                </div>
              )}
              {project.location && (
                <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                  <MapPin className="w-4 h-4 mr-1 text-green-600" />
                  <span>{project.location}</span>
                </div>
              )}
              {project.beneficiaries && (
                <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                  <Users className="w-4 h-4 mr-1 text-purple-600" />
                  <span>{project.beneficiaries}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <Link 
                to={`/projects/${project.slug || project.id}`} 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 group/btn"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/projects/${project.slug || project.id}`} className="group block">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
        {(project.hero_image || project.image) && (
          <div className="aspect-video overflow-hidden relative">
            <img
              src={project.hero_image || project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Floating Status Badge */}
            <div className="absolute top-4 right-4">
              {project.status && <ProjectStatusBadge status={project.status} />}
            </div>
          </div>
        )}
        
        <div className="p-6 bg-gradient-to-br from-white to-gray-50/50">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
              {project.title}
            </h3>
          </div>
          
          {project.description && (
            <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
            {(project.start_date || project.end_date) && (
              <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
                <Clock className="w-3 h-3 mr-1 text-blue-600" />
                <span className="text-xs">
                  {project.start_date && formatDate(project.start_date)}
                  {project.start_date && project.end_date && ' - '}
                  {project.end_date && formatDate(project.end_date)}
                  {!project.end_date && project.start_date && ' - Ongoing'}
                </span>
              </div>
            )}
            {project.location && (
              <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
                <MapPin className="w-3 h-3 mr-1 text-green-600" />
                <span className="text-xs">{project.location}</span>
              </div>
            )}
            {project.beneficiaries && (
              <div className="flex items-center bg-purple-50 px-2 py-1 rounded-full">
                <Users className="w-3 h-3 mr-1 text-purple-600" />
                <span className="text-xs">{project.beneficiaries}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center text-blue-600 group-hover:text-blue-800 font-semibold">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="text-sm">View Details</span>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-600 group-hover:text-blue-800 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}