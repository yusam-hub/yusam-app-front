import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { GLOB_LOCALE_FALLBACK_DEFAULT} from "../globConsts";
import { glob_app_is_vk } from "../globFuncs";
export interface AppState {
  locale: string
  isVkOpened: boolean
}

export const appInitialState: AppState = {
  locale: navigator.language.split('-')[0] || GLOB_LOCALE_FALLBACK_DEFAULT,
  isVkOpened: glob_app_is_vk(),
}

const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setAppLocale(state, action: PayloadAction<string>) {
      state.locale = action.payload
    },
  },
})

const { reducer } = appSlice
export { reducer as appReducer }

export const selectAppLocale = (state: RootState) => state.app.locale
export const selectAppIsVkOpened = (state: RootState) => state.app.isVkOpened

export const {
  setAppLocale,
} = appSlice.actions
