import { RenderCountBadge } from '@/features/redux-toolkit/components/render-count-badge'
import { useRenderCount } from '@/features/redux-toolkit/hooks/use-render-count'

interface PropsOnlyChildProps {
  label: string
}

/**
 * Never touches Redux — only ever receives `label`, which its parent passes as
 * the same value on every render. Lets us compare its render count against a
 * sibling that subscribes: if this stays flat while the sibling climbs, the
 * re-render came from the Redux subscription, not from the parent re-rendering.
 */
export function PropsOnlyChild({ label }: PropsOnlyChildProps) {
  const renderCount = useRenderCount()

  console.log('[render] PropsOnlyChild', { label })

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-dashed border-border p-2 text-sm text-muted-foreground">
      <span>{label}</span>
      <RenderCountBadge count={renderCount} />
    </div>
  )
}
