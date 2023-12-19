import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'

export interface UserStateInterface {
  id?: number,
  name: string
  onWelcomeComplete: boolean
}

const initialState: UserStateInterface = {
  id: undefined,
  name: '',
  onWelcomeComplete: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<{id: number, name: string}>) {
      state.name = action.payload.name
      state.id = action.payload.id
    },

    setOnWelcomeComplete(state, action: PayloadAction<boolean>) {
      state.onWelcomeComplete = action.payload
    },
  },
})

const { reducer } = userSlice
export { reducer as userReducer }

export const selectOnWelcomeComplete = (state: RootState) => state.user.onWelcomeComplete

export const { 
  setUserData, 
  setOnWelcomeComplete 
} = userSlice.actions
