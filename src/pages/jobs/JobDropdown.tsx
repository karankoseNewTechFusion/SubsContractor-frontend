import React from 'react';
import { Work, KeyboardArrowDown } from '@mui/icons-material';
import CustomButton from '../../components/Button';

interface JobDropdownProps {
  selectedOption: string;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  onOptionSelect: (option: string) => void;
}

const JobDropdown: React.FC<JobDropdownProps> = ({
  selectedOption,
  isDropdownOpen,
  setIsDropdownOpen,
  onOptionSelect
}) => {
  const options = ['Job Details', 'Task', 'Crew', 'Document', 'Expenses', 'Profit', 'Notes'];

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Work className="text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">{selectedOption}</h2>
      </div>
      <div className="relative">
        <CustomButton
          rightIcon={<KeyboardArrowDown />}
          color="#3B82F6"
          textColor="#ffffff"
          className="px-4 py-2 rounded-lg font-medium"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedOption}
        </CustomButton>
        
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {options.map((option) => (
              <button
                key={option}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                  selectedOption === option 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700'
                }`}
                onClick={() => {
                  onOptionSelect(option);
                  setIsDropdownOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDropdown; 