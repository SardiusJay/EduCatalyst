import React from 'react';

const SettingsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md rounded-lg mr-6">
        <div className="p-4">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full mr-3 bg-purple-500 flex items-center justify-center text-white font-bold">
              EC
            </div>
            <span className="font-semibold text-lg">EduCatalyst</span>
          </div>
          
          <nav>
            {[
              { icon: '📊', label: 'Overview' },
              { icon: '📝', label: 'Request' },
              { icon: '💳', label: 'Wallet' },
              { icon: '⚙️', label: 'Settings', active: true }
            ].map((item) => (
              <div 
                key={item.label} 
                className={`flex items-center p-3 rounded-lg mb-2 cursor-pointer ${
                  item.active 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
<div className="flex-grow">
  <div className="bg-white shadow-md rounded-lg p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

    {/* Split content into two columns */}
    <div className="grid grid-cols-2 gap-10">
      {/* Left side with logo and button */}
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full flex items-center justify-center mb-4">
          <span className="text-white text-4xl">EG</span>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          Change Picture
        </button>
      </div>

      {/* Right side with organization info */}
      <div>
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label className="block text-gray-600 mb-2">Organization Name</label>
            <input
              type="text"
              value="EduTech Global Initiative"
              className="w-full p-3 border rounded-lg bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Organization Email Address</label>
            <input
              type="email"
              value="edutechglobal@gmail.com"
              className="w-full p-3 border rounded-lg bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Organization Website</label>
            <input
              type="text"
              value="www.edutechglobal.com"
              className="w-full p-3 border rounded-lg bg-gray-50"
              readOnly
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Organization Description</label>
          <textarea
            className="w-full p-3 border rounded-lg bg-gray-50 h-32"
            value="EduTech Global Initiative is a nonprofit organization focused on bridging the educational divide through technology. Our mission is to empower students in underserved regions by providing access to tech-driven learning resources and skills development programs."
            readOnly
          />
        </div>

        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          Change Password
        </button>
      </div>
    </div>
  </div>
</div>
</div>

  );
};

export default SettingsPage;