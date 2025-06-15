import React, { useState } from 'react';
import { Settings, Users, FileText, Code, Briefcase, Mail, Plus, Edit, Trash2, Save, X, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { usePortfolioContent, useSkills, useProjects, useExperience, useContactInfo, useUpdatePortfolioContent, useCreateSkill, useUpdateSkill, useDeleteSkill, useCreateProject, useUpdateProject, useDeleteProject, useCreateExperience, useUpdateExperience, useDeleteExperience, useUpdateContactInfo } from '@/hooks/usePortfolioData';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLogin from '@/components/AdminLogin';

type Section = 'content' | 'skills' | 'projects' | 'experience' | 'contact';

const Admin = () => {
  const { isAuthenticated, login, logout, isLoading } = useAdminAuth();
  const [activeSection, setActiveSection] = useState<Section>('content');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Data hooks
  const { data: portfolioContent } = usePortfolioContent();
  const { data: skills } = useSkills();
  const { data: projects } = useProjects();
  const { data: experience } = useExperience();
  const { data: contactInfo } = useContactInfo();

  // Mutation hooks
  const updateContent = useUpdatePortfolioContent();
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();
  const deleteExperience = useDeleteExperience();
  const updateContactInfo = useUpdateContactInfo();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  const menuItems = [
    { id: 'content', label: 'Portfolio Content', icon: FileText },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: Users },
    { id: 'contact', label: 'Contact Info', icon: Mail },
  ];

  const handleSave = async (data: any) => {
    try {
      if (activeSection === 'content') {
        await updateContent.mutateAsync(data);
      } else if (activeSection === 'skills') {
        if (editingItem) {
          await updateSkill.mutateAsync({ id: editingItem.id, ...data });
        } else {
          await createSkill.mutateAsync(data);
        }
      } else if (activeSection === 'projects') {
        if (editingItem) {
          await updateProject.mutateAsync({ id: editingItem.id, ...data });
        } else {
          await createProject.mutateAsync(data);
        }
      } else if (activeSection === 'experience') {
        if (editingItem) {
          await updateExperience.mutateAsync({ id: editingItem.id, ...data });
        } else {
          await createExperience.mutateAsync(data);
        }
      } else if (activeSection === 'contact') {
        await updateContactInfo.mutateAsync(data);
      }
      
      setEditingItem(null);
      setShowAddForm(false);
      toast.success('Changes saved successfully!');
    } catch (error) {
      toast.error('Failed to save changes');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (activeSection === 'skills') {
        await deleteSkill.mutateAsync(id);
      } else if (activeSection === 'projects') {
        await deleteProject.mutateAsync(id);
      } else if (activeSection === 'experience') {
        await deleteExperience.mutateAsync(id);
      }
      toast.success('Item deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete item');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex">
        {/* Sidebar */}
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

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                {menuItems.find(item => item.id === activeSection)?.label}
              </h2>
              {['skills', 'projects', 'experience'].includes(activeSection) && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus size={20} />
                  <span>Add New</span>
                </button>
              )}
            </div>

            {/* Content Section */}
            {activeSection === 'content' && (
              <ContentManager 
                data={portfolioContent} 
                onSave={handleSave}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
              />
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <SkillsManager 
                data={skills} 
                onSave={handleSave}
                onDelete={handleDelete}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                showAddForm={showAddForm}
                setShowAddForm={setShowAddForm}
              />
            )}

            {/* Projects Section */}
            {activeSection === 'projects' && (
              <ProjectsManager 
                data={projects} 
                onSave={handleSave}
                onDelete={handleDelete}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                showAddForm={showAddForm}
                setShowAddForm={setShowAddForm}
              />
            )}

            {/* Experience Section */}
            {activeSection === 'experience' && (
              <ExperienceManager 
                data={experience} 
                onSave={handleSave}
                onDelete={handleDelete}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                showAddForm={showAddForm}
                setShowAddForm={setShowAddForm}
              />
            )}

            {/* Contact Section */}
            {activeSection === 'contact' && (
              <ContactManager 
                data={contactInfo} 
                onSave={handleSave}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Content Manager Component
const ContentManager = ({ data, onSave, editingItem, setEditingItem }: any) => {
  const contentItems = [
    { section: 'hero', field: 'name', label: 'Name', type: 'text' },
    { section: 'hero', field: 'title', label: 'Title', type: 'text' },
    { section: 'hero', field: 'description', label: 'Description', type: 'textarea' },
    { section: 'about', field: 'journey_title', label: 'About Journey Title', type: 'text' },
    { section: 'about', field: 'journey_description', label: 'About Journey Description', type: 'textarea' },
    { section: 'footer', field: 'description', label: 'Footer Description', type: 'textarea' },
  ];

  const getValue = (section: string, field: string) => {
    return data?.find((item: any) => item.section === section && item.field === field)?.value || '';
  };

  return (
    <div className="space-y-6">
      {contentItems.map((item, index) => (
        <ContentItem
          key={index}
          item={item}
          value={getValue(item.section, item.field)}
          onSave={onSave}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
        />
      ))}
    </div>
  );
};

const ContentItem = ({ item, value, onSave, editingItem, setEditingItem }: any) => {
  const [editValue, setEditValue] = useState(value);
  const isEditing = editingItem === `${item.section}-${item.field}`;

  const handleEdit = () => {
    setEditingItem(`${item.section}-${item.field}`);
    setEditValue(value);
  };

  const handleSave = () => {
    onSave({ section: item.section, field: item.field, value: editValue });
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditValue(value);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.label}</h3>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          {item.type === 'textarea' ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          )}
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">{value || 'No content set'}</p>
      )}
    </div>
  );
};

// SkillsManager, ProjectsManager, ExperienceManager, ContactManager components
// ... keep existing code (SkillsManager, ProjectsManager, ExperienceManager, ContactManager components)
