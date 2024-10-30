import { type Request, type Response } from 'express'
import { type IRoadmap } from '../types/roadmap.type'
import { validRoadmap } from '../validations/roadmap.validation'
import { logError, logInfo } from '../utils/logger'

import * as RoadmapService from '../services/roadmap.service'

export const createRoadmap = async (req: Request, res: Response) => {
  const { value, error } = validRoadmap(req.body as IRoadmap)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const data = await RoadmapService.addNewRoadmap(value, req.userId as string)

    logInfo(req, 'Creating new roadmap')
    res.status(200).json({ message: 'Berhasil membuat roadmap baru', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateRoadmap = async (req: Request, res: Response) => {
  const { value, error } = validRoadmap(req.body as IRoadmap)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const data = await RoadmapService.updateRoadmapById(req.params.roadmapId, value)

    logInfo(req, 'Updating roadmap data')
    res.status(200).json({ message: 'Berhasil mengubah data roadmap', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteRoadmap = async (req: Request, res: Response) => {
  try {
    await RoadmapService.deleteRoadmapById(req.params.roadmapId)

    logInfo(req, 'Deleting roadmap')
    res.status(200).json({ message: 'Berhasil menghapus roadmap' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getRoadmap = async (req: Request, res: Response) => {
  try {
    const data = await RoadmapService.getRoadmapById(req.params.roadmapId)

    logInfo(req, 'Fetching roadmap')
    res.status(200).json({ message: 'Berhasil mendapatkan roadmap', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getRoadmaps = async (req: Request, res: Response) => {
  try {
    const data = await RoadmapService.getAllRoadmaps()

    logInfo(req, 'Fetching all roadmaps')
    res.status(200).json({ message: 'Berhasil mendapatkan semua roadmap', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
