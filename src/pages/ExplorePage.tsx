import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import {
  Search,
  Grid3X3,
  MessageCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  Award, // Para "Índice de confianza"
  Clock, // Para "Tiempo de respuesta"
  ArrowLeft, // Para GroupDetailsPage
  ExternalLink, // Para GroupDetailsPage
  HelpCircle, // Para GroupDetailsPage
  Star, // Para GroupDetailsPage
  Zap // Para GroupDetailsPage
} from 'lucide-react';

// Componente ExplorePage con estilo minimalista y claro
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

// Componente GroupDetailsPage (tu código original con los nuevos estilos)
const GroupDetailsPage = () => {
  const { id } = useParams();
  const [showJoinModal, setShowJoinModal] = useState(false);

  const profileData = {
    name: 'Yonathan Montilla',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  };

  // Mock data for the group
  const groupData = {
    id: 1,
    service: 'YouTube Premium',
    description: 'Disfruta de YouTube sin anuncios conectándote a tu dispositivo móvil, ordenador o televisor compatible, ¡y también a YouTube Music!',
    price: 5.54,
    totalSlots: 6,
    availableSlots: 4,
    verified: true,
    instantAcceptance: true,
    owner: {
      name: 'Jon Ander',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 4.8
    },
    members: [
      {
        id: 1,
        name: 'Jon Ander',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        isOwner: true
      },
      {
        id: 2,
        name: 'Marfil',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5ac?w=100&h=100&fit=crop&crop=face',
        isOwner: false
      },
      {
        id: 3,
        name: 'Ilyas',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        isOwner: false
      },
      {
        id: 4,
        name: 'MEDO',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        isOwner: false
      },
      {
        id: 5,
        name: 'Edwin',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
        isOwner: false
      },
      {
        id: 6,
        name: 'Jesús',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        isOwner: false
      }
    ]
  };

  const handleJoinGroup = () => {
    // Aquí se implementaría la lógica real para unirse al grupo
    console.log('Joining group:', id);
    setShowJoinModal(false);
    // Redirigir a la página de pago o de éxito
  };

  return (
    <div className="min-h-screen bg-white font-inter text-[#131313]"> {/* Fondo blanco */}
      {/* Navegación Superior - Ajustada para nuevo diseño */}
      <nav className="bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-3xl font-extrabold text-[#131313] tracking-tight">
              Splitit
            </Link>

            {/* Iconos de Navegación y Botón CTA */}
            <div className="flex items-center space-x-6">
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

              {/* Botón CTA */}
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
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Encabezado - Ajustado para nuevo diseño */}
        <div className="flex items-center mb-10">
          <Link
            to="/explore"
            className="p-2 text-gray-600 hover:text-[#00CDD0] transition-colors duration-200 mr-4"
          >
            <ArrowLeft className="w-7 h-7" />
          </Link>
          <h1 className="text-4xl font-extrabold text-[#131313]">{groupData.service}</h1>
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
          {/* Columna Izquierda - Información del Grupo */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[10px] p-[20px] border border-[#EDF1F4] shadow-[0_5px_30px_rgba(43,59,93,0.08)] mb-[15px]"> {/* Estilo de listado */}
              <div className="text-center mb-7">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-[10px] flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <span className="text-white text-4xl">🍿</span>
                </div>
                <h2 className="text-2xl font-bold text-[#131313] mb-3">{groupData.service}</h2>
                <p className="text-gray-700 text-base leading-relaxed">
                  {groupData.description}
                </p>
              </div>

              {/* Características */}
              <div className="space-y-5 mb-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-9 h-9 flex items-center justify-center mr-4 shadow-md"> {/* Fondo eliminado */}
                      <Award className="w-5 h-5 text-[#131313]" /> {/* Icono de Award con color #131313 */}
                    </div>
                    <span className="text-[#131313] text-base">Índice de confianza</span> {/* Texto actualizado */}
                  </div>
                  <div className="w-7 h-7 bg-[#00D08C] rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-9 h-9 flex items-center justify-center mr-4 shadow-md"> {/* Fondo eliminado */}
                      <Clock className="w-5 h-5 text-[#131313]" /> {/* Icono de Clock con color #131313 */}
                    </div>
                    <span className="text-[#131313] text-base">Tiempo de respuesta</span> {/* Texto actualizado */}
                  </div>
                  <div className="w-7 h-7 bg-[#00D08C] rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>
              </div>

              {/* Opciones de Ordenación */}
              <div className="space-y-4">
                <h3 className="text-[#131313] font-semibold text-lg">Ordenar por:</h3>
                <div className="space-y-3">
                  <button className="flex items-center justify-between w-full h-[110px] bg-white rounded-[10px] hover:bg-gray-50 transition-colors duration-200 shadow-[0_5px_30px_rgba(43,59,93,0.08)] p-[20px] mb-[15px] pl-[30px] pr-[30px]"> {/* Estilo de listado */}
                    <div className="flex items-center">
                      <div className="w-7 h-7 bg-[#EE623A] rounded-full flex items-center justify-center mr-3 shadow-sm">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#131313] text-base">Índice de confianza</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>

                  <button className="flex items-center justify-between w-full h-[110px] bg-white rounded-[10px] hover:bg-gray-50 transition-colors duration-200 shadow-[0_5px_30px_rgba(43,59,93,0.08)] p-[20px] mb-[15px] pl-[30px] pr-[30px]"> {/* Estilo de listado */}
                    <div className="flex items-center">
                      <div className="w-7 h-7 bg-purple-500 rounded-full flex items-center justify-center mr-3 shadow-sm">
                        <span className="text-white text-base">⏱</span>
                      </div>
                      <span className="text-[#131313] text-base">Tiempo de respuesta</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTA para Convertirse en Propietario */}
            <div className="bg-white rounded-[10px] p-[20px] border border-[#EDF1F4] shadow-[0_5px_30px_rgba(43,59,93,0.08)]"> {/* Estilo de listado */}
              <div className="text-center">
                <div className="w-14 h-14 bg-[#00CDD0] rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <span className="text-white text-2xl">👑</span>
                </div>
                <h3 className="text-[#131313] font-bold text-xl mb-3">¡Conviértete en propietario!</h3>
                <p className="text-gray-700 text-base mb-5">
                  Ahorra ya compartiendo tu suscripción a {groupData.service} Premium en este listado en unos pocos clics.
                </p>
                <div className="text-[#00CDD0] font-extrabold text-2xl mb-5">
                  Recupera hasta: 21.65€/mes
                </div>
                <Link
                  to="/create-group"
                  className="block w-full bg-[#00CDD0] text-white py-3.5 rounded-full font-semibold hover:bg-[#00B0B3] transition-colors duration-200 shadow-lg"
                >
                  Compartir mi {groupData.service}
                </Link>
              </div>
            </div>
          </div>

          {/* Columna Derecha - Lista de Miembros */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {groupData.members.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-[10px] p-[20px] border border-[#EDF1F4] flex items-center justify-between shadow-[0_5px_30px_rgba(43,59,93,0.08)] h-[110px] pl-[30px] pr-[30px] mb-[15px]" // Estilo de listado
                >
                  <div className="flex items-center">
                    <div className="relative mr-5">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#EDF1F4] shadow-md"
                      />
                      {member.isOwner && (
                        <div className="absolute -top-1 -right-1 w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white text-sm">👑</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-[#131313] font-semibold text-lg">{member.name}</h3>
                      <p className="text-gray-700 text-sm">
                        está compartiendo {groupData.service}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-5">
                    <div className="text-right">
                      <div className="text-[#131313] font-extrabold text-xl flex items-center">
                        <Zap className="w-5 h-5 text-[#00CDD0] mr-1" /> {/* Usando spliiit-color para el rayo */}
                        {groupData.price.toFixed(2)}€
                      </div>
                      <div className="text-gray-700 text-sm">/mes</div>
                    </div>
                    <button
                      onClick={() => setShowJoinModal(true)}
                      className="bg-[#00CDD0] text-white px-7 py-3 rounded-full font-semibold hover:bg-[#00B0B3] transition-colors duration-200 shadow-lg"
                    >
                      Únete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Unión */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[10px] p-8 max-w-md w-full shadow-[0_5px_30px_rgba(43,59,93,0.08)]"> {/* Estilo de listado */}
            <h2 className="text-3xl font-bold text-[#131313] mb-5 text-center">
              Unirse al grupo
            </h2>
            <p className="text-gray-700 mb-7 text-center text-lg">
              ¿Estás seguro de que quieres unirte a este grupo de {groupData.service}?
            </p>

            <div className="bg-[#F1F3F8] rounded-[10px] p-5 mb-7 border border-[#EDF1F4]"> {/* Usando grey-main y grey-border */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#131313] text-lg">Precio mensual:</span>
                <span className="font-bold text-[#131313] text-lg">{groupData.price.toFixed(2)}€</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#131313] text-lg">Propietario:</span>
                <span className="font-medium text-[#131313] text-lg">{groupData.owner.name}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 px-7 py-3.5 border border-[#EDF1F4] text-[#131313] rounded-full font-semibold hover:border-[#C8CCD4] hover:text-[#131313] transition-colors duration-200 shadow-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleJoinGroup}
                className="flex-1 px-7 py-3.5 bg-[#00CDD0] text-white rounded-full font-semibold hover:bg-[#00B0B3] transition-colors duration-200 shadow-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componentes de Página Placeholder para el enrutamiento
// Estos son solo para que el enrutamiento funcione.
// Deberías reemplazarlos con tus componentes reales.

const LandingPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F1F3F8] text-[#131313]">
    <h1 className="text-4xl font-bold">Página de Inicio (LandingPage)</h1>
    <Link to="/explore" className="text-[#00CDD0] underline ml-4">Ir a Explorar</Link>
  </div>
);

const LoginPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F1F3F8] text-[#131313]">
    <h1 className="text-4xl font-bold">Página de Inicio de Sesión (LoginPage)</h1>
    <Link to="/dashboard" className="text-[#00CDD0] underline ml-4">Ir a Dashboard</Link>
  </div>
);

const DashboardPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F1F3F8] text-[#131313]">
    <h1 className="text-4xl font-bold">Página de Panel (DashboardPage)</h1>
    <Link to="/profile" className="text-[#00CDD0] underline ml-4">Ir a Perfil</Link>
  </div>
);

const ProfilePage = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F1F3F8] text-[#131313]">
    <h1 className="text-4xl font-bold">Página de Perfil (ProfilePage)</h1>
    <Link to="/" className="text-[#00CDD0] underline ml-4">Ir a Inicio</Link>
  </div>
);

const CreateGroupPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F1F3F8] text-[#131313]">
    <h1 className="text-4xl font-bold">Página de Crear Grupo (CreateGroupPage)</h1>
    <Link to="/explore" className="text-[#00CDD0] underline ml-4">Ir a Explorar</Link>
  </div>
);


// Componente principal de la aplicación (App.tsx)
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-group" element={<CreateGroupPage />} />
        <Route path="/group/:id" element={<GroupDetailsPage />} /> {/* Ruta para GroupDetailsPage */}
        {/* Puedes añadir más rutas aquí según sea necesario */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
