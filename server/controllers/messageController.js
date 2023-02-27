import { validationResult } from "express-validator";
import { messageModel } from "../models/messageModel.js";

export const createMessage = async(req,res)=>{
    const {chatId, senderId, text} = req.body 
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            const error = Array(errors.array().map(err=> err.msg).join(",") )
            return res.status(400).json({message:error[0]})
        }
        const newMessage = new messageModel({
            chatId, senderId, text
        })
        await newMessage.save();
        res.status(201).json(newMessage)
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Server error"})
    }
}

export const getMessages =async(req, res)=>{
    const chatId = req.params.chatId
    try {
        const message = await messageModel.find({chatId})
        
        res.status(201).json(message)
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Server error"})
    }
}