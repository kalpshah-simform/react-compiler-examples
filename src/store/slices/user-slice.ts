import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  name: string
  role: string
}

const SAMPLE_USERS: readonly [UserState, ...UserState[]] = [
  { name: 'Alice Johnson', role: 'Adjuster' },
  { name: 'Bob Martinez', role: 'Underwriter' },
  { name: 'Chidi Okafor', role: 'Claims Manager' },
]

const initialState: UserState = SAMPLE_USERS[0]

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    switchedToNextUser(state) {
      const currentIndex = SAMPLE_USERS.findIndex(
        (user) => user.name === state.name,
      )
      const nextUser =
        SAMPLE_USERS[(currentIndex + 1) % SAMPLE_USERS.length] ??
        SAMPLE_USERS[0]
      state.name = nextUser.name
      state.role = nextUser.role
    },
  },
})

export const { switchedToNextUser } = userSlice.actions
export const userReducer = userSlice.reducer
