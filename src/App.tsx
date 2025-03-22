import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CampaignCreator from './pages/CampaignCreator';
import AuthLayout from './pages/auth/AuthLayout';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { AnalyticsProvider } from './context/AnalyticsContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnalyticsProvider>
      <Router>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create" element={<CampaignCreator />} />
                <Route path="/auth" element={<AuthLayout />}>
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>
              <Footer />
            </div>
          )}
        </AnimatePresence>
      </Router>
    </AnalyticsProvider>
  );
}

export default App;