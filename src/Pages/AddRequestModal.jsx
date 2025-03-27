import React, { useState } from 'react';

const AddRequestModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    details: '',
    goalAmount: '',
    threshold: '',
    deadline: '',
    amount: '',
    startDate: '',
    endDate: '',
    milestones: '',
    sponsorBenefits: '',
    status: 'Pending approval',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl space-y-3 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold text-purple-800">Add New Funding Request</h2>
        
        <input name="name" placeholder="Funding Name" className="input w-full" onChange={handleChange} />
        <textarea name="details" placeholder="Event/Cohort Description" className="input w-full" rows={3} onChange={handleChange} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="goalAmount" type="number" placeholder="Funding Goal (ETH)" className="input" onChange={handleChange} />
          <input name="threshold" type="number" placeholder="Minimum Threshold (ETH)" className="input" onChange={handleChange} />
          <input name="amount" type="number" placeholder="Requested Amount (ETH)" className="input" onChange={handleChange} />
          <input name="deadline" type="date" placeholder="Funding Deadline" className="input" onChange={handleChange} />
          <input name="startDate" type="date" className="input" onChange={handleChange} />
          <input name="endDate" type="date" className="input" onChange={handleChange} />
        </div>

        <textarea name="milestones" placeholder="Milestone Schedule for Fund Releases" className="input w-full" rows={3} onChange={handleChange} />
        <textarea name="sponsorBenefits" placeholder="Benefits Offered to Sponsors" className="input w-full" rows={3} onChange={handleChange} />

        <div className="mt-4 flex justify-end gap-2">
          <button className="px-4 py-2 text-gray-500" onClick={onClose}>Cancel</button>
          <button className="bg-purple-800 text-white px-4 py-2 rounded" onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default AddRequestModal;
