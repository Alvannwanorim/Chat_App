import express from 'express'
import { createChat, findAllUserChats, findUserChat,  } from '../controllers/chatController.js'
const router = express.Router()

router.post("", createChat )
router.get("/:firstId/:secondId", findUserChat );
router.get("/:userId", findAllUserChats);

export default router;