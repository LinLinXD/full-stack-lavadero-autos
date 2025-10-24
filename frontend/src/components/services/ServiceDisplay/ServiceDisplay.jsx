import React, { useEffect, useState } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import imagenTest from '../../../assets/home-imgs/testimage.png'
const FoodDisplay = ({ category }) => {
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services')
        const data = await response.json()
        setServices(data)
      } catch (error) {
        console.error('Error al traer los servicios:', error)
      }
    }
    fetchServices()
  }, [])

  return (
    <div className="food-display" id="food-display">
      <h2>Servicios disponibles</h2>
      <div className="food-display-list">
        {services.map((item, index) => {
          if (category === 'All' || category === item.nombre) {
            return (
              <FoodItem
                key={index}
                id={item.id}
                name={item.nombre.replace(/-/g, ' ')}
                price={item.costo}
                description={item.descripcion}
                image={imagenTest} // puedes cambiarlo si agregas imágenes en la BD
              />
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
