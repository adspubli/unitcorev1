import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import CreateGroupPage from './pages/CreateGroupPage';
import GroupDetailsPage from './pages/GroupDetailsPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage.tsx'; // ¡Aquí está el cambio!
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN DE SUPABASE ---
// Asegúrate de que estos valores sean los mismos que en LoginPage y RegisterPage
const supabaseUrl = 'https://ofkkjjdtorwsggozrmzn.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ma2tqamR0b3J3c2dnb3pybXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MjkyNjgsImV4cCI6MjA2OTQwNTI2OH0.tmKc7L71Dd7J2bfJMR6iXg_omp0U6k6_va_4_nuA_nY'; 

const supabase = createClient(supabaseUrl, supabaseAnonKey);
// --- FIN CONFIGURACIÓN DE SUPABASE ---

// Nuevo componente para manejar la lógica de autenticación global y redirecciones
const AuthInitializer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthInitializer: Setting up auth listener.");
    
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`AuthInitializer: Auth event: ${event}, Session:`, session);
      
      const currentPath = window.location.pathname;
      const currentHash = window.location.hash;

      // Definir páginas públicas
      const publicPaths = ['/', '/login', '/register', '/update-password', '/explore']; 
      const isGroupPath = currentPath.startsWith('/group/');

      // Lógica de redirección
      if (session) {
        // Si hay una sesión activa
        // EXCEPCIÓN CLAVE: Si la URL es de restablecimiento de contraseña, NO redirigir.
        if (currentPath === '/update-password' && currentHash.includes('type=recovery')) {
          console.log("AuthInitializer: User is in password recovery flow. NOT redirecting.");
          return; // Detener la ejecución del listener para permitir que UpdatePasswordPage cargue
        }
        
        // Si el usuario está logueado y en las páginas de login/registro, redirigir al dashboard
        if (currentPath === '/login' || currentPath === '/register') {
          console.log("AuthInitializer: User is signed in and on login/register. Redirecting to dashboard.");
          navigate('/dashboard');
        }
        // Para todas las demás rutas (incluyendo '/', '/dashboard', etc.),
        // si el usuario está logueado, le permitimos permanecer.
      } else {
        // Si NO hay sesión
        // Si no está logueado e intenta acceder a una página NO pública, redirigir al login
        if (!publicPaths.includes(currentPath) && !isGroupPath) {
          console.log("AuthInitializer: User is NOT signed in and trying to access protected page. Redirecting to login.");
          navigate('/login');
        }
      }
    });

    // Función de limpieza para desuscribirse cuando el componente AuthInitializer se desmonte
    return () => {
      console.log("AuthInitializer: Cleaning up auth listener.");
      authListener.subscription.unsubscribe();
    };
  }, [navigate]); // navigate es una dependencia para useEffect porque se usa dentro del efecto

  return null; // Este componente no renderiza nada visible, solo maneja la lógica
};


function App() {
  return (
    <Router>
      {/* Renderiza AuthInitializer dentro del Router */}
      <AuthInitializer /> 
      <div className="min-h-screen bg-[#F7F9F8] font-inter">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/create-group" element={<CreateGroupPage />} />
          <Route path="/group/:id" element={<GroupDetailsPage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
