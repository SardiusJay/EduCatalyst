import React, { useState } from 'react';
import { Wallet, Settings, Grid, Eye } from 'lucide-react';
import { DotsThreeVertical 
} from 'phosphor-react';
import { Link } from 'react-router-dom';


const WalletDashboard = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const projects = [
    {
      name: "Tech Innovators cohort",
      fundingAmount: "10 ETH",
      minimumThreshold: "7 ETH",
      startDate: "Apr 12, 2025",
      endDate: "Apr 20, 2025",
    },
    {
      name: "Hackathon for Sustainability",
      fundingAmount: "20 ETH",
      minimumThreshold: "10 ETH",
      startDate: "May 12, 2025",
      endDate: "May 20, 2025",
    },
    {
      name: "Women in Tech Bootcamp",
      fundingAmount: "25 ETH",
      minimumThreshold: "15 ETH",
      startDate: "Jun 12, 2025",
      endDate: "Jun 20, 2025",
    },
    {
      name: "AI in Education Summit",
      fundingAmount: "100 ETH",
      minimumThreshold: "70 ETH",
      startDate: "Jul 12, 2025",
      endDate: "Jul 20, 2025",
    }
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 border-r">
        <div className="flex items-center mb-8">
          <img src="/api/placeholder/40/40" alt="EduCatalyst" className="w-10 h-10 mr-2" />
          <span className="font-bold text-lg">EduCatalyst</span>
        </div>
        <nav>
          <ul className="space-y-2">
            <li className="flex items-center p-2 hover:bg-purple-50 rounded">
              <Grid className="mr-2 text-black" size={15} />
              <Link to="/Overview" className="text-black">Overview</Link>
            </li>
            <li className="flex items-center p-2 hover:bg-purple-50 rounded">
              <Grid className="mr-2 text-black" size={15} />
              <Link to="/Setting2" className="text-black">Request</Link>
            </li>
            <li className="flex items-center p-2 bg-purple-700 rounded-lg text-white">
              <Wallet className="mr-2 text-white" size={15} />
              <Link to="/Wallet" className="text-white">Wallet</Link>
            </li>
            <li className="flex items-center p-2 hover:bg-purple-50 rounded">
              <Settings className="mr-2 text-black" size={15} />
              <Link to="/Setting" className="text-black">Settings</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl  bg-purple-800text-font-bold mt-10">Wallet</h1>
        
        {/* Connect Wallet Section */}
        <div className="mb-6 flex justify-between items-center">
          <h2>Connect wallet</h2>
          <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Connect Wallet
          </button>
        </div>

        {/* Available Balance */}
        <div className="bg-purple-700 text-white p-6 rounded-lg mb-14 flex justify-between items-center">
          <div>
            <p className="text-xs mb-2">Available Balance</p>
            <h3 className="text-xl font-bold mb-2">
              {isBalanceVisible ? '$140,000.00' : '********'}
            </h3>
            <p className="text-xs mb-2">Payout Balance: {isBalanceVisible ? '$139,980.99' : '********'}</p>
          </div>
          <button onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
            {isBalanceVisible ? <Eye /> : <Eye className="line-through" />}
          </button>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-xl shadow">
          <table className="w-full">
            <thead className="bg-purple-50  rounded-xl text-left">
              <tr>
                <th className="p-4 text-xs">Project Name</th>
                <th className="p-4 text-xs">Funding Amount</th>
                <th className="p-4 text-xs">Minimum <br />Threshold</th>
                <th className="p-4 text-xs">Start Date</th>
                <th className="p-4 text-xs">End Date</th>
                <th className="p-4 text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 text-xs">{project.name}</td>
                  <td className="p-4 text-xs">{project.fundingAmount}</td>
                  <td className="p-4 text-xs">{project.minimumThreshold}</td>
                  <td className="p-4 text-xs">{project.startDate}</td>
                  <td className="p-4 text-xs">{project.endDate}</td>
                  <td className="p-4 text-xs">
                    <button className="text-white bg-purple-700 px-3 py-1 rounded-xl">
                      Withdraw
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center p-4">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border rounded">&lt;</button>
              {[1,2,3,4,5,6].map(page => (
                <button 
                  key={page} 
                  className={`px-3 py-1 rounded ${
                    page === currentPage 
                      ? 'bg-purple-700 text-white' 
                      : 'hover:bg-purple-50'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-1 border rounded">&gt;</button>
            </div>
          </div>
        </div>

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
  );
};

export default WalletDashboard;