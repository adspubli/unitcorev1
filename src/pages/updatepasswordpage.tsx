import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import UnitCoreLogo from '../UnitCore.svg'; // Asegúrate de que UnitCore.svg esté en src/

const UpdatePasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hasRecoverySession, setHasRecoverySession] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkSessionAndHash = async () => {
      console.log("UpdatePasswordPage: checkSessionAndHash ejecutado.");
      const { data: { session } } = await supabase.auth.getSession();
      const currentHash = window.location.hash;

      console.log("UpdatePasswordPage: Sesión actual:", session);
      console.log("UpdatePasswordPage: Hash de la URL:", currentHash);

      // Si hay una sesión Y el hash de la URL indica un tipo de recuperación,
      // entonces estamos en el flujo correcto.
      if (session && currentHash.includes('type=recovery')) {
        console.log("UpdatePasswordPage: Sesión de recuperación válida detectada.");
        setHasRecoverySession(true);
        setLoading(false);
      } else if (session && !currentHash.includes('type=recovery')) {
        // Si hay una sesión pero NO es de recuperación, el usuario ya está logueado normalmente.
        console.log("UpdatePasswordPage: Sesión normal detectada, redirigiendo a /dashboard.");
        navigate('/dashboard'); // Redirige al dashboard si ya está logueado y no es recuperación
      } else {
        // No hay sesión o el hash no es de recuperación, mostrar error y detener carga.
        console.log("UpdatePasswordPage: No hay sesión o hash de recuperación inválido.");
        setLoading(false);
        setError('Enlace de restablecimiento inválido o expirado. Por favor, solicita uno nuevo.');
      }
    };

    checkSessionAndHash(); 

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`UpdatePasswordPage: Auth event listener: ${event}, Session:`, session);
        if (event === 'PASSWORD_RECOVERY' && session) {
          console.log("UpdatePasswordPage: Evento PASSWORD_RECOVERY detectado.");
          setHasRecoverySession(true);
          setLoading(false);
          setError(null);
          setSuccessMessage(null);
        } else if (event === 'SIGNED_OUT') {
          console.log("UpdatePasswordPage: Evento SIGNED_OUT detectado.");
          setHasRecoverySession(false);
          setLoading(false);
          setError('Tu sesión de restablecimiento ha expirado. Por favor, solicita un nuevo enlace.');
        } else if (event === 'SIGNED_IN' && session && !window.location.hash.includes('type=recovery')) {
          // Si se loguea normalmente (y no es por recovery), redirigir
          console.log("UpdatePasswordPage: Evento SIGNED_IN (no recovery) detectado, redirigiendo a /dashboard.");
          navigate('/dashboard');
        }
      }
    );

    return () => {
      console.log("UpdatePasswordPage: Limpiando listener de autenticación.");
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    console.log("UpdatePasswordPage: Intentando restablecer contraseña...");
    if (!hasRecoverySession) {
      setError('No hay sesión de restablecimiento activa. Por favor, solicita un nuevo enlace.');
      setLoading(false);
      console.log("UpdatePasswordPage: Fallo: No hay sesión de recuperación.");
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      console.log("UpdatePasswordPage: Fallo: Contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) { 
        setError('La contraseña debe tener al menos 6 caracteres.');
        setLoading(false);
        console.log("UpdatePasswordPage: Fallo: Contraseña muy corta.");
        return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setError(error.message);
        console.log("UpdatePasswordPage: Error de Supabase al actualizar:", error.message);
      } else if (data.user) {
        setSuccessMessage('¡Contraseña actualizada exitosamente! Serás redirigido al inicio de sesión.');
        console.log("UpdatePasswordPage: Contraseña actualizada, redirigiendo a /login en 5 segundos.");
        // Aumentado el tiempo para que puedas ver el mensaje
        setTimeout(() => {
          navigate('/login'); 
        }, 5000); // Redirige al login después de 5 segundos
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado al actualizar la contraseña.');
      console.error('UpdatePasswordPage: Error inesperado al actualizar:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9F8]">
        <p className="text-[#4A4A4A]">Cargando...</p>
      </div>
    );
  }

  if (!hasRecoverySession && error) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F9F8]">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                <p className="text-red-700 mb-4">{error}</p>
                <Link to="/login" className="font-medium text-[#059669] hover:text-[#10B981] transition-colors duration-200">
                    Solicitar nuevo enlace de recuperación
                </Link>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Back Button */}
          <Link
            to="/login"
            className="inline-flex items-center text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio de sesión
          </Link>

          {/* Header */}
          <div className="text-center">
            <Link to="/">
              <img
                src={UnitCoreLogo}
                alt="Logo de UnitCore"
                className="h-10 w-auto mx-auto"
              />
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-[#0A0A0A]">
              Establecer nueva contraseña
            </h2>
            <p className="mt-2 text-sm text-[#4A4A4A]">
              Ingresa y confirma tu nueva contraseña.
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Mensaje de error */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {/* Mensaje de éxito */}
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">¡Éxito! </strong>
                <span className="block sm:inline">{successMessage}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Nueva Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Nueva Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-4 py-3 pr-12 border border-[#E5E7EB] placeholder-[#9CA3AF] text-[#0A0A0A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-[#9CA3AF] hover:text-[#4A4A4A] transition-colors duration-200" />
                    ) : (
                      <Eye className="h-5 w-5 text-[#9CA3AF] hover:text-[#4A4A4A] transition-colors duration-200" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirmar Nueva Contraseña */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Confirmar Nueva Contraseña
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none relative block w-full px-4 py-3 pr-12 border border-[#E5E7EB] placeholder-[#9CA3AF] text-[#0A0A0A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-[#9CA3AF] hover:text-[#4A4A4A] transition-colors duration-200" />
                    ) : (
                      <Eye className="h-5 w-5 text-[#9CA3AF] hover:text-[#4A4A4A] transition-colors duration-200" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#0A0A0A] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#059669] transition-all duration-200 transform hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? 'Actualizando...' : 'Restablecer Contraseña'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1200&fit=crop&q=80"
          alt="Password reset background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#059669] to-[#10B981] opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-8">
            <h3 className="text-3xl font-bold mb-4">
              Restablece tu acceso de forma segura
            </h3>
            <p className="text-lg opacity-90">
              Crea una nueva contraseña y vuelve a disfrutar de tus servicios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;

