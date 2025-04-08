import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAccount, useContract, useProvider, useSigner } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import illustration from "../assets/Educatalystimage.jpg";
import OrganizationABI from "../utils/abi.json";

const CONTRACT_ADDRESS = "0xB4f57B3993a1B5124Fe912314B41e54BCBd91Cf2"; 

const Organization = () => {
  // const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   websiteLink: '',
  //   description: ''
  // });
  // const [error, setError] = useState(null);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  
  // const { address, isConnected } = useAccount();
  // const provider = useProvider();
  // const { data: signer } = useSigner();
  
  // const contract = useContract({
  //   address: CONTRACT_ADDRESS,
  //   abi: OrganizationABI.abi,
  //   signerOrProvider: signer || provider,
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  // const saveOrgDataLocally = (orgAddress, data) => {
  //   try {
  //     const orgs = JSON.parse(localStorage.getItem('organizations') || '{}');
  //     orgs[orgAddress] = data;
  //     localStorage.setItem('organizations', JSON.stringify(orgs));
  //   } catch (error) {
  //     console.error("Error saving to localStorage:", error);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (!isConnected) {
  //     setError("Please connect your wallet first");
  //     return;
  //   }
    
  //   setError(null);
  //   setIsSubmitting(true);

  //   try {
  //     // Check if contract is available
  //     if (!contract) {
  //       throw new Error("Smart contract not initialized. Please refresh and try again.");
  //     }
    
  //     // Call the contract method with proper error handling
  //     const tx = await contract.registerOrganization(
  //       formData.name,
  //       formData.description,
  //       formData.websiteLink,
  //       formData.email 
  //     );
      
  //     // Wait for transaction to complete
  //     await tx.wait();
      
  //     // Save data locally if everything worked
  //     if (address) {
  //       saveOrgDataLocally(address, {
  //         ...formData,
  //         walletAddress: address
  //       });
        
  //       console.log('Organization data saved locally');
  //     }
      
  //     console.log('Organization profile created on blockchain');
  //     navigate('/Overview');
  //   } catch (err) {
  //     // Enhanced error handling
  //     let errorMessage = 'Failed to submit organization profile. Please try again.';
      
  //     if (err.code === 'ACTION_REJECTED') {
  //       errorMessage = 'Transaction was rejected. Please confirm the transaction in your wallet.';
  //     } else if (err.data?.message) {
  //       errorMessage = err.data.message;
  //     } else if (err.message) {
  //       errorMessage = err.message;
  //     }
      
  //     setError(errorMessage);
  //     console.error('Submission error:', err);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

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
        <div className="mb-4 flex justify-between items-center">
          <h2>Connect wallet</h2>
          <div className="custom-connect-button">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button 
                            onClick={openConnectModal} 
                            className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
                          >
                            Connect Wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button 
                            onClick={openChainModal} 
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Wrong Network
                          </button>
                        );
                      }

                      return (
                        <div className="flex items-center">
                          <button
                            onClick={openAccountModal}
                            className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
                          >
                            {account.displayName}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
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
            disabled={isSubmitting || !isConnected}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting to Blockchain...' : 'Register Organization'}
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