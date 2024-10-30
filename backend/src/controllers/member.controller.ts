import { type Request, type Response } from 'express'
import { logInfo } from '../utils/logger'
import * as MemberService from '../services/member.service'

export const getMemberLogin = async (req: Request, res: Response) => {
  const { courseId } = req.params
  const userId = req.userId as string

  try {
    const data = await MemberService.getMemberByUserIdAndForumId(userId, courseId)

    logInfo(req, 'Getting member login')
    res.status(200).json({ message: 'Berhasil menampilkan member login', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
