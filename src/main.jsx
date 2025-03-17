import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Organization from "./Pages/Organization";
import Sponsors from "./Pages/Sponsors";
import Login from "./Pages/Login";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/Login" element={<Login />} />

      </Routes>
    </Router>
  </React.StrictMode>
);
