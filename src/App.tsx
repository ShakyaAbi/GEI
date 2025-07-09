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
import ResearchPublicationsPage from './pages/ResearchPublicationsPage';
import OurStoriesPage from './pages/OurStoriesPage';
import AdminLayout from './components/admin/AdminLayout';
import StoryDetailPage from './pages/StoryDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Non-admin pages use Navbar */}
          <Route path="/" element={<><Navbar /><HomePage /></>} />
          <Route path="/about" element={<><Navbar /><AboutPage /></>} />
          <Route path="/our-work" element={<><Navbar /><OurWorkPage /></>} />
          <Route path="/ideas" element={<><Navbar /><IdeasPage /></>} />
          <Route path="/projects/:slug" element={<><Navbar /><ProjectDetailPage /></>} />
          <Route path="/publications/:id" element={<><Navbar /><PublicationDetailPage /></>} />
          <Route path="/areas/:slug" element={<><Navbar /><ProgramAreaDetailPage /></>} />
          <Route path="/our-work/research-publications" element={<><Navbar /><ResearchPublicationsPage /></>} />
          <Route path="/our-stories" element={<><Navbar /><OurStoriesPage /></>} />
          <Route path="/our-stories/:id" element={<><Navbar /><StoryDetailPage /></>} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin pages use AdminLayout and sidebar */}
          <Route path="/admin/publications" element={
            <ProtectedRoute>
              <AdminLayout>
                <PublicationsAdmin />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/programs" element={
            <ProtectedRoute>
              <AdminLayout>
                <ProgramAreasAdmin />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/program-areas" element={
            <ProtectedRoute>
              <AdminLayout>
                <ProgramAreasAdmin />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/projects" element={
            <ProtectedRoute>
              <AdminLayout>
                <ProgramAreasAdmin />
              </AdminLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;