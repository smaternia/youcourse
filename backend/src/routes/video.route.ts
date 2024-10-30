import express from 'express'

import { createVideo, deleteVideo, getVideo, getYoutubeVideo, updateVideo } from '../controllers/video.controller'

import verifyJwt, { verifyAdmin } from '../middlewares/verifyJwt'

const videoRoute = express.Router()

videoRoute.post('/', verifyJwt, verifyAdmin, createVideo)
videoRoute.put('/:videoId', verifyJwt, verifyAdmin, updateVideo)
videoRoute.delete('/:videoId', verifyJwt, verifyAdmin, deleteVideo)
videoRoute.get('/:videoId', verifyJwt, getVideo)
videoRoute.get('/youtube/:videoId', getYoutubeVideo)

export default videoRoute
