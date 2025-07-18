import React from 'react';
import ProtectedRoute from '../admin/ProtectedRoute';
import AdminLayout from '../admin/AdminLayout';

const AdminRootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        {children}
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminRootLayout; 