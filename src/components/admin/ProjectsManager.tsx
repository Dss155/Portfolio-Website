
import React, { useState } from 'react';
import { Edit, Trash2, Save, X, Plus } from 'lucide-react';

interface ProjectsManagerProps {
  data: any[];
  onSave: (data: any) => void;
  onDelete: (id: string) => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
}

const ProjectsManager = ({ 
  data, 
  onSave, 
  onDelete, 
  editingItem, 
  setEditingItem, 
  showAddForm, 
  setShowAddForm 
}: ProjectsManagerProps) => {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image_url: '',
    technologies: [],
    live_url: '',
    github_url: '',
    featured: false
  });

  const handleAddProject = () => {
    onSave(newProject);
    setNewProject({
      title: '',
      description: '',
      image_url: '',
      technologies: [],
      live_url: '',
      github_url: '',
      featured: false
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Project</h3>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              type="text"
              placeholder="Project title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <textarea
              placeholder="Project description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              rows={3}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="url"
                placeholder="Live URL"
                value={newProject.live_url}
                onChange={(e) => setNewProject({ ...newProject, live_url: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
              <input
                type="url"
                placeholder="GitHub URL"
                value={newProject.github_url}
                onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleAddProject}
              className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Plus size={16} />
              <span>Add Project</span>
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex items-center space-x-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {data?.map((project: any) => (
          <ProjectItem
            key={project.id}
            project={project}
            onSave={onSave}
            onDelete={onDelete}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectItem = ({ project, onSave, onDelete, editingItem, setEditingItem }: any) => {
  const [editData, setEditData] = useState(project);
  const isEditing = editingItem === project.id;

  const handleSave = () => {
    onSave(editData);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditData(project);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="url"
              placeholder="Live URL"
              value={editData.live_url || ''}
              onChange={(e) => setEditData({ ...editData, live_url: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="url"
              placeholder="GitHub URL"
              value={editData.github_url || ''}
              onChange={(e) => setEditData({ ...editData, github_url: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>
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
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setEditingItem(project.id)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
