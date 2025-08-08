import React from "react";
import { Inventory2, Add, PeopleAlt } from "@mui/icons-material";
import { Link, Outlet, useLocation } from "react-router-dom";
import CustomButton from "../../components/Button";

const Materials = () => {
  const location = useLocation();
  const isMaterialsTab = location.pathname.endsWith("/materials");
  const isVendorsTab = location.pathname.endsWith("/vendors");

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
        {[
          { label: "Total Materials", value: 4 },
          { label: "Total Value", value: "$3,675", color: "text-green-600" },
          { label: "Pending Orders", value: 1, color: "text-purple-600" },
          { label: "Delivered", value: 1, color: "text-orange-600" },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-start">
            <span className="text-sm text-gray-500 mb-1">{card.label}</span>
            <span className={`text-2xl font-bold ${card.color || "text-black"}`}>{card.value}</span>
          </div>
        ))}
      </div>

      {/* Tabs + Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* Tabs Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Materials</h2>
          <div className="flex gap-4">
            <Link to="material-list">
              <CustomButton
                leftIcon={<Inventory2 className="text-white" />}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
                  isMaterialsTab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Materials
              </CustomButton>
            </Link>
            <Link to="vendors"> 
              <CustomButton
                leftIcon={<PeopleAlt className="text-white" />}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
                  isVendorsTab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Vendors
              </CustomButton>
            </Link>
          </div>
        </div>

        {/* Render Active Tab Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default Materials;
