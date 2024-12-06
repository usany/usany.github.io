import { createSlice } from '@reduxjs/toolkit'

const cardAccordionReducer = createSlice({
  name: 'cardAccordion',
  initialState: {
    value: true
  },
  reducers: {
    change: state => {
      state.value = !state.value
    },
  }
})
const { change } = cardAccordionReducer.actions

export { cardAccordionReducer, change, }
// export default counterSlice

