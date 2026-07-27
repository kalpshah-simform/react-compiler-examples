import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { ChartCard } from '@/features/recharts/components/chart-card'
import type { ChartDatum } from '@/features/recharts/types'
import { useRenderCount } from '@/hooks/use-render-count'

interface TrafficPieChartProps {
  data: ChartDatum[]
}

const SLICE_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
]

export function TrafficPieChart({ data }: TrafficPieChartProps) {
  const renderCount = useRenderCount()

  console.log('[render] TrafficPieChart', { data })

  return (
    <ChartCard
      title="Traffic by Source (Pie)"
      description="Re-renders only when its data prop changes."
      renderCount={renderCount}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="80%" paddingAngle={2}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={SLICE_COLORS[index % SLICE_COLORS.length]} stroke="var(--card)" strokeWidth={2} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={24} wrapperStyle={{ fontSize: 12, color: 'var(--muted-foreground)' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
