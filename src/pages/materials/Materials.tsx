import { Inventory2 } from '@mui/icons-material';

const Materials = () => (
   <div className="bg-gray-50 min-h-screen p-6">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Materials Management</h2>
        <p className="text-gray-500 text-sm">Track And Manage Materials Across All Your Projects</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm">
        + Add Material
      </button>
    </div>
    {/* Summary Cards */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
  </div>
);

export default Materials; 