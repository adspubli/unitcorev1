import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { 
  Grid3X3, 
  Search, 
  MessageCircle, 
  ChevronRight, 
  Plus,
  User,
  CreditCard,
  Settings,
  LogOut
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js'; // Importa Supabase

// --- CONFIGURACIÓN DE SUPABASE ---
// Asegúrate de que estos valores sean los mismos que en LoginPage y RegisterPage
const supabaseUrl = 'https://ofkkjjdtorwsggozrmzn.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ma2tqamR0b3J3c2dnb3pybXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MjkyNjgsImexJpcCI6MjA2OTQwNTI2OH0.tmKc7L71Dd7J2bfJMR6iXg_omp0U6k6_va_4_nuA_nY'; 

const supabase = createClient(supabaseUrl, supabaseAnonKey);
// --- FIN CONFIGURACIÓN DE SUPABASE ---


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false); // Nuevo estado para el indicador de carga
  const [error, setError] = useState<string | null>(null); // Nuevo estado para mensajes de error
  const navigate = useNavigate(); // Hook para la navegación programática

  const profileData = {
    name: 'Yonathan Montilla',
    email: 'creativedesignseo@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    phone: '',
    birthDate: '',
    gender: 'Masculino'
  };

  const menuItems = [
    {
      id: 'personal',
      title: 'Información personal',
      icon: User,
      color: 'bg-[#10B981]'
    },
    {
      id: 'payment',
      title: 'Medios de pago',
      icon: CreditCard,
      color: 'bg-[#3B4A6B]'
    },
    {
      id: 'splitit',
      title: 'Splitit+',
      icon: Plus,
      color: 'bg-[#3B4A6B]'
    }
  ];

  const profileFields = [
    {
      label: 'Nombre y Apellido',
      value: profileData.name,
      placeholder: 'Jonathan Montilla'
    },
    {
      label: 'Seudónimo',
      value: '',
      placeholder: 'Agrega tu seudónimo'
    },
    {
      label: 'Fecha de nacimiento',
      value: profileData.birthDate || 'Fecha inválida',
      placeholder: 'DD/MM/AAAA'
    },
    {
      label: 'Género',
      value: profileData.gender,
      placeholder: 'Selecciona tu género'
    }
  ];

  const contactFields = [
    {
      label: 'Dirección de correo electrónico',
      value: profileData.email,
      placeholder: 'tu@email.com'
    },
    {
      label: 'Teléfono',
      value: profileData.phone || 'Agrega tu número de teléfono',
      placeholder: '+1 234 567 8900'
    }
  ];

  // Función para cerrar sesión
  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      } else {
        console.log('Sesión cerrada exitosamente.');
        navigate('/login'); // Redirige al login después de cerrar sesión
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al cerrar sesión.');
      console.error('Error al cerrar sesión:', err);
    } finally {
      setLoading(false);
    }
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
              <button className="p-2 text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors duration-200">
                <Grid3X3 className="w-6 h-6" />
                <span className="sr-only">Inicio</span>
              </button>
              <button className="p-2 text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors duration-200">
                <Search className="w-6 h-6" />
                <span className="sr-only">Explorar</span>
              </button>
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
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#E5E7EB]"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#10B981] rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Profile Header */}
              <div className="p-6 text-center border-b border-gray-100">
                <h1 className="text-2xl font-bold text-[#0A0A0A] mb-2">Mi cuenta</h1>
                {/* Botón de Cerrar Sesión con funcionalidad */}
                <button 
                  onClick={handleLogout}
                  disabled={loading} // Deshabilita el botón mientras carga
                  className="text-[#4A4A4A] hover:text-[#0A0A0A] px-4 py-2 border border-[#E5E7EB] rounded-full text-sm font-medium transition-colors duration-200"
                >
                  {loading ? 'Cerrando...' : 'Cerrar sesión'}
                </button>
                {/* Mensaje de error al cerrar sesión */}
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>

              {/* Menu Items */}
              <div className="p-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200 mb-1 ${
                      activeTab === item.id
                        ? 'bg-[#10B981] text-white'
                        : 'text-[#4A4A4A] hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        activeTab === item.id ? 'bg-white' : item.color
                      }`}></div>
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${
                      activeTab === item.id ? 'text-white' : 'text-[#9CA3AF]'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              {activeTab === 'personal' && (
                <div>
                  {/* Profile Section */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-[#0A0A0A]">Perfil</h2>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <div className="relative mr-6">
                        <img
                          src={profileData.avatar}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover border-4 border-[#E5E7EB]"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0A0A0A] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors duration-200">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-[#4A4A4A] mb-1">
                          La foto de perfil tranquiliza a otros usuarios de un grupo.
                        </p>
                      </div>
                    </div>

                    {/* Profile Fields */}
                    <div className="space-y-4">
                      {profileFields.map((field, index) => (
                        <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                          <div className="flex-1">
                            <label className="block text-sm text-[#4A4A4A] mb-1">
                              {field.label}
                            </label>
                            <div className="text-[#0A0A0A] font-medium">
                              {field.value || field.placeholder}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#9CA3AF] ml-4" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-6">
                      Información de contacto
                    </h3>
                    
                    <div className="space-y-4">
                      {contactFields.map((field, index) => (
                        <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                          <div className="flex-1">
                            <label className="block text-sm text-[#4A4A4A] mb-1">
                              {field.label}
                            </label>
                            <div className={`font-medium ${
                              field.value.includes('Agrega') ? 'text-[#4A4A4A]' : 'text-[#0A0A0A]'
                            }`}>
                              {field.value}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#9CA3AF] ml-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div>
                  <h2 className="text-xl font-bold text-[#0A0A0A] mb-6">Walle</h2>
                  <div className="text-center py-12">
                    <CreditCard className="w-16 h-16 text-[#9CA3AF] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-[#4A4A4A] mb-2">
                      No tienes medios de pago agregados
                    </h3>
                    <p className="text-[#9CA3AF] mb-6">
                      Agrega una tarjeta de crédito o débito para realizar pagos
                    </p>
                    <button className="bg-[#0A0A0A] text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200">
                      Agregar método de pago
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'splitit' && (
                <div>
                  <h2 className="text-xl font-bold text-[#0A0A0A] mb-6">Splitit+</h2>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#059669] to-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-[#4A4A4A] mb-2">
                      Descubre Splitit+
                    </h3>
                    <p className="text-[#9CA3AF] mb-6">
                      Accede a beneficios exclusivos y funciones premium
                    </p>
                    <button className="bg-gradient-to-r from-[#059669] to-[#10B981] text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
                      Conocer más
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
