import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateEstimateModal from './CreateEstimateModal';
import { Estimate } from './estimateData';

const NewEstimate = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    navigate('/estimates');
  };

  const handleCreate = (newEstimate: Omit<Estimate, "id">) => {
    // Handle estimate creation logic here
    console.log('New estimate created:', newEstimate);
    handleClose();
  };

  return (
    <CreateEstimateModal
      open={isOpen}
      onClose={handleClose}
      onCreate={handleCreate}
    />
  );
};

export default NewEstimate; 