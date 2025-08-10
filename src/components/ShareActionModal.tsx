import React from 'react';
import { Link } from 'react-router-dom';

interface ShareActionModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareActionModal: React.FC<ShareActionModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full relative mx-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 p-2 text-[#9CA3AF] hover:text-[#4A4A4A] transition-colors duration-200 rounded-lg"
        >
          <span style={{fontSize: 24, fontWeight: 'bold'}}>×</span>
        </button>
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#0A0A0A] mb-4">¿Qué quieres hacer?</h2>
        </div>
        <div className="space-y-4">
          <Link
            to="/create-group"
            onClick={onClose}
            className="block w-full p-4 border-2 border-[#E5E7EB] rounded-xl hover:border-[#059669] transition-colors duration-200 group"
          >
            <div className="text-center">
              <h3 className="font-semibold text-[#0A0A0A] mb-2 group-hover:text-[#059669] text-base md:text-lg">Compartir</h3>
              <p className="text-xs md:text-sm text-[#4A4A4A]">
                Soy el/la propietario(a) de una suscripción y quiero compartirla.
              </p>
            </div>
          </Link>
          <Link
            to="/explore"
            onClick={onClose}
            className="block w-full p-4 border-2 border-[#E5E7EB] rounded-xl hover:border-[#059669] transition-colors duration-200 group"
          >
            <div className="text-center">
              <h3 className="font-semibold text-[#0A0A0A] mb-2 group-hover:text-[#059669] text-base md:text-lg">Suscribir</h3>
              <p className="text-xs md:text-sm text-[#4A4A4A]">
                Quiero suscribirme a una suscripción.
              </p>
            </div>
          </Link>
        </div>
        <div className="mt-6 text-center">
          <p className="text-xs md:text-sm text-[#FF6B9D] font-medium">¡Fácil!</p>
        </div>
      </div>
    </div>
  );
};

export default ShareActionModal;
