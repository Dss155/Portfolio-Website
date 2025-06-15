
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
    <div className="space-y-6">
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

  const handleSave = () => {
    onSave({ type, value: editValue, display_text: editValue, href: editValue });
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditValue(value);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 capitalize">{type}</h3>
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
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={`Enter ${type}`}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
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
        <p className="text-gray-600">{value || `No ${type} set`}</p>
      )}
    </div>
  );
};

export default ContactManager;
