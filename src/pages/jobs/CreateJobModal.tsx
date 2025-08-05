import React, { useState, useEffect } from 'react';
import { Close, KeyboardArrowDown } from '@mui/icons-material';
import CustomButton from '../../components/Button';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  status: string;
  service: string;
}

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (jobData: any) => void;
  editData?: any; // Add edit data prop
}

// Reusable Input Component
const FormInput: React.FC<{
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  prefix?: string;
  fullWidth?: boolean;
}> = ({ label, type = "text", placeholder, value, onChange, required, prefix, fullWidth }) => (
  <div className={fullWidth ? "col-span-2" : ""}>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && '*'}
    </label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{prefix}</span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 ${
          prefix ? 'pl-8 pr-3' : 'px-3'
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
  <div className="col-span-2">
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
              className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none"
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

const CreateJobModal: React.FC<CreateJobModalProps> = ({ isOpen, onClose, onSave, editData }) => {
  // Mock client data
  const clients: Client[] = [
    { id: 1, name: "Acme Corporation", email: "Billing@Acme.Com", phone: "+1 (555) 123-4567", address: "123 Business St, City, State 12345", rating: 4.8, status: "Active", service: "Construction Services" },
    { id: 2, name: "TechStart Inc", email: "Finance@Techstart.Com", phone: "+1 (555) 234-5678", address: "456 Tech Ave, City, State 12345", rating: 4.9, status: "Active", service: "Technology Solutions" },
    { id: 3, name: "Global Solutions", email: "accounts@globalsolutions.com", phone: "+1 (555) 345-6789", address: "789 Global Blvd, City, State 12345", rating: 4.7, status: "Active", service: "Consulting Services" },
    { id: 4, name: "Innovation Labs", email: "finance@innovationlabs.com", phone: "+1 (555) 456-7890", address: "321 Innovation Dr, City, State 12345", rating: 4.6, status: "Inactive", service: "Research & Development" },
    { id: 5, name: "Metro Construction", email: "billing@metroconstruction.com", phone: "+1 (555) 567-8901", address: "654 Construction Way, City, State 12345", rating: 4.5, status: "Active", service: "Construction Services" }
  ];

  const [formData, setFormData] = useState({
    projectTitle: '', clientId: '', clientName: '', clientEmail: '', clientPhone: '', clientAddress: '',
    projectLocation: '', budget: '', status: 'Pending', priority: 'Medium', description: '', startDate: '', endDate: ''
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (editData) {
      setFormData({
        projectTitle: editData.title || '',
        clientId: '',
        clientName: editData.client || '',
        clientEmail: editData.clientInfo?.email || '',
        clientPhone: editData.clientInfo?.phone || '',
        clientAddress: editData.clientInfo?.address || '',
        projectLocation: editData.location || '',
        budget: editData.budget ? editData.budget.replace('$', '').replace(',', '') : '',
        status: editData.status || 'Pending',
        priority: editData.priority || 'Medium',
        description: editData.description || '',
        startDate: editData.startDate || '',
        endDate: editData.endDate || ''
      });
      setSearchTerm(editData.client || '');
    }
  }, [editData]);

  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const statusOptions = ['Pending', 'Active'];
  const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];
  const filteredClients = clients.filter(client => client.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClientSelect = (client: Client) => {
    setFormData(prev => ({
      ...prev,
      clientId: client.id.toString(),
      clientName: client.name,
      clientEmail: client.email,
      clientPhone: client.phone,
      clientAddress: client.address,
      projectLocation: client.address
    }));
    setSearchTerm(client.name);
    setIsClientDropdownOpen(false);
  };

  const handleClientInputChange = (value: string) => {
    setSearchTerm(value);
    if (value !== formData.clientName) {
      setFormData(prev => ({
        ...prev,
        clientId: '', clientName: '', clientEmail: '', clientPhone: '', clientAddress: ''
      }));
    }
  };

  const handleSave = () => {
    if (!formData.projectTitle || !formData.clientId || !formData.budget) {
      alert('Please fill in all required fields');
      return;
    }

    const newJob = {
      id: Date.now(),
      title: formData.projectTitle,
      client: formData.clientName,
      status: formData.status,
      startDate: formData.startDate || new Date().toISOString().split('T')[0],
      budget: `$${parseInt(formData.budget).toLocaleString()}`,
      profit: '$0',
      expenses: '$0',
      priority: formData.priority,
      description: formData.description,
      location: formData.projectLocation,
      clientInfo: { email: formData.clientEmail, phone: formData.clientPhone, address: formData.clientAddress }
    };

    onSave(newJob);
    onClose();
    setFormData({
      projectTitle: '', clientId: '', clientName: '', clientEmail: '', clientPhone: '', clientAddress: '',
      projectLocation: '', budget: '', status: 'Pending', priority: 'Medium', description: '', startDate: '', endDate: ''
    });
    setSearchTerm('');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]" onClick={handleBackdropClick}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{editData ? 'Edit Job Details' : 'Create New Job'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <Close />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          {/* Job Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormInput label="Project Title" placeholder="Enter Project Title" value={formData.projectTitle} onChange={(v) => handleInputChange('projectTitle', v)} required />
              <FormInput label="Start Date" type="date" placeholder="" value={formData.startDate} onChange={(v) => handleInputChange('startDate', v)} />
              <FormInput label="Budget" type="number" placeholder="Enter Budget Amount" value={formData.budget} onChange={(v) => handleInputChange('budget', v)} required prefix="$" />
              <FormDropdown label="Priority Level" value={formData.priority} options={priorityOptions} onChange={(v) => handleInputChange('priority', v)} isOpen={isPriorityDropdownOpen} onToggle={() => setIsPriorityDropdownOpen(!isPriorityDropdownOpen)} />
              <FormInput label="Project Address" placeholder="Enter Project Address" value={formData.projectLocation} onChange={(v) => handleInputChange('projectLocation', v)} required fullWidth />
              <FormInput label="Estimated Completion" type="date" placeholder="" value={formData.endDate} onChange={(v) => handleInputChange('endDate', v)} />
              <FormDropdown label="Status" value={formData.status} options={statusOptions} onChange={(v) => handleInputChange('status', v)} isOpen={isStatusDropdownOpen} onToggle={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)} />
              <FormTextarea label="Project Description" placeholder="Enter project description..." value={formData.description} onChange={(v) => handleInputChange('description', v)} rows={4} />
            </div>
          </div>

          {/* Client Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Client Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search and select client"
                    value={searchTerm}
                    onChange={(e) => handleClientInputChange(e.target.value)}
                    onFocus={() => setIsClientDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsClientDropdownOpen(false), 200)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  />
                  <button type="button" onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <KeyboardArrowDown />
                  </button>
                  
                  {isClientDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {filteredClients.map((client) => (
                        <button key={client.id} className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0" onClick={() => handleClientSelect(client)}>
                          <div className="font-medium text-gray-900">{client.name}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <FormInput label="Client Name" placeholder="Client Name" value={formData.clientName} onChange={(v) => handleInputChange('clientName', v)} />
              <FormInput label="Email Address" type="email" placeholder="Client Email" value={formData.clientEmail} onChange={(v) => handleInputChange('clientEmail', v)} />
              <FormInput label="Phone Number" type="tel" placeholder="Client Phone Number" value={formData.clientPhone} onChange={(v) => handleInputChange('clientPhone', v)} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
          <CustomButton color="#6B7280" textColor="#ffffff" className="px-6 py-2 rounded-lg" onClick={onClose}>Cancel</CustomButton>
          <CustomButton color="#3B82F6" textColor="#ffffff" className="px-6 py-2 rounded-lg" onClick={handleSave}>{editData ? 'Save Changes' : 'Create Job'}</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CreateJobModal; 