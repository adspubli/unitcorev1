import { useState } from 'react';
import { fetchServices, fetchPlansByService } from '../lib/api';
import { supabase } from '../lib/supabase';

export default function AdminPlansPage() {
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [plans, setPlans] = useState<any[]>([]);
  // const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: '', price: '', description: '', max_users: '' });
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function loadServices() {
    const data = await fetchServices();
    setServices(data);
  }

  async function loadPlans(service: any) {
    setSelectedService(service);
    const data = await fetchPlansByService(service.id);
    setPlans(data);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Panel Admin: Gestión de Planes</h1>
      <button
        className="mb-4 px-6 py-2 bg-[#059669] text-white rounded-lg font-semibold hover:bg-[#047857]"
        onClick={loadServices}
      >
        Cargar servicios
      </button>
      <div className="mb-8">
        {services.map(service => (
          <button
            key={service.id}
            className={`mr-2 mb-2 px-4 py-2 rounded border ${selectedService?.id === service.id ? 'bg-[#059669] text-white' : 'bg-white text-[#059669] border-[#059669]'}`}
            onClick={() => loadPlans(service)}
          >
            {service.name}
          </button>
        ))}
      </div>
      {selectedService && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Planes de {selectedService.name}</h2>
          <button
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setShowForm(v => !v)}
          >
            {showForm ? 'Cancelar' : 'Agregar plan'}
          </button>
          {showForm && (
            <form
              className="bg-white border p-6 rounded shadow flex flex-col gap-4 mb-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setCreating(true);
                setFormError(null);
                try {
                  const { error } = await supabase.from('plans').insert({
                    service_id: selectedService.id,
                    name: newPlan.name,
                    price: parseFloat(newPlan.price),
                    description: newPlan.description,
                    max_users: parseInt(newPlan.max_users, 10)
                  });
                  if (error) throw error;
                  setShowForm(false);
                  setNewPlan({ name: '', price: '', description: '', max_users: '' });
                  // Recargar planes
                  const plansData = await fetchPlansByService(selectedService.id);
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
          <div className="space-y-4">
            {plans.map(plan => (
              <div key={plan.id} className="bg-white border rounded p-4 flex flex-col">
                <span className="font-bold">{plan.name}</span>
                <span className="text-green-600 font-semibold">${plan.price}</span>
                <span className="text-sm text-gray-500">{plan.description}</span>
                <span className="text-xs text-gray-400">Máx. usuarios: {plan.max_users}</span>
              </div>
            ))}
            {plans.length === 0 && <div className="text-gray-500">No hay planes para este servicio.</div>}
          </div>
        </div>
      )}
    </div>
  );
}
