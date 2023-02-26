import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContextProvider'
import { ChatContext } from '../../context/ChatContext'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient'

const ChatBox = () => {
    const {user} = useContext(AuthContext)
    const {messages,currentChat,isMessageLoading} = useContext(ChatContext)
    const {recipientUser} = useFetchRecipientUser(currentChat, user)
    console.log('here',recipientUser);
    if(!recipientUser) return (
        <p style={{textAlign:'center', width:'100%'}}>
            No conversation selected yet...
        </p>
    )
  return (
    <div>ChatBox</div>
  )
}

export default ChatBox