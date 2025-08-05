import React from 'react';

interface FinancialCardsProps {
  job: any;
}

const FinancialCards: React.FC<FinancialCardsProps> = ({ job }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-gray-700 font-medium mb-2">Total Budget</h3>
      <div className="text-3xl font-bold text-gray-900">{job.budget}</div>
    </div>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-gray-700 font-medium mb-2">Profit</h3>
      <div className="text-3xl font-bold text-green-600">{job.profit}</div>
    </div>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-gray-700 font-medium mb-2">Amount Received</h3>
      <div className="text-3xl font-bold text-red-600">{job.profit}</div>
    </div>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-gray-700 font-medium mb-2">Remaining</h3>
      <div className="text-3xl font-bold text-purple-600">{job.expenses}</div>
    </div>
  </div>
);

export default FinancialCards; 