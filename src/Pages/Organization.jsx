import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import illustration from "../assets/Educatalystimage.jpg";
import Home from "./Home1";

const Organization = () => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
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

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Organization Name</label>
            <input
              type="text"
              placeholder="EduTech Global Initiative"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="edutechglobal@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Website Link</label>
            <input
              type="url"
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
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-1">PNG format - Max. 5MB</p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Organization Description</label>
            <textarea
              rows="3"
              placeholder="EduTech Global Initiative is a nonprofit organization focused on bridging the educational divide through technology..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {/* Proceed Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Proceed
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-500 mt-2">
      Already have an Account? 
      <span 
        className="text-purple-600 cursor-pointer" 
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
