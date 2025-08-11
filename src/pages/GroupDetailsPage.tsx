import MobileNavbarProfile from '../components/MobileNavbarProfile';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  ArrowLeft,
  Grid3X3,
  Search,
  MessageCircle,
  Plus,
  ExternalLink,
  HelpCircle,
  Zap,
  Menu, // Para el icono de menú hamburguesa
  X // Para el icono de cerrar menú
} from 'lucide-react';

// Definición de la interfaz para profileData
interface ProfileData {
  name: string;
  avatar: string;
}

// Componente de navegación móvil/escritorio (barra superior)
// Este componente maneja la barra de navegación superior, adaptándose a pantallas móviles y de escritorio.
const AppNavigation = ({ profileData }: { profileData: ProfileData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo de la aplicación */}
          <Link to="/" className="text-3xl font-extrabold text-[#131313] tracking-tight">
            UnitCore
          </Link>

          {/* Iconos de Navegación y Botón CTA - Visible solo en escritorio (md:flex) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="p-2 text-gray-600 hover:text-[#00CDD0] transition-colors duration-200">
              <Grid3X3 className="w-6 h-6" />
              <span className="sr-only">Inicio</span>
            </Link>
            <Link to="/explore" className="p-2 text-[#00CDD0] transition-colors duration-200">
              <Search className="w-6 h-6" />
              <span className="sr-only">Explorar</span>
            </Link>
            <button className="p-2 text-gray-600 hover:text-[#00CDD0] transition-colors duration-200">
              <MessageCircle className="w-6 h-6" />
              <span className="sr-only">Mensajes</span>
            </button>

            {/* Botón CTA para compartir suscripción */}
            <Link
              to="/create-group"
              className="bg-[#00CDD0] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#00B0B3] transition-all duration-200 transform hover:scale-[1.02] flex items-center shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Compartir una suscripción
            </Link>

            {/* Avatar de Perfil */}
            <Link to="/profile" className="relative">
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-[#00CDD0] shadow-md"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#00D08C] rounded-full border-2 border-white"></div>
            </Link>
          </div>

          {/* Botón de menú hamburguesa - Visible solo en móvil (md:hidden) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-[#00CDD0] transition-colors duration-200"
            >
              {/* Cambia el icono entre hamburguesa y X según el estado del menú */}
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              <span className="sr-only">Abrir menú</span>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil (drawer lateral) - Visible solo cuando isMobileMenuOpen es true y en móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"> {/* Overlay oscuro */}
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 transform transition-transform duration-300 ease-in-out">
            {/* Botón para cerrar el menú móvil */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-[#00CDD0] transition-colors duration-200"
              >
                <X className="w-7 h-7" />
                <span className="sr-only">Cerrar menú</span>
              </button>
            </div>
            {/* Elementos del menú móvil */}
            <div className="flex flex-col space-y-4">
              <Link
                to="/dashboard"
                className="flex items-center text-lg font-medium text-[#131313] hover:text-[#00CDD0] transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)} // Cierra el menú al hacer clic
              >
                <Grid3X3 className="w-5 h-5 mr-3" /> Inicio
              </Link>
              <Link
                to="/explore"
                className="flex items-center text-lg font-medium text-[#00CDD0] transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Search className="w-5 h-5 mr-3" /> Explorar
              </Link>
              <button
                className="flex items-center text-lg font-medium text-[#131313] hover:text-[#00CDD0] transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageCircle className="w-5 h-5 mr-3" /> Mensajes
              </button>
              <Link
                to="/create-group"
                className="flex items-center bg-[#00CDD0] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#00B0B3] transition-all duration-200 shadow-lg mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Plus className="w-4 h-4 mr-2" /> Compartir una suscripción
              </Link>
              <Link
                to="/profile"
                className="flex items-center text-lg font-medium text-[#131313] hover:text-[#00CDD0] transition-colors duration-200 mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#00CDD0] mr-3"
                />
                Mi Perfil
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};




const GroupDetailsPage = () => {
  const { id, slug } = useParams();
  const [serviceGroups, setServiceGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<{ name: string; avatar: string }>({ name: '', avatar: '' });
  // ...eliminado showJoinModal, no se usa...
  const [serviceInfo, setServiceInfo] = useState<{ name: string; description?: string; icon?: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Obtener datos del usuario actual
      const { data: user } = await supabase.auth.getUser();
      if (user && user.user) {
        // Obtener perfil
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, avatar')
          .eq('id', user.user.id)
          .single();
        if (profile) setProfileData(profile);
      }

      // Si hay id, buscar el grupo y luego todas las suscripciones activas de ese servicio
      if (id) {
        // Buscar grupo por id
        const { data: group, error: groupError } = await supabase
          .from('subscription_groups')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (groupError) {
          console.error('[GroupDetails] Error obteniendo grupo:', groupError.message);
        }
        if (group) {
          // Buscar info del servicio
          const { data: service, error: serviceErr } = await supabase
            .from('services')
            .select('*')
            .eq('id', group.service_id)
            .maybeSingle();
          if (serviceErr) {
            console.error('[GroupDetails] Error obteniendo servicio:', serviceErr.message);
          }
            if (service) {
              setServiceInfo({ name: service.name, description: service.description, icon: (service as any).icon });
              // Buscar todos los grupos activos de ese servicio
              const { data: groups, error: groupsErr } = await supabase
                .from('subscription_groups')
                .select('*')
                .eq('service_id', service.id)
                .eq('status', 'active');
              if (groupsErr) console.error('[GroupDetails] Error obteniendo grupos del servicio:', groupsErr.message);
              setServiceGroups(groups || []);
            } else {
              setServiceGroups([]);
            }
        } else {
          setServiceGroups([]);
        }
      } else if (slug) {
        // Buscar servicio por slug
        const { data: service, error: serviceBySlugErr } = await supabase
          .from('services')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        if (serviceBySlugErr) console.error('[GroupDetails] Error buscando servicio por slug:', serviceBySlugErr.message);
        if (service) {
          setServiceInfo({ name: service.name, description: service.description, icon: (service as any).icon });
          // Buscar todos los grupos activos de ese servicio
          const { data: groups, error: groupsErr } = await supabase
            .from('subscription_groups')
            .select('*')
            .eq('service_id', service.id)
            .eq('status', 'active');
          if (groupsErr) console.error('[GroupDetails] Error obteniendo grupos del servicio (slug):', groupsErr.message);
          setServiceGroups(groups || []);
        } else {
          setServiceGroups([]);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [id, slug]);

  return (
    <div className="min-h-screen bg-white font-inter text-[#131313] overflow-x-hidden">
      <AppNavigation profileData={profileData} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        <div className="flex items-center mb-10">
          <Link
            to="/explore"
            className="p-2 text-gray-600 hover:text-[#00CDD0] transition-colors duration-200 mr-4"
          >
            <ArrowLeft className="w-7 h-7" />
          </Link>
          <h1 className="text-4xl font-extrabold text-[#131313]">{serviceInfo?.name || 'Servicio'}</h1>
          <div className="ml-auto flex items-center space-x-5">
            <button className="p-2 text-gray-600 hover:text-[#00CDD0] transition-colors duration-200">
              <ExternalLink className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-[#00CDD0] transition-colors duration-200">
              <HelpCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda - Info general del servicio */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[10px] p-[20px] border border-[#EDF1F4] shadow-[0_5px_30px_rgba(43,59,93,0.08)] mb-[15px]">
              <div className="text-center mb-7">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-[10px] flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <span className="text-white text-4xl">🍿</span>
                </div>
                <h2 className="text-2xl font-bold text-[#131313] mb-3">{serviceInfo?.name || 'Servicio'}</h2>
                <p className="text-gray-700 text-base leading-relaxed">
                  {serviceInfo?.description || 'Sin descripción.'}
                </p>
              </div>
            </div>
          </div>
          {/* Columna Derecha - Lista de suscripciones activas de ese servicio */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {loading ? (
                <div className="text-center text-gray-500">Cargando suscripciones...</div>
              ) : serviceGroups.length === 0 ? (
                <div className="text-center text-gray-500">No hay suscripciones activas para este servicio.</div>
              ) : (
                serviceGroups.map((group) => (
                  <div
                    key={group.id}
                    className="bg-white rounded-[10px] p-4 border border-[#EDF1F4] flex items-center justify-between shadow-sm md:shadow-[0_5px_30px_rgba(43,59,93,0.08)] mb-2 w-full"
                  >
                    <div className="flex items-center">
                      <div className="relative mr-3">
                        <img
                          src={group.profiles?.avatar || profileData.avatar}
                          alt={group.profiles?.name || profileData.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#EDF1F4] shadow-md"
                        />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white text-xs">👑</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[#131313] font-semibold text-base">{group.profiles?.name || 'Propietario'}</h3>
                        <p className="text-gray-700 text-sm">
                          está compartiendo {group.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-right">
                        <div className="text-[#131313] font-extrabold text-lg flex items-center justify-end">
                          <Zap className="w-4 h-4 text-[#00CDD0] mr-1" />
                          {(group.price_per_user ?? group.price_per_slot ?? group.price)?.toFixed(2)}€
                        </div>
                        <div className="text-gray-700 text-xs">/mes</div>
                      </div>
                      <button
                        className="bg-[#00CDD0] text-white px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-[#00B0B3] transition-colors duration-200 shadow-lg mt-2"
                      >
                        Únete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <MobileNavbarProfile />
    </div>
  );
};

export default GroupDetailsPage;
