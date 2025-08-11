import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarProfile from '../components/NavbarProfile';
import MobileNavbarProfile from '../components/MobileNavbarProfile';

const CreateGroupPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<any[]>([]);
  useEffect(() => {
    import('../lib/api').then(({ fetchServices }) => {
      fetchServices().then(setServices);
    });
  }, []);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const avatarUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face';
  return (
    <div className="min-h-screen bg-[#F7F9F8]">
      {/* Menú de navegación reutilizable */}
      <NavbarProfile avatarUrl={avatarUrl} />
      <MobileNavbarProfile />

      {/* Contenido principal restaurado */}
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-extrabold mb-8 text-[#222] text-center tracking-tight">Elige la suscripción para compartir</h1>

        {/* Buscador y categorías mejorados */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar servicios..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full max-w-lg px-6 py-3 border-2 border-[#E5E7EB] rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#059669] text-lg"
          />
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {/* Categorías eliminadas, solo se muestran todos los servicios reales */}
          </div>
        </div>

        {/* Lista de servicios filtrados con tarjetas mejoradas */}
        <div className="mb-10">
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => {
                const linkTo = `/select-plan/${service.slug}`;
                return (
                  <Link
                    key={service.id}
                    to={linkTo}
                    className="flex flex-col items-center p-7 bg-white rounded-2xl border-2 border-[#E5E7EB] hover:border-[#059669] transition-all duration-200 group shadow-sm hover:shadow-lg cursor-pointer"
                    style={{ minHeight: 180 }}
                  >
                    <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                      <span className="text-white text-2xl">{service.icon}</span>
                    </div>
                    <span className="font-semibold text-[#222] group-hover:text-[#059669] text-center text-base">
                      {service.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#9CA3AF] text-lg">No se encontraron servicios</p>
              <p className="text-[#9CA3AF] text-sm mt-2">Intenta con otro término de búsqueda</p>
            </div>
          )}
        </div>

        {/* Opción para crear compartición personalizada */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">¿No ves tu servicio?</h3>
          <Link
            to="/create-group/custom"
            className="inline-block text-[#059669] font-semibold px-8 py-3 border-2 border-[#059669] rounded-full hover:bg-[#059669] hover:text-white transition-all duration-200 text-lg shadow-sm"
          >
            Crear una compartición personalizada
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPage;