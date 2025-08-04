import React from 'react';
import { useOutletContext } from 'react-router-dom';

interface JobTabWrapperProps {
  tabType: 'overview' | 'progress' | 'messages' | 'documents' | 'payments';
}

const JobTabWrapper: React.FC<JobTabWrapperProps> = ({ tabType }) => {
  const context = useOutletContext<{ job: any }>();
  const job = context?.job;

  if (!job) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8 text-center text-lg text-gray-500">
        Loading job data...
      </div>
    );
  }

  switch (tabType) {
    case 'overview':
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Project Name:</span>
                  <span className="text-gray-900 font-medium">{job.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Client:</span>
                  <span className="text-gray-900 font-medium">{job.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="text-gray-900 font-medium">{job.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Completion:</span>
                  <span className="text-gray-900 font-medium">{job.expectedCompletion}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Budget:</span>
                  <span className="text-green-600 font-medium">${job.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Spent:</span>
                  <span className="text-red-600 font-medium">${job.spent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="text-blue-600 font-medium">${job.remaining.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profit:</span>
                  <span className="text-purple-600 font-medium">${job.profit.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'progress':
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">Overall Progress</span>
                <span className="text-gray-900 font-bold">{job.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${job.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Completed Tasks</h3>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">In Progress</h3>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Remaining</h3>
                <p className="text-2xl font-bold text-orange-600">5</p>
              </div>
            </div>
          </div>
        </div>
      );
    case 'messages':
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Messages</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">JS</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">John Smith</span>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-gray-700">Updated the kitchen cabinet installation schedule. We'll need to adjust the timeline by 2 days due to material delays.</p>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">SF</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">Sarah Family</span>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                  <p className="text-gray-700">The new countertop material has been delivered. Ready for installation next week.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'documents':
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Documents</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">PDF</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Contract Agreement</p>
                  <p className="text-sm text-gray-500">Signed on Jan 15, 2024</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-medium">Download</button>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-semibold">IMG</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Kitchen Layout Plan</p>
                  <p className="text-sm text-gray-500">Updated on Jan 20, 2024</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
            </div>
          </div>
        </div>
      );
    case 'payments':
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Payments</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Total Paid</h3>
                <p className="text-2xl font-bold text-green-600">$32,500</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Pending</h3>
                <p className="text-2xl font-bold text-blue-600">$12,500</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Next Due</h3>
                <p className="text-2xl font-bold text-orange-600">$8,000</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Initial Payment</p>
                  <p className="text-sm text-gray-500">Jan 15, 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">$15,000</p>
                  <p className="text-sm text-green-600">Paid</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Materials Payment</p>
                  <p className="text-sm text-gray-500">Jan 25, 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">$17,500</p>
                  <p className="text-sm text-green-600">Paid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Overview</h2>
          <p className="text-gray-600">Select a tab to view job details.</p>
        </div>
      );
  }
};

export default JobTabWrapper; 