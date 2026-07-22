import {
  CLAIM_PRIORITIES,
  CLAIM_STATUSES,
  CLAIM_TYPES,
  type ClaimPriority,
  type ClaimStatus,
  type ClaimType,
} from '@/features/claims/types'

export const CLAIM_TYPE_LABELS: Record<ClaimType, string> = {
  auto: 'Auto',
  property: 'Property',
  health: 'Health',
  travel: 'Travel',
}

export const CLAIM_STATUS_LABELS: Record<ClaimStatus, string> = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
  paid: 'Paid',
}

export const CLAIM_PRIORITY_LABELS: Record<ClaimPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const STATUS_OPTIONS = CLAIM_STATUSES.map((status) => ({
  value: status,
  label: CLAIM_STATUS_LABELS[status],
}))

export const TYPE_OPTIONS = CLAIM_TYPES.map((type) => ({
  value: type,
  label: CLAIM_TYPE_LABELS[type],
}))

export const PRIORITY_OPTIONS = CLAIM_PRIORITIES.map((priority) => ({
  value: priority,
  label: CLAIM_PRIORITY_LABELS[priority],
}))

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatCurrency(amount: number) {
  return currencyFormatter.format(amount)
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
})

export function formatDate(isoDate: string) {
  return dateFormatter.format(new Date(isoDate))
}
