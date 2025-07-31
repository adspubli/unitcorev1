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

  const allServices = [
    ...suggestedServices,
    {
      id: 'netflix',
      name: 'Netflix',
      icon: '🍿',
      color: 'bg-red-600'
    },
    {
      id: 'hbo-max',
      name: 'HBO Max',
      icon: '🍿',
      color: 'bg-purple-600'
    },
    {
      id: 'prime-video',
      name: 'Prime Video',
      icon: '🍿',
      color: 'bg-blue-500'
    },
    {
      id: 'apple-music',
      name: 'Apple Music',
      icon: '🎵',
      color: 'bg-gray-800'
    },
    {
      id: 'crunchyroll',
      name: 'Crunchyroll',
      icon: '🍿',
      color: 'bg-orange-500'
    }
  ];

  const filteredServices = allServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Link 
            to="/dashboard" 
            className="p-2 text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors duration-200 mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-[#0A0A0A]">Compartir</h1>
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

        {/* Suggestions Section */}
        {!searchTerm && (
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
              <button className="text-[#059669] font-medium px-6 py-2 border border-[#059669] rounded-full hover:bg-[#059669] hover:text-white transition-all duration-200">
                Lista completa →
              </button>
            </div>
          </div>
        )}

        {/* Search Results or Complete List */}
        {(searchTerm || selectedService) && (
          <div className="space-y-3">
            {filteredServices.map((service) => (
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
        )}

        {/* Custom Service Option */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">O sino</h3>
          <Link
            to="/create-group/custom"
            className="inline-block text-[#059669] font-medium px-6 py-3 border border-[#059669] rounded-full hover:bg-[#059669] hover:text-white transition-all duration-200"
          >
            Crear una compartición personalizada
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPage;