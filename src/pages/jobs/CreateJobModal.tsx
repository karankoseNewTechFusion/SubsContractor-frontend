import React, { useState } from 'react';
import { Close } from '@mui/icons-material';
import CustomButton from '../../components/Button';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (jobData: any) => void;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    status: 'Planning',
    startDate: '',
    client: '',
    budget: '',
    endDate: ''
  });

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const statusOptions = ['Planning', 'Active', 'Pending', 'Completed', 'Cancelled'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Create new job object
    const newJob = {
      id: Date.now(),
      title: formData.projectName,
      client: formData.client,
      status: formData.status,
      startDate: formData.startDate,
      budget: `$${formData.budget}`,
      profit: '$0',
      expenses: '$0'
    };

    onSave(newJob);
    onClose();
    
    // Reset form
    setFormData({
      projectName: '',
      location: '',
      status: 'Planning',
      startDate: '',
      client: '',
      budget: '',
      endDate: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create New Job</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Close />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter Project Name"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  placeholder="Enter Job Location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex justify-between items-center"
                  >
                    {formData.status}
                    <span className="text-gray-400">▼</span>
                  </button>
                  
                  {isStatusDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none"
                          onClick={() => {
                            handleInputChange('status', status);
                            setIsStatusDropdownOpen(false);
                          }}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Client */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client *
                </label>
                <input
                  type="text"
                  placeholder="Enter Client Name"
                  value={formData.client}
                  onChange={(e) => handleInputChange('client', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget *
                </label>
                <input
                  type="number"
                  placeholder="Enter Budget Amount"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
          <CustomButton
            color="#6B7280"
            textColor="#ffffff"
            className="px-6 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </CustomButton>
          <CustomButton
            color="#3B82F6"
            textColor="#ffffff"
            className="px-6 py-2 rounded-lg"
            onClick={handleSave}
          >
            Save Changes
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CreateJobModal; 