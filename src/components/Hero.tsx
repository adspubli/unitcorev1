import React from 'react';
import { Link } from 'react-router-dom';
import UserAvatars from './UserAvatars';

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Updated Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#059669] bg-opacity-10 text-[#059669] text-sm font-medium mb-8 animate-fade-in">
          <div className="w-2 h-2 bg-[#059669] rounded-full mr-2"></div>
          Actualizado
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A0A0A] leading-tight mb-6 animate-slide-up">
          Comparte el precio de
          <br />
          <span className="bg-gradient-to-r from-[#059669] to-[#10B981] bg-clip-text text-transparent">
            tus suscripciones Premium
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#4A4A4A] max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up-delayed">
          Economiza en tus suscripciones uniéndote a la
          <br className="hidden sm:block" />
          comunidad más grande de co-suscripciones.
        </p>

        {/* User Avatars */}
        <div className="mb-12 animate-fade-in-delayed">
          <UserAvatars />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-slide-up-delayed-2">
          <Link 
            to="/register"
            className="bg-[#0A0A0A] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
          >
            Crear mi cuenta →
          </Link>
          <Link 
            to="/login"
            className="border border-[#E5E7EB] text-[#4A4A4A] px-8 py-3 rounded-full text-lg font-semibold hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-all duration-200 transform hover:scale-[1.02]"
          >
            Iniciar sesión
          </Link>
        </div>

        {/* Trust Indicator */}
        <div className="flex items-center justify-center text-sm text-[#4A4A4A] animate-fade-in-delayed-2">
          <span className="mr-2">Ver nuestras</span>
          <span className="font-semibold text-[#0A0A0A]">4,619</span>
          <span className="mx-2">reseñas en</span>
          <div className="flex items-center">
            <span className="text-[#00B67A] mr-1">★</span>
            <span className="font-semibold text-[#00B67A]">Trustpilot</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;