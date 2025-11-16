import { useState } from "react"
import { Button } from "../utils/Button"
import type { Servicio } from "./Admin"
import type { Reserva } from "./Admin"

export const ReservationRow = ({r, servicios, total, refreshFilter} : {r: Reserva, servicios: Servicio[], total: number, refreshFilter: (e: React.FormEvent<Element>) => void}) => {
    const [estado, setEstado] = useState<string>('Activo')

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEstado(e.target.value)
    }

    const onSelectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try{
            if(estado === 'cancelado') {
                const response = await fetch(`http://localhost:3000/reservation/cancel-reservation/${r._id}`, { credentials: 'include', method: 'DELETE'})
                const data = await response.json()
                refreshFilter(e)
                console.log(data);

                return;
            }
            const estadoFetch = await fetch('http://localhost:3000/reservation/update', {
                credentials: 'include',
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: r._id,
                    estado: estado
                })
            });
            const data = await estadoFetch.json();
            console.log(data)
        } catch {
            console.error('something happened')
        }
    }

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
                    <td>
                      <form className="flex items-center gap-1 pr-2 pl-2" onSubmit={(e) => onSelectSubmit(e)}>
                          <select
                            className="appearance-none rounded-md border border-gray-300 bg-white pl-3 pr-9 py-2 text-sm text-gray-800 
                                  shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                            onChange={(e) => onSelectChange(e)}
                          >
                            <option value="activo">Activo</option>
                            <option value="en curso">En curso</option>
                            <option value="completado">Completado</option>
                            <option value="cancelado">Cancelado</option>
                          </select>

                          <Button
                            type="submit"
                            className="
                              inline-flex h-8 w-8 items-center justify-center
                              rounded-md bg-blue-600 text-white
                              p-0 border-0 leading-none
                              hover:bg-blue-700 active:bg-blue-800
                              focus:outline-none focus:ring-2 focus:ring-blue-200
                              transition
                            "
                          >
                            <span className="material-symbols-outlined text-[18px] leading-none">
                              check
                            </span>
                          </Button>
                      </form>
                    </td>
                  </tr>
  )
}
