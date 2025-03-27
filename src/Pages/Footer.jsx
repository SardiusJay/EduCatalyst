// src/components/Footer.jsx
import React from "react";
import { Linkedin, Instagram, X } from "lucide-react";
import vector from "../assets/Vector1.png";

const Footer = () => {
  return (
    <footer className="bg-[#36035E] text-white px-20 py-16">
      <div className="flex flex-col items-center gap-6">
        <img src={vector} alt="EduCatalyst Logo" className="h-10" />
        <h2 className="text-xl font-semibold">EduCatalyst</h2>

        <div className="flex gap-6">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Linkedin size={20} />
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer">
            <X size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Instagram size={20} />
          </a>
        </div>

        <p className="text-sm text-white/70">
          Copyright © 2025 • EduCatalyst LTD
        </p>
      </div>
    </footer>
  );
};

export default Footer;
