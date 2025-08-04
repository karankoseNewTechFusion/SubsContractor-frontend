import React from "react";
import { WorkOutline, Receipt, Info, Schedule ,Send, CarRental , PendingActions ,WorkHistory, CategorySharp} from '@mui/icons-material';
import { imagePath } from '../../constants/imagePath';

const recentJobs = [
  {
    title: "Kitchen Remodel - Johnson",
    status: { label: "In Progress", icon: <WorkOutline /> },
    statusClass: "inprogress",
    right: <span className="text-red-500">Due: Dec 15</span>,
  },
  
  {
    title: "Bathroom Addition - Smith",
    status: { label: "Materials Ordered", icon: <CategorySharp /> },
    statusClass: "materials",
    right: <span className="text-gray-500">Start: Dec 10</span>,
  },
  {
    title: "Deck Installation - Brown",
    status: { label: "Estimate Sent", icon: <Send /> },
    statusClass: "estimate",
    right: <span className="text-gray-500">Follow Up: Dec 8</span>,
  },
];

const pendingInvoices = [
  {
    title: "ABC Builders",
    overdue: "32 Days Overdue",
    amount: "$12,500",
  },
  {
    title: "XYZ Construction",
    overdue: "18 Days Overdue",
    amount: "$8,750",
  },
  {
    title: "Smith Homes",
    overdue: "45 Days Overdue",
    amount: "$15,200",
  },
];

const RecentJobsInvoices: React.FC = () => (
  <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8">
    <div className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <img src={imagePath.BegTime} alt="Recent Jobs" className="w-[22px] h-[22px] text-blue-600" />
        <span className="font-bold text-lg text-gray-800">Recent Jobs</span>
      </div>
      {recentJobs.map((job, idx) => (
        <div
          className={`flex items-center justify-between p-4 ${idx < recentJobs.length - 1 ? 'border-b border-gray-200' : ''}`}
          key={idx}
        >
          <div>
            <div className="font-bold text-base text-gray-800">{job.title}</div>
            <div className="mt-2 inline-flex items-center gap-2 text-sm text-gray-600">
              {job.status.icon}
              {job.status.label}
            </div>
          </div>
          <div>{job.right}</div>
        </div>
      ))}
    </div>
    <div className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <img src={imagePath.NoteOrange} alt="Pending Invoices" className="w-[22px] h-[22px] text-orange-500" />
        <span className="font-bold text-lg text-gray-800">Pending Invoices</span>
      </div>
      {pendingInvoices.map((inv, idx) => (
        <div
          className={`flex items-center justify-between p-4 ${idx < pendingInvoices.length - 1 ? 'border-b border-gray-200' : ''}`}
          key={idx}
        >
          <div>
            <div className="font-bold text-base text-gray-800">{inv.title}</div>
            <div className="mt-2 inline-flex items-center gap-2 text-sm text-gray-600">
              <PendingActions className="text-gray-500" />
              {inv.overdue}
            </div>
          </div>
          <div className="font-semibold text-base text-gray-900">{inv.amount}</div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentJobsInvoices; 