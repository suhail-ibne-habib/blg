import express from 'express'
import { getPosts, getPost, createPost, deletePost, uploadImgAuth } from '../controllers/post.ctrl.js'


const router = express.Router()

router.get( '/upload-image-auth', uploadImgAuth )

router.get('/', getPosts)
router.get('/:slug', getPost)

router.post("/", createPost)

router.delete("/:id", deletePost)

export default router