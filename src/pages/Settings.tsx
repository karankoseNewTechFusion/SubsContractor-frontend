import React, { useState } from "react";
import { Business, Save, Upload, Image } from "@mui/icons-material";
import CustomButton from "../components/Button";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("company");
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "Your Construction Company",
    primaryContact: "John Contractor",
    phoneNumber: "(555) 123-4567",
    emailAddress: "John@Yourcompany.Com",
    businessAddress: "123 Builder Street\nConstruction City, ST 12345", 
    licenseNumber: "LIC-123456789",
    insurancePolicy: "POL-987654321",
    companyLogo: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setCompanyInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCompanyInfo((prev) => ({
        ...prev,
        companyLogo: file,
      }));
    }
  };

  const handleSave = () => {
    console.log("Saving company info:", companyInfo);
    // Here you would typically save to backend
  };

  const tabs = [{ key: "company", label: "Company Info" }];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600 text-lg">
            Manage Your Company Information And Profile
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-6 py-4 text-base font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-gray-200 text-black border-b-2 border-white-600"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "company" && (
              <div>
                {/* Company Information Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Business className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Company Information
                  </h2>
                </div>

                {/* Company Logo Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Image
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="cursor-pointer flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full"
                      >
                        <Upload className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">Choose Image</span>
                      </label>
                    </div>
                    <div className="w-16 h-16 border border-gray-300 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center">
                      {companyInfo.companyLogo ? (
                        <img
                          src={URL.createObjectURL(companyInfo.companyLogo)}
                          alt="Company Logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={companyInfo.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Contact
                      </label>
                      <input
                        type="text"
                        value={companyInfo.primaryContact}
                        onChange={(e) =>
                          handleInputChange("primaryContact", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={companyInfo.phoneNumber}
                        onChange={(e) =>
                          handleInputChange("phoneNumber", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={companyInfo.emailAddress}
                        onChange={(e) =>
                          handleInputChange("emailAddress", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Address
                      </label>
                      <textarea
                        value={companyInfo.businessAddress}
                        onChange={(e) =>
                          handleInputChange("businessAddress", e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        License Number
                      </label>
                      <input
                        type="text"
                        value={companyInfo.licenseNumber}
                        onChange={(e) =>
                          handleInputChange("licenseNumber", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Insurance Policy
                      </label>
                      <input
                        type="text"
                        value={companyInfo.insurancePolicy}
                        onChange={(e) =>
                          handleInputChange("insurancePolicy", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-8">
                  <CustomButton
                    onClick={handleSave}
                    color="#2563eb"
                    textColor="#ffffff"
                    className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Company Info
                  </CustomButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
