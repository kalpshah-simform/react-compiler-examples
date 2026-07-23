import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented(state) {
      state.value += 1
    },
    decremented(state) {
      state.value -= 1
    },
    resetToZero(state) {
      state.value = 0
    },
    incrementedBy(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})

export const { incremented, decremented, resetToZero, incrementedBy } =
  counterSlice.actions
export const counterReducer = counterSlice.reducer
