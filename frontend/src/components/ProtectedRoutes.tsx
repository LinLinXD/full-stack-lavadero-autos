import { useContext } from "react"
import { AuthContext } from "./context/authContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"


type ProtectedRoutesType = {
    roles: string[],
    to?: string
}

export const ProtectedRoutes = ({roles, to = '/error'} : ProtectedRoutesType) => {
    const location = useLocation();
    const authContext = useContext(AuthContext);

    if(!authContext.isLoggedIn) {
        return <Navigate
            to={to}
            replace
            state={{
                code: 401,
                reason: "unauthorized",
                message: "Debes iniciar sesión para acceder a esta sección",
                from: location.pathname,
            }}
        />
    }



  const userRoles = authContext?.userInfo?.rol ?? [];

  const hasAllowedRole = roles.length === 0 ? true : roles.some(r => userRoles.includes(r));

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
  } else {
    return <Outlet/>
  }
}


