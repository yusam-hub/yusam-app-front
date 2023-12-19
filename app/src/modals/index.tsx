import { ModalRoot } from '@vkontakte/vkui'
import React from 'react'
import {
  useActiveVkuiLocation,
  useRouteNavigator,
} from '@vkontakte/vk-mini-apps-router'
import { WelcomeModal } from './Shop/WelcomeModal'
import { FiltersModal } from './Shop/FiltersModal'

const Modals: React.FC = () => {
  const { modal } = useActiveVkuiLocation()
  const routeNavigator = useRouteNavigator()

  return (
    // ModalRoot - контейнер для модальных страниц и карточек
    // activeModal - текущая открытая модальная страница | undefind
    <ModalRoot activeModal={modal}>
      <FiltersModal
        onClose={() => routeNavigator.hideModal()}
        id="filter"
      />
      <WelcomeModal
        onClose={() => routeNavigator.hideModal()}
        id="welcome"
      />
    </ModalRoot>
  )
}

export { Modals }
