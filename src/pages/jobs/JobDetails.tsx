import React from 'react';
import { Work, Add, Search, KeyboardArrowDown } from '@mui/icons-material';
import CustomButton from '../../components/Button';

const JobDetails = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Job Details Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Job Details
            </h1>
            <p className="text-gray-600 text-lg">
              View And Manage Specific Job Information
            </p>
          </div>
          <CustomButton
            leftIcon={<Add />}
            color="#3B82F6"
            textColor="#ffffff"
            className="px-6 py-3 rounded-lg font-medium"
          >
            Edit Job
          </CustomButton>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Job Progress Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-700 font-medium mb-2">Job Progress</h3>
            <div className="text-3xl font-bold text-blue-600">75%</div>
          </div>

          {/* Total Budget Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-700 font-medium mb-2">Total Budget</h3>
            <div className="text-3xl font-bold text-green-600">$45,000</div>
          </div>

          {/* Current Expenses Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-700 font-medium mb-2">Current Expenses</h3>
            <div className="text-3xl font-bold text-red-600">$32,500</div>
          </div>

          {/* Remaining Budget Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-700 font-medium mb-2">Remaining Budget</h3>
            <div className="text-3xl font-bold text-orange-600">$12,500</div>
          </div>
        </div>

        {/* Job Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Project Name:</span>
                  <span className="text-gray-900 font-medium">Kitchen Renovation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Client:</span>
                  <span className="text-gray-900 font-medium">Smith Family</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="text-gray-900 font-medium">Jan 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Completion:</span>
                  <span className="text-gray-900 font-medium">Mar 15, 2024</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Budget:</span>
                  <span className="text-green-600 font-medium">$45,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Spent:</span>
                  <span className="text-red-600 font-medium">$32,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="text-blue-600 font-medium">$12,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profit Margin:</span>
                  <span className="text-purple-600 font-medium">18.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;