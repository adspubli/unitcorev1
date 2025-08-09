import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home,
  Search,
  MessageCircle,
  User,
  Edit3,
  Save,
  X,
  Camera,
  ArrowLeft,
  Bell
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const ProfilePage = () => {
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

  return (
    <div className="min-h-screen bg-[#F7F9F8]">
      {/* Top Navigation - Figma Design */}
      <nav className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side - Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-[#0A0A0A] tracking-tight">
                Splitit
              </Link>
            </div>

            {/* Center - Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#9CA3AF]" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar servicios..."
                  className="block w-full pl-10 pr-3 py-2 border border-[#E5E7EB] rounded-full bg-[#F9FAFB] text-sm placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Right Side - Navigation Icons */}
            <div className="flex items-center space-x-6">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/dashboard" className="p-2 text-[#4A4A4A] hover:text-[#059669] transition-colors duration-200 rounded-lg">
                  <Home className="w-6 h-6" />
                  <span className="sr-only">Inicio</span>
                </Link>
                <Link to="/explore" className="p-2 text-[#4A4A4A] hover:text-[#059669] transition-colors duration-200 rounded-lg">
                  <Search className="w-6 h-6" />
                  <span className="sr-only">Explorar</span>
                </Link>
                <button className="p-2 text-[#4A4A4A] hover:text-[#059669] transition-colors duration-200 rounded-lg">
                  <MessageCircle className="w-6 h-6" />
                  <span className="sr-only">Mensajes</span>
                </button>
                <button className="p-2 text-[#4A4A4A] hover:text-[#059669] transition-colors duration-200 rounded-lg relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#EF4444] rounded-full"></span>
                  <span className="sr-only">Notificaciones</span>
                </button>
              </div>

              {/* CTA Button */}
              <Link
                to="/create-group"
                className="hidden md:flex bg-[#059669] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#10B981] transition-all duration-200 transform hover:scale-[1.02] items-center"
              >
                Crear grupo
              </Link>

              {/* Profile Avatar - Active State */}
              <Link to="/profile" className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-[#059669] p-0.5">
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#10B981] rounded-full border-2 border-white"></div>
                <span className="sr-only">Inicio</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] z-50">
          <div className="grid grid-cols-5 h-16">
            <Link to="/dashboard" className="flex flex-col items-center justify-center text-[#9CA3AF] hover:text-[#059669] transition-colors duration-200">
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Inicio</span>
            </Link>
            <Link to="/explore" className="flex flex-col items-center justify-center text-[#9CA3AF] hover:text-[#059669] transition-colors duration-200">
              <Search className="w-6 h-6" />
              <span className="text-xs mt-1">Buscar</span>
            </Link>
            <Link to="/create-group" className="flex flex-col items-center justify-center text-[#9CA3AF] hover:text-[#059669] transition-colors duration-200">
              <div className="w-8 h-8 bg-[#059669] rounded-full flex items-center justify-center mb-1">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xs">Crear</span>
            </Link>
            <button className="flex flex-col items-center justify-center text-[#9CA3AF] hover:text-[#059669] transition-colors duration-200 relative">
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs mt-1">Mensajes</span>
            </button>
            <Link to="/profile" className="flex flex-col items-center justify-center text-[#059669] transition-colors duration-200">
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Perfil</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm text-[#6B7280]">
          <Link to="/dashboard" className="hover:text-[#059669] transition-colors duration-200">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#0A0A0A] font-medium">Mi perfil</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Profile Header */}
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Profile Picture */}
                <div className="relative">
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#0A0A0A] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors duration-200 shadow-lg">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Profile Info */}
                <div>
                  <h2 className="text-2xl font-bold text-[#0A0A0A] mb-1">
                    {profileData.name}
                  </h2>
                  <p className="text-[#4A4A4A] text-sm mb-2">
                    {profileData.email}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-[#4A4A4A]">
                    <span>🌟 Miembro verificado</span>
                    <span>📅 Miembro desde enero 2024</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {!isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center px-4 py-2 bg-[#059669] text-white rounded-xl hover:bg-[#10B981] transition-colors duration-200"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Editar perfil
                    </button>
                    <button
                      onClick={handleLogout}
                      disabled={loading}
                      className="px-4 py-2 border border-[#E5E7EB] text-[#4A4A4A] rounded-xl hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors duration-200"
                    >
                      {loading ? 'Cerrando...' : 'Cerrar sesión'}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSaveChanges}
                      disabled={loading}
                      className="flex items-center px-4 py-2 bg-[#059669] text-white rounded-xl hover:bg-[#10B981] transition-colors duration-200 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Messages */}
          {successMessage && (
            <div className="mx-8 mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl">
              <strong className="font-bold">¡Éxito! </strong>
              <span>{successMessage}</span>
            </div>
          )}
          
          {error && (
            <div className="mx-8 mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              <strong className="font-bold">Error: </strong>
              <span>{error}</span>
            </div>
          )}

          {/* Profile Form */}
          <div className="px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Nombre
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                    placeholder="Ingresa tu nombre"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-[#0A0A0A] font-medium">
                    {editableData.firstName || 'No especificado'}
                  </div>
                )}
              </div>

              {/* Apellido */}
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Apellido
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                    placeholder="Ingresa tu apellido"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-[#0A0A0A] font-medium">
                    {editableData.lastName || 'No especificado'}
                  </div>
                )}
              </div>

              {/* Seudónimo */}
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Seudónimo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                    placeholder="Agrega tu seudónimo"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-[#0A0A0A] font-medium">
                    {editableData.nickname || 'No especificado'}
                  </div>
                )}
              </div>

              {/* Email (no editable) */}
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Correo electrónico
                </label>
                <div className="w-full px-4 py-3 bg-gray-100 rounded-xl text-[#4A4A4A] font-medium">
                  {profileData.email}
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Teléfono
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editableData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                    placeholder="+1 234 567 8900"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-[#0A0A0A] font-medium">
                    {editableData.phone || 'No especificado'}
                  </div>
                )}
              </div>

              {/* Fecha de nacimiento */}
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Fecha de nacimiento
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editableData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-[#0A0A0A] font-medium">
                    {editableData.birthDate ? new Date(editableData.birthDate).toLocaleDateString('es-ES') : 'No especificado'}
                  </div>
                )}
              </div>

              {/* Género */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Género
                </label>
                {isEditing ? (
                  <select
                    value={editableData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                    <option value="Prefiero no decir">Prefiero no decir</option>
                  </select>
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-[#0A0A0A] font-medium">
                    {editableData.gender}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-[#0A0A0A] mb-4">Estadísticas del perfil</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-xl">
                <div className="text-2xl font-bold text-[#059669] mb-1">5</div>
                <div className="text-sm text-[#4A4A4A]">Suscripciones activas</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <div className="text-2xl font-bold text-[#059669] mb-1">€127</div>
                <div className="text-sm text-[#4A4A4A]">Ahorrado este mes</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <div className="text-2xl font-bold text-[#059669] mb-1">4.9</div>
                <div className="text-sm text-[#4A4A4A]">Calificación promedio</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;