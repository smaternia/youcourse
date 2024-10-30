import express from 'express'
import { getMemberLogin } from '../controllers/member.controller'
import verifyJwt from '../middlewares/verifyJwt'

const memberRoute = express.Router()

memberRoute.get('/course/:courseId', verifyJwt, getMemberLogin)

export default memberRoute
