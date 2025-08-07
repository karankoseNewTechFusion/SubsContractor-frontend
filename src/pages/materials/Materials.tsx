
import React, { useState } from "react";
import { Inventory2 , Add , PeopleAlt} from "@mui/icons-material";
import CustomButton from "../../components/Button";
const Materials = () => {
  const [activeTab, setActiveTab] = useState("Materials"); // State to toggle between tabs

  // Sample data for Materials tab
  const materialsData = {
    title: "Kitchen Remodel - Smith Residence",
    description: "Complete Kitchen Renovation Including Cabinets, Countertops, And Appliances",
    totalMaterials: 2,
    totalCost: "$2,680",
    items: [
      {
        name: "Granite Countertops",
        status: "Ordered",
        quantity: "3 Slabs",
        cost: "$2,500",
        vendor: "Premium Stone Co.",
        date: "Jul 15, 2024",
      },
      {
        name: "Cabinet Hardware",
        status: "Delivered",
        quantity: "24 Pieces",
        cost: "$180",
        vendor: "Smith Building Supplies",
        date: "Jul 12, 2024",
      },
    ],
  };

  // Sample data for Vendors tab (placeholder)
  const vendorsData = {
    title: "Vendor Overview",
    description: "Manage and track all vendors supplying materials.",
    vendors: [
      {
        name: "Premium Stone Co.",
        materialsSupplied: "Granite Countertops",
        totalOrders: 3,
        lastOrderDate: "Jul 15, 2024",
      },
      {
        name: "Smith Building Supplies",
        materialsSupplied: "Cabinet Hardware",
        totalOrders: 2,
        lastOrderDate: "Jul 12, 2024",
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Materials Management</h2>
          <p className="text-gray-500 text-sm">Track And Manage Materials Across All Your Projects</p>
        </div>

        <CustomButton
          color="#2563eb"
          textColor="#fff"
          className="px-5 py-2 rounded-lg font-medium text-sm"
          onClick={() => alert("add material")}
          leftIcon={<Add className="text-white" />}
        >
         Add Material
        </CustomButton>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-start">
          <span className="text-sm text-gray-500 mb-1">Total Materials</span>
          <span className="text-2xl font-bold text-black">4</span>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-start">
          <span className="text-sm text-gray-500 mb-1">Total Value</span>
          <span className="text-2xl font-bold text-green-600">$3,675</span>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-start">
          <span className="text-sm text-gray-500 mb-1">Pending Orders</span>
          <span className="text-2xl font-bold text-purple-600">1</span>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-start">
          <span className="text-sm text-gray-500 mb-1">Delivered</span>
          <span className="text-2xl font-bold text-orange-600">1</span>
        </div>
      </div>

      {/* tabs */}

      
         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Materials </h2>
        </div>

           <div className="flex gap-4 mb-4 md:mb-0">
        
          <CustomButton
            leftIcon={<Inventory2 className="text-white" />}
            className={`px-4 py-2 rounded-lg font-medium text-sm ${
              activeTab === "Materials"
                ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("Materials")}
        >
          Materials
        </CustomButton>
        <CustomButton
          leftIcon={<PeopleAlt   className="text-white" />}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            activeTab === "Vendors"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("Vendors")}
        >
          Vendors
        </CustomButton>
        </div>

      </div>

  

      {/* Dynamic Content Based on Tab */}
      {activeTab === "Materials" && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {materialsData.title}
              </h3>
              <p className="text-gray-500 text-sm">{materialsData.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {materialsData.totalMaterials} Materials - {materialsData.totalCost}
              </span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                Generate PO
              </button>
            </div>
          </div>
          {materialsData.items.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 py-4 flex justify-between items-center"
            >
              <div>
                <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Ordered"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Cost: {item.cost}</span>
                  <span className="text-purple-600">Vendor: {item.vendor}</span>
                  <span>Date: {item.date}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {item.status === "Ordered" && (
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                    Mark As Delivered
                  </button>
                )}
                <button className="text-gray-500 hover:text-gray-700">
                  <span className="sr-only">Edit</span>
                  ✎
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <span className="sr-only">Info</span>
                  ℹ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Vendors" && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {vendorsData.title}
              </h3>
              <p className="text-gray-500 text-sm">{vendorsData.description}</p>
            </div>
          </div>
          {vendorsData.vendors.map((vendor, index) => (
            <div
              key={index}
              className="border-b border-gray-200 py-4 flex justify-between items-center"
            >
              <div>
                <h4 className="text-lg font-medium text-gray-800">{vendor.name}</h4>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                  <span>Materials Supplied: {vendor.materialsSupplied}</span>
                  <span>Total Orders: {vendor.totalOrders}</span>
                  <span>Last Order Date: {vendor.lastOrderDate}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <span className="sr-only">Edit</span>
                  ✎
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <span className="sr-only">Info</span>
                  ℹ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Materials;