import React, { useState } from 'react';
import { Close, KeyboardArrowDown, CalendarToday } from '@mui/icons-material';
import CustomButton from '../../components/Button';

interface Expense {
  id: number;
  name: string;
  amount: number;
  date: string;
  category: string;
  vendor: string;
  paymentMethod: string;
  description: string;
}

interface CreateExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expenseData: Omit<Expense, 'id'>) => void;
  editData?: Expense;
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

const CreateExpenseModal: React.FC<CreateExpenseModalProps> = ({ isOpen, onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    name: editData?.name || '',
    amount: editData?.amount || 0,
    date: editData?.date || '',
    category: editData?.category || 'Other',
    vendor: editData?.vendor || '',
    paymentMethod: editData?.paymentMethod || 'Company Card',
    description: editData?.description || ''
  });

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);

  const categoryOptions = [
    'Materials',
    'Labor',
    'Subcontractor',
    'Equipment',
    'Permits',
    'Meals',
    'Transportation',
    'Repairs',
    'Other'
  ];

  const paymentOptions = [
    'Company Card',
    'Cash',
    'Check',
    'Personal'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.amount || !formData.date || !formData.category || !formData.paymentMethod) {
      alert('Please fill in all required fields');
      return;
    }
    onSave(formData);
    onClose();
    setFormData({
      name: '',
      amount: 0,
      date: '',
      category: 'Other',
      vendor: '',
      paymentMethod: 'Company Card',
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
              {editData ? 'Edit Expense' : 'Add New Expense'}
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
                label="Expense Name"
                placeholder="Enter Expense Name"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                required
              />

              <FormInput
                label="Amount"
                type="number"
                placeholder="0"
                value={formData.amount}
                onChange={(value) => handleInputChange('amount', value)}
                required
              />

              <FormInput
                label="Date"
                type="date"
                placeholder="MM/DD/YYYY"
                value={formData.date}
                onChange={(value) => handleInputChange('date', value)}
                required
                icon={<CalendarToday className="w-4 h-4" />}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <FormDropdown
                label="Category"
                value={formData.category}
                options={categoryOptions}
                onChange={(value) => handleInputChange('category', value)}
                isOpen={isCategoryDropdownOpen}
                onToggle={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              />
              <FormDropdown
                label="Payment Method"
                value={formData.paymentMethod}
                options={paymentOptions}
                onChange={(value) => handleInputChange('paymentMethod', value)}
                isOpen={isPaymentDropdownOpen}
                onToggle={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
              />
              <FormInput
                label="Vendor"
                placeholder="Enter Vendor Name"
                value={formData.vendor}
                onChange={(value) => handleInputChange('vendor', value)}
              />
            </div>
          </div>

          {/* Description field spans full width */}
          <div className="mt-4">
            <FormTextarea
              label="Description"
              placeholder="Enter Expense Description"
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
              {editData ? 'Update Expense' : 'Add Expense'}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExpenseModal;