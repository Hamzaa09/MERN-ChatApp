import express from 'express'
import { getProfile, login, register, logout, otherUsers, userUpdate } from '../controller/user.controller.js'
import { authCheck } from '../middlewares/auth.middleware.js'

const router = express()

router.post('/login', login)
router.post('/signup', register)
router.post('/logout', logout)
router.get('/getProfile', getProfile)
router.get('/getOthers', otherUsers)
router.patch('/profileupdate', userUpdate)

export default router