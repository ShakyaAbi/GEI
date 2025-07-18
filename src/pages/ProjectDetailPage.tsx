import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Home, 
  ChevronRight,
  Share2,
  Download,
  ExternalLink,
  Mail,
  Twitter,
  Linkedin,
  Copy,
  Play,
  Pause,
  XCircle,
  TrendingUp,
  Award,
  Globe,
  ImageIcon,
  Goal
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Footer from '../components/Footer';
import { projectsApi, fetchProjectBySlug, fetchProjectWithCustomFields, fetchProjectContent } from '../lib/projectsApi';
import type { ProjectWithCustomFields } from '../types/project';
import { ProjectStatusBadge } from '../components/projects/ProjectStatusBadge';
import ImageGalleryCarousel from '../components/ImageGalleryCarousel';
import ProjectContentViewer from '../components/projects/ProjectContentViewer';
import ProjectMediaGallery from '../components/projects/ProjectMediaGallery';
import ReactMarkdown from 'react-markdown';

// Helper to get Lucide icon component by name
function getLucideIcon(iconName: string) {
  if (!iconName) return null;
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent ? <IconComponent className="w-5 h-5 mr-2 text-blue-500 inline-block align-middle" /> : null;
}

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectWithCustomFields | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (slug) {
      loadProjectData();
    }
  }, [slug]);

  useEffect(() => {
    if (project) {
      console.log('Project impact_metrics:', project.impact_metrics, project.impactMetrics);
    }
  }, [project]);

  // Helper function to check if a string is a UUID
  const isUUID = (str: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  };

  const loadProjectData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if slug is actually a UUID and use appropriate API call
      let projectData;
      let projectError;
      
      if (isUUID(slug!)) {
        // If it's a UUID, fetch by ID
        projectData = await projectsApi.getProject(slug!);
        projectError = projectData ? null : new Error('Project not found');
      } else {
        // If it's a slug, fetch by slug
        const result = await fetchProjectBySlug(slug!);
        projectData = result.data;
        projectError = result.error;
      }
      
      if (projectError) throw projectError;
      
      if (!projectData) {
        throw new Error('Project not found');
      }

      // Get project with custom fields if we have basic project data
      let projectWithFields = projectData;
      if (projectData) {
        const { data: fieldsData, error: fieldsError } = await fetchProjectWithCustomFields(projectData.id);
        if (fieldsError) throw fieldsError;
        projectWithFields = fieldsData || projectData;
      }

      // Map media to project_media for gallery compatibility
      if (projectWithFields && projectWithFields.media && !projectWithFields.project_media) {
        projectWithFields.project_media = projectWithFields.media;
      }

      // Fetch real project content
      const { data: projectContent } = await fetchProjectContent(projectData.id);
      projectWithFields.project_content = projectContent || [];
      setProject(projectWithFields);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async (platform: string) => {
    if (!project) return;

    const url = window.location.href;
    const title = project.title;
    const text = `Check out this project: ${title}`;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy URL:', err);
        }
        break;
    }
  };

  const renderCustomField = (field: any) => {
    switch (field.field_type) {
      case 'url':
        return (
          <a 
            href={field.field_value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {field.field_value}
          </a>
        );
      case 'email':
        return (
          <a 
            href={`mailto:${field.field_value}`}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {field.field_value}
          </a>
        );
      case 'date':
        return formatDate(field.field_value) || field.field_value;
      case 'boolean':
        return field.field_value === 'true' ? 'Yes' : 'No';
      default:
        return field.field_value;
    }
  };

  // Defensive fallback for impact metrics
  const impactMetrics = project?.impact_metrics || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-300 animate-ping mx-auto"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Project</h3>
          <p className="text-gray-600">Please wait while we fetch the project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/our-work')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Our Work
            </button>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const projectImages = project?.project_media?.map(media => ({
    src: media.fileUrl,
    alt: media.fileName,
    caption: media.caption || media.fileName
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 py-4 text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-600 flex items-center transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/our-work" className="text-gray-500 hover:text-blue-600 transition-colors">
              Our Work
            </Link>
            {project?.program_areas && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Link 
                  to={`/areas/${project.program_areas?.slug}`}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {project.program_areas?.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{project?.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {(project?.hero_image || project?.image) ? (
          <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] min-h-[300px] sm:min-h-[400px]">
            <img
              src={project.hero_image || project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            {/* Hero Content */}
            <div className="absolute inset-0 flex items-end">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 w-full">
                <div className="max-w-4xl">
                  {/* Back Button */}
                  <button
                    onClick={() => navigate('/our-work')}
                    className="inline-flex items-center text-white/90 hover:text-white font-medium mb-4 sm:mb-6 group bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 hover:bg-white/20 text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Our Work
                  </button>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <ProjectStatusBadge status={project.status || 'active'} size="lg" />
                    {project.program_areas?.name && (
                      <span className="px-3 py-1 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full border border-white/30 flex items-center">
                        {project.program_areas.icon && getLucideIcon(project.program_areas.icon)}
                        {project.program_areas.name}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white mb-3 sm:mb-6 leading-tight">
                    {project.title}
                  </h1>
                  
                  {project.description && (
                    <p className="text-base sm:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8 max-w-3xl">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-12 sm:py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl">
                {/* Back Button */}
                <button
                  onClick={() => navigate('/our-work')}
                  className="inline-flex items-center text-white/90 hover:text-white font-medium mb-4 sm:mb-8 group bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 hover:bg-white/20 text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Our Work
                </button>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                  <ProjectStatusBadge status={project.status || 'active'} size="lg" />
                  {project.program_areas?.name && (
                    <span className="px-3 py-1 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full border border-white/30 flex items-center">
                      {project.program_areas.icon && getLucideIcon(project.program_areas.icon)}
                      {project.program_areas.name}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white mb-3 sm:mb-6 leading-tight">
                  {project.title}
                </h1>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Overview (moved here) */}
            {project.overview && (
              <section className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                  Project Overview
                </h2>
                <div className="prose max-w-none text-gray-800 text-lg">
                  <ReactMarkdown>{project.overview}</ReactMarkdown>
                </div>
              </section>
            )}

            {/* Project Content */}
            {project.project_content && project.project_content.length > 0 && (
              <ProjectContentViewer content={project.project_content} />
            )}

            {/* Project Gallery */}
            {project.project_media && project.project_media.length > 0 && (
              <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <ImageIcon className="w-6 h-6 mr-3 text-blue-600" />
                  Project Gallery
                </h2>
                <ProjectMediaGallery
                  projectId={project.id}
                  media={project.project_media}
                  isEditable={false}
                />
              </section>
            )}

            {/* Impact Metrics */}
            {impactMetrics.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Goal className="w-6 h-6 mr-3 text-green-600" />
                  Impact Metrics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {impactMetrics.map((metric: string, index: number) => (
                    <div key={index} className="flex items-start p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed font-medium">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Fields */}
            {project?.custom_fields && project.custom_fields.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-purple-600" />
                  Additional Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.custom_fields.map((field) => (
                    <div key={field.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <dt className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                        {field.field_name}
                      </dt>
                      <dd className="text-gray-900 font-medium">
                        {renderCustomField(field)}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Updates Timeline */}
            {project.project_updates && project.project_updates.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                  Project Updates
                </h2>
                <div className="space-y-8">
                  {project.project_updates.map((update, index) => (
                    <div key={update.id} className="relative">
                      {index !== project.project_updates!.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-transparent"></div>
                      )}
                      <div className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-gray-900 text-lg">{update.title}</h3>
                            <span className="text-sm text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-full">
                              {new Date(update.update_date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{update.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Share Project */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Share2 className="w-5 h-5 mr-2 text-blue-600" />
                Share Project
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="flex items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="flex items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                >
                  {copied ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Project Details</h3>
              <div className="space-y-6">
                {project.start_date && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Start Date</p>
                      <p className="text-gray-600">{formatDate(project.start_date)}</p>
                    </div>
                  </div>
                )}

                {project.end_date && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">End Date</p>
                      <p className="text-gray-600">{formatDate(project.end_date)}</p>
                    </div>
                  </div>
                )}

                {project.location && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p className="text-gray-600">{project.location}</p>
                    </div>
                  </div>
                )}

                {project.budget && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Budget</p>
                      <p className="text-gray-600">{project.budget}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stakeholders */}
            {project.project_stakeholders && project.project_stakeholders.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Stakeholders
                </h3>
                <div className="space-y-4">
                  {project.project_stakeholders.map((stakeholder) => (
                    <div key={stakeholder.id} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      <p className="font-semibold text-gray-900">{stakeholder.name}</p>
                      <p className="text-sm text-blue-600 font-medium">{stakeholder.role}</p>
                      {stakeholder.organization && (
                        <p className="text-sm text-gray-600 mt-1">{stakeholder.organization}</p>
                      )}
                      {stakeholder.email && (
                        <a href={`mailto:${stakeholder.email}`} className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">
                          {stakeholder.email}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-3">Get Involved</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Interested in supporting or learning more about this project?
              </p>
              <button className="w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;