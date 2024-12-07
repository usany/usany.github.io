import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MessageAccordionState {
  value: boolean
}

const initialState: MessageAccordionState = {
  value: true
}
const messageAccordionReducer = createSlice({
  name: 'messageAccordion',
  initialState,
  reducers: {
    changeMessageAccordion: state => {
      state.value = !state.value
    },
  }
})
const { changeMessageAccordion } = messageAccordionReducer.actions

export { messageAccordionReducer, changeMessageAccordion, }

