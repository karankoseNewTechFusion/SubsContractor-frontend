import * as React from "react";
import { People } from '@mui/icons-material';
import { ClientProvider, useClientContext } from './ClientContext';
import BuilderOverview from './BuilderOverview';
import AddClient from './AddClient';
import Card from './Card';
import BuilderList from './BuilderList';
import { workers } from './builderData';
import { imagePath } from '../../constants/imagePath';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import CustomButton from '../../components/Button';

// Map workers to BuilderList expected format
const builderListData = workers.map((worker) => ({
  id: worker.id,
  name: worker.name,
  service: worker.role,
  avatar: worker.avatar,
  rating: worker.rating,
  status:
    worker.status === "Active"
      ? ("Active" as "Active")
      : ("Inactive" as "Inactive"),
}));

const filterOptions = ["All", "Active", "Inactive"] as const;
type FilterType = (typeof filterOptions)[number];

const ClientContent = () => {
  const { addClient } = useClientContext();
  const [filter, setFilter] = React.useState<FilterType>("All");
  const [showFilterDropdown, setShowFilterDropdown] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showAddClientModal, setShowAddClientModal] = React.useState(false);
  const navigate = useNavigate();

  const filteredBuilders = builderListData
    .filter((b) => {
      const matchesFilter = filter === "All" || b.status === filter;
      const matchesSearch =
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.service.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl mx-auto p-6">
          <div className="bg-white p-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div className="flex flex-col">
                <h2 className="font-bold text-2xl text-gray-900 flex items-center gap-2 flex-wrap">
                  Clients {" "}
                  <span className="bg-blue-600 text-white rounded-full px-3 py-1 text-xs font-semibold">
                    {filteredBuilders.length}
                  </span>
                </h2>
                <p className="text-gray-500 text-sm sm:text-base mt-1">
                  Manage builder relationships
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-4">
              <Card
                title="Total Builders"
                value={builderListData.length}
                subtitle="Registered builders"
              />
              <Card
                title="Active Builders"
                value={<span className="text-green-500">{builderListData.filter((b) => b.status === "Active").length}</span>}
                subtitle="Currently working"
              />
              <Card
                title="Total Paid"
                value={<span className="text-purple-500">$356K</span>}
                subtitle="Amount paid"
              />
              <Card
                title="Active Jobs"
                value={<span className="text-orange-500">6</span>}
                subtitle="Jobs in progress"
              />
            </div>

            {/* Filter/Search/Add */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                {/* Search bar takes full width except buttons */}
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="Search builders"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg bg-gray-100 border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Filter + Add Buttons in fixed-width flex */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 relative shrink-0">
                  {/* Filter */}
                  <div className="relative">
                    <CustomButton
                      color="#f3f6fa"
                      textColor="#2563eb"
                      style={{ borderRadius: '12px', padding: '10px 15px', fontWeight: 600, border: '1px solid #d1d5db', minWidth: 160 }}
                      onClick={() => setShowFilterDropdown((v) => !v)}
                      type="button"
                    >
                      {/* Left Image Icon */}
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <img src={imagePath.FilterIcon} alt="Filter" className="w-5 h-5" />
                        <span className="mx-1">Filter: {filter}</span>
                        <img src={imagePath.TriangleBlue} alt="Dropdown" className="w-4 h-4" />
                      </span>
                    </CustomButton> 

                    {/* Dropdown */}
                    {showFilterDropdown && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                        {filterOptions.map((opt) => (
                          <div
                            key={opt}
                            className={`px-4 py-2 cursor-pointer text-sm ${
                              filter === opt ? "text-blue-600 font-semibold" : "text-gray-800"
                            }`}
                            onClick={() => {
                              setFilter(opt);
                              setShowFilterDropdown(false);
                            }}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add Builder */}
                  <CustomButton
                    color="#2563eb"
                    textColor="#ffffff"
                    style={{ borderRadius: '12px', padding: '10px 15px', fontWeight: 600 }}
                    onClick={() => setShowAddClientModal(true)}
                  >
                    + Add Client
                  </CustomButton>
                </div>
              </div>

              {/* Builder List */}
              <BuilderList
                builders={filteredBuilders}
                onBuilderClick={(b) => navigate(`/clients/${b.id}/client-overview`)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Client Modal */}
      {showAddClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <AddClient 
              onClose={() => setShowAddClientModal(false)}
              onSuccess={() => {
                setShowAddClientModal(false);
                // Optionally refresh the list or show success message
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

const Client = () => {
  const location = useLocation();
  const isClientDetail = location.pathname.includes('/clients/') && location.pathname !== '/clients';

  return (
    <ClientProvider>
      {isClientDetail ? <Outlet /> : <ClientContent />}
    </ClientProvider>
  );
};

export default Client; 