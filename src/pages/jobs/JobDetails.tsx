import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import JobHeader from './JobHeader';
import FinancialCards from './FinancialCards';
import JobDropdown from './JobDropdown';
import JobContent from './JobContent';
import EditJobModal from './EditJobModal';
import { jobData as initialJobData, crewList } from './data/jobData';

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [jobData, setJobData] = useState(initialJobData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Job Details');
  const [isTaskFilterOpen, setIsTaskFilterOpen] = useState(false);
  const [selectedTaskFilter, setSelectedTaskFilter] = useState('All Tasks');
  const [crewModalOpen, setCrewModalOpen] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState<any>(null);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<any>(null);

  // Find the job based on ID
  const job = jobData.find((j: any) => j.id === Number(id));

  // Handle job save
  const handleSave = (updatedJobData: any) => {
    console.log('Updated job data:', updatedJobData);
    
    // Update the job in the state
    setJobData(prevJobData => 
      prevJobData.map((job: any) => 
        job.id === updatedJobData.id ? updatedJobData : job
      )
    );
    
    setIsCreateJobModalOpen(false);
    setJobToEdit(null);
  };

  // Determine selected option from URL
  useEffect(() => {
    const path = location.pathname;
    const options = [
      { path: '/task', option: 'Task' },
      { path: '/crew', option: 'Crew' },
      { path: '/document', option: 'Document' },
      { path: '/expenses', option: 'Expenses' },
      { path: '/profit', option: 'Profit' },
      { path: '/notes', option: 'Notes' },
      { path: '', option: 'Job Details' },
    ];
    const matchedOption = options.find((opt) => path.includes(opt.path))?.option || 'Job Details';
    setSelectedOption(matchedOption);
  }, [location.pathname]);

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option === 'Job Details') {
      navigate(`/jobs/${id}`);
    } else {
      navigate(`/jobs/${id}/${option.toLowerCase()}`);
    }
  };

  // Handle edit job
  const handleEditJob = () => {
    setJobToEdit(job);
    setIsCreateJobModalOpen(true);
  };

  // Handle back navigation
  const handleBack = () => navigate('/jobs');

  if (!job) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8 text-center text-lg text-gray-500">
        Job not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Job Header */}
        <JobHeader 
          job={job} 
          onBack={handleBack} 
          onEdit={handleEditJob} 
        />

        {/* Financial Summary Cards */}
        <FinancialCards job={job} />

        {/* Job Dropdown Navigation */}
        <JobDropdown
          selectedOption={selectedOption}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          onOptionSelect={handleOptionSelect}
        />

        {/* Job Content */}
        <JobContent
          selectedOption={selectedOption}
          job={job}
          crewList={crewList}
          selectedTaskFilter={selectedTaskFilter}
          isTaskFilterOpen={isTaskFilterOpen}
          setIsTaskFilterOpen={setIsTaskFilterOpen}
          setSelectedTaskFilter={setSelectedTaskFilter}
          crewModalOpen={crewModalOpen}
          setCrewModalOpen={setCrewModalOpen}
          selectedCrew={selectedCrew}
          setSelectedCrew={setSelectedCrew}
        />

        {/* Edit Job Modal */}
        <EditJobModal
          isOpen={isCreateJobModalOpen}
          onClose={() => {
            setIsCreateJobModalOpen(false);
            setJobToEdit(null);
          }}
          onSave={handleSave}
          editData={jobToEdit}
        />
      </div>
    </div>
  );
};

export default JobDetails;