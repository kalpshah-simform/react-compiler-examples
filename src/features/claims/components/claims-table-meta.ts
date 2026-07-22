import type { Claim } from '@/features/claims/types'

export interface ClaimsTableMeta {
  pendingClaimId: string | null
  onView: (claim: Claim) => void
  onApprove: (claim: Claim) => void
  onReject: (claim: Claim) => void
  onDelete: (claim: Claim) => void
}
