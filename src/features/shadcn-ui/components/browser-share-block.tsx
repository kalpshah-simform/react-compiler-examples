import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

const BROWSERS = [
  { name: 'Chrome', share: 58, opacity: 1, className: 'bg-primary' },
  { name: 'Safari', share: 22, opacity: 0.6, className: 'bg-primary/60' },
  { name: 'Firefox', share: 12, opacity: 0.35, className: 'bg-primary/35' },
  { name: 'Edge', share: 8, opacity: 0.15, className: 'bg-primary/15' },
]

export function BrowserShareBlock() {
  const [highlighted, setHighlighted] = useState<string | null>(null)
  const renderCount = useRenderCount()

  console.log('[render] BrowserShareBlock', { highlighted })

  const stops = BROWSERS.reduce<{ ranges: string[]; cumulative: number }>(
    (acc, browser) => {
      const start = acc.cumulative
      const end = start + browser.share
      const color = `color-mix(in srgb, var(--color-primary) ${browser.opacity * 100}%, transparent)`
      return {
        ranges: [...acc.ranges, `${color} ${start}% ${end}%`],
        cumulative: end,
      }
    },
    { ranges: [], cumulative: 0 },
  ).ranges

  const totalVisitors = 935

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Browser Share</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-center">
          <div
            className="relative flex size-28 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(${stops.join(', ')})`,
              opacity: 0.9,
            }}
          >
            <div className="absolute inset-2 flex flex-col items-center justify-center rounded-full bg-card">
              <span className="text-lg font-semibold">{totalVisitors}</span>
              <span className="text-xs text-muted-foreground">Visitors</span>
            </div>
          </div>
        </div>

        <div className="grid gap-1.5">
          {BROWSERS.map((browser) => (
            <button
              key={browser.name}
              type="button"
              onClick={() =>
                setHighlighted((current) => (current === browser.name ? null : browser.name))
              }
              className={`flex items-center justify-between rounded-md px-2 py-1 text-sm ${
                highlighted === browser.name ? 'bg-muted' : ''
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${browser.className}`} />
                {browser.name}
              </span>
              <span className="text-muted-foreground">{browser.share}%</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
