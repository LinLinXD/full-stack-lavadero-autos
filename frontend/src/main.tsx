import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/home/Home.tsx'
import App from './App'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App/>,
      children: [
        {index: true, element: <Home/>},
        {}
      ]
    }
  ]
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
