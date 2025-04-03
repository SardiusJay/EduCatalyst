import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios"; 
import illustration from "../assets/Educatalystimage.jpg";

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setApiError(null);

    if (validateForm()) {
      setIsLoading(true);

      try {
        const { confirmPassword, ...submissionData } = formData;

        const response = await axios.post('http://127.0.0.1:8000//api/auth/register/', submissionData);

        console.log('Registration successful', response.data);
        
        navigate("/WelcomeBack");
      } catch (error) {
    
        console.error('Registration error:', error);
  
        if (error.response?.data?.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError('Registration failed. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
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
        <button 
          onClick={() => navigate(-1)} 
          className="text-purple-600 flex items-center gap-2 mb-6"
        >
          <FaArrowLeft className="text-sm" />
          <span>Back</span>
        </button>

        <h2 className="text-2xl font-semibold mb-2">Set Up Login Credentials</h2>
        <p className="text-gray-500 mb-6">Kindly fill in the following details</p>

        {/* Global API Error */}
        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {apiError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="edutechglobal@gmail.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-purple-500'}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Create Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${errors.password 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-purple-500'}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${errors.confirmPassword 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-purple-500'}`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Proceed Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;