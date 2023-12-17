import './AuthVk.css'
import React, {FC, memo, useEffect, useLayoutEffect} from 'react'
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
import {selectIsAuthorized} from "../../store/auth.reducer";
import bridge from "@vkontakte/vk-bridge";

export const AuthVk: FC<NavIdProps> = memo((props: NavIdProps) => {

  /**
   * GLOBAL CONST
   */
  const dispatch = useAppDispatch()
  const routeNavigator = useRouteNavigator()
  const { t} = useTranslation()
  const platform = usePlatform()
  const appLocale: string = useSelector(selectAppLocale)
  const isAuthorized = useAppSelector(selectIsAuthorized)



  useLayoutEffect(() => {
    if (isAuthorized) return;

    async function getUserInfo() {

      const vkUserInfo = await bridge.send('VKWebAppGetUserInfo', {})
      console.log("vkUserInfo",vkUserInfo);
      void routeNavigator.hidePopout();
    }

    void getUserInfo();

  }, []);
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
