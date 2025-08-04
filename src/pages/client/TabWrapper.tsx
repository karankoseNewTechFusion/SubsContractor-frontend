import React from 'react';
import { useOutletContext } from 'react-router-dom';
import OverViewTab from './OverViewTab';
import ActiveRecentJobs from './ActiveRecentJobs';
import MessageTab from './MessageTab';
import DocumentTab from './DocumentTab';
import PaymentsTab from './PaymentsTab';

interface TabWrapperProps {
  tabType: 'overview' | 'jobs' | 'messages' | 'documents' | 'payments';
}

const TabWrapper: React.FC<TabWrapperProps> = ({ tabType }) => {
  const context = useOutletContext<{ builder: any }>();
  const builder = context?.builder;

  if (!builder) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8 text-center text-lg text-gray-500">
        Loading builder data...
      </div>
    );
  }

  switch (tabType) {
    case 'overview':
      return <OverViewTab builder={builder} />;
    case 'jobs':
      return <ActiveRecentJobs builder={builder} />;
    case 'messages':
      return <MessageTab builder={builder} />;
    case 'documents':
      return <DocumentTab builder={builder} />;
    case 'payments':
      return <PaymentsTab builder={builder} />;
    default:
      return <OverViewTab builder={builder} />;
  }
};

export default TabWrapper; 