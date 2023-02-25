import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'

const PotentialChats = () => {
    const {potentialChats} = useContext(ChatContext)
    console.log(potentialChats);
  return (
    <div>PotentialChats</div>
  )
}

export default PotentialChats