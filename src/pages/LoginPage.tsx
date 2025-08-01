import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import UnitCoreLogo from '../UnitCore.svg'; // Asegúrate de que UnitCore.svg esté en src/

// Importa Supabase
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN DE SUPABASE ---
const supabaseUrl = 'https://ofkkjjdtorwsggozrmzn.supabase.co'; // Tu URL de proyecto de Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ma2tqamR0b3J3c2dnb3pybXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MjkyNjgsImV4cCI6MjA2OTQwNTI2OH0.tmKc7L71Dd7J2bfJMR6iXg_omp0U6k6_va_4_nuA_nY'; // Tu clave anon de Supabase

const supabase = createClient(supabaseUrl, supabaseAnonKey);
// --- FIN CONFIGURACIÓN DE SUPABASE ---

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null); // Nuevo estado para mensajes de éxito/info
  const [isResettingPassword, setIsResettingPassword] = useState(false); // Nuevo estado para controlar el modo de recuperación
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null); // Limpia mensajes al intentar login

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        console.log('Login exitoso:', data.user);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado durante el inicio de sesión.');
      console.error('Error de login:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null); // Limpia mensajes al intentar recuperación

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: window.location.origin + '/update-password', // URL donde el usuario restablecerá la contraseña
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Se ha enviado un correo electrónico a tu dirección para restablecer la contraseña. Por favor, revisa tu bandeja de entrada.');
        setFormData({ ...formData, password: '' }); // Limpia el campo de contraseña
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado al solicitar el restablecimiento.');
      console.error('Error de restablecimiento:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'twitter') => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin + '/dashboard',
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err: any) {
      setError(err.message || `Ocurrió un error inesperado con ${provider}.`);
      console.error(`Error con ${provider} login:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
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
            <Link to="/">
              <img
                src={UnitCoreLogo}
                alt="Logo de UnitCore"
                className="h-10 w-auto mx-auto"
              />
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-[#0A0A0A]">
              {isResettingPassword ? 'Restablecer contraseña' : 'Iniciar sesión'}
            </h2>
            <p className="mt-2 text-sm text-[#4A4A4A]">
              {isResettingPassword ? (
                <span className="font-medium">Ingresa tu correo para recibir el enlace de restablecimiento.</span>
              ) : (
                <>
                  ¿No tienes cuenta?{' '}
                  <Link
                    to="/register"
                    className="font-medium text-[#059669] hover:text-[#10B981] transition-colors duration-200"
                  >
                    Regístrate aquí
                  </Link>
                </>
              )}
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={isResettingPassword ? handlePasswordReset : handleSubmit}>
            {/* Mensaje de error */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {/* Mensaje de éxito/información */}
            {message && (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Información: </strong>
                <span className="block sm:inline">{message}</span>
              </div>
            )}

            <div className="space-y-4">
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

              {/* Password (solo visible en modo login) */}
              {!isResettingPassword && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
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
              )}
            </div>

            {/* Remember me & Forgot password (solo visible en modo login) */}
            {!isResettingPassword && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#059669] focus:ring-[#059669] border-[#E5E7EB] rounded"
                    disabled={loading}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-[#4A4A4A]">
                    Recordarme
                  </label>
                </div>

                <div className="text-sm">
                  {/* CAMBIO: Botón para cambiar al modo de recuperación */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsResettingPassword(true);
                      setError(null); // Limpia errores al cambiar de modo
                      setMessage(null); // Limpia mensajes al cambiar de modo
                    }}
                    className="font-medium text-[#059669] hover:text-[#10B981] transition-colors duration-200"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </div>
            )}

            {/* Botón de Submit */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#0A0A0A] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#059669] transition-all duration-200 transform hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? (isResettingPassword ? 'Enviando...' : 'Iniciando sesión...') : (isResettingPassword ? 'Enviar enlace de restablecimiento' : 'Iniciar sesión')}
              </button>
            </div>

            {/* Botón para volver al login (solo en modo de recuperación) */}
            {isResettingPassword && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsResettingPassword(false);
                    setError(null);
                    setMessage(null);
                  }}
                  className="font-medium text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors duration-200"
                >
                  Volver al inicio de sesión
                </button>
              </div>
            )}

            {/* Divider (solo visible en modo login) */}
            {!isResettingPassword && (
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E5E7EB]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#F7F9F8] text-[#4A4A4A]">O continúa con</span>
                </div>
              </div>
            )}

            {/* Social Login (solo visible en modo login) */}
            {!isResettingPassword && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
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
                  onClick={() => handleSocialLogin('twitter')}
                  className="w-full inline-flex justify-center py-3 px-4 border border-[#E5E7EB] rounded-xl bg-white text-sm font-medium text-[#4A4A4A] hover:bg-gray-50 transition-colors duration-200"
                  disabled={loading}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  <span className="ml-2">Twitter</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=1200&fit=crop&q=80"
          alt="Login background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#059669] to-[#10B981] opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-8">
            <h3 className="text-3xl font-bold mb-4">
              Únete a miles de usuarios
            </h3>
            <p className="text-lg opacity-90">
              Ahorra hasta un 75% en tus suscripciones favoritas compartiendo con otros usuarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;