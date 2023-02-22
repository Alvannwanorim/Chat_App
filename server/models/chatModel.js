import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    members: Array
},{
    timestamps: true
})

export const chatModel = mongoose.model("Chat", chatSchema)