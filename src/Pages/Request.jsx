// src/pages/RequestPage.jsx
import React, { useState } from "react";
import AddRequestModal from "../Pages/AddRequestModal";
import Layout from "../Components/Layout";
import { useNavigate } from "react-router-dom";

const statusColors = {
  "Pending approval": "bg-yellow-100 text-yellow-700",
  "Completely funded": "bg-purple-100 text-purple-700",
  "Currently funding": "bg-green-100 text-green-700",
  Declined: "bg-red-100 text-red-700",
};

const RequestPage = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Tech Innovators cohort",
      goalAmount: "10 ETH",
      threshold: "7 ETH",
      startDate: "Apr 12, 2025",
      endDate: "Apr 20, 2025",
      status: "Pending approval",
    },
    {
      id: 2,
      name: "Hackathon for Sustainability",
      goalAmount: "20 ETH",
      threshold: "10 ETH",
      startDate: "May 12, 2025",
      endDate: "May 20, 2025",
      status: "Completely funded",
    },
    {
      id: 3,
      name: "Women in Tech Bootcamp",
      goalAmount: "25 ETH",
      threshold: "15 ETH",
      startDate: "Jun 12, 2025",
      endDate: "Jun 20, 2025",
      status: "Currently funding",
    },
    {
      id: 4,
      name: "AI in Education Summit",
      goalAmount: "100 ETH",
      threshold: "70 ETH",
      startDate: "Jul 12, 2025",
      endDate: "Jul 20, 2025",
      status: "Declined",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout>
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-purple-800">Requests</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition"
        >
          Add New Request
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-purple-50 text-purple-900 text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-3">Project Name</th>
              <th className="px-6 py-3">Funding Amount</th>
              <th className="px-6 py-3">Minimum Threshold</th>
              <th className="px-6 py-3">Start Date</th>
              <th className="px-6 py-3">End Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3"> </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{req.name}</td>
                <td className="px-6 py-4">{req.goalAmount}</td>
                <td className="px-6 py-4">{req.threshold}</td>
                <td className="px-6 py-4">{req.startDate}</td>
                <td className="px-6 py-4">{req.endDate}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      statusColors[req.status]
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => navigate(`/requests/${req.id}`)}
                    className="text-purple-700  text-sm"
                  > View more</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {[1, 2, 3, 4, 5, 6].map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded border ${
              page === 3
                ? "bg-purple-700 text-white border-purple-700"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {showModal && (
        <AddRequestModal
          onClose={() => setShowModal(false)}
          onSubmit={(data) => {
            setRequests([...requests, { ...data, id: Date.now() }]);
            setShowModal(false);
          }}
        />
      )}
    </div>
    </Layout>
  );
};

export default RequestPage;
