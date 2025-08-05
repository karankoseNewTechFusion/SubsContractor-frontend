import React from 'react';
import { KeyboardArrowDown, Close } from '@mui/icons-material';
import CustomButton from '../../components/Button';

interface JobContentProps {
  selectedOption: string;
  job: any;
  crewList: any[];
  selectedTaskFilter: string;
  isTaskFilterOpen: boolean;
  setIsTaskFilterOpen: (open: boolean) => void;
  setSelectedTaskFilter: (filter: string) => void;
  crewModalOpen: boolean;
  setCrewModalOpen: (open: boolean) => void;
  selectedCrew: any;
  setSelectedCrew: (crew: any) => void;
}

const JobContent: React.FC<JobContentProps> = ({
  selectedOption,
  job,
  crewList,
  selectedTaskFilter,
  isTaskFilterOpen,
  setIsTaskFilterOpen,
  setSelectedTaskFilter,
  crewModalOpen,
  setCrewModalOpen,
  selectedCrew,
  setSelectedCrew
}) => {
  const tasks = [
    {
      title: 'Remove Old Cabinets',
      description: 'Carefully Remove Existing Kitchen Cabinets And Dispose Of Materials',
      assignedTo: 'John Doe',
      dueDate: '2024-01-20',
      status: 'Completed',
      hours: '7/8h',
    },
    {
      title: 'Install New Countertops',
      description: 'Install Granite Countertops With Proper Sealing And Finishing',
      assignedTo: 'Sarah Wilson',
      dueDate: '2024-01-25',
      status: 'In Progress',
      hours: '5/12h',
    },
    {
      title: 'Final Inspection',
      description: 'Quality Check And Final Approval Of All Kitchen Renovation Work',
      assignedTo: 'Mike Johnson',
      dueDate: '2024-01-18',
      status: 'Overdue',
      hours: '2/4h',
    },
  ];

  const filteredTasks = selectedTaskFilter === 'All Tasks' 
    ? tasks 
    : tasks.filter((task) => task.status === selectedTaskFilter);

  const renderJobDetails = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Start Date:</span>
            <span className="text-gray-900 font-medium">{job.startDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Budget:</span>
            <span className="text-gray-900 font-medium">{job.budget}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${
              job.status === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : job.status === 'Pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {job.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Profit:</span>
            <span className="text-gray-900 font-medium">{job.profit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Expenses:</span>
            <span className="text-gray-900 font-medium">{job.expenses}</span>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Project Description:</h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            {job.title} project for {job.client}. This project involves comprehensive work with a budget of {job.budget} and current status of {job.status}. The project started on {job.startDate} and is managed with attention to detail and quality standards.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Client Name:</span>
              <span className="text-gray-900 font-medium">{job.client}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Project Title:</span>
              <span className="text-gray-900 font-medium">{job.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Project Status:</span>
              <span className="text-gray-900 font-medium">{job.status}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Timeline</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Project Started:</span>
              <span className="text-gray-900 font-medium">{job.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Status:</span>
              <span className="text-gray-900 font-medium">{job.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Budget:</span>
              <span className="text-gray-900 font-medium">{job.budget}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTaskContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-gray-700 font-medium mb-2">Total Tasks</h3>
          <div className="text-2xl font-bold text-green-600">3</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-gray-700 font-medium mb-2">Completed</h3>
          <div className="text-2xl font-bold text-purple-600">1</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-gray-700 font-medium mb-2">In Progress</h3>
          <div className="text-2xl font-bold text-red-600">1</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-gray-700 font-medium mb-2">Overdue</h3>
          <div className="text-2xl font-bold text-red-600">1</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
          <div className="flex gap-3">
            <div className="relative">
              <CustomButton
                rightIcon={<KeyboardArrowDown />}
                color="#E5E7EB"
                textColor="#374151"
                className="px-4 py-2 rounded-lg font-medium"
                onClick={() => setIsTaskFilterOpen(!isTaskFilterOpen)}
              >
                {selectedTaskFilter}
              </CustomButton>
              
              {isTaskFilterOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {['All Tasks', 'Pending', 'In Progress', 'Completed', 'Overdue'].map((filter) => (
                    <button
                      key={filter}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                        selectedTaskFilter === filter 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-700'
                      }`}
                      onClick={() => {
                        setSelectedTaskFilter(filter);
                        setIsTaskFilterOpen(false);
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <CustomButton
              color="#3B82F6"
              textColor="#ffffff"
              className="px-4 py-2 rounded-lg font-medium"
            >
              Add Task
            </CustomButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredTasks.map((task, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                <span className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${
                  task.status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : task.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  <span className="text-xs">
                    {task.status === 'Completed' ? '✓' : task.status === 'In Progress' ? '⟳' : '⚠'}
                  </span>
                  {task.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{task.description}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">Assigned To: {task.assignedTo}</span>
                <span className="text-sm text-gray-600">Due: {task.dueDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{task.hours}</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                    Delete
                  </button>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCrewContent = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Crew</h3>
      <div className="space-y-4">
        {crewList.map((member, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            onClick={() => {
              setSelectedCrew(member);
              setCrewModalOpen(true);
            }}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${member.color} rounded-full flex items-center justify-center`}>
                <span className={`${member.textColor} font-semibold text-lg`}>{member.initials}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                {member.rating}
              </span>
              <span className={`px-3 py-1 ${member.statusColor} rounded-full text-sm flex items-center gap-1`}>
                <div className={`w-2 h-2 ${member.statusDot} rounded-full`}></div>
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Crew Modal */}
      {crewModalOpen && selectedCrew && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setCrewModalOpen(false)}
            >
              <Close />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 ${selectedCrew.color} rounded-full flex items-center justify-center`}>
                <span className={`${selectedCrew.textColor} font-semibold text-2xl`}>{selectedCrew.initials}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedCrew.name}</h2>
                <p className="text-gray-600">{selectedCrew.role}</p>
                <p className="text-gray-500 text-sm">{selectedCrew.email}</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    {selectedCrew.rating}
                  </span>
                  <span className={`px-3 py-1 ${selectedCrew.statusColor} rounded-full text-sm flex items-center gap-1`}>
                    <div className={`w-2 h-2 ${selectedCrew.statusDot} rounded-full`}></div>
                    {selectedCrew.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Projects</h3>
              {selectedCrew.projects.length > 0 ? (
                <ul className="space-y-2">
                  {selectedCrew.projects.map((proj: { title: string; hours: number }, i: number) => (
                    <li key={i} className="flex justify-between items-center">
                      <span className="text-gray-700">{proj.title}</span>
                      <span className="text-sm text-gray-500">{proj.hours}h</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No active projects.</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Total Hours Worked</h3>
              <p className="text-2xl font-bold text-blue-600">{selectedCrew.totalHours}h</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderDocumentContent = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Documents</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
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
        <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-semibold">IMG</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Project Plans</p>
              <p className="text-sm text-gray-500">Updated on Jan 20, 2024</p>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
        </div>
      </div>
    </div>
  );

  const renderExpensesContent = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Expenses</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Materials</h4>
            <p className="text-sm text-gray-600">Deck lumber and hardware</p>
          </div>
          <span className="text-red-600 font-medium">$8,500</span>
        </div>
        <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Labor</h4>
            <p className="text-sm text-gray-600">Crew wages and overtime</p>
          </div>
          <span className="text-red-600 font-medium">$2,500</span>
        </div>
        <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Equipment</h4>
            <p className="text-sm text-gray-600">Tools and machinery rental</p>
          </div>
          <span className="text-red-600 font-medium">$500</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total Expenses:</span>
            <span className="text-red-600 font-bold text-lg">{job.expenses}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfitContent = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit Analysis</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-600">{job.budget}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-600">{job.expenses}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Net Profit</h3>
            <p className="text-2xl font-bold text-blue-600">{job.profit}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Profit Margin:</span>
            <span className="text-green-600 font-medium">23.3%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ROI:</span>
            <span className="text-green-600 font-medium">30.4%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotesContent = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Notes</h3>
      <div className="space-y-4">
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">MJ</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900">Mike Johnson</span>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <p className="text-gray-700">Foundation work completed successfully. Ready to proceed with deck installation next week.</p>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-semibold text-sm">SW</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900">Sarah Wilson</span>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>
              <p className="text-gray-700">Materials delivered and inspected. All quality standards met.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const contentMap = {
    'Job Details': renderJobDetails,
    'Task': renderTaskContent,
    'Crew': renderCrewContent,
    'Document': renderDocumentContent,
    'Expenses': renderExpensesContent,
    'Profit': renderProfitContent,
    'Notes': renderNotesContent
  };

  return contentMap[selectedOption as keyof typeof contentMap]?.() || null;
};

export default JobContent; 