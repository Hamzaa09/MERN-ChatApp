import express from 'express'
import { getProfile, login, register, logout, otherUsers, userUpdate } from '../controller/user.controller.js'
import { authCheck } from '../middlewares/auth.middleware.js'

const router = express()

router.post('/login', login)
router.post('/signup', register)
router.post('/logout', authCheck, logout)
router.get('/getProfile', authCheck, getProfile)
router.get('/getOthers', authCheck, otherUsers)
router.patch('/profileupdate', authCheck, userUpdate)

export default router