import { createSlice } from '@reduxjs/toolkit'

const bottomNavigationReducer = createSlice({
  name: 'bottomNavigation',
  initialState: {
    value: localStorage.getItem('theme') || 'light'
  },
  reducers: {
    changeLight: state => {
      state.value = 'light'
    },
    changeDark: state => {
      state.value = 'dark'
    },
  }
})
const { changeLight, changeDark } = bottomNavigationReducer.actions

export { bottomNavigationReducer, changeLight, changeDark, }
// export default counterSlice

