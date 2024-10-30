import express from 'express'

import { createComment, deleteComment, getComment, getComments, updateComment } from '../controllers/comment.controller'

import verifyJwt from '../middlewares/verifyJwt'

const commentRoute = express.Router()

commentRoute.post('/', verifyJwt, createComment)
commentRoute.put('/:commentId', verifyJwt, updateComment)
commentRoute.delete('/:commentId', verifyJwt, deleteComment)
commentRoute.get('/:commentId', verifyJwt, getComment)
commentRoute.get('/video/:videoId', getComments)

export default commentRoute
