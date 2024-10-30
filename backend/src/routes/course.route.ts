import express from 'express'
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  getVideos,
  joinCourse,
  leaveCourse,
  publishCourse,
  updateCourse
} from '../controllers/course.controller'
import verifyJwt, { verifyAdmin, verifyUserRole } from '../middlewares/verifyJwt'
import upload from '../middlewares/multer'

const courseRoute = express.Router()

courseRoute.get('/', verifyUserRole, getCourses)
courseRoute.get('/:courseId', verifyUserRole, getCourse)
courseRoute.get('/:courseId/videos', verifyUserRole, getVideos)

courseRoute.post('/:courseId/join', verifyJwt, joinCourse)
courseRoute.post('/:courseId/leave', verifyJwt, leaveCourse)

courseRoute.post('/', upload.single('thumbnail'), verifyJwt, verifyAdmin, createCourse)
courseRoute.put('/:courseId', upload.single('thumbnail'), verifyJwt, verifyAdmin, updateCourse)
courseRoute.delete('/:courseId', verifyJwt, verifyAdmin, deleteCourse)
courseRoute.put('/:courseId/publish', verifyJwt, verifyAdmin, publishCourse)

export default courseRoute
