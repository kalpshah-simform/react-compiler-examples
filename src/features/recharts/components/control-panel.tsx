import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

interface ControlPanelProps {
  onUpdateChartData: () => void
  onUpdateLargeDataset: () => void
  unrelatedCount: number
  onBumpUnrelatedState: () => void
}

export function ControlPanel({
  onUpdateChartData,
  onUpdateLargeDataset,
  unrelatedCount,
  onBumpUnrelatedState,
}: ControlPanelProps) {
  const renderCount = useRenderCount()

  console.log('[render] ControlPanel', { unrelatedCount })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Controls</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">
            Replaces the data array for every small chart below (bar, line, pie,
            area, and the manually memoized bar chart) with a new reference.
          </p>
          <Button size="sm" onClick={onUpdateChartData}>
            Update Chart Data
          </Button>
        </div>

        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">
            Replaces only the large dataset chart&apos;s data — the small charts
            keep their existing references and shouldn&apos;t re-render.
          </p>
          <Button size="sm" variant="outline" onClick={onUpdateLargeDataset}>
            Update Large Dataset
          </Button>
        </div>

        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">
            Unrelated state, not passed to any chart:{' '}
            <span className="font-medium text-foreground">{unrelatedCount}</span>.
            This re-renders the page and this panel, but every chart&apos;s data
            prop stays the same reference — watch their badges stay flat.
          </p>
          <Button size="sm" variant="ghost" onClick={onBumpUnrelatedState}>
            Update Unrelated State
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
