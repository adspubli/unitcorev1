import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Grid3X3, 
  Search, 
  MessageCircle, 
  ChevronRight, 
  Plus,
  User,
  CreditCard,
  Settings,
  LogOut,
  Edit3,
  Save,
  X,
  Camera
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Estados para los campos editables
  const [editableData, setEditableData] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    birthDate: '',
    gender: 'Masculino',
    phone: ''
  });

  const profileData = {
    name: user?.user_metadata?.first_name && user?.user_metadata?.last_name 
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
      : user?.email?.split('@')[0] || 'Usuario',
    email: user?.email || '',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    phone: editableData.phone,
    birthDate: editableData.birthDate,
    gender: editableData.gender,
    nickname: editableData.nickname
  };

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          // Inicializar datos editables con los datos existentes
          setEditableData({
            firstName: user.user_metadata?.first_name || '',
            lastName: user.user_metadata?.last_name || '',
            nickname: user.user_metadata?.nickname || '',
            birthDate: user.user_metadata?.birth_date || '',
            gender: user.user_metadata?.gender || 'Masculino',
            phone: user.user_metadata?.phone || ''
          });
        }
      } catch (err) {
        console.error('Error loading user data:', err);
      }
    };

    loadUserData();
  }, []);

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

  const handleInputChange = (field: string, value: string) => {
    setEditableData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          first_name: editableData.firstName,
          last_name: editableData.lastName,
          nickname: editableData.nickname,
          birth_date: editableData.birthDate,
          gender: editableData.gender,
          phone: editableData.phone
        }
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage('¡Perfil actualizado exitosamente!');
        setIsEditing(false);
        setUser(data.user);
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    // Restaurar datos originales
    if (user) {
      setEditableData({
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
        nickname: user.user_metadata?.nickname || '',
        birthDate: user.user_metadata?.birth_date || '',
        gender: user.user_metadata?.gender || 'Masculino',
        phone: user.user_metadata?.phone || ''
      });
    }
    setIsEditing(false);
    setError(null);
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      } else {
        console.log('Sesión cerrada exitosamente.');
        navigate('/login');
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al cerrar sesión.');
      console.error('Error al cerrar sesión:', err);
    } finally {
      setLoading(false);
    }
  };

  const profileFields = [
    {
      label: 'Nombre',
      field: 'firstName',
      value: editableData.firstName,
      placeholder: 'Ingresa tu nombre',
      type: 'text'
    },
    {
      label: 'Apellido',
      field: 'lastName',
      value: editableData.lastName,
      placeholder: 'Ingresa tu apellido',
      type: 'text'
    },
    {
      label: 'Seudónimo',
      field: 'nickname',
      value: editableData.nickname,
      placeholder: 'Agrega tu seudónimo',
      type: 'text'
    },
    {
      label: 'Fecha de nacimiento',
      field: 'birthDate',
      value: editableData.birthDate,
      placeholder: 'DD/MM/AAAA',
      type: 'date'
    },
    {
      label: 'Género',
      field: 'gender',
      value: editableData.gender,
      placeholder: 'Selecciona tu género',
      type: 'select',
      options: ['Masculino', 'Femenino', 'Otro', 'Prefiero no decir']
    }
  ];

  const contactFields = [
    {
      label: 'Dirección de correo electrónico',
      field: 'email',
      value: profileData.email,
      placeholder: 'tu@email.com',
      type: 'email',
      disabled: true // El email no se puede cambiar
    },
    {
      label: 'Teléfono',
      field: 'phone',
      value: editableData.phone,
      placeholder: '+1 234 567 8900',
      type: 'tel'
    }
  ];

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
              <Link to="/create-group" className="bg-[#FF6B9D] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#FF5A8A] transition-all duration-200 transform hover:scale-[1.02] flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Compartir una suscripción
              </Link>

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
                <button 
                  onClick={handleLogout}
                  disabled={loading}
                  className="text-[#4A4A4A] hover:text-[#0A0A0A] px-4 py-2 border border-[#E5E7EB] rounded-full text-sm font-medium transition-colors duration-200"
                >
                  {loading ? 'Cerrando...' : 'Cerrar sesión'}
                </button>
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
                  {/* Messages */}
                  {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6">
                      <strong className="font-bold">¡Éxito! </strong>
                      <span>{successMessage}</span>
                    </div>
                  )}
                  
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
                      <strong className="font-bold">Error: </strong>
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Profile Section */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-[#0A0A0A]">Perfil</h2>
                      <div className="flex items-center space-x-2">
                        {!isEditing ? (
                          <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center px-4 py-2 bg-[#059669] text-white rounded-xl hover:bg-[#10B981] transition-colors duration-200"
                          >
                            <Edit3 className="w-4 h-4 mr-2" />
                            Editar
                          </button>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              onClick={handleSaveChanges}
                              disabled={loading}
                              className="flex items-center px-4 py-2 bg-[#059669] text-white rounded-xl hover:bg-[#10B981] transition-colors duration-200 disabled:opacity-50"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              {loading ? 'Guardando...' : 'Guardar'}
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors duration-200"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancelar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <div className="relative mr-6">
                        <img
                          src={profileData.avatar}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover border-4 border-[#E5E7EB]"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0A0A0A] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors duration-200">
                          <Camera className="w-3 h-3 text-white" />
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
                            {isEditing ? (
                              field.type === 'select' ? (
                                <select
                                  value={field.value}
                                  onChange={(e) => handleInputChange(field.field, e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                                >
                                  {field.options?.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type={field.type}
                                  value={field.value}
                                  onChange={(e) => handleInputChange(field.field, e.target.value)}
                                  placeholder={field.placeholder}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                                />
                              )
                            ) : (
                              <div className="text-[#0A0A0A] font-medium">
                                {field.value || field.placeholder}
                              </div>
                            )}
                          </div>
                          {!isEditing && (
                            <ChevronRight className="w-5 h-5 text-[#9CA3AF] ml-4" />
                          )}
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
                            {isEditing && !field.disabled ? (
                              <input
                                type={field.type}
                                value={field.value}
                                onChange={(e) => handleInputChange(field.field, e.target.value)}
                                placeholder={field.placeholder}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                              />
                            ) : (
                              <div className={`font-medium ${
                                field.value && !field.value.includes('Agrega') ? 'text-[#0A0A0A]' : 'text-[#4A4A4A]'
                              }`}>
                                {field.value || field.placeholder}
                              </div>
                            )}
                          </div>
                          {!isEditing && (
                            <ChevronRight className="w-5 h-5 text-[#9CA3AF] ml-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div>
                  <h2 className="text-xl font-bold text-[#0A0A0A] mb-6">Medios de pago</h2>
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