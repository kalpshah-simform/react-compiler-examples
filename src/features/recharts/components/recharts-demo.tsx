import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ControlPanel } from '@/features/recharts/components/control-panel'
import { GrowthAreaChart } from '@/features/recharts/components/growth-area-chart'
import { LargeDatasetLineChart } from '@/features/recharts/components/large-dataset-line-chart'
import { MemoizedBarChart } from '@/features/recharts/components/memoized-bar-chart'
import { RevenueLineChart } from '@/features/recharts/components/revenue-line-chart'
import { SalesBarChart } from '@/features/recharts/components/sales-bar-chart'
import { StaticBarChart } from '@/features/recharts/components/static-bar-chart'
import { TrafficPieChart } from '@/features/recharts/components/traffic-pie-chart'
import {
  LARGE_DATASET_SIZE,
  generateCategoryData,
  generateLargeDataset,
  generateMonthlyData,
} from '@/features/recharts/types'

export function RechartsDemo() {
  const [salesData, setSalesData] = useState(generateMonthlyData)
  const [revenueData, setRevenueData] = useState(generateMonthlyData)
  const [categoryData, setCategoryData] = useState(generateCategoryData)
  const [growthData, setGrowthData] = useState(generateMonthlyData)
  const [largeData, setLargeData] = useState(() => generateLargeDataset(LARGE_DATASET_SIZE))
  const [unrelatedCount, setUnrelatedCount] = useState(0)

  function handleUpdateChartData() {
    setSalesData(generateMonthlyData())
    setRevenueData(generateMonthlyData())
    setCategoryData(generateCategoryData())
    setGrowthData(generateMonthlyData())
  }

  function handleUpdateLargeDataset() {
    setLargeData(generateLargeDataset(LARGE_DATASET_SIZE))
  }

  function handleBumpUnrelatedState() {
    setUnrelatedCount((count) => count + 1)
  }

  return (
    <div className="grid items-start gap-4 p-4 lg:grid-cols-[minmax(0,320px)_1fr]">
      <div className="grid gap-4 lg:sticky lg:top-4">
        <Card>
          <CardHeader>
            <CardTitle>Recharts + React Compiler</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm text-muted-foreground">
            <p>
              &quot;Update Chart Data&quot; gives the small charts a brand new
              data array; &quot;Update Large Dataset&quot; does the same for
              only the large dataset chart; &quot;Update Unrelated State&quot;
              changes a counter that no chart ever receives. Watch each
              chart&apos;s render-count badge to see which updates actually
              cause a re-render.
            </p>
            <p>
              The static baseline chart and the manually memoized chart never
              change their behavior no matter which button you press — they
              exist to prove that React Compiler already gives every chart
              here the same bail-out React.memo would, without writing it by
              hand.
            </p>
          </CardContent>
        </Card>
        <ControlPanel
          onUpdateChartData={handleUpdateChartData}
          onUpdateLargeDataset={handleUpdateLargeDataset}
          unrelatedCount={unrelatedCount}
          onBumpUnrelatedState={handleBumpUnrelatedState}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SalesBarChart data={salesData} />
        <MemoizedBarChart data={salesData} />
        <RevenueLineChart data={revenueData} />
        <TrafficPieChart data={categoryData} />
        <GrowthAreaChart data={growthData} />
        <StaticBarChart />
        <div className="md:col-span-2">
          <LargeDatasetLineChart data={largeData} />
        </div>
      </div>
    </div>
  )
}
