import { Outlet, useNavigation } from 'react-router-dom'
import { AppHeader } from '@/layouts/app-header'
import { cn } from '@/lib/utils'

export function AppLayout() {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <div className="flex h-screen flex-col">
      <div
        className={cn(
          'h-0.5 bg-primary transition-opacity',
          isLoading ? 'opacity-100' : 'opacity-0',
        )}
      />
      <AppHeader />
      <main className="min-h-0 flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
