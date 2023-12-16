import {
  RoutesConfig,
  createHashRouter,
  createPanel,
  createRoot,
  createView,
} from '@vkontakte/vk-mini-apps-router'

const APP_ROOT = 'app'
export const INITIAL_URL = '/'

export enum AppView {
  Auth = 'auth',
  Main = 'main',
}

export enum AppPanel {
  Home = 'home',
  Login = 'login',
  ProductInfo = 'productInfo',
  ShoppingCart = 'shoppingCart',
}

export enum AppRoutePath {
  Home = INITIAL_URL + '',
  Login = INITIAL_URL + 'login',
  ProductInfo = INITIAL_URL + 'product-info',
  ShoppingCart = INITIAL_URL + 'shopping-cart',
}

/** Настройка типизированной конфигурации маршрутов */
export const routes = RoutesConfig.create([
  createRoot(APP_ROOT, [
    createView(AppView.Auth, [
      createPanel(AppPanel.Login, AppRoutePath.Login, []),
    ]),
    createView(AppView.Main, [
      createPanel(AppPanel.Home, AppRoutePath.Home, []),
      createPanel(AppPanel.ProductInfo, AppRoutePath.ProductInfo, []),
      createPanel(AppPanel.ShoppingCart, AppRoutePath.ShoppingCart, []),
    ]),
  ]),
])

/** Передача массива маршрутов для создания роутера */
export const router = createHashRouter(routes.getRoutes())
