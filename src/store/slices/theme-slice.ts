import { createSlice } from '@reduxjs/toolkit'

interface ThemeState {
  mode: 'light' | 'dark'
}

const initialState: ThemeState = {
  mode: 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggled(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
  },
})

export const { toggled } = themeSlice.actions
export const themeReducer = themeSlice.reducer
