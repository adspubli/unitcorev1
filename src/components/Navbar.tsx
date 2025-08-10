import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative bg-[#F7F9F8] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#0A0A0A] tracking-tight">
              Unitcore
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#"
                className="text-[#4A4A4A] hover:text-[#0A0A0A] px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                ¿Cómo funciona?
              </a>
              <a
                href="#"
                className="text-[#4A4A4A] hover:text-[#0A0A0A] px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Servicios
              </a>
              <a
                href="#"
                className="text-[#4A4A4A] hover:text-[#0A0A0A] px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Precios
              </a>
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              to="/login"
              className="text-[#4A4A4A] hover:text-[#0A0A0A] px-4 py-2 text-sm font-medium transition-colors duration-200"
            >
              Iniciar sesión
            </Link>
            <Link 
              to="/register"
              className="bg-[#0A0A0A] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Registrarse
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#4A4A4A] hover:text-[#0A0A0A] p-2"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-b border-gray-100 z-50">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a
              href="#"
              className="block text-[#4A4A4A] hover:text-[#0A0A0A] px-3 py-2 text-base font-medium"
            >
              ¿Cómo funciona?
            </a>
            <a
              href="#"
              className="block text-[#4A4A4A] hover:text-[#0A0A0A] px-3 py-2 text-base font-medium"
            >
              Servicios
            </a>
            <a
              href="#"
              className="block text-[#4A4A4A] hover:text-[#0A0A0A] px-3 py-2 text-base font-medium"
            >
              Precios
            </a>
            <div className="pt-4 border-t border-gray-200">
              <Link 
                to="/login"
                className="block w-full text-center text-[#4A4A4A] hover:text-[#0A0A0A] px-3 py-2 text-base font-medium mb-2"
              >
                Iniciar sesión
              </Link>
              <Link 
                to="/register"
                className="block w-full bg-[#0A0A0A] text-white px-6 py-2 rounded-full text-base font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;