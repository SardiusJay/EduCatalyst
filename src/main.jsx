import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home1";
import Organization from "./Pages/Organization";
import Sponsors from "./Pages/Sponsors";
import Login from "./Pages/Login";
import WelcomeBack from "./Pages/WelcomeBack";
import ForgetPassword from "./Components/ForgetPassword";
import ForgetPassword2 from "./Components/ForgetPassword2";
import ForgetPassword3 from "./Components/ForgetPassword3";
import Overview from "./Components/Overview";
import HomePage from "./Pages/HomePage";
import Footer from "./Pages/Footer";
import "./index.css";
import "./Components/Onboarding";
import Onboarding from "./Components/Onboarding";
import FAQSection from "./Pages/Faq";
import ContactSection from "./Pages/Contact";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
      
        <Route path="/" element={<HomePage />} />
        
        <Route path="/organization" element={<Organization />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/WelcomeBack" element={<WelcomeBack />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/ForgetPassword2" element={<ForgetPassword2 />} />
        <Route path="/ForgetPassword3" element={<ForgetPassword3 />} />
        <Route path="/Overview" element={<Overview />} />
        <Route path="/faq" element={<FAQSection />} />
        <Route path="/contact" element={<ContactSection />} />
        

      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);
