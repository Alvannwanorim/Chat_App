import React, { useContext } from 'react'
import { Container, Stack } from 'react-bootstrap';
import ChatBox from '../components/chat/ChatBox';
import PotentialChats from '../components/chat/PotentialChats';
import USerChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContextProvider';
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
  const {userChats,
    isUserChatLoading,
    updateCurrentChat} = useContext(ChatContext)

    const {user} = useContext(AuthContext)
    
  return (
    <Container>
      <PotentialChats user={user}/>
      {userChats?.length < 1? null : (
        <Stack direction='horizontal' gap={4} className='align-items-start'>
        <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
          {isUserChatLoading && <p>Loading chats...</p>}
          {userChats?.map((chat,index)=>{
            return (
              <div key={index} onClick={()=>updateCurrentChat(chat)}>
                <USerChat chat={chat} user={user} />
              </div>
            )
          })}
        </Stack>
        <ChatBox/>
      </Stack>
      )}
      
    </Container>
  )
}

export default Chat