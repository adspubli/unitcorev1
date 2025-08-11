import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWizardStore } from "../store/wizard";

const CONEXION_FEE = 0.88;

export default function OfferSummaryPage() {
  const navigate = useNavigate();
  const { plan, service, slots } = useWizardStore();
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [checking, setChecking] = useState(false);

  // Validación: si no hay plan o servicio, redirigir al inicio del flujo
  useEffect(() => {
    if (!plan || !service) {
      navigate("/create-group", { replace: true });
    }
  }, [plan, service, navigate]);
  if (!plan || !service) return null;
  const plazas = slots;
  const precioPorPersona = plan ? (plan.price / plan.max_users).toFixed(2) : "-";

  const handleCheckPhone = () => {
    setChecking(true);
    // Simulación de validación
    setTimeout(() => {
      setPhoneValid(/^\d{9}$/.test(phone));
      setChecking(false);
    }, 800);
  };

  // No loading/error states, ya que todo viene del store

  return (
    <div className="min-h-screen bg-[#fff] flex flex-col">
      <header className="flex items-center px-8 py-4 border-b">
        <button
          className="bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
          onClick={() => navigate(-1)}
          aria-label="Volver"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </header>
      <main className="flex flex-col items-center flex-1 py-8">
        <h2 className="text-3xl font-bold mb-2 text-center">¡ Está todo listo !</h2>
        <div className="mb-4 text-center text-gray-700">Ya puedes publicar tu anuncio.</div>
        <div className="mb-6 text-center">
          <div className="font-bold">{service.name}</div>
          <div>{plan.name}</div>
          <div>{plazas} plazas</div>
          <div className="font-bold text-lg">{precioPorPersona}€ por persona</div>
        </div>
        <div className="w-full max-w-2xl bg-[#F7FCFD] border border-[#E5F6FB] rounded-xl py-4 px-6 mb-8 text-center">
          <span className="font-bold text-lg">Tarifa de conexión : <span className="text-cyan-600">{CONEXION_FEE.toFixed(2)}€</span></span>
          <div className="text-gray-500 text-sm mt-1">Sólo el primer mes para cada co-suscriptor que se une a tu suscripción.</div>
        </div>
        <div className="w-full max-w-2xl bg-[#2B234A] rounded-xl p-8 mb-8 flex flex-col items-center">
          <div className="text-white text-xl font-bold mb-2 text-center">Validar mi teléfono</div>
          <div className="text-gray-300 text-center text-sm mb-4">Nos permite certificar tu cuenta verificando tu número.</div>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-white text-2xl">🇪🇸</span>
            <input
              className="bg-transparent border-b-2 border-cyan-400 text-white text-2xl px-2 py-1 w-48 focus:outline-none text-center"
              placeholder="612 34 56 78"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
              maxLength={9}
              disabled={phoneValid}
            />
          </div>
          <button
            className="px-8 py-2 border-2 border-cyan-400 text-cyan-200 rounded-full font-semibold text-lg hover:bg-cyan-50 hover:text-cyan-700 transition mb-2"
            onClick={handleCheckPhone}
            disabled={phone.length !== 9 || phoneValid || checking}
          >
            {phoneValid ? "Validado" : checking ? "Comprobando..." : "Comprobar"}
          </button>
        </div>
        <div className="w-full max-w-2xl flex items-center mb-6">
          <input
            type="checkbox"
            id="terms"
            className="mr-2"
            checked={termsAccepted}
            onChange={e => setTermsAccepted(e.target.checked)}
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            Reconozco y acepto que <b>Spliiit</b> y <b>{service.name}</b> no están en ningún caso vinculados por los servicios prestados en la plataforma. A este respecto, confirmo que he leído los <b>Términos y Condiciones de {service.name}</b> y me comprometo a respetarlos, siendo yo el único responsable.
          </label>
        </div>
        <button
          className="px-12 py-3 rounded-full text-white text-lg font-bold bg-cyan-200 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={!phoneValid || !termsAccepted}
        >
          Publicar
        </button>
      </main>
    </div>
  );
}
