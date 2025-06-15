
import React from 'react';
import { Settings, Users, FileText, Code, Briefcase, Mail, LogOut, Shield } from 'lucide-react';

type Section = 'content' | 'skills' | 'projects' | 'experience' | 'contact';

interface AdminSidebarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  setEditingItem: (item: any) => void;
  setShowAddForm: (show: boolean) => void;
  logout: () => void;
}

const AdminSidebar = ({ 
  activeSection, 
  setActiveSection, 
  setEditingItem, 
  setShowAddForm, 
  logout 
}: AdminSidebarProps) => {
  const menuItems = [
    { id: 'content', label: 'Portfolio Content', icon: FileText },
    { id: 'skills', label: 'Skills Management', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: Users },
    { id: 'contact', label: 'Contact Information', icon: Mail },
  ];

  return (
    <div className="w-full lg:w-80 bg-gray-900 min-h-screen border-r border-purple-500/20 shadow-2xl">
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8 lg:mb-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Shield className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Control</h1>
              <p className="text-purple-300 text-sm">Portfolio Management</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="text-gray-400 hover:text-red-400 transition-colors p-3 rounded-xl hover:bg-red-900/20 border border-transparent hover:border-red-500/20"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id as Section);
                setEditingItem(null);
                setShowAddForm(false);
              }}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-200 text-left group ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg border border-purple-400/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/80 border border-transparent hover:border-purple-500/20'
              }`}
            >
              <item.icon size={22} className={`transition-colors ${
                activeSection === item.id ? 'text-white' : 'text-purple-400 group-hover:text-purple-300'
              }`} />
              <div>
                <span className="text-base font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <div className="text-xs text-purple-200 mt-1">Active Section</div>
                )}
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
