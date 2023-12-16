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
  Main = 'main',
}

export enum AppPanel {
  Home = 'home',
  Login = 'login',
  ProductInfo = 'productInfo',
  ShoppingCart = 'shoppingCart',
}

/** Настройка типизированной конфигурации маршрутов */
export const routes = RoutesConfig.create([
  createRoot(APP_ROOT, [
    createView(AppView.Main, [
      createPanel(AppPanel.Home, '/', []),
      createPanel(AppPanel.Login, `/${AppPanel.Login}`, []),
      createPanel(AppPanel.ProductInfo, `/${AppPanel.ProductInfo}`, []),
      createPanel(AppPanel.ShoppingCart, `/${AppPanel.ShoppingCart}`, []),
    ]),
  ]),
])

/** Передача массива маршрутов для создания роутера */
export const router = createHashRouter(routes.getRoutes())
