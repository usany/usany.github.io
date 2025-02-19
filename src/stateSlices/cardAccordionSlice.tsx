import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

interface CardAccordionState {
  value: boolean
}

const initialState: CardAccordionState = {
  value: true
}
const cardAccordionReducer = createSlice({
  name: 'cardAccordion',
  initialState,
  reducers: {
    change: state => {
      state.value = !state.value
    },
  }
})
const { change } = cardAccordionReducer.actions

export { cardAccordionReducer, change, }

