import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarProfile from '../components/NavbarProfile';
import MobileNavbarProfile from '../components/MobileNavbarProfile';

const CreateGroupPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleteList] = useState(false);
  const [activeCategory, setActiveCategory] = useState('SVOD');

  // ...existing code for state...

  // Servicios sugeridos y por categoría (estructura limpia)
  const suggestedServices = [
    { id: 'netflix', name: 'Netflix', icon: '🍿', color: 'bg-red-600' },
    { id: 'animebox', name: 'AnimeBox', icon: '🎌', color: 'bg-blue-400' },
    { id: 'prime-video', name: 'Amazon Prime Video', icon: '🍿', color: 'bg-blue-500' },
    { id: 'movistar-plus', name: 'Movistar Plus+', icon: '📺', color: 'bg-blue-600' },
    { id: 'flixole', name: 'FlixOlé', icon: '🎬', color: 'bg-yellow-600' },
    { id: 'youku', name: 'Youku', icon: '📺', color: 'bg-blue-400' },
    { id: 'wetv', name: 'WeTV', icon: '📺', color: 'bg-green-500' },
    { id: 'disney-extra', name: 'Disney+ (extra member)', icon: '🍿', color: 'bg-blue-600' },
    { id: 'hallow', name: 'Hallow', icon: '🙏', color: 'bg-purple-500' },
    { id: 'mediaset-infinity', name: 'Mediaset Infinity', icon: '📺', color: 'bg-red-500' }
  ];

  const allServicesByCategory = {
    'SVOD': suggestedServices,
    'Música': [
      { id: 'spotify', name: 'Spotify', icon: '🎵', color: 'bg-green-500' },
      { id: 'apple-music', name: 'Apple Music', icon: '🎵', color: 'bg-gray-800' },
      { id: 'youtube-music', name: 'YouTube Music', icon: '🎵', color: 'bg-red-500' },
      { id: 'amazon-music', name: 'Amazon Music', icon: '🎵', color: 'bg-blue-500' },
      { id: 'tidal', name: 'Tidal', icon: '🎵', color: 'bg-black' },
      { id: 'deezer', name: 'Deezer', icon: '🎵', color: 'bg-orange-500' }
    ],
    // ...otras categorías igual que antes...
  };

  const getCurrentServices = () => {
    if (!showCompleteList) {
      return suggestedServices;
    }
    
    const categoryServices = allServicesByCategory[activeCategory as keyof typeof allServicesByCategory] || [];
    
    if (searchTerm) {
      return categoryServices.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return categoryServices;
  };

  const filteredServices = getCurrentServices();


  const avatarUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face';
  return (
    <div className="min-h-screen bg-[#F7F9F8]">
      {/* Menú de navegación reutilizable */}
      <NavbarProfile avatarUrl={avatarUrl} />
      <MobileNavbarProfile />

      {/* Contenido principal restaurado */}
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-extrabold mb-8 text-[#222] text-center tracking-tight">Elige la suscripción para compartir</h1>

        {/* Buscador y categorías mejorados */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar servicios..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full max-w-lg px-6 py-3 border-2 border-[#E5E7EB] rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#059669] text-lg"
          />
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {Object.keys(allServicesByCategory).map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${activeCategory === category ? 'bg-[#059669] text-white border-[#059669] shadow' : 'bg-white text-[#059669] border-[#059669] hover:bg-[#F0FDF4]'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de servicios filtrados con tarjetas mejoradas */}
        <div className="mb-10">
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Link
                  key={service.id}
                  to={`/create-group/configure?service=${service.id}`}
                  className="flex flex-col items-center p-7 bg-white rounded-2xl border-2 border-[#E5E7EB] hover:border-[#059669] transition-all duration-200 group shadow-sm hover:shadow-lg cursor-pointer"
                  style={{ minHeight: 180 }}
                >
                  <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                    <span className="text-white text-2xl">{service.icon}</span>
                  </div>
                  <span className="font-semibold text-[#222] group-hover:text-[#059669] text-center text-base">
                    {service.name}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#9CA3AF] text-lg">No se encontraron servicios</p>
              <p className="text-[#9CA3AF] text-sm mt-2">Intenta con otro término de búsqueda</p>
            </div>
          )}
        </div>

        {/* Opción para crear compartición personalizada */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">¿No ves tu servicio?</h3>
          <Link
            to="/create-group/custom"
            className="inline-block text-[#059669] font-semibold px-8 py-3 border-2 border-[#059669] rounded-full hover:bg-[#059669] hover:text-white transition-all duration-200 text-lg shadow-sm"
          >
            Crear una compartición personalizada
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPage;