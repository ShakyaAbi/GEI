import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/HomePage';
import PublicationsAdmin from './components/admin/PublicationsAdmin';
import ProgramAreasAdmin from './components/admin/ProgramAreasAdmin';
import AboutPage from './pages/AboutPage';
import OurWorkPage from './pages/OurWorkPage';
import IdeasPage from './pages/IdeasPage';
import PublicationDetailPage from './pages/PublicationDetailPage';
import ProgramAreaDetailPage from './pages/ProgramAreaDetailPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
          <Route path="/ideas" element={<IdeasPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/publications/:id" element={<PublicationDetailPage />} />
          <Route path="/admin/publications" element={
            <ProtectedRoute>
              <PublicationsAdmin />
            </ProtectedRoute>
          } />
          <Route path="/admin/programs" element={
            <ProtectedRoute>
              <ProgramAreasAdmin />
            </ProtectedRoute>
          } />
          <Route path="/admin/program-areas" element={
            <ProtectedRoute>
              <ProgramAreasAdmin />
            </ProtectedRoute>
          } />
          <Route path="/admin/projects" element={
            <ProtectedRoute>
              <ProgramAreasAdmin />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/areas/:slug" element={<ProgramAreaDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;