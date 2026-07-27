import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

const MONTHS = [
  { label: 'Jan', desktop: 62, mobile: 40 },
  { label: 'Feb', desktop: 78, mobile: 52 },
  { label: 'Mar', desktop: 55, mobile: 46 },
  { label: 'Apr', desktop: 70, mobile: 58 },
  { label: 'May', desktop: 48, mobile: 44 },
  { label: 'Jun', desktop: 66, mobile: 50 },
]

export function TrafficChartBlock() {
  const [reportViews, setReportViews] = useState(0)
  const renderCount = useRenderCount()

  console.log('[render] TrafficChartBlock', { reportViews })

  const totalDesktop = MONTHS.reduce((sum, month) => sum + month.desktop, 0) * 10
  const totalMobile = MONTHS.reduce((sum, month) => sum + month.mobile, 0) * 10

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Traffic Channels</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex h-32 items-end gap-2">
          {MONTHS.map((month) => (
            <div key={month.label} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-24 w-full items-end gap-0.5">
                <div
                  className="flex-1 rounded-t-sm bg-primary"
                  style={{ height: `${month.desktop}%` }}
                />
                <div
                  className="flex-1 rounded-t-sm bg-primary/40"
                  style={{ height: `${month.mobile}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{month.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-primary" /> Desktop
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-primary/40" /> Mobile
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Desktop</p>
            <p className="font-medium">{totalDesktop.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Mobile</p>
            <p className="font-medium">{totalMobile.toLocaleString()}</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setReportViews((count) => count + 1)}
        >
          View report{reportViews > 0 ? ` (${reportViews})` : ''}
        </Button>
      </CardContent>
    </Card>
  )
}
