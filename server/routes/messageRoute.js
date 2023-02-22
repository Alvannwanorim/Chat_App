import express from 'express'
import { check } from 'express-validator';
import { createMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router()

router.post("",check("text").isLength({min:1}).withMessage("Pls add a message"), createMessage )
router.get("/:chatId", getMessages);

export default router;