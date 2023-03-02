import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";

export const ChatContext = createContext()

export const ChatContextProvider = ({children, user})=>{
    const [userChats, setUserChats] = useState(null)
    const [isUserChatLoading, setIsUserChatLoading] = useState(false)
    const [userChatError, setUserChatError] = useState(null)
    const [potentialChats, setPotentialChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [isMessageLoading, setIsMessageLoading] = useState(false)
    const [messageError, setMessageError] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [sendMessageError, setSendMessageError] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null)
    const [notification, setNotification] = useState([])
    const [allUsers, setAllUsers] = useState([])
    // console.log("notification", notification);
    // console.log("notification", currentChat);
    useEffect(()=>{
        const newSocket = io("http://localhost:3000")
        setSocket(newSocket)

        return () =>{
            newSocket.disconnect()
        }
    },[user])


    // Add online users

    useEffect(()=>{
        if(socket === null) return
        socket.emit("addNewUser", user?._id)
        socket.on("getOnlineUsers", (res)=>{
            setOnlineUsers(res)
        })

        return () =>{
            socket.off("getOnlineUsers")
        }
    },[socket])

    // send message 
    useEffect(()=>{
        if(socket === null) return
        const recipientId = currentChat?.members?.find((id)=> id !== user._id)
        socket.emit("sendMessage",{...newMessage, recipientId})
    },[newMessage])

    // Receive message and notifications
    useEffect(()=>{
        if(socket === null) return
        socket.on("getMessage",(res)=>{
            if(currentChat?._id !== res.chatId) return
            setMessages((prev)=>[...prev, res])
        })

        socket.on("getNotification", (res)=>{
            console.log(res);
            const isChatOpen = currentChat?.members.some((id)=> id === res.senderId)
            console.log(isChatOpen, currentChat);
            if(isChatOpen){
                setNotification((prev)=> [{...res, isRead: true}, ...prev])
            }else{
                setNotification((prev)=>[res, ...prev])
            }
        })
        return ()=>{
            socket.off("getMessage")
            socket.off("getNotification")
        }

    },[socket, currentChat])



    useEffect(()=>{
        const getUsers =async()=>{
        const response = await getRequest(`${baseUrl}/users`)
        if (response.error){
            console.log("error fetching users", response.error);
            return
        }
        const pChats= response.filter((u)=>{
            let isChatCreated = false
            if(user._id === u._id) return false
            if(userChats){
                isChatCreated = userChats?.some((chat)=>{
                    return chat.members[0] === u._id || chat.members[1] === u._id
                })
            }
            return !isChatCreated
        })

        setPotentialChats(pChats)
        setAllUsers(response)
        }
        getUsers()
    },[userChats])

    useEffect(() => {
        
        const getMessages = async()=>{
          if(user?._id){
              setIsMessageLoading(true)
              setMessageError(null)
              const response = await getRequest(`${baseUrl}/message/${currentChat._id}`)
  
              setIsMessageLoading(false)
              if(response.error){
                  return setMessageError(response)
              }
  
              setMessages(response)
          }
        }
        getMessages()
      }, [currentChat])

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
    
    const sendTextMessage = useCallback(async(textMessage, sender,currentChatId, setTextMessage)=>{
        if(!textMessage) {
            console.log('add a message body')
            return
        } 
        const response = await postRequest(`${baseUrl}/message`,JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
        }))
        // console.log(response);
        if(response.error){
            setSendMessageError(response)
        }
        setNewMessage(response)
        setMessages((prev)=>[...prev, response])
        setTextMessage("")
    },[])

    const updateCurrentChat = useCallback((chat)=>{
        setCurrentChat(chat)
    })
    const createChats = useCallback(async(firstId, secondId)=>{
        const response = await postRequest(`${baseUrl}/chat`, JSON.stringify({
            firstId,secondId
        }))
        if (response.error){
            console.log("Error creating chat", response);
        }
        // console.log(response);
        setUserChats((prev)=> [...prev, response])
    },[])
    return (
        <ChatContext.Provider value={{
            userChats,
            isUserChatLoading,
            userChatError,
            potentialChats,
            createChats,
            sendTextMessage,
            updateCurrentChat,
            currentChat,
            messages,
            messageError,
            isMessageLoading,
            onlineUsers,
            notification,
            allUsers
        }}>
            {children}
        </ChatContext.Provider>
    )
}