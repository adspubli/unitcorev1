import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Edit3,
  Save,
  X,
  Camera
} from 'lucide-react';
import NavbarProfile from '../components/NavbarProfile';
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
    firstName: 'Tu nombre',
    lastName: '',
    nickname: '',
    birthDate: '',
    gender: 'Masculino',
    phone: ''
  });

  const profileData = {
    name: editableData.firstName && editableData.lastName
      ? `${editableData.firstName} ${editableData.lastName}`
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
          // Leer datos extendidos desde profiles
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name, nickname, birth_date, gender, phone')
            .eq('user_id', user.id)
            .single();
          setEditableData({
            firstName: profile?.first_name || '',
            lastName: profile?.last_name || '',
            nickname: profile?.nickname || '',
            birthDate: profile?.birth_date || '',
            gender: profile?.gender || 'Masculino',
            phone: user.phone || ''
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
      // Guardar todos los datos extendidos solo en la tabla profiles
      if (user) {
        const { error: dbError } = await supabase
          .from('profiles')
          .upsert({
            user_id: user.id,
            phone: editableData.phone ? editableData.phone : null,
            first_name: editableData.firstName,
            last_name: editableData.lastName,
            nickname: editableData.nickname,
            birth_date: editableData.birthDate ? editableData.birthDate : null,
            gender: editableData.gender
          }, { onConflict: 'user_id' });
        if (dbError) {
          setError('Error en base de datos: ' + dbError.message);
          return;
        }
        setSuccessMessage('¡Perfil actualizado exitosamente!');
        setIsEditing(false);
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = async () => {
    // Restaurar datos originales desde profiles y auth
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name, nickname, birth_date, gender, phone')
        .eq('user_id', user.id)
        .single();
      setEditableData({
        firstName: profile?.first_name || '',
        lastName: profile?.last_name || '',
        nickname: profile?.nickname || '',
        birthDate: profile?.birth_date || '',
        gender: profile?.gender || 'Masculino',
        phone: user.phone || ''
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
      <NavbarProfile avatarUrl={profileData.avatar} />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center text-sm text-[#6B7280]">
          <Link to="/dashboard" className="hover:text-[#059669] transition-colors duration-200">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#0A0A0A] font-medium">Mi perfil</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pb-24 md:pb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Profile Header */}
          <div className="px-4 sm:px-6 md:px-8 py-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Profile Picture */}
                <div className="relative mb-2 sm:mb-0">
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
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-[#0A0A0A] mb-1 break-words">
                    {profileData.name}
                  </h2>
                  <p className="text-[#4A4A4A] text-sm mb-2 break-all">
                    {profileData.email}
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start items-center space-x-4 text-sm text-[#4A4A4A]">
                    <span>Miembro verificado</span>
                    <span>Miembro desde enero 2024</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 md:gap-3 mt-4 md:mt-0">
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