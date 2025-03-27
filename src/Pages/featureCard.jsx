// src/Components/TopFeatures.jsx

import React from "react";

const features = [
  {
    title: "Unlock Funding for Your Educational Initiatives",
    description: "Connect with sponsors and fund your projects through our decentralized platform.",
  },
  {
    title: "The Funding Struggle is Real",
    description: "Limited access to funding, lack of transparency, high transaction fees.",
  },
  {
    title: "EduCatalyst: A Decentralized Solution",
    description: "Secure and transparent funding, low transaction fees, community-driven platform.",
  },
];

const TopFeatures = () => {
  return (
    <section className="w-full bg-[#561775] py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopFeatures;
