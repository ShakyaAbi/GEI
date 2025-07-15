import React from 'react';
import { Calendar, MapPin, DollarSign, Users, Goal, Award, TrendingUp, Clock } from 'lucide-react';
import { ProjectStatusBadge } from './ProjectStatusBadge';
import type { Project } from '../../types/project';

interface ProjectOverviewProps {
  project: Project;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{project.title}</h2>
          <div className="flex items-center gap-3">
            <ProjectStatusBadge status={project.status || 'active'} />
            {project.program_areas?.name && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {project.program_areas.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hero Image */}
      {project.hero_image && (
        <div className="mb-6 rounded-xl overflow-hidden shadow-md">
          <img
            src={project.hero_image}
            alt={project.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Description */}
      {project.description && (
        <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
      )}

      {/* Key Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {project.start_date && (
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Start Date</p>
              <p className="text-gray-600 text-sm">{formatDate(project.start_date)}</p>
            </div>
          </div>
        )}

        {project.end_date && (
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">End Date</p>
              <p className="text-gray-600 text-sm">{formatDate(project.end_date)}</p>
            </div>
          </div>
        )}

        {project.location && (
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Location</p>
              <p className="text-gray-600 text-sm">{project.location}</p>
            </div>
          </div>
        )}

        {project.budget && (
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Budget</p>
              <p className="text-gray-600 text-sm">{project.budget}</p>
            </div>
          </div>
        )}
      </div>

      {/* Beneficiaries Highlight */}
      {project.beneficiaries && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-700">Direct Beneficiaries</p>
              <p className="text-2xl font-bold text-green-800">{project.beneficiaries}</p>
            </div>
          </div>
        </div>
      )}

      {/* Impact Metrics */}
      {project.impact_metrics && project.impact_metrics.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Goal className="w-5 h-5 mr-2 text-blue-600" />
            Impact Metrics
          </h3>
          <div className="space-y-2">
            {project.impact_metrics.slice(0, 3).map((metric, index) => (
              <div key={index} className="flex items-start p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm leading-relaxed">{metric}</span>
              </div>
            ))}
            {project.impact_metrics.length > 3 && (
              <p className="text-sm text-gray-500 italic pl-5">
                +{project.impact_metrics.length - 3} more metrics
              </p>
            )}
          </div>
        </div>
      )}

      {/* Stakeholders */}
      {project.project_stakeholders && project.project_stakeholders.length > 0 && (
        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Key Stakeholders</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.project_stakeholders.slice(0, 4).map((stakeholder) => (
              <div key={stakeholder.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-medium text-gray-900 text-sm">{stakeholder.name}</p>
                <p className="text-gray-600 text-xs">{stakeholder.role}</p>
                {stakeholder.organization && (
                  <p className="text-gray-500 text-xs mt-1">{stakeholder.organization}</p>
                )}
              </div>
            ))}
            {project.project_stakeholders.length > 4 && (
              <div className="p-3 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                <p className="text-gray-600 text-sm">
                  +{project.project_stakeholders.length - 4} more
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}