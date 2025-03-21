import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword1 = () => {
   const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle reset password logic here
    console.log("Reset password attempt with:", email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold align-left mb-2">Reset Password</h2>
        <p className="text-gray-600 mb-6">Kindly input your registered Email Address</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="relative">
                <input
                id="EmailAddress"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 pt-6 pb-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 peer"
                placeholder=" "
                />
                <label 
                htmlFor="EmailAddress"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                Email Address
                </label>
            </div>
            </div>
            
          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-3 rounded-md hover:bg-purple-900 transition duration-200 mb-4" onClick={() => navigate("/ForgetPassword2.jsx")}
          >
            Send OTP
          </button>
          
          <div className="text-center">
            <a href="#" className="text-purple-700 text-sm hover:underline">Resend OTP</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword1;