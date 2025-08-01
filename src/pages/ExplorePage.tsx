import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Grid3X3,
  MessageCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  Award, // Para "Índice de confianza"
  Clock // Para "Tiempo de respuesta"
} from 'lucide-react';

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

  const mockGroups = {
    'SVOD': [
      {
        id: 1,
        service: 'YouTube Premium',
        price: 5.54,
        availableSlots: 3,
        totalSlots: 6,
        owner: 'Jon Ander',
        verified: true,
        instantAcceptance: true
      },
      {
        id: 2,
        service: 'Disney+',
        price: 4.05,
        availableSlots: 2,
        totalSlots: 4,
        owner: 'María',
        verified: false,
        instantAcceptance: true
      },
      {
        id: 3,
        service: 'HBO Max',
        price: 4.47,
        availableSlots: 1,
        totalSlots: 3,
        owner: 'Carlos',
        verified: true,
        instantAcceptance: false
      },
      {
        id: 4,
        service: 'Crunchyroll',
        price: 2.41,
        availableSlots: 4,
        totalSlots: 6,
        owner: 'Ana',
        verified: true,
        instantAcceptance: true
      }
    ],
    'Música': [
      {
        id: 5,
        service: 'Spotify',
        price: 4.14,
        availableSlots: 2,
        totalSlots: 6,
        owner: 'David',
        verified: true,
        instantAcceptance: true
      },
      {
        id: 6,
        service: 'YouTube Premium',
        price: 5.54,
        availableSlots: 1,
        totalSlots: 6,
        owner: 'Laura',
        verified: false,
        instantAcceptance: true
      },
      {
        id: 7,
        service: 'Apple One',
        price: 5.54,
        availableSlots: 3,
        totalSlots: 6,
        owner: 'Miguel',
        verified: true,
        instantAcceptance: false
      },
      {
        id: 8,
        service: 'Apple Music',
        price: 3.96,
        availableSlots: 2,
        totalSlots: 6,
        owner: 'Sofia',
        verified: true,
        instantAcceptance: true
      }
    ]
  };

  const getServiceIcon = (service: string) => {
    const icons: { [key: string]: string } = {
      'YouTube Premium': '🍿',
      'Disney+': '🍿',
      'HBO Max': '🍿',
      'Crunchyroll': '�',
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

  const getCurrentGroups = () => {
    if (activeCategory === 'Todos') {
      return [...(mockGroups['SVOD'] || []), ...(mockGroups['Música'] || [])];
    }
    return mockGroups[activeCategory as keyof typeof mockGroups] || [];
  };

  const filteredGroups = getCurrentGroups().filter(group =>
    group.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedByCategory = filteredGroups.reduce((acc, group) => {
    const category = ['Spotify', 'Apple One', 'Apple Music'].includes(group.service) ? 'Música' : 'SVOD';
    if (!acc[category]) acc[category] = [];
    acc[category].push(group);
    return acc;
  }, {} as { [key: string]: any[] });

  return (
    <div className="min-h-screen bg-[#F1F3F8] font-inter text-[#131313]"> {/* Fondo gris claro */}
      {/* Top Navigation */}
      <nav className="bg-white border-b border-white border-opacity-10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-3xl font-extrabold text-[#131313] tracking-tight">
              Splitit
            </Link>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="p-2 text-[#131313] hover:text-[#00CDD0] transition-colors duration-200">
                <Grid3X3 className="w-6 h-6" />
                <span className="sr-only">Inicio</span>
              </Link>
              <Link to="/explore" className="p-2 text-[#00CDD0] transition-colors duration-200">
                <Search className="w-6 h-6" />
                <span className="sr-only">Explorar</span>
              </Link>
              <button className="p-2 text-[#131313] hover:text-[#00CDD0] transition-colors duration-200">
                <MessageCircle className="w-6 h-6" />
                <span className="sr-only">Mensajes</span>
              </button>

              {/* CTA Button */}
              <Link
                to="/create-group"
                className="bg-[#00CDD0] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#00B0B3] transition-all duration-200 transform hover:scale-[1.02] flex items-center shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Compartir una suscripción
              </Link>

              {/* Profile Avatar */}
              <Link to="/profile" className="relative">
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#00CDD0] shadow-md"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#00D08C] rounded-full border-2 border-white"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
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

        {/* Groups by Category */}
        {Object.entries(groupedByCategory).map(([categoryName, groups]) => (
          <div key={categoryName} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center mr-3 ${
                  categoryName === 'SVOD' ? 'bg-red-500' : 'bg-green-500'
                }`}>
                  <span className="text-white text-sm">
                    {categoryName === 'SVOD' ? '🍿' : '🎵'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#131313]">{categoryName}</h2>
              </div>
              <button className="text-[#131313] opacity-70 hover:opacity-100 transition-opacity duration-200">
                Ver todo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {groups.map((group) => (
                <Link
                  key={group.id}
                  to={`/group/${group.id}`}
                  className="bg-white rounded-[10px] p-0 overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-xl border border-[#EDF1F4]"
                >
                  {/* Top section of the card */}
                  <div className={`relative px-4 pt-6 pb-2 text-center rounded-t-[10px] ${getServiceColor(group.service)}`}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 bg-white bg-opacity-20">
                      <span className="text-white text-3xl">{getServiceIcon(group.service)}</span>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{group.service}</h3>
                    {/* Placeholder for the "35" badge if needed */}
                    {/* <div className="absolute top-2 right-2 bg-white bg-opacity-20 text-white text-xs font-bold px-2 py-1 rounded-full">35</div> */}
                  </div>

                  {/* Bottom section of the card */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-2xl font-extrabold text-[#131313] mb-0.5">
                        {group.price.toFixed(2)}€
                      </div>
                      <div className="text-gray-700 text-sm">/mes</div>
                    </div>
                    <button className="bg-[#00CDD0] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#00B0B3] transition-colors duration-200 shadow-md">
                      Únete
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
