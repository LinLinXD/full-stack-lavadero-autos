import React, { useEffect, useState } from 'react'
import './ExploreMenu.css'

const ExploreMenu = ({ category, setCategory }) => {
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/service') // 🔹 Ajusta tu ruta real
        const data = await response.json()
        setServices(data)
      } catch (error) {
        console.error('Error al traer los servicios:', error)
      }
    }
    fetchServices()
  }, [])

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explora nuestros servicios</h1>
      <p className="explore-menu-text">
        Selecciona un servicio para ver más detalles o combinar opciones.
      </p>

      <div className="explore-menu-list">
        {services.map((item, index) => (
          <div
            onClick={() =>
              setCategory(prev => (prev === item.nombre ? 'All' : item.nombre))
            }
            key={index}
            className="explore-menu-list-item"
          >
            <p className={category === item.nombre ? 'active' : ''}>
              {item.nombre.replace(/-/g, ' ')}
            </p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
