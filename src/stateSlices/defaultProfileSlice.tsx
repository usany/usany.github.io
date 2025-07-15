import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DefaultProfileState {
  value: boolean
}

const initialState: DefaultProfileState = {
  value: false
}
const defaultProfileReducer = createSlice({
  name: 'defaultProfile',
  initialState,
  reducers: {
    changeDefaultProfile: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  }
})
const { changeDefaultProfile } = defaultProfileReducer.actions

export { changeDefaultProfile, defaultProfileReducer }

