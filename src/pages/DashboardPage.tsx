
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import NavbarProfile from '../components/NavbarProfile';

const DashboardPage = () => {
  // Avatar por defecto para NavbarProfile
  const avatarUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face';

  return (

    <div className="min-h-screen bg-[#F7F9F8]">
      {/* Menú de navegación reutilizable */}
      <NavbarProfile avatarUrl={avatarUrl} />

  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-8 h-8 text-[#9CA3AF]" />
          </div>
          <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">Agregar una suscripción</h3>
          <p className="text-[#4A4A4A] mb-6 text-sm md:text-base">Comparte tus suscripciones o únete a grupos existentes</p>
          <Link
            to="/create-group"
            className="bg-[#0A0A0A] text-white px-6 md:px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200 text-sm md:text-base"
          >
            Comenzar
          </Link>
        </div>
      </div>

  {/* Action Modal eliminado, ahora el popup está en NavbarProfile */}
    </div>
  );
};

export default DashboardPage;