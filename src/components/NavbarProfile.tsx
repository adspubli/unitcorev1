import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, MessageCircle, Bell } from 'lucide-react';
import MobileNavbarProfile from './MobileNavbarProfile';

interface NavbarProfileProps {
  avatarUrl: string;
}


const NavbarProfile: React.FC<NavbarProfileProps> = ({ avatarUrl }) => {
  const [showActionModal, setShowActionModal] = useState(false);
  return (
    <>
      {/* Top Navigation - Figma Design */}
      <nav className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side - Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-[#0A0A0A] tracking-tight">
                Splitit
              </Link>
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
                <Link to="/dashboard" className="p-2 text-[#4A4A4A] hover:text-[#059669] transition-colors duration-200 rounded-lg">
                  <Home className="w-6 h-6" />
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
                onClick={() => setShowActionModal(true)}
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

        {/* Modal Compartir */}
        {showActionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full relative mx-4">
              <button
                onClick={() => setShowActionModal(false)}
                className="absolute top-3 right-3 md:top-4 md:right-4 p-2 text-[#9CA3AF] hover:text-[#4A4A4A] transition-colors duration-200 rounded-lg"
              >
                <span style={{fontSize: 20, fontWeight: 'bold'}}>×</span>
              </button>
              <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#0A0A0A] mb-4">¿Qué quieres hacer?</h2>
              </div>
              <div className="space-y-4">
                <Link
                  to="/create-group"
                  onClick={() => setShowActionModal(false)}
                  className="block w-full p-4 border-2 border-[#E5E7EB] rounded-xl hover:border-[#059669] transition-colors duration-200 group"
                >
                  <div className="text-center">
                    <h3 className="font-semibold text-[#0A0A0A] mb-2 group-hover:text-[#059669] text-base md:text-lg">Compartir</h3>
                    <p className="text-xs md:text-sm text-[#4A4A4A]">
                      Soy el/la propietario(a) de una suscripción y quiero compartirla.
                    </p>
                  </div>
                </Link>
                <Link
                  to="/explore"
                  onClick={() => setShowActionModal(false)}
                  className="block w-full p-4 border-2 border-[#E5E7EB] rounded-xl hover:border-[#059669] transition-colors duration-200 group"
                >
                  <div className="text-center">
                    <h3 className="font-semibold text-[#0A0A0A] mb-2 group-hover:text-[#059669] text-base md:text-lg">Suscribir</h3>
                    <p className="text-xs md:text-sm text-[#4A4A4A]">
                      Quiero suscribirme a una suscripción.
                    </p>
                  </div>
                </Link>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xs md:text-sm text-[#FF6B9D] font-medium">¡Fácil!</p>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        <MobileNavbarProfile />
      </nav>
    </>
  );
};

export default NavbarProfile;
