import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppStore, type AppState } from '@/features/zustand/store/use-app-store'
import {
  NESTING_DEPTH,
  SUBSCRIPTION_LABELS,
  SUBSCRIPTION_OPTIONS,
  type SubscriptionKey,
} from '@/features/zustand/types'
import { RenderCountBadge } from '@/components/render-count-badge'
import { SubscriptionSelect } from '@/components/subscription-select'
import { PropsOnlyChild } from '@/components/props-only-child'
import { useRenderCount } from '@/hooks/use-render-count'

interface NestedLevelProps {
  level: number
}

function selectSubscribedValue(subscribeTo: SubscriptionKey) {
  return (state: AppState) => {
    switch (subscribeTo) {
      // No selector at all (an identity selector behaves the same way):
      // this component re-renders on every store update, whether or not the
      // change is relevant to it.
      case 'whole-store':
        return state
      case 'counter':
        return state.counter
      case 'user':
        return `${state.user.name} (${state.user.role})`
      case 'theme':
        return state.theme
      case 'notifications':
        return state.notifications.length
      case 'none':
        return null
    }
  }
}

function formatSubscribedValue(value: AppState | string | number | null) {
  if (value !== null && typeof value === 'object') {
    return `counter=${value.counter}, user=${value.user.name}, theme=${value.theme}, notifications=${value.notifications.length}`
  }
  return typeof value === 'number' ? value.toString() : (value ?? '')
}

export function NestedLevel({ level }: NestedLevelProps) {
  const [subscribeTo, setSubscribeTo] = useState<SubscriptionKey>('none')
  const renderCount = useRenderCount()

  // Always calls useAppStore (stable hook order); only the selector's branch
  // changes with `subscribeTo`, so toggling it in the UI never violates the
  // rules of hooks the way conditionally calling the hook would.
  const subscribedValue = useAppStore(selectSubscribedValue(subscribeTo))

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
          <SubscriptionSelect
            value={subscribeTo}
            options={SUBSCRIPTION_OPTIONS}
            labels={SUBSCRIPTION_LABELS}
            onChange={setSubscribeTo}
          />
          {subscribeTo !== 'none' ? (
            <span className="text-sm">
              value:{' '}
              <span className="font-medium">
                {formatSubscribedValue(subscribedValue)}
              </span>
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
