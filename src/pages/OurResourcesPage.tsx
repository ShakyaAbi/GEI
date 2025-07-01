import React from 'react';
import Research from '../components/Research';

const OurResourcesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold font-playfair text-gray-900 mb-6">Our Resources</h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our core research capabilities and resources driving innovation in planetary and environmental health.
          </p>
        </div>
      </section>
      <Research />
    </div>
  );
};

export default OurResourcesPage; 