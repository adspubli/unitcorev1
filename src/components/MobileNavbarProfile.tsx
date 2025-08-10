import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Home, Search, MessageCircle, User, Plus } from 'lucide-react';
import ShareActionModal from './ShareActionModal';


const MobileNavbarProfile: React.FC = () => {
  const [showActionModal, setShowActionModal] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) setIsLogged(!!session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setIsLogged(!!session);
    });
    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLogged) navigate('/dashboard');
    else navigate('/');
  };
  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] z-50">
        <div className="grid grid-cols-5 h-20">
          <a
            href={isLogged ? "/dashboard" : "/"}
            onClick={handleHomeClick}
            className="flex flex-col items-center justify-center text-[#9CA3AF] hover:text-[#059669] transition-colors duration-200 cursor-pointer"
          >
            <Home className="w-7 h-7" />
            <span className="text-xs mt-1">Inicio</span>
          </a>
          <Link to="/explore" className="flex flex-col items-center justify-center text-[#9CA3AF] hover:text-[#059669] transition-colors duration-200">
            <Search className="w-7 h-7" />
            <span className="text-xs mt-1">Buscar</span>
          </Link>
          <button
            className="flex flex-col items-center justify-center transition-colors duration-200 focus:outline-none"
            onClick={() => setShowActionModal(true)}
            aria-label="Compartir"
          >
            <div className="w-16 h-16 bg-[#FB3C67] rounded-full flex items-center justify-center mb-1 shadow-lg">
              <Plus className="w-10 h-10 text-white stroke-2" />
            </div>
            <span className="text-xs text-[#FB3C67] font-semibold">Crear</span>
          </button>
          <button className="flex flex-col items-center justify-center text-[#9CA3AF] hover:text-[#059669] transition-colors duration-200 relative">
            <MessageCircle className="w-7 h-7" />
            <span className="text-xs mt-1">Mensajes</span>
          </button>
          <Link to="/profile" className="flex flex-col items-center justify-center text-[#059669] transition-colors duration-200">
            <User className="w-7 h-7" />
            <span className="text-xs mt-1">Perfil</span>
          </Link>
        </div>
      </div>
      <ShareActionModal open={showActionModal} onClose={() => setShowActionModal(false)} />
    </>
  );
};

export default MobileNavbarProfile;
