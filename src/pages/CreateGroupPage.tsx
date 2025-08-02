import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search,
  ChevronRight,
  Grid3X3,
  MessageCircle,
  Plus
} from 'lucide-react';

const CreateGroupPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showCompleteList, setShowCompleteList] = useState(false);
  const [activeCategory, setActiveCategory] = useState('SVOD');

  const profileData = {
    name: 'Yonathan Montilla',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  };

  const suggestedServices = [
    {
      id: 'spotify',
      name: 'Spotify',
      icon: '🎵',
      color: 'bg-green-500'
    },
    {
      id: 'youtube-premium',
      name: 'YouTube Premium',
      icon: '🍿',
      color: 'bg-red-500'
    },
    {
      id: 'disney',
      name: 'Disney+',
      icon: '🍿',
      color: 'bg-blue-600'
    }
  ];

  const categories = [
    'SVOD', 'Música', 'Seguridad', 'Videojuegos', 'Software', 
    'Lectura', 'E-commerce', 'Nube', 'Bienestar', 'Educación'
  ];

  const allServicesByCategory = {
    'SVOD': [
      { id: 'youtube-premium', name: 'YouTube Premium', icon: '🍿', color: 'bg-red-500' },
      { id: 'apple-tv', name: 'Apple TV+', icon: '🍿', color: 'bg-gray-800' },
      { id: 'crunchyroll', name: 'Crunchyroll', icon: '🍿', color: 'bg-orange-500' },
      { id: 'disney', name: 'Disney+', icon: '🍿', color: 'bg-blue-600' },
      { id: 'nba', name: 'NBA', icon: '🏀', color: 'bg-blue-700' },
      { id: 'mubi', name: 'Mubi', icon: '🎬', color: 'bg-purple-600' },
      { id: 'apple-one', name: 'Apple One', icon: '🍿', color: 'bg-gray-800' },
      { id: 'guidedoc', name: 'GuideDoc', icon: '📺', color: 'bg-green-600' },
      { id: 'atresplayer', name: 'ATRESplayer', icon: '📺', color: 'bg-orange-600' },
      { id: 'hbo-max', name: 'HBO Max', icon: '🍿', color: 'bg-purple-600' },
      { id: 'dazn', name: 'DAZN', icon: '⚽', color: 'bg-yellow-500' },
      { id: 'fubotv', name: 'fuboTV', icon: '📺', color: 'bg-green-500' },
      { id: 'iqiyi', name: 'iQiyi', icon: '📺', color: 'bg-green-400' },
      { id: 'filmin', name: 'Filmin', icon: '🎬', color: 'bg-red-600' },
      { id: 'tivify', name: 'Tivify', icon: '📺', color: 'bg-blue-500' },
      { id: 'masterclass', name: 'MasterClass', icon: '🎓', color: 'bg-red-500' },
      { id: 'skyshowtime', name: 'SkyShowtime', icon: '📺', color: 'bg-blue-800' },
      { id: 'mitele-plus', name: 'mitele PLUS', icon: '📺', color: 'bg-green-600' },
      { id: 'dekkoo', name: 'Dekkoo', icon: '🏳️‍🌈', color: 'bg-pink-500' },
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
    ],
    'Música': [
      { id: 'spotify', name: 'Spotify', icon: '🎵', color: 'bg-green-500' },
      { id: 'apple-music', name: 'Apple Music', icon: '🎵', color: 'bg-gray-800' },
      { id: 'youtube-music', name: 'YouTube Music', icon: '🎵', color: 'bg-red-500' },
      { id: 'amazon-music', name: 'Amazon Music', icon: '🎵', color: 'bg-blue-500' },
      { id: 'tidal', name: 'Tidal', icon: '🎵', color: 'bg-black' },
      { id: 'deezer', name: 'Deezer', icon: '🎵', color: 'bg-orange-500' }
    ],
    'Seguridad': [
      { id: 'nordvpn', name: 'NordVPN', icon: '🔒', color: 'bg-blue-600' },
      { id: 'expressvpn', name: 'ExpressVPN', icon: '🔒', color: 'bg-red-600' },
      { id: 'surfshark', name: 'Surfshark', icon: '🔒', color: 'bg-green-500' },
      { id: 'cyberghost', name: 'CyberGhost', icon: '🔒', color: 'bg-yellow-500' },
      { id: 'bitdefender', name: 'Bitdefender', icon: '🛡️', color: 'bg-red-500' },
      { id: 'kaspersky', name: 'Kaspersky', icon: '🛡️', color: 'bg-green-600' }
    ],
    'Videojuegos': [
      { id: 'xbox-game-pass', name: 'Xbox Game Pass', icon: '🎮', color: 'bg-green-600' },
      { id: 'playstation-plus', name: 'PlayStation Plus', icon: '🎮', color: 'bg-blue-600' },
      { id: 'nintendo-switch-online', name: 'Nintendo Switch Online', icon: '🎮', color: 'bg-red-500' },
      { id: 'ea-play', name: 'EA Play', icon: '🎮', color: 'bg-orange-500' },
      { id: 'ubisoft-plus', name: 'Ubisoft+', icon: '🎮', color: 'bg-blue-500' },
      { id: 'steam', name: 'Steam', icon: '🎮', color: 'bg-gray-800' }
    ],
    'Software': [
      { id: 'adobe-creative', name: 'Adobe Creative Cloud', icon: '🎨', color: 'bg-red-600' },
      { id: 'microsoft-365', name: 'Microsoft 365', icon: '💼', color: 'bg-blue-600' },
      { id: 'canva-pro', name: 'Canva Pro', icon: '🎨', color: 'bg-purple-500' },
      { id: 'figma', name: 'Figma', icon: '🎨', color: 'bg-purple-600' },
      { id: 'notion', name: 'Notion', icon: '📝', color: 'bg-gray-800' },
      { id: 'grammarly', name: 'Grammarly', icon: '✍️', color: 'bg-green-500' }
    ],
    'Lectura': [
      { id: 'kindle-unlimited', name: 'Kindle Unlimited', icon: '📚', color: 'bg-orange-500' },
      { id: 'audible', name: 'Audible', icon: '🎧', color: 'bg-orange-600' },
      { id: 'scribd', name: 'Scribd', icon: '📖', color: 'bg-red-500' },
      { id: 'blinkist', name: 'Blinkist', icon: '📚', color: 'bg-green-500' },
      { id: 'medium', name: 'Medium', icon: '📝', color: 'bg-black' },
      { id: 'readly', name: 'Readly', icon: '📰', color: 'bg-red-600' }
    ],
    'E-commerce': [
      { id: 'amazon-prime', name: 'Amazon Prime', icon: '📦', color: 'bg-blue-500' },
      { id: 'aliexpress-plus', name: 'AliExpress Plus', icon: '🛒', color: 'bg-orange-500' },
      { id: 'walmart-plus', name: 'Walmart+', icon: '🛒', color: 'bg-blue-600' },
      { id: 'costco', name: 'Costco', icon: '🛒', color: 'bg-red-600' }
    ],
    'Nube': [
      { id: 'google-drive', name: 'Google Drive', icon: '☁️', color: 'bg-blue-500' },
      { id: 'dropbox', name: 'Dropbox', icon: '☁️', color: 'bg-blue-600' },
      { id: 'onedrive', name: 'OneDrive', icon: '☁️', color: 'bg-blue-700' },
      { id: 'icloud', name: 'iCloud', icon: '☁️', color: 'bg-gray-600' },
      { id: 'mega', name: 'MEGA', icon: '☁️', color: 'bg-red-500' }
    ],
    'Bienestar': [
      { id: 'headspace', name: 'Headspace', icon: '🧘', color: 'bg-orange-500' },
      { id: 'calm', name: 'Calm', icon: '🧘', color: 'bg-blue-500' },
      { id: 'nike-training', name: 'Nike Training Club', icon: '💪', color: 'bg-black' },
      { id: 'peloton', name: 'Peloton', icon: '🚴', color: 'bg-red-500' },
      { id: 'myfitnesspal', name: 'MyFitnessPal', icon: '🏃', color: 'bg-blue-600' }
    ],
    'Educación': [
      { id: 'coursera', name: 'Coursera', icon: '🎓', color: 'bg-blue-600' },
      { id: 'udemy', name: 'Udemy', icon: '🎓', color: 'bg-purple-600' },
      { id: 'skillshare', name: 'Skillshare', icon: '🎨', color: 'bg-green-500' },
      { id: 'linkedin-learning', name: 'LinkedIn Learning', icon: '💼', color: 'bg-blue-700' },
      { id: 'duolingo-plus', name: 'Duolingo Plus', icon: '🦜', color: 'bg-green-500' },
      { id: 'babbel', name: 'Babbel', icon: '🗣️', color: 'bg-yellow-500' }
    ]
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

  const handleShowCompleteList = () => {
    setShowCompleteList(true);
    setSearchTerm(''); // Limpiar búsqueda al mostrar lista completa
  };

  const handleBackToSuggestions = () => {
    setShowCompleteList(false);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8]">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-[#0A0A0A] tracking-tight">
              Splitit
            </Link>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-6">
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
              
              {/* CTA Button */}
              <button className="bg-[#FF6B9D] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#FF5A8A] transition-all duration-200 transform hover:scale-[1.02] flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Compartir una suscripción
              </button>

              {/* Profile Avatar */}
              <Link to="/profile" className="relative">
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#E5E7EB]"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#10B981] rounded-full border-2 border-white"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={showCompleteList ? handleBackToSuggestions : () => window.history.back()}
            className="p-2 text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors duration-200 mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-[#0A0A0A]">
            {showCompleteList ? 'Todos los servicios' : 'Compartir'}
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#9CA3AF]" />
          </div>
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 border border-[#E5E7EB] rounded-2xl bg-white text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Category Filters - Solo visible cuando se muestra la lista completa */}
        {showCompleteList && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-[#059669] text-white'
                      : 'bg-white text-[#4A4A4A] border border-[#E5E7EB] hover:border-[#059669]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions Section - Solo visible cuando NO se muestra la lista completa */}
        {!showCompleteList && !searchTerm && (
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-2 h-2 bg-[#FF6B9D] rounded-full mr-3"></div>
              <h2 className="text-lg font-bold text-[#0A0A0A]">Sugerencias:</h2>
            </div>

            <div className="space-y-3">
              {suggestedServices.map((service) => (
                <Link
                  key={service.id}
                  to={`/create-group/configure?service=${service.id}`}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#E5E7EB] hover:border-[#059669] transition-all duration-200 group"
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 ${service.color} rounded-xl flex items-center justify-center mr-4`}>
                      <span className="text-white text-lg">{service.icon}</span>
                    </div>
                    <span className="font-medium text-[#0A0A0A] group-hover:text-[#059669]">
                      {service.name}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#059669]" />
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <button 
                onClick={handleShowCompleteList}
                className="text-[#059669] font-medium px-6 py-2 border border-[#059669] rounded-full hover:bg-[#059669] hover:text-white transition-all duration-200"
              >
                Lista completa →
              </button>
            </div>
          </div>
        )}

        {/* Services List - Visible cuando se muestra la lista completa O hay búsqueda */}
        {(showCompleteList || searchTerm) && (
          <div className="space-y-3 mb-8">
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredServices.map((service) => (
                  <Link
                    key={service.id}
                    to={`/create-group/configure?service=${service.id}`}
                    className="flex flex-col items-center p-6 bg-white rounded-xl border border-[#E5E7EB] hover:border-[#059669] transition-all duration-200 group hover:shadow-md"
                  >
                    <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-3`}>
                      <span className="text-white text-xl">{service.icon}</span>
                    </div>
                    <span className="font-medium text-[#0A0A0A] group-hover:text-[#059669] text-center text-sm">
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
        )}

        {/* Custom Service Option - Solo visible cuando NO se muestra la lista completa */}
        {!showCompleteList && (
          <div className="mt-12 text-center">
            <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">O sino</h3>
            <Link
              to="/create-group/custom"
              className="inline-block text-[#059669] font-medium px-6 py-3 border border-[#059669] rounded-full hover:bg-[#059669] hover:text-white transition-all duration-200"
            >
              Crear una compartición personalizada
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateGroupPage;