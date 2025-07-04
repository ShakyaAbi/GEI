import React from 'react';
import Research from '../components/Research';
import Publications from '../components/Publications';

const ResearchPublicationsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold font-playfair text-gray-900 mb-6">Research & Publications</h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our research areas, latest publications, and reports driving global change in environmental and planetary health.
          </p>
        </div>
      </section>
      <Research />
      <Publications />
    </div>
  );
};

export default ResearchPublicationsPage; 