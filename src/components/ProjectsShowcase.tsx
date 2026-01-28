import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight, ShieldCheck } from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import type { Project } from "../types/project";

const statusStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  on_hold: "bg-amber-100 text-amber-800 border-amber-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  planning: "bg-purple-100 text-purple-800 border-purple-200",
};

const ProjectsShowcase = () => {
  const { projects, loading, error } = useProjects();

  const featuredProjects = useMemo(() => {
    const sorted = [...projects].sort((a: Project, b: Project) => {
      const aOrder = a.order_index ?? 0;
      const bOrder = b.order_index ?? 0;
      if (aOrder !== bOrder) return aOrder - bOrder;
      const aDate = a.created_at ? new Date(a.created_at).getTime() : 0;
      const bDate = b.created_at ? new Date(b.created_at).getTime() : 0;
      return bDate - aDate;
    });
    return sorted.slice(0, 3);
  }, [projects]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
              Our Projects
            </p>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mt-2">
              Community-led initiatives in action
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              Explore a few of our current and completed projects driving measurable impact
              across health, climate resilience, and sustainable livelihoods.
            </p>
          </div>
          <Link
            to="/our-work"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 rounded-2xl border border-gray-200 bg-gray-50 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            Unable to load projects right now. Please try again later.
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-gray-600">
            No projects available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => {
              const status = project.status || "active";
              const badgeStyle = statusStyles[status] || statusStyles.active;
              const imageUrl = project.hero_image || project.image;
              const detailPath = `/projects/${project.slug || project.id}`;

              return (
                <Link
                  key={project.id}
                  to={detailPath}
                  className="group rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 relative">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-blue-800/60">
                        <ShieldCheck className="w-10 h-10" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${badgeStyle}`}
                      >
                        {status.replace("_", " ")}
                      </span>
                      {project.program_areas?.name && (
                        <span className="text-xs text-gray-500">
                          {project.program_areas.name}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                        {project.description}
                      </p>
                    )}
                    {project.location && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        {project.location}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsShowcase;
