import React from 'react';
import { useNavigate } from 'react-router-dom';

const RequestCard = ({ request }) => {
  const navigate = useNavigate();

  const statusColor = {
    'Pending approval': 'bg-yellow-100 text-yellow-800',
    'Completely funded': 'bg-purple-100 text-purple-800',
    'Currently funding': 'bg-green-100 text-green-800',
    'Declined': 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white p-5 rounded shadow border border-purple-100 flex flex-col justify-between h-full">
      <div>
        <h2 className="font-bold text-purple-900 text-lg mb-2">{request.name}</h2>
        <p className="text-sm text-gray-700 mb-3 line-clamp-3">{request.details}</p>

        <div className="text-sm text-gray-600 mb-2 space-y-1">
          <p><strong>Goal:</strong> {request.goalAmount} ETH</p>
          <p><strong>Threshold:</strong> {request.threshold} ETH</p>
          <p><strong>Start:</strong> {request.startDate} <strong>End:</strong> {request.endDate}</p>
          <p><strong>Deadline:</strong> {request.deadline}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[request.status]}`}>
          {request.status}
        </span>
        <button
          className="text-sm text-purple-700 underline"
          onClick={() => navigate(`/requests/${request.id}`, { state: request })}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
