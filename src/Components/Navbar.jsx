import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; 
import vector from "../assets/vector.png"; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Button component definition
const Button = ({ variant, children, className, ...props }) => {
    const baseClass = "px-6 py-2 rounded-full transition duration-300"; // Rounded button with smooth transition
    const variants = {
      primary: "bg-purple-800 text-white hover:bg-transparent hover:border-purple-800 hover:text-purple-800", // Hover to Login style
      outline: "border border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white", // Hover to Get Started style
    };

    
  
    return (
      <button
        className={`${baseClass} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const Navigate = useNavigate();

  return (
    <header className="w-full bg-[#F6F2F8] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <img src={vector} alt="EduCatalyst Logo" className="h-8 w-auto" />
          {/* <span className="text-xl font-semibold text-purple-800">EduCatalyst</span> */}
        </div>

        <nav className="hidden md:flex gap-6 text-purple-800 font-medium text-sm">
          <Link to="/about" className="hover:text-purple-600">About</Link>
          <Link to="/faq" className="hover:text-purple-600">FAQs</Link>
          <Link to="/contact" className="hover:text-purple-600">Contact us</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="primary" className="text-sm" onClick={()=> Navigate("/onboarding")}>Get Started</Button>
          <Button variant="outline" className="text-sm"onClick={()=> Navigate("/login")}>Login</Button>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 bg-[#F6F2F8]">
          <a href="#about" className="block text-purple-800 hover:text-purple-600">About</a>
          <a href="#faq" className="block text-purple-800 hover:text-purple-600">FAQs</a>
          <a href="#contact" className="block text-purple-800 hover:text-purple-600">Contact us</a>
          <Button variant="primary" className="w-full text-sm">Get Started</Button>
          <Button variant="outline" className="w-full text-sm">Login</Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
