import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { ChartCard } from '@/features/recharts/components/chart-card'
import type { ChartDatum } from '@/features/recharts/types'
import { useRenderCount } from '@/hooks/use-render-count'

interface RevenueLineChartProps {
  data: ChartDatum[]
}

export function RevenueLineChart({ data }: RevenueLineChartProps) {
  const renderCount = useRenderCount()

  console.log('[render] RevenueLineChart', { data })

  return (
    <ChartCard
      title="Revenue by Month (Line)"
      description="Re-renders only when its data prop changes."
      renderCount={renderCount}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
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
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-chart-2)"
            strokeWidth={2}
            dot={{ r: 4, fill: 'var(--color-chart-2)' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
