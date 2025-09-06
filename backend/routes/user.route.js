import express from 'express'

import { getUsers, getUser, getUserSavedPosts, savePost } from '../controllers/user.ctrl.js'

const router = express.Router()

router.get('/saved', getUserSavedPosts)
router.patch('/save', savePost)

router.get('/', getUsers)
router.get('/:id', getUser)


export default router