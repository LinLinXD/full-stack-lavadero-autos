import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from "lucide-react";

import bcimage from '../../assets/home-imgs/bcimage.jpeg'
import service1 from '../../assets/home-imgs/service1.jpg'
import service2 from '../../assets/home-imgs/service2.jpg'
import service3 from '../../assets/home-imgs/service3.jpg'
import service4 from '../../assets/home-imgs/service4.jpeg'
import reseña1 from '../../assets/home-imgs/reseña1.webp'
import reseña2 from '../../assets/home-imgs/reseña2.jpg'
import reseña3 from '../../assets/home-imgs/reseña3.webp'
import reseña4 from '../../assets/home-imgs/reseña4.webp'
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
      title: "Calidad Garantizada",
      text: "Trabajamos únicamente con productos certificados y técnicas avanzadas de limpieza y detallado automotriz. Nuestro equipo se asegura de que cada vehículo reciba un tratamiento profesional, cuidando cada superficie para obtener un acabado impecable.",
      img: carrusel_img1,
    },
    {
      title: "Servicio Rápido",
      text: "Optimizamos cada etapa del proceso para que recibas un servicio ágil sin sacrificar calidad. Gracias a nuestro personal capacitado y a un flujo de trabajo eficiente, tu auto estará limpio, brillante y listo para salir en mucho menos tiempo del que imaginas.",
      img: carrusel_img2,
    },
    {
      title: "Precios Accesibles",
      text: "Ofrecemos planes y servicios diseñados para ajustarse a tu presupuesto, manteniendo siempre un estándar premium. Creemos que un buen cuidado automotriz no tiene por qué ser costoso, por eso brindamos tarifas justas y transparentes.",
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
                className="hero-button bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 cursor-pointer"
              >
                Agenda tu lavado
              </button>
            </>
          )}
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-20 transition-colors">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">Nuestros Servicios</h2>
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
          {/* Servicio 1 */}
          <div className="service-card bg-gray-100 text-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {imgError.service1 ? (
              <div className="image-placeholder w-full h-56">
                [Imagen no disponible]
              </div>
            ) : (
              <img
                loading="lazy"
                src={service1}
                alt="Lavado Completo"
                className="w-full h-56 object-cover"
                onError={() => setImgError(prev => ({ ...prev, service1: true }))}
              />
            )}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold mb-2">Lavado Completo</h3>
              <p>Lavado exterior e interior, incluye aspirado y limpieza básica de tapicería.</p>
              <p className="service-price mt-3 font-bold text-blue-900">$40.000 · 60 min</p>
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
                loading="lazy"
                src={service2}
                alt="Limpieza Interior Premium"
                className="w-full h-56 object-cover"
                onError={() => setImgError(prev => ({ ...prev, service2: true }))}
              />
            )}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold mb-2">Limpieza Interior Premium</h3>
              <p>Limpieza completa de interior con tapicería, plásticos y aspirado profundo.</p>
              <p className="service-price mt-3 font-bold text-blue-900">$35.000 · 60 min</p>
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
                loading="lazy"
                src={service3}
                alt="Servicios Especiales"
                className="w-full h-56 object-cover"
                onError={() => setImgError(prev => ({ ...prev, service3: true }))}
              />
            )}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold mb-2">Servicios especiales</h3>
              <p>Enceramiento, pulida y lavado de motor.</p>
              <p className="service-price mt-3 font-bold text-blue-900">$80.000 · 120 min</p>
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
                loading="lazy"
                src={service4}
                alt="Servicios Extras"
                className="w-full h-56 object-cover"
                onError={() => setImgError(prev => ({ ...prev, service4: true }))}
              />
            )}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold mb-2">Servicios extras</h3>
              <p>Pulido completo más encerado para máximo brillo y protección.</p>
              <p className="service-price mt-3 font-bold text-blue-900">$80.000 · 120 min</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- "POR QUÉ ELEGIRNOS" --- */}
      <section className="py-20 transition-colors">
        <div className="w-full px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">¿Por qué elegirnos?</h2>

          <div className="carousel-container relative overflow-hidden rounded-2xl shadow-xl p-8">
            {/* Contenedor del slider */}
            <div className="carousel-slider" style={{ transform: `translateX(-${index * 100}%)` }}>
              {slides.map((slide, i) => (
                <div key={i} className="carousel-slide">
                  {/* Imagen a la izquierda */}
                  {slide.img && (
                    <img
                      src={slide.img}
                      alt={slide.title}
                      loading="lazy"
                    />
                  )}
                  
                  {/* Contenido a la derecha */}
                  <div className="carousel-content">
                    <h3 className="text-4xl font-bold mb-6 text-blue-900">{slide.title}</h3>
                    <p className="text-2xl leading-relaxed text-gray-700">{slide.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón Izquierdo */}
            <button
              onClick={prevSlide}
              className="carousel-button left"
            >
              <ChevronLeft size={48} />
            </button>

            {/* Botón Derecho */}
            <button
              onClick={nextSlide}
              className="carousel-button right"
            >
              <ChevronRight size={48} />
            </button>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-8 gap-3">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`carousel-indicator w-4 h-4 rounded-full ${
                  index === i ? "bg-blue-900 scale-125" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-20 transition-colors">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">Opiniones de Nuestros Clientes</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {/* Testimonio 1 */}
          <div className="testimonial-card bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
            {imgError.testimage ? (
              <div className="image-placeholder w-24 h-24 rounded-full text-sm">[Foto]</div>
            ) : (
              <img
                loading="lazy"
                src={reseña1}
                alt="Cliente 1"
                className="w-24 h-24 rounded-full object-cover mb-4"
                onError={() => setImgError(prev => ({ ...prev, testimage: true }))}
              />
            )}
            <p className="italic text-center">"Excelente servicio, dejaron mi carro como nuevo. 100% recomendados."</p>
            <p className="mt-3 font-semibold text-blue-900">- Juan Pérez</p>
          </div>

          {/* Testimonio 2 */}
          <div className="testimonial-card bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
            {imgError.testimage ? (
              <div className="image-placeholder w-24 h-24 rounded-full text-sm">[Foto]</div>
            ) : (
              <img
                loading="lazy"
                src={reseña2}
                alt="Cliente 2"
                className="w-24 h-24 rounded-full object-cover mb-4"
                onError={() => setImgError(prev => ({ ...prev, testimage: true }))}
              />
            )}
            <p className="italic text-center">"Muy profesionales y rápidos. Mi auto quedó impecable."</p>
            <p className="mt-3 font-semibold text-blue-900">- María González</p>
          </div>

          {/* Testimonio 3 */}
          <div className="testimonial-card bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
            {imgError.testimage ? (
              <div className="image-placeholder w-24 h-24 rounded-full text-sm">[Foto]</div>
            ) : (
              <img
                loading="lazy"
                src={reseña3}
                alt="Cliente 3"
                className="w-24 h-24 rounded-full object-cover mb-4"
                onError={() => setImgError(prev => ({ ...prev, testimage: true }))}
              />
            )}
            <p className="italic text-center">"Precios justos y excelente atención. Volveré sin duda."</p>
            <p className="mt-3 font-semibold text-blue-900">- Carlos Rodríguez</p>
          </div>

          {/* Testimonio 4 */}
          <div className="testimonial-card bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
            {imgError.testimage ? (
              <div className="image-placeholder w-24 h-24 rounded-full text-sm">[Foto]</div>
            ) : (
              <img
                loading="lazy"
                src={reseña4}
                alt="Cliente 4"
                className="w-24 h-24 rounded-full object-cover mb-4"
                onError={() => setImgError(prev => ({ ...prev, testimage: true }))}
              />
            )}
            <p className="italic text-center">"La mejor experiencia en lavado de autos que he tenido."</p>
            <p className="mt-3 font-semibold text-blue-900">- Ana Martínez</p>
          </div>
        </div>
      </section>

      {/* DONDE ENCONTRARNOS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-8 text-yellow-400">¿Dónde encontrarnos?</h2>
          <p className="text-lg mb-6 text-white">¡Visítanos en nuestra sede principal!</p>

          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d249.03335194593168!2d-75.28804613361844!3d2.949298598435732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1763420987033!5m2!1ses-419!2sco"
              className="w-full max-w-[1400px] h-[600px] rounded-xl shadow-lg"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-10 transition-colors">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white-900">Drive&Shine</h3>
            <p>Lavado profesional y detallado de vehículos en tu ciudad.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white-900">Enlaces</h3>
            <ul>
              <li><a href="#" className="footer-link hover:text-white">Inicio</a></li>
              <li><a href="#" className="footer-link hover:text-white">Servicios</a></li>
              <li><a href="#" className="footer-link hover:text-white">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white-900">Contáctanos</h3>
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