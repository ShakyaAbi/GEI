import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users } from 'lucide-react';
import { ProjectStatusBadge } from './ProjectStatusBadge';
import type { Project } from '../../types/project';

interface ProjectCarouselProps {
  projects: Project[];
  autoPlay?: boolean;
  interval?: number;
}

export function ProjectCarousel({ projects, autoPlay = true, interval = 5000 }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || projects.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, projects.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === projects.length - 1 ? 0 : currentIndex + 1);
  };

  if (!projects.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No projects available</p>
      </div>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Project Image */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-500 to-green-500">
        {currentProject.project_media && currentProject.project_media.length > 0 ? (
          <img
            src={currentProject.project_media[0].file_url}
            alt={currentProject.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-center">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Project Image</p>
            </div>
          </div>
        )}
        
        {/* Navigation Arrows */}
        {projects.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <ProjectStatusBadge status={currentProject.status} />
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {currentProject.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {currentProject.description}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(currentProject.start_date).toLocaleDateString()}
              {currentProject.end_date && (
                <> - {new Date(currentProject.end_date).toLocaleDateString()}</>
              )}
            </span>
          </div>
          
          {currentProject.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{currentProject.location}</span>
            </div>
          )}
        </div>

        {/* Project Indicators */}
        {projects.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}