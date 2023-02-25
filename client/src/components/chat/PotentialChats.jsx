import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContextProvider'
import { ChatContext } from '../../context/ChatContext'

const PotentialChats = () => {
    // const {user} = useContext(AuthContext)
    const {potentialChats, userChats, createChats} = useContext(ChatContext)
    const user = JSON.parse(localStorage.getItem("User"))
    // console.log("new user", user);
    // let pChats = []
    // if(potentialChats.length > 0){
    //     pChats= potentialChats.filter((u)=>{
    //         let isChatCreated = false
    //         if(user._id.toString() === u._id.toString()) return false
    //         if(userChats){
    //             isChatCreated = userChats?.some((chat)=>{
    //                 return chat.members[0].toString() === u._id.toString() || chat.members[1].toString() === u._id.toString()
    //             })
    //         }
    //         return !isChatCreated
    //     })
        
    // }
    
    // console.log(pChats.length);
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
                    <div className="user-online"></div>
                </div>
            )
        })}
    </div>
    </>
  )
}

export default PotentialChats