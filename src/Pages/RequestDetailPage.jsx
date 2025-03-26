import React from 'react';
import { useLocation } from 'react-router-dom';

const RequestDetailPage = () => {
  const { state } = useLocation();
  const request = state;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-purple-800 mb-2">{request.name}</h1>
      <p className="mb-4 text-gray-700">{request.details}</p>

      <div className="text-sm text-gray-600 space-y-1">
        <p>Funding Amount: <strong>{request.amount} ETH</strong></p>
        <p>Minimum Threshold: <strong>{request.threshold} ETH</strong></p>
        <p>Start Date: <strong>{request.startDate}</strong></p>
        <p>End Date: <strong>{request.endDate}</strong></p>
        <p>Status: <strong>{request.status}</strong></p>
      </div>
    </div>
  );
};

export default RequestDetailPage;
