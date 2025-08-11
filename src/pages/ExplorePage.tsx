import { useState, useEffect } from 'react';
import { fetchActiveGroups, NormalizedGroup } from '../lib/groups';
import { Link } from 'react-router-dom';
import ExploreNavbarWrapper from './ExploreNavbarWrapper';
import { Search } from 'lucide-react';

const ExplorePage = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const profileData = {
    name: 'Yonathan Montilla',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  };

  const categories = [
    'Todos', 'SVOD', 'Música', 'Seguridad', 'Videojuegos',
    'Software', 'Lectura', 'Nube', 'Bienestar', 'Educación'
  ];

  // Estado para grupos reales
  const [groups, setGroups] = useState<NormalizedGroup[]>([]);
  // loading state simplificado (podríamos añadir skeleton si se requiere)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const run = async () => {
  setLoading(true);
      const data = await fetchActiveGroups();
      setGroups(data);
  setLoading(false);
    };
    run();
  }, []);

  const getServiceIcon = (service: string) => {
    const icons: { [key: string]: string } = {
      'YouTube Premium': '🍿',
      'Disney+': '🍿',
      'HBO Max': '🍿',
      'Crunchyroll': '🍿',
      'Spotify': '🎵',
      'Apple One': '🎵',
      'Apple Music': '🎵'
    };
    return icons[service] || '📱';
  };

  const getServiceColor = (service: string) => {
    const colors: { [key: string]: string } = {
      'YouTube Premium': 'bg-red-500',
      'Disney+': 'bg-blue-600',
      'HBO Max': 'bg-purple-600',
      'Crunchyroll': 'bg-orange-500',
      'Spotify': 'bg-green-500',
      'Apple One': 'bg-gray-800',
      'Apple Music': 'bg-gray-800'
    };
    return colors[service] || 'bg-gray-500';
  };

  // Mostrar solo una tarjeta por plataforma/servicio único
  const uniqueServices = new Map();
  groups.forEach(group => {
    const key = group.title || 'Otro';
    if (!uniqueServices.has(key)) uniqueServices.set(key, group);
  });
  const filteredServices = Array.from(uniqueServices.values()).filter(group =>
    (group.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (group.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <ExploreNavbarWrapper avatarUrl={profileData.avatar}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#131313] opacity-70" />
          </div>
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 bg-white border border-[#EDF1F4] rounded-[10px] text-[#131313] placeholder-[#131313] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00CDD0] focus:border-transparent transition-all duration-200 shadow-lg"
          />
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shadow-sm ${
                activeCategory === category
                  ? 'bg-[#00CDD0] text-white'
                  : 'bg-white text-[#131313] text-opacity-80 hover:bg-gray-50 border border-[#EDF1F4]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Catálogo de plataformas/servicios únicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading && <div className="col-span-4 text-center text-gray-500">Cargando...</div>}
          {filteredServices.map(group => {
            const slug = group.title ? group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
            return (
              <Link
                key={group.id}
                to={slug ? `/group/${slug}/${group.id}` : `/group/${group.id}`}
                className={`bg-white rounded-[10px] p-0 overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-xl border border-[#EDF1F4] ${group.status === 'active' ? 'border-green-500' : ''}`}
              >
                {/* Top section of the card */}
                <div className={`relative px-4 pt-6 pb-2 text-center rounded-t-[10px] ${group.status === 'active' ? 'bg-green-500' : getServiceColor(group.title)}`}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 bg-white bg-opacity-20">
                    <span className="text-white text-3xl">{getServiceIcon(group.title)}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{group.title}</h3>
                </div>
                {/* Bottom section of the card */}
                <div className="p-4 flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-2xl font-extrabold text-[#131313] mb-0.5">
                      {group.price_per_user.toFixed(2)}€
                    </div>
                    <div className="text-gray-700 text-sm">/mes</div>
                  </div>
                  <button className="bg-[#00CDD0] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#00B0B3] transition-colors duration-200 shadow-md">
                    Únete
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </ExploreNavbarWrapper>
  );
};

export default ExplorePage;
