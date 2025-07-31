import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import ServicesSection from '../components/ServicesSection';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <VideoSection />
      <ServicesSection />
    </>
  );
};

export default LandingPage;