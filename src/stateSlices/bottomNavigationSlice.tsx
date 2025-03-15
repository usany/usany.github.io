import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BottomNavigationState {
  value: number
}

const initialState: BottomNavigationState = {
  value: 1
}
const bottomNavigationReducer = createSlice({
  name: 'bottomNavigation',
  initialState,
  reducers: {
    changeBottomNavigation: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  }
})
const { changeBottomNavigation } = bottomNavigationReducer.actions

export { bottomNavigationReducer, changeBottomNavigation }

