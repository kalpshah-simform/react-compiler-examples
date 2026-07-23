import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppStore } from '@/features/zustand/store/use-app-store'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

export function ControlPanel() {
  const counter = useAppStore((state) => state.counter)
  const user = useAppStore((state) => state.user)
  const theme = useAppStore((state) => state.theme)
  const notificationCount = useAppStore((state) => state.notifications.length)

  const increment = useAppStore((state) => state.increment)
  const decrement = useAppStore((state) => state.decrement)
  const reset = useAppStore((state) => state.reset)
  const switchUser = useAppStore((state) => state.switchUser)
  const toggleTheme = useAppStore((state) => state.toggleTheme)
  const addNotification = useAppStore((state) => state.addNotification)
  const clearNotifications = useAppStore((state) => state.clearNotifications)

  const renderCount = useRenderCount()

  console.log('[render] ControlPanel', { counter, user, theme, notificationCount })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Update Zustand State</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">
            Counter: <span className="font-medium text-foreground">{counter}</span>
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={increment}>
              Increment
            </Button>
            <Button size="sm" variant="outline" onClick={decrement}>
              Decrement
            </Button>
            <Button size="sm" variant="ghost" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>

        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">
            User:{' '}
            <span className="font-medium text-foreground">
              {user.name} ({user.role})
            </span>
          </p>
          <Button size="sm" variant="outline" onClick={switchUser}>
            Switch User
          </Button>
        </div>

        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">
            Theme: <span className="font-medium text-foreground">{theme}</span>
          </p>
          <Button size="sm" variant="outline" onClick={toggleTheme}>
            Toggle Theme
          </Button>
        </div>

        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">
            Notifications:{' '}
            <span className="font-medium text-foreground">{notificationCount}</span>
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={addNotification}>
              Add Notification
            </Button>
            <Button size="sm" variant="ghost" onClick={clearNotifications}>
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
