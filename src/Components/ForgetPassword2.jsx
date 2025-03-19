import React, { useState, useRef } from "react";

const ResetPassword = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
    const otpCode = otpValues.join("");
    console.log("Submitting OTP:", otpCode);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2">Reset Password</h2>
        <p className="text-gray-600 mb-6">Kindly input your registered Email Address</p>
        
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6">
            {otpValues.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ))}
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded-md hover:bg-purple-900 transition duration-200 mb-4"
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

export default ResetPassword;