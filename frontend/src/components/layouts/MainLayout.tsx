import * as React from 'react'
import { MainFooter, MainHeader } from '../organisms'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <React.Fragment>
      <MainHeader />
      <main className="min-h-screen pt-20 lg:pt-24">
        <Outlet />
      </main>
      <MainFooter />
    </React.Fragment>
  )
}
