import React, { useState } from 'react';
import { FaCog, FaWallet, FaHome, FaEnvelope } from 'react-icons/fa'; 
import { 
  ChartLineUp,
  File,
  Wallet,
  Gear,
  DotsThreeVertical 
} from 'phosphor-react';

const SettingsPage = () => {
  const [currentPassword, setCurrentPassword] = useState('EduTech123');
  const [newPassword, setNewPassword] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('EduTech Global Initiative');

  const handleUpdate = () => {
    alert('Settings updated!');
  };

  // Map items with icons
  const menuItems = [
    { name: 'Overview', icon: <ChartLineUp /> },
    { name: 'Request', icon: <FaEnvelope /> },
    { name: 'Wallet', icon: <Wallet /> },
    { name: 'Settings', icon: <Gear /> },
  ];

  return (
    <div className="h-screen bg-[#F6F2F8] flex flex-col">
      {/* Top Navbar-like Div */}
      <div className="w-full bg-white py-3 text-center font-semibold text-white shadow">
        This is a small div at the top of the page.
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r p-4">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-[#7727A4] rounded-full mr-3"></div>
            <div>
              <p className="font-semibold text-gray-800">EduTech Global</p>
              <p className="text-xs text-gray-500">@edutechglobal</p>
            </div>
          </div>

          <nav>
            {menuItems.map((item) => (
              <div 
                key={item.name} 
                className={`
                  flex items-center gap-2 p-2 rounded-md cursor-pointer 
                  ${item.name === 'Settings' ? 'bg-purple-50 text-[#7727A4]' : 'hover:bg-gray-100'}
                `}
              >
                <span className="text-sm">{item.icon}</span>
                {item.name}
                
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-left justify-left p-6">
          <div className="w-full max-w-md bg-trans rounded-lg shadow-sm p-6">
            <h2 className="text-xxl font-semibold text-purple-950 mb-6">Settings</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input 
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border bg-gray-100 rounded-md border-[#E1C0F4]"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose New Password
                </label>
                <input 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border bg-gray-100 rounded-md border-[#E1C0F4]"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input 
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full px-3 py-2 border mb-10 bg-gray-100 rounded-md border-[#E1C0F4]"
                  placeholder="EduTech Global Initiative"
                />
              </div>

              <button 
                onClick={handleUpdate}
                className="w-full bg-[#7727A4] text-white py-2 rounded-md hover:bg-purple-800 transition-colors"
              >
                Update
              </button>
                <div className="fixed bottom-4 left-5 flex items-left bg-white p-2 rounded-lg shadow">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs mr-2">
                  E
                </div>
                <div className="mr-2">
                  <div className="text-sm font-medium">EduTech Global</div>
                  <div className="text-xs text-gray-500">@edutechglobal</div>
                </div>
                <button className="ml-2 text-gray-500">
                  <DotsThreeVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
