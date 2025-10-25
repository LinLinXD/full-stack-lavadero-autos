import { NavLink } from 'react-router-dom'
import logo from '../../assets/navbar-imgs/logo.png'
import { Button } from '../utils/Button'
import type { ActionsType } from '../../App'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

type NavbarType = {
  appDispatch: React.Dispatch<ActionsType>
}

export const Navbar = ({appDispatch}: NavbarType) => {
  const {isLoggedIn, userInfo} = useContext(AuthContext)
  const toggleLogin = () => {
    appDispatch({ type: 'login' })
  }

  const toggleRegister = () => {
    appDispatch({ type: 'register' })
  }

  const logout = async () => {
    const logoutFetch = await fetch('http://localhost:3000/auth/logout', {
      method: 'GET', 
      credentials: 'include'
    })

    if(logoutFetch.ok) {
      appDispatch({type: 'logout'})

    } else {
      console.error("something went wrong")
    }
  }

  return (
    <nav className="bg-blue-900 text-white px-6 py-1 flex justify-between items-center sticky top-0 left-0 w-full z-50 shadow-md">
   
      <img src={logo} className='h-18'/>

      {/* Links */}
      <ul className="hidden md:flex gap-6 items-center">
        <li>
          <NavLink 
            to="/" 
            className={({isActive}) => isActive ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1" : "hover:text-gray-200"}
          >
            Home
          </NavLink>
        </li>
        
        <li>
          <NavLink 
          to="/services" 
          className={({isActive}) => isActive ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1" : "hover:text-gray-200"}
          >
            Services
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/admin" 
            className={({isActive}) => isActive ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1" : "hover:text-gray-200"}
          >
            Admin
          </NavLink>
        </li>

        {
          !isLoggedIn && <li>
            <Button 
              className='px-4 py-1 bg-yellow-500 hover:bg-yellow-600 active:bg-blue-800 text-white font-bold rounded-md border-none' 
              onClick={toggleLogin}
            >
              Login

            </Button>
          </li>
        }

        {
          !isLoggedIn && <li>
            <Button 
              className='px-4 py-1 bg-yellow-500 hover:bg-yellow-600 active:bg-blue-800 text-white font-bold rounded-md border-none' 
              onClick={toggleRegister}
            >
                Register
            </Button>
          </li>
        }

        {
          isLoggedIn && <li>
            <Button 
              className='px-4 py-1 bg-yellow-500 hover:bg-yellow-600 active:bg-blue-800 text-white font-bold rounded-md border-none' 
              onClick={logout}
            >
              Logout
            </Button>
          </li>
        }
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
