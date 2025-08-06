import React, { useState } from 'react';
import { KeyboardArrowDown, Close, Delete } from '@mui/icons-material';
import CustomButton from '../../components/Button';
import CreateTaskModal from './CreateTaskModal';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [tasks, setTasks] = useState([
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
  ]);

  // Expense filter states
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false);
  const [statusFilterOpen, setStatusFilterOpen] = useState(false);
  const [reimbursableFilterOpen, setReimbursableFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedReimbursable, setSelectedReimbursable] = useState('All');

  const handleAddTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (taskIndex: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter((_, index) => index !== taskIndex));
    }
  };

  const handleSaveTask = (taskData: any) => {
    if (editingTask) {
      // Edit existing task
      setTasks(prev => prev.map((task, index) => 
        task === editingTask ? { ...task, ...taskData, hours: `0/${taskData.estimatedHours}h` } : task
      ));
    } else {
      // Add new task
      const newTask = {
        id: Date.now(),
        ...taskData,
        status: 'Pending',
        hours: `0/${taskData.estimatedHours}h`
      };
      setTasks(prev => [...prev, newTask]);
    }
  };

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
              onClick={handleAddTask}
            >
              Add Task
            </CustomButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredTasks.map((task, idx) => {
            const taskIndex = tasks.findIndex(t => t === task);
            return (
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
                  <button 
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center gap-1"
                    onClick={() => handleDeleteTask(taskIndex)}
                  >
                    <Delete className="w-3 h-3" />
                    Delete
                  </button>
                  <button 
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
          })}
        </div>
      </div>

      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        editData={editingTask}
        crewList={crewList}
      />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 ${selectedCrew.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className={`${selectedCrew.textColor} font-bold text-3xl`}>{selectedCrew.initials}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCrew.name}</h2>
                    <p className="text-lg text-gray-600 font-medium">{selectedCrew.role}</p>
                    <p className="text-gray-500">{selectedCrew.email}</p>
                  </div>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => setCrewModalOpen(false)}
                >
                  ×
                </button>
              </div>
              
              {/* Status and Rating */}
              <div className="flex gap-3 mt-4">
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center gap-2">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span>{selectedCrew.rating} Rating</span>
                </span>
                <span className={`px-4 py-2 ${selectedCrew.statusColor} rounded-full text-sm font-medium flex items-center gap-2`}>
                  <div className={`w-3 h-3 ${selectedCrew.statusDot} rounded-full`}></div>
                  {selectedCrew.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Current Tasks */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Current Task Assignments
                </h3>
                {(() => {
                  const assignedTasks = tasks.filter(task => task.assignedTo === selectedCrew.name);
                  return assignedTasks.length > 0 ? (
                    <div className="space-y-3">
                      {assignedTasks.map((task, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 border border-blue-200">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900">{task.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              task.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {task.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>Due: {task.dueDate}</span>
                            <span>{task.hours}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-4">No tasks currently assigned to this crew member.</p>
                  );
                })()}
              </div>

              {/* Current Projects */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Current Projects
                </h3>
                {selectedCrew.projects.length > 0 ? (
                  <div className="grid gap-3">
                    {selectedCrew.projects.map((proj: { title: string; hours: number }, i: number) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-gray-900">{proj.title}</h4>
                            <p className="text-sm text-gray-600">Project Assignment</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-blue-600">{proj.hours}h</span>
                            <p className="text-sm text-gray-500">Hours Worked</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4 bg-gray-50 rounded-lg">No active projects assigned.</p>
                )}
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4">
                  <h4 className="text-sm font-medium opacity-90">Total Hours</h4>
                  <p className="text-2xl font-bold">{selectedCrew.totalHours}h</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4">
                  <h4 className="text-sm font-medium opacity-90">Active Projects</h4>
                  <p className="text-2xl font-bold">{selectedCrew.projects.length}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4">
                  <h4 className="text-sm font-medium opacity-90">Current Tasks</h4>
                  <p className="text-2xl font-bold">{tasks.filter(task => task.assignedTo === selectedCrew.name).length}</p>
                </div>
              </div>
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
    <div className="space-y-6">
     

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-gray-700 font-medium mb-2">Total Expenses</h3>
          <div className="text-2xl font-bold text-green-600">$1,100.8</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-gray-700 font-medium mb-2">Pending Approval</h3>
          <div className="text-2xl font-bold text-purple-600">$85.3</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-gray-700 font-medium mb-2">Paid Expenses</h3>
          <div className="text-2xl font-bold text-red-600">1</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-gray-700 font-medium mb-2">Reimbursable</h3>
          <div className="text-2xl font-bold text-orange-600">$85.3</div>
        </div>
      </div>

      {/* Expense Management Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Heading above filter bar */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-lg font-semibold whitespace-nowrap mr-2">Expense Management</span>
          {/* Categories Dropdown */}
          <div className="relative">
            <CustomButton
              rightIcon={<KeyboardArrowDown />}
              color="#E5E7EB"
              textColor="#374151"
              className="px-4 py-2 rounded-lg font-medium"
              onClick={() => setCategoryFilterOpen(!categoryFilterOpen)}
            >
              {selectedCategory}
            </CustomButton>
            {categoryFilterOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {['All Categories', 'Materials', 'Labor', 'Subcontractor', 'Equipment', 'Permits', 'Meals', 'Transportation', 'Repairs', 'Other'].map((category) => (
                  <button
                    key={category}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                      selectedCategory === category 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700'
                    }`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCategoryFilterOpen(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Status Dropdown */}
          <div className="relative">
            <CustomButton
              rightIcon={<KeyboardArrowDown />}
              color="#E5E7EB"
              textColor="#374151"
              className="px-4 py-2 rounded-lg font-medium"
              onClick={() => setStatusFilterOpen(!statusFilterOpen)}
            >
              {selectedStatus}
            </CustomButton>
            {statusFilterOpen && (
              <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {['All Status', 'Pending', 'Approved', 'Paid', 'Rejected'].map((status) => (
                  <button
                    key={status}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                      selectedStatus === status 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700'
                    }`}
                    onClick={() => {
                      setSelectedStatus(status);
                      setStatusFilterOpen(false);
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Reimbursable Dropdown */}
          <div className="relative">
            <CustomButton
              rightIcon={<KeyboardArrowDown />}
              color="#E5E7EB"
              textColor="#374151"
              className="px-4 py-2 rounded-lg font-medium"
              onClick={() => setReimbursableFilterOpen(!reimbursableFilterOpen)}
            >
              {selectedReimbursable}
            </CustomButton>
            {reimbursableFilterOpen && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {['All', 'Reimbursable', 'Non-Reimbursable'].map((option) => (
                  <button
                    key={option}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                      selectedReimbursable === option 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700'
                    }`}
                    onClick={() => {
                      setSelectedReimbursable(option);
                      setReimbursableFilterOpen(false);
                    }}
                  >
                    {option}
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
            + Add Expense
          </CustomButton>
        </div>

        {/* Expense Entries */}
        <div className="space-y-4">
          {/* Emergency Plumbing Repair */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-gray-900">Emergency Plumbing Repair</h4>
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <span className="text-sm">$</span>
                    $320
                  </span>
                </div>
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center gap-1">
                    <span className="text-gray-500">🔧</span>
                    Repairs
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center gap-1">
                    <span className="text-xs">✓</span>
                    Approved
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Fix Burst Pipe Discovered During Renovation</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <span>📅</span>
                    2024-01-20
                  </span>
                  <span className="flex items-center gap-1">
                    <span>💳</span>
                    Company Card
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-purple-500">🏷️</span>
                    Quick Fix Plumbing
                  </span>
                </div>
                <div className="mt-3">
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                    <span>📄</span>
                    Plumbing_emergency.Pdf
                    <span>⬇️</span>
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <CustomButton
                  rightIcon={<KeyboardArrowDown />}
                  color="#3B82F6"
                  textColor="#ffffff"
                  className="px-3 py-1 text-sm rounded"
                >
                  Approved
                </CustomButton>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <DownloadIcon fontSize="small" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <EditIcon fontSize="small" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lunch For Crew */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-gray-900">Lunch For Crew</h4>
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <span className="text-sm">$</span>
                    $85.3
                  </span>
                </div>
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center gap-1">
                    <span className="text-gray-500">🍽️</span>
                    Meals
                  </span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs flex items-center gap-1">
                    <span className="text-xs">⏰</span>
                    Pending
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center gap-1">
                    <span className="text-xs">💲</span>
                    Reimbursable
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Team Lunch During Extended Work Day</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <span>📅</span>
                    2024-01-18
                  </span>
                  <span className="flex items-center gap-1">
                    <span>💵</span>
                    Cash
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-purple-500">🏷️</span>
                    Local Deli
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <CustomButton
                  rightIcon={<KeyboardArrowDown />}
                  color="#3B82F6"
                  textColor="#ffffff"
                  className="px-3 py-1 text-sm rounded"
                >
                  Pending
                </CustomButton>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <DownloadIcon fontSize="small" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <EditIcon fontSize="small" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cabinet Hardware */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-gray-900">Cabinet Hardware</h4>
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <span className="text-sm">$</span>
                    $245.5
                  </span>
                </div>
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center gap-1">
                    <span className="text-gray-500">🔧</span>
                    Materials
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center gap-1">
                    <span className="text-xs">✓</span>
                    Approved
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Brushed Nickel Handles And Hinges For Kitchen Cabinets</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <span>📅</span>
                    2024-01-15
                  </span>
                  <span className="flex items-center gap-1">
                    <span>💳</span>
                    Company Card
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-purple-500">🏷️</span>
                    Home Depot
                  </span>
                </div>
                <div className="mt-3">
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                    <span>📄</span>
                    Receipt_hardware_001.Pdf
                    <span>⬇️</span>
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <CustomButton
                  rightIcon={<KeyboardArrowDown />}
                  color="#3B82F6"
                  textColor="#ffffff"
                  className="px-3 py-1 text-sm rounded"
                >
                  Approved
                </CustomButton>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <DownloadIcon fontSize="small" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <EditIcon fontSize="small" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>
              </div>
        </div>
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