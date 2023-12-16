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
  Public = 'public',
  Private = 'main',
}

export enum AppPanel {
  PublicLogin = 'login',

  PrivateHome = 'home',
  PrivateProductInfo = 'productInfo',
  PrivateShoppingCart = 'shoppingCart',
}

export enum AppRoutePath {
  PublicLogin = INITIAL_URL + 'login',

  PrivateHome = INITIAL_URL + '',
  PrivateProductInfo = INITIAL_URL + 'product-info',
  PrivateShoppingCart = INITIAL_URL + 'shopping-cart',
}

/** Настройка типизированной конфигурации маршрутов */
export const routes = RoutesConfig.create([
  createRoot(APP_ROOT, [
    createView(AppView.Public, [
      createPanel(AppPanel.PublicLogin, AppRoutePath.PublicLogin, []),
    ]),
    createView(AppView.Private, [
      createPanel(AppPanel.PrivateHome, AppRoutePath.PrivateHome, []),
      createPanel(AppPanel.PrivateProductInfo, AppRoutePath.PrivateProductInfo, []),
      createPanel(AppPanel.PrivateShoppingCart, AppRoutePath.PrivateShoppingCart, []),
    ]),
  ]),
])

/** Передача массива маршрутов для создания роутера */
export const router = createHashRouter(routes.getRoutes())
