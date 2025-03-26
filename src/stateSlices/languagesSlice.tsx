import { createSlice } from '@reduxjs/toolkit'

const languagesReducer = createSlice({
  name: 'languages',
  initialState: localStorage.getItem('languages') || 'ko',
  reducers: {
    changeKo: state => {
      return (state = 'ko')
    },
    changeEn: state => {
      return (state = 'en')
    },
  }
})
const { changeKo, changeEn } = languagesReducer.actions

export { changeEn, changeKo, languagesReducer }
// export default counterSlice
