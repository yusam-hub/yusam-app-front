import { FC, memo } from 'react'
import { PanelHeaderProps, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'
import {
  useRouteNavigator,
  useFirstPageCheck,
} from '@vkontakte/vk-mini-apps-router'
import {AppRoutePathEnum, INITIAL_URL} from 'src/routes'

export type CustomPanelHeaderProps = {
  title: string
} & PanelHeaderProps

/** PanelHeader c PanelHeaderBack */
export const CustomPanelHeader: FC<CustomPanelHeaderProps> = memo(
  ({ title, ...props }: CustomPanelHeaderProps) => {
    const routeNavigator = useRouteNavigator()
    const isFirstPage = useFirstPageCheck()

    /** Делаем шаг назад в навигации или озвращаемся на стартовую старницу */
    const onHandleClick = () => {
      if (isFirstPage) routeNavigator.push(AppRoutePathEnum.PrivateHome)
      else void routeNavigator.back()
    }

    return (
      <PanelHeader
        before={<PanelHeaderBack onClick={onHandleClick} />}
        {...props}
      >
        {title}
      </PanelHeader>
    )
  }
)

CustomPanelHeader.displayName = 'CustomPanelHeader'
