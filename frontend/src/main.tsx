import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/home/Home.tsx'
import { Service } from './components/services/Service.tsx'
import { Admin } from './components/admin/Admin.tsx'

import App from './App'
import './styles.css'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App/>,
      children: [
        {index: true, element: <Home/>, path: '/'},
        {path: '/services', element: <Service/>},
        {path: '/admin', element: <Admin/>}
      ]
    }
  ]
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
