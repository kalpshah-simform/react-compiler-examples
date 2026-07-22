import type { InsuranceClaimFormValues } from '@/features/insurance-claim/schema'

export interface SubmitClaimResult {
  claimId: string
  submittedAt: string
}

export class ClaimSubmissionError extends Error {}

function generateClaimId() {
  const random = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, '0')
  return `CLM-${random}`
}

/**
 * Simulates a backend call: adds network latency and occasionally rejects,
 * so the UI can demonstrate both the success and error submission states.
 */
export function submitInsuranceClaim(
  values: InsuranceClaimFormValues,
): Promise<SubmitClaimResult> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(
          new ClaimSubmissionError(
            'The claims server is temporarily unavailable. Please try again.',
          ),
        )
        return
      }

      console.info('Submitting insurance claim', values)
      resolve({
        claimId: generateClaimId(),
        submittedAt: new Date().toISOString(),
      })
    }, 1200)
  })
}
