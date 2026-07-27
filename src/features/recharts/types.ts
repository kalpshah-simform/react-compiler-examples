export interface ChartDatum {
  name: string
  value: number
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] as const

const CATEGORIES = ['Direct', 'Referral', 'Social', 'Organic'] as const

function randomInRange(min: number, max: number): number {
  return Math.round(min + Math.random() * (max - min))
}

export function generateMonthlyData(): ChartDatum[] {
  return MONTHS.map((name) => ({ name, value: randomInRange(20, 100) }))
}

export function generateCategoryData(): ChartDatum[] {
  return CATEGORIES.map((name) => ({ name, value: randomInRange(10, 100) }))
}

export function generateLargeDataset(points: number): ChartDatum[] {
  return Array.from({ length: points }, (_, index) => ({
    name: `Day ${index + 1}`,
    value: randomInRange(10, 100),
  }))
}

/**
 * Defined once, module-level, and never regenerated — the reference stays
 * identical across every render of every consumer for the lifetime of the
 * app. This is the "props never change" control used to prove that a chart
 * fed a stable reference never re-renders, no matter what else in the tree
 * updates.
 */
export const STATIC_CHART_DATA: ChartDatum[] = generateMonthlyData()

export const LARGE_DATASET_SIZE = 365
