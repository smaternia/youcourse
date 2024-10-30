import { type Application, type Router } from 'express'

import authRoute from './auth.route'
import userRoute from './user.route'
import courseRoute from './course.route'
import videoRoute from './video.route'
import roadmapRoute from './roadmap.route'
import memberRoute from './member.route'
import commentRoute from './comment.route'

const _routes = [
  ['/auth', authRoute],
  ['/user', userRoute],
  ['/course', courseRoute],
  ['/video', videoRoute],
  ['/roadmap', roadmapRoute],
  ['/member', memberRoute],
  ['/comment', commentRoute]
]

const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url as string, router as Router)
  })
}

export default routes
