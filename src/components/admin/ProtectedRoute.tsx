import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2, Shield, AlertCircle } from 'lucide-react';
import { getCurrentUser, isAdmin } from '../../lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = true 
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        if (currentUser && requireAdmin) {
          const adminStatus = await isAdmin();
          setHasAdminAccess(adminStatus);
        } else if (currentUser) {
          setHasAdminAccess(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [requireAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fadeIn">
        <div className="text-center">
          <div className="relative flex items-center justify-center mb-8">
            {/* Glowing animated spinner with logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-blue-200 opacity-60 blur-2xl animate-pulse"></div>
            </div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full border-8 border-blue-300 border-t-blue-600 animate-spin mx-auto shadow-xl"></div>
              <img src="/gei-logo.svg" alt="GEI Logo" className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 animate-fadeInUp">Checking Authentication</h3>
          <p className="text-gray-600 animate-fadeInUp delay-200">Please wait while we verify your access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !hasAdminAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">
            You don't have permission to access this admin area. Please contact your administrator if you believe this is an error.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
            <a
              href="/"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;