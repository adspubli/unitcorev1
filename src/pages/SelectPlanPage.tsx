import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { fetchServices, fetchPlansByService } from '../lib/api';
import { supabase } from '../lib/supabase';
import { useWizardStore } from '../store/wizard';

type Service = {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  base_price: number;
  max_users: number;
  created_at: string;
  slug: string;
};

type Plan = {
  id: string;
  service_id: string;
  name: string;
  price: number;
  description: string;
  max_users: number;
  created_at: string;
  slug: string;
};


type NewPlan = {
  name: string;
  price: string;
  description: string;
  max_users: string;
};

export default function SelectPlanPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newPlan, setNewPlan] = useState<NewPlan>({ name: '', price: '', description: '', max_users: '' });
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        if (slug) {
          // Buscar el servicio por slug
          const services = await fetchServices();
          const foundService = services.find((s: Service) => s.slug === slug);
          setService(foundService || null);
          if (foundService) {
            // Buscar los planes de ese servicio
            const plansData = await fetchPlansByService(foundService.id);
            setPlans(plansData);
          } else {
            setPlans([]);
          }
        }
      } catch (err: any) {
        console.error('Error al cargar los datos:', err);
        setError('Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#F7F9F8] flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center justify-start py-12 px-4 flex-1">
        {/* Botón de retroceso */}
        <button
          className="absolute left-0 top-0 mt-2 ml-2 bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
          onClick={() => navigate(-1)}
          aria-label="Volver"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {loading ? (
          <div className="text-lg text-gray-500">Cargando...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-8 text-center">
              {plans.length > 0 && service
                ? `¿Qué plan de ${service.name} quieres compartir?`
                : 'No hay planes disponibles para este servicio.'}
            </h1>
            {plans.length === 0 && service && (
              <div className="w-full max-w-xl mb-8 flex flex-col items-center">
                <button
                  className="mb-4 px-6 py-2 bg-[#059669] text-white rounded-lg font-semibold hover:bg-[#047857]"
                  onClick={() => setShowForm((v) => !v)}
                >
                  {showForm ? 'Cancelar' : 'Agregar un plan'}
                </button>
                {showForm && (
                  <form
                    className="w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setCreating(true);
                      setFormError(null);
                      try {
                        const { error } = await supabase.from('plans').insert({
                          service_id: service.id,
                          name: newPlan.name,
                          price: parseFloat(newPlan.price),
                          description: newPlan.description,
                          max_users: parseInt(newPlan.max_users, 10)
                        });
                        if (error) throw error;
                        setShowForm(false);
                        setNewPlan({ name: '', price: '', description: '', max_users: '' });
                        // Recargar planes
                        const plansData = await fetchPlansByService(service.id);
                        setPlans(plansData);
                      } catch (err: any) {
                        setFormError('Error al crear el plan.');
                      } finally {
                        setCreating(false);
                      }
                    }}
                  >
                    <input
                      className="border rounded px-3 py-2"
                      placeholder="Nombre del plan"
                      value={newPlan.name}
                      onChange={e => setNewPlan({ ...newPlan, name: e.target.value })}
                      required
                    />
                    <input
                      className="border rounded px-3 py-2"
                      placeholder="Precio"
                      type="number"
                      step="0.01"
                      value={newPlan.price}
                      onChange={e => setNewPlan({ ...newPlan, price: e.target.value })}
                      required
                    />
                    <input
                      className="border rounded px-3 py-2"
                      placeholder="Cantidad máxima de usuarios"
                      type="number"
                      value={newPlan.max_users}
                      onChange={e => setNewPlan({ ...newPlan, max_users: e.target.value })}
                      required
                    />
                    <textarea
                      className="border rounded px-3 py-2"
                      placeholder="Descripción"
                      value={newPlan.description}
                      onChange={e => setNewPlan({ ...newPlan, description: e.target.value })}
                      required
                    />
                    <button
                      type="submit"
                      className="bg-[#059669] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#047857]"
                      disabled={creating}
                    >
                      {creating ? 'Creando...' : 'Crear plan'}
                    </button>
                    {formError && <div className="text-red-500 text-sm">{formError}</div>}
                  </form>
                )}
              </div>
            )}
            <div className="w-full max-w-xl space-y-6">
              {plans.map(plan => (
                <button
                  key={plan.id}
                  onClick={() => {
                    if (service) {
                      useWizardStore.getState().setService(service);
                      useWizardStore.getState().setPlan(plan);
                      useWizardStore.getState().setSlots(Math.max(1, (plan.max_users || 1) - 1));
                      navigate('/share-slots');
                    }
                  }}
                  className="w-full text-left bg-white border-2 border-[#E5E7EB] hover:border-[#059669] rounded-2xl p-6 shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg md:text-xl font-bold text-[#0A0A0A] group-hover:text-[#059669]">{plan.name}</span>
                    <span className="text-base md:text-lg font-semibold text-[#059669]">${plan.price}</span>
                  </div>
                  <div className="text-sm text-[#4A4A4A]">{plan.description}</div>
                </button>
              ))}
            </div>
          </>
        )}
      </main>
      {/* Footer futuro aquí */}
    </div>
  );
}
