import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import SelectPlanPage from './pages/SelectPlanPage';
import ShareSlotsPage from './pages/ShareSlotsPage';
import OfferSummaryPage from './pages/OfferSummaryPage';
import AdminPlansPage from './pages/AdminPlansPage';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import CreateGroupPage from './pages/CreateGroupPage';
import GroupDetailsPage from './pages/GroupDetailsPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import { supabase } from './lib/supabase';

import LandingPage from './pages/LandingPage';

// ...existing code...

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
          <Route path="/group/:slug/:id" element={<GroupDetailsPage />} />
          <Route path="/group/:id" element={<GroupDetailsPage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="/select-plan/:slug" element={<SelectPlanPage />} />
          <Route path="/select-plan" element={<LandingPage />} />
          <Route path="/admin-plans" element={<AdminPlansPage />} />
          <Route path="/share-slots" element={<ShareSlotsPage />} />
          <Route path="/offer-summary" element={<OfferSummaryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
