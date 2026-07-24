import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { ChartCard } from '@/features/recharts/components/chart-card'
import { STATIC_CHART_DATA } from '@/features/recharts/types'
import { useRenderCount } from '@/hooks/use-render-count'

/**
 * Fed `STATIC_CHART_DATA` — a module-level array that's never reassigned —
 * so its `data` prop reference is identical on every render, forever. This
 * is the control for the "props unchanged" comparison: click every button
 * in the control panel and this badge should never move, whether or not
 * React Compiler is doing its job.
 */
export function StaticBarChart() {
  const renderCount = useRenderCount()

  console.log('[render] StaticBarChart', { data: STATIC_CHART_DATA })

  return (
    <ChartCard
      title="Static Baseline (Bar)"
      description="Props never change — should never re-render, with or without the compiler."
      renderCount={renderCount}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={STATIC_CHART_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 12,
            }}
          />
          <Bar dataKey="value" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
