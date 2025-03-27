import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import illustration from "../assets/Educatalystimage.jpg";

const SponsorSignup = () => {
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
        <button onClick={() => navigate(-1)} className="text-purple-600 flex items-center gap-2 mb-6">
          <FaArrowLeft className="text-sm" />
          <span>Back</span>
        </button>

        <h2 className="text-2xl font-semibold mb-2">Welcome Back </h2>
        <p className="text-gray-500 mb-6">Kindly fill in the following details  </p>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="edutechglobal@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="Password"
              placeholder=""
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <p className="text-right text-gray-500 mt-2">
      <span 
        className="text-purple-600 cursor-pointer" 
        onClick={() => navigate("/ForgetPassword3")}
      >
        Forgot Password?
      </span>
    </p>


          {/* Proceed Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Register
          </button>

          <p className="text-center text-gray-500 mt-2">
          New here?
      <span 
        className="text-purple-600 cursor-pointer" 
        onClick={() => navigate("/Organization")}
      >
        Sign Up Now
      </span>
    </p>
        </form>
      </div>
    </div>
  );
};

export default SponsorSignup;
