import { NavLink } from 'react-router-dom'
import logo from '../../assets/navbar-imgs/logo.png'
import { Button } from '../utils/Button'
import type { ActionsType } from '../../App'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import './Navbar.css'

type NavbarType = {
  appDispatch: React.Dispatch<ActionsType>
}

export const Navbar = ({appDispatch}: NavbarType) => {
  const {isLoggedIn, userInfo} = useContext(AuthContext)
  const [isAdmin, setAdmin] = useState(false)

  useEffect(() => {
    if(userInfo?.rol?.includes('admin')){
      setAdmin(true)
    } else {
      setAdmin(false)
    }
  }, [userInfo])

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
    }
  }

  return (
    <nav className="navbar-container">
   
      <NavLink to="/">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </NavLink>

      <ul className="navbar-menu">
        <li>
          <NavLink 
            to="/" 
            className={({isActive}) => isActive ? "navbar-link navbar-link-active" : "navbar-link"}
          >
            Home
          </NavLink>
        </li>
        
        {userInfo &&
          <li>
            <NavLink 
              to="/services" 
              className={({isActive}) => isActive ? "navbar-link navbar-link-active" : "navbar-link"}
            >
              Services
            </NavLink>
          </li>
        }
        
        {userInfo &&
          <li>
            <NavLink 
              to="/dashboard" 
              className={({isActive}) => isActive ? "navbar-link navbar-link-active" : "navbar-link"}
            >
              Mi Dashboard
            </NavLink>
          </li>
        }

        {userInfo && isAdmin &&
          <li>
            <NavLink 
              to="/admin" 
              className={({isActive}) => isActive ? "navbar-link navbar-link-active" : "navbar-link"}
            >
              Admin
            </NavLink>
          </li>
        }

        {!isLoggedIn && 
          <li>
            <Button 
              className="navbar-button" 
              onClick={toggleLogin}
            >
              Login
            </Button>
          </li>
        }

        {!isLoggedIn && 
          <li>
            <Button 
              className="navbar-button" 
              onClick={toggleRegister}
            >
              Register
            </Button>
          </li>
        }

        {isLoggedIn && 
          <li>
            <Button 
              className="navbar-button" 
              onClick={logout}
            >
              Logout
            </Button>
          </li>
        }
      </ul>

      {/* Botón menú móvil */}
      <button className="navbar-mobile-button">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  )
}