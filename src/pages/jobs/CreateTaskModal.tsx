import React, { useState } from 'react';
import { Close, KeyboardArrowDown, CalendarToday } from '@mui/icons-material';
import CustomButton from '../../components/Button';

interface Task {
  id: number;
  title: string;
  assignedTo: string;
  dueDate: string;
  priority: string;
  estimatedHours: number;
  description: string;
  status: string;
  hours: string;
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Omit<Task, 'id' | 'status' | 'hours'>) => void;
  editData?: Task;
  crewList?: any[];
}

// Reusable Input Component
const FormInput: React.FC<{
  label: string;
  type?: string;
  placeholder: string;
  value: string | number;
  onChange: (value: string) => void;
  required?: boolean;
  icon?: React.ReactNode;
}> = ({ label, type = "text", placeholder, value, onChange, required, icon }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && '*'}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 ${
          icon ? 'pl-10 pr-3' : 'px-3'
        } py-2.5`}
      />
    </div>
  </div>
);

// Reusable Textarea Component
const FormTextarea: React.FC<{
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}> = ({ label, placeholder, value, onChange, rows = 3 }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 resize-none"
    />
  </div>
);

// Reusable Dropdown Component
const FormDropdown: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ label, value, options, onChange, isOpen, onToggle }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex justify-between items-center bg-gray-50"
      >
        {value}
        <KeyboardArrowDown />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => {
                onChange(option);
                onToggle();
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
);

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onSave, editData, crewList = [] }) => {
  const [formData, setFormData] = useState({
    title: editData?.title || '',
    assignedTo: editData?.assignedTo || '',
    dueDate: editData?.dueDate || '',
    priority: editData?.priority || 'Medium',
    estimatedHours: editData?.estimatedHours || 0,
    description: editData?.description || ''
  });

  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [isCrewDropdownOpen, setIsCrewDropdownOpen] = useState(false);

  const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'estimatedHours' ? parseInt(value) || 0 : value
    }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.assignedTo || !formData.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    onSave(formData);
    onClose();
    setFormData({
      title: '',
      assignedTo: '',
      dueDate: '',
      priority: 'Medium',
      estimatedHours: 0,
      description: ''
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {editData ? 'Edit Task' : 'Add New Task'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <FormInput
                label="Task Name"
                placeholder="Enter Task Name"
                value={formData.title}
                onChange={(value) => handleInputChange('title', value)}
                required
              />

              <FormInput
                label="Due Date"
                type="date"
                placeholder="MM/DD/YYYY"
                value={formData.dueDate}
                onChange={(value) => handleInputChange('dueDate', value)}
                required
                icon={<CalendarToday className="w-4 h-4" />}
              />

              <FormInput
                label="Estimated Hours"
                type="number"
                placeholder="0"
                value={formData.estimatedHours}
                onChange={(value) => handleInputChange('estimatedHours', value)}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <FormDropdown
                label="Assigned To"
                value={formData.assignedTo || 'Select Crew Member'}
                options={crewList.map(crew => crew.name)}
                onChange={(value) => handleInputChange('assignedTo', value)}
                isOpen={isCrewDropdownOpen}
                onToggle={() => setIsCrewDropdownOpen(!isCrewDropdownOpen)}
              />

              <FormDropdown
                label="Priority Level"
                value={formData.priority}
                options={priorityOptions}
                onChange={(value) => handleInputChange('priority', value)}
                isOpen={isPriorityDropdownOpen}
                onToggle={() => setIsPriorityDropdownOpen(!isPriorityDropdownOpen)}
              />
            </div>
          </div>

          {/* Description field spans full width */}
          <div className="mt-4">
            <FormTextarea
              label="Description"
              placeholder="Enter Task Description"
              value={formData.description}
              onChange={(value) => handleInputChange('description', value)}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <CustomButton
              color="#ffffff"
              textColor="#374151"
              className="px-4 py-2 rounded-lg font-medium border border-gray-300"
              onClick={onClose}
            >
              Cancel
            </CustomButton>
            <CustomButton
              color="#3B82F6"
              textColor="#ffffff"
              className="px-4 py-2 rounded-lg font-medium"
              onClick={handleSave}
            >
              {editData ? 'Update Task' : 'Add Task'}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal; 