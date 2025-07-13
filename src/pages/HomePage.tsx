import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Research from '../components/Research';
import Publications from '../components/Publications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';


const HomePage = () => {
  const location = useLocation();

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
     
      <Publications />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;