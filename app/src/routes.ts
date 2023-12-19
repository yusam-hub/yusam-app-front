import {
  RoutesConfig,
  createHashRouter,
  createPanel,
  createRoot,
  createView,
} from '@vkontakte/vk-mini-apps-router'

const APP_ROOT = 'app'
export const INITIAL_URL = '/'

export enum AppViewEnum {
  Public = 'public',
  Private = 'main',
}

export enum AppPanelEnum {
  PublicLogin = 'login',

  PrivateHome = 'home',
  PrivateProductInfo = 'productInfo',
  PrivateShoppingCart = 'shoppingCart',
}

export enum AppRoutePathEnum {
  PublicLogin = INITIAL_URL + 'login',

  PrivateHome = INITIAL_URL + '',
  PrivateProductInfo = INITIAL_URL + 'product-info',
  PrivateShoppingCart = INITIAL_URL + 'shopping-cart',
}

/** Настройка типизированной конфигурации маршрутов */
export const routes = RoutesConfig.create([
  createRoot(APP_ROOT, [
    createView(AppViewEnum.Public, [
      createPanel(AppPanelEnum.PublicLogin, AppRoutePathEnum.PublicLogin, []),
    ]),
    createView(AppViewEnum.Private, [
      createPanel(AppPanelEnum.PrivateHome, AppRoutePathEnum.PrivateHome, []),
      createPanel(AppPanelEnum.PrivateProductInfo, AppRoutePathEnum.PrivateProductInfo, []),
      createPanel(AppPanelEnum.PrivateShoppingCart, AppRoutePathEnum.PrivateShoppingCart, []),
    ]),
  ]),
])

/** Передача массива маршрутов для создания роутера */
export const router = createHashRouter(routes.getRoutes())
