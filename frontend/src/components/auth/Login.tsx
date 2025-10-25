import React, { useState } from 'react'
import type { ActionsType } from '../../App'
import { Button } from '../utils/Button'

type LoginType = { 
  appDispatch: React.Dispatch<ActionsType>
}

export const Login = ({ appDispatch }: LoginType) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const createAccount = () => {
    appDispatch({ type: 'login' })
    appDispatch({ type: 'register'  })
  }

  const onValueChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const loginFetch = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
        credentials: 'include'
    })

    if(!loginFetch.ok){
        console.error("Something went wrong")
    } else {
      const userInfo = await loginFetch.json()
      appDispatch({type: 'user', payload: userInfo.payload})
      appDispatch({type: 'login'})
    }
  }

  const toggleLogin = () => appDispatch({ type: 'login' })

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 ">
      
      <div className="flex flex-col  justify-center bg-white rounded-2xl shadow-2xl w-100 p-10 relative h-120">
        <Button 
          onClick={toggleLogin}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl font-bold cursor-pointer"
        >
          ✕
        </Button>

        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Iniciar Sesión</h2>

        <form className="flex flex-col gap-4" onSubmit={(e) => onSubmit(e)}>
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

          <Button 
            className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white font-bold py-2 rounded-md text-center cursor-pointer"
            type="submit"
          >
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿No tienes una cuenta?{' '}
          <span 
            className="text-blue-700 font-semibold cursor-pointer hover:underline"
            onClick={createAccount}
          >
            Regístrate
          </span>
        </p>
      </div>
    </div>
  )
}
