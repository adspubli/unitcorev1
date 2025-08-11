import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchServices } from '../lib/api';

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

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        setError('Error al cargar los servicios.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    // CAMBIO: Fondo general de la sección a blanco
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern - CAMBIO: Patrón mucho más sutil en gris claro */}
      <div className="absolute inset-0 opacity-80"> {/* Aumenta la opacidad de la capa entera */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #F0F0F0 1px, transparent 1px)`, // Color del punto más claro
          backgroundSize: '20px 20px' // Tamaño del patrón más pequeño
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* CAMBIO: Texto del título a negro */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            Más de 300+ servicios disponibles
          </h2>
          {/* CAMBIO: Texto del párrafo a un gris suave */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra y comparte suscripciones de tus plataformas favoritas con otros usuarios.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {loading ? (
            <div className="col-span-3 text-center text-gray-500">Cargando servicios...</div>
          ) : error ? (
            <div className="col-span-3 text-center text-red-500">{error}</div>
          ) : services.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No hay servicios disponibles.</div>
          ) : (
            services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => navigate(`/select-plan/${service.slug}`)}
                className="group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 w-full text-left"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Service Logo */}
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center shadow-lg transition-shadow duration-300`}>
                    <img
                      src={service.logo_url}
                      alt={service.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                  </div>
                </div>
                {/* Service Info */}
                <div className="text-center">
                  <h3 className="text-[#0A0A0A] font-semibold text-lg mb-2">{service.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{service.description || 'Suscripción compartida'}</p>
                  <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    {service.base_price ? `Desde $${service.base_price}` : ''}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-50 rounded-2xl transition-opacity duration-300"></div>
              </button>
            ))
          )}
        </div>

        {/* CTA */}
        <div className="text-center">
          {/* CAMBIO: Botón con fondo oscuro y texto blanco para contraste en fondo claro */}
          <button className="bg-[#0A0A0A] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-200 transform hover:scale-105">
            Ver todos los servicios
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;