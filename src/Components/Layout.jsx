import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Define navigation items with paths
  const navItems = [
    { name: "Overview", path: "/Overview", icon: "📊" },
    { name: "Request", path: "/request", icon: "📝" },
    { name: "Wallet", path: "/Wallet", icon: "💼" },
    { name: "Settings", path: "/Setting", icon: "⚙️" }, 
  ];

  // Helper function to check if a path is active
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - hidden on mobile unless toggled */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block md:w-64 bg-white border-r fixed md:relative z-10 h-full`}>
        <div className="p-4 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
              E
            </div>
            <span className="ml-2 font-semibold text-gray-800">EduCatalyst</span>
          </div>
        </div>
        <div className="py-4">
          {navItems.map((item) => (
            <div 
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`${
                isActive(item.path) 
                  ? 'bg-purple-600 text-white' 
                  : 'hover:bg-gray-100 text-gray-700'
              } px-4 py-3 flex items-center cursor-pointer`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-2"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
              S
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;