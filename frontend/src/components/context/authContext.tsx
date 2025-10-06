import { createContext } from "react";
import type { ActionsType } from "../../App";

type AuthContextType = {
    isLoggedIn: boolean,
    userInfo: {
        id: string, 
        username: string, 
        email: string
    } | undefined,
    appDispatch: React.Dispatch<ActionsType> | undefined
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    userInfo: undefined,
    appDispatch: undefined
})