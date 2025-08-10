import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Ejemplo de planes por servicio (puedes expandir esto o traerlo de una API)
const servicePlans: Record<string, Array<{ id: string; name: string; price: string; description: string }>> = {
  netflix: [
    { id: 'basic', name: 'Básico', price: '7,99€/mes', description: 'Calidad HD, 1 pantalla, descargas en 1 dispositivo.' },
    { id: 'standard', name: 'Estándar', price: '12,99€/mes', description: 'Calidad Full HD, 2 pantallas, descargas en 2 dispositivos.' },
    { id: 'premium', name: 'Premium', price: '17,99€/mes', description: 'Calidad 4K, 4 pantallas, descargas en 6 dispositivos.' },
  ],
  spotify: [
    { id: 'individual', name: 'Individual', price: '9,99€/mes', description: '1 cuenta Premium.' },
    { id: 'duo', name: 'Duo', price: '12,99€/mes', description: '2 cuentas Premium para parejas.' },
    { id: 'family', name: 'Familiar', price: '15,99€/mes', description: 'Hasta 6 cuentas Premium.' },
  ],
  'youtube-premium': [
    { id: 'individual', name: 'Individual', price: '11,99€/mes', description: 'Sin anuncios, música y descargas.' },
    { id: 'family', name: 'Familiar', price: '17,99€/mes', description: 'Hasta 5 miembros del grupo familiar.' },
  ],
};

export default function SelectPlanPage() {
  const navigate = useNavigate();
  const { serviceId } = useParams<{ serviceId: string }>();
  const plans = servicePlans[serviceId || ''] || [];

  return (
    <div className="min-h-screen bg-[#F7F9F8] flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center justify-start py-12 px-4 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-8 text-center">
          {plans.length > 0
            ? `¿Qué plan de ${serviceId?.charAt(0).toUpperCase() + (serviceId?.slice(1) || '')} quieres compartir?`
            : 'No hay planes disponibles para este servicio.'}
        </h1>
        <div className="w-full max-w-xl space-y-6">
          {plans.map(plan => (
            <button
              key={plan.id}
              onClick={() => navigate(`/create-group/configure?service=${serviceId}&plan=${plan.id}`)}
              className="w-full text-left bg-white border-2 border-[#E5E7EB] hover:border-[#059669] rounded-2xl p-6 shadow-sm transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg md:text-xl font-bold text-[#0A0A0A] group-hover:text-[#059669]">{plan.name}</span>
                <span className="text-base md:text-lg font-semibold text-[#059669]">{plan.price}</span>
              </div>
              <div className="text-sm text-[#4A4A4A]">{plan.description}</div>
            </button>
          ))}
        </div>
      </main>
      {/* Footer futuro aquí */}
    </div>
  );
}
