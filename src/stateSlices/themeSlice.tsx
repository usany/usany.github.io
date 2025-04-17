import { createSlice } from '@reduxjs/toolkit'

const themeReducer = createSlice({
  name: 'theme',
  initialState: localStorage.getItem('theme') || 'light',
  reducers: {
    changeLight: state => {
      return (state = 'light')
    },
    changeDark: state => {
      return (state = 'dark')
    },
  }
})
const { changeLight, changeDark } = themeReducer.actions

export { changeDark, changeLight, themeReducer }
// export default counterSlice

