import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StateUserContext = createContext({
    token: null,
    setToken: () => {},
    user: null,
    setUser: () => {},
    storeAuth: () => {},
    logout: () => {}
})


export default function UserContext({children}){
    const [token,setToken] = useState(null)
    const [user,setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const storeAuth = async (user,token) => {
        try {
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user))
            setToken(token);
            setUser(user);
        } catch (e) {
            console.log(`storeAuth error : ${e}`)
        }
    }
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('user')
            setToken(null)
        } catch (e){
            console.log(`logout error : ${e}`)
        }
    }
    useEffect(() => {
        try {
            async function loadAuth(){
                 const storedToken = await AsyncStorage.getItem('token')
                const storedUser = await AsyncStorage.getItem('user')
                if (storedToken){
                    setToken(storedToken)
                }
                if (storedUser){
                    setUser(JSON.parse(storedUser))
                }
            }
        }catch (e){
            console.log(`loadAuth error : ${e}`)
        }
        loadAuth()
    }, [token]);

    return (
        <StateUserContext.Provider value={{
            token,setToken,user,setUser,storeAuth,logout,
            isLoading,setIsLoading
        }}>
            {children}
        </StateUserContext.Provider>
    )
}
export const useUserContext = () => useContext(StateUserContext)