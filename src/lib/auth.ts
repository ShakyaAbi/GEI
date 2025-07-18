import api from './api';

// Admin check with proper user management system
export const isAdmin = async () => {
  try {
    const response = await api.get('/auth/is-admin');
    return response.data.data.isAdmin;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Helper function to check if user has specific permissions
export const hasPermission = async (permission: string) => {
  try {
    // Check if user is admin (admins have all permissions)
    const adminStatus = await isAdmin();
    if (adminStatus) return true;
    
    // For now, we only have admin permissions
    // This can be expanded later to check specific permissions
    return false;
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
};

// Helper function to get user role
export const getUserRole = async () => {
  try {
    const user = await getCurrentUser();
    return user?.role || 'user';
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};

// Get current authenticated user
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data.data;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Get authentication session
export const getAuthSession = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    // Verify token is valid by getting current user
    const user = await getCurrentUser();
    if (!user) return null;
    
    return { token };
  } catch (error) {
    console.error('Error getting auth session:', error);
    return null;
  }
};

// Sign in function
export const signIn = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    console.log('Login API response:', response.data); // Debug log
    if (response.data.error === false || response.data.error === 'false') {
      localStorage.setItem('token', response.data.data.token);
      return { user: response.data.data.user, error: null };
    }
    return { user: null, error: new Error('Invalid credentials') };
  } catch (error: any) {
    return { 
      user: null, 
      error: error.response?.data?.message || 'Login failed' 
    };
  }
};

// Sign out function
export const signOut = async () => {
  try {
    // Remove token from localStorage
    localStorage.removeItem('token');
    return { error: null };
  } catch (error) {
    return { error };
  }
};

// Sign up function
export const signUp = async (email: string, password: string) => {
  try {
    // Note: In this implementation, only admins can create new users
    // This function would need to be called by an admin
    return { user: null, error: new Error('Registration is restricted to administrators') };
  } catch (error) {
    return { user: null, error };
  }
};