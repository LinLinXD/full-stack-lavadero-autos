import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/storeContext";
import type { Service, StoreContextType } from "../../context/storeContext";
import "./ServiceForm.css";

const ServiceForm: React.FC = () => {
  const store = useContext(StoreContext);

  // 🧠 Aseguramos que el contexto esté disponible
  if (!store) {
    return <p>Error: StoreContext no encontrado</p>;
  }

  const { services, loading, error } = store;

  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());

  // 🧩 Función para manejar la selección con exclusión
  const handleSelect = (service: Service) => {
    const updated = new Set(selectedServices);

    if (updated.has(service.id)) {
      updated.delete(service.id);
    } else {
      // eliminar los que se excluyen
      service.excluye.forEach((exclusion) => {
        const toRemove = services.find((s) => s.nombre === exclusion);
        if (toRemove) updated.delete(toRemove.id);
      });
      updated.add(service.id);
    }

    setSelectedServices(updated);
  };

  // 🧮 Calcular totales
  const totalCosto = Array.from(selectedServices)
    .map((id) => services.find((s) => s.id === id)?.costo ?? "0")
    .reduce((acc, val) => acc + parseInt(val), 0);

  const totalDuracion = Array.from(selectedServices)
    .map((id) => services.find((s) => s.id === id)?.duracion ?? 0)
    .reduce((acc, val) => acc + val, 0);

  if (loading) return <p>Cargando servicios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="service-form">
      <h2>Selecciona tus servicios</h2>

      <div className="service-list">
        {services.map((service) => {
          const isSelected = selectedServices.has(service.id);
          const isExcluded = Array.from(selectedServices).some((id) => {
            const selected = services.find((s) => s.id === id);
            return selected?.excluye.includes(service.nombre);
          });

          return (
            <div
              key={service.id}
              className={`service-item ${isSelected ? "selected" : ""} ${
                isExcluded ? "excluded" : ""
              }`}
              onClick={() => !isExcluded && handleSelect(service)}
            >
              <h3>{service.nombre}</h3>
              <p>{service.descripcion}</p>
              <p>
                <strong>Precio:</strong> ${service.costo}
              </p>
              <p>
                <strong>Duración:</strong> {service.duracion} min
              </p>
            </div>
          );
        })}
      </div>

      <div className="service-summary">
        <h3>Resumen</h3>
        <p>
          <strong>Servicios seleccionados:</strong>{" "}
          {Array.from(selectedServices).length}
        </p>
        <p>
          <strong>Costo total:</strong> ${totalCosto}
        </p>
        <p>
          <strong>Duración total:</strong> {totalDuracion} min
        </p>
      </div>
    </div>
  );
};

export default ServiceForm;
