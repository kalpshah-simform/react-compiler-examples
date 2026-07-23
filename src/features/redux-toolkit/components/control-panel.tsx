import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { decremented, incremented, resetToZero } from '@/store/slices/counter-slice'
import { switchedToNextUser } from '@/store/slices/user-slice'
import { toggled } from '@/store/slices/theme-slice'
import { added, cleared } from '@/store/slices/notifications-slice'
import { RenderCountBadge } from '@/features/redux-toolkit/components/render-count-badge'
import { useRenderCount } from '@/features/redux-toolkit/hooks/use-render-count'

export function ControlPanel() {
  const dispatch = useAppDispatch()
  const counter = useAppSelector((state) => state.counter.value)
  const user = useAppSelector((state) => state.user)
  const theme = useAppSelector((state) => state.theme.mode)
  const notificationCount = useAppSelector(
    (state) => state.notifications.items.length,
  )
  const renderCount = useRenderCount()

  console.log('[render] ControlPanel', { counter, user, theme, notificationCount })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Update Redux State</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">
            Counter: <span className="font-medium text-foreground">{counter}</span>
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => dispatch(incremented())}>
              Increment
            </Button>
            <Button size="sm" variant="outline" onClick={() => dispatch(decremented())}>
              Decrement
            </Button>
            <Button size="sm" variant="ghost" onClick={() => dispatch(resetToZero())}>
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
          <Button
            size="sm"
            variant="outline"
            onClick={() => dispatch(switchedToNextUser())}
          >
            Switch User
          </Button>
        </div>

        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">
            Theme: <span className="font-medium text-foreground">{theme}</span>
          </p>
          <Button size="sm" variant="outline" onClick={() => dispatch(toggled())}>
            Toggle Theme
          </Button>
        </div>

        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">
            Notifications:{' '}
            <span className="font-medium text-foreground">{notificationCount}</span>
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => dispatch(added())}>
              Add Notification
            </Button>
            <Button size="sm" variant="ghost" onClick={() => dispatch(cleared())}>
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
