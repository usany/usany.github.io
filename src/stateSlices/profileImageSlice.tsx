import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProfileImageState {
  value: string
}

const initialState: ProfileImageState = {
  value: ''
}
const profileImageReducer = createSlice({
  name: 'profileImage',
  initialState,
  reducers: {
    changeProfileImage: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  }
})
const { changeProfileImage } = profileImageReducer.actions

export { profileImageReducer, changeProfileImage, }

