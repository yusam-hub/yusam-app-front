import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'

export interface UserState {
  id?: number,
  name: string
  onBoardingComplete: boolean
}

const initialState: UserState = {
  id: undefined,
  name: '',
  onBoardingComplete: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<{id: number, name: string}>) {
      state.name = action.payload.name
      state.id = action.payload.id
    },

    setOnboardingComplete(state, action: PayloadAction<boolean>) {
      state.onBoardingComplete = action.payload
    },
  },
})

const { reducer } = userSlice
export { reducer as userReducer }

export const selectOnBoardingComplete = (state: RootState) => state.user.onBoardingComplete

export const { setUserData, setOnboardingComplete } = userSlice.actions
