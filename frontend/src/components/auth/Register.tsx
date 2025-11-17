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

  const [code, setCode] = useState('')
  const [verifyRegister, setVerifyRegister] = useState(false)


  const onValueChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value)
  }

  const handleOnChangeRegister = () => {
    setVerifyRegister(false)
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

  const onSubmitRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
      const res = await fetch('http://localhost:3000/auth/registerNonVerifiedUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        }),
      })

      let data: any = null
      const contentType = res.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        try {
          data = await res.json()
        } catch {
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
      setVerifyRegister(true)
    } catch (err) {
      console.error('Network or unexpected error during registration:', err)
    }
  }

  const onSubmitVerifyUser = async (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    const verifyUserFetch = await fetch('http://localhost:3000/auth/verifyUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        code: code
      })
    })

    const data: any = await verifyUserFetch.json()

    console.log(data);

    if(!verifyUserFetch.ok) {
      switch (data.errorType) {
        case 'no-active-code': 
          setShowPopup(true);
          setPopupType('error');
          setPopupMessage(data.message);
        break

        case 'non-existing-user': 
          setShowPopup(true);
          setPopupType('error');
          setPopupMessage(data.message);
        break

        case 'expired-code': 
          setShowPopup(true);
          setPopupType('error');
          setPopupMessage(data.message);
        break

        case 'invalid-code': 
          setShowPopup(true);
          setPopupType('alert');
          setPopupMessage(data.message);
        break
      }
    } else {
      setShowPopup(true);
      setPopupType('success');
      setPopupMessage('Usuario verificado correctamente');

      setVerifyRegister(false)
      setUsername('')
      setEmail('')
      setPassword('')
      setPasswordConfirm('')
      setCode('')
    }

    return
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



        {!verifyRegister && <> 
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Registrarse</h2>
            <form className="flex flex-col gap-4" onSubmit={onSubmitRegisterUser}>
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

          </> 
        }
        {
          verifyRegister && (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => onSubmitVerifyUser(e)}  
            >
              <h2 className="text-2xl font-bold text-center text-blue-900 mb-1">
                Verificar código
              </h2>

              <p className="text-sm text-gray-600 text-center">
                Te hemos enviado un código de verificación al correo{" "}
                <span className="font-semibold text-gray-800">{email || "ingresado"}</span>.
                Ingresa el código para activar tu cuenta.
              </p>

              <div className="flex flex-col items-center gap-2">
                <label
                  htmlFor="code"
                  className="text-sm font-medium text-gray-700 self-start"
                >
                  Código de verificación
                </label>
                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  className="w-full tracking-[0.6em] text-center text-lg font-semibold
                            border border-gray-300 rounded-md px-3 py-2
                            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
                            placeholder:tracking-normal"
                  placeholder="••••••"
                  onChange={onValueChange(setCode)} 
                />
                <p className="text-xs text-gray-500">
                  El código es válido por unos minutos. Revisa también la carpeta de spam.
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700
                            text-white font-bold py-2 rounded-md text-center cursor-pointer"
                >
                  Confirmar código
                </Button>

              </div>

              <div className="mt-1 flex flex-col gap-1 text-xs text-gray-500">
                <button
                  type="button"
                  className="self-start hover:underline"
                  onClick={handleOnChangeRegister}
                >
                  Regresar al registro
                </button>
              </div>
            </form>
          )
        }


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