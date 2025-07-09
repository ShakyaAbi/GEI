import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, Users, Folder, LogOut, Home } from 'lucide-react';

const adminLinks = [
  // { name: 'Dashboard', path: '/admin', icon: Home }, // Hidden for now
  { name: 'Publications', path: '/admin/publications', icon: Book },
  { name: 'Program Areas', path: '/admin/program-areas', icon: Folder },
  { name: 'Projects', path: '/admin/projects', icon: Folder }
];

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col shadow-xl fixed left-0 top-0 z-40">
      <div className="flex items-center justify-center h-20 border-b border-blue-800 mb-4">
        <span className="text-2xl font-bold tracking-wide">Admin Panel</span>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {adminLinks.map(link => (
          <Link
            key={link.name}
            to={link.path}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
          >
            <link.icon className="w-5 h-5" />
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4 border-t border-blue-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 w-full rounded-lg bg-blue-800 hover:bg-blue-600 transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar; 