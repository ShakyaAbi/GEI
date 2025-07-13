import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { signIn, getCurrentUser } from '../lib/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) return; // Only check if token exists
      const user = await getCurrentUser();
      if (user) {
        navigate('/admin/program-areas');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const { user, error: signInError } = await signIn(formData.email, formData.password);
      
      if (signInError) {
        setError(signInError.message || 'Failed to sign in. Please check your credentials.');
        return;
      }

      if (user) {
        setSuccess('Login successful! Redirecting...');
        // Small delay to show success message
        setTimeout(() => {
          navigate('/admin/program-areas');
        }, 1000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 via-white to-cyan-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-brand-blue/10 to-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-brand-blue/10 to-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative">
        {/* Back to Home Link */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center text-brand-blue hover:text-brand-dark-blue font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg bg-white overflow-hidden">
              <img src="/GEI_Envirohealth_Icon[1].png" alt="GEI Logo" className="w-16 h-16 object-contain" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to access the admin dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Sign In Failed</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Success</h3>
                  <p className="text-sm text-green-700 mt-1">{success}</p>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-brand-blue hover:text-brand-dark-blue transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading || !formData.email || !formData.password}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-brand-blue to-cyan-600 hover:from-brand-dark-blue hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-brand-blue hover:text-brand-dark-blue transition-colors">
                Contact your administrator
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials (for development) */}
        {import.meta.env.DEV && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Development Mode</h3>
            <p className="text-xs text-yellow-700">
              Use your Supabase credentials to sign in. Make sure you have set up authentication in your Supabase project.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;