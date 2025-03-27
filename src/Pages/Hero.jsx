import React from "react";
import Safari from "../assets/safari.png"; 
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-[#F6F2F8] w-full">
      {/* Header Section */}
      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Decentralized Funding for Education
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Connect with sponsors and fund your educational initiatives
          </p>
          <button onClick={() => navigate("/onboarding")}className="bg-purple-800 text-white py-3 px-6 rounded-lg hover:bg-purple-600">
            Get Started 
          </button>
        </div>
      </section>

      {/* Main Section */}
      <section className="w-full py-16 bg-[#F6F2F8]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-purple-800 mb-4">
            Revolutionizing Educational Funding
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Empowering educators and organizations through decentralized funding solutions.
          </p>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={Safari}
              alt="EduCatalyst Wallet"
              className="w-full max-w-4xl shadow-lg rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
