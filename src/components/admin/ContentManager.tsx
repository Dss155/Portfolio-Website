
import React, { useState } from 'react';
import { Edit, Save, X } from 'lucide-react';

interface ContentManagerProps {
  data: any[];
  onSave: (data: any) => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
}

const ContentManager = ({ data, onSave, editingItem, setEditingItem }: ContentManagerProps) => {
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
    <div className="space-y-4">
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
    <div className="bg-white p-4 md:p-6 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{item.label}</h3>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-base"
              placeholder={`Enter ${item.label.toLowerCase()}`}
            />
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-base"
              placeholder={`Enter ${item.label.toLowerCase()}`}
            />
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSave}
              className="flex items-center justify-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center justify-center space-x-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 text-base leading-relaxed">{value || 'No content set'}</p>
      )}
    </div>
  );
};

export default ContentManager;
