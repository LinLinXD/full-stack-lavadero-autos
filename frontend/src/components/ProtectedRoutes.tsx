import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type ProtectedRoutesType = {
  roles: string[];
  to?: string;
};

type UserResponse = {
  success: boolean;
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    rol: string[];
  };
};

export const ProtectedRoutes = ({ roles, to = "/error" }: ProtectedRoutesType) => {
  const [userData, setUserData] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true); 
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          setUserData(null);
          return;
        }

        const user: UserResponse = await res.json();
        setUserData(user);
      } catch {
        setUserData(null);
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Cargando...</div>; 
  }

  if (!userData) {
    return (
      <Navigate
        to={to}
        replace
        state={{
          code: 401,
          reason: "unauthorized",
          message: "Debes iniciar sesión para acceder a esta sección",
          from: location.pathname,
        }}
      />
    );
  }

  const userRoles = userData.user?.rol ?? [];
  const hasAllowedRole =
    roles.length === 0 ? true : roles.some((r) => userRoles.includes(r));

  if (!hasAllowedRole) {
    return (
      <Navigate
        to={to}
        replace
        state={{
          code: 403,
          reason: "forbidden",
          message: "No tienes permisos para acceder a esta sección",
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
};
