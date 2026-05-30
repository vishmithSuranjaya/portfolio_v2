import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Helmet } from 'react-helmet-async';
import ManageProjects from './ManageProjects';
import ManageCertifications from './ManageCertifications';
import { LogOut, FolderKanban, Award, Menu, X, LayoutDashboard } from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        window.location.href = '/';
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (!user) return null;

  const NavItem = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }} 
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
          : 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'
      }`}
    >
      <Icon className={`w-5 h-5 ${activeTab === id ? 'text-white' : 'text-gray-500'}`} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-white selection:bg-blue-500/30">
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1e293b] border-b border-gray-800 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2 font-bold text-xl">
          <LayoutDashboard className="text-blue-500" />
          <span>Admin</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-400 hover:text-white">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#1e293b] border-r border-gray-800 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0 pt-16 md:pt-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-800 hidden md:block">
          <div className="flex items-center gap-2 mb-2">
            <LayoutDashboard className="text-blue-500 w-6 h-6" />
            <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-[#0f172a] px-3 py-2 rounded-md border border-gray-800 mt-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="truncate">{user.email}</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4 mt-4 md:mt-0">Content Management</div>
          <NavItem id="projects" icon={FolderKanban} label="Projects" />
          <NavItem id="certifications" icon={Award} label="Certifications" />
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2.5 rounded-lg transition-all font-medium">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {activeTab === 'projects' ? 'Projects' : 'Certifications'}
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your portfolio {activeTab} below.
            </p>
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'projects' && <ManageProjects />}
            {activeTab === 'certifications' && <ManageCertifications />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
