import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import ServicesSection from '../components/ServicesSection';
import { supabase } from '../lib/supabase';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/dashboard');
      }
    };
    checkSession();
  }, [navigate]);

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
