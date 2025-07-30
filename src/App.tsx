import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // New import
import Navbar from './components/navbar/Navbar';
// import HomePage from './pages/HomePage';
// import PublicationsAdmin from './components/admin/PublicationsAdmin';
// import ProgramAreasAdmin from './components/admin/ProgramAreasAdmin';
// import AboutPage from './pages/AboutPage';
// import OurWorkPage from './pages/OurWorkPage';
// import IdeasPage from './pages/IdeasPage';
// import PublicationDetailPage from './pages/PublicationDetailPage';
// import ProgramAreaDetailPage from './pages/ProgramAreaDetailPage';
// import ProjectDetailPage from './pages/ProjectDetailPage';
// import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/admin/ProtectedRoute';
// import ResearchPublicationsPage from './pages/ResearchPublicationsPage';
// import OurStoriesPage from './pages/OurStoriesPage';
import AdminLayout from './components/admin/AdminLayout';
import PublicLayout from './components/layout/PublicLayout'; // New import
import AdminRootLayout from './components/layout/AdminRootLayout'; // New import
import LoadingSpinner from './components/common/LoadingSpinner'; // New import
// import StoryDetailPage from './pages/StoryDetailPage';

// New import for ProjectsAdmin
const ProjectsAdmin = React.lazy(() => import('./components/admin/ProjectsAdmin'));

const HomePage = React.lazy(() => import('./pages/HomePage'));
const PublicationsAdmin = React.lazy(() => import('./components/admin/PublicationsAdmin'));
const ProgramAreasAdmin = React.lazy(() => import('./components/admin/ProgramAreasAdmin'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const OurWorkPage = React.lazy(() => import('./pages/OurWorkPage'));
const IdeasPage = React.lazy(() => import('./pages/IdeasPage'));
const PublicationDetailPage = React.lazy(() => import('./pages/PublicationDetailPage'));
const ProgramAreaDetailPage = React.lazy(() => import('./pages/ProgramAreaDetailPage'));
const ProjectDetailPage = React.lazy(() => import('./pages/ProjectDetailPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const ResearchPublicationsPage = React.lazy(() => import('./pages/ResearchPublicationsPage'));
const OurStoriesPage = React.lazy(() => import('./pages/OurStoriesPage'));
const StoryDetailPage = React.lazy(() => import('./pages/StoryDetailPage'));
const StoriesManager = React.lazy(() => import('./components/admin/StoriesManager'));
const FacultyAdminPage = React.lazy(() => import('./pages/admin/FacultyAdminPage'));
const CollaboratePage = React.lazy(() => import('./pages/CollaboratePage'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Toaster /> {/* Add Toaster component here */} 
        <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Non-admin pages use PublicLayout */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/our-work" element={<PublicLayout><OurWorkPage /></PublicLayout>} />
          <Route path="/ideas" element={<PublicLayout><IdeasPage /></PublicLayout>} />
          <Route path="/projects/:slug" element={<PublicLayout><ProjectDetailPage /></PublicLayout>} />
          <Route path="/publications/:id" element={<PublicLayout><PublicationDetailPage /></PublicLayout>} />
          <Route path="/areas/:slug" element={<PublicLayout><ProgramAreaDetailPage /></PublicLayout>} />
          <Route path="/our-work/research-publications" element={<PublicLayout><ResearchPublicationsPage /></PublicLayout>} />
          <Route path="/our-stories" element={<PublicLayout><OurStoriesPage /></PublicLayout>} />
          <Route path="/our-stories/:id" element={<PublicLayout><StoryDetailPage /></PublicLayout>} />
          <Route path="/collaborate" element={<PublicLayout><CollaboratePage /></PublicLayout>} />
          <Route path="/donate" element={<PublicLayout><CollaboratePage /></PublicLayout>} />
          <Route path="/collaborate" element={<PublicLayout><CollaboratePage /></PublicLayout>} />
          <Route path="/donate" element={<PublicLayout><CollaboratePage /></PublicLayout>} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin pages use AdminRootLayout */}
          <Route path="/admin/publications" element={
            <AdminRootLayout>
                <PublicationsAdmin />
            </AdminRootLayout>
          } />
          {/* Consolidated program areas route */}
          <Route path="/admin/program-areas" element={
            <AdminRootLayout>
                <ProgramAreasAdmin />
            </AdminRootLayout>
          } />
          <Route path="/admin/faculty" element={
            <AdminRootLayout>
                <FacultyAdminPage />
            </AdminRootLayout>
          } />
          <Route path="/admin/projects" element={
            <AdminRootLayout>
                <ProjectsAdmin /> {/* Corrected: should be ProjectsAdmin */} 
            </AdminRootLayout>
          } />
          <Route path="/admin/stories" element={
            <AdminRootLayout>
                <StoriesManager />
            </AdminRootLayout>
          } />
        </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;