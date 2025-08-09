import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import UnitCoreLogo from '../UnitCore.svg'; // Asegúrate de que UnitCore.svg esté en src/

// Importa Supabase
import { supabase } from '../lib/supabase';

// ...existing code...

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga
  const [error, setError] = useState<string | null>(null); // Estado para mensajes de error
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Estado para mensaje de éxito
  // const navigate = useNavigate(); // Hook para la navegación programática (no usado)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Validación básica de contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }
    if (!formData.acceptTerms) {
      setError('Debes aceptar los términos y condiciones.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
          emailRedirectTo: window.location.origin + '/dashboard', // Redirige al dashboard después de la confirmación de email
        },
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        setSuccessMessage('¡Registro exitoso! Por favor, revisa tu correo electrónico para confirmar tu cuenta.');
        // Opcional: limpiar el formulario después del registro exitoso
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          acceptTerms: false
        });
        // Podrías redirigir al login o a una página de "Revisa tu correo"
        // navigate('/login'); 
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado durante el registro.');
      console.error('Error de registro:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para registrarse con proveedores sociales (Google, Twitter)
  const handleSocialRegister = async (provider: 'google' | 'twitter') => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin + '/dashboard', // Redirige al dashboard después del registro social
        },
      });

      if (error) {
        setError(error.message);
      }
      // Supabase redirigirá automáticamente al usuario al proveedor y luego de vuelta a redirectTo
    } catch (err: any) {
      setError(err.message || `Ocurrió un error inesperado con ${provider}.`);
      console.error(`Error con ${provider} registro:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1200&fit=crop&q=80"
          alt="Register background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#059669] to-[#10B981] opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-8">
            <h3 className="text-3xl font-bold mb-4">
              Comienza a ahorrar hoy
            </h3>
            <p className="text-lg opacity-90">
              Crea tu cuenta y accede a más de 300 servicios para compartir suscripciones.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>

          {/* Header */}
          <div className="text-center">
            {/* LOGO DE UNITCORE */}
            <Link to="/">
              <img
                src={UnitCoreLogo}
                alt="Logo de UnitCore"
                className="h-10 w-auto mx-auto"
              />
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-[#0A0A0A]">
              Crear cuenta
            </h2>
            <p className="mt-2 text-sm text-[#4A4A4A]">
              ¿Ya tienes cuenta?{' '}
              <Link 
                to="/login" 
                className="font-medium text-[#059669] hover:text-[#10B981] transition-colors duration-200"
              >
                Inicia sesión aquí
              </Link>
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
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                    Nombre
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-4 py-3 border border-[#E5E7EB] placeholder-[#9CA3AF] text-[#0A0A0A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200"
                    placeholder="Juan"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                    Apellido
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-4 py-3 border border-[#E5E7EB] placeholder-[#9CA3AF] text-[#0A0A0A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200"
                    placeholder="Pérez"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-4 py-3 border border-[#E5E7EB] placeholder-[#9CA3AF] text-[#0A0A0A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200"
                  placeholder="tu@email.com"
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
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

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
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

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#059669] focus:ring-[#059669] border-[#E5E7EB] rounded"
                  disabled={loading}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="acceptTerms" className="text-[#4A4A4A]">
                  Acepto los{' '}
                  <a href="#" className="font-medium text-[#059669] hover:text-[#10B981] transition-colors duration-200">
                    términos y condiciones
                  </a>{' '}
                  y la{' '}
                  <a href="#" className="font-medium text-[#059669] hover:text-[#10B981] transition-colors duration-200">
                    política de privacidad
                  </a>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit" // Cambiado a type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#0A0A0A] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#059669] transition-all duration-200 transform hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? 'Creando cuenta...' : 'Crear mi cuenta'}
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#F7F9F8] text-[#4A4A4A]">O regístrate con</span>
              </div>
            </div>

            {/* Social Registration */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialRegister('google')} // Conecta con la función de registro social
                className="w-full inline-flex justify-center py-3 px-4 border border-[#E5E7EB] rounded-xl bg-white text-sm font-medium text-[#4A4A4A] hover:bg-gray-50 transition-colors duration-200"
                disabled={loading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialRegister('twitter')} // Conecta con la función de registro social
                className="w-full inline-flex justify-center py-3 px-4 border border-[#E5E7EB] rounded-xl bg-white text-sm font-medium text-[#4A4A4A] hover:bg-gray-50 transition-colors duration-200"
                disabled={loading}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                <span className="ml-2">Twitter</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;