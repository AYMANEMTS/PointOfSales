import {createContext, useContext, useState} from "react";

export const StateAdminContext = createContext()
export default function AdminContext({children}){
    const [isLoading, setIsLoading] = useState(false)

    return <StateAdminContext.Provider value={{isLoading,setIsLoading}}>
        {children}
    </StateAdminContext.Provider>
}

export const useAdminContext = () => useContext(StateAdminContext)