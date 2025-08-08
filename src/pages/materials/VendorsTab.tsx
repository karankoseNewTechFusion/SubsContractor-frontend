import React, { useState } from "react";
import { Phone, Email, Edit, Delete ,Add} from "@mui/icons-material";
import CustomButton from "../../components/Button";
import { Link } from "react-router-dom";
import AddVendorModal from "./AddVendorModal";

interface Vendor {
  name: string; // Vendor Name
  contactPerson: string; // Company Name
  phone: string;
  email: string;
  materialsSupplied: string[];
}

const VendorsTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      name: "Smith Building Supplies", // Vendor Name
      contactPerson: "John Smith",     // Company Name
      phone: "(555) 123-4567",
      email: "John@Smithsupplies.Com",
      materialsSupplied: ["Lumber", "Hardware", "Concrete"],
    },
    {
      name: "Premium Stone Co.",
      contactPerson: "Sarah Johnson",
      phone: "(555) 987-6543",
      email: "Sarah@Premiumstone.Com",
      materialsSupplied: ["Granite", "Marble", "Tile"],
    },
    {
      name: "Wilson Electrical",
      contactPerson: "Mike Wilson",
      phone: "(555) 456-7890",
      email: "Mike@Wilsonelectric.Com",
      materialsSupplied: ["Electrical", "Lighting", "Wiring"],
    },
  ]);

  const handleAddVendor = (newVendor: Vendor): void => {
    setVendors((prev) => [...prev, newVendor]);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Vendor Management</h2>

        <CustomButton
          color="#2563eb"
          textColor="#fff"
          className="px-5 py-2 rounded-lg font-medium text-sm"
         onClick={() => setIsModalOpen(true)}
          leftIcon={<Add className="text-white" />}
        >
          Add Vendor
        </CustomButton>
      
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.map((vendor, index) => (
          <div key={index} className="bg-white rounded-lg shadow border p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3> {/* Vendor Name */}
                <p className="text-sm text-gray-600">{vendor.contactPerson}</p>      {/* Company Name */}
              </div>
              <div className="flex gap-2">
                <button title="Edit">
                  <Edit className="text-gray-500 hover:text-gray-700" fontSize="small" />
                </button>
                <button title="Delete">
                  <Delete className="text-gray-500 hover:text-gray-700" fontSize="small" />
                </button>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-700 mb-1">
              <Phone fontSize="small" className="mr-1 text-blue-600" />
              {vendor.phone}
            </div>
            <div className="flex items-center text-sm text-gray-700 mb-2">
              <Email fontSize="small" className="mr-1 text-red-600" />
              {vendor.email}
            </div>

            <div className="mt-2">
              <p className="text-sm font-medium text-gray-800 mb-1">Materials Supplied:</p>
              <div className="flex flex-wrap gap-2">
                {vendor.materialsSupplied.map((material, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddVendorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddVendor={handleAddVendor}
      />
    </div>
  );
};

export default VendorsTab;
