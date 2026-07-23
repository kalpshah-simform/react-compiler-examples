import { createSlice } from '@reduxjs/toolkit'

interface NotificationsState {
  items: string[]
}

const initialState: NotificationsState = {
  items: [],
}

let nextNotificationId = 1

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    added(state) {
      state.items.push(`Notification #${nextNotificationId}`)
      nextNotificationId += 1
    },
    cleared(state) {
      state.items = []
    },
  },
})

export const { added, cleared } = notificationsSlice.actions
export const notificationsReducer = notificationsSlice.reducer
