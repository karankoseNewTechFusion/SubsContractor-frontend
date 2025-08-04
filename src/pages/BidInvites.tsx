const recentJobs = [
  {
    title: "Kitchen Remodel - Johnson",
    // status: { label: "In Progress", icon: imagePath.EstimateDark },
    statusClass: "inprogress",
    right: <span className="text-red-500">Due: Dec 15</span>,
  },

  {
    title: "Bathroom Addition - Smith",
    // status: { label: "Materials Ordered", icon: imagePath.Cart },
    statusClass: "materials",
    right: <span className="text-gray-500">Start: Dec 10</span>,
  },
  {
    title: "Deck Installation - Brown",
    // status: { label: "Estimate Sent", icon: imagePath.Arrow2 },
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

const BidInvites = () => (
  <div className="flex flex-col items-center justify-center h-full gap-6">
    {/* Recent Jobs Card */}
    <div className="flex-1 w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        {/* Optional Icon */}
        {/* <img
        src={imagePath.BegTime}
        alt="Recent Jobs"
        className="w-[22px] h-[22px] text-blue-600"
      /> */}
        <span className="font-bold text-lg text-gray-800">Recent Jobs</span>
      </div>

      {/* Job Items */}
      {recentJobs.map((job, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-between p-4 ${
            idx < recentJobs.length - 1 ? "border-b border-gray-200" : ""
          }`}
        >
          <div>
            <div className="font-bold text-base text-gray-800">{job.title}</div>
            <div className="mt-2 inline-flex items-center gap-2 text-sm text-gray-600">
              {/* <img src={job.status.icon} alt="status" className="w-4 h-4" /> */}
              {/* {job.status.label} */}
            </div>
          </div>
          <div>{job.right}</div>
        </div>
      ))}
    </div>

    {/* Pending Invoices Card */}
    <div className="flex-1 w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        {/* Optional Icon */}
        {/* <img
        src={imagePath.NoteOrange}
        alt="Pending Invoices"
        className="w-[22px] h-[22px] text-orange-500"
      /> */}
        <span className="font-bold text-lg text-gray-800">
          Pending Invoices
        </span>
      </div>

      {/* Invoice Items */}
      {pendingInvoices.map((inv, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-between p-4 ${
            idx < pendingInvoices.length - 1 ? "border-b border-gray-200" : ""
          }`}
        >
          <div>
            <div className="font-bold text-base text-gray-800">{inv.title}</div>
            <div className="mt-2 inline-flex items-center gap-2 text-sm text-gray-600">
              {/* <img src={imagePath.sechuldeDark} alt="overdue" className="w-4 h-4" /> */}
              {inv.overdue}
            </div>
          </div>
          <div className="font-semibold text-base text-gray-900">
            {inv.amount}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default BidInvites;
