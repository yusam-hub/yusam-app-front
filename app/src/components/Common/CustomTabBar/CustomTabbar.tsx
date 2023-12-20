import { FC, memo } from 'react'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { TabbarItem, Tabbar}  from '@vkontakte/vkui'
import {Icon28HomeOutline, Icon28Menu, Icon28Profile} from '@vkontakte/icons'
import {AppPanelEnum, AppRoutePathEnum} from '../../../routes'


export type CustomTabBarProps = {
  activePanel: string
}

export const CustomTabBar: FC<CustomTabBarProps> = memo(
  ({ activePanel }: CustomTabBarProps) => {

    const routeNavigator = useRouteNavigator()


    const onMenuClick = () => {
      void routeNavigator.push(AppRoutePathEnum.PrivateMenu)
    }

    const onHomeClick = () => {
      void routeNavigator.push(AppRoutePathEnum.PrivateHome)
    }

    const onProfileClick = () => {
      void routeNavigator.push(AppRoutePathEnum.PrivateProfile)
    }

    return (
      <Tabbar>

        <TabbarItem
          onClick={onMenuClick}
          selected={activePanel === AppPanelEnum.PrivateMenu}
          data-story="menu"
          text="Menu"
        >
          <Icon28Menu />
        </TabbarItem>

        <TabbarItem
          onClick={onHomeClick}
          selected={activePanel === AppPanelEnum.PrivateHome}
          data-story="home"
          text="Home"
        >
          <Icon28HomeOutline />
        </TabbarItem>

        <TabbarItem
          onClick={onProfileClick}
          selected={activePanel === AppPanelEnum.PrivateProfile}
          data-story="profile"
          text="Profile"
        >
          <Icon28Profile />
        </TabbarItem>

      </Tabbar>
    )
  }
)

CustomTabBar.displayName = 'CustomTabBar'
