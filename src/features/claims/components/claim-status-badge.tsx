import { Badge } from '@/components/ui/badge'
import { CLAIM_STATUS_LABELS } from '@/features/claims/format'
import type { ClaimStatus } from '@/features/claims/types'
import { cn } from '@/lib/utils'

const STATUS_CLASSNAMES: Record<ClaimStatus, string> = {
  submitted: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  under_review: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  approved: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400',
  paid: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
}

export function ClaimStatusBadge({ status }: { status: ClaimStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn('border-none', STATUS_CLASSNAMES[status])}
    >
      {CLAIM_STATUS_LABELS[status]}
    </Badge>
  )
}
