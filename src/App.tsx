import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import Faculty from './components/Faculty';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PublicationsAdmin from './components/admin/PublicationsAdmin';
import AboutPage from './pages/AboutPage';
import OurWorkPage from './pages/OurWorkPage';
import IdeasPage from './pages/IdeasPage';
import PublicationDetailPage from './pages/PublicationDetailPage';

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Research />
      <Faculty />
      <Publications />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/our-work" element={<OurWorkPage />} />
        <Route path="/ideas" element={<IdeasPage />} />
        <Route path="/publications/:id" element={<PublicationDetailPage />} />
        <Route path="/admin/publications" element={<PublicationsAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;