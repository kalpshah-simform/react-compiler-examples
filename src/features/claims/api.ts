import { MOCK_CLAIMS } from '@/features/claims/mock-data'
import type { Claim, ClaimStatus } from '@/features/claims/types'

function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

/** Simulates a backend call fetching the claims list. */
export function fetchClaims(): Promise<Claim[]> {
  return delay(
    MOCK_CLAIMS.map((claim) => ({ ...claim })),
    600,
  )
}

/** Simulates updating a claim's status on the backend. */
export function updateClaimStatus(
  claimId: string,
  status: ClaimStatus,
): Promise<Claim> {
  const claim = MOCK_CLAIMS.find((item) => item.id === claimId)
  if (!claim) {
    return Promise.reject(new Error(`Claim ${claimId} not found`))
  }
  return delay({ ...claim, status }, 400)
}

/** Simulates deleting a claim on the backend. */
export function deleteClaim(claimId: string): Promise<{ id: string }> {
  return delay({ id: claimId }, 400)
}
