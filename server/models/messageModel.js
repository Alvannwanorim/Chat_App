import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    chatId: String,
    senderId: String,
    text: String,
},{
    timestamps: true
})

export const messageModel = mongoose.model("Message",messageSchema)