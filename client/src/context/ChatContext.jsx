import { createContext, useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";
export const ChatContext = createContext()

export const ChatContextProvider = ({children, user})=>{
    const [userChats, setUserChats] = useState(null)
    const [isUserChatLoading, setIsUserChatLoading] = useState(false)
    const [userChatError, setUserChatError] = useState(null)

    useEffect(() => {
      const getUserChats = async()=>{
        if(user?._id){
            setIsUserChatLoading(true)
            setUserChatError(null)
            const response = await getRequest(`${baseUrl}/chat/${user._id}`)

            setIsUserChatLoading(false)
            if(response.error){
                return setUserChatError(response)
            }

            setUserChats(response)
        }
      }
      getUserChats()
    }, [user])
    
    return (
        <ChatContext.Provider value={{
            userChats,
            isUserChatLoading,
            userChatError
        }}>
            {children}
        </ChatContext.Provider>
    )
}