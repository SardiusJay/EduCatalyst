import React from "react";
import { Link } from "react-router-dom";

const Sponsors = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Sponsors Page</h1>
      <p className="text-gray-500 mt-2">Welcome to the Sponsors section.</p>
      <Link to="/" className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg">
        Go Back
      </Link>
    </div>
  );
};

export default Sponsors;
