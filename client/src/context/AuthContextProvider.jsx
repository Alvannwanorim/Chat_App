import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{

    const [user, setUser] = useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)

    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email:'',
        password:'',
    })

    const registerUer = useCallback(async(e)=>{
        e.preventDefault()
        setIsRegisterLoading(true)
        setRegisterError(null)
        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))

        setIsRegisterLoading(false)
        if (response.error){
            setRegisterError(response)
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    },[])

    const updateRegisterInfo = useCallback((info)=>{
        setRegisterInfo(info)
    },[])
    return <AuthContext.Provider value={{
        user,
        registerInfo,
        registerError,
        isRegisterLoading,
        updateRegisterInfo,
        registerUer
    }}>
        {children}
    </AuthContext.Provider>
}