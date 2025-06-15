
import React, { useState } from 'react';
import { Edit, Save, X, FileText } from 'lucide-react';

interface ContentManagerProps {
  data: any[];
  onSave: (data: any) => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
}

const ContentManager = ({ data, onSave, editingItem, setEditingItem }: ContentManagerProps) => {
  const contentItems = [
    { section: 'hero', field: 'name', label: 'Your Name', type: 'text', icon: '👤' },
    { section: 'hero', field: 'title', label: 'Professional Title', type: 'text', icon: '💼' },
    { section: 'hero', field: 'description', label: 'Hero Description', type: 'textarea', icon: '📝' },
    { section: 'about', field: 'journey_title', label: 'About Journey Title', type: 'text', icon: '🎯' },
    { section: 'about', field: 'journey_description', label: 'About Journey Description', type: 'textarea', icon: '📖' },
    { section: 'footer', field: 'description', label: 'Footer Description', type: 'textarea', icon: '📄' },
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

  const handleSave = async () => {
    try {
      await onSave({ section: item.section, field: item.field, value: editValue });
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditValue(value);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-purple-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-purple-400/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{item.icon}</span>
          <h3 className="text-xl font-semibold text-white">{item.label}</h3>
        </div>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 text-sm font-medium px-4 py-2 rounded-xl hover:bg-purple-900/30 transition-all duration-200 border border-purple-500/20 hover:border-purple-400/30"
          >
            <Edit size={16} />
            <span>Edit Content</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-6">
          {item.type === 'textarea' ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={5}
              className="w-full px-4 py-4 bg-gray-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 outline-none text-base transition-all duration-200"
              placeholder={`Enter ${item.label.toLowerCase()}`}
            />
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-4 py-4 bg-gray-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 outline-none text-base transition-all duration-200"
              placeholder={`Enter ${item.label.toLowerCase()}`}
            />
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSave}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <Save size={18} />
              <span>Save Changes</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
          <p className="text-gray-300 text-base leading-relaxed">
            {value || <span className="text-gray-500 italic">No content set - click edit to add</span>}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentManager;
