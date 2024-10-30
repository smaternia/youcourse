import { type Request, type Response } from 'express'

import * as UserService from '../services/user.service'
import * as AuthService from '../services/auth.service'
import { logError, logInfo, logWarn } from '../utils/logger'
import { validChangePassword, validUpdateUser } from '../validations/user.validation'

import { type IChangePasswordPayload, type IUserUpdatePayload } from '../types/user.type'

export const updateMe = async (req: Request, res: Response) => {
  const { value, error } = validUpdateUser(req.body as IUserUpdatePayload)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const user = await UserService.getUserByUsername(value.username)
    if (user && user.id !== req.userId) {
      logWarn(req, 'Username already exists')
      return res.status(400).json({ error: 'Username sudah dipakai' })
    }

    const data = await UserService.updateUserById(req.userId as string, value)

    logInfo(req, 'Updating user data')
    res.status(200).json({ message: 'Berhasil mengubah data user', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const changePassword = async (req: Request, res: Response) => {
  const { value, error } = validChangePassword(req.body as IChangePasswordPayload)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    await AuthService.updateUserPassword(req.userId as string, value.password as string)

    logInfo(req, 'Changing user password')
    res.clearCookie('ask-ust-refresh-token')
    res.status(200).json({ message: 'Berhasil mengubah password user' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const changeProfilePicture = async (req: Request, res: Response) => {
  if (!req.file) {
    logWarn(req, 'No file uploaded')
    return res.status(400).json({ error: 'Tidak ada file yang diupload' })
  }

  try {
    const data = await UserService.updatePhoto(req.userId as string, req.file.filename)

    logInfo(req, 'Changing user profile picture')
    res.status(200).json({ message: 'Berhasil mengubah foto profil user', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const changeEmail = async (req: Request, res: Response) => {
  const { email } = req.body

  try {
    const user = await UserService.getUserByEmail(email as string)
    if (user) {
      logWarn(req, 'Email already exists')
      return res.status(400).json({ error: 'Email sudah dipakai' })
    }

    const token = AuthService.generateToken()
    await UserService.updateEmail(req.userId as string, email as string, token)
    AuthService.sendVerifyEmail(email as string, token)
    logInfo(req, 'Changing user email')
    res.status(200).json({ message: 'Berhasil mengubah email user' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const myCourses = async (req: Request, res: Response) => {
  const { page, limit, q } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10

  try {
    const { data, count } = await UserService.getMyCourses({
      page: currentPage,
      limit: perPage,
      search: (q as string) || '',
      userId: req.userId as string
    })

    logInfo(req, 'Getting user courses')
    res.status(200).json({
      message: 'Berhasil mendapatkan semua course user',
      data,
      meta: { current_page: currentPage, limit: perPage, total: count }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}
