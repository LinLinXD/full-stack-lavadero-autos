import { NavLink } from 'react-router-dom'
import logo from '../../assets/navbar-imgs/logo.png'

export const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white px-6 py-1 flex justify-between items-center">
   
        <img src={logo} className='h-18'/>

      {/* Links */}
      <ul className="hidden md:flex gap-6">
        <li><NavLink to="/" className={({isActive}) => isActive ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1" : "hover:text-gray-200"}>Home</NavLink></li>
        <li><NavLink to="/services" className={({isActive}) => isActive ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1" : "hover:text-gray-200"}>Services</NavLink></li>
        <li><NavLink to="/admin" className={({isActive}) => isActive ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1" : "hover:text-gray-200"}>Admin</NavLink></li>

      </ul>

      {/* Botón menú móvil */}
      <button className="md:hidden p-2 rounded hover:bg-blue-700">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  )
}
