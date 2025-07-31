import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Grid3X3, 
  Search, 
  MessageCircle, 
  Plus,
  X
} from 'lucide-react';

const DashboardPage = () => {
  const [showActionModal, setShowActionModal] = useState(false);

  const profileData = {
    name: 'Yonathan Montilla',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8]">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-[#0A0A0A] tracking-tight">
              Unitcore
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
              <button 
                onClick={() => setShowActionModal(true)}
                className="bg-[#FF6B9D] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#FF5A8A] transition-all duration-200 transform hover:scale-[1.02] flex items-center"
              >
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-white" />
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-8 h-8 text-[#9CA3AF]" />
          </div>
          <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">Agregar una suscripción</h3>
          <p className="text-[#4A4A4A] mb-6">Comparte tus suscripciones o únete a grupos existentes</p>
          <button 
            onClick={() => setShowActionModal(true)}
            className="bg-[#0A0A0A] text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Comenzar
          </button>
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowActionModal(false)}
              className="absolute top-4 right-4 p-2 text-[#9CA3AF] hover:text-[#4A4A4A] transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">¿Qué quieres hacer?</h2>
            </div>

            <div className="space-y-4">
              <Link
                to="/create-group"
                onClick={() => setShowActionModal(false)}
                className="block w-full p-4 border-2 border-[#E5E7EB] rounded-xl hover:border-[#059669] transition-colors duration-200 group"
              >
                <div className="text-center">
                  <h3 className="font-semibold text-[#0A0A0A] mb-2 group-hover:text-[#059669]">Compartir</h3>
                  <p className="text-sm text-[#4A4A4A]">
                    Soy el/la propietario(a) de una suscripción y quiero compartirla.
                  </p>
                </div>
              </Link>

              <Link
                to="/explore"
                onClick={() => setShowActionModal(false)}
                className="block w-full p-4 border-2 border-[#E5E7EB] rounded-xl hover:border-[#059669] transition-colors duration-200 group"
              >
                <div className="text-center">
                  <h3 className="font-semibold text-[#0A0A0A] mb-2 group-hover:text-[#059669]">Suscribir</h3>
                  <p className="text-sm text-[#4A4A4A]">
                    Quiero suscribirme a una suscripción.
                  </p>
                </div>
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#FF6B9D] font-medium">¡Fácil!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;