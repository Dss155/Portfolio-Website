
import React, { useState } from 'react';
import { Edit, Trash2, Save, X, Plus } from 'lucide-react';

interface SkillsManagerProps {
  data: any[];
  onSave: (data: any) => void;
  onDelete: (id: string) => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
}

const SkillsManager = ({ 
  data, 
  onSave, 
  onDelete, 
  editingItem, 
  setEditingItem, 
  showAddForm, 
  setShowAddForm 
}: SkillsManagerProps) => {
  const [newSkill, setNewSkill] = useState({ name: '', category: '', level: 50 });

  const handleAddSkill = () => {
    onSave(newSkill);
    setNewSkill({ name: '', category: '', level: 50 });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Skill</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Skill name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="text"
              placeholder="Category"
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="number"
              placeholder="Level (0-100)"
              min="0"
              max="100"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleAddSkill}
              className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Plus size={16} />
              <span>Add Skill</span>
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
  const isEditing = editingItem === skill.id;

  const handleSave = () => {
    onSave(editData);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditData(skill);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="text"
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="number"
              min="0"
              max="100"
              value={editData.level}
              onChange={(e) => setEditData({ ...editData, level: parseInt(e.target.value) })}
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
            <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
            <p className="text-gray-600">{skill.category} - {skill.level}%</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setEditingItem(skill.id)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(skill.id)}
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

export default SkillsManager;
