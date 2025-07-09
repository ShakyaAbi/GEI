import React from 'react';
import { useProgramAreas } from '../hooks/useProgramAreas';

const images = [
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80',
];

const avatars = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
];

const ImpactShowcase = () => {
  const { programAreas, loading } = useProgramAreas({ limit: 1 });
  const program = programAreas[0];

  // Fallback image if no hero_image is available
  const fallbackImage = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80';

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex items-center justify-center min-h-[300px]">
          <span className="text-lg text-gray-500 animate-pulse">Loading program highlight...</span>
        </div>
      </section>
    );
  }

  if (!program) {
    // Fallback to static content if no program area is found
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 w-full flex flex-col items-start mt-12 md:mt-0">
            <span className="text-base font-semibold text-blue-700 mb-2">PROGRAM HIGHLIGHT</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Spotlight Initiative
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              This is a placeholder for a featured program, initiative, or story. You can use this section to showcase a recent success, a key partner, or a unique aspect of this program area. Update this text and image as needed to keep your content fresh and engaging.
            </p>
            <p className="text-gray-600 max-w-md">
              Add more details here about the impact, goals, or people involved. This layout mirrors the annual letter, but with the image on the right for visual variety.
            </p>
          </div>
          <div className="md:w-1/2 w-full flex items-center justify-center">
            <img src={fallbackImage} alt="Spotlight" className="rounded-2xl shadow-lg object-cover w-full h-96" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 w-full flex flex-col items-start mt-12 md:mt-0">
          <span className="text-base font-semibold text-blue-700 mb-2">PROGRAM HIGHLIGHT</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {program.name}
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">
            {program.description || 'No description available for this program area.'}
          </p>
          {/* Optionally, display more details or a link to the program area page */}
        </div>
        <div className="md:w-1/2 w-full flex items-center justify-center">
          <img
            src={program.hero_image || fallbackImage}
            alt={program.name}
            className="rounded-2xl shadow-lg object-cover w-full h-96"
          />
        </div>
      </div>
    </section>
  );
};

export default ImpactShowcase; 