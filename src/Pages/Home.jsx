import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-purple-50 flex justify-center items-center p-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-700">EduCatalyst</h1>
          <div className="mt-4">
            <img
              src="/educatalyst-illustration.png"
              alt="Illustration"
              className="w-80"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold">Let's get to know you</h2>
        <p className="text-gray-500 mt-2">Which best describes you?</p>

        <div className="flex gap-4 mt-6">
          <button
            className={`p-4 border rounded-lg w-40 ${
              selected === "organization"
                ? "border-purple-600 bg-purple-100"
                : "border-gray-300"
            }`}
            onClick={() => setSelected("organization")}
          >
            Organization
          </button>

          <button
            className={`p-4 border rounded-lg w-40 ${
              selected === "sponsors"
                ? "border-purple-600 bg-purple-100"
                : "border-gray-300"
            }`}
            onClick={() => setSelected("sponsors")}
          >
            Sponsors
          </button>
        </div>

        <button
          className={`mt-6 px-6 py-2 text-white font-bold rounded-lg ${
            selected ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300"
          }`}
          disabled={!selected}
          onClick={() => navigate(`/${selected}`)}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Home;
