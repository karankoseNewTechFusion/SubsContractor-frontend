import * as React from "react";
import { imagePath } from "../../constants/imagePath";
import CustomButton from "../../components/Button";
import { useClientContext } from "./ClientContext";

interface AddClientFormData {
  name: string;
  role: string;
  phone: string;
  email: string;
  address: string;
  status: "Active" | "Inactive";
  avatar: string;
}

interface AddClientProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

const AddClient = ({ onClose, onSuccess }: AddClientProps) => {
  const { addClient } = useClientContext();
  const [formData, setFormData] = React.useState<AddClientFormData>({
    name: "",
    role: "",
    phone: "",
    email: "",
    address: "",
    status: "Active",
    avatar: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          avatar: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient = {
      ...formData,
      id: Date.now(),
      rating: 0,
      estimatesSent: 0,
      activeJobs: 0,
      totalRevenue: 0
    };
    addClient(newClient);
    alert("Client added successfully!");
    onSuccess?.();
  };

  const handleCancel = () => {
    onClose?.();
  };

  return (
    <div className="w-full  px-2 sm:px-6  py-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Client</h1>
          <p className="text-gray-500 mt-1">Add a new client to your system</p>
        </div>
        <CustomButton
          onClick={handleCancel}
          color="#2563eb"
          textColor="#ffffff"
          style={{ borderRadius: '12px', fontSize: '16px', padding: '10px 15px' }}
        >
          Cancel
        </CustomButton>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-4">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Basic Information */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <img src={imagePath.BidDark} alt="Basic" className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Basic Information</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mt-3">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-2 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-bold text-gray-700 mt-3">
                    Service Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-2 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">Select service type</option>
                    <option value="General Contracting">General Contracting</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Roofing">Roofing</option>
                    <option value="Landscaping">Landscaping</option>
                    <option value="Painting">Painting</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-bold text-gray-700 mt-3">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 px-2 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Image Upload */}
                <div>
                  <label htmlFor="avatar" className="block text-sm font-bold text-gray-700 mt-3">
                    Client Image
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="flex-1">
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="avatar"
                        className="w-full cursor-pointer inline-flex items-center px-2 py-3 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                      >
                        <img src={imagePath.Arrow} alt="Upload" className="w-5 h-4 mr-3" />
                        Choose Image
                      </label>
                    </div>
                    <div className="w-[43px] h-[43px] rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                      {formData.avatar ? (
                        <img 
                          src={formData.avatar} 
                          alt="Client" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img src={imagePath.ProfileIcon} alt="Default" className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <img src={imagePath.Phone} alt="Contact" className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Contact Information</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mt-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 px-2 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mt-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 px-2 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                    placeholder="client@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-bold text-gray-700 mt-3">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-xl border border-gray-300 px-2 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 resize-none"
                    placeholder="Enter full address"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-12  ">
            <CustomButton
              type="submit"
              color="#2563eb"
              textColor="#ffffff"
              style={{ padding: '10px 15px', borderRadius: '12px', fontSize: '16px', fontWeight: '600' }}
            >
                                  Add Client
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClient; 