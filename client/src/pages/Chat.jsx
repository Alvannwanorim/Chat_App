import React, { useContext } from 'react'
import { Container, Stack } from 'react-bootstrap';
import USerChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContextProvider';
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
  const {userChats,
    isUserChatLoading,
    userChatError} = useContext(ChatContext)

    const {user} = useContext(AuthContext)
  return (
    <Container>
      {userChats?.length < 1? null : 
      <Stack direction='horizontal' gap={4} className='align-items-start'>
        <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
          {isUserChatLoading && <p>Loading chats...</p>}
          {userChats?.map((chat,index)=>{
            return (
              <div key={index}>
                <USerChat chat={chat} user={user} />
              </div>
            )
          })}
        </Stack>
      </Stack>}
      <p>ChatBox</p>
    </Container>
  )
}

export default Chat