import { memo } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { ChartCard } from '@/features/recharts/components/chart-card'
import type { ChartDatum } from '@/features/recharts/types'
import { useRenderCount } from '@/hooks/use-render-count'

interface MemoizedBarChartProps {
  data: ChartDatum[]
}

/**
 * The one deliberate exception to "let the compiler handle memoization" in
 * this demo: wrapped in `React.memo` by hand and fed the *same* `data`
 * reference as `SalesBarChart` (see `RechartsDemo`), so its render-count
 * badge can be compared side by side. With React Compiler enabled, both
 * should behave identically — flat when data is unchanged, incrementing
 * together when it updates — because the compiler already memoizes the
 * props/JSX comparison `React.memo` does manually. If the badges diverge,
 * that's the signal to check whether the compiler is actually running.
 */
function MemoizedBarChartImpl({ data }: MemoizedBarChartProps) {
  const renderCount = useRenderCount()

  console.log('[render] MemoizedBarChart', { data })

  return (
    <ChartCard
      title="Sales by Month (Manually Memoized)"
      description="Wrapped in React.memo — compare its badge to Sales by Month above."
      renderCount={renderCount}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
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
          <Bar dataKey="value" fill="var(--color-chart-5)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export const MemoizedBarChart = memo(MemoizedBarChartImpl)
