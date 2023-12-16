import React, {FC, memo} from 'react'
import {
  Button, Card,
  FormItem,
  FormLayout,
  FormStatus,
  Group, Header,
  Input,
  NavIdProps,
  Panel, Spacing,
  useAdaptivityWithJSMediaQueries
} from '@vkontakte/vkui'
import { useAppDispatch } from "../../store";
import { setIsAuthorized } from "../../store/auth.reducer";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { AppRoutePath } from "../../routes";
import { IFormErrors } from "../../types";


import './AuthLoginForm.css'
export const AuthLoginForm: FC<NavIdProps> = memo((props: NavIdProps) => {

  /**
   * GLOBAL CONST
   */
  const dispatch = useAppDispatch()
  const routeNavigator = useRouteNavigator()

  /**
   * LOCAL CONST
   */
  const [ formErrors, setFormErrors] = React.useState<IFormErrors>( {
    errorMessage: null,
    errorFields: {},
  })
  const [ userEmail, setUserEmail] = React.useState('')
  const [ userPass, setUserPass] = React.useState('')

  /**
   * RETURN CONTENT
   */
  return (
    <Panel className="Panel__fullScreen" {...props}>
      <div className="AuthLoginFormCenter">
        <Group mode="card">
          <Header className="AuthLoginHeader">
            <Card
              mode="shadow"
            >
              Авторизация
            </Card>
          </Header>
        </Group>
        <Group mode="card">
          <FormLayout>
            {formErrors.errorMessage &&
              (
                <FormStatus header="Ошибка в форме" mode="error">
                  <Spacing size={10}/>
                  {formErrors.errorMessage}
                </FormStatus>
              )
            }
            <FormItem
              htmlFor="email"
              top="E-mail"
              status={formErrors.errorFields?.userEmail ? 'error' : 'valid'}
              bottom={
                formErrors.errorFields?.userEmail ?? 'Введите e-mail в формате [ name@domain.zone ]'
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
              bottomId="userPassDescription"
              status={formErrors.errorFields?.userPass ? 'error' : 'valid'}
              bottom={
                formErrors.errorFields?.userPass ?? 'Пароль может содержать только латинские буквы и цифры.'
              }
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
                onClick={() =>
                {

                    setFormErrors({
                      errorMessage: null,
                      errorFields: {},
                    });


                    setTimeout(function(){
                      if (userEmail === 'admin' && userPass === 'Qwertyu1') {
                        dispatch(setIsAuthorized(true))
                        void routeNavigator.push(AppRoutePath.PrivateHome);
                      } else {
                        setFormErrors({
                          errorMessage: "Неверный логин/пароль",
                          errorFields: {
                            'userEmail' : 'Неверное значение',
                            'userPass' : 'Неверное значение'
                          },
                        });
                      }
                    }, 2000);

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
