import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from "lucide-react";

import bcimage from '../../assets/home-imgs/bcimage.jpeg'
import service1 from '../../assets/home-imgs/service1.jpg'
import service2 from '../../assets/home-imgs/service2.jpg'
import service3 from '../../assets/home-imgs/service3.jpg'
import service4 from '../../assets/home-imgs/service4.jpeg'
import testimage from '../../assets/home-imgs/testimage.png'
import carrusel_img1 from '../../assets/home-imgs/carrusel_img1.webp'
import carrusel_img2 from '../../assets/home-imgs/carrusel_img2.jpg'
import carrusel_img3 from '../../assets/home-imgs/carrusel_img3.jpg'
import "../../styles.css"
import "./Home.css"

export const Home = () => {
  const [imgError, setImgError] = useState({
    hero: false,
    service1: false,
    service2: false,
    service3: false,
    service4: false,
    carrusel_img1: false,
    carrusel_img2: false,
    carrusel_img3: false,
    testimage: false,
  })

  const navigate = useNavigate();

  const handleNavigateToServices = () => {
    navigate('/services');
  };

  // --- CARRUSEL "POR QUÉ ELEGIRNOS" ---
  const slides = [
    {
      title: "🧽 Calidad Garantizada",
      text: "Utilizamos los mejores productos y técnicas del mercado.",
      img: carrusel_img1,
    },
    {
      title: "⚡ Servicio Rápido",
      text: "Tu auto limpio y reluciente en tiempo récord.",
      img: carrusel_img2,
    },
    {
      title: "💰 Precios Accesibles",
      text: "Calidad premium a precios que te encantarán.",
      img: carrusel_img3,
    },
  ];

  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (

    <div className="home-container min-h-screen text-gray-900">
      

      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center h-[100vh] flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: imgError.hero ? 'none' : `url(${bcimage})` }}
      >
        {/* Overlay con clase personalizada */}
        <div className={`hero-overlay ${imgError.hero ? 'no-image' : ''}`}></div>
        
        <div className="relative z-10 text-center px-6">
          {imgError.hero ? (
            <p className="text-3xl font-semibold">[Imagen principal no disponible]</p>
          ) : (
            <>
              <h1 className="text-5xl font-bold mb-4">¡Deja tu vehículo como nuevo!</h1>
              <p className="text-xl mb-6">Lavado profesional, detallado y protección completa.</p>
              <button
                onClick={handleNavigateToServices}
                className="hero-button bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 cursor-pointer"
              >
                Agenda tu lavado
              </button>
            </>
          )}
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-20 transition-colors">
        <h2 className="text-4xl font-bold text-center mb-12">Nuestros Servicios</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

          {/* Servicio 1 */}
          <div className="service-card bg-gray-100 text-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {imgError.service1 ? (
              <div className="image-placeholder w-full h-56">
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
              <p className="service-price mt-3 font-bold">$40.000 · 60 min</p>
            </div>
          </div>

          {/* Servicio 2 */}
          <div className="service-card bg-gray-100 text-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {imgError.service2 ? (
              <div className="image-placeholder w-full h-56">
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
              <p className="service-price mt-3 font-bold">$35.000 · 60 min</p>
            </div>
          </div>

          {/* Servicio 3 */}
          <div className="service-card bg-gray-100 text-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {imgError.service3 ? (
              <div className="image-placeholder w-full h-56">
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
              <p>Enceramiento, pulida y lavado de motor.</p>
              <p className="service-price mt-3 font-bold">$80.000 · 120 min</p>
            </div>
          </div>

          {/* Servicio 4 */}
          <div className="service-card bg-gray-100 text-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {imgError.service4 ? (
              <div className="image-placeholder w-full h-56">
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
              <p>Pulido completo más encerado para máximo brillo y protección.</p>
              <p className="service-price mt-3 font-bold">$80.000 · 120 min</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- "POR QUÉ ELEGIRNOS" --- */}
      <section className="py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>

          <div className="relative overflow-hidden bg-gray-50 rounded-2xl shadow-xl p-8">
            {/* Contenedor del slider */}
            <div className="carousel-slider" style={{ transform: `translateX(-${index * 100}%)` }}>
              {slides.map((slide, i) => (
                <div key={i} className="carousel-slide">
                  {/* Imagen a la izquierda */}
                  {slide.img && (
                    <img
                      src={slide.img}
                      alt={slide.title}
                    />
                  )}
                  
                  {/* Contenido a la derecha */}
                  <div className="carousel-content">
                    <h3 className="text-4xl font-bold mb-6 text-yellow-400">{slide.title}</h3>
                    <p className="text-2xl leading-relaxed text-gray-700">{slide.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón Izquierdo */}
            <button
              onClick={prevSlide}
              className="carousel-button absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 p-4 rounded-full z-10"
            >
              <ChevronLeft size={32} className="text-white" />
            </button>

            {/* Botón Derecho */}
            <button
              onClick={nextSlide}
              className="carousel-button absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 p-4 rounded-full z-10"
            >
              <ChevronRight size={32} className="text-white" />
            </button>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-8 gap-3">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`carousel-indicator w-4 h-4 rounded-full ${
                  index === i ? "bg-yellow-400 scale-125" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-20 transition-colors">
        <h2 className="text-4xl font-bold text-center mb-12">Opiniones de Nuestros Clientes</h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 px-4">
          <div className="testimonial-card bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
            {imgError.testimage ? (
              <div className="image-placeholder w-24 h-24 rounded-full text-sm">[Foto]</div>
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
      <section className="py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">¿Dónde encontrarnos?</h2>
          <p className="text-lg mb-6">¡Visítanos en nuestra sede principal!</p>
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
              <li><a href="#" className="footer-link hover:text-white">Inicio</a></li>
              <li><a href="#" className="footer-link hover:text-white">Servicios</a></li>
              <li><a href="#" className="footer-link hover:text-white">Contacto</a></li>
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
  );
};