import {
  RoutesConfig,
  createHashRouter,
  createPanel,
  createRoot,
  createView,
} from '@vkontakte/vk-mini-apps-router'

const SHOP_ROOT = 'shop'
export const INITIAL_URL = '/'

export enum ShopView {
  Main = 'main',
}

export enum AppPanel {
  Login = 'login',
  ProductInfo = 'productInfo',
  ShoppingCart = 'shoppingCart',
  Store = '/',
}

/** Настройка типизированной конфигурации маршрутов */
export const routes = RoutesConfig.create([
  createRoot(SHOP_ROOT, [
    createView(ShopView.Main, [
      createPanel(AppPanel.Store, '/', []),
      createPanel(AppPanel.ProductInfo, `/${AppPanel.ProductInfo}`, []),
      createPanel(AppPanel.ShoppingCart, `/${AppPanel.ShoppingCart}`, []),
      createPanel(AppPanel.Login, `/${AppPanel.Login}`, []),
    ]),
  ]),
])

/** Передача массива маршрутов для создания роутера */
export const router = createHashRouter(routes.getRoutes())
