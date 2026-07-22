export const CLAIM_TYPES = ['auto', 'property', 'health', 'travel'] as const
export type ClaimType = (typeof CLAIM_TYPES)[number]

export const CLAIM_STATUSES = [
  'submitted',
  'under_review',
  'approved',
  'rejected',
  'paid',
] as const
export type ClaimStatus = (typeof CLAIM_STATUSES)[number]

export const CLAIM_PRIORITIES = ['low', 'medium', 'high'] as const
export type ClaimPriority = (typeof CLAIM_PRIORITIES)[number]

export interface Claim {
  id: string
  claimId: string
  policyholderName: string
  claimType: ClaimType
  status: ClaimStatus
  priority: ClaimPriority
  amount: number
  filedDate: string
  adjuster: string
}
