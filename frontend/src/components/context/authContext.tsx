import { createContext } from "react";
import type { ActionsType, AppStateType } from "../../App";

type AuthContextType = {
    isLoggedIn: boolean,
    userInfo: {
        id: string, 
        username: string, 
        email: string,
        rol: string[]
    } | undefined,
    appDispatch: React.Dispatch<ActionsType> | undefined,
    appState: AppStateType | undefined
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    userInfo: undefined,
    appDispatch: undefined,
    appState: undefined
})