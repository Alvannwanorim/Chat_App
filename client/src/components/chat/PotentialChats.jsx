import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContextProvider'
import { ChatContext } from '../../context/ChatContext'

const PotentialChats = () => {
    // const {user} = useContext(AuthContext)
    const {potentialChats, userChats, createChats,onlineUsers} = useContext(ChatContext)
    const user = JSON.parse(localStorage.getItem("User"))
  return (
    <>
    <div className='all-users'>

        {potentialChats.length > 0 && potentialChats.map((u,index)=>{
            return (
                <div className="single-user" 
                key={index} 
                onClick={()=>createChats(user._id,u._id)}
                >
                    {u.name}
                    <div className={onlineUsers?.some(user=> user.userId===u._id)? "user-online":""}></div>
                </div>
            )
        })}
    </div>
    </>
  )
}

export default PotentialChats