import { Badge } from '@/components/ui/badge'

interface RenderCountBadgeProps {
  count: number
}

export function RenderCountBadge({ count }: RenderCountBadgeProps) {
  return (
    <Badge variant="secondary" title="Number of times this component rendered">
      Renders: {count}
    </Badge>
  )
}
