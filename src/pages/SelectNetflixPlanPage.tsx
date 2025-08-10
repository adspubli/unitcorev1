import { useNavigate } from 'react-router-dom';

const netflixPlans = [
  {
    id: 'basic',
    name: 'Básico',
    price: '7,99€/mes',
    description: 'Calidad HD, 1 pantalla, descargas en 1 dispositivo.'
  },
  {
    id: 'standard',
    name: 'Estándar',
    price: '12,99€/mes',
    description: 'Calidad Full HD, 2 pantallas, descargas en 2 dispositivos.'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '17,99€/mes',
    description: 'Calidad 4K, 4 pantallas, descargas en 6 dispositivos.'
  }
];

export default function SelectNetflixPlanPage() {
  const navigate = useNavigate();
  //

  // Permite pasar el servicio como query param o path param si se desea reutilizar
  // const params = new URLSearchParams(location.search);
  // const service = params.get('service') || 'netflix';

  return (
    <div className="min-h-screen bg-[#F7F9F8] flex flex-col items-center justify-start py-12 px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-8 text-center">¿Qué plan de Netflix quieres compartir?</h1>
      <div className="w-full max-w-xl space-y-6">
        {netflixPlans.map(plan => (
          <button
            key={plan.id}
            onClick={() => navigate(`/create-group/configure?service=netflix&plan=${plan.id}`)}
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
    </div>
  );
}
