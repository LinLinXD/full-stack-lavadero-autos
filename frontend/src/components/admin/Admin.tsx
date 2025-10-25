// components/admin/Admin.tsx
import { useEffect, useMemo, useState } from "react";

type FilterInfo = {
  placa?: string;
  estado?: string;
  inicio?: string; // ISO yyyy-mm-dd
  fin?: string;    // ISO yyyy-mm-dd
  username?: string;
  servicio?: string;
};

type Usuario = { username: string; email: string };
type Servicio = { nombre: string; costo: number };

type Reserva = {
  _id: string;
  placa?: string;
  estado?: string;
  fecha?: string;
  id_usuario?: Usuario | null;
  // El backend a veces popula arreglo, a veces objeto → soportar ambos
  id_servicio?: Servicio | Servicio[] | null;
};

const ENDPOINT = "http://localhost:3000/reservation/filter-reservations";

export const Admin = () => {
  const [filters, setFilters] = useState<FilterInfo>({});
  const [data, setData] = useState<Reserva[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Validación mínima de fechas
  const dateError = useMemo(() => {
    if (filters.inicio && filters.fin && filters.inicio > filters.fin) {
      return "La fecha de inicio no puede ser mayor que la fecha fin.";
    }
    return null;
  }, [filters.inicio, filters.fin]);

  const onChange =
    (key: keyof FilterInfo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const v = e.target.value;
      setFilters((f) => ({ ...f, [key]: v.trim() === "" ? undefined : v }));
    };

  const reset = () => {
    setFilters({});
    setData(null);
    setErr(null);
  };

  const fetchData = async (body: FilterInfo) => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error?.message || `Error ${res.status}`);
      }
      const jsonData = await res.json();
      const json: Reserva[] = await jsonData.data
      setData(json);
    } catch (e: any) {
      setData([]);
      setErr(e?.message ?? "Error desconocido al cargar reservas.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateError) return;
    // Enviar solo campos “seteados”
    const body: FilterInfo = {};
    (["placa", "estado", "inicio", "fin", "username", "servicio"] as const).forEach((k) => {
      const v = filters[k];
      if (v !== undefined && v !== null && v !== "") (body as any)[k] = v;
    });
    fetchData(body);
  };

  // Helper para normalizar servicios a arreglo
  const getServicios = (s?: Servicio | Servicio[] | null): Servicio[] => {
    if (!s) return [];
    return Array.isArray(s) ? s : [s];
  };

  useEffect(() => {
    fetchData({});
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>

      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 bg-white rounded-xl p-4 shadow"
      >
        <input
          type="text"
          placeholder="Placa"
          value={filters.placa ?? ""}
          onChange={onChange("placa")}
          className="border rounded-md px-3 py-2"
        />

        <select
          value={filters.estado ?? ""}
          onChange={onChange("estado")}
          className="border rounded-md px-3 py-2"
        >
          <option value="">Estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="cancelada">Cancelada</option>
        </select>

        <input
          type="date"
          value={filters.inicio ?? ""}
          onChange={onChange("inicio")}
          className="border rounded-md px-3 py-2"
        />

        <input
          type="date"
          value={filters.fin ?? ""}
          onChange={onChange("fin")}
          className="border rounded-md px-3 py-2"
        />

        <input
          type="text"
          placeholder="Username"
          value={filters.username ?? ""}
          onChange={onChange("username")}
          className="border rounded-md px-3 py-2"
        />

        <input
          type="text"
          placeholder="Servicio"
          value={filters.servicio ?? ""}
          onChange={onChange("servicio")}
          className="border rounded-md px-3 py-2"
        />

        {dateError && (
          <div className="md:col-span-3 lg:col-span-6 text-sm text-red-600">
            {dateError}
          </div>
        )}

        <div className="md:col-span-3 lg:col-span-6 flex gap-3">
          <button
            type="submit"
            disabled={!!dateError || loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Limpiar
          </button>
        </div>
      </form>

      {err && (
        <div className="mt-4 rounded-lg border bg-rose-50 text-rose-700 px-4 py-3">
          {err}
        </div>
      )}

      <div className="mt-6 bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-3 font-semibold">Placa</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
              <th className="px-4 py-3 font-semibold">Fecha</th>
              <th className="px-4 py-3 font-semibold">Usuario</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Servicios</th>
              <th className="px-4 py-3 font-semibold">Total estimado</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  Cargando...
                </td>
              </tr>
            )}

            {!loading && data?.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  Sin resultados para los filtros aplicados.
                </td>
              </tr>
            )}

            {!loading &&
              data?.map((r) => {
                const servicios = getServicios(r.id_servicio);
                const total = servicios.reduce((acc, s) => acc + (s.costo ?? 0), 0);

                return (
                  <tr key={r._id} className="border-t">
                    <td className="px-4 py-3">{r.placa ?? "-"}</td>
                    <td className="px-4 py-3 capitalize">{r.estado ?? "-"}</td>
                    <td className="px-4 py-3">
                      {r.fecha ? new Date(r.fecha).toLocaleString() : "-"}
                    </td>
                    <td className="px-4 py-3">{r.id_usuario?.username ?? "-"}</td>
                    <td className="px-4 py-3">{r.id_usuario?.email ?? "-"}</td>
                    <td className="px-4 py-3">
                      {servicios.length
                        ? servicios.map((s) => `${s.nombre} ($${s.costo})`).join(", ")
                        : "-"}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {servicios.length ? `$${total}` : "-"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
