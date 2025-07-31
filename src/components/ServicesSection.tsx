import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      name: 'Netflix',
      logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=60&h=60&fit=crop',
      // Mantengo los colores aquí por si decides usarlos para los logos,
      // pero el fondo de la insignia de ahorro lo haremos gris para minimalismo.
      color: 'bg-red-600', // Un tono más suave de rojo si deseas usarlo
      savings: 'Hasta 75%'
    },
    {
      name: 'Spotify',
      logo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop',
      color: 'bg-green-600', // Un tono más suave de verde
      savings: 'Hasta 50%'
    },
    {
      name: 'Disney+',
      logo: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop',
      color: 'bg-blue-700', // Un tono más suave de azul
      savings: 'Hasta 60%'
    },
    {
      name: 'Prime Video',
      logo: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?w=60&h=60&fit=crop',
      color: 'bg-blue-600',
      savings: 'Hasta 45%'
    },
    {
      name: 'YouTube Premium',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=60&h=60&fit=crop',
      color: 'bg-red-700',
      savings: 'Hasta 55%'
    },
    {
      name: 'Adobe Creative',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=60&h=60&fit=crop',
      color: 'bg-indigo-700', // Cambiado a un índigo para variedad y suavidad
      savings: 'Hasta 40%'
    }
  ];

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
          {services.map((service, index) => (
            <div
              key={service.name}
              // CAMBIO: Fondo de las tarjetas a blanco sólido, borde gris sutil y sombra
              className="group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.05}s` }} // Animación un poco más rápida
            >
              {/* Service Logo */}
              <div className="flex items-center justify-center mb-4">
                {/* Puedes decidir si quieres que este div tenga el color vibrante de service.color
                    o si quieres que sea también más minimalista, por ejemplo, bg-gray-100 */}
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center shadow-lg transition-shadow duration-300`}>
                  <img
                    src={service.logo}
                    alt={service.name}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Service Info */}
              <div className="text-center">
                {/* CAMBIO: Texto del nombre del servicio a negro */}
                <h3 className="text-[#0A0A0A] font-semibold text-lg mb-2">{service.name}</h3>
                {/* CAMBIO: Texto descriptivo a gris medio */}
                <p className="text-gray-500 text-sm mb-3">Suscripción compartida</p>
                {/* CAMBIO: Insignia de ahorro a un estilo minimalista (fondo gris, texto oscuro) */}
                <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                  {service.savings}
                </div>
              </div>

              {/* Hover Effect - CAMBIO: Efecto hover sutil en gris claro */}
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-50 rounded-2xl transition-opacity duration-300"></div>
            </div>
          ))}
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