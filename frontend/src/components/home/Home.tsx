import { useState } from 'react'

import bcimage from '../../assets/home-imgs/bcimage.jpeg'
import service1 from '../../assets/home-imgs/service1.jpg'
import service2 from '../../assets/home-imgs/service2.jpg'
import service3 from '../../assets/home-imgs/service3.jpg'
import service4 from '../../assets/home-imgs/service4.jpeg'
import testimage from '../../assets/home-imgs/testimage.png'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import "../../styles.css"

export const Home = () => {
  const [imgError, setImgError] = useState({
    hero: false,
    service1: false,
    service2: false,
    service3: false,
    service4: false,
    testimage: false,
  })

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center h-[100vh] flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: imgError.hero ? 'none' : `url(${bcimage})` }}
      >
        <div className={`absolute inset-0 ${imgError.hero ? 'bg-gray-700' : 'bg-black/50'}`}></div>
        <div className="relative z-10 text-center px-6">
          {imgError.hero ? (
            <p className="text-3xl font-semibold">[Imagen principal no disponible]</p>
          ) : (
            <>
              <h1 className="text-5xl font-bold mb-4">¡Deja tu vehículo como nuevo!</h1>
              <p className="text-xl mb-6">Lavado profesional, detallado y protección completa.</p>
              <a
                  href="#explore-menu"
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition cursor-pointer"
                >
                  Agenda tu lavado
              </a>

            </>
          )}
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="bg-gray-100 py-20 transition-colors">
        <h2 className="text-4xl font-bold text-center mb-12">Nuestros Servicios</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

          {/* Servicio 1 - Lavado Completo */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {imgError.service1 ? (
              <div className="w-full h-56 flex items-center justify-center bg-gray-500 text-gray-300 text-lg">
                [Imagen no disponible]
              </div>
            ) : (
              <img
                src={service1}
                alt="Lavado Completo"
                className="w-full h-56 object-cover"
                onError={() => setImgError(prev => ({ ...prev, service1: true }))}
              />
            )}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold mb-2">Lavado Completo</h3>
              <p>Lavado exterior e interior, incluye aspirado y limpieza básica de tapicería.</p>
              <p className="mt-3 font-bold text-yellow-400">$40.000 · 60 min</p>
            </div>
          </div>

          {/* Servicio 2 - Limpieza Interior Premium */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {imgError.service2 ? (
              <div className="w-full h-56 flex items-center justify-center bg-gray-500 text-gray-300 text-lg">
                [Imagen no disponible]
              </div>
            ) : (
              <img
                src={service2}
                alt="Limpieza Interior Premium"
                className="w-full h-56 object-cover"
                onError={() => setImgError(prev => ({ ...prev, service2: true }))}
              />
            )}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold mb-2">Limpieza Interior Premium</h3>
              <p>Limpieza completa de interior con tapicería, plásticos y aspirado profundo.</p>
              <p className="mt-3 font-bold text-yellow-400">$35.000 · 60 min</p>
            </div>
          </div>

          {/* Servicio 3 - Especiales */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {imgError.service3 ? (
              <div className="w-full h-56 flex items-center justify-center bg-gray-500 text-gray-300 text-lg">
                [Imagen no disponible]
              </div>
            ) : (
              <img
                src={service3}
                alt="Pulida"
                className="w-full h-56 object-cover"
                onError={() => setImgError(prev => ({ ...prev, service3: true }))}
              />
            )}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold mb-2">Servicios especiales</h3>
              <p>Se ofrecen servicios especiales como enceramiento, pulida y lavado de motor.</p>
              <p className="mt-3 font-bold text-yellow-400">$80.000 · 120 min</p>
            </div>
          </div>

          {/* Servicio 4 - Extras */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {imgError.service4 ? (
              <div className="w-full h-56 flex items-center justify-center bg-gray-500 text-gray-300 text-lg">
                [Imagen no disponible]
              </div>
            ) : (
              <img
                src={service4}
                alt="Pulida"
                className="w-full h-56 object-cover"
                onError={() => setImgError(prev => ({ ...prev, service4: true }))}
              />
            )}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold mb-2">Servicios extras</h3>
              <p>Pulido completo de la pintura, incluye encerado final para máximo brillo y protección.</p>
              <p className="mt-3 font-bold text-yellow-400">$80.000 · 120 min</p>
            </div>
          </div>

        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section className="bg-white py-20 transition-colors">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3 text-yellow-400">🧽 Calidad Garantizada</h3>
              <p>Utilizamos los mejores productos y técnicas del mercado.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3 text-yellow-400">⚡ Servicio Rápido</h3>
              <p>Tu auto limpio y reluciente en tiempo récord.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3 text-yellow-400">💰 Precios Accesibles</h3>
              <p>Calidad premium a precios que te encantarán.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-gray-100 py-20 transition-colors">
        <h2 className="text-4xl font-bold text-center mb-12">Opiniones de Nuestros Clientes</h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 px-4">
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
            {imgError.testimage ? (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-500 rounded-full text-gray-300 text-sm">
                [Foto]
              </div>
            ) : (
              <img
                src={testimage}
                alt="Cliente 1"
                className="w-24 h-24 rounded-full object-cover mb-4"
                onError={() => setImgError(prev => ({ ...prev, testimage: true }))}
              />
            )}
            <p className="italic">"Excelente servicio, dejaron mi carro como nuevo. 100% recomendados."</p>
            <p className="mt-3 font-semibold text-yellow-400">- Juan Pérez</p>
          </div>
        </div>
      </section>

      {/* DONDE ENCONTRARNOS */}
      <section className="bg-white py-20">
        <div className="mac-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">¿Dónde encontrarnos?</h2>
            <p className="text-lg mb-6">¡Visítanos en nuestra sede principal!</p>
            <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
              <LoadScript googleMapsApiKey="AIzaSyDyDlE15xppZof1qcuVK8kw5vaYst6jS0M">
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={{ lat: 2.9279, lng: -75.2803 }} // Coordenadas de Neiva, Colombia
                  zoom={15}
                >
                  <Marker position={{ lat: 2.9279, lng: -75.2803 }} />
                </GoogleMap>
              </LoadScript>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-10 transition-colors">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">Drive&Shine</h3>
            <p>Lavado profesional y detallado de vehículos en tu ciudad.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">Enlaces</h3>
            <ul>
              <li><a href="#" className="hover:text-white">Inicio</a></li>
              <li><a href="#" className="hover:text-white">Servicios</a></li>
              <li><a href="#" className="hover:text-white">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">Contáctanos</h3>
            <p>📍 Calle 123, Neiva</p>
            <p>📞 +57 300 123 4567</p>
            <p>✉️ contacto@drive&shine.com</p>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
          © 2025 Drive&Shine Pro. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
