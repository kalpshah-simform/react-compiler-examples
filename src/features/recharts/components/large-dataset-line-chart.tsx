import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { ChartCard } from '@/features/recharts/components/chart-card'
import type { ChartDatum } from '@/features/recharts/types'
import { useRenderCount } from '@/hooks/use-render-count'

interface LargeDatasetLineChartProps {
  data: ChartDatum[]
}

export function LargeDatasetLineChart({ data }: LargeDatasetLineChartProps) {
  const renderCount = useRenderCount()

  console.log('[render] LargeDatasetLineChart', { points: data.length })

  return (
    <ChartCard
      title={`Daily Activity — ${data.length} points (Large Dataset)`}
      description="Same update rules as the small charts, just a lot more data per render."
      renderCount={renderCount}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
