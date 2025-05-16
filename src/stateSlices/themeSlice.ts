import { createSlice } from '@reduxjs/toolkit'

const themeReducer = createSlice({
  name: 'theme',
  initialState: { value: localStorage.getItem('theme') || 'light' },
  reducers: {
    changeLight: state => {
      state.value = 'light'
    },
    changeDark: state => {
      state.value = 'dark'
    },
  }
})
const { changeLight, changeDark } = themeReducer.actions

export { changeDark, changeLight, themeReducer }
// export default counterSlice

