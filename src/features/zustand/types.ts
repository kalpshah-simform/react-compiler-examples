export const SUBSCRIPTION_OPTIONS = [
  'none',
  'whole-store',
  'counter',
  'user',
  'theme',
  'notifications',
] as const

export type SubscriptionKey = (typeof SUBSCRIPTION_OPTIONS)[number]

export const SUBSCRIPTION_LABELS: Record<SubscriptionKey, string> = {
  none: 'None (props only)',
  'whole-store': 'Whole store (no selector)',
  counter: 'Counter (selector)',
  user: 'User (selector)',
  theme: 'Theme (selector)',
  notifications: 'Notifications (selector)',
}

export const NESTING_DEPTH = 6
