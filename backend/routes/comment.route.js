import express from 'express'

import { getComments, createComment, deleteComment } from '../controllers/comment.ctrl.js'

const router = express.Router()

router.get('/:postId', getComments )
router.post( '/:postId', createComment )
router.delete( '/:id', deleteComment )

export default router