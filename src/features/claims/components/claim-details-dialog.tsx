import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ClaimStatusBadge } from '@/features/claims/components/claim-status-badge'
import {
  CLAIM_PRIORITY_LABELS,
  CLAIM_TYPE_LABELS,
  formatCurrency,
  formatDate,
} from '@/features/claims/format'
import type { Claim } from '@/features/claims/types'

interface ClaimDetailsDialogProps {
  claim: Claim | null
  onOpenChange: (open: boolean) => void
}

export function ClaimDetailsDialog({
  claim,
  onOpenChange,
}: ClaimDetailsDialogProps) {
  console.log('[render] ClaimDetailsDialog', claim?.claimId, claim !== null)
  return (
    <Dialog open={claim !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        {claim ? (
          <>
            <DialogHeader>
              <DialogTitle>{claim.claimId}</DialogTitle>
              <DialogDescription>
                Filed by {claim.policyholderName}
              </DialogDescription>
            </DialogHeader>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <dt className="text-muted-foreground">Status</dt>
              <dd>
                <ClaimStatusBadge status={claim.status} />
              </dd>

              <dt className="text-muted-foreground">Claim Type</dt>
              <dd className="font-medium">
                {CLAIM_TYPE_LABELS[claim.claimType]}
              </dd>

              <dt className="text-muted-foreground">Priority</dt>
              <dd className="font-medium">
                {CLAIM_PRIORITY_LABELS[claim.priority]}
              </dd>

              <dt className="text-muted-foreground">Amount</dt>
              <dd className="font-medium">{formatCurrency(claim.amount)}</dd>

              <dt className="text-muted-foreground">Filed Date</dt>
              <dd className="font-medium">{formatDate(claim.filedDate)}</dd>

              <dt className="text-muted-foreground">Adjuster</dt>
              <dd className="font-medium">{claim.adjuster}</dd>
            </dl>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
