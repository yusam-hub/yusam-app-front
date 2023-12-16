import React, {FC, memo, useEffect} from 'react'
import {
  Button,
  CellButton,
  Checkbox,
  FormItem,
  FormLayout,
  FormLayoutGroup,
  Group, Header,
  Input,
  Link,
  NavIdProps,
  Panel,
  PanelHeader,
  SegmentedControl,
  Select,
  Textarea,
  useAdaptivityWithJSMediaQueries
} from '@vkontakte/vkui'

/**
 * CSS IMPORT
 */
import './AuthLoginForm.css'
import {Filters} from "../../components";
import {useAppDispatch, useAppSelector} from "../../store";
import {selectIsAuthorized, setIsAuthorized} from "../../store/auth.reducer";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

export const AuthLoginForm: FC<NavIdProps> = memo((props: NavIdProps) => {

  /**
   * GLOBAL CONST
   */
  const dispatch = useAppDispatch()
  const routeNavigator = useRouteNavigator()
  const { isDesktop } = useAdaptivityWithJSMediaQueries()

  /**
   * APP SELECTOR
   */
  const isAuthorized = useAppSelector(selectIsAuthorized)

  /**
   * LOCAL CONST
   */
  const [ userEmail, setUserEmail] = React.useState('')
  const [ userPass, setUserPass] = React.useState('')

  useEffect(() => {
    console.log("isAuthorized", isAuthorized)
    if (isAuthorized) {
      void routeNavigator.push('/')
    }
  }, [isAuthorized])

  /**
   * RETURN CONTENT
   */
  return (
    <Panel className="Panel__fullScreen" {...props}>
      <div className="AuthLoginFormCenter">
        <Group mode="card">
          <>
            <Header>Авторизация</Header>
          </>
            <FormLayout>
                <FormItem
                    htmlFor="email"
                    top="E-mail"
                    status={userEmail ? 'valid' : 'error'}
                    bottom={
                      userEmail ? 'Электронная почта введена верно!' : 'Пожалуйста, введите электронную почту'
                    }
                    bottomId="email-type"
                >
                    <Input
                        aria-labelledby="email-type"
                        id="userEmail"
                        type="email"
                        defaultValue={userEmail}
                        onChange={(event) => {
                          setUserEmail(event.currentTarget.value);
                        }}
                    />
                </FormItem>

                <FormItem
                    top="Пароль"
                    bottom="Пароль может содержать только латинские буквы и цифры."
                    bottomId="userPassDescription"
                >
                    <Input
                        id="userPass"
                        type="password"
                        placeholder="введите пароль"
                        aria-labelledby="userPassDescription"
                        onChange={(event) => {
                          setUserPass(event.currentTarget.value);
                        }}
                    />
                </FormItem>
                <FormItem>
                    <Button
                      size="l"
                      stretched
                      onClick={() => {
                        console.log(userEmail, userPass);
                        dispatch(setIsAuthorized(true))
                      }}
                    >
                        Войти
                    </Button>
                </FormItem>
            </FormLayout>
        </Group>
      </div>
    </Panel>
  )
})

AuthLoginForm.displayName = 'AuthLoginForm'
