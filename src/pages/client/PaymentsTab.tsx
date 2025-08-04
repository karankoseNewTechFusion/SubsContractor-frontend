import * as React from "react";
import { imagePath } from "../../constants/imagePath";

interface PaymentsTabProps {
  builder: any;
}

const PaymentsTab: React.FC<PaymentsTabProps> = ({ builder }) => {
  const jobs = builder?.jobs || [
    {
      title: "Kitchen Renovation - 123 Oak St",
      value: 45000,
      startDate: "2025-01-15",
      endDate: "2025-03-15",
      lastPayment: "2024-02-01",
      outstanding: 15000,
      paymentStatus: "Pending",
    },
    {
      title: "Bathroom Remodel - 456 Pine Ave",
      value: 28500,
      startDate: "2025-03-01",
      endDate: "2025-04-30",
      lastPayment: "2024-01-15",
      outstanding: 0,
      paymentStatus: "Paid",
    },
  ];
  return (
    <div className="w-full">
      <div className="font-bold text-lg text-gray-900 mb-1">Payment Status & Notes</div>
      <div className="text-gray-500 text-sm mb-4">Track Payment History And Outstanding Amounts</div>
      <div className="flex flex-col gap-4 mb-6">
        {jobs.map((job: any, idx: number) => (
          <div className="bg-white rounded-xl shadow-sm p-4" key={idx}>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-100 rounded">
                <img src={imagePath.JobIcon} alt="job" className="w-6 h-6" />
              </span>
              <div className="font-bold text-base text-gray-800">{job.title}</div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-green-500 font-bold">${job.value?.toLocaleString() || '-'}</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Total Value</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">Start Date: {job.startDate}</span>
              <span className="bg-gray-100 px-2 py-1 rounded">End Date: {job.endDate}</span>
            </div>
            <hr className="my-2 border-gray-200" />
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-xs text-gray-500">Last Payment</div>
                <div className="text-base text-gray-800">{job.lastPayment}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Outstanding</div>
                <div className={job.outstanding > 0 ? "text-red-500 text-base" : "text-green-500 text-base"}>${job.outstanding?.toLocaleString() || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Payment Status</div>
                <div className={`px-3 py-1 rounded text-xs font-semibold ${job.paymentStatus?.toLowerCase() === 'paid' ? 'bg-green-100 text-green-700' : job.paymentStatus?.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{job.paymentStatus}</div>
              </div>
            </div>
            <div className="font-bold text-xs text-gray-700 mb-1">Payment Note</div>
            <textarea className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2" placeholder="Add Notes About Payment Terms, Issues, Or Special Arrangements....." defaultValue={job.note || ''} />
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-end gap-4 mt-4">
        <div className="font-semibold text-gray-700">Total Outstanding:</div>
        <div className="text-red-500 font-bold">${jobs.reduce((sum: number, j: any) => sum + (j.outstanding || 0), 0).toLocaleString()}</div>
        <div className="font-semibold text-gray-700">Total Paid:</div>
        <div className="text-green-500 font-bold">${(jobs.reduce((sum: number, j: any) => sum + (j.value || 0), 0) - jobs.reduce((sum: number, j: any) => sum + (j.outstanding || 0), 0)).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default PaymentsTab; 