import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Users, Calendar, MapPin, Target, ExternalLink } from 'lucide-react';
import { useProgramAreas } from '../hooks/useProgramAreas';
import { useProjects } from '../hooks/useProjects';
import { ProjectCard } from '../components/projects/ProjectCard';
import Footer from '../components/Footer';

const ProgramAreaDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { programAreas, loading: programAreasLoading } = useProgramAreas();
  const { projects, loading: projectsLoading } = useProjects();
  
  const [programArea, setProgramArea] = useState<any>(null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);

  useEffect(() => {
    if (programAreas && slug) {
      const area = programAreas.find(pa => pa.slug === slug);
      setProgramArea(area);
    }
  }, [programAreas, slug]);

  useEffect(() => {
    if (projects && programArea) {
      const filtered = projects.filter(project => project.program_area_id === programArea.id);
      setRelatedProjects(filtered);
    }
  }, [projects, programArea]);

  if (programAreasLoading || projectsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!programArea) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Program Area Not Found</h1>
          <button
            onClick={() => navigate('/our-work')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Return to Our Work
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link to="/our-work" className="text-gray-500 hover:text-gray-700">
              Our Work
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{programArea.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {programArea.hero_image && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${programArea.hero_image})` }}
          >
            <div className="absolute inset-0 bg-blue-900 opacity-75"></div>
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <button
            onClick={() => navigate('/our-work')}
            className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Our Work
          </button>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {programArea.name}
            </h1>
            {programArea.description && (
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                {programArea.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {/* Annual Letter Section */}
          <section className="mb-12">
            <div className="bg-white border border-gray-200 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-lg w-full">
              <div className="md:w-1/2 w-full h-96 flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                  alt="Annual Letter"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="md:w-1/2 w-full p-12 flex flex-col justify-center bg-white">
                <div>
                  <span className="uppercase text-xs tracking-widest text-blue-700 font-semibold mb-2 block">Message from our CEO</span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Annual Letter</h2>
                  <p className="text-gray-800 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore nulla pariatur.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* New Mirrored Section: Image Right, Text Left */}
          <section className="mb-12">
            <div className="bg-white border border-gray-200 rounded-2xl flex flex-col md:flex-row-reverse overflow-hidden shadow-lg">
              <div className="md:w-1/2 w-full h-64 md:h-auto flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
                  alt="Program Highlight"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="md:w-1/2 w-full p-8 flex flex-col justify-between">
                <div>
                  <span className="uppercase text-xs tracking-widest text-blue-700 font-semibold mb-2 block">Program Highlight</span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Spotlight Initiative</h2>
                  <p className="text-gray-800 mb-4">
                    This is a placeholder for a featured program, initiative, or story. You can use this section to showcase a recent success, a key partner, or a unique aspect of this program area. Update this text and image as needed to keep your content fresh and engaging.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Add more details here about the impact, goals, or people involved. This layout mirrors the annual letter, but with the image on the right for visual variety.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Projects & Initiatives
              </h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {relatedProjects.length} {relatedProjects.length === 1 ? 'Project' : 'Projects'}
              </span>
            </div>

            {relatedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Projects Yet
                </h3>
                <p className="text-gray-600">
                  Projects for this program area are currently in development.
                </p>
              </div>
            )}
          </section>

          {/* Impact Metrics */}
          {relatedProjects.length > 0 && (
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {relatedProjects.length}
                  </div>
                  <div className="text-gray-600">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {relatedProjects.filter(p => p.status === 'completed').length}
                  </div>
                  <div className="text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {new Set(relatedProjects.map(p => p.location).filter(Boolean)).size}
                  </div>
                  <div className="text-gray-600">Locations</div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProgramAreaDetailPage;