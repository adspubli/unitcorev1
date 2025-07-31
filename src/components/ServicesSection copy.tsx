import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      name: 'Netflix',
      logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=60&h=60&fit=crop',
      color: 'bg-red-500',
      savings: 'Hasta 75%'
    },
    {
      name: 'Spotify',
      logo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop',
      color: 'bg-green-500',
      savings: 'Hasta 50%'
    },
    {
      name: 'Disney+',
      logo: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop',
      color: 'bg-blue-600',
      savings: 'Hasta 60%'
    },
    {
      name: 'Prime Video',
      logo: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?w=60&h=60&fit=crop',
      color: 'bg-blue-500',
      savings: 'Hasta 45%'
    },
    {
      name: 'YouTube Premium',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=60&h=60&fit=crop',
      color: 'bg-red-600',
      savings: 'Hasta 55%'
    },
    {
      name: 'Adobe Creative',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=60&h=60&fit=crop',
      color: 'bg-red-700',
      savings: 'Hasta 40%'
    }
  ];

  return (
    <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Más de 300+ servicios disponibles
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Encuentra y comparte suscripciones de tus plataformas favoritas con otros usuarios.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={service.name}
              className="group relative bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10 rounded-2xl p-6 hover:bg-opacity-10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Service Logo */}
              <div className="flex items-center justify-center mb-4">
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <img
                    src={service.logo}
                    alt={service.name}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Service Info */}
              <div className="text-center">
                <h3 className="text-white font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-gray-300 text-sm mb-3">Suscripción compartida</p>
                <div className="inline-flex items-center px-3 py-1 bg-[#059669] bg-opacity-20 text-[#10B981] text-sm font-medium rounded-full">
                  {service.savings}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#059669] to-[#10B981] opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-white text-[#0A0A0A] px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105">
            Ver todos los servicios
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;