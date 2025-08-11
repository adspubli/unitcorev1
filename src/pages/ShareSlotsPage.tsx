import { useNavigate } from "react-router-dom";
import { useWizardStore } from "../store/wizard";
import { useEffect } from "react";

const ShareSlotsPage = () => {
  const navigate = useNavigate();
  const { plan, service, slots, setSlots } = useWizardStore();

  useEffect(() => {
    if (!plan || !service) {
      navigate('/create-group', { replace: true });
    }
  }, [plan, service, navigate]);
  if (!plan || !service) return null;

  const maxCompartir = Math.max(1, (plan.max_users || 1) - 1);
  const minCompartir = 1;
  const precioRecuperar = ((plan.price || 0) / (plan.max_users || 1)) * slots;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <button
          className="bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
          onClick={() => navigate(-1)}
          aria-label="Volver"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <img src="/UnitCore.svg" alt="Logo" className="h-8" />
        <div></div>
      </header>
      <main className="flex flex-col items-center flex-1 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">¿Cuántas plazas quieres compartir?</h2>
        <div className="flex items-center space-x-8 mb-2">
          <button
            className={`rounded-full border-2 border-cyan-400 w-12 h-12 flex items-center justify-center text-3xl font-bold ${slots <= minCompartir ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-50'}`}
            onClick={() => slots > minCompartir && setSlots(slots - 1)}
            disabled={slots <= minCompartir}
          >
            -
          </button>
          <span className="text-4xl font-bold text-black">{slots}</span>
          <button
            className={`rounded-full border-2 border-cyan-400 w-12 h-12 flex items-center justify-center text-3xl font-bold ${slots >= maxCompartir ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-50'}`}
            onClick={() => slots < maxCompartir && setSlots(slots + 1)}
            disabled={slots >= maxCompartir}
          >
            +
          </button>
        </div>
        <div className="mb-6 text-lg text-gray-700">
          Recuperarás <span className="text-cyan-600 font-bold">{precioRecuperar.toFixed(2)} € / mes</span>
        </div>
        <button
          className="px-8 py-2 border-2 border-cyan-400 text-cyan-600 rounded-full font-semibold text-lg hover:bg-cyan-50 transition mb-8"
          onClick={() => navigate('/offer-summary')}
        >
          Seguir
        </button>
        <div className="w-full max-w-xl mt-4">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-700">
            <span className="text-pink-600 font-bold">¡Fácil !</span>
            <br />
            Cantidad de plazas disponibles en tu suscripción, sin contarte.
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShareSlotsPage;
