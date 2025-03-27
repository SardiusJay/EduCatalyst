import React from "react";
import Safari from "../assets/safari.png"; 
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-[#E1C0F4] w-full">
      {/* Header Section */}
      <section className="w-full bg-[#E1C0F4] py-16" style={{ background: "url('grid-pattern.png') center/cover, #F6F2F8" }}>
        <div className="max-w-7xl mt-5 mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#8453a0] mb-4">
            Decentralized Funding for Education
          </h1>
          <p className="text-lg md:text-3xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Connect with sponsors and fund your educational initiatives
          </p>
          <button 
            onClick={() => navigate("/onboarding")}
            className="bg-[#8E4EC6] text-white py-3 px-8 rounded-full hover:bg-[#7D3EB3] transition-colors duration-300"
          >
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
