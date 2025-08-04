import React from 'react';
import { imagePath } from '../../constants/imagePath';
import { 
  FlashOn,
  EventNote,
  GroupAdd,
  UploadFile,
  Message,
  Description,
  Work,
  ArrowOutward,
  
  Groups,
  PostAdd,
  AssignmentAdd
} from '@mui/icons-material';
import OverviewCards from './OverviewCards';
import RecentJobsInvoices from './RecentJobsInvoices';

const QuickActions = () => {
  const quickActions = [
    { label: 'New Estimate', icon: <img src={imagePath.EstimateWhite} alt="BegTime" />, primary: true },
    { label: 'Schedule Job', icon: <Work /> },
    { label: 'Create Invoice', icon: <AssignmentAdd /> },
    { label: 'Add Crew', icon: <Groups /> },
    { label: 'Upload Docs', icon: <ArrowOutward /> },
    { label: 'Message Builder', icon: <Message /> },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FlashOn className="text-blue-500" />
        <h2 className="text-lg font-semibold">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors w-full ${
              action.primary
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {action.icon}
            <span className="text-sm">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => (
  <div className="flex flex-col items-center justify-center ">
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-gray-600">Welcome Back! Here's Your Project Overview.</p>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Overview Cards */}
      <div className="mb-8">
        <OverviewCards />
      </div>

      {/* Recent Jobs & Pending Invoices */}
      <div>
        <RecentJobsInvoices />
      </div>
    </div>
  </div>
);

export default Dashboard; 