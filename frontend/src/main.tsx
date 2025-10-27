import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { Home } from './components/home/Home';
import { Service } from './components/services/Service';
import { Admin } from './components/admin/Admin';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import StoreContextProvider from './components/context/storeContext';
import  UserDashboard  from './components/user/UserDashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />, // errores de loaders/actions
    children: [
      { index: true, element: <Home /> },

      // admin protegido (rol admin)
      {
        element: <ProtectedRoutes roles={['admin']} to="/error" />,
        children: [
          { path: 'admin', element: <Admin /> }, // RELATIVO y sin index
        ],
      },

      // services protegido (rol user)
      {
        element: <ProtectedRoutes roles={['user']} to="/error" />,
        children: [
          { path: 'services', element: <Service /> },
          { path: 'dashboard', element: <UserDashboard /> }, // RELATIVO y sin index
        ],
      },

      // ruta para mostrar errores “navegados” vía state
      { path: 'error', element: <ErrorBoundary /> },

      // catch-all 404 (páginas inexistentes)
      { path: '*', element: <ErrorBoundary /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContextProvider>
      <RouterProvider router={router} />
    </StoreContextProvider>
  </StrictMode>,
);
