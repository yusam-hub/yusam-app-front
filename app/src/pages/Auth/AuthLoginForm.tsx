import React, {FC, memo} from 'react'
import {
  Button, Card,
  FormItem,
  FormLayout,
  FormStatus,
  Group, Header,
  Input,
  NavIdProps,
  Panel, PopoutWrapper, PullToRefresh, Spacing, Spinner,
  useAdaptivityWithJSMediaQueries
} from '@vkontakte/vkui'
import { useAppDispatch } from "../../store";
import { setIsAuthorized } from "../../store/auth.reducer";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { AppRoutePath } from "../../routes";
import { IFormErrors } from "../../types";


import './AuthLoginForm.css'
import {SpinnerPopoutWrapper} from "../../popups/SpinnerPopoutWrapper";
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
    errorMessage: '',
    errorFields: {},
  })
  const [ pullToRefreshIsFetching, setPullToRefreshIsFetching ] = React.useState<boolean>(false);
  const [ controlDisabled, setControlDisabled] = React.useState<boolean>(false)
  const [ userEmail, setUserEmail] = React.useState('admin')
  const [ userPass, setUserPass] = React.useState('Qwertyu1')

  /**
   * RETURN CONTENT
   */
  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PullToRefresh onRefresh={() => {
        setPullToRefreshIsFetching(true);

        setTimeout(function (){

          setPullToRefreshIsFetching(false);
          window.location.reload();

        }, 1000);

      }} isFetching={pullToRefreshIsFetching}>
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
                disabled={controlDisabled}
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
                disabled={controlDisabled}
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
                mode={controlDisabled ? 'secondary' : 'primary'}
                disabled={controlDisabled}
                size="l"
                stretched
                onClick={() =>
                {
                  void routeNavigator.showPopout(
                    <SpinnerPopoutWrapper/>
                  );
                  setControlDisabled(true);

                  setFormErrors({
                    errorMessage: '',
                    errorFields: {},
                  });

                  setTimeout(function(){
                    if (userEmail === 'admin' && userPass === 'Qwertyu1') {

                      dispatch(setIsAuthorized(true))
                      void routeNavigator.push(AppRoutePath.PrivateHome);

                    } else {

                      setControlDisabled(false);
                      void routeNavigator.hidePopout();

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
      </PullToRefresh>
    </Panel>
  )
})

AuthLoginForm.displayName = 'AuthLoginForm'
