import React, { useState } from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './styles/theme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DonationPage from './pages/DonationPage';
import AuditTrail from './pages/AuditTrail';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ProjectsPage from './pages/ProjectsPage';
import LearnPage from './pages/LearnPage';
import ZakatCalculatorPage from './pages/ZakatCalculatorPage';
import GovernancePage from './pages/GovernancePage';
import ImpactExplorerPage from './pages/ImpactExplorerPage';
import IslamicDefiPage from './pages/IslamicDefiPage';
import ProjectFundingPage from './pages/ProjectFundingPage';
import EmergencyFundPage from './pages/EmergencyFundPage';
import BeneficiaryFeedbackPage from './pages/BeneficiaryFeedbackPage';
import DonationFlowPage from './pages/DonationFlowPage';
import AdminPage from "./pages/AdminPage";
import ScrollToTop from './ScrollToTop';
import { Web3Provider } from './context/Web3Context';
import MergedProjectsPage from './pages/MergedProjectsPage';
import NFTReceiptPage from './pages/NFTReceiptPage';

function App() {
  const [showProject, setShowProject] = useState(false);
  const [userDonate, setUserDonate] = useState(false);
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Web3Provider>
        <Router>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard userDonate={userDonate}/>} />
            <Route path="/donate" element={<DonationPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/audit-trail" element={<AuditTrail />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/governance" element={<GovernancePage />} />
            <Route path="/impact" element={<ImpactExplorerPage />} />
            <Route path="/islamic-defi" element={<IslamicDefiPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/project-funding" element={<ProjectFundingPage />} />
            <Route path="/emergency-fund" element={<EmergencyFundPage />} />
            <Route path="/beneficiary-feedback" element={<BeneficiaryFeedbackPage />} />
            <Route path="/donation-flow/:transactionId" element={<DonationFlowPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/projects-all" element={<MergedProjectsPage />} />
            <Route path="/nftreceipt" element={<NFTReceiptPage userDonate={userDonate} setUserDonate={setUserDonate}/>} />
          </Routes>
          <Footer />
        </Router>
      </Web3Provider>
    </ChakraProvider>
  );
}

export default App;
