import express from 'express'
import { check } from 'express-validator'
import { findAllUsers, findUser, login, register } from '../controllers/userController.js'
const router = express.Router()

router.post("/register",
        check("name").isString().withMessage('Name is required'),
        check("name").isLength({min:3, max:200}).withMessage('Name is required with minimum or 3 characters'),
        check("password").isStrongPassword().withMessage('password is required'),
        check("email").isEmail().withMessage("Enter a valid email"),
        register)

router.post("/login",
        check("email").isEmail().withMessage("Enter a valid email"),
        login)
router.get("/find/:userId",findUser)
router.get("",findAllUsers)

export default router