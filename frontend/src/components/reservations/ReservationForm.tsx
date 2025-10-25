import React, { useState } from "react";
import "./ReservationForm.css";

interface ReservationFormProps {
  services: string[]; // 👈 recibimos la lista desde ServiceForm
  onClose: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ services, onClose }) => {
  const [placa, setPlaca] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (placa.length < 5 || placa.length > 6) {
      setMessage("❌ La placa debe tener entre 5 y 6 caracteres.");
      return;
    }

    const horaValida = [
      "08:00", "09:00", "10:00", "11:00",
      "14:00", "15:00", "16:00", "17:00",
    ];
    if (!horaValida.includes(hora)) {
      setMessage("❌ Solo se permiten horas entre 8:00-11:00 y 14:00-17:00.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:3000/reservation/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          servicios: services, // 👈 usamos los seleccionados
          placa,
          fecha,
          hora,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Reservación creada con éxito");
        setPlaca("");
        setFecha("");
        setHora("");
      } else {
        setMessage(`❌ Error: ${data.message || "No se pudo crear la reserva"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>

      <h2>Crear Reservación</h2>

      <div className="selected-services">
        <h4>Servicios seleccionados:</h4>
        <ul>
          {services.length > 0 ? (
            services.map((service, i) => (
              <li key={i}>
                <span className="bullet"></span> {service}
              </li>
            ))
          ) : (
            <li>No seleccionaste servicios</li>
          )}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="form-fields">
        <label>
          Placa:
          <input
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
            placeholder="Ejemplo: ABC123"
            required
          />
        </label>

        <label>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            min={today}
            required
          />
        </label>

        <label>
          Hora:
          <select
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          >
            <option value="">Seleccione una hora</option>
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Confirmar Reserva"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </>
  );
};

export default ReservationForm;
