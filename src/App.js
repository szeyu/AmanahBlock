import React from 'react';
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

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/donate" element={<DonationPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/audit-trail" element={<AuditTrail />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/zakat-calculator" element={<ZakatCalculatorPage />} />
          <Route path="/governance" element={<GovernancePage />} />
          <Route path="/impact" element={<ImpactExplorerPage />} />
          <Route path="/islamic-defi" element={<IslamicDefiPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/project-funding" element={<ProjectFundingPage />} />
          <Route path="/emergency-fund" element={<EmergencyFundPage />} />
          <Route path="/beneficiary-feedback" element={<BeneficiaryFeedbackPage />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
