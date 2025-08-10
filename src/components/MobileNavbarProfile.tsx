import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, MessageCircle, User, Plus } from 'lucide-react';

const MobileNavbarProfile: React.FC = () => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] z-50">
    <div className="grid grid-cols-5 h-16">
      <Link to="/dashboard" className="flex flex-col items-center justify-center text-[#9CA3AF] hover:text-[#059669] transition-colors duration-200">
        <Home className="w-6 h-6" />
        <span className="text-xs mt-1">Inicio</span>
      </Link>
      <Link to="/explore" className="flex flex-col items-center justify-center text-[#9CA3AF] hover:text-[#059669] transition-colors duration-200">
        <Search className="w-6 h-6" />
        <span className="text-xs mt-1">Buscar</span>
      </Link>
      <Link to="/create-group" className="flex flex-col items-center justify-center transition-colors duration-200">
        <div className="w-10 h-10 bg-[#FB3C67] rounded-full flex items-center justify-center mb-1">
          <Plus className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs text-[#FB3C67] font-semibold">Crear</span>
      </Link>
      <button className="flex flex-col items-center justify-center text-[#9CA3AF] hover:text-[#059669] transition-colors duration-200 relative">
        <MessageCircle className="w-6 h-6" />
        <span className="text-xs mt-1">Mensajes</span>
      </button>
      <Link to="/profile" className="flex flex-col items-center justify-center text-[#059669] transition-colors duration-200">
        <User className="w-6 h-6" />
        <span className="text-xs mt-1">Perfil</span>
      </Link>
    </div>
  </div>
);

export default MobileNavbarProfile;
