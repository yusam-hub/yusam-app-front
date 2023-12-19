import bridge from '@vkontakte/vk-bridge'
import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
  Appearance,
} from '@vkontakte/vkui'
import {
  useAppearance,
  useAdaptivity,
  useInsets,
} from '@vkontakte/vk-bridge-react'
import { RouterProvider } from '@vkontakte/vk-mini-apps-router'
import { router } from './routes'
import { Provider } from 'react-redux'
import { store } from './store'
import { App } from './App'

export const AppConfig = () => {
  const appearance = useAppearance()
  const adaptivity = useAdaptivity()
  const safeAreaInsets = useInsets()

  /**
   * ConfigProvider - прокидывает нужный config в соответствии c платформой(IOS, ANDROID, VK.COM) и выбранной темой [https://vkcom.github.io/VKUI/#/ConfigProvider]
   * Provider - прокидывает данные нашего state manager
   * AdaptivityProvider  - прокидывает данные адаптивности sizeX, sizeY [https://vkcom.github.io/VKUI/#/AdaptivityProvider]
   * AppRoot - компонент обертка, куда инкапсулирована логика режимов пожлкючения(Full, Partial, Embedded) [https://vkcom.github.io/VKUI/#/AppRoot]
   */
  return (
    <ConfigProvider
      appearance={appearance ?? Appearance.LIGHT}
      isWebView={bridge.isWebView()}
      hasCustomPanelHeaderAfter={false}
    >
      <AdaptivityProvider {...adaptivity}>
        <AppRoot safeAreaInsets={safeAreaInsets ?? {}}>
          <Provider store={store}>
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
          </Provider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}
