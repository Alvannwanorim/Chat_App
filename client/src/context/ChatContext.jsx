import { createContext, useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";
export const ChatContext = createContext()

export const ChatContextProvider = ({children, user})=>{
    const [userChats, setUserChats] = useState(null)
    const [isUserChatLoading, setIsUserChatLoading] = useState(false)
    const [userChatError, setUserChatError] = useState(null)
    const [potentialChats, setPotentialChats] = useState(null)
    
    useEffect(()=>{
        const getUsers =async()=>{
        const response = await getRequest(`${baseUrl}/users`)
        if (response.error){
            console.log("error fetching users", response.error);
            return
        }
        console.log(response);
        // const pChats = response.find((u)=>{
        //     let isChatCreated = false
        //     if(user._id === u._id) return false
        //     if(userChats){
        //         isChatCreated = userChats?.some((chat)=>{
        //             return chat.members[u] === u._id || chat.members[1] === u._id
        //         })
        //     }
        //     return !isChatCreated
        // })

        setPotentialChats(response)
        }
        getUsers()
    },[userChats])
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
            userChatError,
            potentialChats
        }}>
            {children}
        </ChatContext.Provider>
    )
}