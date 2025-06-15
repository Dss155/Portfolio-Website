
import React from 'react';
import { Settings, Users, FileText, Code, Briefcase, Mail, LogOut } from 'lucide-react';

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
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: Users },
    { id: 'contact', label: 'Contact Info', icon: Mail },
  ];

  return (
    <div className="w-64 bg-white min-h-screen border-r border-gray-200 shadow-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Settings className="text-blue-600" size={24} />
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <button
            onClick={logout}
            className="text-gray-500 hover:text-red-600 transition-colors"
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
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeSection === item.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
