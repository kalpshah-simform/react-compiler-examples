import type { ReactNode } from 'react'

import { RenderCountBadge } from '@/components/render-count-badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ChartCardProps {
  title: string
  description: string
  renderCount: number
  children: ReactNode
}

/**
 * Presentational shell shared by every chart in this demo. `renderCount` is
 * passed in rather than computed here because `useRenderCount` has to run
 * inside the component instance whose renders are being counted — this shell
 * itself is not that instance.
 */
export function ChartCard({ title, description, renderCount, children }: ChartCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="h-64">{children}</CardContent>
    </Card>
  )
}
