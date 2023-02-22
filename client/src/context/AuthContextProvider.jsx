import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{

    const [user, setUser] = useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginError, setLoginError] = useState(null)

    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email:'',
        password:'',
    })

    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:'',
    })

    useEffect(() => {
      const user = localStorage.getItem("User")
      setUser(JSON.parse(user))
    }, [])
    
    const registerUer = useCallback(async(e)=>{
        e.preventDefault()
        setIsRegisterLoading(true)
        setRegisterError(null)
        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))

        setIsRegisterLoading(false)
        if (response.error){
            return setRegisterError(response)
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    },[registerInfo])

    const updateRegisterInfo = useCallback((info)=>{
        setRegisterInfo(info)
    },[])

    const updateLoginInfo = useCallback((info)=>{
        setLoginInfo(info)
    },[])

    const logoutUser = useCallback(()=>{
        localStorage.removeItem("User")
        setUser(null)
    },[])

    const loginUser = useCallback(async(e)=>{
        e.preventDefault()
        setLoginLoading(true)
        setLoginError(null)
        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo))

        setLoginLoading(false)
        if (response.error){
            return setLoginError(response)
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    },[loginInfo])
    return <AuthContext.Provider value={{
        user,
        registerInfo,
        registerError,
        isRegisterLoading,
        loginInfo,
        loginLoading,
        loginError,
        updateRegisterInfo,
        registerUer,
        updateLoginInfo,
        loginUser,
        logoutUser
    }}>
        {children}
    </AuthContext.Provider>
}