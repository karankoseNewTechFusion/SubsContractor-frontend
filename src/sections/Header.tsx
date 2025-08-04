import React from 'react';
import { Search, NotificationsOutlined, KeyboardArrowDown, Menu } from '@mui/icons-material';

type HeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <Menu className="text-gray-600" />
          </button>
          <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 w-full border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all shadow-sm">
            <Search className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search jobs, builders..."
              className="bg-transparent outline-none text-sm w-full placeholder-gray-400 min-w-0"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <NotificationsOutlined className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                3
              </span>
            </button>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors cursor-pointer">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40?img=1"
                alt="Helen Bator"
                className="w-9 h-9 rounded-full ring-2 ring-gray-200"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-sm hidden md:block">
              <div className="font-semibold text-gray-800">Helen Bator</div>
              <div className="text-gray-500 text-xs">Admin</div>
            </div>
            <KeyboardArrowDown className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;