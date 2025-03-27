import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Layout from "../Components/Layout";
const EnhancedDashboard = () => {
  // Sample data for the chart
  const chartData = [
    { month: 'Jan', value: 20000 },
    { month: 'Feb', value: 25000 },
    { month: 'Mar', value: 30000 },
    { month: 'Apr', value: 35000 },
    { month: 'May', value: 40000 },
    { month: 'Jun', value: 38000 },
    { month: 'Jul', value: 42000 },
    { month: 'Aug', value: 45000 },
    { month: 'Sep', value: 43000 },
    { month: 'Oct', value: 40000 },
    { month: 'Nov', value: 38000 },
    { month: 'Dec', value: 37000 }
  ];

  // Sample data for the projects
  const projects = [
    {
      name: 'Tech Innovations cohort',
      tradingAmount: '10 ETH',
      minimumThreshold: '7 ETH',
      startDate: 'Apr 12, 2025',
      endDate: 'Apr 20, 2025',
      status: 'Pending approval'
    },
    {
      name: 'Hackathon for Sustainability',
      tradingAmount: '20 ETH',
      minimumThreshold: '10 ETH',
      startDate: 'May 12, 2025',
      endDate: 'May 20, 2025',
      status: 'Completely funded'
    }
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Layout>
    <div className="flex h-screen bg-gray-100">
       {/* Sidebar - hidden on mobile unless toggled */}
    {/* //   <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block md:w-64 bg-white border-r fixed md:relative z-10 h-full`}>
    //     <div className="p-4 border-b">
    //       <div className="flex items-center">
    //         <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
    //           E
    //         </div>
    //         <span className="ml-2 font-semibold text-gray-800">EduCatalyst</span>
    //       </div>
    //     </div>
    //     <div className="py-4">
    //       <div className="bg-purple-600 text-white px-4 py-3 flex items-center">
    //         <span className="mr-3">📊</span>
    //         <span>Overview</span>
    //       </div>
    //       <div className="px-4 py-3 hover:bg-gray-100 flex items-center">
    //         <span className="mr-3">📝</span>
    //         <span>Request</span>
    //       </div>
    //       <div className="px-4 py-3 hover:bg-gray-100 flex items-center">
    //         <span className="mr-3">💼</span>
    //         <span>Wallet</span>
    //       </div>
    //       <div className="px-4 py-3 hover:bg-gray-100 flex items-center">
    //         <span className="mr-3">⚙️</span>
    //         <span>Settings</span>
    //       </div>
    //     </div>
    //   </div> */}
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        

        <div className="p-4 md:p-6">
          <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
          
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm text-gray-500 mb-1">All Requests</h3>
              <p className="text-2xl font-semibold">5000</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm text-gray-500 mb-1">Completed Requests</h3>
              <p className="text-2xl font-semibold">3000</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm text-gray-500 mb-1">Pending</h3>
              <p className="text-2xl font-semibold">1000</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm text-gray-500 mb-1">Pending Request</h3>
              <p className="text-2xl font-semibold">1000</p>
            </div>
          </div>
          
          {/* Chart Section */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Requests Charts</h2>
              <select className="border rounded px-2 py-1 text-sm">
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.8} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Projects Table */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trading Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Minimum Threshold</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded bg-blue-100 flex items-center justify-center text-blue-500">
                          E
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{project.name}</div>
                          {index === 0 && <div className="text-xs text-gray-500">@eduinnovation</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{project.tradingAmount}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{project.minimumThreshold}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{project.startDate}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{project.endDate}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        project.status === 'Pending approval' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-purple-700'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <p className="text-purple-700 hover:text-gray-500">
                        view more
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default EnhancedDashboard;