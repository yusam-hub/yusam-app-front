import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'

export interface AuthState {
  isAuthorized: boolean
}

const initialState: AuthState = {
  isAuthorized: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthorized(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload
    },
  },
})

const { reducer } = authSlice
export { reducer as authReducer }

export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized

export const { setIsAuthorized } = authSlice.actions
