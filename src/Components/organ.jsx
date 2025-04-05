import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAccount, useContract, useProvider, useSigner } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import illustration from "../assets/Educatalystimage.jpg";
import { create } from 'ipfs-http-client';
import OrganizationABI from "../utils/abi.json";
const CONTRACT_ADDRESS = "0x123..."; 


const projectId = 'INFURA_PROJECT_ID';
const projectSecret = 'INFURA_PROJECT_SECRET';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
});

const Organization = () => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
  const [logoHash, setLogoHash] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    websiteLink: '',
    description: ''
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: OrganizationABI.abi,
    signerOrProvider: signer || provider,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0] || null;
    setLogo(file);
    
    if (file) {
      try {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
          setLogoHash("File ready for upload");
        };
      } catch (err) {
        console.error("Error preparing file:", err);
        setError("Failed to prepare logo. Please try again.");
      }
    }
  };

  const uploadToIPFS = async (file) => {
    try {
      const buffer = await file.arrayBuffer();
      const added = await ipfs.add(buffer);
      return added.path; 
    } catch (error) {
      console.error("Error uploading to IPFS: ", error);
      throw new Error("Failed to upload to IPFS");
    }
  };

  const saveOrgDataLocally = (orgAddress, data) => {
    const orgs = JSON.parse(localStorage.getItem('organizations') || '{}');
    orgs[orgAddress] = data;
    localStorage.setItem('organizations', JSON.stringify(orgs));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      setError("Please connect your wallet first");
      return;
    }
    
    setError(null);
    setIsSubmitting(true);

    try {
    
      let ipfsHash = "";
      if (logo) {
        ipfsHash = await uploadToIPFS(logo);
        console.log("Logo uploaded to IPFS with hash:", ipfsHash);
      }


      const tx = await contract.registerOrganization(
        formData.name,
        formData.description,
        formData.websiteLink,
        formData.email 
      );
      
     
      await tx.wait();
      
     
      if (ipfsHash && address) {
        
        saveOrgDataLocally(address, {
          ...formData,
          logoIpfsHash: ipfsHash,
          walletAddress: address
        });
        
        console.log('Organization data with logo hash saved locally');
      }
      
      console.log('Organization profile created on blockchain');
      navigate('/Overview');
    } catch (err) {
      setError(
        err.data?.message || err.message || 
        'Failed to submit organization profile to blockchain. Please try again.'
      );
      console.error('Blockchain submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <label className="block text-gray-700 font-medium">Organization Logo</label>
            <div className="flex items-center gap-4">
              <div className="border border-gray-300 w-full p-3 rounded-lg text-gray-500 bg-gray-100">
                {logo ? logo.name : "Upload your Logo"}
              </div>
              <label className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg cursor-pointer">
                Upload
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".png,.jpg,.jpeg"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-1">PNG format - Max. 5MB</p>
            {logoHash && (
              <p className="text-sm text-green-600 mt-1">Logo ready for upload to IPFS</p>
            )}
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