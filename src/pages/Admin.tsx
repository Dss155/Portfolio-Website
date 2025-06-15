
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  const menuItems = [
    { id: 'content', label: 'Portfolio Content' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact Info' },
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
        <AdminSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setEditingItem={setEditingItem}
          setShowAddForm={setShowAddForm}
          logout={logout}
        />

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
