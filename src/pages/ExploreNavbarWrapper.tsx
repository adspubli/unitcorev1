import React from 'react';
import NavbarProfile from '../components/NavbarProfile';

interface ExploreNavbarWrapperProps {
  avatarUrl: string;
  children: React.ReactNode;
}

const ExploreNavbarWrapper: React.FC<ExploreNavbarWrapperProps> = ({ avatarUrl, children }) => (
  <div className="min-h-screen bg-[#F7F9F8]">
    <NavbarProfile avatarUrl={avatarUrl} />
    {children}
  </div>
);

export default ExploreNavbarWrapper;
