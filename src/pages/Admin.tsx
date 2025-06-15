
import React, { useState } from 'react';
import { Settings, Users, FileText, Code, Briefcase, Mail, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { usePortfolioContent, useSkills, useProjects, useExperience, useContactInfo, useUpdatePortfolioContent, useCreateSkill, useUpdateSkill, useDeleteSkill, useCreateProject, useUpdateProject, useDeleteProject, useCreateExperience, useUpdateExperience, useDeleteExperience, useUpdateContactInfo } from '@/hooks/usePortfolioData';

type Section = 'content' | 'skills' | 'projects' | 'experience' | 'contact';

const Admin = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-900/90 min-h-screen border-r border-slate-700">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <Settings className="text-cyan-400" size={24} />
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
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
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
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
              <h2 className="text-3xl font-bold text-white">
                {menuItems.find(item => item.id === activeSection)?.label}
              </h2>
              {['skills', 'projects', 'experience'].includes(activeSection) && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors duration-200"
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
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{item.label}</h3>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300"
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
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          )}
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="flex items-center space-x-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
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
        <p className="text-gray-300">{value || 'No content set'}</p>
      )}
    </div>
  );
};

// Skills Manager Component
const SkillsManager = ({ data, onSave, onDelete, editingItem, setEditingItem, showAddForm, setShowAddForm }: any) => {
  return (
    <div className="space-y-6">
      {showAddForm && (
        <SkillForm
          onSave={onSave}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      
      <div className="grid gap-4">
        {data?.map((skill: any) => (
          <SkillItem
            key={skill.id}
            skill={skill}
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

const SkillItem = ({ skill, onSave, onDelete, editingItem, setEditingItem }: any) => {
  const [editData, setEditData] = useState(skill);
  const isEditing = editingItem?.id === skill.id;

  const handleEdit = () => {
    setEditingItem(skill);
    setEditData(skill);
  };

  const handleSave = () => {
    onSave(editData);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditData(skill);
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
      {isEditing ? (
        <SkillForm
          initialData={editData}
          onSave={handleSave}
          onCancel={handleCancel}
          onChange={setEditData}
        />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
            <p className="text-gray-400">{skill.category} - {skill.level}%</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="text-cyan-400 hover:text-cyan-300"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(skill.id)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SkillForm = ({ initialData = {}, onSave, onCancel, onChange }: any) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    category: initialData.category || '',
    level: initialData.level || 50,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange?.(newData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Skill Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
          className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          required
          className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
        <input
          type="number"
          placeholder="Level (0-100)"
          min="0"
          max="100"
          value={formData.level}
          onChange={(e) => handleChange('level', parseInt(e.target.value))}
          required
          className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
      </div>
      <div className="flex space-x-3">
        <button
          type="submit"
          className="flex items-center space-x-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <Save size={16} />
          <span>Save</span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center space-x-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          <X size={16} />
          <span>Cancel</span>
        </button>
      </div>
    </form>
  );
};

// Projects Manager Component
const ProjectsManager = ({ data, onSave, onDelete, editingItem, setEditingItem, showAddForm, setShowAddForm }: any) => {
  return (
    <div className="space-y-6">
      {showAddForm && (
        <ProjectForm
          onSave={onSave}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      
      <div className="grid gap-6">
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
  const isEditing = editingItem?.id === project.id;

  const handleEdit = () => {
    setEditingItem(project);
    setEditData(project);
  };

  const handleSave = () => {
    onSave(editData);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditData(project);
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
      {isEditing ? (
        <ProjectForm
          initialData={editData}
          onSave={handleSave}
          onCancel={handleCancel}
          onChange={setEditData}
        />
      ) : (
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies?.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="text-cyan-400 hover:text-cyan-300"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(project.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectForm = ({ initialData = {}, onSave, onCancel, onChange }: any) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    image_url: initialData.image_url || '',
    technologies: initialData.technologies || [],
    live_url: initialData.live_url || '',
    github_url: initialData.github_url || '',
    featured: initialData.featured || false,
  });
  const [techInput, setTechInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange?.(newData);
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      const newTechs = [...formData.technologies, techInput.trim()];
      handleChange('technologies', newTechs);
      setTechInput('');
    }
  };

  const removeTechnology = (index: number) => {
    const newTechs = formData.technologies.filter((_: any, i: number) => i !== index);
    handleChange('technologies', newTechs);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Project Title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          required
          className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={(e) => handleChange('image_url', e.target.value)}
          className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
      </div>
      
      <textarea
        placeholder="Project Description"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        rows={3}
        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
      />
      
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="url"
          placeholder="Live URL"
          value={formData.live_url}
          onChange={(e) => handleChange('live_url', e.target.value)}
          className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
        <input
          type="url"
          placeholder="GitHub URL"
          value={formData.github_url}
          onChange={(e) => handleChange('github_url', e.target.value)}
          className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
      </div>

      <div>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            placeholder="Add technology"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
            className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
          <button
            type="button"
            onClick={addTechnology}
            className="px-4 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies.map((tech: string, index: number) => (
            <span
              key={index}
              className="flex items-center space-x-1 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm"
            >
              <span>{tech}</span>
              <button
                type="button"
                onClick={() => removeTechnology(index)}
                className="text-cyan-300 hover:text-red-400"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <label className="flex items-center space-x-2 text-white">
        <input
          type="checkbox"
          checked={formData.featured}
          onChange={(e) => handleChange('featured', e.target.checked)}
          className="rounded"
        />
        <span>Featured Project</span>
      </label>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="flex items-center space-x-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <Save size={16} />
          <span>Save</span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center space-x-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          <X size={16} />
          <span>Cancel</span>
        </button>
      </div>
    </form>
  );
};

// Experience Manager Component
const ExperienceManager = ({ data, onSave, onDelete, editingItem, setEditingItem, showAddForm, setShowAddForm }: any) => {
  return (
    <div className="space-y-6">
      {showAddForm && (
        <ExperienceForm
          onSave={onSave}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      
      <div className="grid gap-6">
        {data?.map((exp: any) => (
          <ExperienceItem
            key={exp.id}
            experience={exp}
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

const ExperienceItem = ({ experience, onSave, onDelete, editingItem, setEditingItem }: any) => {
  const [editData, setEditData] = useState(experience);
  const isEditing = editingItem?.id === experience.id;

  const handleEdit = () => {
    setEditingItem(experience);
    setEditData(experience);
  };

  const handleSave = () => {
    onSave(editData);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditData(experience);
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
      {isEditing ? (
        <ExperienceForm
          initialData={editData}
          onSave={handleSave}
          onCancel={handleCancel}
          onChange={setEditData}
        />
      ) : (
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">{experience.position}</h3>
              <p className="text-cyan-400 mb-1">{experience.company}</p>
              <p className="text-gray-400 mb-3">{experience.duration} • {experience.location}</p>
              {experience.description && (
                <ul className="space-y-1">
                  {experience.description.map((item: string, index: number) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="text-cyan-400 hover:text-cyan-300"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(experience.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ExperienceForm = ({ initialData = {}, onSave, onCancel, onChange }: any) => {
  const [formData, setFormData] = useState({
    company: initialData.company || '',
    position: initialData.position || '',
    duration: initialData.duration || '',
    location: initialData.location || '',
    description: initialData.description || [],
  });
  const [descInput, setDescInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange?.(newData);
  };

  const addDescription = () => {
    if (descInput.trim()) {
      const newDesc = [...formData.description, descInput.trim()];
      handleChange('description', newDesc);
      setDescInput('');
    }
  };

  const removeDescription = (index: number) => {
    const newDesc = formData.description.filter((_: any, i: number) => i !== index);
    handleChange('description', newDesc);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
          required
          className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
        <input
          type="text"
          placeholder="Position"
          value={formData.position}
          onChange={(e) => handleChange('position', e.target.value)}
          required
          className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Duration"
          value={formData.duration}
          onChange={(e) => handleChange('duration', e.target.value)}
          required
          className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
      </div>

      <div>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            placeholder="Add description point"
            value={descInput}
            onChange={(e) => setDescInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDescription())}
            className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
          <button
            type="button"
            onClick={addDescription}
            className="px-4 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
          >
            Add
          </button>
        </div>
        <div className="space-y-2">
          {formData.description.map((desc: string, index: number) => (
            <div
              key={index}
              className="flex items-center space-x-2 p-2 bg-slate-700/50 rounded"
            >
              <span className="flex-1 text-gray-300">{desc}</span>
              <button
                type="button"
                onClick={() => removeDescription(index)}
                className="text-red-400 hover:text-red-300"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="flex items-center space-x-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <Save size={16} />
          <span>Save</span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center space-x-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          <X size={16} />
          <span>Cancel</span>
        </button>
      </div>
    </form>
  );
};

// Contact Manager Component
const ContactManager = ({ data, onSave, editingItem, setEditingItem }: any) => {
  const contactTypes = ['email', 'phone', 'location'];
  
  const getContactData = (type: string) => {
    return data?.find((item: any) => item.type === type) || {};
  };

  return (
    <div className="space-y-6">
      {contactTypes.map((type) => (
        <ContactItem
          key={type}
          type={type}
          data={getContactData(type)}
          onSave={onSave}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
        />
      ))}
    </div>
  );
};

const ContactItem = ({ type, data, onSave, editingItem, setEditingItem }: any) => {
  const [editData, setEditData] = useState({
    value: data.value || '',
    display_text: data.display_text || '',
    href: data.href || '',
  });
  const isEditing = editingItem === type;

  const handleEdit = () => {
    setEditingItem(type);
    setEditData({
      value: data.value || '',
      display_text: data.display_text || '',
      href: data.href || '',
    });
  };

  const handleSave = () => {
    onSave({ type, ...editData });
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditData({
      value: data.value || '',
      display_text: data.display_text || '',
      href: data.href || '',
    });
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white capitalize">{type}</h3>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Value"
            value={editData.value}
            onChange={(e) => setEditData({ ...editData, value: e.target.value })}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
          <input
            type="text"
            placeholder="Display Text"
            value={editData.display_text}
            onChange={(e) => setEditData({ ...editData, display_text: e.target.value })}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
          <input
            type="text"
            placeholder="Link (href)"
            value={editData.href}
            onChange={(e) => setEditData({ ...editData, href: e.target.value })}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="flex items-center space-x-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
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
        <div className="text-gray-300">
          <p><strong>Value:</strong> {data.value || 'Not set'}</p>
          <p><strong>Display:</strong> {data.display_text || 'Not set'}</p>
          <p><strong>Link:</strong> {data.href || 'Not set'}</p>
        </div>
      )}
    </div>
  );
};

export default Admin;
