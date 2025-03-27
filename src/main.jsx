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
import Wallet from "./Components/Wallet";
import Settings from "./Components/Settings";
import Settings2 from "./Components/Settings2";
import "./index.css";
import "./Components/Onboarding";
import Onboarding from "./Components/Onboarding";
import FAQSection from "./Pages/Faq";
import ContactSection from "./Pages/Contact";
import Request from "./Pages/Request";
import RequestDetailPage from "./Pages/RequestDetailPage";
import HomePage from "./Pages/HomePage";
import Footer from "./Pages/Footer";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, 
});

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
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
        <Route path="/faq" element={<FAQSection />} />
        <Route path="contact" element={<ContactSection />} />
        <Route path="/request" element={<Request />} />
       <Route path="/RequestDetailPage" element={<RequestDetailPage />} />
        <Route path="/Overview" element={<Overview />} />
        <Route path="/Wallet" element={<Wallet />} />
        <Route path="/Setting" element={<Settings />} />
        <Route path="/Setting2" element={<Settings2 />} />


        

      </Routes>
      <Footer />
    </Router>
    </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
