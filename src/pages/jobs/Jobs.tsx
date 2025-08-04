import { Work, Add, Search, KeyboardArrowDown } from '@mui/icons-material';
import CustomButton from '../../components/Button';
import { useState } from 'react';
import CreateJobModal from './CreateJobModal';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const JobsContent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const navigate = useNavigate();

    const statusOptions = [
    'All Status',
    'Active',
    'Pending',
    'Completed'
  ];

  // Job data with status
  const jobData = [
    {
      id: 1,
      title: "Office Buildout",
      client: "Tech Startup LLC",
      status: "Pending",
      startDate: "Feb 1, 2024",
      budget: "$65,000",
      profit: "$0",
      expenses: "$0"
    },
    {
      id: 2,
      title: "Bathroom Remodel",
      client: "Johnson Home",
      status: "Active",
      startDate: "Jan 20, 2024",
      budget: "$28,000",
      profit: "$4,200",
      expenses: "$23,800"
    },
    {
      id: 3,
      title: "Deck Construction",
      client: "Williams Property",
      status: "Completed",
      startDate: "Jan 20, 2024",
      budget: "$15,000",
      profit: "$3,500",
      expenses: "$11,500"
    },
    {
      id: 4,
      title: "Kitchen Renovation",
      client: "Smith Family",
      status: "Active",
      startDate: "Jan 15, 2024",
      budget: "$45,000",
      profit: "$8,500",
      expenses: "$36,500"
    },
    {
      id: 5,
      title: "Roof Repair",
      client: "Brown Residence",
      status: "Pending",
      startDate: "Jan 10, 2024",
      budget: "$12,000",
      profit: "$0",
      expenses: "$2,000"
    }
  ];

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setIsDropdownOpen(false);
  };

  // Filter jobs based on selected status
  const filteredJobs = selectedStatus === 'All Status' 
    ? jobData 
    : jobData.filter(job => job.status === selectedStatus);

  const handleAddNewJob = (newJob: any) => {
    // Add the new job to the jobData array
    jobData.push(newJob);
    // Force re-render by updating the state
    setSelectedStatus(selectedStatus);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl mx-auto p-6">
      {/* Job Management Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Job Management
          </h1>
          <p className="text-gray-600 text-lg">
            Track And Manage All Your Construction Projects
          </p>
        </div>
        <CustomButton
          leftIcon={<Add />}
          color="#3B82F6"
          textColor="#ffffff"
          className="px-6 py-3 rounded-lg font-medium"
          onClick={() => setIsCreateJobModalOpen(true)}
        >
          New Job
        </CustomButton>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Active Jobs Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-700 font-medium mb-2">Active Jobs</h3>
          <div className="text-3xl font-bold text-gray-900">2</div>
        </div>

        {/* Total Crew Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-700 font-medium mb-2">Total Crew</h3>
          <div className="text-3xl font-bold text-green-600">$153K</div>
        </div>

        {/* Total Profit Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-700 font-medium mb-2">Total Profit</h3>
          <div className="text-3xl font-bold text-purple-600">$16,200</div>
        </div>

        {/* Completed Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-700 font-medium mb-2">Completed</h3>
          <div className="text-3xl font-bold text-orange-600">1</div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Jobs Or Client..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <CustomButton
            rightIcon={<KeyboardArrowDown />}
            color="#3B82F6"
            textColor="#ffffff"
            className="px-6 py-3 rounded-lg font-medium"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedStatus}
          </CustomButton>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                    selectedStatus === status ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                  onClick={() => handleStatusChange(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => {
          const getStatusColor = (status: string) => {
            switch (status) {
              case 'Active':
                return { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' };
              case 'Pending':
                return { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' };
              case 'Completed':
                return { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' };
              default:
                return { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' };
            }
          };

          const statusColors = getStatusColor(job.status);

          return (
            <div 
              key={job.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              onClick={() => navigate(`/jobs/${job.id}/job-overview`)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-gray-600">{job.client}</p>
                </div>
                <span className={`px-3 py-1 ${statusColors.bg} ${statusColors.text} rounded-full text-sm font-medium flex items-center gap-1`}>
                  <div className={`w-2 h-2 ${statusColors.dot} rounded-full`}></div>
                  {job.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="text-gray-900">{job.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="text-gray-900">{job.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profit:</span>
                  <span className="text-green-600 font-medium">{job.profit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expenses:</span>
                  <span className="text-red-600 font-medium">{job.expenses}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>

      {/* Create Job Modal */}
      <CreateJobModal
        isOpen={isCreateJobModalOpen}
        onClose={() => setIsCreateJobModalOpen(false)}
        onSave={handleAddNewJob}
      />
    </>
  );
};

const Jobs = () => {
  const location = useLocation();
  const isJobDetail = location.pathname.includes('/jobs/') && location.pathname !== '/jobs';

  return (
    <>
      {isJobDetail ? <Outlet /> : <JobsContent />}
    </>
  );
};

export default Jobs; 