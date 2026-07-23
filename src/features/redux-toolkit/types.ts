export const SUBSCRIPTION_OPTIONS = [
  'none',
  'counter',
  'user',
  'theme',
  'notifications',
] as const

export type SubscriptionKey = (typeof SUBSCRIPTION_OPTIONS)[number]

export const NESTING_DEPTH = 6
