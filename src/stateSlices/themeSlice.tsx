import { createSlice } from '@reduxjs/toolkit'

const themeReducer = createSlice({
  name: 'theme',
  initialState: localStorage.getItem('theme') || 'light',
  reducers: {
    changeLight: state => {
      state = 'light'
    },
    changeDark: state => {
      state = 'dark'
    },
  }
})
const { changeLight, changeDark } = themeReducer.actions

export { themeReducer, changeLight, changeDark, }
// export default counterSlice

