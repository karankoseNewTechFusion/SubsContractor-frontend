import * as React from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import { imagePath } from "../../constants/imagePath";

const JobOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Mock job data - in real app this would come from API/context
  const job = {
    id: Number(id),
    title: "Kitchen Renovation",
    client: "Smith Family",
    status: "Active",
    startDate: "Jan 15, 2024",
    expectedCompletion: "Mar 15, 2024",
    budget: 45000,
    spent: 32500,
    remaining: 12500,
    progress: 75,
    profit: 8500,
    expenses: 36500
  };

  if (!job) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8 text-center text-lg text-gray-500">
        Job not found
      </div>
    );
  }

  const profileProps = {
    name: job.title,
    logo: imagePath.BuilderLogo,
    client: job.client,
    status: job.status,
    startDate: job.startDate,
    expectedCompletion: job.expectedCompletion,
    budget: job.budget,
    progress: job.progress,
    stats: [
      {
        label: "Total Budget",
        value: <span className="text-green-500">${job.budget.toLocaleString()}</span>,
      },
      {
        label: "Spent",
        value: <span className="text-red-500">${job.spent.toLocaleString()}</span>,
      },
      {
        label: "Remaining",
        value: <span className="text-blue-500">${job.remaining.toLocaleString()}</span>,
      },
      {
        label: "Progress",
        value: <span className="text-purple-500">{job.progress}%</span>,
      },
    ],
  };

  const tabList = [
    { key: "job-overview", label: "Overview" },
    { key: "job-progress", label: "Progress" },
    { key: "job-messages", label: "Messages" },
    { key: "job-documents", label: "Documents" },
    { key: "job-payments", label: "Payments" },
  ];
  const currentTab = location.pathname.split("/").pop() || "job-overview";
  
  // If we're on the main job page (without a specific tab), redirect to overview
  React.useEffect(() => {
    if (location.pathname === `/jobs/${id}`) {
      navigate(`/jobs/${id}/job-overview`);
    }
  }, [location.pathname, id, navigate]);

  return (
    <div>
      {/* Job Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <img src={imagePath.JobIcon} alt="Job" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profileProps.name}</h1>
              <p className="text-gray-600">Client: {profileProps.client}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  profileProps.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {profileProps.status}
                </span>
                <span className="text-sm text-gray-500">
                  {profileProps.startDate} - {profileProps.expectedCompletion}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-2xl font-bold text-gray-900">
              ${profileProps.budget.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Budget</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {profileProps.stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-700 font-medium mb-2">{stat.label}</h3>
            <div className="text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="h-px bg-gray-200 mb-6" />

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-start w-full gap-2 mb-6">
        {tabList.map((tab) => (
          <button
            key={tab.key}
            className={`flex-grow sm:flex-1 text-center whitespace-nowrap px-4 py-2 rounded-lg text-base font-medium transition border ${
              currentTab === tab.key
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
            }`}
            onClick={() => navigate(`/jobs/${id}/${tab.key}`)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 w-full">
        <Outlet context={{ job }} />
      </div>
    </div>
  );
};

export default JobOverview; 