import React from 'react';
import { ArrowBack, Edit } from '@mui/icons-material';
import CustomButton from '../../components/Button';

interface JobHeaderProps {
  job: any;
  onBack: () => void;
  onEdit: () => void;
}

const JobHeader: React.FC<JobHeaderProps> = ({ job, onBack, onEdit }) => (
  <div className="p-6 mb-8">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h1>
        <p className="text-gray-600">Client: {job.client}</p>
      </div>
      <div className="flex items-center gap-3">
        <CustomButton
          leftIcon={<ArrowBack />}
          color="#F0F1F4"
          textColor="#374151"
          className="px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          onClick={onBack}
        >
          Back To Job
        </CustomButton>
        <CustomButton
          leftIcon={<Edit />}
          color="#2563eb"
          textColor="#ffffff"
          className="px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          onClick={onEdit}
        >
          Edit Job
        </CustomButton>
      </div>
    </div>
  </div>
);

export default JobHeader; 