import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AdminLayout, MainLayout, ProtectedAuth, ProtectedFromAdmin, ProtectedFromGuest } from './components/layouts'
import ImagePreview from './components/atoms/forms/ImagePreview'
import { Toaster } from './components/ui/toaster'

import {
  AdminCourse,
  AdminProfile,
  AdminRoadmap,
  CreateCourse,
  CreateRoadmap,
  CreateVideo,
  VideoCourse
} from './pages/admin'
import { UserSettings } from './pages/user'
import { Home, Course, DetailCourse, Roadmap, DetailRoadmap } from './pages/public'
import { ForgotPassword, Login, Register, ResetPassword, VerifyEmail } from './pages/auth'

import { useDialog, usePreviewImage } from './store/client'
import { Dialog } from './components/organisms'
import { DialogOptions } from './components/organisms/Dialog'

export default function App() {
  const { dialogOptions, handleClose, handleSubmit } = useDialog()
  const { previewImage, setPreviewImage } = usePreviewImage((state) => ({
    previewImage: state.previewImage,
    setPreviewImage: state.setPreviewImage
  }))

  return (
    <React.Fragment>
      <Dialog
        open={Boolean(dialogOptions)}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...(dialogOptions as DialogOptions)}
      />
      {previewImage && <ImagePreview image={previewImage} onShow={() => setPreviewImage('')} />}
      <Toaster />
      <Routes>
        <Route element={<ProtectedAuth />}>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="/verify" element={<VerifyEmail />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/course">
            <Route index element={<Course />} />
            <Route path=":courseId" element={<DetailCourse />} />
            <Route path=":courseId/video/:videoId" element={<DetailCourse />} />
          </Route>
          <Route path="/roadmap">
            <Route index element={<Roadmap />} />
            <Route path=":roadmapId" element={<DetailRoadmap />} />
          </Route>
          <Route element={<ProtectedFromAdmin />}>
            <Route path="/me">
              <Route index element={<UserSettings />} />
              <Route path="course" element={<Course />} />
            </Route>
          </Route>
        </Route>
        <Route element={<ProtectedFromAdmin />}>
          <Route path="/me/change-password" element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedFromGuest />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin">
              <Route path="profile" element={<AdminProfile />} />
              <Route path="course">
                <Route index element={<AdminCourse />} />
                <Route path="create" element={<CreateCourse />} />

                <Route path=":courseId">
                  <Route index element={<CreateCourse />} />
                  <Route path="video">
                    <Route index element={<VideoCourse />} />
                    <Route path="create" element={<CreateVideo />} />
                    <Route path=":videoId" element={<CreateVideo />} />
                  </Route>
                </Route>
              </Route>

              <Route path="roadmap">
                <Route index element={<AdminRoadmap />} />
                <Route path="create" element={<CreateRoadmap />} />
                <Route path=":roadmapId" element={<CreateRoadmap />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  )
}
