import React, { useState } from "react";
import {
  Dashboard as DashboardIcon,
  People,
  Description,
  Mail,
  Work,
  CalendarMonth,
  Inventory2,
  NoteAlt,
  InsertDriveFile,
  Receipt,
  Settings,
  Logout,
  Close,
  PersonAddAlt1,
  ChevronLeft,
  ChevronRight,
  AssignmentAdd,
  TextSnippet,
  OutgoingMail,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { imagePath } from "../constants/imagePath";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Clients", icon: <People />, path: "/clients" },
    { label: "Estimates", icon: <Description />, path: "/estimates" },
    { label: "Bid Invites", icon: <PersonAddAlt1 />, path: "/bid-invites" },
    { label: "Jobs", icon: <Work />, path: "/jobs" },
    { label: "Scheduling", icon: <CalendarMonth />, path: "/scheduling" },
    { label: "Materials", icon: <Inventory2 />, path: "/materials" },
    { label: "Document", icon: <TextSnippet  />, path: "/document" },
    { label: "Invoicing", icon: <AssignmentAdd />, path: "/invoicing" },
    { label: "Referral", icon: <OutgoingMail />, path: "/referral" },
    { label: "Settings", icon: <Settings />, path: "/settings" },
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${
          collapsed ? "w-16" : "w-64"
        } fixed inset-y-0 left-0 z-50 bg-white shadow-xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div
            className={`flex items-center gap-3 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className={`flex items-center justify-center ${
              collapsed ? "w-8 h-8" : "w-32 h-8"
            }`}>
              <img 
                src={collapsed ? imagePath.subsLogoMobile : imagePath.subsLogo} 
                alt="SUBS Logo" 
                className="w-full h-full object-contain"
              />
            </div>

          </div>

          {/* Collapse/Expand button for desktop */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-2 hover:bg-blue-600 rounded-full transition-colors bg-blue-500"
          >
            {collapsed ? (
              <ChevronRight className="text-white" />
            ) : (
              <ChevronLeft className="text-white" />
            )}
          </button>

          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Close className="text-gray-500" />
          </button>
        </div>

        {/* Menu Label */}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item.path)}
                className={`w-full group flex items-center gap-3 px-2 py-1.5  transition-all duration-200 ${
                  location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <div
                  className={`p-1 rounded-md ${
                    location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                      ? "text-white"
                      : "text-gray-900 group-hover:text-blue-500"
                  }`}
                >
                  {item.icon}
                </div>
                {!collapsed && (
                  <>
                    <span className="font-medium text-sm">{item.label}</span>
                    {location.pathname === item.path && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-16 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <button
            className={`w-full group flex items-center gap-3 px-2 py-1.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="p-1 rounded-md text-gray-500 group-hover:text-red-500 relative">
              <Logout />
              {collapsed && (
                <div className="absolute left-8 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Logout
                </div>
              )}
            </div>
            {!collapsed && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
