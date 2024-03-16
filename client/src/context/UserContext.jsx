import {createContext, useContext, useState} from "react";
import AuthApi from "../api/AuthApi.jsx";

export const StateUserContext = createContext({
    user:{},
    setUser:() => {},
    login: () => {},
    logout: () => {},
    token: null,
    setToken: () => {}

})
export default function UserContext({children}) {
    const storedUserData = localStorage.getItem('userData');
    const initialUser = storedUserData ? JSON.parse(storedUserData) : null
    const [user, setUser] = useState(initialUser)
    const storedToken = localStorage.getItem('token');
    const initialToken = storedToken ? storedToken : null
    const [token, setToken] = useState(initialToken)
    const login = async (email,password) => {
        await AuthApi.getCsrfToken()
        return await AuthApi.login(email,password)
    }
    return (
        <>
            <StateUserContext.Provider value={{
                user,
                setUser,
                login,
                token,
                setToken
            }}  >
                {children}
            </StateUserContext.Provider>
        </>
    );
}
export const useUserContext = () =>  useContext(StateUserContext)
