import userModel from '../models/userModel.js'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

const createToken= (_id) =>{
     const token = jwt.sign({_id}, process.env.JWT_SECRET,{
        expiresIn: '1d'
     })

     return token;

}
export const register = async(req,res) =>{
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            const error = Array(errors.array().map(err=> err.msg).join(",") )
            return res.status(400).json({message:error[0]})
        }
        const {name, email, password} = req.body 

        const user = await userModel.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"})
        }

        const newUser = new userModel({
            name, email, password
        })
        const salt = await bcrypt.genSalt(10)
        newUser.password =  await bcrypt.hash(newUser.password, salt)
        await newUser.save()
        const token = createToken(newUser._id)
        res.status(201).json({_id: newUser._id, name: newUser.name, email: newUser.email, token});
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Server error"})
    }
        
}

export const login = async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "Not found"})
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const token = createToken(user._id)
        res.status(201).json({_id: user._id, name: user.name, email: user.email, token});
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Server error"})
    }
}

export const findUser = async(req,res)=>{
    try {
        const user = await userModel.findById(req.params.usedId);

        if(!user){
            return res.status(404).json({message: "Not found"})
        }
        res.status(200).json({user})
    } catch (err) {
        sole.log(err);
        res.status(500).json({message:"Server error"})
    }
}

export const findAllUsers = async(req,res)=>{
    try {
        const users = await userModel.find({});
        res.status(200).json({users})
    } catch (err) {
        sole.log(err);
        res.status(500).json({message:"Server error"})
    }
}