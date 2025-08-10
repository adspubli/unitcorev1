import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MessageCircle, Bell } from 'lucide-react';
import MobileNavbarProfile from './MobileNavbarProfile';

interface NavbarProfileProps {
  avatarUrl: string;
}


const NavbarProfile: React.FC<NavbarProfileProps> = ({ avatarUrl }) => {
  const navigate = useNavigate();
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };
  return (
    <>
      {/* Top Navigation - Figma Design */}
      <nav className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side - Logo */}
            <div className="flex items-center">
              <a
                href="#"
                onClick={handleLogoClick}
                className="text-2xl font-bold text-[#0A0A0A] tracking-tight cursor-pointer"
              >
                UnitCore
              </a>
            </div>

            {/* Center - Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#9CA3AF]" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar servicios..."
                  className="block w-full pl-10 pr-3 py-2 border border-[#E5E7EB] rounded-full bg-[#F9FAFB] text-sm placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Right Side - Navigation Icons */}
            <div className="flex items-center space-x-6">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/dashboard" className="p-2 group text-[#4A4A4A] hover:text-[#059669] transition-colors duration-200 rounded-lg">
                  <svg viewBox="0 0 84 89.6" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <g fill="currentColor">
                      <path d="M23.6,48.7h-9.7c-7.6,0-13.9,6.2-13.9,13.9v9.7c0,7.6,6.2,13.9,13.9,13.9h9.7c7.6,0,13.9-6.2,13.9-13.9v-9.7C37.5,54.9,31.3,48.7,23.6,48.7z M32.7,72.2c0,5-4.1,9.1-9.1,9.1h-9.7c-5,0-9.1-4.1-9.1-9.1v-9.7c0-5,4.1-9.1,9.1-9.1h9.7c5,0,9.1,4.1,9.1,9.1V72.2z"/>
                      <g><path d="M23.6,3.3h-9.7C6.3,3.3,0.1,9.5,0.1,17.1v9.7c0,7.6,6.2,13.9,13.9,13.9h9.7c7.6,0,13.9-6.2,13.9-13.9v-9.7C37.5,9.5,31.3,3.3,23.6,3.3z M32.7,26.8c0,5-4.1,9.1-9.1,9.1h-9.7c-5,0-9.1-4.1-9.1-9.1v-9.7c0-5,4.1-9.1,9.1-9.1h9.7c5,0,9.1,4.1,9.1,9.1V26.8z"/></g>
                      <g><path d="M70.2,48.7h-9.7c-7.6,0-13.9,6.2-13.9,13.9v9.7c0,7.6,6.2,13.9,13.9,13.9h9.7c7.6,0,13.9-6.2,13.9-13.9v-9.7C84,55,77.8,48.7,70.2,48.7z M79.2,72.3c0,5-4.1,9.1-9.1,9.1h-9.7c-5,0-9.1-4.1-9.1-9.1v-9.7c0-5,4.1-9.1,9.1-9.1h9.7c5,0,9.1,4.1,9.1,9.1V72.3z"/><g><path d="M70.2,3.3h-9.7c-7.6,0-13.9,6.2-13.9,13.9v9.7c0,7.6,6.2,13.9,13.9,13.9h9.7c7.6,0,13.9-6.2,13.9-13.9v-9.7C84,9.6,77.8,3.3,70.2,3.3z M79.2,26.9c0,5-4.1,9.1-9.1,9.1h-9.7c-5,0-9.1-4.1-9.1-9.1v-9.7c0-5,4.1-9.1,9.1-9.1h9.7c5,0,9.1,4.1,9.1,9.1V26.9z"/></g></g>
                    </g>
                  </svg>
                  <span className="sr-only">Inicio</span>
                </Link>
                <Link to="/explore" className="p-2 text-[#4A4A4A] hover:text-[#059669] transition-colors duration-200 rounded-lg">
                  <Search className="w-6 h-6" />
                  <span className="sr-only">Explorar</span>
                </Link>
                <button className="p-2 text-[#4A4A4A] hover:text-[#059669] transition-colors duration-200 rounded-lg">
                  <MessageCircle className="w-6 h-6" />
                  <span className="sr-only">Mensajes</span>
                </button>
                <button className="p-2 text-[#4A4A4A] hover:text-[#059669] transition-colors duration-200 rounded-lg relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#EF4444] rounded-full"></span>
                  <span className="sr-only">Notificaciones</span>
                </button>
              </div>

              {/* Botón Compartir */}
              <button
                className="hidden md:flex items-center px-5 py-2 rounded-full font-semibold bg-[#FB3C67] text-white hover:bg-[#e02d5c] transition-colors duration-200 shadow"
                onClick={() => navigate('/create-group')}
                style={{
                  fontSize: '1rem',
                  whiteSpace: 'nowrap',
                }}
              >
                Compartir
              </button>

              {/* Profile Avatar - Active State */}
              <Link to="/profile" className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-[#059669] p-0.5">
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#10B981] rounded-full border-2 border-white"></div>
                <span className="sr-only">Inicio</span>
              </Link>
            </div>
          </div>
        </div>

  {/* Modal Compartir eliminado, el botón ahora navega directo a /create-group */}

        {/* Mobile Bottom Navigation */}
        <MobileNavbarProfile />
      </nav>
    </>
  );
};

export default NavbarProfile;
