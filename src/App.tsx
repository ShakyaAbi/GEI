import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import Faculty from './components/Faculty';
import Publications from './components/Publications';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PublicationsAdmin from './components/admin/PublicationsAdmin';

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Research />
      <Faculty />
      <Publications />
      <News />
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
        <Route path="/admin/publications" element={<PublicationsAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;