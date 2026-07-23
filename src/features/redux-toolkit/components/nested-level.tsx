import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppSelector } from '@/store/hooks'
import type { RootState } from '@/store'
import { NESTING_DEPTH, type SubscriptionKey } from '@/features/redux-toolkit/types'
import { RenderCountBadge } from '@/features/redux-toolkit/components/render-count-badge'
import { SubscriptionSelect } from '@/features/redux-toolkit/components/subscription-select'
import { PropsOnlyChild } from '@/features/redux-toolkit/components/props-only-child'
import { useRenderCount } from '@/features/redux-toolkit/hooks/use-render-count'

interface NestedLevelProps {
  level: number
}

function selectSubscribedValue(subscribeTo: SubscriptionKey) {
  return (state: RootState) => {
    switch (subscribeTo) {
      case 'counter':
        return state.counter.value
      case 'user':
        return `${state.user.name} (${state.user.role})`
      case 'theme':
        return state.theme.mode
      case 'notifications':
        return state.notifications.items.length
      case 'none':
        return null
    }
  }
}

export function NestedLevel({ level }: NestedLevelProps) {
  const [subscribeTo, setSubscribeTo] = useState<SubscriptionKey>('none')
  const renderCount = useRenderCount()

  // Always calls useSelector (stable hook order); only the selector's branch
  // changes with `subscribeTo`, so toggling it in the UI never violates the
  // rules of hooks the way conditionally calling useSelector would.
  const subscribedValue = useAppSelector(selectSubscribedValue(subscribeTo))

  console.log(`[render] Level ${level}`, { subscribeTo, subscribedValue })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Level {level}</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Subscribes to:</span>
          <SubscriptionSelect value={subscribeTo} onChange={setSubscribeTo} />
          {subscribeTo !== 'none' ? (
            <span className="text-sm">
              value: <span className="font-medium">{String(subscribedValue)}</span>
            </span>
          ) : null}
        </div>

        <PropsOnlyChild label={`Props-only sibling at Level ${level}`} />

        {level < NESTING_DEPTH ? (
          <div className="border-l border-border pl-4">
            <NestedLevel level={level + 1} />
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">Leaf level reached.</p>
        )}
      </CardContent>
    </Card>
  )
}
