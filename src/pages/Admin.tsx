
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { usePortfolioContent, useSkills, useProjects, useExperience, useContactInfo, useUpdatePortfolioContent, useCreateSkill, useUpdateSkill, useDeleteSkill, useCreateProject, useUpdateProject, useDeleteProject, useCreateExperience, useUpdateExperience, useDeleteExperience, useUpdateContactInfo } from '@/hooks/usePortfolioData';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLogin from '@/components/AdminLogin';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ContentManager from '@/components/admin/ContentManager';
import SkillsManager from '@/components/admin/SkillsManager';
import ProjectsManager from '@/components/admin/ProjectsManager';
import ExperienceManager from '@/components/admin/ExperienceManager';
import ContactManager from '@/components/admin/ContactManager';

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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  const menuItems = [
    { id: 'content', label: 'Portfolio Content' },
    { id: 'skills', label: 'Skills Management' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact Information' },
  ];

  const handleSave = async (data: any) => {
    try {
      console.log('Saving data:', data, 'for section:', activeSection);
      
      if (activeSection === 'content') {
        await updateContent.mutateAsync(data);
      } else if (activeSection === 'skills') {
        if (data.id) {
          await updateSkill.mutateAsync(data);
        } else {
          await createSkill.mutateAsync(data);
        }
      } else if (activeSection === 'projects') {
        if (data.id) {
          await updateProject.mutateAsync(data);
        } else {
          await createProject.mutateAsync(data);
        }
      } else if (activeSection === 'experience') {
        if (data.id) {
          await updateExperience.mutateAsync(data);
        } else {
          await createExperience.mutateAsync(data);
        }
      } else if (activeSection === 'contact') {
        await updateContactInfo.mutateAsync(data);
      }
      
      setEditingItem(null);
      setShowAddForm(false);
    } catch (error) {
      console.error('Save error:', error);
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
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <AdminSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setEditingItem={setEditingItem}
          setShowAddForm={setShowAddForm}
          logout={logout}
        />

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 lg:mb-10 gap-4">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {menuItems.find(item => item.id === activeSection)?.label}
                </h2>
                <p className="text-purple-300">Manage your portfolio content efficiently</p>
              </div>
              {['skills', 'projects', 'experience'].includes(activeSection) && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Plus size={22} />
                  <span>Add New</span>
                </button>
              )}
            </div>

            {/* Render appropriate manager based on active section */}
            {activeSection === 'content' && (
              <ContentManager 
                data={portfolioContent} 
                onSave={handleSave}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
              />
            )}

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

export default Admin;
