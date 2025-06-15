
import React, { useState } from 'react';
import { Edit, Save, X } from 'lucide-react';

interface ContactManagerProps {
  data: any[];
  onSave: (data: any) => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
}

const ContactManager = ({ data, onSave, editingItem, setEditingItem }: ContactManagerProps) => {
  const contactTypes = ['email', 'phone', 'linkedin', 'github', 'twitter'];

  const getContactValue = (type: string) => {
    return data?.find((item: any) => item.type === type)?.value || '';
  };

  return (
    <div className="space-y-4">
      {contactTypes.map((type) => (
        <ContactItem
          key={type}
          type={type}
          value={getContactValue(type)}
          onSave={onSave}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
        />
      ))}
    </div>
  );
};

const ContactItem = ({ type, value, onSave, editingItem, setEditingItem }: any) => {
  const [editValue, setEditValue] = useState(value);
  const isEditing = editingItem === type;

  const handleEdit = () => {
    setEditingItem(type);
    setEditValue(value);
  };

  const handleSave = async () => {
    try {
      await onSave({ 
        type, 
        value: editValue, 
        display_text: editValue, 
        href: editValue 
      });
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving contact info:', error);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditValue(value);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <h3 className="text-lg font-semibold text-gray-900 capitalize">{type}</h3>
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
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={`Enter ${type}`}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-base"
          />
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
        <p className="text-gray-700 text-base leading-relaxed">{value || `No ${type} set`}</p>
      )}
    </div>
  );
};

export default ContactManager;
