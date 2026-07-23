import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from '@/store/slices/counter-slice'
import { userReducer } from '@/store/slices/user-slice'
import { themeReducer } from '@/store/slices/theme-slice'
import { notificationsReducer } from '@/store/slices/notifications-slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    theme: themeReducer,
    notifications: notificationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
