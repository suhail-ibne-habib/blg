import express from 'express'
import { getPosts, getPost, createPost, deletePost, uploadImgAuth } from '../controllers/post.ctrl.js'
import increaseVisit from '../middlewares/increaseVisit.js'


const router = express.Router()

router.get( '/upload-image-auth', uploadImgAuth )

router.get('/', getPosts)
router.get('/:slug', increaseVisit, getPost)

router.post("/", createPost)

router.delete("/:id", deletePost)

export default router