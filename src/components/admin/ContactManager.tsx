
import React, { useState } from 'react';
import { Edit, Save, X, Mail, Phone, Linkedin, Github, Twitter } from 'lucide-react';

interface ContactManagerProps {
  data: any[];
  onSave: (data: any) => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
}

const ContactManager = ({ data, onSave, editingItem, setEditingItem }: ContactManagerProps) => {
  const contactTypes = [
    { type: 'email', icon: Mail, label: 'Email Address', placeholder: 'your.email@example.com' },
    { type: 'phone', icon: Phone, label: 'Phone Number', placeholder: '+1 (555) 123-4567' },
    { type: 'linkedin', icon: Linkedin, label: 'LinkedIn Profile', placeholder: 'https://linkedin.com/in/yourprofile' },
    { type: 'github', icon: Github, label: 'GitHub Profile', placeholder: 'https://github.com/yourusername' },
    { type: 'twitter', icon: Twitter, label: 'Twitter Profile', placeholder: 'https://twitter.com/yourusername' },
  ];

  const getContactValue = (type: string) => {
    return data?.find((item: any) => item.type === type)?.value || '';
  };

  return (
    <div className="space-y-6">
      {contactTypes.map((contact) => (
        <ContactItem
          key={contact.type}
          contactInfo={contact}
          value={getContactValue(contact.type)}
          onSave={onSave}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
        />
      ))}
    </div>
  );
};

const ContactItem = ({ contactInfo, value, onSave, editingItem, setEditingItem }: any) => {
  const [editValue, setEditValue] = useState(value);
  const isEditing = editingItem === contactInfo.type;
  const IconComponent = contactInfo.icon;

  const handleEdit = () => {
    setEditingItem(contactInfo.type);
    setEditValue(value);
  };

  const handleSave = async () => {
    try {
      await onSave({ 
        type: contactInfo.type, 
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
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-purple-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-purple-400/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <IconComponent className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{contactInfo.label}</h3>
            <p className="text-purple-300 text-sm">Contact Information</p>
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 text-sm font-medium px-4 py-2 rounded-xl hover:bg-purple-900/30 transition-all duration-200 border border-purple-500/20 hover:border-purple-400/30"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={contactInfo.placeholder}
            className="w-full px-4 py-4 bg-gray-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 outline-none text-base transition-all duration-200"
          />
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
            {value || <span className="text-gray-500 italic">No {contactInfo.label.toLowerCase()} set - click edit to add</span>}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactManager;
