import express from 'express'
import { authCheck } from '../middlewares/auth.middleware.js'
import { getMessages, sendMessage } from '../controller/message.controller.js'
 
const router = express()

router.post('/sendMsg/:receiverId', authCheck, sendMessage)
router.get('/getMsg/:receiverId', authCheck, getMessages)

export default router