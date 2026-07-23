import { create } from 'zustand'

interface User {
  name: string
  role: string
}

const SAMPLE_USERS: readonly [User, ...User[]] = [
  { name: 'Alice Johnson', role: 'Adjuster' },
  { name: 'Bob Martinez', role: 'Underwriter' },
  { name: 'Chidi Okafor', role: 'Claims Manager' },
]

let nextNotificationId = 1

export interface AppState {
  counter: number
  user: User
  theme: 'light' | 'dark'
  notifications: string[]
  increment: () => void
  decrement: () => void
  reset: () => void
  switchUser: () => void
  toggleTheme: () => void
  addNotification: () => void
  clearNotifications: () => void
}

export const useAppStore = create<AppState>((set) => ({
  counter: 0,
  user: SAMPLE_USERS[0],
  theme: 'light',
  notifications: [],
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: state.counter - 1 })),
  reset: () => set({ counter: 0 }),
  switchUser: () =>
    set((state) => {
      const currentIndex = SAMPLE_USERS.findIndex(
        (user) => user.name === state.user.name,
      )
      const nextUser =
        SAMPLE_USERS[(currentIndex + 1) % SAMPLE_USERS.length] ??
        SAMPLE_USERS[0]
      return { user: nextUser }
    }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  addNotification: () =>
    set((state) => {
      const notification = `Notification #${nextNotificationId}`
      nextNotificationId += 1
      return { notifications: [...state.notifications, notification] }
    }),
  clearNotifications: () => set({ notifications: [] }),
}))
