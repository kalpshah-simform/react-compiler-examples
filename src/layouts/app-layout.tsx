import { Outlet } from 'react-router-dom'
import { AppHeader } from '@/layouts/app-header'

export function AppLayout() {
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
