// ...existing code...
import React, { useState } from 'react'
import type { ActionsType } from '../../App'
import { Button } from '../utils/Button'
import PopUp from '../utils/PopUp.tsx'

type RegisterType = { 
  appDispatch: React.Dispatch<ActionsType>
}

export const Register = ({appDispatch}:RegisterType) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')  
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('')
  const [popupType, setPopupType] = useState<'error' | 'alert' | 'success'>('error')

  const onValueChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value)
  }

  const handleCheck = () => {
    if (password !== passwordConfirm) {
      setShowPopup(true);
      setPopupType('error');
      setPopupMessage('Las contraseñas no coinciden');
      return false;
    }
    setShowPopup(false);
    return true;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  // llamar a handleCheck antes de continuar
  if (!handleCheck()) return

  if(!validateEmail(email)){
    setShowPopup(true);
    setPopupType('alert');
    setPopupMessage('El correo electrónico ingresado no es válido');
    return;
  }

  if(!validatePassword(password)){
    setShowPopup(true);
    setPopupType('alert');
    setPopupMessage('La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula y un número');
    return; 
  }
  
  try {
    const res = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      }),
    })

    // Intentar parsear JSON cuando corresponda, si no usar texto
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



    // Loguear para debugging
    if (!res.ok) {
      console.groupCollapsed(`Register failed — ${res.status} ${res.statusText}`)
      console.error('HTTP status:', res.status)
      console.error('Status text:', res.statusText)
      console.error('Response body:', data)
      console.groupEnd()

      switch (data.errorType) {
        case 'used-username':
          setShowPopup(true);
          setPopupType('alert');
          setPopupMessage('El nombre de usuario ya está en uso');
          break;
        case 'used-email':
          setShowPopup(true);
          setPopupType('alert');
          setPopupMessage('El correo electrónico ya está en uso');
          break;
        case 'invalid-data':
          setShowPopup(true);
          setPopupType('alert');
          setPopupMessage('Datos inválidos');
          break;
        case 'unknown-error':
          if (data.message == "\"password\" length must be at least 6 characters long"){
            setShowPopup(true);
            setPopupType('error');
            setPopupMessage('La contraseña debe tener al menos 6 caracteres');
          }else{
            setShowPopup(true);
            setPopupType('error');
            setPopupMessage('El correo que ingresaste no es valido');
          }
          break;
        default:
          setShowPopup(true);
          setPopupType('error');
          setPopupMessage('Este PopUp no deberia Aparecer NUNCA');
      }

      return
    }

    console.log('User created correctly', data)
    setShowPopup(true);
    setPopupType('success');
    setPopupMessage('Usuario creado correctamente');
  } catch (err) {
    // Error de red u otro inesperado
    console.error('Network or unexpected error during registration:', err)
  }
}

  const toggleLogin = () => appDispatch({ type: 'register' })

  const existingAccount = () => {
    appDispatch({ type: 'register' })
    appDispatch({ type: 'login'  })
  }


  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 ">
      
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
        <PopUp
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          message={popupMessage}
          inline={true}
          variant={popupType}
        />
      </div>
    </div>
  )
}


function validateEmail(email: string){
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validatePassword(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}