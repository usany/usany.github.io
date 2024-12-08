import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PiazzaSwitchState {
  value: boolean
}

const initialState: PiazzaSwitchState = {
  value: true
}
const piazzaSwitchReducer = createSlice({
  name: 'piazzaSwitch',
  initialState,
  reducers: {
    changePiazzaSwitch: (state) => {
      state.value = !state.value
    },
  }
})
const { changePiazzaSwitch } = piazzaSwitchReducer.actions

export { piazzaSwitchReducer, changePiazzaSwitch, }

