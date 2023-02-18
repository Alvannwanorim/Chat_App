import express from 'express'
import { check } from 'express-validator'
import { findAllUsers, findUser, login, register } from '../controllers/userController.js'
const router = express.Router()

router.post("/register",
        check("name").isString().withMessage('Name is required'),
        check("password").isStrongPassword().withMessage('password is required'),
        check("email").isEmail().withMessage("Enter a valid email"),
        register)

router.post("/login",
        check("password").isStrongPassword().withMessage('password is required'),
        check("email").isEmail().withMessage("Enter a valid email"),
        login)
router.get("/find/:userId",findUser)
router.get("/find-all",findAllUsers)

export default router