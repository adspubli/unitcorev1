

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { fetchActiveGroups, NormalizedGroup } from '../lib/groups';
import { Plus } from 'lucide-react';
import NavbarProfile from '../components/NavbarProfile';
import { useNavigate } from 'react-router-dom';


const DashboardPage = () => {
  // Avatar por defecto para NavbarProfile
  const avatarUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face';

  const [showActionModal, setShowActionModal] = useState(false);
  const [activeGroups, setActiveGroups] = useState<NormalizedGroup[]>([]); // Todos los grupos activos normalizados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setError(null);
      // Obtener usuario actual
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setError('No se pudo obtener el usuario actual.');
        setLoading(false);
        return;
      }
  const groups = await fetchActiveGroups();
  setActiveGroups(groups);
  // memberGroups eliminado (no se usa)
      setLoading(false);
    };
    fetchGroups();
  }, []);

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
          <h1 className="text-3xl font-bold text-[#0A0A0A] mb-2">Suscripciones activas disponibles</h1>
        </div>

        {/* Cuadro bonito original arriba */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-[#059669] to-[#10B981] rounded-2xl p-8 text-white relative overflow-hidden mb-8">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">UnitCore+</h2>
                  <p className="text-lg opacity-90 mb-4">Todo UnitCore sin coste alguno, y mucho más...</p>
                </div>
                <div className="hidden md:block">
                  <div className="relative flex items-center justify-center">
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
                Descubre UnitCore+
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
          </div>
          {/* Grid tipo lego para botón y suscripciones activas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Botón agregar suscripción siempre primero */}
            <div className="w-full max-w-none flex flex-col justify-center items-center h-full">
              <button
                onClick={() => setShowActionModal(true)}
                className="bg-white bg-opacity-80 rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-8 md:p-12 text-center transition-all duration-300 cursor-pointer group hover:border-black w-full max-w-none flex flex-col justify-center items-center h-full"
                style={{ minHeight: '100%' }}
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-white group-hover:border group-hover:border-black">
                  <Plus className="w-8 h-8 text-[#9CA3AF] group-hover:text-black transition-all duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">Agregar una suscripción</h3>
              </button>
            </div>
            {/* Suscripciones activas, todas, máximo 2 por línea */}
            {loading ? (
              <div className="col-span-2 text-center text-gray-500">Cargando suscripciones...</div>
            ) : error ? (
              <div className="col-span-2 text-center text-red-500">{error}</div>
            ) : (
              <>
                {activeGroups.length === 0 ? (
                  <div className="col-span-2 text-center text-gray-500">No hay suscripciones activas disponibles.</div>
                ) : (
                  activeGroups.map((group) => (
                    <div key={group.id} className="bg-white bg-opacity-80 rounded-2xl shadow-sm border-2 border-gray-300 p-8 md:p-12 text-center w-full max-w-none flex flex-col justify-center items-center">
                      <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Plus className="w-8 h-8 text-cyan-600" />
                      </div>
                      <div className="font-bold text-lg text-[#059669] mb-1">{group.title}</div>
                      <div className="text-xs text-gray-500 mb-2">{group.description}</div>
                      <div className="text-sm text-gray-700">Plazas libres: {group.available}/{group.total}</div>
                      <div className="text-sm text-gray-700">Precio: {group.price_per_user.toFixed(2)}€</div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
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