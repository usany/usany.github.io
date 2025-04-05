import { createSlice } from '@reduxjs/toolkit'
interface languagesState {
  value: string
}
const initialState: languagesState = { value: localStorage.getItem('languages') || 'ko' }
const languagesReducer = createSlice({
  name: 'languages',
  initialState: initialState,
  reducers: {
    changeKo: state => {
      state.value = 'ko'
    },
    changeEn: state => {
      state.value = 'en'
    },
  }
})
const { changeKo, changeEn } = languagesReducer.actions

export { changeEn, changeKo, languagesReducer }
// export default counterSlice
