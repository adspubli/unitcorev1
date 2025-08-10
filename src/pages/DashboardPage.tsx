
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import NavbarProfile from '../components/NavbarProfile';

import { useState } from 'react';

const DashboardPage = () => {
  // Avatar por defecto para NavbarProfile
  const avatarUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face';

  const [showActionModal, setShowActionModal] = useState(false);
  const navigate = useNavigate();

  const handleAction = (action: 'compartir' | 'suscribir') => {
    setShowActionModal(false);
    if (action === 'compartir') {
      navigate('/create-group');
    } else {
      navigate('/explore');
    }
  };

  return (

    <div className="min-h-screen bg-[#F7F9F8]">
      {/* Menú de navegación reutilizable */}
      <NavbarProfile avatarUrl={avatarUrl} />

  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0A0A0A] mb-2">Suscripción</h1>
        </div>

        {/* Splitit+ Banner */}
        <div className="bg-gradient-to-r from-[#059669] to-[#10B981] rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Splitit+</h2>
                <p className="text-lg opacity-90 mb-4">Todo Splitit sin coste alguno, y mucho más...</p>
              </div>
              <div className="hidden md:block">
                <div className="relative flex items-center justify-center">
                  {/* Círculo animado tipo radar */}
                  <span className="absolute w-24 h-24 rounded-full bg-white bg-opacity-20 animate-ping"></span>
                  <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center relative">
                    <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-white text-[#059669] px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors duration-200">
              Descubre Splitit+
            </button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        </div>

        {/* Add Subscription Section */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowActionModal(true)}
            className="bg-white bg-opacity-80 rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-8 md:p-12 text-center transition-all duration-300 cursor-pointer group hover:border-black max-w-md w-full"
          >
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-white group-hover:border group-hover:border-black">
              <Plus className="w-8 h-8 text-[#9CA3AF] group-hover:text-black transition-all duration-300" />
            </div>
            <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">Agregar una suscripción</h3>
          </button>
        </div>

        {/* Modal de acción */}
        {showActionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative flex flex-col items-center animate-fade-in">
              <button
                onClick={() => setShowActionModal(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-2xl hover:bg-gray-800 transition-colors duration-200"
                aria-label="Cerrar"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-8 text-center">¿Qué quieres hacer ?</h2>
              <div className="flex gap-6 mb-6">
                <button
                  onClick={() => handleAction('compartir')}
                  className="px-8 py-2 rounded-full border-2 border-[#00CDD0] text-[#00CDD0] font-semibold text-lg hover:bg-[#00CDD0] hover:text-white transition-colors duration-200"
                >
                  Compartir
                </button>
                <button
                  onClick={() => handleAction('suscribir')}
                  className="px-8 py-2 rounded-full border-2 border-[#00CDD0] text-[#00CDD0] font-semibold text-lg hover:bg-[#00CDD0] hover:text-white transition-colors duration-200"
                >
                  Suscribir
                </button>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 text-center w-full">
                <div className="mb-2 text-[#FF6B9D] font-bold">¡ Fácil !</div>
                <div className="mb-2 font-semibold">Compartir :</div>
                <div className="mb-4 text-sm">Soy el/la propietario(a) de una suscripción y quiero compartirla.</div>
                <div className="mb-2 font-semibold">Suscribir :</div>
                <div className="text-sm">Quiero suscribirme a una suscripción.</div>
              </div>
            </div>
          </div>
        )}
      </div>

  {/* Action Modal eliminado, ahora el popup está en NavbarProfile */}
    </div>
  );
};

export default DashboardPage;