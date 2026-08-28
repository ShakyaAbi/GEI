import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import Hero from '../components/Hero';
import About from '../components/About';
import Research from '../components/Research';
import ProjectsShowcase from '../components/ProjectsShowcase';
import Publications from '../components/Publications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';


const HomePage = () => {
  const location = useLocation();
  const [showDonatePopup, setShowDonatePopup] = useState(false);

  useEffect(() => {
    // ponytail: shows on every load/refresh, 1.5s delay — add back localStorage if it gets annoying
    const t = setTimeout(() => setShowDonatePopup(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const dismissPopup = () => setShowDonatePopup(false);

  useEffect(() => {
    // Handle hash-based scrolling
    if (location.hash) {
      const elementId = location.hash.substring(1); // Remove the '#'
      const element = document.getElementById(elementId);
      if (element) {
        // Small delay to ensure the page is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Hero />

      <Research />

      <ProjectsShowcase />

      <Publications limit={5} />
      <Contact />
      <Footer />

      {showDonatePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={dismissPopup}>
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={dismissPopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mx-auto mb-4 w-48 overflow-hidden rounded-xl shadow" style={{ aspectRatio: '9 / 16' }}>
              <iframe
                src="https://www.youtube.com/embed/1CsMx1ITO9w?autoplay=1&mute=1&loop=1&playlist=1CsMx1ITO9w&rel=0&origin=https%3A%2F%2Fgeiglobal.org"
                title="Rasuwa flash floods, Nepal"
                className="h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <span className="inline-block bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1 mb-4">
              Emergency Appeal
            </span>
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-3">
              Donate Now to Nepal
            </h2>
            <p className="text-gray-600 mb-6">
              Flash floods have devastated communities in Rasuwa. Families urgently
              need food, clean water, and shelter. Your support can save lives today.
            </p>
            <Link
              to="/donate"
              onClick={dismissPopup}
              className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl px-8 py-3 shadow hover:from-red-700 hover:to-red-800 transition-colors"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
