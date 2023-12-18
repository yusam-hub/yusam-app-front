import './AuthVk.css'
import React, {FC, memo, useEffect, useLayoutEffect, useState} from 'react'
import {
  Card,
  NavIdProps,
  Panel, Spacing, Spinner,
  usePlatform,
} from '@vkontakte/vkui'
import {useAppDispatch, useAppSelector} from "../../store";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectAppLocale, setAppLocale } from "../../store/app.reducer";
import {SpinnerPopoutWrapper} from "../../popups/SpinnerPopoutWrapper";
import {selectIsAuthorized, setIsAuthorized} from "../../store/auth.reducer";
import bridge, {parseURLSearchParamsForGetLaunchParams} from "@vkontakte/vk-bridge";
import {AppRoutePath} from "../../routes";

export const AuthVk: FC<NavIdProps> = memo((props: NavIdProps) => {

  /**
   * GLOBAL CONST
   */
  const dispatch = useAppDispatch()
  const routeNavigator = useRouteNavigator()
  const { t} = useTranslation()
  const platform = usePlatform()
  const appLocale: string = useSelector(selectAppLocale)
  const [ userInfoLoadingStatus, setUserInfoLoadingStatus] = useState(0)

  async function getUserInfo() {
    setUserInfoLoadingStatus(1);
    const vkUserInfo = await bridge.send('VKWebAppGetUserInfo', {})
    console.log("vkUserInfo", vkUserInfo);
    /**
     * todo: здесь можно еще загрузить продукты из ShoppingCatalog
     *        - чтобы небыло постоянного колеса загрузки и дополнительно ожидания
     */

    setUserInfoLoadingStatus(2);
  }

  /** Получение данных пользователя */
  /*useLayoutEffect(() => {

    if (!isAuthorized) return;
    async function initUser() {
      // Получаем данные текущего пользователя
      const userData = await bridge.send('VKWebAppGetUserInfo', {})

      // Проверяем есть ли он в Storage
      const data = await bridge.send('VKWebAppStorageGet', {
        keys: [userData.id.toString()],
      })

      // Если он уже сохранен, то сохраняем его имя в store
      if (data.keys[0].value)
        dispatch(setUserData({ name: data.keys[0].value, id: userData.id }))
      // Если не сохранен, то сохраняем в store и показываем приветственную модалку
      else if (userData) {
        dispatch(setUserData({ name: userData.first_name, id: userData.id }))

        //dispatch(setOnWelcomeComplete(false))

        void bridge.send('VKWebAppStorageSet', {
          key: userData.id.toString(),
          value: userData.first_name,
        })
      }
    }

    void initUser()

  }, [isAuthorized, dispatch])*/

  useEffect(() => {

    if (userInfoLoadingStatus === 0) {

      void getUserInfo();

    } else if(userInfoLoadingStatus === 2) {

      setUserInfoLoadingStatus(3);

      setTimeout(function(){
        dispatch(setIsAuthorized(true))
        void routeNavigator.push(AppRoutePath.PrivateHome);
      }, 2000);

    }

  }, [userInfoLoadingStatus]);

  /**
   * RETURN CONTENT
   */
  return (
    <Panel className="Panel__fullScreen" {...props}>
      <div className="AuthVkCenter">
        <Spinner size="large"/>
      </div>
    </Panel>
  )
})

AuthVk.displayName = 'AuthVk'
