import { chatModel } from "../models/chatModel.js"

export const createChat =async (req,res) =>{
    
    const {firstId, secondId} = req.body
    // console.log( req.body);
    try {
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        })
        if(chat){
            // console.log("here", chat);
            return res.status(200).json(chat)
        }
        const newChat = new chatModel({
            members: [firstId, secondId]
        })
        await newChat.save()
        res.status(201).json(newChat)

    } catch (err) {
        console.log(err);
        res.status(500).json({message: "server error"})
    }
}

export const findAllUserChats = async (req,res)=>{
    const userId = req.params.userId

   try {
    const chats = await chatModel.find({
        members: {$in: [userId]}
    })

    res.status(200).json(chats)
   } catch (err) {
        console.log(err);
        res.status(500).json({message: "server error"})
   }

}

export const findUserChat = async (req, res)=>{
    const {firstId, secondId} = req.params

   try {
    const chats = await chatModel.findOne({
        members: {$all: [firstId, secondId]}
    })

    res.status(200).json(chats)
   } catch (err) {
        console.log(err);
        res.status(500).json({message: "server error"})
   }

}