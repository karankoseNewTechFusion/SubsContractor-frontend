import React from 'react';
import { Outlet } from 'react-router-dom';

const InvoicingLayout = () => {
  return (
    <div className="">
      <Outlet />
    </div>
  );
};

export default InvoicingLayout; 