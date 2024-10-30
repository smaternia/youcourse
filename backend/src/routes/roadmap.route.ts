import express from 'express'

import { createRoadmap, deleteRoadmap, getRoadmap, getRoadmaps, updateRoadmap } from '../controllers/roadmap.controller'

import verifyJwt, { verifyAdmin } from '../middlewares/verifyJwt'

const roadmapRoute = express.Router()

roadmapRoute.post('/', verifyJwt, verifyAdmin, createRoadmap)
roadmapRoute.put('/:roadmapId', verifyJwt, verifyAdmin, updateRoadmap)
roadmapRoute.delete('/:roadmapId', verifyJwt, verifyAdmin, deleteRoadmap)
roadmapRoute.get('/:roadmapId', getRoadmap)
roadmapRoute.get('/', getRoadmaps)

export default roadmapRoute
