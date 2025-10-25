import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// 🧩 Definimos la interfaz para cada servicio
export interface Service {
  id: string;
  nombre: string;
  descripcion: string;
  costo: string;
  duracion: number;
  excluye: string[];
  categoria: string;
  url?: string;
}

// 🧩 Definimos qué contendrá el contexto global
export interface StoreContextType {
  services: Service[];
  loading: boolean;
  error: string | null;
  cartItems: Record<string, number>;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

// 🧠 Creamos el contexto tipado
export const StoreContext = createContext<StoreContextType | null>(null);

// 🧩 Provider
const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addToCart = (itemId: string) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) updated[itemId]--;
      else delete updated[itemId];
      return updated;
    });
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:3000/service");
        if (!res.ok) throw new Error("Error al obtener los servicios");
        const data = await res.json();

        const formatted = data.map((s: any) => ({
          id: s.id || s._id,
          nombre: s.nombre || s.name,
          descripcion: s.descripcion || s.description,
          costo: s.costo?.toString() ?? "0",
          duracion: s.duracion ?? 0,
          excluye: s.excluye ?? [],
          categoria: s.categoria || "Otros",
          url: s.url ?? "",
        }));

        setServices(formatted);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los servicios");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const contextValue: StoreContextType = {
    services,
    loading,
    error,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
