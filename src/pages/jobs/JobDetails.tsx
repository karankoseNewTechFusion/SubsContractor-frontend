import React from 'react';
import { Work, Add, Search, KeyboardArrowDown, ArrowBack, Edit } from '@mui/icons-material';
import CustomButton from '../../components/Button';

const JobDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Project Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Work className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Kitchen Renovation
                </h1>
                <p className="text-gray-600 mb-1">Client: Smith Family</p>
                <p className="text-sm text-gray-500">Active Jan 15, 2024 - Mar 15, 2024</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Total Budget</div>
              <div className="text-2xl font-bold text-green-600">$45,000</div>
            </div>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Budget Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-700 font-medium mb-2">Total Budget</h3>
            <div className="text-3xl font-bold text-gray-900">$45,000</div>
          </div>

          {/* Profit Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-700 font-medium mb-2">Profit</h3>
            <div className="text-3xl font-bold text-green-600">$8,500</div>
          </div>

          {/* Amount Received Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-700 font-medium mb-2">Amount Received</h3>
            <div className="text-3xl font-bold text-red-600">$53,500</div>
          </div>

          {/* Remaining Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-700 font-medium mb-2">Remaining</h3>
            <div className="text-3xl font-bold text-purple-600">$0</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mb-8">
          <CustomButton
            leftIcon={<ArrowBack />}
            color="#F0F1F4"
            textColor="#374151"
            className="px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back To Job
          </CustomButton>
          <CustomButton
            leftIcon={<Edit />}
            color="#2563eb"
            textColor="#ffffff"
            className="px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Edit Job
          </CustomButton>
        </div>

        {/* Job Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Job Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
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

            {/* Financial Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
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
                  <span className="text-gray-600">Profit:</span>
                  <span className="text-purple-600 font-medium">$8,500</span>
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