import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import illustration from "../assets/Educatalystimage.jpg";
import { useAccount, useWriteContract, useSimulateContract } from "wagmi";
import contractABI from "../utils/abi.json";

const Organization = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    websiteLink: '',
    description: '',
    socialMedia: ''
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  
  const contractAddress = "0xB4f57B3993a1B5124Fe912314B41e54BCBd91Cf2"; 
  
  const { address, isConnected } = useAccount();
  
  useEffect(() => {
    const isComplete = 
      formData.name.trim() !== '' && 
      formData.email.trim() !== '' && 
      formData.description.trim() !== '';
    
    setFormComplete(isComplete);
  }, [formData]);

  const validAbi = React.useMemo(() => {
    if (!contractABI) {
      console.error('Contract ABI is undefined');
      return [];
    }

    if (Array.isArray(contractABI)) {
      return contractABI;
    }
    
    if (contractABI.abi && Array.isArray(contractABI.abi)) {
      return contractABI.abi;
    }

    console.error('Could not find valid ABI format. Please check your abi.json file.');
    return [];
  }, []);

  useEffect(() => {
    console.log("Contract ABI structure:", contractABI);
    console.log("Valid ABI determined:", validAbi);
  }, [validAbi]);

  const { data: simulateData, error: simulateError } = useSimulateContract({
    address: contractAddress,
    abi: validAbi,
    functionName: 'registerOrganization',
    args: [
      formData.name || '',
      formData.description || '',
      formData.websiteLink || '',
      formData.socialMedia || ''
    ],
    query: {
      enabled: isConnected && formComplete && validAbi.length > 0
    }
  });
  
  const { writeContract, isPending, isSuccess, error: writeError } = useWriteContract({
    mutation: {
      onSuccess(data) {
        console.log('Organization registered on blockchain:', data);
        navigate('/Overview');
      },
      onError(err) {
        console.error('Transaction error:', err);
        setError(err.message || 'Failed to register organization on blockchain. Please try again.');
        setIsSubmitting(false);
      }
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!isConnected) {
        throw new Error("Please connect your wallet first");
      }
      if (!validAbi || validAbi.length === 0) {
        throw new Error("Invalid ABI configuration. Please check your contract setup.");
      }
      const registerOrgFunc = validAbi.find(item => 
        item.type === 'function' && 
        item.name === 'registerOrganization'
      );

      if (!registerOrgFunc) {
        throw new Error("Contract doesn't have 'registerOrganization' function. Please check your ABI.");
      }

      const contractArgs = [
        formData.name || '',           
        formData.description || '',    
        formData.websiteLink || '',    
        formData.socialMedia || ''    
      ];

      console.log("Submitting contract call with args:", contractArgs);

      if (simulateData?.request) {
        writeContract(simulateData.request);
      } else {
        writeContract({
          address: contractAddress,
          abi: validAbi,
          functionName: 'registerOrganization',
          args: contractArgs
        });
      }
      
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to register organization on blockchain. Please try again.');
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled = isSubmitting || !isConnected || isPending || (!formComplete) || validAbi.length === 0;

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-purple-50 flex justify-center items-center p-10">
        <div className="text-center">
          <div className="mt-4">
             <img src={illustration} alt="Illustration" className="w-80" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center px-16 py-10">
        {/* Back Button */}
        <button onClick={() => navigate("/")} className="text-purple-600 flex items-center gap-2 mb-6">
          <FaArrowLeft className="text-sm" />
          <span>Back</span>
        </button>
        <h2 className="text-2xl font-semibold mb-2">Set Up Your Organization Profile</h2>
        <p className="text-gray-500 mb-6">Kindly fill in the following details</p>

        {/* Wallet Connection Status */}
        {isConnected ? (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              <span className="font-medium">Wallet Connected:</span> {address?.substring(0, 6)}...{address?.substring(address?.length - 4)}
            </p>
          </div>
        ) : (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700">
              <span className="font-medium">Wallet Status:</span> Please connect your wallet from the start page
            </p>
          </div>
        )}

        {/* Debug Info (remove in production) */}
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-700">
            <span className="font-medium">Debug:</span> Form Complete: {formComplete.toString()}, 
            Valid ABI: {(validAbi.length > 0).toString()}, 
            Has simulateData: {(simulateData?.request !== undefined).toString()}, 
            isConnected: {isConnected.toString()}
          </p>
        </div>

        {/* Error Message */}
        {(error || simulateError || writeError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error || simulateError?.message || writeError?.message || 'An error occurred. Please try again.'}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Organization Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="EduTech Global Initiative"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="edutechglobal@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Website Link</label>
            <input
              type="url"
              name="websiteLink"
              value={formData.websiteLink}
              onChange={handleInputChange}
              placeholder="www.edutechglobal.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Social Media</label>
            <input
              type="text"
              name="socialMedia"
              value={formData.socialMedia}
              onChange={handleInputChange}
              placeholder="Twitter: @edutechglobal"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Organization Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="EduTech Global Initiative is a nonprofit organization focused on bridging the educational divide through technology..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>
          </div>

          {/* Proceed Button */}
          <button
            type="submit"
            disabled={isButtonDisabled}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {isSubmitting || isPending ? 'Registering...' : 'Register Organization'}
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-500 mt-2">
            Already have an Account? 
            <span 
              className="text-purple-600 cursor-pointer ml-1" 
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Organization;