// ...existing code...
import React, { useState } from 'react'
import type { ActionsType } from '../../App'
import { Button } from '../utils/Button'
import WrongPassWordPopUp from '../utils/WrongPassWordPopUp'

type RegisterType = { 
  appDispatch: React.Dispatch<ActionsType>
}

export const Register = ({appDispatch}:RegisterType) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')  
  const [showPopup, setShowPopup] = useState(false);

  const onValueChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value)
  }

  const handleCheck = () => {
    if (password !== passwordConfirm) {
      setShowPopup(true);
      return false;
    }
    setShowPopup(false);
    return true;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // llamar a handleCheck antes de continuar
    if (!handleCheck()) return
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        }),
      })

      // Try to parse JSON when possible, otherwise capture text
      let data: any = null
      const contentType = res.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        try {
          data = await res.json()
        } catch (parseErr) {
          data = { message: 'Failed to parse JSON response', raw: await res.text() }
        }
      } else {
        data = { message: await res.text() }
      }

      // Log helpful debug info so we can see server problems in DevTools
      if (!res.ok) {
        console.groupCollapsed(`Register failed — ${res.status} ${res.statusText}`)
        console.error('HTTP status:', res.status)
        console.error('Status text:', res.statusText)
        console.error('Response body:', data)
        // server returns { message, errorType }
        if (data && data.message) console.error('message:', data.message)
        if (data && data.errorType) console.error('errorType:', data.errorType)
        // fallback for older error field names
        if (data && data.error) console.error('error:', data.error)
        console.groupEnd()
        return
      }

      console.log('User created correctly', data)
    } catch (err) {
      // Network or other unexpected error
      console.error('Network or unexpected error during registration:', err)
    }
  }

  const toggleLogin = () => appDispatch({ type: 'register' })

  const existingAccount = () => {
    appDispatch({ type: 'register' })
    appDispatch({ type: 'login'  })
  }


  return (
    <div className="fixed inset-0 bg-black opacity-75 flex items-center justify-center z-50 ">
      
      <div className="flex flex-col  justify-center bg-white rounded-2xl shadow-2xl w-100 p-10 relative h-120">
        <Button 
          onClick={toggleLogin}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl font-bold cursor-pointer"
        >
          ✕
        </Button>

        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Registrarse</h2>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <input 
            type="text" 
            placeholder="Nombre de usuario"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onChange={onValueChange(setUsername)}
          />

          <input 
            type="email" 
            placeholder="Correo electrónico"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onChange={onValueChange(setEmail)}
          />

          <input 
            type="password" 
            placeholder="Contraseña"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onChange={onValueChange(setPassword)}
          />

          <input 
            type="password" 
            placeholder="Confirma la contraseña"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onChange={onValueChange(setPasswordConfirm)}
          />

          <Button 
            className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white font-bold py-2 rounded-md text-center cursor-pointer"
            type='submit'
          >
            Registrarse
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Ya tienes una cuenta?{' '}
          <span 
            className="text-blue-700 font-semibold cursor-pointer hover:underline"
            onClick={existingAccount}
          > 
            Inicia sesión
          </span>
        </p>

        {/* Pop-up renderizado dentro del contenedor blanco y posicionado absolute */}
        <WrongPassWordPopUp
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          message="Las contraseñas no coinciden"
          inline={true}
          variant="error"
        />
      </div>
    </div>
  )
}
// ...existing code...