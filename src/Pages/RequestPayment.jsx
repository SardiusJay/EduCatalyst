import React from 'react';

const RequestPayment = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-24 bg-white shadow-lg flex flex-col items-center py-6 space-y-8">
        <div className="flex flex-col items-center">
          <div className="bg-purple-700 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">E</div>
          <span className="text-xs mt-1 font-semibold">EduCatalyst</span>
        </div>
        
        <div className="flex flex-col space-y-8 flex-grow">
          <button className="bg-purple-700 text-white px-3 py-2 rounded-lg text-xs w-20 text-center">
            Request
          </button>
          
          <button className="text-gray-500 flex flex-col items-center text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Settings
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center text-purple-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center text-red-500 mr-2">A</div>
            <span className="text-purple-700">Abioye John</span>
          </div>
        </div>
        
        {/* Project Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl">
          <div className="mb-8">
            <h3 className="text-sm text-gray-500 mb-1">Project Name</h3>
            <h2 className="text-lg font-medium">Tech Innovators cohort</h2>
          </div>
          
          <div className="mb-8">
            <h3 className="text-sm text-gray-500 mb-1">Project Description</h3>
            <p className="text-sm text-gray-800">
              The Tech Innovators Cohort 2025 is a 12-week intensive program designed to equip young individuals from underserved communities with the skills and knowledge to thrive in the tech industry. This cohort will focus on coding, entrepreneurship, and digital literacy, culminating in a final pitch event where participants will present their innovative tech solutions. The program will provide mentorship, hands-on projects, and job placement assistance to help students kickstart their careers in technology.
            </p>
          </div>
          
          <div className="grid grid-cols-5 gap-4 mb-8">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Funding Amount</h3>
              <p className="text-sm font-medium">10 ETH</p>
            </div>
            
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Minimum Threshold</h3>
              <p className="text-sm font-medium">7 ETH</p>
            </div>
            
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Start Date</h3>
              <p className="text-sm font-medium">Apr, 12 2025</p>
            </div>
            
            <div>
              <h3 className="text-sm text-gray-500 mb-1">End Date</h3>
              <p className="text-sm font-medium">Apr, 20 2025</p>
            </div>
            
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Funding Deadline</h3>
              <p className="text-sm font-medium">Apr, 10 2025</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-500 mb-2">Funding Status</h3>
            <div className="bg-purple-100 rounded-full h-2 w-full">
              <div className="bg-purple-500 h-2 rounded-full w-[70%]"></div>
            </div>
            <p className="text-sm text-purple-700 font-medium mt-1">70%</p>
          </div>
          
          <button className="bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-medium">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestPayment;