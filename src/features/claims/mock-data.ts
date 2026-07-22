import {
  CLAIM_PRIORITIES,
  CLAIM_STATUSES,
  CLAIM_TYPES,
  type Claim,
} from '@/features/claims/types'

const FIRST_NAMES = [
  'Olivia',
  'Liam',
  'Emma',
  'Noah',
  'Ava',
  'Elijah',
  'Sophia',
  'Lucas',
  'Isabella',
  'Mason',
  'Mia',
  'Ethan',
  'Amelia',
  'James',
  'Harper',
  'Benjamin',
]

const LAST_NAMES = [
  'Johnson',
  'Williams',
  'Brown',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
  'Wilson',
  'Anderson',
  'Taylor',
  'Thomas',
  'Moore',
  'Jackson',
  'Martin',
  'Lee',
]

const ADJUSTERS = [
  'Priya Nair',
  'Carlos Mendes',
  'Sarah Kim',
  'David Cohen',
  'Fatima Ali',
  'Tom Becker',
]

// Deterministic PRNG (mulberry32) so the demo dataset is stable across reloads.
function mulberry32(seed: number) {
  let state = seed
  return () => {
    state |= 0
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(random: () => number, items: readonly T[]): T {
  return items[Math.floor(random() * items.length)]!
}

function generateClaims(count: number): Claim[] {
  const random = mulberry32(20240115)
  const claims: Claim[] = []

  for (let index = 0; index < count; index++) {
    const claimType = pick(random, CLAIM_TYPES)
    const status = pick(random, CLAIM_STATUSES)
    const priority = pick(random, CLAIM_PRIORITIES)
    const daysAgo = Math.floor(random() * 365)
    const filedDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
    const amount = Math.round((200 + random() * 24_800) * 100) / 100

    claims.push({
      id: `claim-${index + 1}`,
      claimId: `CLM-${(100000 + index * 37 + Math.floor(random() * 37)).toString().slice(0, 6)}`,
      policyholderName: `${pick(random, FIRST_NAMES)} ${pick(random, LAST_NAMES)}`,
      claimType,
      status,
      priority,
      amount,
      filedDate: filedDate.toISOString(),
      adjuster: pick(random, ADJUSTERS),
    })
  }

  return claims
}

export const MOCK_CLAIMS: Claim[] = generateClaims(63)
