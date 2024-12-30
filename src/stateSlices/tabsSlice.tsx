import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface TabsState {
  value: number
}

// Define the initial state using that type
const initialState: number = 0

const tabsReducer = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    changeTabs: (state, action: PayloadAction<number>) => {
      state = action.payload
    },
  }
})
const { changeTabs } = tabsReducer.actions

export { tabsReducer, changeTabs }

