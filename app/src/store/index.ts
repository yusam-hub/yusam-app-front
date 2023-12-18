import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { userReducer } from './user.reducer'
import { storeReducer } from './store.reducer'
import { appReducer } from './app.reducer'
import { shoppingCartReducer } from './shoppingCart.reducer'
import { authReducer } from "./auth.reducer";
import { shopReducer } from "./shop.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  user: userReducer,
  store: storeReducer,
  shop: shopReducer,
  shoppingCart: shoppingCartReducer,
})

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

export { store }

export type RootDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>

type DispatchFunc = () => RootDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
