import { Outlet } from "react-router-dom"
import { Navbar } from "./components/home/Navbar"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { useEffect, useReducer } from "react"
import { AuthContext } from "./components/context/authContext"

export type AppStateType = {
  isLogOpened: boolean,
  isRegOpened: boolean,
  isLoggedIn: boolean,
  userInfo: {
      id: string, 
      username: string, 
      email: string,
      rol: string[],
    } | undefined
}

type User = { id: string; username: string; email: string, rol: string[] }

export type ActionsType =
  | { type: typeof ACTIONS.login }
  | { type: typeof ACTIONS.register }
  | { type: typeof ACTIONS.logout }
  | { type: typeof ACTIONS.user; payload: User }

const ACTIONS = {
  login: 'login',
  register: 'register',
  logout: 'logout',
  user: 'user'
} as const


function reducer (state: AppStateType, action: ActionsType) {
  switch (action.type) {
    case ACTIONS.login: 
      return {...state, isLogOpened: !state.isLogOpened}
    case ACTIONS.register: 
      return {...state, isRegOpened: !state.isRegOpened}
    case ACTIONS.logout:
      return {...state, isLoggedIn: false, userInfo: undefined}
    case ACTIONS.user: 
      return {...state, isLoggedIn: true, userInfo: action.payload}
    default:
      return {...state}
  }
} 

function App() {
  const [appState, appDispatch] = useReducer(reducer, {isLogOpened: false, isRegOpened: false, isLoggedIn: false, userInfo: undefined})

  useEffect(() => {

    const fetchData = async () => {
      const userFetch = await fetch('http://localhost:3000/auth/me', {
        credentials: 'include'
      })

      if(!userFetch.ok){
        return;
      } 

      

      const userData = await userFetch.json()

      if(!userData.user){
        return;
      }
      
      appDispatch({type: 'user', payload: userData.user})
    }

    fetchData()
  }, [])


  return (
    <AuthContext.Provider value={{
      isLoggedIn: appState.isLoggedIn,
      userInfo: appState.userInfo,
      appDispatch: appDispatch,
      appState: appState,
    }}>
      <div>
        <Navbar appDispatch={appDispatch}/>
        <Outlet/>
      </div>

      {appState.isLogOpened && <Login appDispatch={appDispatch}/>}
      {appState.isRegOpened && <Register appDispatch={appDispatch}/>}
      

    </AuthContext.Provider>
  )
}

export default App
