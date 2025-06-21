import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocumentData } from 'firebase/firestore';

interface ProfileState {
  value: DocumentData | undefined
}

const initialState: ProfileState = {
  value: undefined
}
const changingUserReducer = createSlice({
  name: 'changingUser',
  initialState,
  reducers: {
    changeChangingUser: (state, action: PayloadAction<DocumentData | undefined>) => {
      state.value = action.payload
    },
  }
})
const { changeChangingUser } = changingUserReducer.actions

export { changeChangingUser, changingUserReducer };

