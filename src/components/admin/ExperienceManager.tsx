
import React, { useState } from 'react';
import { Edit, Trash2, Save, X, Plus } from 'lucide-react';

interface ExperienceManagerProps {
  data: any[];
  onSave: (data: any) => void;
  onDelete: (id: string) => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
}

const ExperienceManager = ({ 
  data, 
  onSave, 
  onDelete, 
  editingItem, 
  setEditingItem, 
  showAddForm, 
  setShowAddForm 
}: ExperienceManagerProps) => {
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    duration: '',
    location: '',
    description: []
  });

  const handleAddExperience = () => {
    onSave(newExperience);
    setNewExperience({
      company: '',
      position: '',
      duration: '',
      location: '',
      description: []
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Experience</h3>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              type="text"
              placeholder="Company name"
              value={newExperience.company}
              onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="text"
              placeholder="Position"
              value={newExperience.position}
              onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Duration (e.g., Jan 2020 - Present)"
                value={newExperience.duration}
                onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
              <input
                type="text"
                placeholder="Location"
                value={newExperience.location}
                onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleAddExperience}
              className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Plus size={16} />
              <span>Add Experience</span>
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
        {data?.map((experience: any) => (
          <ExperienceItem
            key={experience.id}
            experience={experience}
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
  const isEditing = editingItem === experience.id;

  const handleSave = () => {
    onSave(editData);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditData(experience);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editData.company}
            onChange={(e) => setEditData({ ...editData, company: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
          <input
            type="text"
            value={editData.position}
            onChange={(e) => setEditData({ ...editData, position: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={editData.duration}
              onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="text"
              value={editData.location || ''}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
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
            <h3 className="text-lg font-semibold text-gray-800">{experience.position}</h3>
            <p className="text-gray-600">{experience.company} - {experience.duration}</p>
            {experience.location && <p className="text-gray-500">{experience.location}</p>}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setEditingItem(experience.id)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(experience.id)}
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

export default ExperienceManager;
