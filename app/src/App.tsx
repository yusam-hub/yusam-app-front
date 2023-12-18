import { FC, useCallback, useEffect, useLayoutEffect } from 'react'
import {
  SplitLayout,
  SplitCol,
  View,
  usePlatform,
  Platform,
  Epic,
  useAdaptivityWithJSMediaQueries,
} from '@vkontakte/vkui'
import bridge, { SharedUpdateConfigData } from '@vkontakte/vk-bridge'
import {
  useActiveVkuiLocation,
  usePopout,
  useRouteNavigator,
} from '@vkontakte/vk-mini-apps-router'
import { useAppDispatch, useAppSelector } from './store'
import { Modals } from './modals'
import {ShoppingCatalog, ShoppingCart, ProductInfo, AuthLoginForm} from './pages'
import { AppPanel, AppView } from './routes'
import { selectAppIsVkOpened, selectAppLocale } from './store/app.reducer'
import { CustomTabbar } from './components'
import {selectIsAuthorized} from "./store/auth.reducer";
import './i18n';
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {AuthVk} from "./pages/Auth/AuthVk";

const VK_IFRAME_APP_WIDTH = 911
const VK_IFRAME_APP_PADDING = 100

export const App: FC = () => {
  const dispatch = useAppDispatch()
  const routerPopout = usePopout()
  const platform = usePlatform()
  const routeNavigator = useRouteNavigator()
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const appIsVkOpened = useAppSelector(selectAppIsVkOpened)

  /** Получаем текущую позицию */
  const {
    panelsHistory,
    view: activeView = !isAuthorized ? AppView.Public : AppView.Private,
    panel: activePanel = !isAuthorized ? AppPanel.PublicLogin : AppPanel.PrivateHome,
  } = useActiveVkuiLocation()

  /** Получаем тип устройства */
  const { isDesktop } = useAdaptivityWithJSMediaQueries()
  const onSwipeBack = useCallback(() => routeNavigator.back(), [routeNavigator])

  /*if (!isDesktop) {
    bridge.subscribe((e) => {
      if (e.detail.type === 'VKWebAppViewHide') {
        console.log("VKWebAppViewHide");
      } else if (e.detail.type === 'VKWebAppViewRestore') {
        console.log("VKWebAppViewRestore");
      }
    });
  } else {
    document.addEventListener('visibilitychange', function (){
      if (document.hidden) {
        console.log("visibilitychange hidden");
      } else {
        console.log("visibilitychange shown");
      }
    });
  }*/

  /** Растягивание экрана для VKCOM на всю ширину окна для десктопа */
  useEffect(() => {
    async function iframeResizeForVkCom() {
      // Проверяем, что платформа VK.COM
      if (platform !== Platform.VKCOM) return

      // Получаем данные конфигурации
      const { viewport_height } = (await bridge.send(
        'VKWebAppGetConfig'
      )) as SharedUpdateConfigData

      // Обновляем размер страницы
      void bridge.send('VKWebAppResizeWindow', {
        width: VK_IFRAME_APP_WIDTH,
        height: viewport_height - VK_IFRAME_APP_PADDING,
      })
    }

    void iframeResizeForVkCom()
    window.addEventListener('resize', iframeResizeForVkCom)
    return () => window.removeEventListener('resize', iframeResizeForVkCom)

  }, [platform])

  /**
   * LOCALE
   */
  const { i18n} = useTranslation();
  const appLocale: string = useSelector(selectAppLocale)
  useEffect(() => {
    if (i18n.language !== appLocale) {
      void i18n.changeLanguage(appLocale)
      //console.log("Locale changed: ", appLocale)
    }
  }, [appLocale]);

  /**
   * SplitLayout - Компонент-контейнер для реализации интерфейса с многоколоночной структурой [https://vkcom.github.io/VKUI/#/SplitLayout]
   * SplitCol Компонент-обертка для отрисовки колонки в многоколоночном интерфейсе. [https://vkcom.github.io/VKUI/#/SplitCol]
   * View - хранилище Panel [https://vkcom.github.io/VKUI/#/View]
   * Panel - контент одной страницы [https://vkcom.github.io/VKUI/#/Panel]
   */
  return (
    /**
     * popout - свойство для отрисовки Alert ActionSheet ScreenSpinner
     * modal - свойство для отрисовки модальных страниц(ModalRoot)
     */
    <SplitLayout popout={routerPopout} modal={<Modals />}>
      {!isAuthorized ? (
        <SplitCol>
          <Epic
            activeStory={AppView.Public}
          >
            <View
              nav={AppView.Public}
              activePanel={AppPanel.PublicLogin}
            >
              {appIsVkOpened ? (
                <AuthVk nav={AppPanel.PublicLogin} />
              ) : (
                <AuthLoginForm nav={AppPanel.PublicLogin} />
              )}
            </View>
          </Epic>
        </SplitCol>
        ) : (
        <SplitCol>
          <Epic
            activeStory={activeView}
            tabbar={!isDesktop && <CustomTabbar activePanel={activePanel} />}
          >
            <View
              onSwipeBack={onSwipeBack}
              history={panelsHistory}
              nav={AppView.Private}
              activePanel={activePanel}
            >
              <ShoppingCatalog nav={AppPanel.PrivateHome} />
              <ProductInfo nav={AppPanel.PrivateProductInfo} />
              <ShoppingCart nav={AppPanel.PrivateShoppingCart} />
            </View>
          </Epic>
        </SplitCol>
        )
      }
    </SplitLayout>
  )
}
