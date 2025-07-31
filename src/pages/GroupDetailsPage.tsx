import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft,
  Grid3X3,
  Search,
  MessageCircle,
  Plus,
  ExternalLink,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

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
    // Here you would implement the actual join logic
    console.log('Joining group:', id);
    setShowJoinModal(false);
    // Redirect to payment or success page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D1B69] to-[#1A0B3D]">
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
              <Link to="/explore" className="p-2 text-[#059669] transition-colors duration-200">
                <Search className="w-6 h-6" />
                <span className="sr-only">Explorar</span>
              </Link>
              <button className="p-2 text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors duration-200">
                <MessageCircle className="w-6 h-6" />
                <span className="sr-only">Mensajes</span>
              </button>
              
              {/* CTA Button */}
              <Link
                to="/create-group"
                className="bg-[#FF6B9D] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#FF5A8A] transition-all duration-200 transform hover:scale-[1.02] flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Compartir una suscripción
              </Link>

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            to="/explore" 
            className="p-2 text-white hover:text-[#059669] transition-colors duration-200 mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-white">{groupData.service}</h1>
          <div className="ml-auto flex items-center space-x-4">
            <button className="p-2 text-white hover:text-[#059669] transition-colors duration-200">
              <ExternalLink className="w-6 h-6" />
            </button>
            <button className="p-2 text-white hover:text-[#059669] transition-colors duration-200">
              <HelpCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Group Info */}
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 mb-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl">🍿</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{groupData.service}</h2>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  {groupData.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-white text-sm">Factura verificada</span>
                  </div>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm">⚡</span>
                    </div>
                    <span className="text-white text-sm">Aceptación instantánea</span>
                  </div>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              </div>

              {/* Sorting Options */}
              <div className="space-y-3">
                <h3 className="text-white font-medium">Ordenar por:</h3>
                <div className="space-y-2">
                  <button className="flex items-center justify-between w-full p-3 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-colors duration-200">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">★</span>
                      </div>
                      <span className="text-white text-sm">Índice de confianza</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white opacity-60" />
                  </button>

                  <button className="flex items-center justify-between w-full p-3 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-colors duration-200">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">⏱</span>
                      </div>
                      <span className="text-white text-sm">Tiempo de respuesta</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white opacity-60" />
                  </button>
                </div>
              </div>
            </div>

            {/* Become Owner CTA */}
            <div className="bg-gradient-to-r from-[#2D1B69] to-[#1A0B3D] rounded-2xl p-6 border border-[#FF6B9D] border-opacity-50">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#FF6B9D] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">👑</span>
                </div>
                <h3 className="text-white font-bold mb-2">¡Conviértete en propietario!</h3>
                <p className="text-white opacity-80 text-sm mb-4">
                  Ahorra ya compartiendo tu suscripción a {groupData.service} Premium en este listado en unos pocos clics.
                </p>
                <div className="text-[#FF6B9D] font-bold text-lg mb-4">
                  Recupera hasta: 21.65€/mes
                </div>
                <Link
                  to="/create-group"
                  className="block w-full bg-[#FF6B9D] text-white py-3 rounded-xl font-medium hover:bg-[#FF5A8A] transition-colors duration-200"
                >
                  Compartir mi {groupData.service}
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Members List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {groupData.members.map((member) => (
                <div
                  key={member.id}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="relative mr-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white border-opacity-20"
                      />
                      {member.isOwner && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">👑</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{member.name}</h3>
                      <p className="text-white opacity-60 text-sm">
                        está compartiendo {groupData.service}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-white font-bold text-lg flex items-center">
                        <span className="text-yellow-400 mr-1">⚡</span>
                        {groupData.price.toFixed(2)}€
                      </div>
                      <div className="text-white opacity-60 text-sm">/mes</div>
                    </div>
                    <button
                      onClick={() => setShowJoinModal(true)}
                      className="bg-[#059669] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#10B981] transition-colors duration-200"
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

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4 text-center">
              Unirse al grupo
            </h2>
            <p className="text-[#4A4A4A] mb-6 text-center">
              ¿Estás seguro de que quieres unirte a este grupo de {groupData.service}?
            </p>
            
            <div className="bg-[#F7F9F8] rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#4A4A4A]">Precio mensual:</span>
                <span className="font-bold text-[#0A0A0A]">{groupData.price.toFixed(2)}€</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#4A4A4A]">Propietario:</span>
                <span className="font-medium text-[#0A0A0A]">{groupData.owner.name}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 px-6 py-3 border border-[#E5E7EB] text-[#4A4A4A] rounded-xl font-medium hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleJoinGroup}
                className="flex-1 px-6 py-3 bg-[#059669] text-white rounded-xl font-medium hover:bg-[#10B981] transition-colors duration-200"
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

export default GroupDetailsPage;