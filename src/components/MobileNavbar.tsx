import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Grid3X3, 
  Search, 
  MessageCircle, 
  Plus,
  User,
  Home,
  Compass
} from 'lucide-react';

interface MobileNavbarProps {
  profileData: {
    name: string;
    avatar: string;
  };
  onCreateGroup: () => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ profileData, onCreateGroup }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Inicio',
      icon: Home,
      path: '/dashboard',
      color: 'text-[#059669]'
    },
    {
      id: 'explore',
      label: 'Explorar',
      icon: Compass,
      path: '/explore',
      color: 'text-[#4A4A4A]'
    },
    {
      id: 'messages',
      label: 'Mensajes',
      icon: MessageCircle,
      path: '/messages',
      color: 'text-[#4A4A4A]'
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: User,
      path: '/profile',
      color: 'text-[#4A4A4A]'
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Navigation Bar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-[#0A0A0A] tracking-tight">
              Unitcore
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/dashboard" className="p-2 text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors duration-200">
                <Grid3X3 className="w-6 h-6" />
                <span className="sr-only">Inicio</span>
              </Link>
              <Link to="/explore" className="p-2 text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors duration-200">
                <Search className="w-6 h-6" />
                <span className="sr-only">Explorar</span>
              </Link>
              <button className="p-2 text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors duration-200">
                <MessageCircle className="w-6 h-6" />
                <span className="sr-only">Mensajes</span>
              </button>
              
              {/* CTA Button - Desktop */}
              <button 
                onClick={onCreateGroup}
                className="bg-[#FF6B9D] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#FF5A8A] transition-all duration-200 transform hover:scale-[1.02] flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Compartir
              </button>

              {/* Profile Avatar - Desktop */}
              <Link to="/profile" className="relative">
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#E5E7EB]"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#10B981] rounded-full border-2 border-white"></div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Mobile CTA Button */}
              <button
                onClick={onCreateGroup}
                className="bg-[#FF6B9D] text-white p-2 rounded-full hover:bg-[#FF5A8A] transition-all duration-200 transform hover:scale-[1.05] shadow-lg"
                aria-label="Compartir suscripción"
              >
                <Plus className="w-5 h-5" />
              </button>

              {/* Hamburger Menu Button */}
              <button
                onClick={toggleMenu}
                className="p-2 text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-opacity-50 rounded-lg"
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu Drawer */}
        <div className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#E5E7EB]"
              />
              <div>
                <p className="font-semibold text-[#0A0A0A] text-sm">{profileData.name}</p>
                <p className="text-xs text-[#4A4A4A]">Usuario activo</p>
              </div>
            </div>
            <button
              onClick={closeMenu}
              className="p-2 text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors duration-200 rounded-lg"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="py-4">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={closeMenu}
                  className="flex items-center px-6 py-4 text-[#4A4A4A] hover:bg-gray-50 hover:text-[#059669] transition-all duration-200 active:bg-gray-100"
                >
                  <IconComponent className={`w-5 h-5 mr-4 ${item.color}`} />
                  <span className="font-medium text-base">{item.label}</span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="border-t border-gray-100 my-4"></div>

            {/* CTA Button in Menu */}
            <div className="px-6 py-2">
              <button
                onClick={() => {
                  onCreateGroup();
                  closeMenu();
                }}
                className="w-full bg-[#FF6B9D] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#FF5A8A] transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Compartir una suscripción
              </button>
            </div>
          </div>

          {/* Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-[#9CA3AF] text-center">
              Unitcore v1.0 - Comparte y ahorra
            </p>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="grid grid-cols-4 h-16">
          {navigationItems.slice(0, 4).map((item) => {
            const IconComponent = item.icon;
            const isActive = window.location.pathname === item.path;
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                  isActive 
                    ? 'text-[#059669] bg-[#059669] bg-opacity-5' 
                    : 'text-[#9CA3AF] hover:text-[#4A4A4A] active:bg-gray-100'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom padding for content when bottom nav is present */}
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default MobileNavbar;