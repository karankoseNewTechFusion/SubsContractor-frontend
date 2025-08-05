import React, { useState, useEffect } from 'react';
import { Close } from '@mui/icons-material';

interface EditJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (jobData: any) => void;
  editData: any;
}

// Reusable form components
const FormInput: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  prefix?: string;
  fullWidth?: boolean;
  type?: string;
}> = ({ label, value, onChange, placeholder, required, prefix, fullWidth, type = "text" }) => (
  <div className={fullWidth ? "col-span-2" : ""}>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 ${
          prefix ? 'pl-8' : ''
        }`}
      />
    </div>
  </div>
);

const FormTextarea: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}> = ({ label, value, onChange, placeholder, required }) => (
  <div className="col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 resize-none"
    />
  </div>
);

const FormDropdown: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  fullWidth?: boolean;
}> = ({ label, value, onChange, options, required, fullWidth }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={fullWidth ? "col-span-2" : ""}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-left flex justify-between items-center"
        >
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>
            {value || `Select ${label}`}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EditJobModal: React.FC<EditJobModalProps> = ({ isOpen, onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    projectLocation: '',
    budget: '',
    status: '',
    priority: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);

  const statusOptions = ['Pending', 'Active', 'Completed'];
  const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];

  // Pre-fill form data when editData changes
  useEffect(() => {
    if (editData) {
      setFormData({
        projectTitle: editData.title || '',
        clientName: editData.client || '',
        clientEmail: editData.clientEmail || '',
        clientPhone: editData.clientPhone || '',
        clientAddress: editData.clientAddress || '',
        projectLocation: editData.projectLocation || '',
        budget: editData.budget || '',
        status: editData.status || '',
        priority: editData.priority || '',
        description: editData.description || '',
        startDate: editData.startDate || '',
        endDate: editData.endDate || ''
      });
    }
  }, [editData]);

  const handleSave = () => {
    // Basic validation
    if (!formData.projectTitle || !formData.clientName || !formData.budget) {
      alert('Please fill in all required fields');
      return;
    }

    const jobData = {
      ...editData,
      title: formData.projectTitle,
      client: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      clientAddress: formData.clientAddress,
      projectLocation: formData.projectLocation,
      budget: formData.budget,
      status: formData.status,
      priority: formData.priority,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate
    };

    onSave(jobData);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]" onClick={handleBackdropClick}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Job Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Close />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Job Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Job Details</h3>
              
              <FormInput
                label="Project Title"
                value={formData.projectTitle}
                onChange={(value) => setFormData(prev => ({ ...prev, projectTitle: value }))}
                placeholder="Enter project title"
                required
              />

              <FormInput
                label="Start Date"
                value={formData.startDate}
                onChange={(value) => setFormData(prev => ({ ...prev, startDate: value }))}
                type="date"
              />

              <FormInput
                label="Project Location"
                value={formData.projectLocation}
                onChange={(value) => setFormData(prev => ({ ...prev, projectLocation: value }))}
                placeholder="Enter project location"
              />

              <FormInput
                label="Budget"
                value={formData.budget}
                onChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                placeholder="Enter budget amount"
                prefix="$"
                required
              />

              <FormDropdown
                label="Priority"
                value={formData.priority}
                onChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                options={priorityOptions}
              />

              <FormDropdown
                label="Status"
                value={formData.status}
                onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                options={statusOptions}
                required
              />

              <FormInput
                label="End Date"
                value={formData.endDate}
                onChange={(value) => setFormData(prev => ({ ...prev, endDate: value }))}
                type="date"
              />
            </div>

            {/* Client Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Client Information</h3>
              
              <FormInput
                label="Client Name"
                value={formData.clientName}
                onChange={(value) => setFormData(prev => ({ ...prev, clientName: value }))}
                placeholder="Enter client name"
                required
              />

              <FormInput
                label="Client Email"
                value={formData.clientEmail}
                onChange={(value) => setFormData(prev => ({ ...prev, clientEmail: value }))}
                placeholder="Enter client email"
                type="email"
              />

              <FormInput
                label="Client Contact"
                value={formData.clientPhone}
                onChange={(value) => setFormData(prev => ({ ...prev, clientPhone: value }))}
                placeholder="Enter client phone"
              />

              <FormInput
                label="Client Address"
                value={formData.clientAddress}
                onChange={(value) => setFormData(prev => ({ ...prev, clientAddress: value }))}
                placeholder="Enter client address"
                fullWidth
              />
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-6">
            <FormTextarea
              label="Project Description"
              value={formData.description}
              onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
              placeholder="Enter project description"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJobModal; 