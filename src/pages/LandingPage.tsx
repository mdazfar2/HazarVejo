import React from 'react';
import Hero from '../components/landing/Hero';
import Introduction from '../components/landing/Introduction';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import CallToAction from '../components/landing/CallToAction';

const LandingPage = () => {
  return (
    <div className="flex-1">
      <Hero />
      <Introduction />
      
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CallToAction />
    </div>
  );
};

export default LandingPage;