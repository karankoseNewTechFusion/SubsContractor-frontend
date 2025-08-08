
import React, { useState } from "react";
import CustomButton from "../../components/Button";
import { Close, ArrowForward, Add } from "@mui/icons-material";

type Vendor = {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  materialsSupplied: string[];
};

type AddVendorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddVendor: (vendor: Vendor) => void;
};

const AddVendorModal: React.FC<AddVendorModalProps> = ({
  isOpen,
  onClose,
  onAddVendor,
}) => {
  const [vendor, setVendor] = useState<Vendor>({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    materialsSupplied: [],
  });

  const [materialInput, setMaterialInput] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
  });

  const validate = () => {
    let tempErrors = {
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
    };
    let isValid = true;

    if (!vendor.contactPerson) {
      tempErrors.contactPerson = "Company name is required";
      isValid = false;
    }

    if (!vendor.name) {
      tempErrors.name = "Vendor name is required";
      isValid = false;
    }

    if (!vendor.phone) {
      tempErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(vendor.phone)) {
      tempErrors.phone = "Enter a valid 10-digit phone number";
      isValid = false;
    }

    if (!vendor.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(vendor.email)
    ) {
      tempErrors.email = "Enter a valid email address";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onAddVendor(vendor);
      onClose();
    }
  };

  const addMaterial = () => {
    if (materialInput.trim()) {
      setVendor((prev) => ({
        ...prev,
        materialsSupplied: [...prev.materialsSupplied, materialInput.trim()],
      }));
      setMaterialInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl relative">
        {/* Close Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-600 transition-colors"
          >
            <Close />
          </button>
        </div>

        <h2 className="text-xl font-bold mb-6">Add New Vendor</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Company Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              className={`w-full p-2 rounded border mt-1 ${
                errors.contactPerson ? "border-red-500" : ""
              }`}
              placeholder="Enter Company Name"
              value={vendor.contactPerson}
              onChange={(e) =>
                setVendor({ ...vendor, contactPerson: e.target.value })
              }
            />
            {errors.contactPerson && (
              <span className="text-red-500 text-sm">{errors.contactPerson}</span>
            )}
          </div>

          {/* Vendor Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Vendor Name
            </label>
            <input
              className={`w-full p-2 rounded border mt-1 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter Vendor Name"
              value={vendor.name}
              onChange={(e) => setVendor({ ...vendor, name: e.target.value })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              className={`w-full p-2 rounded border mt-1 ${
                errors.phone ? "border-red-500" : ""
              }`}
              placeholder="Enter Phone Number"
              value={vendor.phone}
              onChange={(e) => setVendor({ ...vendor, phone: e.target.value })}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className={`w-full p-2 rounded border mt-1 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter Email Address"
              value={vendor.email}
              onChange={(e) => setVendor({ ...vendor, email: e.target.value })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
        </div>

        {/* Materials Supplied */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Materials Supplied
          </label>
          <div className="flex gap-2">
            <input
              className="w-full p-2 rounded border"
              placeholder="Enter Material Type..."
              value={materialInput}
              onChange={(e) => setMaterialInput(e.target.value)}
            />
            <CustomButton
              className="px-5 py-2 rounded-lg font-medium text-sm"
              color="#F0F1F4"
              textColor="#000"
              centerIcon={<Add />}
              onClick={addMaterial}
            />
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {vendor.materialsSupplied.map((material, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
              >
                {material}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <CustomButton
            color="#F0F1F4"
            textColor="#000"
            className="px-5 py-2 rounded-lg font-medium text-sm"
            onClick={onClose}
          >
            Cancel
          </CustomButton>
          <CustomButton
            color="#2563eb"
            textColor="#fff"
            className="px-5 py-2 rounded-lg font-medium text-sm"
            onClick={handleSubmit}
          >
            Add Vendor
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default AddVendorModal;
