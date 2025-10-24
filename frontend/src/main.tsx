import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/home/Home.tsx';
import { Service } from './components/services/Service.tsx';
import { Admin } from './components/admin/Admin.tsx';
import App from './App';
import './styles.css';
import StoreContextProvider from './components/context/storeContext.tsx'; // 👈 importa tu contexto

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/services', element: <Service /> },
      { path: '/admin', element: <Admin /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContextProvider> {/* 👈 envuelve tu app */}
      <RouterProvider router={router} />
    </StoreContextProvider>
  </StrictMode>,
);
