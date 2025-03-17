import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CampaignCreator from './pages/CampaignCreator';
import Footer from './components/Footer';
import { AnalyticsProvider } from './context/AnalyticsContext';

function App() {
  return (
    <AnalyticsProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<CampaignCreator />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AnalyticsProvider>
  );
}

export default App;