import { Outlet } from 'react-router-dom'
import AdminSidebar from '../organisms/sidebars/AdminSidebar'

export default function AdminLayout() {
  return (
    <section className="flex">
      <AdminSidebar />
      <main className="flex-1">
        <section className="relative min-h-[calc(100vh-68px)] flex-1 bg-white p-12 text-primary dark:bg-primary dark:text-white lg:min-h-0">
          <Outlet />
        </section>
      </main>

      {/* {isExpanded && <Rightbar />} */}
    </section>
  )
}
