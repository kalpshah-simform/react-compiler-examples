import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'
import { MinusIcon, PlusIcon } from 'lucide-react'

interface CounterDisplayProps {
  count: number
  onIncrement: () => void
  onDecrement: () => void
}

function CounterDisplay({
  count,
  onIncrement,
  onDecrement,
}: CounterDisplayProps) {
  const renderCount = useRenderCount()

  console.log('[render] CounterDisplay', { count })

  return (
    <div className="grid gap-2 rounded-md border p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">Counter</span>
        <RenderCountBadge count={renderCount} />
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button size="icon" variant="outline" onClick={onDecrement}>
          <MinusIcon className="size-4" />
        </Button>
        <span className="w-10 text-center text-lg font-semibold tabular-nums">
          {count}
        </span>
        <Button size="icon" variant="outline" onClick={onIncrement}>
          <PlusIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}

// No props from the parent — React Compiler should memoize this element so
// that bumping the parent's `count` state never forces this child to
// re-render. It owns its own state instead, to prove isolation holds in
// both directions.
function SiblingPanel() {
  const [enabled, setEnabled] = useState(false)
  const renderCount = useRenderCount()

  console.log('[render] SiblingPanel', { enabled })

  return (
    <div className="grid gap-2 rounded-md border p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">Sibling</span>
        <RenderCountBadge count={renderCount} />
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="grid gap-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Two-factor authentication</p>
            <Badge variant={enabled ? 'default' : 'secondary'}>
              {enabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Verify via email or phone number.
          </p>
        </div>
        <Button
          size="sm"
          variant={enabled ? 'outline' : 'default'}
          onClick={() => setEnabled((value) => !value)}
        >
          {enabled ? 'Disable' : 'Enable'}
        </Button>
      </div>
    </div>
  )
}

export function CounterIsolationBlock() {
  const [count, setCount] = useState(0)
  const renderCount = useRenderCount()

  console.log('[render] CounterIsolationBlock', { count })

  function handleIncrement() {
    setCount((current) => current + 1)
  }

  function handleDecrement() {
    setCount((current) => current - 1)
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Counter + Sibling Isolation</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-3">
        <CounterDisplay
          count={count}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
        <SiblingPanel />
      </CardContent>
    </Card>
  )
}
