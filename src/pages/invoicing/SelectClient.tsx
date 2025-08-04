import React, { useState } from 'react';
import { Search, ArrowBack, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/Button';
import { imagePath } from '../../constants/imagePath';

const SelectClient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mock client data - in a real app this would come from an API
  const clients = [
    {
      id: 1,
      name: "Acme Corporation",
      email: "Billing@Acme.Com",
      phone: "+1 (555) 123-4567",
      address: "123 Business St, City, State 12345",
    
      rating: 4.8,
      status: "Active",
      avatar: imagePath.Pic1,
      service: "Construction Services"
    },
    {
      id: 2,
      name: "TechStart Inc",
      email: "Finance@Techstart.Com",
      phone: "+1 (555) 234-5678",
      address: "456 Tech Ave, City, State 12345",
    
      rating: 4.9,
      status: "Active",
      avatar: imagePath.Pic2,
      service: "Technology Solutions"
    },
    {
      id: 3,
      name: "Global Solutions",
      email: "accounts@globalsolutions.com",
      phone: "+1 (555) 345-6789",
      address: "789 Global Blvd, City, State 12345",
     
      rating: 4.7,
      status: "Active",
      avatar: imagePath.Pic3,
      service: "Consulting Services"
    },
    {
      id: 4,
      name: "Innovation Labs",
      email: "finance@innovationlabs.com",
      phone: "+1 (555) 456-7890",
      address: "321 Innovation Dr, City, State 12345",
      
      rating: 4.6,
      status: "Inactive",
      avatar: imagePath.Pic4,
      service: "Research & Development"
    },
    {
      id: 5,
      name: "Metro Construction",
      email: "billing@metroconstruction.com",
      phone: "+1 (555) 567-8901",
      address: "654 Construction Way, City, State 12345",
   
      rating: 4.9,
      status: "Active",
      avatar: imagePath.Pic1,
      service: "Construction & Development"
    },
    {
      id: 6,
      name: "Digital Dynamics",
      email: "accounts@digitaldynamics.com",
      phone: "+1 (555) 678-9012",
      address: "987 Digital Lane, City, State 12345",
    
      rating: 4.5,
      status: "Active",
      avatar: imagePath.Pic2,
      service: "Digital Marketing"
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const handleClientSelect = (clientId: number) => {
    // Navigate to create invoice page with selected client
    navigate(`../create-invoice/${clientId}`);
  };

  const handleBack = () => {
    navigate('.');
  };

  const handleAddNewClient = () => {
    // Navigate to add new client page
    navigate('/clients/add');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowBack className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Select Client
              </h1>
              <p className="text-gray-600 text-lg">
                Choose a client to create an invoice for
              </p>
            </div>
          </div>
          <CustomButton
            leftIcon={<Add />}
            color="#2563eb"
            textColor="#ffffff"
            className="px-6 py-3 rounded-lg font-medium"
            onClick={handleAddNewClient}
          >
            Add New Client
          </CustomButton>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Client List */}
        <div className="space-y-3">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              onClick={() => handleClientSelect(client.id)}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border cursor-pointer transition bg-white border-gray-200 hover:bg-gray-50"
            >
              {/* Left section */}
              <div className="flex items-center gap-4">
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{client.name}</div>
                  <div className="text-sm text-gray-500">{client.service}</div>
                  <div className="text-xs text-gray-400">{client.email}</div>
                </div>
              </div>

              {/* Right section */}
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center font-medium bg-gray-200 border border-gray-300 rounded-xl px-3 py-1">
                  <img src={imagePath.Star} alt="star" className="w-4 h-4 mr-1" />
                  {client.rating}
                </span>
                <span
                  className={`flex items-center gap-1 font-medium bg-gray-200 border border-gray-300 rounded-xl px-3 py-1 ${
                    client.status === "Active"
                      ? "text-gray-600"
                      : "text-gray-500"
                  }`}
                >
                  <img
                    src={
                      client.status === "Active"
                        ? imagePath.StatusActive
                        : imagePath.StatusInactive
                    }
                    alt={client.status}
                    className="w-3 h-3"
                  />
                  {client.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No clients found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectClient; 