import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { ChartCard } from '@/features/recharts/components/chart-card'
import type { ChartDatum } from '@/features/recharts/types'
import { useRenderCount } from '@/hooks/use-render-count'

interface GrowthAreaChartProps {
  data: ChartDatum[]
}

export function GrowthAreaChart({ data }: GrowthAreaChartProps) {
  const renderCount = useRenderCount()

  console.log('[render] GrowthAreaChart', { data })

  return (
    <ChartCard
      title="Growth by Month (Area)"
      description="Re-renders only when its data prop changes."
      renderCount={renderCount}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-chart-3)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="var(--color-chart-3)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--color-chart-3)"
            strokeWidth={2}
            fill="url(#growth-fill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
