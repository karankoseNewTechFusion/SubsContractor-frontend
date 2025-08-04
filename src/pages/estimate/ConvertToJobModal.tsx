import React, { useState } from 'react';
import { Close } from '@mui/icons-material';
import CustomButton from '../../components/Button';
import { Estimate } from './estimateData';

interface ConvertToJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimate: Estimate | null;
  onConvert: (jobData: {
    estimateId: string;
    jobTitle: string;
    assignedClient: string;
    startDate?: string;
  }) => void;
}

const ConvertToJobModal: React.FC<ConvertToJobModalProps> = ({
  isOpen,
  onClose,
  estimate,
  onConvert
}) => {
  const [formData, setFormData] = useState({
    estimateId: estimate?.id || '',
    jobTitle: estimate?.title ? `${estimate.title} - Job` : '',
    assignedClient: estimate?.client.name || '',
    startDate: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConvert({
      estimateId: formData.estimateId,
      jobTitle: formData.jobTitle,
      assignedClient: formData.assignedClient,
      startDate: formData.startDate || undefined
    });
    onClose();
  };

  const calculateTotalValue = () => {
    return estimate?.total || 0;
  };

  const calculateLineItemsCount = () => {
    return estimate?.lineItems.length || 0;
  };

  if (!isOpen || !estimate) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-2 pb-0">
          <h2 className="text-xl font-semibold text-gray-900">
            Convert Estimate to Job
          </h2>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-3">
          <p className="text-sm text-gray-600 mb-6">
            Fill the credentials below
          </p>

          {/* Estimate ID */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimate ID
            </label>
            <input
              type="text"
              value={formData.estimateId}
              onChange={(e) => handleInputChange('estimateId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>

          {/* Suggested Job Title */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suggested Job Title
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Assigned Client */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned Client
            </label>
            <input
              type="text"
              value={formData.assignedClient}
              onChange={(e) => handleInputChange('assignedClient', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Start Date */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date (Optional)
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Select Start Date"
              />
            </div>
          </div>

          {/* Job Details Preview */}
          <div className="mb-2 p-2 bg-gray-50 border border-gray-400 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Job Details Preview
            </h3>
            <ul className="space-y-1 text-sm text-blue-600">
              <li>• Total Value: ${calculateTotalValue().toLocaleString()}</li>
              <li>• Line Items: {calculateLineItemsCount()} items</li>
              <li>• Client: {estimate.client.name}</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center items-center">
            <CustomButton
              type="submit"
              style={{ background: "#2563eb",
                color: "#fff",
                borderRadius: 8,
                fontWeight: 600,
                padding: "6px 14px",
                fontSize: 14,
                width: "50%",
                boxShadow: "none",
                display: "flex",
                alignItems: "center",
                gap: 4,
                transition: "background 0.2s, color 0.2s", }}
              className="custom-action-btn"
            >
              Convert to job
            </CustomButton>
            <CustomButton
              type="button"
              onClick={onClose}
              style={{ background: "#f4f5f7",
                color: "#2563eb",
                borderRadius: 8,
                fontWeight: 600,
                padding: "6px 14px",
                fontSize: 14,
                boxShadow: "none",
                display: "flex",
                alignItems: "center",
                gap: 4,
                width: "50%",
                transition: "background 0.2s, color 0.2s", }}
              className="custom-action-btn"
            >
              Cancel
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConvertToJobModal; 