import { FC, memo } from 'react'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Counter, TabbarItem, Tabbar } from '@vkontakte/vkui'
import { Icon28ShoppingCartOutline, Icon28HomeOutline } from '@vkontakte/icons'
import {AppPanelEnum, AppRoutePathEnum} from 'src/routes'
import { selectOrderProducts } from 'src/store/shoppingCart.reducer'
import { useAppSelector } from 'src/store'

export type CustomTabbarProps = {
  activePanel: string
}

export const CustomTabbar: FC<CustomTabbarProps> = memo(
  ({ activePanel }: CustomTabbarProps) => {
    const orderProducts = useAppSelector(selectOrderProducts)
    const routeNavigator = useRouteNavigator()
    const productCount = orderProducts.length

    const onPaymantTabbarItemClick = () => {
      if (activePanel === AppPanelEnum.PrivateShoppingCart) return
      void routeNavigator.push(AppRoutePathEnum.PrivateShoppingCart)
    }

    const onViewingTabbarItemClick = () => {
      if (activePanel !== AppPanelEnum.PrivateShoppingCart) return
      void routeNavigator.push(AppRoutePathEnum.PrivateHome)
    }

    return (
      <Tabbar>
        <TabbarItem
          onClick={onViewingTabbarItemClick}
          selected={activePanel !== AppPanelEnum.PrivateShoppingCart}
          data-story="feed"
          text="Каталог"
        >
          <Icon28HomeOutline />
        </TabbarItem>
        <TabbarItem
          onClick={onPaymantTabbarItemClick}
          selected={activePanel === AppPanelEnum.PrivateShoppingCart}
          data-story="messages"
          indicator={
            productCount ? (
              <Counter size="s" mode="prominent">
                {productCount}
              </Counter>
            ) : undefined
          }
          text="Корзина"
        >
          <Icon28ShoppingCartOutline />
        </TabbarItem>
      </Tabbar>
    )
  }
)

CustomTabbar.displayName = 'CustomTabbar'
